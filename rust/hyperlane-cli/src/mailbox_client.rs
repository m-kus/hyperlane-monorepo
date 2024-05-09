use async_trait::async_trait;
use hyperlane_core::{HyperlaneMessage, MatchingList, H256, U256};

#[async_trait]
pub trait MailboxClient {
    /// Get a quote for sending a message
    async fn estimate_fee(
        &self,
        destination_domain: u32,
        recipient_address: &H256,
        message_body: &[u8],
    ) -> Result<U256, MailboxClientError>;

    /// Send message to a particular recipient in the specified domain, returns the transaction hash
    async fn send_message(
        &self,
        destination_domain: u32,
        recipient_address: &H256,
        message_body: &[u8],
        protocol_fee: &U256,
    ) -> Result<H256, MailboxClientError>;

    /// Find all messages matching the set of rules, given the history depth (measured in blocks from now)
    async fn find_messages(
        &self,
        matching_list: &MatchingList,
        history_depth: u64,
    ) -> Result<Vec<HyperlaneMessage>, MailboxClientError>;

    /// Format the amount depending on the particular chain currency
    fn format_amount(&self, amount: &U256) -> String;
}

#[derive(Debug, thiserror::Error)]
pub enum MailboxClientError {
    #[error("Internal client error: {0}")]
    Internal(#[source] Box<dyn std::error::Error + Send + Sync + 'static>),
    #[error("Matching list error: {0}")]
    MatchingList(&'static str),
}
