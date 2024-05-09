pub mod client;
pub mod config;
pub mod error;

use std::{fs::File, io::BufReader, path::PathBuf, time::Duration};

use ethers::{
    middleware::SignerMiddleware,
    providers::{Http, Provider},
    signers::{LocalWallet, Signer},
};

use crate::mailbox_client::MailboxClient;

use self::{
    client::EthereumMailboxClient,
    config::{EthereumMailboxConfig, NoSigner},
    error::EthereumClientError,
};

pub fn build_client(
    config: &EthereumMailboxConfig,
    private_key: Option<String>,
) -> Result<Box<dyn MailboxClient>, EthereumClientError> {
    if let Some(private_key) = private_key {
        Ok(Box::new(build_readwrite_client(config, &private_key)?))
    } else {
        Ok(Box::new(build_readonly_client(config)))
    }
}

pub fn build_config(
    path: Option<PathBuf>,
    defaults: Option<EthereumMailboxConfig>,
) -> Result<EthereumMailboxConfig, EthereumClientError> {
    if let Some(config_path) = path {
        let file = File::open(config_path).map_err(EthereumClientError::ConfigFileOpen)?;
        let reader = BufReader::new(file);
        serde_json::from_reader(reader).map_err(EthereumClientError::ConfigFileParse)
    } else {
        defaults.ok_or(EthereumClientError::ConfigUnresolved)
    }
}

pub fn build_readonly_client(config: &EthereumMailboxConfig) -> EthereumMailboxClient<NoSigner> {
    let middleware = SignerMiddleware::new(build_http_provider(&config), NoSigner(config.chain_id));
    EthereumMailboxClient::new(config.contract_address, middleware)
}

pub fn build_readwrite_client(
    config: &EthereumMailboxConfig,
    private_key: &str,
) -> Result<EthereumMailboxClient<LocalWallet>, EthereumClientError> {
    let wallet = private_key
        .parse::<LocalWallet>()
        .map_err(EthereumClientError::PrivateKeyParse)?
        .with_chain_id(config.chain_id);
    let middleware = SignerMiddleware::new(build_http_provider(&config), wallet);
    Ok(EthereumMailboxClient::new(
        config.contract_address,
        middleware,
    ))
}

fn build_http_provider(config: &EthereumMailboxConfig) -> Provider<Http> {
    let mut provider = Provider::new(Http::new(config.rpc_endpoint.clone()));
    if let Some(poll_interval_ms) = config.tx_poll_interval_ms {
        provider = provider.interval(Duration::from_millis(poll_interval_ms));
    }
    provider
}
