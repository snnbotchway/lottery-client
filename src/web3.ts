import Web3 from "web3";

const promise = window.ethereum.request({ method: "eth_requestAccounts" });

const web3 = new Web3(window.ethereum);

promise
	.then(() => {
		console.log("Connected to Ethereum");
	})
	.catch((error: Error) => {
		console.error(error);
	});

export default web3;
