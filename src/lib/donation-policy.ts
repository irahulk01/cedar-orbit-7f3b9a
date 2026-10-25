export const CURRENCIES = ['USD', 'EUR', 'GBP', 'AUD', 'CAD'] as const;
export type Currency = typeof CURRENCIES[number];
export const REGION_CODES = 'AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG UM US UY UZ VA VC VE VG VI VN VU WF WS YE YT ZA ZM ZW'.split(' ');
export type DonationInput = { amountMinor: number; currency: Currency; residenceCountry: string; billingCountry: string; outsideNepal: boolean };
export type Validation = {ok: true; value: DonationInput} | {ok: false; status: number; code: string; message: string};
export function validateDonation(input: unknown): Validation {
 if (!input || typeof input !== 'object' || Array.isArray(input)) return {ok:false,status:400,code:'INVALID_INPUT',message:'Please enter your donation details.'};
 const x = input as Record<string,unknown>;
 if (!Number.isSafeInteger(x.amountMinor) || (x.amountMinor as number) < 100 || (x.amountMinor as number) > 1000000) return {ok:false,status:400,code:'INVALID_AMOUNT',message:'Choose an amount between 1 and 10,000 in your selected currency, with up to two decimal places.'};
 if (!CURRENCIES.includes(x.currency as Currency)) return {ok:false,status:400,code:'INVALID_CURRENCY',message:'Choose a supported currency.'};
 for (const field of ['residenceCountry','billingCountry']) if(typeof x[field] !== 'string' || !REGION_CODES.includes(x[field] as string)) return {ok:false,status:400,code:'INVALID_COUNTRY',message:'Choose your country of residence and billing country.'};
 if(x.residenceCountry==='NP' || x.billingCountry==='NP' || x.outsideNepal!==true) return {ok:false,status:403,code:'NEPAL_NOT_ELIGIBLE',message:'This campaign does not accept donations from Nepal. Donors must be outside Nepal, with residence and billing addresses outside Nepal.'};
 return {ok:true,value:x as DonationInput};
}
