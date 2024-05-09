use crate::mailbox_client::MailboxClientError;

#[derive(Debug, thiserror::Error)]
pub enum EthereumClientError {
    #[error("Failed to parse provider URL: {0}")]
    ProviderUrlParse(#[source] url::ParseError),
    #[error("Failed to parse private key: {0}")]
    PrivateKeyParse(#[source] ethers::signers::WalletError),
    #[error("Private key is not specified")]
    PrivateKeyUnspecified,
    #[error("Failed to parse contract address: {0}")]
    ContractAddressParse(#[source] fixed_hash::rustc_hex::FromHexError),
    #[error("Failed to invoke contract: {0}")]
    ContractInteraction(#[source] Box<dyn std::error::Error + Send + Sync + 'static>),
    #[error("Http provider error: {0}")]
    HttpProvider(#[source] ethers::providers::ProviderError),
    #[error("Transaction is sent but cannot be tracked")]
    TransactionNotTracked,
    #[error("Failed to retrieve a transaction with hash {0}")]
    TransactionNotFound(ethers::types::H256),
    #[error("Failed to decode transaction input: {0}")]
    TransactionInputDecode(#[source] ethers::abi::AbiError),
    #[error("Failed to open config file: {0}")]
    ConfigFileOpen(#[source] std::io::Error),
    #[error("Failed to decode config file: {0}")]
    ConfigFileParse(#[source] serde_json::Error),
    #[error("Neither config file or defaults are specified")]
    ConfigUnresolved,
}

impl From<EthereumClientError> for MailboxClientError {
    fn from(value: EthereumClientError) -> Self {
        Self::Internal(Box::new(value))
    }
}
