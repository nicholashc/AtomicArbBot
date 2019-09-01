pragma solidity ^0.5.3;

/**
 * INTERFACES
 */

contract Kyber {
	function getExpectedRate(address, address, uint256) external view returns(uint256, uint256) {}
	function swapEtherToToken(address, uint256) external payable returns(uint256) {}
	function swapTokenToEther(address, uint256, uint256) external returns(uint256) {}
}

contract BancorConverter {
	function getReturn(address, address, uint256) external view returns(uint256, uint256) {}
}

contract BancorConverter2 is BancorConverter {
	function getCrossConnectorReturn(address, address, uint256) external view returns(uint256) {}
}

contract Uniswap {
	function getEthToTokenInputPrice(uint256) external view returns(uint256) {}
	function getTokenToEthOutputPrice(uint256) external view returns(uint256) {}
	function tokenToEthSwapInput(uint256, uint256, uint256) external returns(uint256) {}
	function ethToTokenSwapInput(uint256, uint256) external payable returns(uint256) {}
}

contract Oasis {
	function getBuyAmount(address, address, uint256) external view returns(uint256) {}
	function getPayAmount(address, address, uint256) external view returns(uint256) {}
	function sellAllAmount(address, uint256, address, uint256) external returns(uint256) {}
}

contract ERC20 {
	function balanceOf(address) external view returns (uint256) {}
	function allowance(address, address) external view returns (uint256) {}
	function transfer(address, uint256) external returns (bool) {}
	function approve(address, uint256) external returns (bool) {}
}

contract WETHinterface is ERC20 {
	function deposit() public payable {}
	function withdraw(uint256) public {}
}

contract GasToken is ERC20 {
	function mint(uint256) external {}
	function free(uint256) external returns (bool) {}
}


/**
 * MAIN CONTRACT
 */

contract ArbBot {

	/**
	 * STATE VARIABLES
	 */

	address payable public owner;
	address payable public controller;

	uint256 public maxBuy;
	uint256 public buffer;
	uint256 public tokenCount;
	uint256 public gstAmount = 15;
	uint256 public gstAmountBancor = 15;
	bool public requireToggle = true;

	mapping (uint256 => address) public tokenAddress;
	mapping (uint256 => string) public tokenSymbol;
	mapping (uint256 => address) public bancorAddress;
	mapping (uint256 => address) public uniAddress;

	address constant public GST2 = 0x0000000000b3F879cb30FE243b4Dfee438691c04;
	address constant public BNT = 0x1F573D6Fb3F13d689FF844B4cE37794d79a7FF1C;
	address constant public OASIS = 0x39755357759cE0d7f32dC8dC45414CCa409AE24e;
	address payable constant public WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
	address payable constant public BANCOR = 0xCBc6a023eb975a1e2630223a7959988948E664f3;
	address payable constant public ETHTKN = 0xc0829421C1d260BD3cB3E0F06cfE2D52db2cE315;
	address payable constant public KYBER = 0x818E6FECD516Ecc3849DAf6845e3EC868087B755;

	GasToken constant gas = GasToken(GST2);
	WETHinterface constant weth = WETHinterface(WETH);
	Oasis constant oasis = Oasis(OASIS);
	BancorConverter constant bancor = BancorConverter(BANCOR);
	Kyber constant kyber = Kyber(KYBER);

	/**
	 * CONSTRUCTOR
	 */

	constructor(address payable _controller) public {
		owner = msg.sender;
		setController(_controller);
		maxBuy = 4 ether;
		buffer = 2 finney;
		addToken(GST2, "GST2"); //GST2 index 0
		addToken(WETH, "WETH"); //WETH index 1
		addToken(BNT, "BNT"); //BNT index 2
		addToken(ETHTKN, "ETHTKN"); //ETHTKN index 3
		
		//DAI
		addTokenWithExchange(
		0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359,
		"DAI",
		0x09cabEC1eAd1c0Ba254B09efb3EE13841712bE14,
		0x587044b74004E3D5eF2D453b7F8d198d9e4cB558); //DAI index 4
		
		//MKR
		addTokenWithExchange(
		0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2,
		"MKR",
		0x2C4Bd064b998838076fa341A83d007FC2FA50957,
		0xfdbb3b3Cfd6fcc0DD5C1B5bff05bFfAC1DB42258); //MKR index 5
		
		//TKN
		addTokenWithExchange(
		0xaAAf91D9b90dF800Df4F55c205fd6989c977E73a,
		"TKN",
		0xb6cFBf322db47D39331E306005DC7E5e6549942B,
		0xC04B5a4556d00Bca8eac5F5accA31981a6597409); //TKN index 6
		
		//RLC
		addTokenWithExchange(
		0x607F4C5BB672230e8672085532f7e901544a7375,
		"RLC",
		0xA825CAE02B310E9901b4776806CE25db520c8642,
		0x8b30e174BdDB3C0376e666aFB8a4196e2F53182d); //RLC index 7
		
		//NEXO
		addTokenWithExchange(
		0xB62132e35a6c13ee1EE0f84dC5d40bad8d815206,
		"NEXO",
		0x069C97DBA948175D10af4b2414969e0B88d44669,
		0xa2630FC0233940779F25DFDCff3aBbDc85682a4c); //NEXO index 8
		
		//ANT
		addTokenWithExchange(
		0x960b236A07cf122663c4303350609A66A7B288C0,
		"ANT",
		0x077d52B047735976dfdA76feF74d4d988AC25196,
		0xA0dc0Aa8Ff89A74C9E5EDCB008788B201405683c); //ANT index 9
		
		//RDN
		addTokenWithExchange(
		0x255Aa6DF07540Cb5d3d297f0D0D4D84cb52bc8e6,
		"RDN",
		0x7D03CeCb36820b4666F45E1b4cA2538724Db271C,
		0xB7246144F53Ec44E0f845Fd0DEea85208acFC2C9); //RDN index 10

		//DGD
		addTokenWithExchange(
		0xE0B7927c4aF23765Cb51314A0E0521A9645F0E2A,
		"DGD",
		0xD55C1cA9F5992A2e5E379DCe49Abf24294ABe055,
		0x9b42a6DDE041Bd3b812e4dDe32aD2887fB9D08da); //DGD index 11
		
		//INITIAL APPROVALS
		approveERC20(1, OASIS, 10**25);
		approveERC20(4, OASIS, 10**25);
		approveERC20(5, OASIS, 10**25);
	}

	/**
	 * MODIFIERES
	 */

	modifier onlyOwner() { 
		require (msg.sender == owner); 
		_; 
	}

	modifier onlyOwners() { 
		require (msg.sender == owner || msg.sender == controller); 
		_; 
	}

	/**
	 * ADMIN FUNCTIONS
	 */

	function setController(address payable _address) public onlyOwner {
		controller = _address;
	}

	function withdrawAll() external onlyOwner {
		owner.transfer(address(this).balance);
	}

	function withdrawAmount(uint256 _amount) external onlyOwner {
		require (_amount <= address(this).balance);
		owner.transfer(_amount);
	}

	function changeMaxBuy(uint256 _maxBuy) external onlyOwner {
		maxBuy = _maxBuy;
	}

	function changeBuffer(uint256 _buffer) external onlyOwner {
		buffer = _buffer;
	}

	function addToken(address _address, string memory _symbol) internal onlyOwners {
		tokenAddress[tokenCount] = _address;
		tokenSymbol[tokenCount] = _symbol;
		tokenCount++;
	}

	function addTokenWithExchange(
		address _address, 
		string memory _symbol, 
		address _uniEx, 
		address _bancorEx) 
	public 
	onlyOwners 
	{
		uniAddress[tokenCount] = _uniEx;
		bancorAddress[tokenCount] = _bancorEx;
		//kyber
		addToken(_address, _symbol);
		//approve uni
		approveERC20(tokenCount - 1, _uniEx, 10**25);
		approveERC20(tokenCount - 1, _bancorEx, 10**25);
		approveERC20(tokenCount - 1, KYBER, 10**25);
	}

	function addUniAddress(address _address, uint256 _id) external onlyOwners {
		uniAddress[_id] = _address;
	}

	function setGstAmount(uint256 _gst, uint256 _gstBancor) external onlyOwners {
		gstAmount = _gst;
		gstAmountBancor = _gstBancor;
	}

	function toggleRequire() external onlyOwners {
		requireToggle == requireToggle ? requireToggle = !requireToggle : requireToggle;
		requireToggle == !requireToggle ? requireToggle = requireToggle : requireToggle;
	}

	/**
	 * CONTRACT HELPERS
	 */
	
	function getETHbalance() public view returns(uint256) {
		return address(this).balance;
	}

	function getETHbalanceThreshold() public view returns(uint256) {
		return address(this).balance >= maxBuy ? maxBuy : address(this).balance;
	}
	
	/**
	 * ERC20 FUNCTIONALITY
	 */
	
	function getERC20balance(uint256 _id) public view returns(uint256) {
		ERC20 erc = ERC20(tokenAddress[_id]);
		return erc.balanceOf(address(this));
	}

	function getERC20allowance(uint256 _id, address _spender) public view returns(uint256) {
		ERC20 erc = ERC20(tokenAddress[_id]);
		return erc.allowance(address(this), _spender);
	}

	function transferERC20(
		uint256 _id, 
		address _target, 
		uint256 _amount) 
	public 
	onlyOwners 
	returns(bool) 
	{
		ERC20 erc = ERC20(tokenAddress[_id]);
		return erc.transfer(_target, _amount);
	}

	function approveERC20(
		uint256 _id, 
		address _target, 
		uint256 _amount) 
	public 
	onlyOwners 
	returns(bool) 
	{
		ERC20 erc = ERC20(tokenAddress[_id]);
	    erc.approve(_target, _amount);
	}

	function wrapWETH(uint256 _amount) public payable onlyOwners {
		weth.deposit.value(_amount)();
	}

	function unwrapWETH(uint256 _amount) public onlyOwners {
		weth.withdraw(_amount);
	}

	/** 
	 * GENERALIZED PRICE CHECK
	 */
	
	/** UNISWAP */

	function getUniBuyPrice(uint256 _ETHamount, uint256 _tokenID) public view returns(uint256) {
		address uniContract = uniAddress[_tokenID];
		Uniswap uni = Uniswap(uniContract);
		return uni.getEthToTokenInputPrice(_ETHamount);
	}

	function getUniSellPrice(uint256 _ETHamount, uint256 _tokenID) public view returns(uint256) {
		address uniContract = uniAddress[_tokenID];
		Uniswap uni = Uniswap(uniContract);
		return uni.getTokenToEthOutputPrice(_ETHamount);
	}

	/** OASIS */

	function getOasisBuyPrice(uint256 _ETHamount, uint256 _tokenID) public view returns(uint256) {
		address token = tokenAddress[_tokenID];
		return oasis.getBuyAmount(token, WETH, _ETHamount);
	}

	function getOasisSellPrice(uint256 _ETHamount, uint256 _tokenID) public view returns(uint256) {
		address token = tokenAddress[_tokenID];
		return oasis.getPayAmount(token, WETH, _ETHamount);
	}

	/** BANCOR */

	function getBancorBuyPrice(uint256 _ETHamount, uint256 _tokenID) public view returns(uint256) {
		uint256 bntAmount;
		uint256 nothing;
		(bntAmount, nothing) = bancor.getReturn(ETHTKN, BNT, _ETHamount);
		address token = tokenAddress[_tokenID];
		address bancorAdd = bancorAddress[_tokenID];
		BancorConverter2 bancorToken = BancorConverter2(bancorAdd);
		return bancorToken.getCrossConnectorReturn(BNT, token, bntAmount);
	}

	function getBancorSellPrice(uint256 _ETHamount, uint256 _tokenID) public view returns(uint256) {
		uint256 buyPrice = getBancorBuyPrice(_ETHamount, _tokenID);
		address token = tokenAddress[_tokenID];
		address bancorAdd = bancorAddress[_tokenID];
		BancorConverter2 bancorToken = BancorConverter2(bancorAdd);
		uint256 bntAmount = bancorToken.getCrossConnectorReturn(token, BNT, buyPrice);
		uint256 ethAmount;
		uint256 nothing;
		(ethAmount, nothing) = bancor.getReturn(BNT, ETHTKN, bntAmount);
		return buyPrice * _ETHamount / ethAmount;
	}

	/** KYBER */

	function getKyberBuyPrice(uint256 _ETHamount, uint256 _tokenID) public view returns(uint256) {
		address token = tokenAddress[_tokenID];
		uint256 price;
		uint256 slippage;
		(price, slippage) = kyber.getExpectedRate(WETH, token, _ETHamount);
		return price * _ETHamount / 10**18;
	}

	function getKyberSellPrice(uint256 _tokenAmount, uint256 _tokenID) public view returns(uint256) {
		address token = tokenAddress[_tokenID];
		uint256 price;
		uint256 slippage;
		(price, slippage) = kyber.getExpectedRate(token, WETH, _tokenAmount);
		uint256 temp = (price * _tokenAmount) / 10**18;
        return (_tokenAmount * _tokenAmount) / temp;
	}

	/**
	 * DEX BUY/SELL
	 */	

	/** BUY UNISWAP */
	function buyUniswap(uint256 _ETH, uint256 _tokenID) public payable onlyOwners returns(uint256) {
		address uniAdd = uniAddress[_tokenID];
		Uniswap uni = Uniswap(uniAdd);
		return uni.ethToTokenSwapInput.value(_ETH)(1, now + 10000);
	}

	/** SELL UNISWAP */
	function sellUniswap(uint256 _tokensSold, uint256 _tokenID) public onlyOwners returns(uint256) {
		address uniAdd = uniAddress[_tokenID];
		Uniswap uni = Uniswap(uniAdd);
		return uni.tokenToEthSwapInput(_tokensSold, 1, now + 10000);
	}

	/** BUY OASIS */
	function buyOasis(uint256 _ETH, uint256 _tokenID) public payable onlyOwners returns(uint256){
		require (_tokenID == 4 || _tokenID == 5); //only DAI or MKR
		address token = tokenAddress[_tokenID];
		wrapWETH(_ETH);
		uint256 wethBalance = getERC20balance(1);
		return oasis.sellAllAmount(WETH, wethBalance, token, 1);
	}

	/** SELL OASIS */
	function sellOasis(uint256 _tokensSold, uint256 _tokenID) public onlyOwners returns(uint256){
		require (_tokenID == 4 || _tokenID == 5); //only DAI or MKR
		address token = tokenAddress[_tokenID];
		uint256 amountReturned = oasis.sellAllAmount(token, _tokensSold, WETH, 1);
		uint256 wethBalance = getERC20balance(1);
		unwrapWETH(wethBalance);
		return amountReturned;
	}

	/** BUY KYBER */
	function buyKyber(uint256 _ETH, uint256 _tokenID) public payable onlyOwners returns(uint256) {
		address token = tokenAddress[_tokenID];
		return kyber.swapEtherToToken.value(_ETH)(token, 1);
	}

	/** SELL KYBER */
	function sellKyber(uint256 _tokenAmount, uint256 _tokenID) public onlyOwners returns(uint256) {
		address token = tokenAddress[_tokenID];
		return kyber.swapTokenToEther(token, _tokenAmount, 1);
	}

	/** BUY BANCOR */
	function buyBancor(uint256 _ETH, bytes memory _addressPath) public payable onlyOwners returns(bool, bytes memory) {
		//calculate the address path arguement script side
		bytes4 sig = 0xf0843ba9;
		bytes memory payload = abi.encodePacked(sig, abi.encode(96, _ETH, 1, 5), _addressPath);
	    return BANCOR.call.value(_ETH)(payload);
	}

	/** SELL BANCOR */
	function sellBancor(uint256 _tokenID, uint256 _tokenAmount, bytes memory _addressPath) public onlyOwners returns(bool, bytes memory) {
		//calculate the backed arguement script side
		address bancorContract = bancorAddress[_tokenID];
		bytes4 sig = 0xf0843ba9;
		bytes memory payload = abi.encodePacked(sig, abi.encode(96, _tokenAmount, 1, 5), _addressPath);
	    return bancorContract.call(payload);
	}

 	/** BUY UNISWAP/SELL OASIS */
 	function buyUniSellOasis(uint256 _tokenID) public onlyOwners {
 		uint256 balance = getETHbalanceThreshold(); //4 ether
 		//early check to save gas
 		uint256 balanceSmall = balance / 16;
 		if (requireToggle == true) {
 			require (getUniBuyPrice(balanceSmall, _tokenID) > getOasisSellPrice(balanceSmall + buffer, _tokenID));
 		}	
 		if (getUniBuyPrice(balance, _tokenID) <= getOasisSellPrice(balance + buffer, _tokenID)) {
 			balance /= 2; //2 ether
 			if (getUniBuyPrice(balance, _tokenID) <= getOasisSellPrice(balance + buffer, _tokenID)) {
 				balance /= 2; //1 ether
 				if (getUniBuyPrice(balance, _tokenID) <= getOasisSellPrice(balance + buffer, _tokenID)) {
		 			balance /= 2; //0.5 ether
		 			if (getUniBuyPrice(balance, _tokenID) <= getOasisSellPrice(balance + buffer, _tokenID)) {
		 				balance /= 2; //0.25 ether
		 			}
		 		}
 			} 
 		} 
 		buyUniswap(balance, _tokenID);
 		uint256 tokenBalance = getERC20balance(_tokenID);
 		sellOasis(tokenBalance, _tokenID);
 		burnGasToken(gstAmount);
 	}

 	/** BUY UNISWAP/SELL KYBER */
 	function buyUniSellKyber(uint256 _tokenID) public onlyOwners {
 		uint256 balance = getETHbalanceThreshold(); //4 ether
 		//early check to save gas
 		uint256 balanceSmall = balance / 16;
 		if (requireToggle == true) {
 			require (getUniBuyPrice(balanceSmall, _tokenID) > getKyberSellPrice(balanceSmall + buffer, _tokenID));
 		}	
 		if (getUniBuyPrice(balance, _tokenID) <= getKyberSellPrice(balance + buffer, _tokenID)) {
 			balance /= 2; //2 ether
 			if (getUniBuyPrice(balance, _tokenID) <= getKyberSellPrice(balance + buffer, _tokenID)) {
 				balance /= 2; //1 ether
 				if (getUniBuyPrice(balance, _tokenID) <= getKyberSellPrice(balance + buffer, _tokenID)) {
		 			balance /= 2; //0.5 ether
		 			if (getUniBuyPrice(balance, _tokenID) <= getKyberSellPrice(balance + buffer, _tokenID)) {
		 				balance /= 2; //0.25 ether
		 			}
		 		}
 			} 
 		} 
 		buyUniswap(balance, _tokenID);
 		uint256 tokenBalance = getERC20balance(_tokenID);
 		sellKyber(tokenBalance, _tokenID);
 		burnGasToken(gstAmount);
 	}

 	/** BUY UNISWAP/SELL BANCOR */
 	function buyUniSellBancor(uint256 _tokenID, bytes memory _addressPath) public onlyOwners {
 		uint256 balance = getETHbalanceThreshold(); //4 ether
 		//early check to save gas
 		uint256 balanceSmall = balance / 16;
 		if (requireToggle == true) {
 			require (getUniBuyPrice(balanceSmall, _tokenID) > getBancorSellPrice(balanceSmall + buffer, _tokenID));
 		}	
 		if (getUniBuyPrice(balance, _tokenID) <= getBancorSellPrice(balance + buffer, _tokenID)) {
 			balance /= 2; //2 ether
 			if (getUniBuyPrice(balance, _tokenID) <= getBancorSellPrice(balance + buffer, _tokenID)) {
 				balance /= 2; //1 ether
 				if (getUniBuyPrice(balance, _tokenID) <= getBancorSellPrice(balance + buffer, _tokenID)) {
		 			balance /= 2; //0.5 ether
		 			if (getUniBuyPrice(balance, _tokenID) <= getBancorSellPrice(balance + buffer, _tokenID)) {
		 				balance /= 2; //0.25 ether
		 			}
		 		}
 			} 
 		} 
 		buyUniswap(balance, _tokenID);
 		uint256 tokenBalance = getERC20balance(_tokenID);
 		sellBancor(_tokenID, tokenBalance, _addressPath);
 		burnGasToken(gstAmountBancor);
 	}

 	/** BUY OASIS/SELL UNISWAP */
 	function buyOasisSellUni(uint256 _tokenID) public onlyOwners {
 		uint256 balance = getETHbalanceThreshold(); //4 ether
 		//early check to save gas
 		uint256 balanceSmall = balance / 16;
 		if (requireToggle == true) {
 			require (getOasisBuyPrice(balanceSmall, _tokenID) > getUniSellPrice(balanceSmall + buffer, _tokenID));
 		}	
 		if (getOasisBuyPrice(balance, _tokenID) <= getUniSellPrice(balance + buffer, _tokenID)) {
 			balance /= 2; //2 ether
 			if (getOasisBuyPrice(balance, _tokenID) <= getUniSellPrice(balance + buffer, _tokenID)) {
 				balance /= 2; //1 ether
 				if (getOasisBuyPrice(balance, _tokenID) <= getUniSellPrice(balance + buffer, _tokenID)) {
		 			balance /= 2; //0.5 ether
		 			if (getOasisBuyPrice(balance, _tokenID) <= getUniSellPrice(balance + buffer, _tokenID)) {
		 				balance /= 2; //0.25 ether
		 			}
		 		}
 			} 
 		} 
 		buyOasis(balance, _tokenID);
 		uint256 tokenBalance = getERC20balance(_tokenID);
 		sellUniswap(tokenBalance, _tokenID);
 		burnGasToken(gstAmount);
 	}

 	/** BUY OASIS/SELL KYBER */
 	function buyOasisSellKyber(uint256 _tokenID) public onlyOwners {
 		uint256 balance = getETHbalanceThreshold(); //4 ether
 		//early check to save gas
 		uint256 balanceSmall = balance / 16;
 		if (requireToggle == true) {
 			require (getOasisBuyPrice(balanceSmall, _tokenID) > getKyberSellPrice(balanceSmall + buffer, _tokenID));
 		}	
 		if (getOasisBuyPrice(balance, _tokenID) <= getKyberSellPrice(balance + buffer, _tokenID)) {
 			balance /= 2; //2 ether
 			if (getOasisBuyPrice(balance, _tokenID) <= getKyberSellPrice(balance + buffer, _tokenID)) {
 				balance /= 2; //1 ether
 				if (getOasisBuyPrice(balance, _tokenID) <= getKyberSellPrice(balance + buffer, _tokenID)) {
		 			balance /= 2; //0.5 ether
		 			if (getOasisBuyPrice(balance, _tokenID) <= getKyberSellPrice(balance + buffer, _tokenID)) {
		 				balance /= 2; //0.25 ether
		 			}
		 		}
 			} 
 		} 
 		buyOasis(balance, _tokenID);
 		uint256 tokenBalance = getERC20balance(_tokenID);
 		sellKyber(tokenBalance, _tokenID);
 		burnGasToken(gstAmount);
 	}

 	/** BUY OASIS/SELL BANCOR */
 	function buyOasisSellBancor(uint256 _tokenID, bytes memory _addressPath) public onlyOwners {
 		uint256 balance = getETHbalanceThreshold(); //4 ether
 		//early check to save gas
 		uint256 balanceSmall = balance / 16;
 		if (requireToggle == true) {
 			require (getOasisBuyPrice(balanceSmall, _tokenID) > getBancorSellPrice(balanceSmall + buffer, _tokenID));
 		}	
 		if (getOasisBuyPrice(balance, _tokenID) <= getBancorSellPrice(balance + buffer, _tokenID)) {
 			balance /= 2; //2 ether
 			if (getOasisBuyPrice(balance, _tokenID) <= getBancorSellPrice(balance + buffer, _tokenID)) {
 				balance /= 2; //1 ether
 				if (getOasisBuyPrice(balance, _tokenID) <= getBancorSellPrice(balance + buffer, _tokenID)) {
		 			balance /= 2; //0.5 ether
		 			if (getOasisBuyPrice(balance, _tokenID) <= getBancorSellPrice(balance + buffer, _tokenID)) {
		 				balance /= 2; //0.25 ether
		 			}
		 		}
 			} 
 		} 
 		buyOasis(balance, _tokenID);
 		uint256 tokenBalance = getERC20balance(_tokenID);
 		sellBancor(_tokenID, tokenBalance, _addressPath);
 		burnGasToken(gstAmountBancor);
 	}

 	/** BUY KYBER/SELL UNISWAP */
 	function buyKyberSellUni(uint256 _tokenID) public onlyOwners {
 		uint256 balance = getETHbalanceThreshold(); //4 ether
 		//early check to save gas
 		uint256 balanceSmall = balance / 16;
 		if (requireToggle == true) {
 			require (getKyberBuyPrice(balanceSmall, _tokenID) > getUniSellPrice(balanceSmall + buffer, _tokenID));
 		}	
 		if (getKyberBuyPrice(balance, _tokenID) <= getUniSellPrice(balance + buffer, _tokenID)) {
 			balance /= 2; //2 ether
 			if (getKyberBuyPrice(balance, _tokenID) <= getUniSellPrice(balance + buffer, _tokenID)) {
 				balance /= 2; //1 ether
 				if (getKyberBuyPrice(balance, _tokenID) <= getUniSellPrice(balance + buffer, _tokenID)) {
		 			balance /= 2; //0.5 ether
		 			if (getKyberBuyPrice(balance, _tokenID) <= getUniSellPrice(balance + buffer, _tokenID)) {
		 				balance /= 2; //0.25 ether
		 			}
		 		}
 			} 
 		} 
 		buyKyber(balance, _tokenID);
 		uint256 tokenBalance = getERC20balance(_tokenID);
 		sellUniswap(tokenBalance, _tokenID);
 		burnGasToken(gstAmount);
 	}

 	/** BUY KYBER/SELL OASIS */
 	function buyKyberSellOasis(uint256 _tokenID) public onlyOwners {
 		uint256 balance = getETHbalanceThreshold(); //4 ether
 		//early check to save gas
 		uint256 balanceSmall = balance / 16;
 		if (requireToggle == true) {
 			require (getKyberBuyPrice(balanceSmall, _tokenID) > getOasisSellPrice(balanceSmall + buffer, _tokenID));
 		}	
 		if (getKyberBuyPrice(balance, _tokenID) <= getOasisSellPrice(balance + buffer, _tokenID)) {
 			balance /= 2; //2 ether
 			if (getKyberBuyPrice(balance, _tokenID) <= getOasisSellPrice(balance + buffer, _tokenID)) {
 				balance /= 2; //1 ether
 				if (getKyberBuyPrice(balance, _tokenID) <= getOasisSellPrice(balance + buffer, _tokenID)) {
		 			balance /= 2; //0.5 ether
		 			if (getKyberBuyPrice(balance, _tokenID) <= getOasisSellPrice(balance + buffer, _tokenID)) {
		 				balance /= 2; //0.25 ether
		 			}
		 		}
 			} 
 		} 
 		buyKyber(balance, _tokenID);
 		uint256 tokenBalance = getERC20balance(_tokenID);
 		sellOasis(tokenBalance, _tokenID);
 		burnGasToken(gstAmount);
 	}

 	/** BUY KYBER/SELL BANCOR */
 	function buyKyberSellBancor(uint256 _tokenID, bytes memory _addressPath) public onlyOwners {
 		uint256 balance = getETHbalanceThreshold(); //4 ether
 		//early check to save gas
 		uint256 balanceSmall = balance / 16;
 		if (requireToggle == true) {
 			require (getKyberBuyPrice(balanceSmall, _tokenID) > getBancorSellPrice(balanceSmall + buffer, _tokenID));
 		}	
 		if (getKyberBuyPrice(balance, _tokenID) <= getBancorSellPrice(balance + buffer, _tokenID)) {
 			balance /= 2; //2 ether
 			if (getKyberBuyPrice(balance, _tokenID) <= getBancorSellPrice(balance + buffer, _tokenID)) {
 				balance /= 2; //1 ether
 				if (getKyberBuyPrice(balance, _tokenID) <= getBancorSellPrice(balance + buffer, _tokenID)) {
		 			balance /= 2; //0.5 ether
		 			if (getKyberBuyPrice(balance, _tokenID) <= getBancorSellPrice(balance + buffer, _tokenID)) {
		 				balance /= 2; //0.25 ether
		 			}
		 		}
 			} 
 		} 
 		buyKyber(balance, _tokenID);
 		uint256 tokenBalance = getERC20balance(_tokenID);
 		sellBancor(_tokenID, tokenBalance, _addressPath);
 		burnGasToken(gstAmountBancor);
 	}

 	/** BUY BANCOR/SELL UNISWAP */
 	function buyBancorSellUni(uint256 _tokenID, bytes memory _addressPath) public onlyOwners {
 		uint256 balance = getETHbalanceThreshold(); //4 ether
 		//early check to save gas
 		uint256 balanceSmall = balance / 16;
 		if (requireToggle == true) {
 			require (getBancorBuyPrice(balanceSmall, _tokenID) > getUniSellPrice(balanceSmall + buffer, _tokenID));
 		}	
 		if (getBancorBuyPrice(balance, _tokenID) <= getUniSellPrice(balance + buffer, _tokenID)) {
 			balance /= 2; //2 ether
 			if (getBancorBuyPrice(balance, _tokenID) <= getUniSellPrice(balance + buffer, _tokenID)) {
 				balance /= 2; //1 ether
 				if (getBancorBuyPrice(balance, _tokenID) <= getUniSellPrice(balance + buffer, _tokenID)) {
		 			balance /= 2; //0.5 ether
		 			if (getBancorBuyPrice(balance, _tokenID) <= getUniSellPrice(balance + buffer, _tokenID)) {
		 				balance /= 2; //0.25 ether
		 			}
		 		}
 			} 
 		} 
 		buyBancor(balance, _addressPath);
 		uint256 tokenBalance = getERC20balance(_tokenID);
 		sellUniswap(tokenBalance, _tokenID);
 		burnGasToken(gstAmountBancor);
 	}

 	/** BUY BANCOR/SELL OASIS */
 	function buyBancorSellOasis(uint256 _tokenID, bytes memory _addressPath) public onlyOwners {
 		uint256 balance = getETHbalanceThreshold(); //4 ether
 		//early check to save gas
 		uint256 balanceSmall = balance / 16;
 		if (requireToggle == true) {
 			require (getBancorBuyPrice(balanceSmall, _tokenID) > getOasisSellPrice(balanceSmall + buffer, _tokenID));
 		}	
 		if (getBancorBuyPrice(balance, _tokenID) <= getOasisSellPrice(balance + buffer, _tokenID)) {
 			balance /= 2; //2 ether
 			if (getBancorBuyPrice(balance, _tokenID) <= getOasisSellPrice(balance + buffer, _tokenID)) {
 				balance /= 2; //1 ether
 				if (getBancorBuyPrice(balance, _tokenID) <= getOasisSellPrice(balance + buffer, _tokenID)) {
		 			balance /= 2; //0.5 ether
		 			if (getBancorBuyPrice(balance, _tokenID) <= getOasisSellPrice(balance + buffer, _tokenID)) {
		 				balance /= 2; //0.25 ether
		 			}
		 		}
 			} 
 		} 
 		buyBancor(balance, _addressPath);
 		uint256 tokenBalance = getERC20balance(_tokenID);
 		sellOasis(tokenBalance, _tokenID);
 		burnGasToken(gstAmountBancor);
 	}

 	/** BUY BANCOR/SELL KYBER */
 	function buyBancorSellKyber(uint256 _tokenID, bytes memory _addressPath) public onlyOwners {
 		uint256 balance = getETHbalanceThreshold(); //4 ether
 		//early check to save gas
 		uint256 balanceSmall = balance / 16;
 		if (requireToggle == true) {
 			require (getBancorBuyPrice(balanceSmall, _tokenID) > getKyberSellPrice(balanceSmall + buffer, _tokenID));
 		}	
 		if (getBancorBuyPrice(balance, _tokenID) <= getKyberSellPrice(balance + buffer, _tokenID)) {
 			balance /= 2; //2 ether
 			if (getBancorBuyPrice(balance, _tokenID) <= getKyberSellPrice(balance + buffer, _tokenID)) {
 				balance /= 2; //1 ether
 				if (getBancorBuyPrice(balance, _tokenID) <= getKyberSellPrice(balance + buffer, _tokenID)) {
		 			balance /= 2; //0.5 ether
		 			if (getBancorBuyPrice(balance, _tokenID) <= getKyberSellPrice(balance + buffer, _tokenID)) {
		 				balance /= 2; //0.25 ether
		 			}
		 		}
 			} 
 		} 
 		buyBancor(balance, _addressPath);
 		uint256 tokenBalance = getERC20balance(_tokenID);
 		sellKyber(tokenBalance, _tokenID);
 		burnGasToken(gstAmountBancor);
 	}

	/**
	 * GAS TOKEN
	 */
	
	function mintGasTokens(uint256 _amount) external onlyOwners {
	  	gas.mint(_amount);
	}

	function burnGasToken(uint256 _amount) public payable onlyOwners returns(bool) {
		//only burn if address(this) has enough GST2
		return getERC20balance(0) >= _amount ? gas.free(_amount) : false;
	}
	
	/**
	 * FALLBACK
	 */
	
	function() external payable {}
		
}