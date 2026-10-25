'use client';
import { useState } from 'react';
import { CURRENCIES, validateDonation, type Currency } from '@/lib/donation-policy';
import countries from '@/lib/countries.json';
export default function DonationForm() {
 const [amount,setAmount]=useState('50'); const [currency,setCurrency]=useState<Currency>('USD');
 const [residence,setResidence]=useState(''); const [billing,setBilling]=useState('');
 const [outside,setOutside]=useState(false); const [message,setMessage]=useState(''); const [busy,setBusy]=useState(false);
 const blocked=residence==='NP'||billing==='NP';
 const symbol=new Intl.NumberFormat('en',{style:'currency',currency,maximumFractionDigits:0});
 async function submit(event:React.FormEvent<HTMLFormElement>) {
  event.preventDefault(); setMessage('');
  if(!/^\d+(\.\d{1,2})?$/.test(amount)){setMessage('Enter an amount with up to two decimal places.');return;}
  const input={amountMinor:Math.round(Number(amount)*100),currency,residenceCountry:residence,billingCountry:billing,outsideNepal:outside};
  const validation=validateDonation(input); if(!validation.ok){setMessage(validation.message);return;}
  setBusy(true);
  try {const response=await fetch('/api/donations',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(input)});const data=await response.json();setMessage(data.message || 'Donations are not open yet.');}
  catch {setMessage('Unable to check the preview right now. Please try again.');} finally {setBusy(false);}
 }
 return <form onSubmit={submit} className="donation-form">
  <div className="form-heading"><span className="eyebrow">YOUR CONTRIBUTION</span><span className="status-pill">Preview only</span></div>
  <div className="field-row"><label htmlFor="currency">Currency</label><select id="currency" value={currency} onChange={e=>{setCurrency(e.target.value as Currency);setMessage('');}}>{CURRENCIES.map(c=><option key={c}>{c}</option>)}</select></div>
  <div className="amounts" aria-label="Suggested donation amounts">{['25','50','100','250'].map(n=><button type="button" key={n} aria-pressed={amount===n} className={amount===n?'selected':''} onClick={()=>{setAmount(n);setMessage('');}}>{symbol.format(Number(n))}</button>)}</div>
  <label htmlFor="amount">Or choose your own amount</label><div className="amount-input"><span>{currency}</span><input id="amount" inputMode="decimal" type="text" value={amount} required maxLength={9} onChange={e=>{setAmount(e.target.value);setMessage('');}} /></div>
  <div className="country-fields"><div><label htmlFor="residence">Country of residence</label><select id="residence" value={residence} required onChange={e=>{setResidence(e.target.value);setMessage('');}}><option value="">Select country</option>{countries.map(c=><option key={c.code} value={c.code}>{c.name}</option>)}</select></div><div><label htmlFor="billing">Billing country</label><select id="billing" value={billing} required onChange={e=>{setBilling(e.target.value);setMessage('');}}><option value="">Select country</option>{countries.map(c=><option key={c.code} value={c.code}>{c.name}</option>)}</select></div></div>
  {blocked?<p className="notice error" role="alert">Donations from Nepal are not accepted. This includes a Nepali residence or billing address.</p>:<label className="checkbox"><input type="checkbox" checked={outside} required onChange={e=>setOutside(e.target.checked)}/><span>I am currently outside Nepal and my residence and billing address are outside Nepal.</span></label>}
  <button className="button full" type="submit" disabled={busy||blocked}>{busy?'Checking…':'Preview donation →'}</button>
  <p className="form-note">No payment will be taken. No donor account or card details are needed for this preview.</p>
  <div aria-live="polite" aria-atomic="true">{message&&<p className="notice">{message}</p>}</div>
 </form>;
}
