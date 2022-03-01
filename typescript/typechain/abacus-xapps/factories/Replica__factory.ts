/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Signer,
  utils,
  BigNumberish,
  Contract,
  ContractFactory,
  Overrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Replica, ReplicaInterface } from "../Replica";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_localDomain",
        type: "uint32",
      },
      {
        internalType: "uint256",
        name: "_processGas",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_reserveGas",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "root",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "Checkpoint",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "validatorManager",
        type: "address",
      },
    ],
    name: "NewValidatorManager",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "messageHash",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bool",
        name: "success",
        type: "bool",
      },
      {
        indexed: true,
        internalType: "bytes",
        name: "returnData",
        type: "bytes",
      },
    ],
    name: "Process",
    type: "event",
  },
  {
    inputs: [],
    name: "PROCESS_GAS",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "RESERVE_GAS",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "VERSION",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_root",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_signature",
        type: "bytes",
      },
    ],
    name: "checkpoint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "checkpointedIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "checkpoints",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_remoteDomain",
        type: "uint32",
      },
      {
        internalType: "address",
        name: "_validatorManager",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_checkpointedIndex",
        type: "uint256",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "localDomain",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "messages",
    outputs: [
      {
        internalType: "enum Replica.MessageStatus",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_message",
        type: "bytes",
      },
    ],
    name: "process",
    outputs: [
      {
        internalType: "bool",
        name: "_success",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_leaf",
        type: "bytes32",
      },
      {
        internalType: "bytes32[32]",
        name: "_proof",
        type: "bytes32[32]",
      },
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
    ],
    name: "prove",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_message",
        type: "bytes",
      },
      {
        internalType: "bytes32[32]",
        name: "_proof",
        type: "bytes32[32]",
      },
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
    ],
    name: "proveAndProcess",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "remoteDomain",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_validatorManager",
        type: "address",
      },
    ],
    name: "setValidatorManager",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "validatorManager",
    outputs: [
      {
        internalType: "contract IValidatorManager",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60e060405234801561001057600080fd5b506040516129f33803806129f38339818101604052606081101561003357600080fd5b50805160208201516040909201516001600160e01b031960e083901b16608052909190620cf85082101561009d576040805162461bcd60e51b815260206004820152600c60248201526b2170726f636573732067617360a01b604482015290519081900360640190fd5b613a988110156100e3576040805162461bcd60e51b815260206004820152600c60248201526b21726573657276652067617360a01b604482015290519081900360640190fd5b60a082905260c081905260805160e01c92506128c761012c600039806105415280610d3b525080610d1a5280610e125280611129525080610a725280610ac652506128c76000f3fe608060405234801561001057600080fd5b50600436106101365760003560e01c80638da5cb5b116100b2578063eb5e91ff11610081578063fe55bde911610066578063fe55bde914610461578063ff14f64314610469578063ffa1ad741461051b57610136565b8063eb5e91ff14610411578063f2fde38b1461042e57610136565b80638da5cb5b1461032a578063928bc4b21461035b578063961681dc14610401578063d88beda21461040957610136565b806345f34e92116101095780636188af0e116100ee5780636188af0e14610253578063715018a6146103015780638d3638f41461030957610136565b806345f34e92146101d957806355d719821461020e57610136565b8063226098901461013b57806325e3beda146101555780632bbd59ca1461015d578063371d30711461019b575b600080fd5b610143610539565b60408051918252519081900360200190f35b61014361053f565b61017a6004803603602081101561017357600080fd5b5035610563565b6040518082600281111561018a57fe5b815260200191505060405180910390f35b6101c560048036036104408110156101b257600080fd5b5080359060208101906104200135610578565b604080519115158252519081900360200190f35b61020c600480360360208110156101ef57600080fd5b503573ffffffffffffffffffffffffffffffffffffffff1661069f565b005b61020c6004803603606081101561022457600080fd5b5063ffffffff8135169073ffffffffffffffffffffffffffffffffffffffff6020820135169060400135610753565b61020c600480360361044081101561026a57600080fd5b81019060208101813564010000000081111561028557600080fd5b82018360208201111561029757600080fd5b803590602001918460018302840111640100000000831117156102b957600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550929350505061040082013590506108d3565b61020c610959565b610311610a70565b6040805163ffffffff9092168252519081900360200190f35b610332610a94565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b6101c56004803603602081101561037157600080fd5b81019060208101813564010000000081111561038c57600080fd5b82018360208201111561039e57600080fd5b803590602001918460018302840111640100000000831117156103c057600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550610ab0945050505050565b61031161111b565b610143611127565b6101436004803603602081101561042757600080fd5b503561114b565b61020c6004803603602081101561044457600080fd5b503573ffffffffffffffffffffffffffffffffffffffff1661115d565b6103326112ff565b61020c6004803603606081101561047f57600080fd5b8135916020810135918101906060810160408201356401000000008111156104a657600080fd5b8201836020820111156104b857600080fd5b803590602001918460018302840111640100000000831117156104da57600080fd5b91908080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525092955061131b945050505050565b610523611561565b6040805160ff9092168252519081900360200190f35b609a5481565b7f000000000000000000000000000000000000000000000000000000000000000081565b60986020526000908152604090205460ff1681565b60008060008581526098602052604090205460ff16600281111561059857fe5b1461060457604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601360248201527f214d6573736167655374617475732e4e6f6e6500000000000000000000000000604482015290519081900360640190fd5b600061063a8585602080602002604051908101604052809291908260208002808284376000920191909152508791506115669050565b60008181526099602052604090205490915015610692575050600083815260986020526040902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00166001908117909155610698565b60009150505b9392505050565b6106a7611611565b73ffffffffffffffffffffffffffffffffffffffff166106c5610a94565b73ffffffffffffffffffffffffffffffffffffffff161461074757604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b61075081611615565b50565b600054610100900460ff168061076c575061076c611702565b8061077a575060005460ff16155b6107cf576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602e8152602001806127a2602e913960400191505060405180910390fd5b600054610100900460ff1615801561083557600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff909116610100171660011790555b61083e83611713565b609780546401000000007fffffffffffffffffffffffffffffffffffffffffffffffffffffff00ffffffff909116177fffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000001663ffffffff8616179055609a82905580156108cd57600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff1690555b50505050565b6108e583805190602001208383610578565b61095057604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600660248201527f2170726f76650000000000000000000000000000000000000000000000000000604482015290519081900360640190fd5b6108cd83610ab0565b610961611611565b73ffffffffffffffffffffffffffffffffffffffff1661097f610a94565b73ffffffffffffffffffffffffffffffffffffffff1614610a0157604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b60335460405160009173ffffffffffffffffffffffffffffffffffffffff16907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3603380547fffffffffffffffffffffffff0000000000000000000000000000000000000000169055565b7f000000000000000000000000000000000000000000000000000000000000000081565b60335473ffffffffffffffffffffffffffffffffffffffff1690565b600080610abd8382611839565b905063ffffffff7f000000000000000000000000000000000000000000000000000000000000000016610b117fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000831661185f565b63ffffffff1614610b8357604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600c60248201527f2164657374696e6174696f6e0000000000000000000000000000000000000000604482015290519081900360640190fd5b6000610bb07fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000008316611898565b9050600160008281526098602052604090205460ff166002811115610bd157fe5b14610c3d57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600760248201527f2170726f76656e00000000000000000000000000000000000000000000000000604482015290519081900360640190fd5b609754640100000000900460ff16600114610cb957604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600a60248201527f217265656e7472616e7400000000000000000000000000000000000000000000604482015290519081900360640190fd5b609780547fffffffffffffffffffffffffffffffffffffffffffffffffffffff00ffffffff169055600081815260986020526040902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001660021790557f00000000000000000000000000000000000000000000000000000000000000007f0000000000000000000000000000000000000000000000000000000000000000015a1015610dcb57604080517f08c379a0000000000000000000000000000000000000000000000000000000008152602060048083019190915260248201527f2167617300000000000000000000000000000000000000000000000000000000604482015290519081900360640190fd5b6000610df87fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00000084166118d7565b6040805161010080825261012082019092529192506000917f0000000000000000000000000000000000000000000000000000000000000000908390836020820181803683370190505090506000610e717fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00000089166118ea565b610e9c7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000008a1661191a565b610ef1610eca7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000008c1661194b565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000166119bc565b604051602401808463ffffffff16815260200183815260200180602001828103825283818151815260200191508051906020019080838360005b83811015610f43578181015183820152602001610f2b565b50505050905090810190601f168015610f705780820380516001836020036101000a031916815260200191505b50604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f56d5d4750000000000000000000000000000000000000000000000000000000017815281519197506000965086955090935091508390508a88f198503d94508385111561100f578394505b848252846000602084013e816040518082805190602001908083835b6020831061106857805182527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0909201916020918201910161102b565b5181516020939093036101000a7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0180199091169216919091179052604051920182900382209350508b1515915089907fd42de95a9b26f1be134c8ecce389dc4fcfa18753d01661b7b361233569e8fe4890600090a45050609780547fffffffffffffffffffffffffffffffffffffffffffffffffffffff00ffffffff1664010000000017905550949695505050505050565b60975463ffffffff1681565b7f000000000000000000000000000000000000000000000000000000000000000081565b60996020526000908152604090205481565b611165611611565b73ffffffffffffffffffffffffffffffffffffffff16611183610a94565b73ffffffffffffffffffffffffffffffffffffffff161461120557604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b73ffffffffffffffffffffffffffffffffffffffff8116611271576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602681526020018061275b6026913960400191505060405180910390fd5b60335460405173ffffffffffffffffffffffffffffffffffffffff8084169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3603380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b60655473ffffffffffffffffffffffffffffffffffffffff1681565b609a54821161138b57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600e60248201527f6f6c6420636865636b706f696e74000000000000000000000000000000000000604482015290519081900360640190fd5b6065546097546040517f186777f600000000000000000000000000000000000000000000000000000000815263ffffffff90911660048201818152602483018790526044830186905260806064840190815285516084850152855173ffffffffffffffffffffffffffffffffffffffff9095169463186777f6948993899389939192909160a490910190602085019080838360005b83811015611438578181015183820152602001611420565b50505050905090810190601f1680156114655780820380516001836020036101000a031916815260200191505b509550505050505060206040518083038186803b15801561148557600080fd5b505afa158015611499573d6000803e3d6000fd5b505050506040513d60208110156114af57600080fd5b505161151c57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600e60248201527f2176616c696461746f7220736967000000000000000000000000000000000000604482015290519081900360640190fd5b600083815260996020526040808220849055609a84905551839185917fb84fecc2f02e6bac34681511728ae2976bd7c0a0121ff91a9348515759ed237f9190a3505050565b600081565b8260005b602081101561160957600183821c16600085836020811061158757fe5b6020020151905081600114156115cd57808460405160200180838152602001828152602001925050506040516020818303038152906040528051906020012093506115ff565b838160405160200180838152602001828152602001925050506040516020818303038152906040528051906020012093505b505060010161156a565b509392505050565b3390565b61161e81611a00565b61168957604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601a60248201527f21636f6e74726163742076616c696461746f724d616e61676572000000000000604482015290519081900360640190fd5b6065805473ffffffffffffffffffffffffffffffffffffffff83167fffffffffffffffffffffffff0000000000000000000000000000000000000000909116811790915560408051918252517fe547ee4554b71678a728a4a8cd9e4a3570dfd31d3acbd0cc7397928fbbed66ff9181900360200190a150565b600061170d30611a00565b15905090565b600054610100900460ff168061172c575061172c611702565b8061173a575060005460ff16155b61178f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602e8152602001806127a2602e913960400191505060405180910390fd5b600054610100900460ff161580156117f557600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff909116610100171660011790555b6117fd611a06565b61180682611615565b801561183557600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff1690555b5050565b81516000906020840161185464ffffffffff85168284611b29565b925050505b92915050565b60006118907fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000831660286004611b88565b90505b919050565b6000806118a483611ba9565b6bffffffffffffffffffffffff16905060006118bf84611bbd565b6bffffffffffffffffffffffff169091209392505050565b60006118906118e583611bd1565b611c02565b60006118907fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000008316826004611b88565b60006118907fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000831660046020611c05565b6000611890604c8061197e7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000008616611bbd565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000861692916bffffffffffffffffffffffff91909116036000611db0565b60606000806119ca84611bbd565b6bffffffffffffffffffffffff16905060405191508192506119ef8483602001611e42565b508181016020016040529052919050565b3b151590565b600054610100900460ff1680611a1f5750611a1f611702565b80611a2d575060005460ff16155b611a82576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602e8152602001806127a2602e913960400191505060405180910390fd5b600054610100900460ff16158015611ae857600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff909116610100171660011790555b611af0611f78565b611af861208a565b801561075057600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff16905550565b600080611b36848461221a565b9050604051811115611b46575060005b80611b74577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000915050610698565b611b7f85858561228c565b95945050505050565b60008160200360080260ff16611b9f858585611c05565b901c949350505050565b60781c6bffffffffffffffffffffffff1690565b60181c6bffffffffffffffffffffffff1690565b60006118907fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000008316602c6020611c05565b90565b600060ff8216611c1757506000610698565b611c2084611bbd565b6bffffffffffffffffffffffff16611c3b8460ff851661221a565b1115611d1a57611c7c611c4d85611ba9565b6bffffffffffffffffffffffff16611c6486611bbd565b6bffffffffffffffffffffffff16858560ff1661229f565b6040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b83811015611cdf578181015183820152602001611cc7565b50505050905090810190601f168015611d0c5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b60208260ff161115611d77576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252603a8152602001806127d0603a913960400191505060405180910390fd5b600882026000611d8686611ba9565b6bffffffffffffffffffffffff1690506000611da1836123fa565b91909501511695945050505050565b600080611dbc86611ba9565b6bffffffffffffffffffffffff169050611dd586612443565b611de985611de3848961221a565b9061221a565b1115611e18577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000915050611e3a565b611e22818661221a565b9050611e368364ffffffffff168286611b29565b9150505b949350505050565b6000611e4d8361246d565b611ea2576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602881526020018061280a6028913960400191505060405180910390fd5b611eab8361247f565b611f00576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602b815260200180612832602b913960400191505060405180910390fd5b6000611f0b84611bbd565b6bffffffffffffffffffffffff1690506000611f2685611ba9565b6bffffffffffffffffffffffff1690506000604051905084811115611f4b5760206060fd5b8285848460045afa50611f6e611f60876124bc565b64ffffffffff16868561228c565b9695505050505050565b600054610100900460ff1680611f915750611f91611702565b80611f9f575060005460ff16155b611ff4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602e8152602001806127a2602e913960400191505060405180910390fd5b600054610100900460ff16158015611af857600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff90911661010017166001179055801561075057600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff16905550565b600054610100900460ff16806120a357506120a3611702565b806120b1575060005460ff16155b612106576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602e8152602001806127a2602e913960400191505060405180910390fd5b600054610100900460ff1615801561216c57600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff909116610100171660011790555b6000612176611611565b603380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff8316908117909155604051919250906000907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a350801561075057600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff16905550565b8181018281101561185957604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601960248201527f4f766572666c6f7720647572696e67206164646974696f6e2e00000000000000604482015290519081900360640190fd5b606092831b9190911790911b1760181b90565b606060006122ac866124c2565b91505060006122ba866124c2565b91505060006122c8866124c2565b91505060006122d6866124c2565b91505083838383604051602001808061285d603591397fffffffffffff000000000000000000000000000000000000000000000000000060d087811b821660358401527f2077697468206c656e6774682030780000000000000000000000000000000000603b84015286901b16604a820152605001602161278182397fffffffffffff000000000000000000000000000000000000000000000000000060d094851b811660218301527f2077697468206c656e677468203078000000000000000000000000000000000060278301529290931b9091166036830152507f2e00000000000000000000000000000000000000000000000000000000000000603c82015260408051601d818403018152603d90920190529b9a5050505050505050505050565b7f80000000000000000000000000000000000000000000000000000000000000007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9091011d90565b600061244e82611bbd565b61245783611ba9565b016bffffffffffffffffffffffff169050919050565b600061247882612596565b1592915050565b600061248a826124bc565b64ffffffffff1664ffffffffff14156124a557506000611893565b60006124b083612443565b60405110199392505050565b60d81c90565b600080601f5b600f8160ff16111561252a5760ff600882021684901c6124e7816125be565b61ffff16841793508160ff1660101461250257601084901b93505b507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff016124c8565b50600f5b60ff8160ff1610156125905760ff600882021684901c61254d816125be565b61ffff16831792508160ff1660001461256857601083901b92505b507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0161252e565b50915091565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000009081161490565b60006125d060048360ff16901c6125ee565b60ff161760081b62ffff00166125e5826125ee565b60ff1617919050565b600060f08083179060ff8216141561260a576030915050611893565b8060ff1660f11415612620576031915050611893565b8060ff1660f21415612636576032915050611893565b8060ff1660f3141561264c576033915050611893565b8060ff1660f41415612662576034915050611893565b8060ff1660f51415612678576035915050611893565b8060ff1660f6141561268e576036915050611893565b8060ff1660f714156126a4576037915050611893565b8060ff1660f814156126ba576038915050611893565b8060ff1660f914156126d0576039915050611893565b8060ff1660fa14156126e6576061915050611893565b8060ff1660fb14156126fc576062915050611893565b8060ff1660fc1415612712576063915050611893565b8060ff1660fd1415612728576064915050611893565b8060ff1660fe141561273e576065915050611893565b8060ff1660ff1415612754576066915050611893565b5091905056fe4f776e61626c653a206e6577206f776e657220697320746865207a65726f20616464726573732e20417474656d7074656420746f20696e646578206174206f6666736574203078496e697469616c697a61626c653a20636f6e747261637420697320616c726561647920696e697469616c697a656454797065644d656d566965772f696e646578202d20417474656d7074656420746f20696e646578206d6f7265207468616e20333220627974657354797065644d656d566965772f636f7079546f202d204e756c6c20706f696e74657220646572656654797065644d656d566965772f636f7079546f202d20496e76616c696420706f696e74657220646572656654797065644d656d566965772f696e646578202d204f76657272616e2074686520766965772e20536c696365206973206174203078a26469706673582212206cc2e189fdf88bcb25380156066b8c981866750d2a8fe203a1e0a60845a127f364736f6c63430007060033";

export class Replica__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    _localDomain: BigNumberish,
    _processGas: BigNumberish,
    _reserveGas: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Replica> {
    return super.deploy(
      _localDomain,
      _processGas,
      _reserveGas,
      overrides || {}
    ) as Promise<Replica>;
  }
  getDeployTransaction(
    _localDomain: BigNumberish,
    _processGas: BigNumberish,
    _reserveGas: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _localDomain,
      _processGas,
      _reserveGas,
      overrides || {}
    );
  }
  attach(address: string): Replica {
    return super.attach(address) as Replica;
  }
  connect(signer: Signer): Replica__factory {
    return super.connect(signer) as Replica__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ReplicaInterface {
    return new utils.Interface(_abi) as ReplicaInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Replica {
    return new Contract(address, _abi, signerOrProvider) as Replica;
  }
}
