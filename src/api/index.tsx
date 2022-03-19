import { sendTransactions } from "@elrondnetwork/dapp-core";
import {
	Account,
	Address,
	AddressValue,
	ChainID,
	ContractFunction,
	GasLimit,
	I8Value,
	ProxyProvider,
	SmartContract,
	StringValue,
} from "@elrondnetwork/erdjs/out";
import { CONTRACT_ADDRESS, STAKE_ONLY_HEX, TOKEN_ID_ONLY_HEX } from "config";

const contractAddress = new Address(CONTRACT_ADDRESS);
const provider = new ProxyProvider("https://devnet-gateway.elrond.com", { timeout: 5000 });

export default class StakeContract {
	contract: SmartContract;
	stakerAddress: Address;
	stakerAccount: Account;

	constructor(stakerAddr: string) {
		this.stakerAddress = new Address(stakerAddr);
		this.stakerAccount = new Account(this.stakerAddress);
		this.contract = new SmartContract({
			address: new Address(CONTRACT_ADDRESS),
		});
	}

	createStakeTransaction = async () => {
		let contract = new SmartContract({
			address: new Address(CONTRACT_ADDRESS),
		});

		let tx = contract.call({
			func: new ContractFunction("transferToken"),
			gasLimit: new GasLimit(5000000),
			args: [
				new StringValue("ESDTTransfer"),
				new StringValue(TOKEN_ID_ONLY_HEX),
				new StringValue("056bc75e2d63100000"),
				new StringValue(STAKE_ONLY_HEX),
				new StringValue("01"),
				new AddressValue(this.stakerAddress),
			],
		});
		tx.setGasLimit(new GasLimit(10000000));
		tx.setNonce(this.stakerAccount.nonce);

		sendTransactions({
			transactions: tx,
		});
	};

	createUnstakeTransaction = async () => {
		let contract = new SmartContract({
			address: new Address(CONTRACT_ADDRESS),
		});

		let tx = contract.call({
			func: new ContractFunction("unstake"),
			gasLimit: new GasLimit(6000000),
			args: [new I8Value(1)],
		});
		tx.setNonce(this.stakerAccount.nonce);

		sendTransactions({
			transactions: tx,
		});
	};

	createClaimTransaction = async () => {
		let contract = new SmartContract({
			address: new Address(CONTRACT_ADDRESS),
		});

		let tx = contract.call({
			func: new ContractFunction("claim"),
			gasLimit: new GasLimit(6000000),
			args: [new I8Value(1)],
		});
		tx.setNonce(this.stakerAccount.nonce);

		sendTransactions({
			transactions: tx,
		});
	};

	getStakeTypes = async () => {
		let contract = new SmartContract({
			address: new Address(CONTRACT_ADDRESS),
		});

		let response = await contract.runQuery(provider, {
			func: new ContractFunction("getStakeTypes"),
		});

		console.log("response", response);
		return response;
	};

	getStakerAddresses = async () => {
		let response = await this.contract.runQuery(provider, {
			func: new ContractFunction("getStakerAddresses"),
		});

		console.log("response", response);
		return response;
	};
}
