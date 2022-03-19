import { sendTransactions } from "@elrondnetwork/dapp-core";
import { Address, ContractFunction, GasLimit, SmartContract } from "@elrondnetwork/erdjs/out";
import axios from "axios";
import { CALLER_ADDRESS } from "config";

interface GetLatestTransactionsType {
  apiAddress: string;
  address: string;
  contractAddress: string;
  timeout: number;
  page?: number;
  url?: string;
}

const fetchTransactions = (url: string) =>
  async function getTransactions({
    apiAddress,
    address,
    contractAddress,
    timeout,
  }: GetLatestTransactionsType) {
    try {
      const { data } = await axios.get(`${apiAddress}${url}`, {
        params: {
          sender: address,
          receiver: contractAddress,
          condition: "must",
          size: 25,
        },
        timeout,
      });

      return {
        data: data,
        success: data !== undefined,
      };
    } catch (err) {
      return {
        success: false,
      };
    }
  };

export const getTransactions = fetchTransactions("/transactions");
export const getTransactionsCount = fetchTransactions("/transactions/count");

const createStakeTransaction = async (senderAddress: string) => {
  let contract = new SmartContract({
    address: new Address(CALLER_ADDRESS),
  });

  let tx = contract.call({
    func: new ContractFunction("transferToken"),
    gasLimit: new GasLimit(5000000),
    // args: [new AddressValue(TOKE_ID), STAKE_ONLY_HEX, senderAddress],
  });

  sendTransactions({
    transactions: tx,
  });
};
