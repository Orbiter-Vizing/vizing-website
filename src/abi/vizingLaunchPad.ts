export const vizingLaunchPadAbi = [
  {
    inputs: [],
    name: "AccessControlBadConfirmation",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "neededRole",
        type: "bytes32",
      },
    ],
    name: "AccessControlUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
    ],
    name: "AddressEmptyCode",
    type: "error",
  },
  {
    inputs: [],
    name: "ArrivalTimeNotMakeSense",
    type: "error",
  },
  {
    inputs: [],
    name: "ECDSAInvalidSignature",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "length",
        type: "uint256",
      },
    ],
    name: "ECDSAInvalidSignatureLength",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "ECDSAInvalidSignatureS",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "ERC1967InvalidImplementation",
    type: "error",
  },
  {
    inputs: [],
    name: "ERC1967NonPayable",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "messageId",
        type: "bytes32",
      },
    ],
    name: "ExecuteError",
    type: "error",
  },
  {
    inputs: [],
    name: "FailedInnerCall",
    type: "error",
  },
  {
    inputs: [],
    name: "HookExecuteError",
    type: "error",
  },
  {
    inputs: [],
    name: "InsufficientFunds",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidInitialization",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidMessage",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidSignature",
    type: "error",
  },
  {
    inputs: [],
    name: "LandingPadOccupied",
    type: "error",
  },
  {
    inputs: [],
    name: "NotInitializing",
    type: "error",
  },
  {
    inputs: [],
    name: "SetupError",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bool[]",
        name: "results",
        type: "bool[]",
      },
    ],
    name: "SimulateResult",
    type: "error",
  },
  {
    inputs: [],
    name: "StationPaused",
    type: "error",
  },
  {
    inputs: [],
    name: "UUPSUnauthorizedCallContext",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "slot",
        type: "bytes32",
      },
    ],
    name: "UUPSUnsupportedProxiableUUID",
    type: "error",
  },
  {
    inputs: [],
    name: "ValidatorNotMatched",
    type: "error",
  },
  {
    inputs: [],
    name: "ValueNotMatched",
    type: "error",
  },
  {
    inputs: [],
    name: "VerifyFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "WithdrawError",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bool",
        name: "isPause",
        type: "bool",
      },
    ],
    name: "EngineStateRefreshing",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint64",
        name: "version",
        type: "uint64",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "gasSystemAddress",
        type: "address",
      },
    ],
    name: "PaymentSystemChanging",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "messageId",
        type: "bytes32",
      },
      {
        components: [
          {
            internalType: "bytes32",
            name: "messageId",
            type: "bytes32",
          },
          {
            internalType: "uint64",
            name: "earliestArrivalTimestamp",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "latestArrivalTimestamp",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "srcChainid",
            type: "uint64",
          },
          {
            internalType: "bytes32",
            name: "srcTxHash",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "srcContract",
            type: "uint256",
          },
          {
            internalType: "uint32",
            name: "srcChainNonce",
            type: "uint32",
          },
          {
            internalType: "uint256",
            name: "sender",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "additionParams",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "message",
            type: "bytes",
          },
        ],
        indexed: false,
        internalType: "struct IMessageStruct.landingParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "SuccessfulLanding",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint32",
        name: "nonce",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "earliestArrivalTimestamp",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "latestArrivalTimestamp",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "address",
        name: "relayer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "srcContract",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "destChainid",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "additionParams",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "message",
        type: "bytes",
      },
    ],
    name: "SuccessfulLaunchMessage",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint32[]",
        name: "nonce",
        type: "uint32[]",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "earliestArrivalTimestamp",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "latestArrivalTimestamp",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "address",
        name: "relayer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "srcContract",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "value",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint64[]",
        name: "destChainid",
        type: "uint64[]",
      },
      {
        indexed: false,
        internalType: "bytes[]",
        name: "additionParams",
        type: "bytes[]",
      },
      {
        indexed: false,
        internalType: "bytes[]",
        name: "message",
        type: "bytes[]",
      },
    ],
    name: "SuccessfulLaunchMultiMessages",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "WithdrawRequest",
    type: "event",
  },
  {
    inputs: [],
    name: "Chainid",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ENGINE_ADMIN",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "GASPOOL_ADMIN",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "chainId",
        type: "uint64",
      },
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "GetNonceLanding",
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
        internalType: "uint64",
        name: "chainId",
        type: "uint64",
      },
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "GetNonceLaunch",
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
        components: [
          {
            internalType: "bytes32",
            name: "messageId",
            type: "bytes32",
          },
          {
            internalType: "uint64",
            name: "earliestArrivalTimestamp",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "latestArrivalTimestamp",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "srcChainid",
            type: "uint64",
          },
          {
            internalType: "bytes32",
            name: "srcTxHash",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "srcContract",
            type: "uint256",
          },
          {
            internalType: "uint32",
            name: "srcChainNonce",
            type: "uint32",
          },
          {
            internalType: "uint256",
            name: "sender",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "additionParams",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "message",
            type: "bytes",
          },
        ],
        internalType: "struct IMessageStruct.landingParams[]",
        name: "params",
        type: "tuple[]",
      },
      {
        internalType: "bytes[][]",
        name: "proofs",
        type: "bytes[][]",
      },
    ],
    name: "Landing",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "messageId",
            type: "bytes32",
          },
          {
            internalType: "uint64",
            name: "earliestArrivalTimestamp",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "latestArrivalTimestamp",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "srcChainid",
            type: "uint64",
          },
          {
            internalType: "bytes32",
            name: "srcTxHash",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "srcContract",
            type: "uint256",
          },
          {
            internalType: "uint32",
            name: "srcChainNonce",
            type: "uint32",
          },
          {
            internalType: "uint256",
            name: "sender",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "additionParams",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "message",
            type: "bytes",
          },
        ],
        internalType: "struct IMessageStruct.landingParams[]",
        name: "params",
        type: "tuple[]",
      },
      {
        internalType: "uint24",
        name: "gasLimit",
        type: "uint24",
      },
      {
        internalType: "bytes[][]",
        name: "proofs",
        type: "bytes[][]",
      },
    ],
    name: "LandingSpecifiedGas",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "earliestArrivalTimestamp",
        type: "uint64",
      },
      {
        internalType: "uint64",
        name: "latestArrivalTimestamp",
        type: "uint64",
      },
      {
        internalType: "address",
        name: "relayer",
        type: "address",
      },
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "uint64",
        name: "destChainid",
        type: "uint64",
      },
      {
        internalType: "bytes",
        name: "additionParams",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "message",
        type: "bytes",
      },
    ],
    name: "Launch",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "stop",
        type: "bool",
      },
    ],
    name: "PauseEngine",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "REGISTERED_VALIDATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "STATION_ADMIN",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "messageId",
            type: "bytes32",
          },
          {
            internalType: "uint64",
            name: "earliestArrivalTimestamp",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "latestArrivalTimestamp",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "srcChainid",
            type: "uint64",
          },
          {
            internalType: "bytes32",
            name: "srcTxHash",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "srcContract",
            type: "uint256",
          },
          {
            internalType: "uint32",
            name: "srcChainNonce",
            type: "uint32",
          },
          {
            internalType: "uint256",
            name: "sender",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "additionParams",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "message",
            type: "bytes",
          },
        ],
        internalType: "struct IMessageStruct.landingParams[]",
        name: "params",
        type: "tuple[]",
      },
    ],
    name: "SimulateLanding",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_RELAYER",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "UPGRADE_INTERFACE_VERSION",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "Version",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "Withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "engineState",
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
        internalType: "uint256[]",
        name: "value",
        type: "uint256[]",
      },
      {
        internalType: "uint64[]",
        name: "destChainid",
        type: "uint64[]",
      },
      {
        internalType: "bytes[]",
        name: "additionParams",
        type: "bytes[]",
      },
      {
        internalType: "bytes[]",
        name: "message",
        type: "bytes[]",
      },
    ],
    name: "estimateGas",
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
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "uint64",
        name: "destChainid",
        type: "uint64",
      },
      {
        internalType: "bytes",
        name: "additionParams",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "message",
        type: "bytes",
      },
    ],
    name: "estimateGas",
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
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint64",
        name: "destChainId",
        type: "uint64",
      },
    ],
    name: "estimatePrice",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes1",
        name: "hook",
        type: "bytes1",
      },
    ],
    name: "expertLandingHook",
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
        internalType: "bytes1",
        name: "",
        type: "bytes1",
      },
    ],
    name: "expertLandingHooks",
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
        internalType: "bytes1",
        name: "hook",
        type: "bytes1",
      },
    ],
    name: "expertLaunchHook",
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
        internalType: "bytes1",
        name: "",
        type: "bytes1",
      },
    ],
    name: "expertLaunchHooks",
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
    inputs: [],
    name: "gasSystem",
    outputs: [
      {
        internalType: "contract IVizingGasSystemChannel",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "gasSystemAddr",
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
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_gasSystem",
        type: "address",
      },
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "_engineAdmin",
        type: "address[]",
      },
      {
        internalType: "address[]",
        name: "_stationAdmin",
        type: "address[]",
      },
      {
        internalType: "address[]",
        name: "_gasPoolAdmin",
        type: "address[]",
      },
      {
        internalType: "address[]",
        name: "_trustedRelayer",
        type: "address[]",
      },
      {
        internalType: "address[]",
        name: "_registeredValidator",
        type: "address[]",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint64",
            name: "earliestArrivalTimestamp",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "latestArrivalTimestamp",
            type: "uint64",
          },
          {
            internalType: "address",
            name: "relayer",
            type: "address",
          },
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "uint256[]",
            name: "value",
            type: "uint256[]",
          },
          {
            internalType: "uint64[]",
            name: "destChainid",
            type: "uint64[]",
          },
          {
            internalType: "bytes[]",
            name: "additionParams",
            type: "bytes[]",
          },
          {
            internalType: "bytes[]",
            name: "message",
            type: "bytes[]",
          },
        ],
        internalType: "struct IMessageStruct.launchEnhanceParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "launchMultiChain",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "maxArrivalTime",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "minArrivalTime",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
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
    name: "nonceLanding",
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
    name: "nonceLaunch",
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
    name: "padState",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
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
    inputs: [],
    name: "proxiableUUID",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "callerConfirmation",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address[]",
        name: "accounts",
        type: "address[]",
      },
      {
        internalType: "bool[]",
        name: "states",
        type: "bool[]",
      },
    ],
    name: "roleConfiguration",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes1[]",
        name: "ids",
        type: "bytes1[]",
      },
      {
        internalType: "address[]",
        name: "hooks",
        type: "address[]",
      },
    ],
    name: "setExpertLandingHooks",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes1[]",
        name: "ids",
        type: "bytes1[]",
      },
      {
        internalType: "address[]",
        name: "hooks",
        type: "address[]",
      },
    ],
    name: "setExpertLaunchHooks",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "gasSystemAddress",
        type: "address",
      },
    ],
    name: "setGasSystem",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address[]",
        name: "accounts",
        type: "address[]",
      },
      {
        internalType: "bool[]",
        name: "states",
        type: "bool[]",
      },
    ],
    name: "stationAdminSetRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
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
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "validatorCount",
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
    name: "validatorThreshold",
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
    stateMutability: "payable",
    type: "receive",
  },
];
