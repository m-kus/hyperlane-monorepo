// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity >=0.8.9;

// ============ Internal Imports ============
import {BridgeRouter} from "./BridgeRouter.sol";
import {IWeth} from "../../interfaces/bridge/IWeth.sol";
// ============ External Imports ============
import {TypeCasts} from "@abacus-network/abacus-sol/contracts/XAppConnectionManager.sol";

contract ETHHelper {
    // ============ Immutables ============

    // wrapped Ether contract
    IWeth public immutable weth;
    // bridge router contract
    BridgeRouter public immutable bridge;

    // ============ Constructor ============

    constructor(address _weth, address _bridge) {
        weth = IWeth(_weth);
        bridge = BridgeRouter(_bridge);
        IWeth(_weth).approve(_bridge, type(uint256).max);
    }

    // ============ External Functions ============

    /**
     * @notice Sends ETH over the Abacus Bridge. Sends to a full-width Abacus
     * identifer on the other side.
     * @dev As with all bridges, improper use may result in loss of funds.
     * @param _domain The domain to send funds to.
     * @param _to The 32-byte identifier of the recipient
     */
    function sendTo(uint32 _domain, bytes32 _to) public payable {
        weth.deposit{value: msg.value}();
        bridge.send(address(weth), msg.value, _domain, _to);
    }

    /**
     * @notice Sends ETH over the Abacus Bridge. Sends to the same address on
     * the other side.
     * @dev WARNING: This function should only be used when sending TO an
     * EVM-like domain. As with all bridges, improper use may result in loss of
     * funds.
     * @param _domain The domain to send funds to
     */
    function send(uint32 _domain) external payable {
        sendTo(_domain, TypeCasts.addressToBytes32(msg.sender));
    }

    /**
     * @notice Sends ETH over the Abacus Bridge. Sends to a specified EVM
     * address on the other side.
     * @dev This function should only be used when sending TO an EVM-like
     * domain. As with all bridges, improper use may result in loss of funds
     * @param _domain The domain to send funds to.
     * @param _to The EVM address of the recipient
     */
    function sendToEVMLike(uint32 _domain, address _to) external payable {
        sendTo(_domain, TypeCasts.addressToBytes32(_to));
    }
}
