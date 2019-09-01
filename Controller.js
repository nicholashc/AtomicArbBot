const Web3 = require('web3');
const Tx = require("ethereumjs-tx");
const BigNumber = require('bignumber.js');

let web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

/**
 * 0 - GST2
 * 1 - WETH
 * 2 - BNT
 * 3 - ETHTKN
 * 4 - DAI
 * 5 - MKR
 * 6 - TKN 
 * 7 - RLC
 * 8 - NEXO
 * 9 - ANT
 * 10 - RDN
 * 11 - DGD
 * 12 - BAT 
 * 13 - KNC
 * 14 - ENJ
 * 15 - MANA
 * 16 - BNB
 * 17 - SNT
 * 18 - REP**add
 * 19 - ZRX**add
 * 20 - LINK**add
 */

const GST2 = "0x0000000000b3F879cb30FE243b4Dfee438691c04";
const WETH = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
const BNT = "0x1F573D6Fb3F13d689FF844B4cE37794d79a7FF1C";
const ETHTKN = "0xc0829421C1d260BD3cB3E0F06cfE2D52db2cE315";
const DAI = "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359";
const MKR = "0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2";
const TKN = "0xaaaf91d9b90df800df4f55c205fd6989c977e73a";
const RLC = "0x607F4C5BB672230e8672085532f7e901544a7375";
const NEXO = "0xB62132e35a6c13ee1EE0f84dC5d40bad8d815206";
const ANT = "0x960b236A07cf122663c4303350609A66A7B288C0";
const RDN = "0x255Aa6DF07540Cb5d3d297f0D0D4D84cb52bc8e6";
const DGD = "0xE0B7927c4aF23765Cb51314A0E0521A9645F0E2A";
const BAT = "0x0d8775f648430679a709e98d2b0cb6250d2887ef";
const KNC = "0xdd974D5C2e2928deA5F71b9825b8b646686BD200";
const ENJ = "0xf629cbd94d3791c9250152bd8dfbdf380e2a3b9c";
const MANA = "0x0F5D2fB29fb7d3CFeE444a200298f468908cC942";
const BNB = "0xB8c77482e45F1F44dE1745F52C74426C631bDD52";
const SNT = "0x744d70fdbe2ba4cf95131626614a1763df805b9e";


/** UNISWAP */

const uniContractAbi = [{"name": "TokenPurchase", "inputs": [{"type": "address", "name": "buyer", "indexed": true}, {"type": "uint256", "name": "eth_sold", "indexed": true}, {"type": "uint256", "name": "tokens_bought", "indexed": true}], "anonymous": false, "type": "event"}, {"name": "EthPurchase", "inputs": [{"type": "address", "name": "buyer", "indexed": true}, {"type": "uint256", "name": "tokens_sold", "indexed": true}, {"type": "uint256", "name": "eth_bought", "indexed": true}], "anonymous": false, "type": "event"}, {"name": "AddLiquidity", "inputs": [{"type": "address", "name": "provider", "indexed": true}, {"type": "uint256", "name": "eth_amount", "indexed": true}, {"type": "uint256", "name": "token_amount", "indexed": true}], "anonymous": false, "type": "event"}, {"name": "RemoveLiquidity", "inputs": [{"type": "address", "name": "provider", "indexed": true}, {"type": "uint256", "name": "eth_amount", "indexed": true}, {"type": "uint256", "name": "token_amount", "indexed": true}], "anonymous": false, "type": "event"}, {"name": "Transfer", "inputs": [{"type": "address", "name": "_from", "indexed": true}, {"type": "address", "name": "_to", "indexed": true}, {"type": "uint256", "name": "_value", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "Approval", "inputs": [{"type": "address", "name": "_owner", "indexed": true}, {"type": "address", "name": "_spender", "indexed": true}, {"type": "uint256", "name": "_value", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "setup", "outputs": [], "inputs": [{"type": "address", "name": "token_addr"}], "constant": false, "payable": false, "type": "function", "gas": 175875}, {"name": "addLiquidity", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "min_liquidity"}, {"type": "uint256", "name": "max_tokens"}, {"type": "uint256", "name": "deadline"}], "constant": false, "payable": true, "type": "function", "gas": 82616}, {"name": "removeLiquidity", "outputs": [{"type": "uint256", "name": "out"}, {"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "amount"}, {"type": "uint256", "name": "min_eth"}, {"type": "uint256", "name": "min_tokens"}, {"type": "uint256", "name": "deadline"}], "constant": false, "payable": false, "type": "function", "gas": 116814}, {"name": "__default__", "outputs": [], "inputs": [], "constant": false, "payable": true, "type": "function"}, {"name": "ethToTokenSwapInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "min_tokens"}, {"type": "uint256", "name": "deadline"}], "constant": false, "payable": true, "type": "function", "gas": 12757}, {"name": "ethToTokenTransferInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "min_tokens"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}], "constant": false, "payable": true, "type": "function", "gas": 12965}, {"name": "ethToTokenSwapOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}, {"type": "uint256", "name": "deadline"}], "constant": false, "payable": true, "type": "function", "gas": 50463}, {"name": "ethToTokenTransferOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}], "constant": false, "payable": true, "type": "function", "gas": 50671}, {"name": "tokenToEthSwapInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}, {"type": "uint256", "name": "min_eth"}, {"type": "uint256", "name": "deadline"}], "constant": false, "payable": false, "type": "function", "gas": 47503}, {"name": "tokenToEthTransferInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}, {"type": "uint256", "name": "min_eth"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}], "constant": false, "payable": false, "type": "function", "gas": 47712}, {"name": "tokenToEthSwapOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "eth_bought"}, {"type": "uint256", "name": "max_tokens"}, {"type": "uint256", "name": "deadline"}], "constant": false, "payable": false, "type": "function", "gas": 50175}, {"name": "tokenToEthTransferOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "eth_bought"}, {"type": "uint256", "name": "max_tokens"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}], "constant": false, "payable": false, "type": "function", "gas": 50384}, {"name": "tokenToTokenSwapInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}, {"type": "uint256", "name": "min_tokens_bought"}, {"type": "uint256", "name": "min_eth_bought"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "token_addr"}], "constant": false, "payable": false, "type": "function", "gas": 51007}, {"name": "tokenToTokenTransferInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}, {"type": "uint256", "name": "min_tokens_bought"}, {"type": "uint256", "name": "min_eth_bought"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}, {"type": "address", "name": "token_addr"}], "constant": false, "payable": false, "type": "function", "gas": 51098}, {"name": "tokenToTokenSwapOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}, {"type": "uint256", "name": "max_tokens_sold"}, {"type": "uint256", "name": "max_eth_sold"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "token_addr"}], "constant": false, "payable": false, "type": "function", "gas": 54928}, {"name": "tokenToTokenTransferOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}, {"type": "uint256", "name": "max_tokens_sold"}, {"type": "uint256", "name": "max_eth_sold"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}, {"type": "address", "name": "token_addr"}], "constant": false, "payable": false, "type": "function", "gas": 55019}, {"name": "tokenToExchangeSwapInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}, {"type": "uint256", "name": "min_tokens_bought"}, {"type": "uint256", "name": "min_eth_bought"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "exchange_addr"}], "constant": false, "payable": false, "type": "function", "gas": 49342}, {"name": "tokenToExchangeTransferInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}, {"type": "uint256", "name": "min_tokens_bought"}, {"type": "uint256", "name": "min_eth_bought"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}, {"type": "address", "name": "exchange_addr"}], "constant": false, "payable": false, "type": "function", "gas": 49532}, {"name": "tokenToExchangeSwapOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}, {"type": "uint256", "name": "max_tokens_sold"}, {"type": "uint256", "name": "max_eth_sold"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "exchange_addr"}], "constant": false, "payable": false, "type": "function", "gas": 53233}, {"name": "tokenToExchangeTransferOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}, {"type": "uint256", "name": "max_tokens_sold"}, {"type": "uint256", "name": "max_eth_sold"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}, {"type": "address", "name": "exchange_addr"}], "constant": false, "payable": false, "type": "function", "gas": 53423}, {"name": "getEthToTokenInputPrice", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "eth_sold"}], "constant": true, "payable": false, "type": "function", "gas": 5542}, {"name": "getEthToTokenOutputPrice", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}], "constant": true, "payable": false, "type": "function", "gas": 6872}, {"name": "getTokenToEthInputPrice", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}], "constant": true, "payable": false, "type": "function", "gas": 5637}, {"name": "getTokenToEthOutputPrice", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "eth_bought"}], "constant": true, "payable": false, "type": "function", "gas": 6897}, {"name": "tokenAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1413}, {"name": "factoryAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1443}, {"name": "balanceOf", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "address", "name": "_owner"}], "constant": true, "payable": false, "type": "function", "gas": 1645}, {"name": "transfer", "outputs": [{"type": "bool", "name": "out"}], "inputs": [{"type": "address", "name": "_to"}, {"type": "uint256", "name": "_value"}], "constant": false, "payable": false, "type": "function", "gas": 75034}, {"name": "transferFrom", "outputs": [{"type": "bool", "name": "out"}], "inputs": [{"type": "address", "name": "_from"}, {"type": "address", "name": "_to"}, {"type": "uint256", "name": "_value"}], "constant": false, "payable": false, "type": "function", "gas": 110907}, {"name": "approve", "outputs": [{"type": "bool", "name": "out"}], "inputs": [{"type": "address", "name": "_spender"}, {"type": "uint256", "name": "_value"}], "constant": false, "payable": false, "type": "function", "gas": 38769}, {"name": "allowance", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "address", "name": "_owner"}, {"type": "address", "name": "_spender"}], "constant": true, "payable": false, "type": "function", "gas": 1925}, {"name": "name", "outputs": [{"type": "bytes32", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1623}, {"name": "symbol", "outputs": [{"type": "bytes32", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1653}, {"name": "decimals", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1683}, {"name": "totalSupply", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1713}]

const uniMKRContractAddress = "0x2c4bd064b998838076fa341a83d007fc2fa50957";
const uniMKRContractInstance = new web3.eth.Contract(uniContractAbi, uniMKRContractAddress);

const uniDAIContractAddress = "0x09cabec1ead1c0ba254b09efb3ee13841712be14";
const uniDAIContractInstance = new web3.eth.Contract(uniContractAbi, uniDAIContractAddress);

const uniTKNContractAddress = "0xb6cFBf322db47D39331E306005DC7E5e6549942B";
const uniTKNContractInstance = new web3.eth.Contract(uniContractAbi, uniTKNContractAddress);

const uniRLCContractAddress = "0xA825CAE02B310E9901b4776806CE25db520c8642";
const uniRLCContractInstance = new web3.eth.Contract(uniContractAbi, uniRLCContractAddress);

const uniNEXOContractAddress = "0x069C97DBA948175D10af4b2414969e0B88d44669";
const uniNEXOContractInstance = new web3.eth.Contract(uniContractAbi, uniNEXOContractAddress);

const uniANTContractAddress = "0x077d52B047735976dfdA76feF74d4d988AC25196";
const uniANTContractInstance = new web3.eth.Contract(uniContractAbi, uniANTContractAddress);

const uniRDNContractAddress = "0x7D03CeCb36820b4666F45E1b4cA2538724Db271C";
const uniRDNContractInstance = new web3.eth.Contract(uniContractAbi, uniRDNContractAddress);

const uniDGDContractAddress = "0xD55C1cA9F5992A2e5E379DCe49Abf24294ABe055";
const uniDGDContractInstance = new web3.eth.Contract(uniContractAbi, uniDGDContractAddress);

const uniBATContractAddress = "0x2e642b8d59b45a1d8c5aef716a84ff44ea665914";
const uniBATContractInstance = new web3.eth.Contract(uniContractAbi, uniBATContractAddress);

const uniKNCContractAddress = "0x49c4f9bc14884f6210F28342ceD592A633801a8b";
const uniKNCContractInstance = new web3.eth.Contract(uniContractAbi, uniKNCContractAddress);

const uniMANAContractAddress = "0xc6581ce3a005e2801c1e0903281bbd318ec5b5c2";
const uniMANAContractInstance = new web3.eth.Contract(uniContractAbi, uniMANAContractAddress);

/** OASIS */

const oasisContractAbi = [{"constant":true,"inputs":[],"name":"matchingEnabled","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"sell_gem","type":"address"},{"name":"buy_gem","type":"address"}],"name":"getBestOffer","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"pay_gem","type":"address"},{"name":"pay_amt","type":"uint256"},{"name":"buy_gem","type":"address"},{"name":"min_fill_amount","type":"uint256"}],"name":"sellAllAmount","outputs":[{"name":"fill_amt","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"stop","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"pay_gem","type":"address"},{"name":"buy_gem","type":"address"},{"name":"pay_amt","type":"uint128"},{"name":"buy_amt","type":"uint128"}],"name":"make","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"owner_","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"buy_gem","type":"address"},{"name":"pay_gem","type":"address"},{"name":"pay_amt","type":"uint256"}],"name":"getBuyAmount","outputs":[{"name":"fill_amt","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"pay_amt","type":"uint256"},{"name":"pay_gem","type":"address"},{"name":"buy_amt","type":"uint256"},{"name":"buy_gem","type":"address"},{"name":"pos","type":"uint256"}],"name":"offer","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"},{"name":"pos","type":"uint256"}],"name":"insert","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"last_offer_id","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"matchingEnabled_","type":"bool"}],"name":"setMatchingEnabled","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"}],"name":"cancel","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"getOffer","outputs":[{"name":"","type":"uint256"},{"name":"","type":"address"},{"name":"","type":"uint256"},{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"}],"name":"del_rank","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"bytes32"},{"name":"maxTakeAmount","type":"uint128"}],"name":"take","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"pay_gem","type":"address"}],"name":"getMinSell","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getTime","outputs":[{"name":"","type":"uint64"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"dustId","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"getNextUnsortedOffer","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"close_time","outputs":[{"name":"","type":"uint64"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"_span","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"_best","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"stopped","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"id_","type":"bytes32"}],"name":"bump","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"authority_","type":"address"}],"name":"setAuthority","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"sell_gem","type":"address"},{"name":"buy_gem","type":"address"}],"name":"getOfferCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"buy_gem","type":"address"},{"name":"buy_amt","type":"uint256"},{"name":"pay_gem","type":"address"},{"name":"max_fill_amount","type":"uint256"}],"name":"buyAllAmount","outputs":[{"name":"fill_amt","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"isActive","outputs":[{"name":"active","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"offers","outputs":[{"name":"pay_amt","type":"uint256"},{"name":"pay_gem","type":"address"},{"name":"buy_amt","type":"uint256"},{"name":"buy_gem","type":"address"},{"name":"owner","type":"address"},{"name":"timestamp","type":"uint64"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getFirstUnsortedOffer","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"getBetterOffer","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"_dust","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"getWorseOffer","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"_near","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"bytes32"}],"name":"kill","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"pay_gem","type":"address"},{"name":"dust","type":"uint256"}],"name":"setMinSell","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"authority","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isClosed","outputs":[{"name":"closed","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"_rank","outputs":[{"name":"next","type":"uint256"},{"name":"prev","type":"uint256"},{"name":"delb","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"getOwner","outputs":[{"name":"owner","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"isOfferSorted","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"buyEnabled_","type":"bool"}],"name":"setBuyEnabled","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"},{"name":"amount","type":"uint256"}],"name":"buy","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"pay_amt","type":"uint256"},{"name":"pay_gem","type":"address"},{"name":"buy_amt","type":"uint256"},{"name":"buy_gem","type":"address"},{"name":"pos","type":"uint256"},{"name":"rounding","type":"bool"}],"name":"offer","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"pay_amt","type":"uint256"},{"name":"pay_gem","type":"address"},{"name":"buy_amt","type":"uint256"},{"name":"buy_gem","type":"address"}],"name":"offer","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"buyEnabled","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"pay_gem","type":"address"},{"name":"buy_gem","type":"address"},{"name":"buy_amt","type":"uint256"}],"name":"getPayAmount","outputs":[{"name":"fill_amt","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"close_time","type":"uint64"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":true,"inputs":[{"indexed":true,"name":"sig","type":"bytes4"},{"indexed":true,"name":"guy","type":"address"},{"indexed":true,"name":"foo","type":"bytes32"},{"indexed":true,"name":"bar","type":"bytes32"},{"indexed":false,"name":"wad","type":"uint256"},{"indexed":false,"name":"fax","type":"bytes"}],"name":"LogNote","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"id","type":"uint256"}],"name":"LogItemUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"pay_amt","type":"uint256"},{"indexed":true,"name":"pay_gem","type":"address"},{"indexed":false,"name":"buy_amt","type":"uint256"},{"indexed":true,"name":"buy_gem","type":"address"}],"name":"LogTrade","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"id","type":"bytes32"},{"indexed":true,"name":"pair","type":"bytes32"},{"indexed":true,"name":"maker","type":"address"},{"indexed":false,"name":"pay_gem","type":"address"},{"indexed":false,"name":"buy_gem","type":"address"},{"indexed":false,"name":"pay_amt","type":"uint128"},{"indexed":false,"name":"buy_amt","type":"uint128"},{"indexed":false,"name":"timestamp","type":"uint64"}],"name":"LogMake","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"id","type":"bytes32"},{"indexed":true,"name":"pair","type":"bytes32"},{"indexed":true,"name":"maker","type":"address"},{"indexed":false,"name":"pay_gem","type":"address"},{"indexed":false,"name":"buy_gem","type":"address"},{"indexed":false,"name":"pay_amt","type":"uint128"},{"indexed":false,"name":"buy_amt","type":"uint128"},{"indexed":false,"name":"timestamp","type":"uint64"}],"name":"LogBump","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"id","type":"bytes32"},{"indexed":true,"name":"pair","type":"bytes32"},{"indexed":true,"name":"maker","type":"address"},{"indexed":false,"name":"pay_gem","type":"address"},{"indexed":false,"name":"buy_gem","type":"address"},{"indexed":true,"name":"taker","type":"address"},{"indexed":false,"name":"take_amt","type":"uint128"},{"indexed":false,"name":"give_amt","type":"uint128"},{"indexed":false,"name":"timestamp","type":"uint64"}],"name":"LogTake","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"id","type":"bytes32"},{"indexed":true,"name":"pair","type":"bytes32"},{"indexed":true,"name":"maker","type":"address"},{"indexed":false,"name":"pay_gem","type":"address"},{"indexed":false,"name":"buy_gem","type":"address"},{"indexed":false,"name":"pay_amt","type":"uint128"},{"indexed":false,"name":"buy_amt","type":"uint128"},{"indexed":false,"name":"timestamp","type":"uint64"}],"name":"LogKill","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"authority","type":"address"}],"name":"LogSetAuthority","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"}],"name":"LogSetOwner","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"isEnabled","type":"bool"}],"name":"LogBuyEnabled","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"pay_gem","type":"address"},{"indexed":false,"name":"min_amount","type":"uint256"}],"name":"LogMinSell","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"isEnabled","type":"bool"}],"name":"LogMatchingEnabled","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"id","type":"uint256"}],"name":"LogUnsortedOffer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"id","type":"uint256"}],"name":"LogSortedOffer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"keeper","type":"address"},{"indexed":false,"name":"id","type":"uint256"}],"name":"LogInsert","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"keeper","type":"address"},{"indexed":false,"name":"id","type":"uint256"}],"name":"LogDelete","type":"event"}]
const oasisContractAddress = "0x39755357759cE0d7f32dC8dC45414CCa409AE24e";
const oasisContractInstance = new web3.eth.Contract(oasisContractAbi, oasisContractAddress);

/** BANCOR */

const bancorContractAbi = [{"constant":true,"inputs":[],"name":"BANCOR_CONVERTER_UPGRADER","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_connectorToken","type":"address"},{"name":"_weight","type":"uint32"},{"name":"_enableVirtualBalance","type":"bool"},{"name":"_virtualBalance","type":"uint256"}],"name":"updateConnector","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"connectors","outputs":[{"name":"virtualBalance","type":"uint256"},{"name":"weight","type":"uint32"},{"name":"isVirtualBalanceEnabled","type":"bool"},{"name":"isSaleEnabled","type":"bool"},{"name":"isSet","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"connectorTokens","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"BNT_TOKEN","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_fromToken","type":"address"},{"name":"_toToken","type":"address"},{"name":"_amount","type":"uint256"}],"name":"getReturn","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"allowRegistryUpdate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferTokenOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_path","type":"address[]"},{"name":"_amount","type":"uint256"},{"name":"_minReturn","type":"uint256"},{"name":"_block","type":"uint256"},{"name":"_v","type":"uint8"},{"name":"_r","type":"bytes32"},{"name":"_s","type":"bytes32"}],"name":"quickConvertPrioritized","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_disable","type":"bool"}],"name":"disableConversions","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"CONTRACT_REGISTRY","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_fromToken","type":"address"},{"name":"_toToken","type":"address"},{"name":"_amount","type":"uint256"},{"name":"_minReturn","type":"uint256"}],"name":"convertInternal","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"acceptTokenOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_amount","type":"uint256"},{"name":"_magnitude","type":"uint8"}],"name":"getFinalAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"converterType","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_token","type":"address"},{"name":"_weight","type":"uint32"},{"name":"_enableVirtualBalance","type":"bool"}],"name":"addConnector","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_amount","type":"uint256"}],"name":"liquidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_token","type":"address"},{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"withdrawFromToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"newManager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"manager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"updateRegistry","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_whitelist","type":"address"}],"name":"setConversionWhitelist","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_path","type":"address[]"},{"name":"_minReturn","type":"uint256"},{"name":"_conversionId","type":"uint256"},{"name":"_block","type":"uint256"},{"name":"_v","type":"uint8"},{"name":"_r","type":"bytes32"},{"name":"_s","type":"bytes32"}],"name":"completeXConversion","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"conversionFee","outputs":[{"name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"BANCOR_CONVERTER_FACTORY","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_token","type":"address"},{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"withdrawTokens","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_fromToken","type":"address"},{"name":"_toToken","type":"address"},{"name":"_amount","type":"uint256"},{"name":"_minReturn","type":"uint256"}],"name":"change","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"prevRegistry","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"BNT_CONVERTER","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"BANCOR_FORMULA","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"connectorTokenCount","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_connectorToken","type":"address"},{"name":"_sellAmount","type":"uint256"}],"name":"getSaleReturn","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_fromToken","type":"address"},{"name":"_toToken","type":"address"},{"name":"_amount","type":"uint256"},{"name":"_minReturn","type":"uint256"}],"name":"convert","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"registry","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"CONTRACT_FEATURES","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_disable","type":"bool"}],"name":"disableTokenTransfers","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"claimTokensEnabled","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_fromConnectorToken","type":"address"},{"name":"_toConnectorToken","type":"address"},{"name":"_sellAmount","type":"uint256"}],"name":"getCrossConnectorReturn","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"BANCOR_NETWORK","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"BANCOR_GAS_PRICE_LIMIT","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"CONVERTER_CONVERSION_WHITELIST","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maxConversionFee","outputs":[{"name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_connectorToken","type":"address"},{"name":"_disable","type":"bool"}],"name":"disableConnectorSale","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_connectorToken","type":"address"},{"name":"_depositAmount","type":"uint256"}],"name":"getPurchaseReturn","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_enable","type":"bool"}],"name":"enableClaimTokens","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"restoreRegistry","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"conversionsEnabled","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"conversionWhitelist","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"BANCOR_X","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptManagement","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_amount","type":"uint256"}],"name":"fund","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"BANCOR_X_UPGRADER","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"upgrade","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_connectorToken","type":"address"}],"name":"getConnectorBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newManager","type":"address"}],"name":"transferManagement","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_conversionFee","type":"uint32"}],"name":"setConversionFee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_path","type":"address[]"},{"name":"_amount","type":"uint256"},{"name":"_minReturn","type":"uint256"}],"name":"quickConvert","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_disable","type":"bool"}],"name":"disableRegistryUpdate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"token","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_amount","type":"uint256"}],"name":"claimTokens","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_token","type":"address"},{"name":"_registry","type":"address"},{"name":"_maxConversionFee","type":"uint32"},{"name":"_connectorToken","type":"address"},{"name":"_connectorWeight","type":"uint32"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_fromToken","type":"address"},{"indexed":true,"name":"_toToken","type":"address"},{"indexed":true,"name":"_trader","type":"address"},{"indexed":false,"name":"_amount","type":"uint256"},{"indexed":false,"name":"_return","type":"uint256"},{"indexed":false,"name":"_conversionFee","type":"int256"}],"name":"Conversion","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_connectorToken","type":"address"},{"indexed":false,"name":"_tokenSupply","type":"uint256"},{"indexed":false,"name":"_connectorBalance","type":"uint256"},{"indexed":false,"name":"_connectorWeight","type":"uint32"}],"name":"PriceDataUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_prevFee","type":"uint32"},{"indexed":false,"name":"_newFee","type":"uint32"}],"name":"ConversionFeeUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_conversionsEnabled","type":"bool"}],"name":"ConversionsEnable","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_prevManager","type":"address"},{"indexed":true,"name":"_newManager","type":"address"}],"name":"ManagerUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_prevOwner","type":"address"},{"indexed":true,"name":"_newOwner","type":"address"}],"name":"OwnerUpdate","type":"event"}];
const bancorContractAddress = "0xCBc6a023eb975a1e2630223a7959988948E664f3";
const bancorContractInstance = new web3.eth.Contract(bancorContractAbi, bancorContractAddress);

const bancorGasContractAbi = [{"constant":true,"inputs":[{"name":"_gasPrice","type":"uint256"}],"name":"validateGasPrice","outputs":[],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_gasPrice","type":"uint256"}],"name":"setGasPrice","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"gasPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_gasPrice","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_prevOwner","type":"address"},{"indexed":true,"name":"_newOwner","type":"address"}],"name":"OwnerUpdate","type":"event"}];
const bancorGasContractAddress = "0x607a5C47978e2Eb6d59C6C6f51bc0bF411f4b85a";
const bancorGasContractInstance = new web3.eth.Contract(bancorGasContractAbi, bancorGasContractAddress);

const bancorTknContractAbi = [{"constant":true,"inputs":[],"name":"BANCOR_CONVERTER_UPGRADER","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_connectorToken","type":"address"},{"name":"_weight","type":"uint32"},{"name":"_enableVirtualBalance","type":"bool"},{"name":"_virtualBalance","type":"uint256"}],"name":"updateConnector","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"connectors","outputs":[{"name":"virtualBalance","type":"uint256"},{"name":"weight","type":"uint32"},{"name":"isVirtualBalanceEnabled","type":"bool"},{"name":"isPurchaseEnabled","type":"bool"},{"name":"isSet","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"connectorTokens","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"BNT_TOKEN","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_fromToken","type":"address"},{"name":"_toToken","type":"address"},{"name":"_amount","type":"uint256"}],"name":"getReturn","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferTokenOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_path","type":"address[]"},{"name":"_amount","type":"uint256"},{"name":"_minReturn","type":"uint256"},{"name":"_block","type":"uint256"},{"name":"_v","type":"uint8"},{"name":"_r","type":"bytes32"},{"name":"_s","type":"bytes32"}],"name":"quickConvertPrioritized","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_disable","type":"bool"}],"name":"disableConversions","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_fromToken","type":"address"},{"name":"_toToken","type":"address"},{"name":"_amount","type":"uint256"},{"name":"_minReturn","type":"uint256"}],"name":"convertInternal","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"acceptTokenOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_amount","type":"uint256"},{"name":"_magnitude","type":"uint8"}],"name":"getFinalAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"converterType","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_token","type":"address"},{"name":"_weight","type":"uint32"},{"name":"_enableVirtualBalance","type":"bool"}],"name":"addConnector","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_token","type":"address"},{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"withdrawFromToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"newManager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"manager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_whitelist","type":"address"}],"name":"setConversionWhitelist","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"clearQuickBuyPath","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_connectorToken","type":"address"},{"name":"_disable","type":"bool"}],"name":"disableConnectorPurchases","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"conversionFee","outputs":[{"name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"BANCOR_CONVERTER_FACTORY","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_token","type":"address"},{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"withdrawTokens","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_fromToken","type":"address"},{"name":"_toToken","type":"address"},{"name":"_amount","type":"uint256"},{"name":"_minReturn","type":"uint256"}],"name":"change","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"BANCOR_FORMULA","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"connectorTokenCount","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_connectorToken","type":"address"},{"name":"_sellAmount","type":"uint256"}],"name":"getSaleReturn","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_fromToken","type":"address"},{"name":"_toToken","type":"address"},{"name":"_amount","type":"uint256"},{"name":"_minReturn","type":"uint256"}],"name":"convert","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"registry","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"CONTRACT_FEATURES","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_disable","type":"bool"}],"name":"disableTokenTransfers","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_fromConnectorToken","type":"address"},{"name":"_toConnectorToken","type":"address"},{"name":"_sellAmount","type":"uint256"}],"name":"getCrossConnectorReturn","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"BANCOR_NETWORK","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"BANCOR_GAS_PRICE_LIMIT","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"CONVERTER_CONVERSION_WHITELIST","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getQuickBuyPathLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maxConversionFee","outputs":[{"name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_connectorToken","type":"address"},{"name":"_depositAmount","type":"uint256"}],"name":"getPurchaseReturn","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_registry","type":"address"}],"name":"setRegistry","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"conversionsEnabled","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"conversionWhitelist","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptManagement","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_path","type":"address[]"}],"name":"setQuickBuyPath","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_connectorToken","type":"address"}],"name":"getConnectorBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newManager","type":"address"}],"name":"transferManagement","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"quickBuyPath","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_conversionFee","type":"uint32"}],"name":"setConversionFee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_path","type":"address[]"},{"name":"_amount","type":"uint256"},{"name":"_minReturn","type":"uint256"}],"name":"quickConvert","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"token","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_token","type":"address"},{"name":"_registry","type":"address"},{"name":"_maxConversionFee","type":"uint32"},{"name":"_connectorToken","type":"address"},{"name":"_connectorWeight","type":"uint32"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_fromToken","type":"address"},{"indexed":true,"name":"_toToken","type":"address"},{"indexed":true,"name":"_trader","type":"address"},{"indexed":false,"name":"_amount","type":"uint256"},{"indexed":false,"name":"_return","type":"uint256"},{"indexed":false,"name":"_conversionFee","type":"int256"}],"name":"Conversion","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_connectorToken","type":"address"},{"indexed":false,"name":"_tokenSupply","type":"uint256"},{"indexed":false,"name":"_connectorBalance","type":"uint256"},{"indexed":false,"name":"_connectorWeight","type":"uint32"}],"name":"PriceDataUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_prevFee","type":"uint32"},{"indexed":false,"name":"_newFee","type":"uint32"}],"name":"ConversionFeeUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_prevManager","type":"address"},{"indexed":true,"name":"_newManager","type":"address"}],"name":"ManagerUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_prevOwner","type":"address"},{"indexed":true,"name":"_newOwner","type":"address"}],"name":"OwnerUpdate","type":"event"}];

const bancorDAIContractAddress = "0x587044b74004E3D5eF2D453b7F8d198d9e4cB558";
const bancorDAIContractInstance = new web3.eth.Contract(bancorTknContractAbi, bancorDAIContractAddress);

const bancorMKRContractAddress = "0xfdbb3b3Cfd6fcc0DD5C1B5bff05bFfAC1DB42258";
const bancorMKRContractInstance = new web3.eth.Contract(bancorTknContractAbi, bancorMKRContractAddress);

const bancorTKNContractAddress = "0xC04B5a4556d00Bca8eac5F5accA31981a6597409";
const bancorTKNContractInstance = new web3.eth.Contract(bancorTknContractAbi, bancorTKNContractAddress);

const bancorRLCContractAddress = "0x8b30e174BdDB3C0376e666aFB8a4196e2F53182d";
const bancorRLCContractInstance = new web3.eth.Contract(bancorTknContractAbi, bancorRLCContractAddress);

const bancorNEXOContractAddress = "0xa2630FC0233940779F25DFDCff3aBbDc85682a4c";
const bancorNEXOContractInstance = new web3.eth.Contract(bancorTknContractAbi, bancorNEXOContractAddress);

const bancorANTContractAddress = "0xA0dc0Aa8Ff89A74C9E5EDCB008788B201405683c";
const bancorANTContractInstance = new web3.eth.Contract(bancorTknContractAbi, bancorANTContractAddress);

const bancorRDNContractAddress = "0xB7246144F53Ec44E0f845Fd0DEea85208acFC2C9";
const bancorRDNContractInstance = new web3.eth.Contract(bancorTknContractAbi, bancorRDNContractAddress);

const bancorDGDContractAddress = "0x9b42a6DDE041Bd3b812e4dDe32aD2887fB9D08da";
const bancorDGDContractInstance = new web3.eth.Contract(bancorTknContractAbi, bancorDGDContractAddress);

const bancorBATContractAddress = "0x46ffCDc6D8e6ed69F124D944bbfe0ac74f8FCF7F";
const bancorBATContractInstance = new web3.eth.Contract(bancorTknContractAbi, bancorBATContractAddress);

const bancorKNCContractAddress = "0xcDe79F10b689A716029D0Edb54de78b1bbC14957";
const bancorKNCContractInstance = new web3.eth.Contract(bancorTknContractAbi, bancorKNCContractAddress);

const bancorENJContractAddress = "0x9e8f95969aB023c36541Bc089e25D50C6fCF0811";
const bancorENJContractInstance = new web3.eth.Contract(bancorTknContractAbi, bancorENJContractAddress);

const bancorMANAContractAddress = "0x967f1c667fC490ddd2fb941e3a461223C03D40e9";
const bancorMANAContractInstance = new web3.eth.Contract(bancorTknContractAbi, bancorMANAContractAddress);

const bancorBNBContractAddress = "0x751b934E7496E437503D74D0679A45E49C0B7071";
const bancorBNBContractInstance = new web3.eth.Contract(bancorTknContractAbi, bancorBNBContractAddress);

const bancorSNTContractAddress = "0x599485Dc0f3D8b308B973B2Db5Cd44baE46D31c4";
const bancorSNTContractInstance = new web3.eth.Contract(bancorTknContractAbi, bancorSNTContractAddress);


/** KYBER */

const kyberContractAbi = [{"constant":false,"inputs":[{"name":"alerter","type":"address"}],"name":"removeAlerter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"enabled","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"pendingAdmin","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getOperators","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"srcAmount","type":"uint256"},{"name":"dest","type":"address"},{"name":"destAddress","type":"address"},{"name":"maxDestAmount","type":"uint256"},{"name":"minConversionRate","type":"uint256"},{"name":"walletId","type":"address"},{"name":"hint","type":"bytes"}],"name":"tradeWithHint","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"srcAmount","type":"uint256"},{"name":"minConversionRate","type":"uint256"}],"name":"swapTokenToEther","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"amount","type":"uint256"},{"name":"sendTo","type":"address"}],"name":"withdrawToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"maxGasPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newAlerter","type":"address"}],"name":"addAlerter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"kyberNetworkContract","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"user","type":"address"}],"name":"getUserCapInWei","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"srcAmount","type":"uint256"},{"name":"dest","type":"address"},{"name":"minConversionRate","type":"uint256"}],"name":"swapTokenToToken","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newAdmin","type":"address"}],"name":"transferAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"claimAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"minConversionRate","type":"uint256"}],"name":"swapEtherToToken","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"newAdmin","type":"address"}],"name":"transferAdminQuickly","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getAlerters","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"src","type":"address"},{"name":"dest","type":"address"},{"name":"srcQty","type":"uint256"}],"name":"getExpectedRate","outputs":[{"name":"expectedRate","type":"uint256"},{"name":"slippageRate","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"user","type":"address"},{"name":"token","type":"address"}],"name":"getUserCapInTokenWei","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOperator","type":"address"}],"name":"addOperator","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_kyberNetworkContract","type":"address"}],"name":"setKyberNetworkContract","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"operator","type":"address"}],"name":"removeOperator","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"field","type":"bytes32"}],"name":"info","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"srcAmount","type":"uint256"},{"name":"dest","type":"address"},{"name":"destAddress","type":"address"},{"name":"maxDestAmount","type":"uint256"},{"name":"minConversionRate","type":"uint256"},{"name":"walletId","type":"address"}],"name":"trade","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"},{"name":"sendTo","type":"address"}],"name":"withdrawEther","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"token","type":"address"},{"name":"user","type":"address"}],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"admin","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_admin","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"trader","type":"address"},{"indexed":false,"name":"src","type":"address"},{"indexed":false,"name":"dest","type":"address"},{"indexed":false,"name":"actualSrcAmount","type":"uint256"},{"indexed":false,"name":"actualDestAmount","type":"uint256"}],"name":"ExecuteTrade","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newNetworkContract","type":"address"},{"indexed":false,"name":"oldNetworkContract","type":"address"}],"name":"KyberNetworkSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"token","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"sendTo","type":"address"}],"name":"TokenWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"sendTo","type":"address"}],"name":"EtherWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"pendingAdmin","type":"address"}],"name":"TransferAdminPending","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newAdmin","type":"address"},{"indexed":false,"name":"previousAdmin","type":"address"}],"name":"AdminClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newAlerter","type":"address"},{"indexed":false,"name":"isAdd","type":"bool"}],"name":"AlerterAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newOperator","type":"address"},{"indexed":false,"name":"isAdd","type":"bool"}],"name":"OperatorAdded","type":"event"}];
const kyberContractAddress = "0x818E6FECD516Ecc3849DAf6845e3EC868087B755";
const kyberContractInstance = new web3.eth.Contract(kyberContractAbi, kyberContractAddress);

/** ARB CONTRACT */

const arbContractAbi = [{"constant":false,"inputs":[{"name":"_address","type":"address"},{"name":"_symbol","type":"string"},{"name":"_uniEx","type":"address"},{"name":"_bancorEx","type":"address"}],"name":"addTokenWithExchange","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"},{"name":"_id","type":"uint256"}],"name":"addUniAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"},{"name":"_target","type":"address"},{"name":"_amount","type":"uint256"}],"name":"approveERC20","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_amount","type":"uint256"}],"name":"burnGasToken","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_ETH","type":"uint256"},{"name":"_addressPath","type":"bytes"}],"name":"buyBancor","outputs":[{"name":"","type":"bool"},{"name":"","type":"bytes"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_tokenID","type":"uint256"},{"name":"_addressPath","type":"bytes"}],"name":"buyBancorSellKyber","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_tokenID","type":"uint256"},{"name":"_addressPath","type":"bytes"}],"name":"buyBancorSellOasis","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_tokenID","type":"uint256"},{"name":"_addressPath","type":"bytes"}],"name":"buyBancorSellUni","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_ETH","type":"uint256"},{"name":"_tokenID","type":"uint256"}],"name":"buyKyber","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_tokenID","type":"uint256"},{"name":"_addressPath","type":"bytes"}],"name":"buyKyberSellBancor","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_tokenID","type":"uint256"}],"name":"buyKyberSellOasis","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_tokenID","type":"uint256"}],"name":"buyKyberSellUni","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_ETH","type":"uint256"},{"name":"_tokenID","type":"uint256"}],"name":"buyOasis","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_tokenID","type":"uint256"},{"name":"_addressPath","type":"bytes"}],"name":"buyOasisSellBancor","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_tokenID","type":"uint256"}],"name":"buyOasisSellKyber","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_tokenID","type":"uint256"}],"name":"buyOasisSellUni","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_tokenID","type":"uint256"},{"name":"_addressPath","type":"bytes"}],"name":"buyUniSellBancor","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_tokenID","type":"uint256"}],"name":"buyUniSellKyber","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_tokenID","type":"uint256"}],"name":"buyUniSellOasis","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_ETH","type":"uint256"},{"name":"_tokenID","type":"uint256"}],"name":"buyUniswap","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_buffer","type":"uint256"}],"name":"changeBuffer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_maxBuy","type":"uint256"}],"name":"changeMaxBuy","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_amount","type":"uint256"}],"name":"mintGasTokens","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_tokenID","type":"uint256"},{"name":"_tokenAmount","type":"uint256"},{"name":"_addressPath","type":"bytes"}],"name":"sellBancor","outputs":[{"name":"","type":"bool"},{"name":"","type":"bytes"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_tokenAmount","type":"uint256"},{"name":"_tokenID","type":"uint256"}],"name":"sellKyber","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_tokensSold","type":"uint256"},{"name":"_tokenID","type":"uint256"}],"name":"sellOasis","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_tokensSold","type":"uint256"},{"name":"_tokenID","type":"uint256"}],"name":"sellUniswap","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"}],"name":"setController","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_gst","type":"uint256"},{"name":"_gstBancor","type":"uint256"}],"name":"setGstAmount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"toggleRequire","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"},{"name":"_target","type":"address"},{"name":"_amount","type":"uint256"}],"name":"transferERC20","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_amount","type":"uint256"}],"name":"unwrapWETH","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"withdrawAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_amount","type":"uint256"}],"name":"withdrawAmount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_amount","type":"uint256"}],"name":"wrapWETH","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"inputs":[{"name":"_controller","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"constant":true,"inputs":[],"name":"BANCOR","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"bancorAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"BNT","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"buffer","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"controller","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ETHTKN","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_ETHamount","type":"uint256"},{"name":"_tokenID","type":"uint256"}],"name":"getBancorBuyPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_ETHamount","type":"uint256"},{"name":"_tokenID","type":"uint256"}],"name":"getBancorSellPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_id","type":"uint256"},{"name":"_spender","type":"address"}],"name":"getERC20allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_id","type":"uint256"}],"name":"getERC20balance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getETHbalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getETHbalanceThreshold","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_ETHamount","type":"uint256"},{"name":"_tokenID","type":"uint256"}],"name":"getKyberBuyPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokenAmount","type":"uint256"},{"name":"_tokenID","type":"uint256"}],"name":"getKyberSellPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_ETHamount","type":"uint256"},{"name":"_tokenID","type":"uint256"}],"name":"getOasisBuyPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_ETHamount","type":"uint256"},{"name":"_tokenID","type":"uint256"}],"name":"getOasisSellPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_ETHamount","type":"uint256"},{"name":"_tokenID","type":"uint256"}],"name":"getUniBuyPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_ETHamount","type":"uint256"},{"name":"_tokenID","type":"uint256"}],"name":"getUniSellPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"GST2","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"gstAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"gstAmountBancor","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"KYBER","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maxBuy","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"OASIS","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"requireToggle","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"tokenAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokenCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"tokenSymbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"uniAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"WETH","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}];
const arbContractAddress = "TOP_SECRET";
const arbContractInstance = new web3.eth.Contract(arbContractAbi, arbContractAddress);

/** GENERAL VARIABLES */

let bancorBuyPriceBNT = 0
let oneEth = "1000000000000000000"
let oneEthPlus = "1015000000000000000"
let currentGasPrice
let bancorGasPrice

/** DAI VARIABLES */

let uniSellPriceDAI 
let uniBuyPriceDAI
let oasisSellPriceDAI
let oasisBuyPriceDAI
let kyberBuyPriceDAI
let kyberSellPriceDAI
let bancorBuyPriceDAI = 0
let bancorSellPriceDAIBNT = 0
let bancorSellPriceDAI = 0

/** MKR VARIABLES */

let uniBuyPriceMKR
let uniSellPriceMKR
let oasisBuyPriceMKR 
let oasisSellPriceMKR
let kyberBuyPriceMKR
let kyberSellPriceMKR
let bancorBuyPriceMKR = 0
let bancorSellPriceMKRBNT = 0
let bancorSellPriceMKR = 0

/** TKN VARIABLES */

let uniBuyPriceTKN
let uniSellPriceTKN
let bancorBuyPriceTKN = 0
let bancorSellPriceTKNBNT = 0
let bancorSellPriceTKN = 0

/** RLC VARIABLES */

let uniBuyPriceRLC
let uniSellPriceRLC
let bancorBuyPriceRLC = 0
let bancorSellPriceRLCBNT = 0
let bancorSellPriceRLC = 0

/** NEXO VARIABLES */

let uniBuyPriceNEXO
let uniSellPriceNEXO
let bancorBuyPriceNEXO = 0
let bancorSellPriceNEXOBNT = 0
let bancorSellPriceNEXO = 0

/** ANT VARIABLES */

let uniBuyPriceANT
let uniSellPriceANT
let bancorBuyPriceANT = 0
let bancorSellPriceANTBNT = 0
let bancorSellPriceANT = 0

/** RDN VARIABLES */

let uniBuyPriceRDN
let uniSellPriceRDN
let kyberBuyPriceRDN
let kyberSellPriceRDN
let bancorBuyPriceRDN = 0
let bancorSellPriceRDNBNT = 0
let bancorSellPriceRDN = 0

/** DGD VARIABLES */

let uniBuyPriceDGD
let uniSellPriceDGD
let bancorBuyPriceDGD = 0
let bancorSellPriceDGDBNT = 0
let bancorSellPriceDGD = 0

/** BAT VARIABLES */

let uniBuyPriceBAT
let uniSellPriceBAT
let kyberBuyPriceBAT
let kyberSellPriceBAT
let bancorBuyPriceBAT = 0
let bancorSellPriceBATBNT = 0
let bancorSellPriceBAT = 0

/** KNC VARIABLES */

let uniBuyPriceKNC
let uniSellPriceKNC
let kyberBuyPriceKNC
let kyberSellPriceKNC
let bancorBuyPriceKNC = 0
let bancorSellPriceKNCBNT = 0
let bancorSellPriceKNC = 0

/** ENJ VARIABLES */

let kyberBuyPriceENJ
let kyberSellPriceENJ
let bancorBuyPriceENJ = 0
let bancorSellPriceENJBNT = 0
let bancorSellPriceENJ = 0

/** MANA VARIABLES */

let kyberBuyPriceMANA
let kyberSellPriceMANA
let bancorBuyPriceMANA= 0
let bancorSellPriceMANABNT = 0
let bancorSellPriceMANA = 0

// /** BNB VARIABLES */

let kyberBuyPriceBNB
let kyberSellPriceBNB
let bancorBuyPriceBNB = 0
let bancorSellPriceBNBBNT = 0
let bancorSellPriceBNB = 0

// /** SNT VARIABLES */

let kyberBuyPriceSNT
let kyberSellPriceSNT
let bancorBuyPriceSNT = 0
let bancorSellPriceSNTBNT = 0
let bancorSellPriceSNT = 0


setInterval(function(){

	/** DAI */

	uniDAIContractInstance.methods.getEthToTokenInputPrice(oneEth).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }
            uniBuyPriceDAI = res;
	});

	uniDAIContractInstance.methods.getTokenToEthOutputPrice(oneEthPlus).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }
            uniSellPriceDAI = res;
	});

	oasisContractInstance.methods.getBuyAmount(DAI, WETH, oneEth).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            oasisBuyPriceDAI = res;
	});

	oasisContractInstance.methods.getPayAmount(DAI, WETH, oneEthPlus).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            oasisSellPriceDAI = res;
	});

	bancorContractInstance.methods.getReturn(ETHTKN, BNT, oneEth).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            bancorBuyPriceBNT = res[0];
	});

	bancorDAIContractInstance.methods.getCrossConnectorReturn(BNT, DAI, bancorBuyPriceBNT).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            bancorBuyPriceDAI = res;
	});

	bancorDAIContractInstance.methods.getCrossConnectorReturn(DAI, BNT, bancorBuyPriceDAI).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            bancorSellPriceDAIBNT = res;
	});

	bancorContractInstance.methods.getReturn(BNT, ETHTKN, bancorSellPriceDAIBNT).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            bancorSellPriceDAI = bancorBuyPriceDAI * oneEth / res[0];
            bancorSellPriceDAI = bancorSellPriceDAI.toString()

	});

	kyberContractInstance.methods.getExpectedRate(WETH, DAI, oneEth).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            kyberBuyPriceDAI = BigNumber(res[0]);
            kyberBuyPriceDAI = kyberBuyPriceDAI.toString()
	});

	kyberContractInstance.methods.getExpectedRate(DAI, WETH, oneEthPlus).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            kyberSellPriceDAI = new BigNumber(oneEth * oneEthPlus / res[0]);
            kyberSellPriceDAI = kyberSellPriceDAI.toString();
	});


	/** MKR */

	 uniMKRContractInstance.methods.getEthToTokenInputPrice(oneEth).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }
            uniBuyPriceMKR = res;
	});

	uniMKRContractInstance.methods.getTokenToEthOutputPrice(oneEthPlus).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }
            uniSellPriceMKR = res;
	});

	oasisContractInstance.methods.getBuyAmount(MKR, WETH, oneEth).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            oasisBuyPriceMKR = res;
	});

	oasisContractInstance.methods.getPayAmount(MKR, WETH, oneEthPlus).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            oasisSellPriceMKR = res;
	});

	bancorMKRContractInstance.methods.getCrossConnectorReturn(BNT, MKR, bancorBuyPriceBNT).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            bancorBuyPriceMKR = res;
	});

	bancorMKRContractInstance.methods.getCrossConnectorReturn(MKR, BNT, bancorBuyPriceMKR).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            bancorSellPriceMKRBNT = res;
	});

	bancorContractInstance.methods.getReturn(BNT, ETHTKN, bancorSellPriceMKRBNT).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            bancorSellPriceMKR = bancorBuyPriceMKR * oneEth / res[0];
            bancorSellPriceMKR = bancorSellPriceMKR.toString()
	});

	kyberContractInstance.methods.getExpectedRate(WETH, MKR, oneEth).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            kyberBuyPriceMKR = res[0];
	});

	kyberContractInstance.methods.getExpectedRate(MKR, WETH, oneEthPlus).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            kyberSellPriceMKR = new BigNumber(oneEth * oneEthPlus / res[0]);
            kyberSellPriceMKR = kyberSellPriceMKR.toString();
	});

	/** TKN */
 
	uniTKNContractInstance.methods.getEthToTokenInputPrice(oneEth).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            uniBuyPriceTKN = res;
	});
 
	uniTKNContractInstance.methods.getTokenToEthOutputPrice(oneEthPlus).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            uniSellPriceTKN = res;
	});
 
	bancorTKNContractInstance.methods.getCrossConnectorReturn(BNT, TKN, bancorBuyPriceBNT).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            bancorBuyPriceTKN = res;
	});
 
	bancorTKNContractInstance.methods.getCrossConnectorReturn(TKN, BNT, bancorBuyPriceTKN).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            bancorSellPriceTKNBNT = res;
	});
 
	bancorContractInstance.methods.getReturn(BNT, ETHTKN, bancorSellPriceTKNBNT).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            bancorSellPriceTKN = bancorBuyPriceTKN * oneEth / res[0];
            bancorSellPriceTKN = bancorSellPriceTKN.toFixed(0).toString()
	});
 
	/** RLC */
 
	uniRLCContractInstance.methods.getEthToTokenInputPrice(oneEth).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            uniBuyPriceRLC = res;
	});
 
	uniRLCContractInstance.methods.getTokenToEthOutputPrice(oneEthPlus).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            uniSellPriceRLC = res;
	});
 
	bancorRLCContractInstance.methods.getCrossConnectorReturn(BNT, RLC, bancorBuyPriceBNT).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            bancorBuyPriceRLC = res;
	});
 
	bancorRLCContractInstance.methods.getCrossConnectorReturn(RLC, BNT, bancorBuyPriceRLC).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            bancorSellPriceRLCBNT = res;
	});
 
	bancorContractInstance.methods.getReturn(BNT, ETHTKN, bancorSellPriceRLCBNT).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            bancorSellPriceRLC = bancorBuyPriceRLC * oneEth / res[0];
            bancorSellPriceRLC = bancorSellPriceRLC.toFixed(0).toString()
	});
 
	/** NEXO */
 
	uniNEXOContractInstance.methods.getEthToTokenInputPrice(oneEth).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            uniBuyPriceNEXO = res;
	});
 
	uniNEXOContractInstance.methods.getTokenToEthOutputPrice(oneEthPlus).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            uniSellPriceNEXO = res;
	});
 
	bancorNEXOContractInstance.methods.getCrossConnectorReturn(BNT, NEXO, bancorBuyPriceBNT).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            bancorBuyPriceNEXO = res;
	});
 
	bancorNEXOContractInstance.methods.getCrossConnectorReturn(NEXO, BNT, bancorBuyPriceNEXO).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            bancorSellPriceNEXOBNT = res;
	});
 
	bancorContractInstance.methods.getReturn(BNT, ETHTKN, bancorSellPriceNEXOBNT).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            bancorSellPriceNEXO = new BigNumber(bancorBuyPriceNEXO * oneEth / res[0]);
            bancorSellPriceNEXO = bancorSellPriceNEXO.toFixed(0).toString();
            //bignumber
	});
 
	/** ANT */
 
	uniANTContractInstance.methods.getEthToTokenInputPrice(oneEth).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            uniBuyPriceANT = res;
	});
 
	uniANTContractInstance.methods.getTokenToEthOutputPrice(oneEthPlus).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            uniSellPriceANT = res;
	});
 
	bancorANTContractInstance.methods.getCrossConnectorReturn(BNT, ANT, bancorBuyPriceBNT).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            bancorBuyPriceANT = res;
	});
 
	bancorANTContractInstance.methods.getCrossConnectorReturn(ANT, BNT, bancorBuyPriceANT).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            bancorSellPriceANTBNT = res;
	});
 
	bancorContractInstance.methods.getReturn(BNT, ETHTKN, bancorSellPriceANTBNT).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            bancorSellPriceANT = bancorBuyPriceANT * oneEth / res[0];
            bancorSellPriceANT = bancorSellPriceANT.toFixed(0).toString()
	});
 
	/** RDN */
 
	uniRDNContractInstance.methods.getEthToTokenInputPrice(oneEth).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            uniBuyPriceRDN = res;
	});
 
	uniRDNContractInstance.methods.getTokenToEthOutputPrice(oneEthPlus).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            uniSellPriceRDN = res;
	});
 
	bancorRDNContractInstance.methods.getCrossConnectorReturn(BNT, RDN, bancorBuyPriceBNT).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            bancorBuyPriceRDN = res;
	});
 
	bancorRDNContractInstance.methods.getCrossConnectorReturn(RDN, BNT, bancorBuyPriceRDN).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            bancorSellPriceRDNBNT = res;
	});
 
	bancorContractInstance.methods.getReturn(BNT, ETHTKN, bancorSellPriceRDNBNT).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            bancorSellPriceRDN = bancorBuyPriceRDN * oneEth / res[0];
            bancorSellPriceRDN = bancorSellPriceRDN.toFixed(0).toString()
	});
 
	kyberContractInstance.methods.getExpectedRate(WETH, RDN, oneEth).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            kyberBuyPriceRDN = new BigNumber(res[0]);
            kyberBuyPriceRDN = kyberBuyPriceRDN.toString()
	});
 
	kyberContractInstance.methods.getExpectedRate(RDN, WETH, oneEthPlus).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            kyberSellPriceRDN = new BigNumber(oneEth * oneEthPlus / res[0]);
            kyberSellPriceRDN = kyberSellPriceRDN.toString();
	});
 
	/** DGD */
 
	uniDGDContractInstance.methods.getEthToTokenInputPrice(oneEth).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            uniBuyPriceDGD = res;
	});
 
	uniDGDContractInstance.methods.getTokenToEthOutputPrice(oneEthPlus).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            uniSellPriceDGD = res;
	});
 
	bancorDGDContractInstance.methods.getCrossConnectorReturn(BNT, DGD, bancorBuyPriceBNT).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            bancorBuyPriceDGD = res;
	});
 
	bancorDGDContractInstance.methods.getCrossConnectorReturn(DGD, BNT, bancorBuyPriceDGD).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            bancorSellPriceDGDBNT = res;
	});
 
	bancorContractInstance.methods.getReturn(BNT, ETHTKN, bancorSellPriceDGDBNT).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            bancorSellPriceDGD = bancorBuyPriceDGD * oneEth / res[0];
            bancorSellPriceDGD = bancorSellPriceDGD.toFixed(0).toString()
	});
 
	/** BAT */
 
	uniBATContractInstance.methods.getEthToTokenInputPrice(oneEth).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            uniBuyPriceBAT = res;
	});
 
	uniBATContractInstance.methods.getTokenToEthOutputPrice(oneEthPlus).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            uniSellPriceBAT = res;
	});
 
	bancorBATContractInstance.methods.getCrossConnectorReturn(BNT, BAT, bancorBuyPriceBNT).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            bancorBuyPriceBAT = res;
	});
 
	bancorBATContractInstance.methods.getCrossConnectorReturn(BAT, BNT, bancorBuyPriceBAT).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            bancorSellPriceBATBNT = res;
	});
 
	bancorContractInstance.methods.getReturn(BNT, ETHTKN, bancorSellPriceBATBNT).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            bancorSellPriceBAT = new BigNumber(bancorBuyPriceBAT * oneEth / res[0]);
            bancorSellPriceBAT = bancorSellPriceBAT.toFixed(0).toString()
	});
 
	kyberContractInstance.methods.getExpectedRate(WETH, BAT, oneEth).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            kyberBuyPriceBAT = new BigNumber(res[0]);
            kyberBuyPriceBAT = kyberBuyPriceBAT.toFixed(0).toString();
	});
 
	kyberContractInstance.methods.getExpectedRate(BAT, WETH, oneEthPlus).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            kyberSellPriceBAT = new BigNumber(oneEth * oneEthPlus / res[0]);
            kyberSellPriceBAT = kyberSellPriceBAT.toFixed(0).toString();
	});
 
	/** KNC */
 
	uniKNCContractInstance.methods.getEthToTokenInputPrice(oneEth).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            uniBuyPriceKNC = res;
	});
 
	uniKNCContractInstance.methods.getTokenToEthOutputPrice(oneEthPlus).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            uniSellPriceKNC = res;
	});
 
	bancorKNCContractInstance.methods.getCrossConnectorReturn(BNT, KNC, bancorBuyPriceBNT).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            bancorBuyPriceKNC = res;
	});
 
	bancorKNCContractInstance.methods.getCrossConnectorReturn(KNC, BNT, bancorBuyPriceKNC).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            bancorSellPriceKNCBNT = res;
	});
 
	bancorContractInstance.methods.getReturn(BNT, ETHTKN, bancorSellPriceKNCBNT).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            bancorSellPriceKNC = bancorBuyPriceKNC * oneEth / res[0];
            bancorSellPriceKNC = bancorSellPriceKNC.toFixed(0).toString()
	});
 
	kyberContractInstance.methods.getExpectedRate(WETH, KNC, oneEth).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            kyberBuyPriceKNC = new BigNumber(res[0]);
            kyberBuyPriceKNC = kyberBuyPriceKNC.toString()
	});
 
	kyberContractInstance.methods.getExpectedRate(KNC, WETH, oneEthPlus).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            kyberSellPriceKNC = new BigNumber(oneEth * oneEthPlus / res[0]);
            kyberSellPriceKNC = kyberSellPriceKNC.toString();
	});
 
	/** ENJ */
 
	bancorENJContractInstance.methods.getCrossConnectorReturn(BNT, ENJ, bancorBuyPriceBNT).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            bancorBuyPriceENJ = res;
	});
 
	bancorENJContractInstance.methods.getCrossConnectorReturn(ENJ, BNT, bancorBuyPriceENJ).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            bancorSellPriceENJBNT = res;
	});
 
	bancorContractInstance.methods.getReturn(BNT, ETHTKN, bancorSellPriceENJBNT).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            bancorSellPriceENJ = new BigNumber(bancorBuyPriceENJ * oneEth / res[0]);
            bancorSellPriceENJ = bancorSellPriceENJ.toFixed(0)
	});
 
	kyberContractInstance.methods.getExpectedRate(WETH, ENJ, oneEth).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            kyberBuyPriceENJ = new BigNumber(res[0]);
            kyberBuyPriceENJ = kyberBuyPriceENJ.toFixed(0).toString()
	});
 
	kyberContractInstance.methods.getExpectedRate(ENJ, WETH, oneEthPlus).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            kyberSellPriceENJ = new BigNumber(oneEth * oneEthPlus / res[0]);
            kyberSellPriceENJ = kyberSellPriceENJ.toFixed(0).toString();
	});
 
	/** MANA */
 
	bancorMANAContractInstance.methods.getReturn(BNT, MANA, bancorBuyPriceBNT).call(function(err, res) {
        if (err) {    
            console.log("err", 1);
            return;
        }	
            bancorBuyPriceMANA = res;
	});
 
	bancorMANAContractInstance.methods.getReturn(MANA, BNT, bancorBuyPriceMANA).call(function(err, res) {
        if (err) {    
            console.log("err", 2);
            return;
        }	
            bancorSellPriceMANABNT = res;
	});
 
	bancorContractInstance.methods.getReturn(BNT, ETHTKN, bancorSellPriceMANABNT).call(function(err, res) {
        if (err) {    
            console.log("err", 3);
            return;
        }	
            bancorSellPriceMANA = new BigNumber(bancorBuyPriceMANA * oneEth / res[0]);
            bancorSellPriceMANA = bancorSellPriceMANA.toFixed(0).toString()
	});
 
	kyberContractInstance.methods.getExpectedRate(WETH, MANA, oneEth).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            kyberBuyPriceMANA = new BigNumber(res[0]);
            kyberBuyPriceMANA = kyberBuyPriceMANA.toFixed(0).toString()
	});
 
	kyberContractInstance.methods.getExpectedRate(MANA, WETH, oneEthPlus).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            kyberSellPriceMANA = new BigNumber(oneEth * oneEthPlus / res[0]);
            kyberSellPriceMANA = kyberSellPriceMANA.toFixed(0).toString();
 
	});
 
	/** BNB */
 
	bancorBNBContractInstance.methods.getReturn(BNT, BNB, bancorBuyPriceBNT).call(function(err, res) {
        if (err) {    
            console.log("err", 1);
            return;
        }	
            bancorBuyPriceBNB = res;
	});
 
	bancorBNBContractInstance.methods.getReturn(BNB, BNT, bancorBuyPriceBNB).call(function(err, res) {
        if (err) {    
            console.log("err", 2);
            return;
        }	
            bancorSellPriceBNBBNT = res;
	});
 
	bancorContractInstance.methods.getReturn(BNT, ETHTKN, bancorSellPriceBNBBNT).call(function(err, res) {
        if (err) {    
            console.log("err", 3);
            return;
        }	
            bancorSellPriceBNB = new BigNumber(bancorBuyPriceBNB * oneEth / res[0]);
            bancorSellPriceBNB = bancorSellPriceBNB.toFixed(0).toString()
	});
 
	kyberContractInstance.methods.getExpectedRate(WETH, BNB, oneEth).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            kyberBuyPriceBNB = new BigNumber(res[0]);
            kyberBuyPriceBNB = kyberBuyPriceBNB.toFixed(0).toString()
	});
 
	kyberContractInstance.methods.getExpectedRate(BNB, WETH, oneEthPlus).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            kyberSellPriceBNB = new BigNumber(oneEth * oneEthPlus / res[0]);
            kyberSellPriceBNB = kyberSellPriceBNB.toFixed(0).toString();
 
	});
 
	/** SNT */
 
	bancorSNTContractInstance.methods.getReturn(BNT, SNT, bancorBuyPriceBNT).call(function(err, res) {
        if (err) {    
            console.log("err", 1);
            return;
        }	
            bancorBuyPriceSNT = res;
	});
 
	bancorSNTContractInstance.methods.getReturn(SNT, BNT, bancorBuyPriceSNT).call(function(err, res) {
        if (err) {    
            console.log("err", 2);
            return;
        }	
            bancorSellPriceSNTBNT = res;
	});
 
	bancorContractInstance.methods.getReturn(BNT, ETHTKN, bancorSellPriceSNTBNT).call(function(err, res) {
        if (err) {    
            console.log("err", 3);
            return;
        }	
            bancorSellPriceSNT = new BigNumber(bancorBuyPriceSNT * oneEth / res[0]);
            bancorSellPriceSNT = bancorSellPriceSNT.toFixed(0).toString()
	});
 
	kyberContractInstance.methods.getExpectedRate(WETH, SNT, oneEth).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            kyberBuyPriceSNT = new BigNumber(res[0]);
            kyberBuyPriceSNT = kyberBuyPriceSNT.toFixed(0).toString()
	});
 
	kyberContractInstance.methods.getExpectedRate(SNT, WETH, oneEthPlus).call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            kyberSellPriceSNT = new BigNumber(oneEth * oneEthPlus / res[0]);
            kyberSellPriceSNT = kyberSellPriceSNT.toFixed(0).toString();
	});
 
 
	//GAS UTILITIES
 
	web3.eth.getGasPrice(function(err, res){
		if (err) {    
            console.log("err");
            return;
        }
        currentGasPrice = Number(res) + 5100000000; //5.1 gwei extra
        currentGasPrice = currentGasPrice.toString() 
	})
 
	bancorGasContractInstance.methods.gasPrice().call(function(err, res) {
        if (err) {    
            console.log("err");
            return;
        }	
            bancorGasPrice = res;
	});

}, 5000);

let daiCode = "0000000000000000000000000000000000000000000000000000000000000004";
let daiPath = "000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000c0829421c1d260bd3cb3e0f06cfe2d52db2ce3150000000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c0000000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c000000000000000000000000ee01b3ab5f6728adc137be101d99c678938e6e7200000000000000000000000089d24a6b4ccb1b6faa2625fe562bdd9a23260359";
let daiSell = "000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000089d24A6b4CcB1B6fAA2625fE562bDD9a23260359000000000000000000000000ee01b3AB5F6728adc137Be101d99c678938E6E720000000000000000000000001F573D6Fb3F13d689FF844B4cE37794d79a7FF1C0000000000000000000000001F573D6Fb3F13d689FF844B4cE37794d79a7FF1C000000000000000000000000c0829421C1d260BD3cB3E0F06cfE2D52db2cE315";

let mkrCode = "0000000000000000000000000000000000000000000000000000000000000005";
let mkrPath = "000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000c0829421c1d260bd3cb3e0f06cfe2d52db2ce3150000000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c0000000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c000000000000000000000000f553e6ea4ce2f7deecbe7837e27931850ec15fab0000000000000000000000009f8f72aa9304c8b593d555f12ef6589cc3a579a2";
let mkrSell = "000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000009f8f72aa9304c8b593d555f12ef6589cc3a579a2000000000000000000000000f553e6ea4ce2f7deecbe7837e27931850ec15fab0000000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c0000000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c000000000000000000000000c0829421c1d260bd3cb3e0f06cfe2d52db2ce315";

let tknCode = "0000000000000000000000000000000000000000000000000000000000000006";
let tknPath = "000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000c0829421c1d260bd3cb3e0f06cfe2d52db2ce3150000000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c0000000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c000000000000000000000000497ec0d6ba2080f0ed7ecf7a79a2a907401b3239000000000000000000000000aaaf91d9b90df800df4f55c205fd6989c977e73a";
let tknSell = "000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000aaaf91d9b90df800df4f55c205fd6989c977e73a000000000000000000000000497ec0d6ba2080f0ed7ecf7a79a2a907401b32390000000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c0000000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c000000000000000000000000c0829421c1d260bd3cb3e0f06cfe2d52db2ce315";

let rlcCode = "0000000000000000000000000000000000000000000000000000000000000007";
let rlcPath = "000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000c0829421c1d260bd3cb3e0f06cfe2d52db2ce3150000000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c0000000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c0000000000000000000000009003411ac4073c2d9f37af71d00e373b72cbe9e2000000000000000000000000607f4c5bb672230e8672085532f7e901544a7375";
let rlcSell = "000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000607f4c5bb672230e8672085532f7e901544a73750000000000000000000000009003411ac4073c2d9f37af71d00e373b72cbe9e20000000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c0000000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c000000000000000000000000c0829421c1d260bd3cb3e0f06cfe2d52db2ce315";

let nexoCode = "0000000000000000000000000000000000000000000000000000000000000008";
let nexoPath = "000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000c0829421c1d260bd3cb3e0f06cfe2d52db2ce3150000000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c0000000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c0000000000000000000000007081bca18fa05e8c9aa25320e3b7493d92b4e73c000000000000000000000000b62132e35a6c13ee1ee0f84dc5d40bad8d815206";
let nexoSell = "000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000b62132e35a6c13ee1ee0f84dc5d40bad8d8152060000000000000000000000007081bca18fa05e8c9aa25320e3b7493d92b4e73c0000000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c0000000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c000000000000000000000000c0829421c1d260bd3cb3e0f06cfe2d52db2ce315";

let antCode = "0000000000000000000000000000000000000000000000000000000000000009";
let antPath = "000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000c0829421c1d260bd3cb3e0f06cfe2d52db2ce3150000000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c0000000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c0000000000000000000000000c485bffd5df019f66927b2c32360159884d4409000000000000000000000000960b236a07cf122663c4303350609a66a7b288c0";
let antSell = "000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000960b236a07cf122663c4303350609a66a7b288c00000000000000000000000000c485bffd5df019f66927b2c32360159884d44090000000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c0000000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c000000000000000000000000c0829421c1d260bd3cb3e0f06cfe2d52db2ce315";

let rdnCode = "000000000000000000000000000000000000000000000000000000000000000a";
let rdnPath = "000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000c0829421c1d260bd3cb3e0f06cfe2d52db2ce3150000000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c0000000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c00000000000000000000000011223ed5d5846603c4efc7c451fd8eb596d592cf000000000000000000000000255aa6df07540cb5d3d297f0d0d4d84cb52bc8e6";
let rdnSell = "000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000255aa6df07540cb5d3d297f0d0d4d84cb52bc8e600000000000000000000000011223ed5d5846603c4efc7c451fd8eb596d592cf0000000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c0000000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c000000000000000000000000c0829421c1d260bd3cb3e0f06cfe2d52db2ce315";

let dgdCode = "000000000000000000000000000000000000000000000000000000000000000b";
let dgdPath = "000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000c0829421c1d260bd3cb3e0f06cfe2d52db2ce3150000000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c0000000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c0000000000000000000000007ef1fedb73bd089ec1010baba26ca162dfa08144000000000000000000000000e0b7927c4af23765cb51314a0e0521a9645f0e2a";
let dgdSell = "000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000e0b7927c4af23765cb51314a0e0521a9645f0e2a0000000000000000000000007ef1fedb73bd089ec1010baba26ca162dfa081440000000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c0000000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c000000000000000000000000c0829421c1d260bd3cb3e0f06cfe2d52db2ce315";

let batCode = "000000000000000000000000000000000000000000000000000000000000000c";
let batPath = "000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000c0829421c1d260bd3cb3e0f06cfe2d52db2ce3150000000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c0000000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c000000000000000000000000131da075a2832549128e93acc2b54174045232cf0000000000000000000000000d8775f648430679a709e98d2b0cb6250d2887ef";
let batSell = "000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000d8775f648430679a709e98d2b0cb6250d2887ef000000000000000000000000131da075a2832549128e93acc2b54174045232cf0000000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c0000000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c000000000000000000000000c0829421c1d260bd3cb3e0f06cfe2d52db2ce315";

let kncCode = "000000000000000000000000000000000000000000000000000000000000000d";
let kncPath = "000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000c0829421c1d260bd3cb3e0f06cfe2d52db2ce3150000000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c0000000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c000000000000000000000000248afff1aa83cf860198ddee14b5b3e8edb46d47000000000000000000000000dd974d5c2e2928dea5f71b9825b8b646686bd200";
let kncSell = "000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000dd974d5c2e2928dea5f71b9825b8b646686bd200000000000000000000000000248afff1aa83cf860198ddee14b5b3e8edb46d470000000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c0000000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c000000000000000000000000c0829421c1d260bd3cb3e0f06cfe2d52db2ce315";

let enjCode = "000000000000000000000000000000000000000000000000000000000000000e";
let enjPath = "000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000c0829421c1d260bd3cb3e0f06cfe2d52db2ce3150000000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c0000000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c000000000000000000000000f3ad2cbc4276eb4b0fb627af0059cfce094e20a1000000000000000000000000f629cbd94d3791c9250152bd8dfbdf380e2a3b9c";
let enjSell = "000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000f629cbd94d3791c9250152bd8dfbdf380e2a3b9c000000000000000000000000f3ad2cbc4276eb4b0fb627af0059cfce094e20a10000000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c0000000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c000000000000000000000000c0829421c1d260bd3cb3e0f06cfe2d52db2ce315";

let manaCode = "000000000000000000000000000000000000000000000000000000000000000f";
let manaPath = "000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000c0829421c1d260bd3cb3e0f06cfe2d52db2ce3150000000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c0000000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c00000000000000000000000079d83b390cf0edf86b9efbe47b556cc6e20926ac0000000000000000000000000f5d2fb29fb7d3cfee444a200298f468908cc942";
let manaSell = "000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000f5d2fb29fb7d3cfee444a200298f468908cc94200000000000000000000000079d83b390cf0edf86b9efbe47b556cc6e20926ac0000000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c0000000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c000000000000000000000000c0829421c1d260bd3cb3e0f06cfe2d52db2ce315";

let bnbCode = "0000000000000000000000000000000000000000000000000000000000000010";
let bnbPath = "000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000c0829421c1d260bd3cb3e0f06cfe2d52db2ce3150000000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c0000000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c000000000000000000000000e6b31fb3f29fbde1b92794b0867a315ff605a324000000000000000000000000b8c77482e45f1f44de1745f52c74426c631bdd52";
let bnbSell = "000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000b8c77482e45f1f44de1745f52c74426c631bdd52000000000000000000000000e6b31fb3f29fbde1b92794b0867a315ff605a3240000000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c0000000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c000000000000000000000000c0829421c1d260bd3cb3e0f06cfe2d52db2ce315";

let sntCode = "0000000000000000000000000000000000000000000000000000000000000011";
let sntPath = "000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000c0829421c1d260bd3cb3e0f06cfe2d52db2ce3150000000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c0000000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c000000000000000000000000a3b3c5a8b22c044d5f2d372f628245e2106d310d000000000000000000000000744d70fdbe2ba4cf95131626614a1763df805b9e";
let sntSell = "000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000744d70fdbe2ba4cf95131626614a1763df805b9e000000000000000000000000a3b3c5a8b22c044d5f2d372f628245e2106d310d0000000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c0000000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c000000000000000000000000c0829421c1d260bd3cb3e0f06cfe2d52db2ce315";



console.log("loading data...")

setTimeout(function(){

setInterval(function() {

	console.log(
		"UNISWAP: DAI buy:", Number(web3.utils.fromWei(uniBuyPriceDAI, "ether")).toFixed(5), 
		"sell:", Number(web3.utils.fromWei(uniSellPriceDAI, "ether")).toFixed(5),
		"U/O spread:", Number(((oasisSellPriceDAI / uniBuyPriceDAI) - 1) * 100).toFixed(2), "%"

	);
	console.log(
		"OASIS  : DAI buy:", Number(web3.utils.fromWei(oasisBuyPriceDAI, "ether")).toFixed(5), 
		"sell:", Number(web3.utils.fromWei(oasisSellPriceDAI, "ether")).toFixed(5),
		"O/U spread:", Number(((uniSellPriceDAI / oasisBuyPriceDAI) - 1) * 100).toFixed(2), "%"
	);
	console.log(
		"BANCOR : DAI buy:", Number(web3.utils.fromWei(bancorBuyPriceDAI, "ether")).toFixed(5), 
		"sell:", Number(web3.utils.fromWei(bancorSellPriceDAI, "ether")).toFixed(5),
		"B/U spread:", Number(((uniSellPriceDAI / bancorBuyPriceDAI) - 1) * 100).toFixed(2), "%"
	);
	console.log(
		"KYBER  : DAI buy:", Number(web3.utils.fromWei(kyberBuyPriceDAI, "ether")).toFixed(5), 
		"sell:", Number(web3.utils.fromWei(kyberSellPriceDAI, "ether")).toFixed(5),
		"B/O spread:", Number(((oasisSellPriceDAI / bancorBuyPriceDAI) - 1) * 100).toFixed(2), "%"
	);

	if (Number(uniBuyPriceDAI) / 4 > Number(oasisSellPriceDAI) / 4) {
		buyUniSellOasis(daiCode);
		console.log("ARB    : buy DAI on Uniswap, sell on Oasis")
		console.log("...")
	} else if (Number(oasisBuyPriceDAI) / 4 > Number(uniSellPriceDAI) / 4) {
		buyOasisSellUni(daiCode);
		console.log("ARB    : buy DAI on Oasis, sell on Uniswap")
		console.log("...")
	} else if (Number(bancorBuyPriceDAI) / 4 > Number(uniSellPriceDAI) / 4) {
		buyBancorSellUni(daiCode, daiPath);
		console.log("ARB    : buy DAI on Bancor, sell on Uniswap")
		console.log("...")
	} else if (Number(bancorBuyPriceDAI) / 4 > Number(oasisSellPriceDAI) / 4) {
		buyBancorSellOasis(daiCode, daiPath);
		console.log("ARB    : buy DAI on Bancor, sell on Oasis")
		console.log("...")
	} else if (Number(uniBuyPriceDAI) / 4 > Number(bancorSellPriceDAI) / 4) {
		buyUniSellBancor(daiCode, daiSell);
		console.log("ARB    : buy DAI on Uniswap, sell on Bancor")
		console.log("...")
	} else if (Number(oasisBuyPriceDAI) / 4 > Number(bancorSellPriceDAI) / 4) {
		buyOasisSellBancor(daiCode, daiSell);
		console.log("ARB    : buy DAI on Oasis, sell on Bancor")
		console.log("...")
	} else {
		console.log("ARB    : no DAI arbitrage opportunity")
		console.log("...")
	}

	console.log(
		"UNISWAP: MKR buy:", Number(web3.utils.fromWei(uniBuyPriceMKR, "ether")).toFixed(7), 
		"sell:", Number(web3.utils.fromWei(uniSellPriceMKR, "ether")).toFixed(7),
		"U/O spread:", Number(((oasisSellPriceMKR / uniBuyPriceMKR) - 1) * 100).toFixed(2), "%"
	);
	console.log(
		"OASIS  : MKR buy:", Number(web3.utils.fromWei(oasisBuyPriceMKR, "ether")).toFixed(7), 
		"sell:", Number(web3.utils.fromWei(oasisSellPriceMKR, "ether")).toFixed(7),
		"O/U spread:", Number(((uniSellPriceMKR / oasisBuyPriceMKR) - 1) * 100).toFixed(2), "%"
	);
	console.log(
		"BANCOR : MKR buy:", Number(web3.utils.fromWei(bancorBuyPriceMKR, "ether")).toFixed(7), 
		"sell:", Number(web3.utils.fromWei(bancorSellPriceMKR, "ether")).toFixed(7),
		"B/U spread:", Number(((uniSellPriceMKR / bancorBuyPriceMKR) - 1) * 100).toFixed(2), "%"
	);
	console.log(
		"KYBER  : MKR buy:", Number(web3.utils.fromWei(kyberBuyPriceMKR, "ether")).toFixed(7), 
		"sell:", Number(web3.utils.fromWei(kyberSellPriceMKR, "ether")).toFixed(7),
		"B/O spread:", Number(((oasisSellPriceMKR / bancorBuyPriceMKR) - 1) * 100).toFixed(2), "%"
	);

	if (Number(uniBuyPriceMKR) / 4 > Number(oasisSellPriceMKR) / 4) {
		buyUniSellOasis(mkrCode);
		console.log("ARB    : buy MKR on Uniswap, sell on Oasis")
		console.log("...")
	} else if (Number(oasisBuyPriceMKR) / 4 > Number(uniSellPriceMKR) / 4) {
		buyOasisSellUni(daiCode);
		console.log("ARB    : buy MKR on Oasis, sell on Uniswap")
		console.log("...")
	} else if (Number(bancorBuyPriceMKR) / 4 > Number(uniSellPriceMKR) / 4) {
		buyBancorSellUni(mkrCode, mkrPath);
		console.log("ARB    : buy MKR on Bancor, sell on Uniswap")
		console.log("...")
	} else if (Number(bancorBuyPriceMKR) / 4 > Number(oasisSellPriceMKR) / 4) {
		buyBancorSellOasis(mkrCode, mkrPath);
		console.log("ARB    : buy MKR on Bancor, sell on Oasis")
		console.log("...")
	} else if (Number(uniBuyPriceMKR) / 4 > Number(bancorSellPriceMKR) / 4) {
		buyUniSellBancor(mkrCode, mkrPath);
		console.log("ARB    : buy MKR on Uniswap, sell on Bancor")
		console.log("...")
	} else if (Number(oasisBuyPriceMKR) / 4 > Number(bancorSellPriceMKR) / 4) {
		buyOasisSellBancor(mkrCode, mkrPath);
		console.log("ARB    : buy MKR on Oasis, sell on Bancor")
		console.log("...")
	} else {
		console.log("ARB    : no MKR arbitrage opportunity")
		console.log("...")
	}

	console.log(
		"UNISWAP: TKN buy:", Number(web3.utils.fromWei(uniBuyPriceTKN, "ether")).toFixed(10), 
		"sell:", Number(web3.utils.fromWei(uniSellPriceTKN, "ether")).toFixed(10),
		"U/B spread:", Number(((bancorSellPriceTKN / uniBuyPriceTKN) - 1) * 100).toFixed(2), "%"
	);
	console.log(
		"BANCOR : TKN buy:", Number(web3.utils.fromWei(bancorBuyPriceTKN, "ether")).toFixed(10), 
		"sell:", Number(web3.utils.fromWei(bancorSellPriceTKN, "ether")).toFixed(10),
		"B/U spread:", Number(((uniSellPriceTKN / bancorBuyPriceTKN) - 1) * 100).toFixed(2), "%"
	);
	
	if (Number(bancorBuyPriceTKN) / 4 > Number(uniSellPriceTKN) / 4) {
		buyBancorSellUni(tknCode, tknPath);
		console.log("ARB    : buy TKN on Bancor, sell on Uniswap")
		console.log("...")
	} else if (Number(uniBuyPriceTKN) / 4 > Number(bancorSellPriceTKN) / 4) {
		buyUniSellBancor(tknCode, tknSell);
		console.log("ARB    : buy TKN on Uniswap, sell on Bancor")
		console.log("...")
	} else {
		console.log("ARB    : no TKN arbitrage opportunity")
		console.log("...")
	}

	console.log(
		"UNISWAP: RLC buy:", Number(web3.utils.fromWei(uniBuyPriceRLC, "ether")).toFixed(10), 
		"sell:", Number(web3.utils.fromWei(uniSellPriceRLC, "ether")).toFixed(10),
		"U/B spread:", Number(((bancorSellPriceRLC / uniBuyPriceRLC) - 1) * 100).toFixed(2), "%"
	);
	console.log(
		"BANCOR : RLC buy:", Number(web3.utils.fromWei(bancorBuyPriceRLC, "ether")).toFixed(10),
	 	"sell:", Number(web3.utils.fromWei(bancorSellPriceRLC, "ether")).toFixed(10),
	 	"B/U spread:", Number(((uniSellPriceRLC / bancorBuyPriceRLC) - 1) * 100).toFixed(2), "%"
	);
	
	if (Number(bancorBuyPriceRLC) / 4 > Number(uniSellPriceRLC) / 4) {
		buyBancorSellUni(rlcCode, rlcPath);
		console.log("ARB    : buy RLC on Bancor, sell on Uniswap")
		console.log("...")
	} else if (Number(uniBuyPriceRLC) / 4 > Number(bancorSellPriceRLC) / 4) {
		buyUniSellBancor(rlcCode, rlcSell);
		console.log("ARB    : buy RLC on Uniswap, sell on Bancor")
		console.log("...")
	} else {
		console.log("ARB    : no RLC arbitrage opportunity")
		console.log("...")
	}

	console.log(
		"UNISWAP: NEXO buy:", Number(web3.utils.fromWei(uniBuyPriceNEXO, "ether")).toFixed(5), 
		"sell:", Number(web3.utils.fromWei(uniSellPriceNEXO, "ether")).toFixed(5),
		"U/B spread:", Number(((bancorSellPriceNEXO / uniBuyPriceNEXO) - 1) * 100).toFixed(2), "%"
	);
	console.log(
		"BANCOR : NEXO buy:", Number(web3.utils.fromWei(bancorBuyPriceNEXO, "ether")).toFixed(5), 
		"sell:", Number(web3.utils.fromWei(bancorSellPriceNEXO, "ether")).toFixed(5),
		"B/U spread:", Number(((uniSellPriceNEXO / bancorBuyPriceNEXO) - 1) * 100).toFixed(2), "%"
	);
	
	if (Number(bancorBuyPriceNEXO) / 4 > Number(uniSellPriceNEXO) / 4) {
		buyBancorSellUni(nexoCode, nexoPath);
		console.log("ARB    : buy NEXO on Bancor, sell on Uniswap")
		console.log("...")
	} else if (Number(uniBuyPriceNEXO) / 4 > Number(bancorSellPriceNEXO) / 4) {
		buyUniSellBancor(nexoCode, nexoSell);
		console.log("ARB    : buy NEXO on Uniswap, sell on Bancor")
		console.log("...")
	} else {
		console.log("ARB    : no NEXO arbitrage opportunity")
		console.log("...")
	}

	console.log(
		"UNISWAP: ANT buy:", Number(web3.utils.fromWei(uniBuyPriceANT, "ether")).toFixed(5), 
		"sell:", Number(web3.utils.fromWei(uniSellPriceANT, "ether")).toFixed(5),
		"U/B spread:", Number(((bancorSellPriceANT / uniBuyPriceANT) - 1) * 100).toFixed(2), "%"
	);
	console.log(
		"BANCOR : ANT buy:", Number(web3.utils.fromWei(bancorBuyPriceANT, "ether")).toFixed(5), 
		"sell:", Number(web3.utils.fromWei(bancorSellPriceANT, "ether")).toFixed(5),
		"B/U spread:", Number(((uniSellPriceANT / bancorBuyPriceANT) - 1) * 100).toFixed(2), "%"
	);
	
	if (Number(bancorBuyPriceANT) / 4 > Number(uniSellPriceANT) / 4) {
		buyBancorSellUni(antCode, antPath);
		console.log("ARB    : buy ANT on Bancor, sell on Uniswap")
		console.log("...")
	} else if (Number(uniBuyPriceANT) / 4 > Number(bancorSellPriceANT) / 4) {
		buyUniSellBancor(antCode, antSell);
		console.log("ARB    : buy ANT on Uniswap, sell on Bancor")
		console.log("...")
	} else {
		console.log("ARB    : no ANT arbitrage opportunity")
		console.log("...")
	}

	console.log(
		"UNISWAP: RDN buy:", Number(web3.utils.fromWei(uniBuyPriceRDN, "ether")).toFixed(5), 
		"sell:", Number(web3.utils.fromWei(uniSellPriceRDN, "ether")).toFixed(5),
		"U/B spread:", Number(((bancorSellPriceRDN / uniBuyPriceRDN) - 1) * 100).toFixed(2), "%"
	);
	console.log(
		"BANCOR : RDN buy:", Number(web3.utils.fromWei(bancorBuyPriceRDN, "ether")).toFixed(5), 
		"sell:", Number(web3.utils.fromWei(bancorSellPriceRDN, "ether")).toFixed(5),
		"B/U spread:", Number(((uniSellPriceRDN / bancorBuyPriceRDN) - 1) * 100).toFixed(2), "%"
	);
	console.log(
		"KYBER  : RDN buy:", Number(web3.utils.fromWei(kyberBuyPriceRDN, "ether")).toFixed(5), 
		"sell:", Number(web3.utils.fromWei(kyberSellPriceRDN, "ether")).toFixed(5),
		"K/B spread:", Number(((bancorSellPriceRDN / kyberBuyPriceRDN) - 1) * 100).toFixed(2), "%"
	);
	
	if (Number(bancorBuyPriceRDN) / 4 > Number(uniSellPriceRDN) / 4) {
		buyBancorSellUni(rdnCode, rdnPath);
		console.log("ARB    : buy RDN on Bancor, sell on Uniswap")
		console.log("...")
	} else if (Number(uniBuyPriceRDN) / 4 > Number(bancorSellPriceRDN) / 4) {
		buyUniSellBancor(rdnCode, rdnSell);
		console.log("ARB    : buy RDN on Uniswap, sell on Bancor")
		console.log("...")
	} else if (Number(bancorBuyPriceRDN) / 4 > Number(kyberSellPriceRDN) / 4) {
		buyBancorSellKyber(rdnCode, rdnPath);
		console.log("ARB    : buy RDN on Bancor, sell on Kyber")
		console.log("...")
	} else if (Number(kyberBuyPriceRDN) / 4 > Number(bancorSellPriceRDN) / 4) {
		buyKyberSellBancor(rdnCode, rdnSell);
		console.log("ARB    : buy RDN on Kyber, sell on Bancor")
		console.log("...")
	} else {
		console.log("ARB    : no RDN arbitrage opportunity")
		console.log("...")
	}

	console.log(
		"UNISWAP: DGD buy:", Number(web3.utils.fromWei(uniBuyPriceDGD, "ether")).toFixed(10), 
		"sell:", Number(web3.utils.fromWei(uniSellPriceDGD, "ether")).toFixed(10),
		"U/B spread:", Number(((bancorSellPriceDGD / uniBuyPriceDGD) - 1) * 100).toFixed(2), "%"
	);
	console.log(
		"BANCOR : DGD buy:", Number(web3.utils.fromWei(bancorBuyPriceDGD, "ether")).toFixed(10), 
		"sell:", Number(web3.utils.fromWei(bancorSellPriceDGD, "ether")).toFixed(10),
		"B/U spread:", Number(((uniSellPriceDGD / bancorBuyPriceDGD) - 1) * 100).toFixed(2), "%"
	);
	
	if (Number(bancorBuyPriceDGD) / 4 > Number(uniSellPriceDGD) / 4) {
		buyBancorSellUni(dgdCode, dgdPath);
		console.log("ARB    : buy DGD on Bancor, sell on Uniswap")
		console.log("...")
	} else if (Number(uniBuyPriceDGD) / 4 > Number(bancorSellPriceDGD) / 4) {
		buyUniSellBancor(dgdCode, dgdSell);
		console.log("ARB    : buy DGD on Uniswap, sell on Bancor")
		console.log("...")
	} else {
		console.log("ARB    : no DGD arbitrage opportunity")
		console.log("...")
	}

	console.log(
		"UNISWAP: BAT buy:", Number(web3.utils.fromWei(uniBuyPriceBAT, "ether")).toFixed(5), 
		"sell:", Number(web3.utils.fromWei(uniSellPriceBAT, "ether")).toFixed(5),
		"U/B spread:", Number(((bancorSellPriceBAT / uniBuyPriceBAT) - 1) * 100).toFixed(2), "%"
	);
	console.log(
		"BANCOR : BAT buy:", Number(web3.utils.fromWei(bancorBuyPriceBAT, "ether")).toFixed(5), 
		"sell:", Number(web3.utils.fromWei(bancorSellPriceBAT, "ether")).toFixed(5),
		"B/U spread:", Number(((uniSellPriceBAT / bancorBuyPriceBAT) - 1) * 100).toFixed(2), "%"
	);
	console.log(
		"KYBER  : BAT buy:", Number(web3.utils.fromWei(kyberBuyPriceBAT, "ether")).toFixed(5), 
		"sell:", Number(web3.utils.fromWei(kyberSellPriceBAT, "ether")).toFixed(5),
		"K/B spread:", Number(((bancorSellPriceBAT / kyberBuyPriceBAT) - 1) * 100).toFixed(2), "%"
	);
	
	if (Number(bancorBuyPriceBAT) / 4 > Number(uniSellPriceBAT) / 4) {
		buyBancorSellUni(batCode, batPath);
		console.log("ARB    : buy BAT on Bancor, sell on Uniswap")
		console.log("...")
	} else if (Number(uniBuyPriceBAT) / 4 > Number(bancorSellPriceBAT) / 4) {
		buyUniSellBancor(batCode, batSell);
		console.log("ARB    : buy BAT on Uniswap, sell on Bancor")
		console.log("...")
	} else if (Number(bancorBuyPriceBAT) / 4 > Number(kyberSellPriceBAT) / 4) {
		buyBancorSellKyber(batCode, batPath);
		console.log("ARB    : buy BAT on Bancor, sell on Kyber")
		console.log("...")
	} else if (Number(kyberBuyPriceBAT) / 4 > Number(bancorSellPriceBAT) / 4) {
		buyKyberSellBancor(batCode, batSell);
		console.log("ARB    : buy BAT on Kyber, sell on Bancor")
		console.log("...")
	} else {
		console.log("ARB    : no BAT arbitrage opportunity")
		console.log("...")
	}

	console.log(
		"UNISWAP: KNC buy:", Number(web3.utils.fromWei(uniBuyPriceKNC, "ether")).toFixed(5), 
		"sell:", Number(web3.utils.fromWei(uniSellPriceKNC, "ether")).toFixed(5),
		"U/B spread:", Number(((bancorSellPriceKNC / uniBuyPriceKNC) - 1) * 100).toFixed(2), "%"
	);
	console.log(
		"BANCOR : KNC buy:", Number(web3.utils.fromWei(bancorBuyPriceKNC, "ether")).toFixed(5), 
		"sell:", Number(web3.utils.fromWei(bancorSellPriceKNC, "ether")).toFixed(5),
		"B/U spread:", Number(((uniSellPriceKNC / bancorBuyPriceKNC) - 1) * 100).toFixed(2), "%"
	);
	console.log(
		"KYBER  : KNC buy:", Number(web3.utils.fromWei(kyberBuyPriceKNC, "ether")).toFixed(5), 
		"sell:", Number(web3.utils.fromWei(kyberSellPriceKNC, "ether")).toFixed(5),
		"K/B spread:", Number(((bancorSellPriceKNC / kyberBuyPriceKNC) - 1) * 100).toFixed(2), "%"
	);
	
	if (Number(bancorBuyPriceKNC) / 4 > Number(uniSellPriceKNC) / 4) {
		buyBancorSellUni(kncCode, kncPath);
		console.log("ARB    : buy KNC on Bancor, sell on Uniswap")
		console.log("...")
	} else if (Number(uniBuyPriceKNC) / 4 > Number(bancorSellPriceKNC) / 4) {
		buyUniSellBancor(kncCode, kncSell);
		console.log("ARB    : buy KNC on Uniswap, sell on Bancor")
		console.log("...")
	} else if (Number(bancorBuyPriceKNC) / 4 > Number(kyberSellPriceKNC) / 4) {
		buyBancorSellKyber(kncCode, kncPath);
		console.log("ARB    : buy KNC on Bancor, sell on Kyber")
		console.log("...")
	} else if (Number(kyberBuyPriceKNC) / 4 > Number(bancorSellPriceKNC) / 4) {
		buyKyberSellBancor(kncCode, kncSell);
		console.log("ARB    : buy KNC on Kyber, sell on Bancor")
		console.log("...")
	} else {
		console.log("ARB    : no KNC arbitrage opportunity")
		console.log("...")
	}

	console.log(
		"KYBER  : ENJ buy:", Number(web3.utils.fromWei(kyberBuyPriceENJ, "ether")).toFixed(5), 
		"sell:", Number(web3.utils.fromWei(kyberSellPriceENJ, "ether")).toFixed(5),
		"B/K spread:", Number(((bancorSellPriceENJ / kyberBuyPriceENJ) - 1) * 100).toFixed(2), "%"
	);
	console.log(
		"BANCOR : ENJ buy:", Number(web3.utils.fromWei(bancorBuyPriceENJ, "ether")).toFixed(5), 
		"sell:", Number(web3.utils.fromWei(bancorSellPriceENJ, "ether")).toFixed(5),
		"K/B spread:", Number(((kyberSellPriceENJ / bancorBuyPriceENJ) - 1) * 100).toFixed(2), "%"
	);
	
	if (Number(bancorBuyPriceENJ) / 4 > Number(kyberSellPriceENJ) / 4) {
		buyBancorSellKyber(enjCode, enjPath);
		console.log("ARB    : buy ENJ on Bancor, sell on Kyber")
		console.log("...")
	} else if (Number(kyberBuyPriceENJ) / 4 > Number(bancorSellPriceENJ) / 4) {
		buyKyberSellBancor(enjCode, enjSell);
		console.log("ARB    : buy ENJ on Kyber, sell on Bancor")
		console.log("...")
	} else {
		console.log("ARB    : no ENJ arbitrage opportunity")
		console.log("...")
	}

	// console.log(
	// 	"KYBER  : MANA buy:", Number(web3.utils.fromWei(kyberBuyPriceMANA, "ether")).toFixed(5), 
	// 	"sell:", Number(web3.utils.fromWei(kyberSellPriceMANA, "ether")).toFixed(5),
	// 	"B/K spread:", Number(((bancorSellPriceMANA / kyberBuyPriceMANA) - 1) * 100).toFixed(2), "%"
	// );
	// console.log(
	// 	"BANCOR : MANA buy:", Number(web3.utils.fromWei(bancorBuyPriceMANA, "ether")).toFixed(5), 
	// 	"sell:", Number(web3.utils.fromWei(bancorSellPriceMANA, "ether")).toFixed(5),
	// 	"K/B spread:", Number(((kyberSellPriceMANA / bancorBuyPriceMANA) - 1) * 100).toFixed(2), "%"
	// );
	
	// if (Number(bancorBuyPriceMANA) / 4 > Number(kyberSellPriceMANA) / 4) {
	// 	buyBancorSellKyber(manaCode, manaPath);
	// 	console.log("ARB    : buy MANA on Bancor, sell on Kyber")
	// 	console.log("...")
	// } else if (Number(kyberBuyPriceMANA) / 4 > Number(bancorSellPriceMANA) / 4) {
	// 	buyKyberSellBancor(manaCode, manaSell);
	// 	console.log("ARB    : buy MANA on Kyber, sell on Bancor")
	// 	console.log("...")
	// } else {
	// 	console.log("ARB    : no MANA arbitrage opportunity")
	// 	console.log("...")
	// }

	console.log(
		"KYBER  : BNB buy:", Number(web3.utils.fromWei(kyberBuyPriceBNB, "ether")).toFixed(5), 
		"sell:", Number(web3.utils.fromWei(kyberSellPriceBNB, "ether")).toFixed(5),
		"B/K spread:", Number(((bancorSellPriceBNB / kyberBuyPriceBNB) - 1) * 100).toFixed(2), "%"
	);
	console.log(
		"BANCOR : BNB buy:", Number(web3.utils.fromWei(bancorBuyPriceBNB, "ether")).toFixed(5), 
		"sell:", Number(web3.utils.fromWei(bancorSellPriceBNB, "ether")).toFixed(5),
		"K/B spread:", Number(((kyberSellPriceBNB / bancorBuyPriceBNB) - 1) * 100).toFixed(2), "%"
	);
	
	if (Number(bancorBuyPriceBNB) / 4 > Number(kyberSellPriceBNB) / 4) {
		buyBancorSellKyber(bnbCode, bnbPath);
		console.log("ARB    : buy BNB on Bancor, sell on Kyber")
		console.log("...")
	} else if (Number(kyberBuyPriceBNB) / 4 > Number(bancorSellPriceBNB) / 4) {
		buyKyberSellBancor(bnbCode, bnbSell);
		console.log("ARB    : buy BNB on Kyber, sell on Bancor")
		console.log("...")
	} else {
		console.log("ARB    : no BNB arbitrage opportunity")
		console.log("...")
	}

	console.log(
		"KYBER  : SNT buy:", Number(web3.utils.fromWei(kyberBuyPriceSNT, "ether")).toFixed(5), 
		"sell:", Number(web3.utils.fromWei(kyberSellPriceSNT, "ether")).toFixed(5),
		"B/K spread:", Number(((bancorSellPriceSNT / kyberBuyPriceSNT) - 1) * 100).toFixed(2), "%"
	);
	console.log(
		"BANCOR : SNT buy:", Number(web3.utils.fromWei(bancorBuyPriceSNT, "ether")).toFixed(5), 
		"sell:", Number(web3.utils.fromWei(bancorSellPriceSNT, "ether")).toFixed(5),
		"K/B spread:", Number(((kyberSellPriceSNT / bancorBuyPriceSNT) - 1) * 100).toFixed(2), "%"
	);
	
	if (Number(bancorBuyPriceSNT) / 4 > Number(kyberSellPriceSNT) / 4) {
		buyBancorSellKyber(sntCode, sntPath);
		console.log("ARB    : buy SNT on Bancor, sell on Kyber")
		console.log("...")
	} else if (Number(kyberBuyPriceSNT) / 4 > Number(bancorSellPriceSNT) / 4) {
		buyKyberSellBancor(sntCode, sntSell);
		console.log("ARB    : buy SNT on Kyber, sell on Bancor")
		console.log("...")
	} else {
		console.log("ARB    : no SNT arbitrage opportunity")
		console.log("...")
	}

    console.log("GAS PRICE:", web3.utils.fromWei(currentGasPrice, "gwei"), "gwei")
	console.log("...")
	console.log("...")

}, 5000);

			

}, 10000);


//KEY MANAGEMENT AND TX FUNCTIONS

const addressFrom = 'TOP_SECRET'
const privKey = new Buffer.from('TOP_SECRET', 'hex')

function buyUniSellOasis(_id) { 
	web3.eth.getTransactionCount(addressFrom).then(txCount => {
		
	  const txData = {
	    nonce: web3.utils.toHex(txCount),
	    gasLimit: web3.utils.toHex(600000),
	    gasPrice: web3.utils.toHex(currentGasPrice), 
	    to: arbContractAddress,
	    from: addressFrom,
	    data: '0x85dc9eba' + _id 
	  }

	  sendSigned(txData, function(err, result) {
	    if (err) return console.log('error')
	    console.log('sent buyUniSellOasis(uint256)', txCount, result)
	  })

	})
}

function buyOasisSellUni(_id) {
	web3.eth.getTransactionCount(addressFrom).then(txCount => {
		
	  const txData = {
	    nonce: web3.utils.toHex(txCount),
	    gasLimit: web3.utils.toHex(600000),
	    gasPrice: web3.utils.toHex(currentGasPrice),
	    to: arbContractAddress,
	    from: addressFrom,
	    data: '0x87b43248' + _id
	  }

	  sendSigned(txData, function(err, result) {
	    if (err) return console.log('error')
	    console.log('sent buyOasisSellUni(uint256)', txCount, result)
	  })
	
	})
}

function buyBancorSellUni(_id, _data) {
	web3.eth.getTransactionCount(addressFrom).then(txCount => {
		
	  const txData = {
	    nonce: web3.utils.toHex(txCount),
	    gasLimit: web3.utils.toHex(1600000),
	    gasPrice: web3.utils.toHex(bancorGasPrice),
	    to: arbContractAddress,
	    from: addressFrom,
	    data: '0x6ff18fcb' + _id + _data
	  }

	  sendSigned(txData, function(err, result) {
	    if (err) return console.log('error')
	    console.log('sent buyBancorSellUni(uint256,bytes)', txCount, result)
	  })
	
	})
}

function buyBancorSellOasis(_id, _data) {
	web3.eth.getTransactionCount(addressFrom).then(txCount => {
		
	  const txData = {
	    nonce: web3.utils.toHex(txCount),
	    gasLimit: web3.utils.toHex(1600000),
	    gasPrice: web3.utils.toHex(bancorGasPrice),
	    to: arbContractAddress,
	    from: addressFrom,
	    data: '0x0079dfdc' + _id + _data
	  }

	  sendSigned(txData, function(err, result) {
	    if (err) return console.log('error')
	    console.log('sent buyBancorSellOasis(uint256,bytes)', txCount, result)
	  })
	
	})
}

function buyBancorSellKyber(_id, _data) {
	web3.eth.getTransactionCount(addressFrom).then(txCount => {
		
	  const txData = {
	    nonce: web3.utils.toHex(txCount),
	    gasLimit: web3.utils.toHex(1800000),
	    gasPrice: web3.utils.toHex(bancorGasPrice),
	    to: arbContractAddress,
	    from: addressFrom,
	    data: '0x28394bed' + _id + _data
	  }

	  sendSigned(txData, function(err, result) {
	    if (err) return console.log('error')
	    console.log('sent buyBancorSellKyber(uint256,bytes)', txCount, result)
	  })
	
	})
}

function buyOasisSellBancor(_id, _data) {
	web3.eth.getTransactionCount(addressFrom).then(txCount => {
		
	  const txData = {
	    nonce: web3.utils.toHex(txCount),
	    gasLimit: web3.utils.toHex(1600000),
	    gasPrice: web3.utils.toHex(bancorGasPrice),
	    to: arbContractAddress,
	    from: addressFrom,
	    data: '0x7fc698f6' + _id + _data
	  }

	  sendSigned(txData, function(err, result) {
	    if (err) return console.log('error')
	    console.log('sent buyOasisSellBancor(uint256,bytes)', txCount, result)
	  })
	
	})
}

function buyUniSellBancor(_id, _data) {
	web3.eth.getTransactionCount(addressFrom).then(txCount => {
		
	  const txData = {
	    nonce: web3.utils.toHex(txCount),
	    gasPrice: web3.utils.toHex(bancorGasPrice),
	    gasLimit: web3.utils.toHex(1600000),
	    to: arbContractAddress,
	    from: addressFrom,
	    data: '0x0818ccd0' + _id + _data
	  	}

	  sendSigned(txData, function(err, result) {
	    if (err) return console.log('error')
	    console.log('sent buyUniSellBancor(uint256,bytes)', txCount, result)
	  })
	
	})
}

function buyKyberSellBancor(_id, _data) {
	web3.eth.getTransactionCount(addressFrom).then(txCount => {
		
	  const txData = {
	    nonce: web3.utils.toHex(txCount),
	    gasLimit: web3.utils.toHex(1800000),
	    gasPrice: web3.utils.toHex(bancorGasPrice),
	    to: arbContractAddress,
	    from: addressFrom,
	    data: '0x6378a3ae' + _id + _data
	  }

	  sendSigned(txData, function(err, result) {
	    if (err) return console.log('error')
	    console.log('sent buyKyberSellBancor(uint256,bytes)', txCount, result)
	  })
	
	})
}

function buyOasisSellKyber(_id) {
	web3.eth.getTransactionCount(addressFrom).then(txCount => {
		
	  const txData = {
	    nonce: web3.utils.toHex(txCount),
	    gasLimit: web3.utils.toHex(1600000),
	    gasPrice: web3.utils.toHex(currentGasPrice),
	    to: arbContractAddress,
	    from: addressFrom,
	    data: '0x0e53b59c' + _id
	  }

	  sendSigned(txData, function(err, result) {
	    if (err) return console.log('error')
	    console.log('sent buyOasisSellKyber(uint256,bytes)', txCount, result)
	  })
	
	})
}

function buyUniSellKyber(_id) {
	web3.eth.getTransactionCount(addressFrom).then(txCount => {
		
	  const txData = {
	    nonce: web3.utils.toHex(txCount),
	    gasLimit: web3.utils.toHex(1600000),
	    gasPrice: web3.utils.toHex(currentGasPrice),
	    to: arbContractAddress,
	    from: addressFrom,
	    data: '0x77af1572' + _id
	  }

	  sendSigned(txData, function(err, result) {
	    if (err) return console.log('error')
	    console.log('sent buyUniSellKyber(uint256,bytes)', txCount, result)
	  })
	
	})
}

function buyKyberSellUni(_id) {
	web3.eth.getTransactionCount(addressFrom).then(txCount => {
		
	  const txData = {
	    nonce: web3.utils.toHex(txCount),
	    gasLimit: web3.utils.toHex(1600000),
	    gasPrice: web3.utils.toHex(currentGasPrice),
	    to: arbContractAddress,
	    from: addressFrom,
	    data: '0x8cf044e0' + _id
	  }

	  sendSigned(txData, function(err, result) {
	    if (err) return console.log('error')
	    console.log('sent buyKyberSellUni(uint256,bytes)', txCount, result)
	  })
	
	})
}

function buyKyberSellOasis(_id) {
	web3.eth.getTransactionCount(addressFrom).then(txCount => {
		
	  const txData = {
	    nonce: web3.utils.toHex(txCount),
	    gasLimit: web3.utils.toHex(1600000),
	    gasPrice: web3.utils.toHex(currentGasPrice),
	    to: arbContractAddress,
	    from: addressFrom,
	    data: '0x8625aae5' + _id
	  }

	  sendSigned(txData, function(err, result) {
	    if (err) return console.log('error')
	    console.log('sent buyKyberSellOasis(uint256,bytes)', txCount, result)
	  })
	
	})
}

function sendSigned(txData, cb) {
	const tx = new Tx(txData);
	tx.sign(privKey);
	const serializedTx = tx.serialize();
	//console.log(serializedTx.toString('hex'))
  	web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), cb)
	//.on('receipt', console.log);
}


/**
    "0x28394bed": "buyBancorSellKyber(uint256,bytes)",
    "0x0079dfdc": "buyBancorSellOasis(uint256,bytes)",
    "0x6ff18fcb": "buyBancorSellUni(uint256,bytes)",
    "0x6378a3ae": "buyKyberSellBancor(uint256,bytes)",
    "0x8625aae5": "buyKyberSellOasis(uint256)",
    "0x8cf044e0": "buyKyberSellUni(uint256)",
    "0x7fc698f6": "buyOasisSellBancor(uint256,bytes)",
    "0x0e53b59c": "buyOasisSellKyber(uint256)",
    "0x87b43248": "buyOasisSellUni(uint256)",
    "0x0818ccd0": "buyUniSellBancor(uint256,bytes)",
    "0x77af1572": "buyUniSellKyber(uint256)",
    "0x85dc9eba": "buyUniSellOasis(uint256)",
 */

