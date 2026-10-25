import { NextResponse } from 'next/server';
import { validateDonation } from '@/lib/donation-policy';
const headers = {'Cache-Control':'no-store'};
export async function POST(request: Request) {
 const origin = request.headers.get('origin');
 const expectedOrigin = process.env.APP_URL ? new URL(process.env.APP_URL).origin : `${new URL(request.url).protocol}//${request.headers.get('host')}`;
 if(origin && origin!==expectedOrigin) return NextResponse.json({code:'INVALID_ORIGIN',message:'Use the donation form on this website.'},{status:403,headers});
 if(!request.headers.get('content-type')?.includes('application/json')) return NextResponse.json({code:'INVALID_CONTENT_TYPE',message:'JSON is required.'},{status:415,headers});
 let input: unknown;
 try {
  const reader=request.body?.getReader();
  let body=''; let total=0; const decoder=new TextDecoder();
  if(reader) {while(true) {const chunk=await reader.read(); if(chunk.done) break; total+=chunk.value.byteLength; if(total>4096){await reader.cancel();return NextResponse.json({code:'REQUEST_TOO_LARGE',message:'Request is too large.'},{status:413,headers});} body+=decoder.decode(chunk.value,{stream:true});} body+=decoder.decode();}
  input=JSON.parse(body);
 } catch {return NextResponse.json({code:'INVALID_JSON',message:'Invalid request.'},{status:400,headers});}
 const result=validateDonation(input);
 if(!result.ok) return NextResponse.json({code:result.code,message:result.message},{status:result.status,headers});
 // Deliberately unconditional: environment variables alone must never enable fundraising.
 // A verified recipient, approved provider and provider-enforced country controls are required.
 return NextResponse.json({code:'DONATIONS_NOT_ENABLED',message:'Your details pass the preview checks. Donations are not open: recipient verification, banking approval, and payment-provider setup are pending. No money has been collected.'},{status:503,headers});
}
