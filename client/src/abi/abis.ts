export const ratingAbi = [
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "userToBeRated",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "rate",
          "type": "uint256"
        }
      ],
      "name": "rateUser",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "rater",
          "type": "address"
        }
      ],
      "name": "getMyRateFromUser",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "ratedUser",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "rater",
          "type": "address"
        }
      ],
      "name": "getUserRateFromUser",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ];