use async_trait::async_trait;
use ethers::signers::Signer;
use ethers::types::transaction::{eip2718::TypedTransaction, eip712::Eip712};
use ethers::types::{Address, Signature, H160};
use serde::{Deserialize, Serialize};
use url::Url;

use super::error::EthereumClientError;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct EthereumMailboxConfig {
    pub contract_address: H160,
    pub rpc_endpoint: Url,
    pub tx_poll_interval_ms: Option<u64>,
    pub chain_id: u64,
}

impl EthereumMailboxConfig {
    pub fn anvil_defaults() -> Self {
        Self {
            // Contract address is not yet known at this time
            contract_address: "0x0000000000000000000000000000000000000000"
                .parse()
                .unwrap(),
            // Default Anvil local endpoint
            rpc_endpoint: "http://127.0.0.1:8545".parse().unwrap(),
            // Faster polling
            tx_poll_interval_ms: Some(100),
            // Default Anvil chain ID
            chain_id: 31337,
        }
    }

    pub fn sepolia_defaults() -> Self {
        Self {
            contract_address: "0xfFAEF09B3cd11D9b20d1a19bECca54EEC2884766"
                .parse()
                .unwrap(),
            rpc_endpoint: "https://sepolia.drpc.org".parse().unwrap(),
            tx_poll_interval_ms: Some(500),
            chain_id: 11155111,
        }
    }
}

#[derive(Debug)]
pub struct NoSigner(pub u64);

#[async_trait]
impl Signer for NoSigner {
    type Error = EthereumClientError;

    async fn sign_message<S: Send + Sync + AsRef<[u8]>>(
        &self,
        _message: S,
    ) -> Result<Signature, Self::Error> {
        Err(EthereumClientError::PrivateKeyUnspecified)
    }

    async fn sign_transaction(
        &self,
        _message: &TypedTransaction,
    ) -> Result<Signature, Self::Error> {
        Err(EthereumClientError::PrivateKeyUnspecified)
    }

    async fn sign_typed_data<T: Eip712 + Send + Sync>(
        &self,
        _payload: &T,
    ) -> Result<Signature, Self::Error> {
        Err(EthereumClientError::PrivateKeyUnspecified)
    }

    fn address(&self) -> Address {
        Address::zero()
    }

    fn chain_id(&self) -> u64 {
        self.0
    }

    fn with_chain_id<T: Into<u64>>(self, _chain_id: T) -> Self {
        self
    }
}
