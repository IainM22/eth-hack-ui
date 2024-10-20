const abi = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_riskyAssets",
        type: "address[]",
        internalType: "address[]",
      },
      {
        name: "_chronicleOracles",
        type: "address[]",
        internalType: "address[]",
      },
      {
        name: "_ethOracle",
        type: "address",
        internalType: "address",
      },
      {
        name: "_rebalancer",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "rebalance",
    inputs: [
      {
        name: "_riskyAssetUSDAmounts",
        type: "uint256[]",
        internalType: "uint256[]",
      },
      {
        name: "_maxDeviationPPM",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_minLongDeposit",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "Rebalanced",
    inputs: [
      {
        name: "safe",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "bondProceeds",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "bondMaturity",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "bondAmount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "UndegenModuleCreated",
    inputs: [
      {
        name: "riskyAssets",
        type: "address[]",
        indexed: false,
        internalType: "address[]",
      },
      {
        name: "chronicleOracles",
        type: "address[]",
        indexed: false,
        internalType: "address[]",
      },
      {
        name: "ethOracle",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "rebalancer",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "UndegenModuleBondNotMatured",
    inputs: [],
  },
];

export default abi;
