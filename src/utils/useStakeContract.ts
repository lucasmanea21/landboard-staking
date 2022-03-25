import { useGetAccountInfo, useGetNetworkConfig } from "@elrondnetwork/dapp-core";
import { AbiRegistry, Address, ProxyProvider, SmartContract, SmartContractAbi } from "@elrondnetwork/erdjs/out";
import StakeContract from "api";
import { useEffect, useState } from "react";
import { CONTRACT_ABI_URL, CONTRACT_ADDRESS, CONTRACT_NAME, TIMEOUT } from "../config";

const useStakeContract = () => {
	const [stakeContract, setStakeContract] = useState<StakeContract | null>(null);
	const { account } = useGetAccountInfo();
	const { network } = useGetNetworkConfig();

	const loadContract = async () => {
		if (account.address) {
			const abiRegistry = await AbiRegistry.load({
				urls: [CONTRACT_ABI_URL],
			});
			const contract = new SmartContract({
				address: new Address(CONTRACT_ADDRESS),
				abi: new SmartContractAbi(abiRegistry, [CONTRACT_NAME]),
			});
			const provider = new ProxyProvider(network.apiAddress, { timeout: TIMEOUT });
			setStakeContract(new StakeContract(account, contract, provider));
		}
	};

	const getStakeContract = async () => {
		const abiRegistry = await AbiRegistry.load({
			urls: [CONTRACT_ABI_URL],
		});
		const contract = new SmartContract({
			address: new Address(CONTRACT_ADDRESS),
			abi: new SmartContractAbi(abiRegistry, [CONTRACT_NAME]),
		});
		const provider = new ProxyProvider(network.apiAddress, { timeout: TIMEOUT });

		return new StakeContract(account, contract, provider);
	};

	useEffect(() => {
		console.log(network);
		loadContract();
	}, [network, account]);

	return {
		stakeContract,
		getStakeContract,
	};
};

export default useStakeContract;
