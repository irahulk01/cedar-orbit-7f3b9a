import test from 'node:test';
import assert from 'node:assert/strict';
import {validateDonation} from '../src/lib/donation-policy.ts';
const valid={amountMinor:5000,currency:'USD',residenceCountry:'US',billingCountry:'US',outsideNepal:true};
test('allows supported preview input, without implying a successful payment',()=>assert.equal(validateDonation(valid).ok,true));
test('blocks Nepal for residence and billing even if the confirmation is checked',()=>{
 for(const field of ['residenceCountry','billingCountry']) {const r=validateDonation({...valid,[field]:'NP'});assert.equal(r.ok,false);assert.equal(r.status,403);}
});
test('requires explicit confirmation of being outside Nepal',()=>{
 for(const value of [false,undefined,'true',1]) assert.equal(validateDonation({...valid,outsideNepal:value}).ok,false);
});
test('rejects invalid amounts and currencies',()=>{
 for(const value of [0,-100,99,1000001,100.5,'5000',Infinity,NaN]) assert.equal(validateDonation({...valid,amountMinor:value}).ok,false);
 for(const value of ['INR','usd','XXX',null]) assert.equal(validateDonation({...valid,currency:value}).ok,false);
});
test('rejects malformed and unknown country inputs',()=>{
 for(const value of [null,[],{},'US']) assert.equal(validateDonation(value).ok,false);
 for(const value of ['ZZ','us','',123,null]) assert.equal(validateDonation({...valid,billingCountry:value}).ok,false);
});
test('accepts amount bounds in integer minor units for all supported currencies',()=>{
 for(const currency of ['USD','EUR','GBP','CAD','AUD']) for(const amountMinor of [100,1000000]) assert.equal(validateDonation({...valid,currency,amountMinor}).ok,true);
});

test('India is no longer the excluded donor country',()=>{
 assert.equal(validateDonation({...valid,residenceCountry:'IN',billingCountry:'IN'}).ok,true);
});
