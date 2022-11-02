use ethers::signers::Signer;
use serde::Deserialize;

use abacus_core::{
    AbacusAbi, ContractLocator, InterchainGasPaymaster, Mailbox,
    Signers,
};
use abacus_ethereum::{
    Connection, EthereumMailboxAbi, EthereumInterchainGasPaymasterAbi,
    MailboxBuilder, InterchainGasPaymasterBuilder,
    MakeableWithProvider,
};
use ethers_prometheus::middleware::{
    ChainInfo, ContractInfo, PrometheusMiddlewareConf, WalletInfo,
};

use crate::CoreMetrics;

/// A connection to _some_ blockchain.
///
/// Specify the chain name (enum variant) in toml under the `chain` key
#[derive(Clone, Debug, Deserialize)]
#[serde(tag = "rpcStyle", content = "connection", rename_all = "camelCase")]
pub enum ChainConf {
    /// Ethereum configuration
    Ethereum(Connection),
}

impl Default for ChainConf {
    fn default() -> Self {
        Self::Ethereum(Default::default())
    }
}

/// Ways in which transactions can be submitted to a blockchain.
#[derive(Copy, Clone, Debug, Default, Deserialize)]
#[serde(tag = "type", rename_all = "camelCase")]
pub enum TransactionSubmissionType {
    /// Use the configured signer to sign and submit transactions in the "default" manner.
    #[default]
    Signer,
    /// Submit transactions via the Gelato relay.
    Gelato,
}

/// Configuration for using the Gelato Relay to interact with some chain.
#[derive(Clone, Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct GelatoConf {
    /// The sponsor API key for submitting sponsored calls
    pub sponsorapikey: String,
}

/// Addresses for outbox chain contracts
#[derive(Clone, Debug, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct CoreContractAddresses {
    /// Address of the mailbox contract
    pub mailbox: String,
    /// Address of the MultisigModule contract
    pub multisig_module: String,
    /// Address of the InterchainGasPaymaster contract
    pub interchain_gas_paymaster: Option<String>,
}

/// A chain setup is a domain ID, an address on that chain (where the outbox or
/// inbox is deployed) and details for connecting to the chain API.
#[derive(Clone, Debug, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct ChainSetup {
    /// Chain name
    pub name: String,
    /// Chain domain identifier
    pub domain: String,
    /// Number of blocks until finality
    pub finality_blocks: String,
    /// Addresses of contracts on the chain
    pub addresses: CoreContractAddresses,
    /// The chain connection details
    #[serde(flatten)]
    pub chain: ChainConf,
    /// How transactions to this chain are submitted.
    #[serde(default)]
    pub txsubmission: TransactionSubmissionType,
    /// Configure chain-specific metrics information. This will automatically
    /// add all contract addresses but will not override any set explicitly.
    /// Use `metrics_conf()` to get the metrics.
    #[serde(default)]
    pub metrics_conf: PrometheusMiddlewareConf,
}

impl ChainSetup {
    /// Get the number of blocks until finality
    pub fn finality_blocks(&self) -> u32 {
        self.finality_blocks
            .parse::<u32>()
            .expect("could not parse finality_blocks")
    }
}

impl ChainSetup {
    /// Try to convert the chain setting into an Outbox contract
    pub async fn try_into_mailbox(
        &self,
        signer: Option<Signers>,
        metrics: &CoreMetrics,
    ) -> eyre::Result<Box<dyn Mailbox>> {
        match &self.chain {
            ChainConf::Ethereum(conf) => Ok(MailboxBuilder {}
                .make_with_connection(
                    conf.clone(),
                    &ContractLocator {
                        chain_name: self.name.clone(),
                        domain: self.domain.parse().expect("invalid uint"),
                        address: self
                            .addresses
                            .mailbox
                            .parse::<ethers::types::Address>()?
                            .into(),
                    },
                    signer,
                    Some(|| metrics.json_rpc_client_metrics()),
                    Some((metrics.provider_metrics(), self.metrics_conf())),
                )
                .await?),
        }
    }

    /// Try to convert the chain setting into an InterchainGasPaymaster contract
    pub async fn try_into_interchain_gas_paymaster(
        &self,
        signer: Option<Signers>,
        metrics: &CoreMetrics,
    ) -> eyre::Result<Option<Box<dyn InterchainGasPaymaster>>> {
        let paymaster_address = if let Some(address) = &self.addresses.interchain_gas_paymaster {
            address
        } else {
            return Ok(None);
        };
        match &self.chain {
            ChainConf::Ethereum(conf) => Ok(Some(
                InterchainGasPaymasterBuilder {}
                    .make_with_connection(
                        conf.clone(),
                        &ContractLocator {
                            chain_name: self.name.clone(),
                            domain: self.domain.parse().expect("invalid uint"),
                            address: paymaster_address.parse::<ethers::types::Address>()?.into(),
                        },
                        signer,
                        Some(|| metrics.json_rpc_client_metrics()),
                        Some((metrics.provider_metrics(), self.metrics_conf())),
                    )
                    .await?,
            )),
        }
    }

    /// Get a clone of the metrics conf with correctly configured contract
    /// information.
    pub fn metrics_conf(&self) -> PrometheusMiddlewareConf {
        let mut cfg = self.metrics_conf.clone();

        if cfg.chain.is_none() {
            cfg.chain = Some(ChainInfo {
                name: Some(self.name.clone()),
            });
        }

        if let Ok(addr) = self.addresses.mailbox.parse() {
            cfg.contracts.entry(addr).or_insert_with(|| ContractInfo {
                name: Some("mailbox".into()),
                functions: EthereumMailboxAbi::fn_map_owned(),
            });
        }
        if let Some(igp) = &self.addresses.interchain_gas_paymaster {
            if let Ok(addr) = igp.parse() {
                cfg.contracts.entry(addr).or_insert_with(|| ContractInfo {
                    name: Some("igp".into()),
                    functions: EthereumInterchainGasPaymasterAbi::fn_map_owned(),
                });
            }
        }
        cfg
    }
}
