use std::sync::Arc;

use async_trait::async_trait;
use ethers::{
    abi::AbiDecode,
    middleware::SignerMiddleware,
    providers::{Http, Middleware, Provider},
    signers::Signer,
    types::{Filter, Log, Topic, Transaction, H160},
};
use hyperlane_core::{Filter as MatchingRule, HyperlaneMessage, MatchingList, H256, U256};
use hyperlane_ethereum::mailbox::{Mailbox, ProcessCall};

use crate::mailbox_client::{MailboxClient, MailboxClientError};

use super::error::EthereumClientError;

pub struct EthereumMailboxClient<S> {
    mailbox: Mailbox<SignerMiddleware<Provider<Http>, S>>,
}

impl<S: Signer> EthereumMailboxClient<S> {
    pub fn new(contract_address: H160, middleware: SignerMiddleware<Provider<Http>, S>) -> Self {
        Self {
            mailbox: Mailbox::new(contract_address, Arc::new(middleware)),
        }
    }

    async fn get_block_number(&self) -> Result<u64, EthereumClientError> {
        self.mailbox
            .client()
            .provider()
            .get_block_number()
            .await
            .map_err(EthereumClientError::HttpProvider)
            .map(|res| res.as_u64())
    }

    async fn get_logs(&self, filter: &Filter) -> Result<Vec<Log>, EthereumClientError> {
        self.mailbox
            .client()
            .provider()
            .get_logs(filter)
            .await
            .map_err(EthereumClientError::HttpProvider)
    }

    async fn get_transaction(
        &self,
        tx_hash: ethers::types::H256,
    ) -> Result<Transaction, EthereumClientError> {
        self.mailbox
            .client()
            .provider()
            .get_transaction(tx_hash)
            .await
            .map_err(EthereumClientError::HttpProvider)?
            .ok_or_else(|| EthereumClientError::TransactionNotFound(tx_hash))
    }
}

#[async_trait]
impl<S: Signer + 'static> MailboxClient for EthereumMailboxClient<S> {
    async fn estimate_fee(
        &self,
        destination_domain: u32,
        recipient_address: &H256,
        message_body: &[u8],
    ) -> Result<U256, MailboxClientError> {
        let res = self
            .mailbox
            .quote_dispatch(
                destination_domain,
                (*recipient_address).into(),
                message_body.to_vec().into(), 
            )
            .call()
            .await
            .map_err(|e| EthereumClientError::ContractInteraction(Box::new(e)))?;
        Ok(U256(res.0))
    }

    async fn send_message(
        &self,
        destination_domain: u32,
        recipient_address: &H256,
        message_body: &[u8],
        protocol_fee: &U256,
    ) -> Result<H256, MailboxClientError> {
        let receipt = self
            .mailbox
            .dispatch_0(
                destination_domain,
                (*recipient_address).into(),
                message_body.to_vec().into(),
            )
            .value(ethers::types::U256(protocol_fee.0))
            .send()
            .await
            .map_err(|e| EthereumClientError::ContractInteraction(Box::new(e)))?
            .await
            .map_err(EthereumClientError::HttpProvider)?
            .ok_or_else(|| EthereumClientError::TransactionNotTracked)?;
        Ok(receipt.transaction_hash.0.into())
    }

    async fn find_messages(
        &self,
        matching_list: &MatchingList,
        block_span: u64,
    ) -> Result<Vec<HyperlaneMessage>, MailboxClientError> {
        if matching_list.len() > 1 {
            return Err(MailboxClientError::MatchingList(
                "Multiple matching rules are not supported yet",
            ));
        }

        let from_block = self.get_block_number().await? - block_span;
        let mut process_filter = self.mailbox.process_filter().from_block(from_block);

        if let Some(elt) = matching_list.first() {
            if let MatchingRule::Enumerated(origin) = &elt.origin_domain {
                let topics = origin
                    .iter()
                    .map(|x| Some(ethers::types::H256::from_low_u64_be(*x as u64)))
                    .collect();
                process_filter = process_filter.topic1(Topic::Array(topics));
            }

            if let MatchingRule::Enumerated(sender) = &elt.sender_address {
                let topics = sender.iter().map(|x| Some(x.0.into())).collect();
                process_filter = process_filter.topic2(Topic::Array(topics));
            }

            if let MatchingRule::Enumerated(recepient) = &elt.recipient_address {
                let topics = recepient.iter().map(|x| Some(x.0.into())).collect();
                process_filter = process_filter.topic3(Topic::Array(topics));
            }
        }

        let logs = self.get_logs(&process_filter.filter).await?;
        let tx_hashes: Vec<ethers::types::H256> = logs
            .into_iter()
            .filter_map(|log| log.transaction_hash)
            .collect();

        let mut messages = Vec::with_capacity(tx_hashes.len());
        for tx_hash in tx_hashes {
            let tx = self.get_transaction(tx_hash).await?;
            let process_call = ProcessCall::decode(tx.input)
                .map_err(EthereumClientError::TransactionInputDecode)?;
            let message = HyperlaneMessage::from(process_call.message.to_vec());
            messages.push(message);
        }

        Ok(messages)
    }

    fn format_amount(&self, amount: &U256) -> String {
        format!("{} wei", amount)
    }
}

#[cfg(test)]
mod tests {
    use hyperlane_core::{Filter, ListElement, MatchingList, H256};

    use crate::{
        ethereum::{build_readonly_client, config::EthereumMailboxConfig},
        mailbox_client::MailboxClient,
    };

    #[ignore]
    #[tokio::test]
    async fn test_find_messages() {
        let client = build_readonly_client(&EthereumMailboxConfig::sepolia_defaults());
        let matching_list = MatchingList(Some(vec![ListElement {
            origin_domain: Filter::Enumerated(vec![912559]),
            destination_domain: Filter::Wildcard,
            recipient_address: Filter::Wildcard,
            sender_address: Filter::Wildcard,
        }]));

        let messages = client.find_messages(&matching_list, 20000).await.unwrap();
        println!("{:#?}", messages);
    }

    #[ignore]
    #[tokio::test]
    async fn test_estimate_fee() {
        let client = build_readonly_client(&EthereumMailboxConfig::sepolia_defaults());
        let address = hex::decode("00000000000000000000000072c7EB06e33081699245664E0a6f80e5d88Af3a3").unwrap();

        let fee = client.estimate_fee(42161, &H256::from_slice(&address), b"0011223344").await.unwrap();
        println!("{}", client.format_amount(&fee));
    }
}
