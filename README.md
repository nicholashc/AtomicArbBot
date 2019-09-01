# AtomicArbBot
I'm open-sourcing an atomic arbitrage dex bot I don't use anymore. I will eventually document this more completely. 

The basic concept is the "Controller" script would scan pending transactions that would find guarenteed profitiable arbitrage opportunities between Uniswap, Oasis/Eth2Dai, Bancor, and Kyber. I no longer had time to keep optimizing it against increasing competition so turned it off. Sharing now out of general interest.

There are two main parts: 
1) ArbBot.sol: a fairly well written contract that would revert if the oppportunity was not profitiable. Clever enough to use GasToken to reduce costs.
2) Controller.js: a somewhat bloated and jankily written script connected to a local node that would scan for opportunitites and dispatch them to the ArbBot. It got the job done but could use a major refactor with consistently written modern javascript and way less code duplication.
