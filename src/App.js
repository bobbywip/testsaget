import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";
import detectEthereumProvider from '@metamask/detect-provider';
import Web3EthContract from "web3-eth-contract";
import Web3 from "web3";
// log

const truncate = (input, len) =>
  input.length > len ? `${input.substring(0, len)}...` : input;

export const StyledButton = styled.button`
  padding: 10px;
  border-radius: 50px;
  border: none;
  background-color: var(--secondary);
  padding: 10px;
  font-weight: bold;
  color: var(--secondary-text);
  width: 100px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;


export const StyledButton2 = styled.button`
  		align-items: center;
		  appearance: none;
		  background-image: radial-gradient(100% 100% at 100% 0, #FFED3B 0, #FFAF3B 100%);
		  border: 0;
		  left: 30%;
		  width: 128px;
		  border-radius: 6px;
		  box-shadow: rgba(45, 35, 66, .4) 0 2px 4px,rgba(45, 35, 66, .3) 0 7px 13px -3px,rgba(58, 65, 111, .5) 0 -3px 0 inset;
		  box-sizing: border-box;
		  color: #fff;
		  cursor: pointer;
		  display: inline-flex;
		  font-family: "JetBrains Mono",monospace;
		  height: 48px;
		  justify-content: center;
		  line-height: 1;
		  list-style: none;
		  overflow: hidden;
		  padding-left: 16px;
		  padding-right: 16px;
		  position: relative;
		  text-align: left;
		  text-decoration: none;
		  transition: box-shadow .15s,transform .15s;
		  user-select: none;
		  -webkit-user-select: none;
		  touch-action: manipulation;
		  white-space: nowrap;
		  will-change: box-shadow,transform;
		  font-size: 18px;
      
      :after {
		  background-image: radial-gradient(100% 100% at 100% 0, #FFED3B 0, #FFAF3B 100%);
		  border-radius: 8px;
		  opacity: 0;
		  content: "";
		  display: inline;
		  height: 48px;
		  left: 0;
		  width: 100%;
		  position: absolute;
		  top: -2px;
		  transform: translate(8px, 8px);
		  transition: transform .2s ease-out;
		  z-index: -1;
		}
    :focus {
		  box-shadow: #FFED3B 0 0 0 1.5px inset, rgba(45, 35, 66, .4) 0 2px 4px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #FFAF3B 0 -3px 0 inset;
		}

		:hover {
		  box-shadow: rgba(45, 35, 66, .4) 0 4px 8px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #FFED3B 0 -3px 0 inset;
		  transform: translateY(-2px);
		}

		:active {
		  box-shadow: #FFED3B 0 3px 7px inset;
		  transform: translateY(2px);
		}
`;

export const StyledButton3 = styled.button`
  padding: 2px;
  border-radius: 24px;
  border: none;
  background-color: var(--secondary);
  padding: 2px;
  font-weight: bold;
  color: var(--secondary-text);
  width: 48px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const StyledRoundButton = styled.button`
  padding: 10px;
  border-radius: 100%;
  border: none;
  background-color: var(--primary);
  padding: 10px;
  font-weight: bold;
  font-size: 15px;
  color: var(--primary-text);
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: stretched;
  width: 100%;
  @media (min-width: 767px) {
    flex-direction: row;
  }
`;

export const StyledLogo = styled.img`
  width: 200px;
  @media (min-width: 767px) {
    width: 300px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

export const StyledImg = styled.img`
  box-shadow: 0px 5px 11px 2px rgba(0, 0, 0, 0.7);
  border: 4px solid var(--secondary);
  background-color: var(--accent);
  border-radius: 100%;
  width: 200px;
  @media (min-width: 900px) {
    width: 250px;
  }
  @media (min-width: 1000px) {
    width: 300px;
  }
  transition: width 0.5s;
`;

export const StyledLink = styled.a`
  color: var(--secondary);
  text-decoration: none;
`;


function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [stakedAmount, setStakedAmount] = useState(0);
  const [approved, setApproved] = useState(false);
  const [depositAmount, setDepositAmount] = useState(0);
  const [balanceAmount, setBalanceAmount] = useState(0);		
  const [yieldAmount, setYieldAmount] = useState(0);
  const [commaStakedAmount, setCommaStakedAmount] = useState(`0`);
  const [commaYieldAmount, setCommaYieldAmount] = useState(`0`);
  const [commaBalanceAmount, setCommaBalanceAmount] = useState(`0`);
  const [lastYieldAmount, setLastYieldAmount] = useState(0);
  const [feedback, setFeedback] = useState(`Loading info from contracts...`);
  //const cors = require("cors")
  //const express = require('express')
  //const app = express()
  
    //app.use(
      //cors({
        //orgin: "*"
      //})
    //)


  const Web3 = require("web3");

  //const provider =
    //"https://speedy-nodes-nyc.moralis.io/8e6794454148aa8867e0d2a5/bsc/testnet/";
  


  //const Web3Client = new Web3(new Web3.providers.HttpProvider(provider));

  

  // The minimum ABI required to get the ERC20 Token balance
  const minABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "burn",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "burnFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "burn_address",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "burn_rate",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "subtractedValue",
          "type": "uint256"
        }
      ],
      "name": "decreaseAllowance",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "addedValue",
          "type": "uint256"
        }
      ],
      "name": "increaseAllowance",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "marketing_address",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "marketing_rate",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];




  
  const tokenAddress = "0x6644a2dd2aB3082534ebaB500eB3721CF63B6768";
  
  
  //const contract = new Web3Client.eth.Contract(minABI, tokenAddress);
  
  const contract = new Web3EthContract(
    minABI,
    tokenAddress,
  );




  

  



  
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "",
    SYMBOL: "",
    MAX_SUPPLY: 1,
    WEI_COST: 0,
    DISPLAY_COST: 0,
    GAS_LIMIT: 0,
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    SHOW_BACKGROUND: false,
  });
    


  async function approveStake() {
    let cost = CONFIG.WEI_COST;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalGasLimit = String(gasLimit);
    console.log("Gas limit: ", totalGasLimit);
    setFeedback(`Approving ${depositAmount} PILK for Staking!`);
    console.log(`${tokenAddress} IS THE ADDRESS`);
    getData();
    let reduced = Math.floor(depositAmount);
    console.log(`before the reduce the number is ${reduced}`);
    let num = BigInt(reduced*10**18);
    await contract.methods	  
      .approve(CONFIG.CONTRACT_ADDRESS,num)
      .send({
        gasLimit: String(totalGasLimit),
        to: tokenAddress,
        from: blockchain.account,
        value: 0,
      })
    setApproved(true);
  }

  async function getBalance() {
    const result = await contract.methods.balanceOf(blockchain.account).call();
    setBalanceAmount(result);
  }



  async function unstake() {
    let cost = CONFIG.WEI_COST;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalGasLimit = String(gasLimit);

    console.log("Gas limit: ", totalGasLimit);
    console.log(`Unstaking! ${depositAmount} PILK!`);
    setFeedback(`Unstaking! ${depositAmount} PILK!`);
    console.log(`${CONFIG.CONTRACT_ADDRESS} IS THE ADDRESS`);
    getData();

    let prereduce = depositAmount *0.999;
    let reduced = Math.floor(prereduce);

    console.log(`before the reduce the number is ${reduced}`);
    let num = BigInt(reduced*10**18);

    console.log(`the number we withdraw is ${num}`);
    
    await blockchain.smartContract.methods	  
      .withdraw(num)
      .send({
        gasLimit: String(totalGasLimit),
        to: "0x167123427EDA0C715c6C25256bfC3F6ECcBe311E",
        from: blockchain.account,
        value: 0,
      })
    setApproved(false);
  }
  const stake = () => {

    let cost = CONFIG.WEI_COST;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalGasLimit = String(gasLimit);
    console.log("Gas limit: ", totalGasLimit);
    setFeedback(`Unstaking!`);
    console.log(`${CONFIG.CONTRACT_ADDRESS} IS THE ADDRESS`);
    let reduced = Math.floor(depositAmount);
    console.log(`before the reduce the number is ${reduced}`);
    let num = BigInt(reduced*10**18);
    getData();
    setApproved(false);
    blockchain.smartContract.methods	  
      .deposit(num)
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: 0,
      })
      setApproved(false);
  };
  

  const checkDeposited = () => {
    //setFeedback(`Checking Farm for Tokens!`);
    //console.log(`${CONFIG.CONTRACT_ADDRESS} IS THE ADDRESS`);
    blockchain.smartContract.methods.depositedTokens(blockchain.account).call({from: `${blockchain.account}`}, function(error, result){
      //console.log(`user has ${result} PILK in the farm!`);
      setStakedAmount(result);
      if (result !== 0){
        var calcAPR = result;
        calcAPR = calcAPR * 0.0333 / 10**18;
        calcAPR = calcAPR.toFixed(1);
        if (result !== lastYieldAmount) {
          setFeedback(`Earning ${calcAPR} PILK per day!`);
          setLastYieldAmount(result);
        };
        
      };
    });
  };



  const foreverYield = () => {
    setTimeout(foreverYield, 10000);
    //setFeedback(`Updating Rewards!`);
    //console.log(`${CONFIG.CONTRACT_ADDRESS} IS THE ADDRESS`);
    blockchain.smartContract.methods.getPendingDivs(blockchain.account).call({from: `${blockchain.account}`}, function(error, result){
      //console.log(`user has ${result} PILK to claim!`);
        setYieldAmount(result);
    });
    getBalance();
    checkDeposited();
  };
  

  //const checkYield = () => {
    //setFeedback(`Updating Rewards!`);
    //console.log(`${CONFIG.CONTRACT_ADDRESS} IS THE ADDRESS`);
    //getData();
    //blockchain.smartContract.methods.getPendingDivs(blockchain.account).call({from: `${blockchain.account}`}, function(error, result){
      //console.log(`user has ${result} PILK to claim!`);
      //setYieldAmount(result/1000000000000000000);
    //});
 //};





  const withdrawYield = () => {

    let cost = CONFIG.WEI_COST;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalGasLimit = String(gasLimit);
    console.log("Gas limit: ", totalGasLimit);
    setFeedback(`Withdrawing Dividends!`);
    console.log(`${CONFIG.CONTRACT_ADDRESS} IS THE ADDRESS`);
    getData();
    blockchain.smartContract.methods	  
      .claimDivs()
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: 0,
      })
  };





  
  const buyButton = () => {
    setFeedback(`Importing PILK to Uniswap!`);
    window.open("https://pancakeswap.finance/swap?inputCurrency=0xa3b7a4f7955f9780f8c4a481d597081f5e77d153", '_blank');
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
      foreverYield();
    }
  };





  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  return (
    <s.Screen>
                      <StyledButton2
                        onClick={(e) => {
                          e.preventDefault();
	  		  var a = window.open("http://floppyfishies.io", "w2");
   			  a.focus();
                          console.log("Clicked Home Button");
                        }}
                      >
                        Home
                      </StyledButton2>
    
    
      <s.Container
        flex={1}
        ai={"center"}
        style={{ padding: 24, backgroundColor: "var(--primary)" }}
        image={CONFIG.SHOW_BACKGROUND ? "/config/images/bg.png" : null}
      >
        <StyledLogo alt={"logo"} src={"/config/images/logo2.png"} />
        <s.SpacerSmall />
        <ResponsiveWrapper flex={1} style={{ padding: 24 }} test>
          <s.Container flex={1} jc={"center"} ai={"center"}>
            <StyledImg alt={"example"} src={"/config/images/example.gif"} />
          </s.Container>
          <s.SpacerLarge />
          <s.Container
            flex={2}
            jc={"center"}
            ai={"center"}
            style={{
              backgroundColor: "var(--accent)",
              padding: 24,
              borderRadius: 24,
              border: "4px solid var(--secondary)",
              boxShadow: "0px 5px 11px 2px rgba(0,0,0,0.7)",
            }}
          >
            <s.TextTitle
              style={{
                textAlign: "center",
                fontSize: 50,
                fontWeight: "bold",
                color: "var(--accent-text)",
              }}
            >
              Stake PILK!
            </s.TextTitle>
            <s.TextDescription
              style={{
                textAlign: "center",
                color: "var(--primary-text)",
              }}
            >
              <StyledLink target={"_blank"} href={CONFIG.SCAN_LINK}>
                {truncate(CONFIG.CONTRACT_ADDRESS, 15)}
              </StyledLink>
            </s.TextDescription>
            <s.SpacerSmall />
            {Number(data.totalSupply) >= CONFIG.MAX_SUPPLY ? (
              <>
              </>
            ) : (
              <>
                <s.TextTitle
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                  1200% APR FOR LIFE!
                </s.TextTitle>
                <s.SpacerXSmall />
                <s.TextDescription
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                  Our Staking Contract has a 3 day Time Lock,
                </s.TextDescription>
                <s.TextDescription
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                  This keeps the price stable and stops paperhands!
                </s.TextDescription>
                <s.SpacerSmall />
                <s.Container ai={"center"} jc={"center"} fd={"row"}>
                  <s.SpacerMedium />
                  <s.TextDescription
                      style={{
                        textAlign: "center",
                        color: "var(--accent-text)",
                      }}
                    >
                      {feedback}
                    </s.TextDescription>
                </s.Container>
                <s.SpacerSmall />
                {blockchain.account === "" ||
                blockchain.smartContract === null ? (
                  <s.Container ai={"center"} jc={"center"}>
                    <s.TextDescription
                      style={{
                        textAlign: "center",
                        color: "var(--accent-text)",
                      }}
                    >
                      Connect to the {CONFIG.NETWORK.NAME} Testnet Network
                    </s.TextDescription>
                    <s.SpacerSmall />
                    <StyledButton
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(connect());
                        getData();
                      }}
                    >
                      CONNECT
                    </StyledButton>
                    {blockchain.errorMsg !== "" ? (
                      <>
                        <s.SpacerSmall />
                        <s.TextDescription
                          style={{
                            textAlign: "center",
                            color: "var(--accent-text)",
                          }}
                        >
                          {blockchain.errorMsg}
                        </s.TextDescription>
                      </>
                    ) : null}
                  </s.Container>
                ) : (
                  <>
                    <s.TextDescription
                      style={{
                        textAlign: "center",
                        color: "var(--accent-text)",
                      }}
                    >
                      Balance: &nbsp; {balanceAmount/10**18} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Staked: &nbsp; {stakedAmount/10**18}
                    </s.TextDescription>   

                    <s.Container ai={"center"} jc={"center"} fd={"row"}>
                    <StyledButton
                      onClick={(e) => {
                      e.preventDefault();
                      unstake();
                      }}
                      >
                        Unstake!
                      </StyledButton>
                      <s.SpacerMedium />
                      <StyledButton3
                      onClick={(e) => {
                      e.preventDefault();
                      var roundThis = balanceAmount/10**18;
                      setDepositAmount(Math. floor(roundThis));
                      }}
                      >
                        Max
                      </StyledButton3>
                      
                      <s.TextDescription
                        style={{
                          textAlign: "center",
                          color: "var(--accent-text)",
                        }}
                      >
                        
                                  <input
                                  type="text"
                                  value={depositAmount}
                                  placeholder="0"
                                  onChange={e => setDepositAmount(e.target.value)}
                                />
                                <p>
                                  <strong>{depositAmount}</strong>
                                </p>
                      </s.TextDescription>
                      <StyledButton3
                      onClick={(e) => {
                      e.preventDefault();
                      var roundThis = stakedAmount/10**18;
                      setDepositAmount(Math. floor(roundThis));
                      }}
                      >
                        Max
                      </StyledButton3>
                      <s.SpacerMedium />
                      {
                        approved == false ? (
                          <StyledButton
                          onClick={(e) => {
                          e.preventDefault();
                          approveStake();
                          }}
                          >
                            Approve!
                          </StyledButton>
                        ) : (
                          <StyledButton
                          onClick={(e) => {
                          e.preventDefault();
                          stake();
                          }}
                          >
                            Stake!
                          </StyledButton>
                        )
                      }

                    </s.Container>
                    <s.SpacerSmall />
                    <s.Container ai={"center"} jc={"center"} fd={"row"}>
                    <StyledButton
                      onClick={(e) => {
                      e.preventDefault();
                      buyButton();
                      }}
                      >
                        Buy!
                      </StyledButton>
                      <s.SpacerMedium />
                      <s.TextDescription
                        style={{
                          textAlign: "center",
                          color: "var(--accent-text)",
                        }}
                      >
                        {yieldAmount/10**18}
                      </s.TextDescription>
                      <s.SpacerMedium />
                      <StyledButton
                      onClick={(e) => {
                      e.preventDefault();
                      withdrawYield();
                      }}
                      >
                        Claim!
                      </StyledButton>
                    </s.Container>
                  </>
                )}
              </>
            )}
            <s.SpacerMedium />
          </s.Container>
          <s.SpacerLarge />
          <s.Container flex={1} jc={"center"} ai={"center"}>
            <StyledImg
              alt={"example"}
              src={"/config/images/example.gif"}
              style={{ transform: "scaleX(-1)" }}
            />
          </s.Container>
        </ResponsiveWrapper>
        <s.SpacerMedium />
        <s.Container jc={"center"} ai={"center"} style={{ width: "70%" }}>
          <s.TextDescription
            style={{
              textAlign: "center",
              color: "var(--primary-text)",
            }}
          >
            Please make sure you are connected to the right network (
            {CONFIG.NETWORK.NAME} Testnet Network)
          </s.TextDescription>
          <s.SpacerSmall />
          <s.TextDescription
            style={{
              textAlign: "center",
              color: "var(--primary-text)",
            }}
          >
            We have set the gas limit to {CONFIG.GAS_LIMIT} for the contract to
            succeed.
          </s.TextDescription>


        </s.Container>
      </s.Container>
    </s.Screen>
  );
}

export default App;
