use std::fmt::Debug;

use async_trait::async_trait;
use ethers::core::types::H256;
use eyre::Result;

use crate::{
    accumulator::merkle::Proof,
    traits::{AbacusCommon, ChainCommunicationError, TxOutcome},
    AbacusMessage, MessageStatus,
};

/// Interface for on-chain inboxes
#[async_trait]
pub trait Inbox: AbacusCommon + Send + Sync + Debug {
    /// Return the domain of the inbox's linked outbox
    async fn remote_domain(&self) -> Result<u32, ChainCommunicationError>;

    /// Process a message
    async fn process(
        &self,
        message: &AbacusMessage,
        proof: &Proof,
    ) -> Result<TxOutcome, ChainCommunicationError>;

    /// Fetch the status of a message
    async fn message_status(&self, leaf: H256) -> Result<MessageStatus, ChainCommunicationError>;
}
