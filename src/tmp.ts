import local from './handmade_naive_local.json'

export const ENV = "LOCAL"
export const ISSUER_LOCAL = local.issuer;
export const ISSUER_DEVNET = [74, 209, 248, 229, 72, 248, 225, 178, 69, 24, 107, 20, 91, 33, 18, 138, 115, 249, 31, 109, 149, 38, 115, 244, 170, 168, 84, 164, 80, 30, 115, 159, 135, 216, 154, 13, 134, 80, 127, 10, 107, 136, 159, 181, 153, 115, 76, 17, 162, 121, 175, 176, 221, 131, 215, 1, 70, 150, 188, 255, 198, 15, 136, 2];


export const PRIVATE_KEY = [
  168, 211, 226, 112, 155, 144, 84, 189, 91, 180, 27, 154, 232, 214, 171, 34,
  170, 170, 129, 92, 121, 182, 191, 46, 214, 251, 216, 56, 75, 188, 172, 111,
  183, 94, 11, 97, 242, 122, 154, 242, 188, 154, 126, 25, 182, 99, 199, 61,
  219, 36, 179, 98, 237, 169, 19, 188, 167, 169, 130, 113, 121, 123, 123, 63,
];

export const USER_KEY = local.user1_info.user1
export const USER_WRAPPED_ACC = local.user1_info.wrapped_account
export const USER_1_AUTH = "BycmRBUHnaTg3JtR69S99JgzYbwUb2u5LJoziXxXzQ96"


export const MINT_PUB = local.mint_info.mint

export const WRAPPER = local.wrapper.wrapper_pda