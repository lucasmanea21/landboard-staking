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

export const CONTRACT_ADDRESS = "erd1qqqqqqqqqqqqqpgqc2hatzwq0cagshruxgtu8l5par22j36e4dfqvp4f2d";

export const CALLER_ADDRESS = "erd1dl8ucerztz80eqtvs2u35vj5pckle3h3mnuce5fctyzxp4d74dfqwy7ntn";
export const CALLER_ADDRESS_ONLY_HEX = convertToHex(CONTRACT_ADDRESS);
export const CALLER_ADDRESS_HEX = "0x" + CALLER_ADDRESS_ONLY_HEX;

export const TOKEN_ID = "SVEN-4b35b0";
export const TOKEN_ID_ONLY_HEX = convertToHex(TOKEN_ID);
export const TOKEN_ID_HEX = "0x" + TOKEN_ID_ONLY_HEX;
export const REFERRRAL_ACTIVATION_AMOUNT = 100000000000000000000;
export const APY_INCREASE_PER_REFERRAL = 50;
export const MAX_APY_INCREASE_BY_REFERRAL = 1000;

export const STAKE = "stake";
export const STAKE_ONLY_HEX = convertToHex(STAKE);
