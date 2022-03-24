import { refreshAccount, sendTransactions } from "@elrondnetwork/dapp-core";
import {
	Account,
	Address,
	AddressValue,
	ArgSerializer,
	BigUIntValue,
	BytesValue,
	ContractFunction,
	Egld,
	GasLimit,
	I8Value,
	Interaction,
	ProxyProvider,
	SmartContract,
	Transaction,
	TransactionPayload,
	TypedValue,
	U32Value,
} from "@elrondnetwork/erdjs/out";
import { CONTRACT_ADDRESS, STAKE, TOKEN_ID } from "config";

export default class StakeContract {
	contract: SmartContract;
	stakerAddress: Address;
	stakerAccount: Account;
	provider: ProxyProvider;

	constructor(account: any, contract: SmartContract, provider: ProxyProvider) {
		this.stakerAddress = account.address;
		this.stakerAccount = account;
		this.contract = contract;
		this.provider = provider;
	}

	createStakeTransaction = async (tokenId: string, stakeTypeId: number = 1, landInEgld: number = 100) => {
		const args: TypedValue[] = [
			BytesValue.fromUTF8(tokenId),
			new BigUIntValue(Egld(landInEgld).valueOf()),
			BytesValue.fromUTF8(STAKE),
			new U32Value(stakeTypeId), // stake_type_id
			new AddressValue(this.stakerAddress),
		];
		const { argumentsString } = new ArgSerializer().valuesToString(args);
		const data = new TransactionPayload(`ESDTTransfer@${argumentsString}`);

		let tx = new Transaction({
			receiver: new Address(CONTRACT_ADDRESS),
			gasLimit: new GasLimit(10000000),
			data: data,
		});
		await refreshAccount();
		sendTransactions({
			transactions: tx,
		});
	};

	createUnstakeTransaction = async () => {
		let tx = this.contract.call({
			func: new ContractFunction("unstake"),
			gasLimit: new GasLimit(6000000),
			args: [new I8Value(1)],
		});
		await refreshAccount();
		sendTransactions({
			transactions: tx,
		});
	};

	createClaimTransaction = async () => {
		let tx = this.contract.call({
			func: new ContractFunction("claim"),
			gasLimit: new GasLimit(5000000),
			args: [
				new U32Value(1), // node_id
			],
		});
		await refreshAccount();
		sendTransactions({
			transactions: tx,
		});
	};

	getStakeTypes = async () => {
		const interaction: Interaction = this.contract.methods.getStakeTypes();
		const queryResponse = await this.contract.runQuery(this.provider, interaction.buildQuery());
		const res = interaction.interpretQueryResponse(queryResponse);
		if (!res || !res.returnCode.isSuccess()) return;
		const value = res.firstValue.valueOf();

		return value;
	};

	getStakerAddresses = async () => {
		const interaction: Interaction = this.contract.methods.getStakerAddresses();
		const queryResponse = await this.contract.runQuery(this.provider, interaction.buildQuery());
		const res = interaction.interpretQueryResponse(queryResponse);
		if (!res || !res.returnCode.isSuccess()) return;
		const value = res.firstValue.valueOf();

		return value;
	};

	getNodesPerStaker = async () => {
		const args = [new AddressValue(new Address(this.stakerAddress))];
		const interaction: Interaction = this.contract.methods.getNodesPerStaker(args);
		const queryResponse = await this.contract.runQuery(this.provider, interaction.buildQuery());
		const res = interaction.interpretQueryResponse(queryResponse);
		if (!res || !res.returnCode.isSuccess()) return;
		const value = res.firstValue.valueOf();

		return value;
	};
}
