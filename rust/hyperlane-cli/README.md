# Hyperlane CLI

Command line utility to send and fetch cross-chain messages.

## Usage

```
Usage: hyperlane-cli [OPTIONS] --domain <DOMAIN> <COMMAND>

Commands:
  send-message   Dispatch the message via Hyperlane
  find-messages  Search for messages in the mailbox with filters
  help           Print this message or the help of the given subcommand(s)

Options:
  -d, --domain <DOMAIN>            Human readable chain (domain) name or a generic chain type (e.g. EVM) [possible values: sepolia, anvil, evm]
  -c, --config-path <CONFIG_PATH>  Path to the custom config file for a generic domain (also used to override defaults)
  -p, --private-key <PRIVATE_KEY>  Private key used for interacting with the mailbox (not required for read only commands)
  -h, --help                       Print help
  -V, --version                    Print version
```

Hyperlane CLI works with known domains or domain types (e.g. EVM-compatible chains).  
If a known domain is specified, default config values will be used, unless the path to the configuration file is set.  

The expected config file format is domain specific, for EVM chains it is the following:

```json
{
    "contract_address": "0x0000000000000000000000000000000000000000",
    "rpc_endpoint": "http://127.0.0.1:8545",
    "chain_id": 31337,
    "tx_poll_interval_ms": 100
}
```

Lastly, the private key is necessary for commands that submit transactions onchain, e.g. sending messages to the Mailbox.

#### Anvil

If `anvil` is selected as domain, the private key will also be set to default (first of the builtin Anvil accounts) unless explicitly specified via `--private-key`.

### Send message

```
Usage: hyperlane-cli --domain <DOMAIN> send-message --dst-domain <DST_DOMAIN> --recipient <RECIPIENT> --message <MESSAGE>
```

This command will estimate the fees and ask for confirmation (you can suppress that with the `--force` flag).  
If everything is ok then the message will be submitted to the mailbox contract.

Example:
```sh
hyperlane-cli -d sepolia --private-key $SEPOLIA_PRIVATE_KEY send-message --dst-domain 42161 --recipient 0x72c7EB06e33081699245664E0a6f80e5d88Af3a3 --message 0x0011223344
```

See the list of supported domains and their identifiers: https://docs.hyperlane.xyz/docs/reference/domains

### Find messages

```
Usage: hyperlane-cli --domain <DOMAIN> find-messages --matching-list <MATCHING_LIST> --history-depth <HISTORY_DEPTH>
```

This command will try to find all messages matching the given rule set within the specified time boundaries (number of past blocks from the current moment).  
Under the hood the program will fetch all relevant event logs and then query transactions for each of them, to obtain the message bodies.

Example:
```sh
hyperlane-cli -d sepolia find-messages --history-depth 20000 --matching-list '[{"origindomain": "33333", "senderaddress": "*", "destinationdomain": "*", "recipientaddress": "*"}]'
```

Currently only empty `'[]'` and single-sized matching lists are supported.  
A matching rule contains four filters:
- `origindomain`
- `senderaddress`
- `destinationdomain`
- `recipientaddress`

A filter can either be a wildcard `*` and bypass everything, or a list of possible values.

## Building

```sh
cargo build --bin hyperlane-cli
```

## Running

```sh
cargo run --bin hyperlane-cli --
```

Increase log verbosity by specifying `RUST_LOG` environment variable (by default set to `warn`).
