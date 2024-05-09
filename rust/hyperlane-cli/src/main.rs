pub mod cli;
pub mod ethereum;
pub mod mailbox_client;

use clap::Parser;
use cli::{Cli, Command, Domain};
use ethereum::config::EthereumMailboxConfig;
use prompts::{confirm::ConfirmPrompt, Prompt};
use tracing::subscriber::set_global_default;
use tracing_subscriber::{filter::EnvFilter, fmt::Subscriber};

const DEFAULT_ANVIL_KEY: &str = "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

fn init_logging(default_level: &str) {
    let env_filter =
        EnvFilter::try_from_default_env().unwrap_or_else(|_| EnvFilter::new(default_level));

    let subscriber_builder = Subscriber::builder().with_env_filter(env_filter);
    let subscriber = subscriber_builder.with_writer(std::io::stderr).finish();
    set_global_default(subscriber).expect("Failed to set subscriber");
}

#[tokio::main]
async fn main() {
    init_logging("warn");

    let cli = Cli::parse();

    let client = match cli.domain {
        Domain::Sepolia => {
            let config = ethereum::build_config(
                cli.config_path,
                Some(EthereumMailboxConfig::sepolia_defaults()),
            )
            .unwrap();
            ethereum::build_client(&config, cli.private_key).unwrap()
        }
        Domain::Anvil => {
            let config = ethereum::build_config(
                cli.config_path,
                Some(EthereumMailboxConfig::anvil_defaults()),
            )
            .unwrap();
            ethereum::build_client(
                &config,
                Some(cli.private_key.unwrap_or(DEFAULT_ANVIL_KEY.into())),
            )
            .unwrap()
        }
        Domain::EVM => {
            let config = ethereum::build_config(cli.config_path, None).unwrap();
            ethereum::build_client(&config, cli.private_key).unwrap()
        }
    };

    match cli.command {
        Command::SendMessage(args) => {
            let protocol_fee = client
                .estimate_fee(args.dst_domain, &args.recipient, &args.message)
                .await
                .unwrap();

            let mut prompt = ConfirmPrompt::new(format!(
                "You are going to pay {} in protocol fees (on top of chain fees), proceed?",
                client.format_amount(&protocol_fee)
            ));
            if let Ok(Some(true)) = prompt.run().await {} else { return }

            let tx_hash = client
                .send_message(
                    args.dst_domain,
                    &args.recipient,
                    &args.message,
                    &protocol_fee,
                )
                .await
                .unwrap();
            println!("Transaction hash: {}", tx_hash);
        }
        Command::FindMessages(args) => {
            let messages = client
                .find_messages(&args.matching_list, args.history_depth)
                .await
                .unwrap();
            println!("{:#?}", messages);
        }
    }
}
