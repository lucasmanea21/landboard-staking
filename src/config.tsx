export const dAppName = "LandBoard Staking";

export const CALLER_ADDRESS =
  "erd1dl8ucerztz80eqtvs2u35vj5pckle3h3mnuce5fctyzxp4d74dfqwy7ntn";
export const CALLER_ADDRESS_HEX =
  "0x$(erdpy wallet bech32 --decode ${CALLER_ADDRESS})";
export const CALLER_ADDRESS_ONLY_HEX =
  "$(erdpy wallet bech32 --decode ${CALLER_ADDRESS})";

export const TOKEN_ID = "SVEN-4b35b0";
export const TOKEN_ID_HEX = "0x$(echo -n ${TOKEN_ID} | xxd -p -u | tr -d '\n')";
export const TOKEN_ID_ONLY_HEX =
  "$(echo -n ${TOKEN_ID} | xxd -p -u | tr -d '\n')";
export const REFERRRAL_ACTIVATION_AMOUNT = 100000000000000000000;
export const APY_INCREASE_PER_REFERRAL = 50;
export const MAX_APY_INCREASE_BY_REFERRAL = 1000;

export const STAKE = "stake";
export const STAKE_ONLY_HEX = "$(echo -n ${STAKE} | xxd -p -u | tr -d '\n')";
