export const dAppName = "LandBoard Staking";

const convertToHex = (str: string) => {
	var hex, i;

	var result = "";
	for (i = 0; i < str.length; i++) {
		hex = str.charCodeAt(i).toString(16);
		result += ("000" + hex).slice(-4);
	}

	return result;
};

export const CONTRACT_ADDRESS = "erd1qqqqqqqqqqqqqpgqg5ezkspemx2eelkyc2aj82fmua7t7c564dfqqzre7t";

export const TOKEN_ID = "SVEN-4b35b0";
export const TOKEN_ID_ONLY_HEX = convertToHex(TOKEN_ID);
export const TOKEN_ID_HEX = "0x" + TOKEN_ID_ONLY_HEX;
export const REFERRRAL_ACTIVATION_AMOUNT = 100000000000000000000;
export const APY_INCREASE_PER_REFERRAL = 50;
export const MAX_APY_INCREASE_BY_REFERRAL = 1000;

export const STAKE = "stake";
export const STAKE_ONLY_HEX = convertToHex(STAKE);

export const CONTRACT_ABI_URL = "/assets/abi/landboard-node-stake.abi.json";
export const CONTRACT_NAME = "LandboardStaking";
export const TIMEOUT = 6000;
