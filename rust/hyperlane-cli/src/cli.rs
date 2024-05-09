use std::path::PathBuf;

use clap::{command, Parser, Subcommand, ValueEnum};
use hyperlane_core::{MatchingList, H256};

#[derive(Parser)]
#[command(author, version, about, long_about = None)]
#[command(propagate_version = true)]
pub struct Cli {
    #[command(subcommand)]
    pub command: Command,
    /// Human readable chain (domain) name or a generic chain type (e.g. EVM)
    #[arg(short, long, value_enum)]
    pub domain: Domain,
    /// Path to the custom config file for a generic domain (also used to override defaults)
    #[arg(short, long)]
    pub config_path: Option<PathBuf>,
    /// Private key used for interacting with the mailbox (not required for read only commands, hex string without 0x prefix)
    #[arg(short, long)]
    pub private_key: Option<String>,
}

#[derive(Subcommand)]
pub enum Command {
    /// Dispatch the message via Hyperlane
    SendMessage(SendMessageArgs),
    /// Search for messages in the mailbox with filters
    FindMessages(FindMessagesArgs),
}

#[derive(ValueEnum, Debug, Clone, PartialEq)]
pub enum Domain {
    Sepolia,
    Anvil,
    EVM,
}

#[derive(Parser)]
pub struct SendMessageArgs {
    /// Destination domain ID
    #[arg(long)]
    pub dst_domain: u32,
    /// Recepient address (will be left padded to 32 bytes automatically)
    #[arg(long, value_parser(parse_address))]
    pub recipient: H256,
    /// Message body (hex string)
    #[arg(long, value_parser(parse_message))]
    pub message: ::std::vec::Vec<u8>,
    /// Set this flag to suppress the interactive questions
    #[arg(long, default_value_t = false)]
    pub force: bool,
}

#[derive(Parser)]
pub struct FindMessagesArgs {
    /// JSON list of matching rules (currently only empty or single item lists are supported)
    #[arg(long, value_parser(parse_matching_list))]
    pub matching_list: MatchingList,
    /// How many blocks should be used for search (starting from the current head)
    #[arg(long)]
    pub history_depth: u64,
}

fn parse_matching_list(value: &str) -> Result<MatchingList, String> {
    serde_json::from_str(value).map_err(|e| e.to_string())
}

fn parse_message(value: &str) -> Result<Vec<u8>, String> {
    hex::decode(value.strip_prefix("0x").unwrap_or(value)).map_err(|e| e.to_string())
}

fn parse_address(value: &str) -> Result<H256, String> {
    let address =
        hex::decode(value.strip_prefix("0x").unwrap_or(value)).map_err(|e| e.to_string())?;
    if address.len() > 32 {
        return Err(format!("unexpected address length: {}", address.len()));
    }
    let mut res = [0u8; 32];
    res[32 - address.len()..].copy_from_slice(&address);
    Ok(res.into())
}
