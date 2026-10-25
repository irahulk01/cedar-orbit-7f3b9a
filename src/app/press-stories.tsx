import Image from 'next/image';
import Link from 'next/link';
import {pressStories} from '@/lib/press-stories';
export default function PressStories(){return <section id="press" className="press-section section-pad" aria-labelledby="press-title">
 <div className="press-intro"><div><span className="eyebrow">THE STORIES THAT STAY WITH US</span><h2 id="press-title">More than headlines.<br/><em>Lives, interrupted.</em></h2></div><p>Homes. Schools. The familiar streets of everyday life. Independent reporting brings the human cost of Nepal’s floods into focus.</p></div>
 <div className="press-masthead"><span>THE NEPAL PRESS FILE</span><span>Selected coverage · 2024 & 2026</span></div>
 <p className="press-date-note">A dated press archive, not live updates. Figures in headlines reflect the reports at publication and must not be read as current totals.</p>
 <div className="press-grid">{pressStories.map((story,index)=><article key={story.id} className={`press-clipping ${index<2?'press-lead':''}`}>
  <div className="clipping-top"><span>{story.publisher}</span><time dateTime={story.isoDate}>{story.date}</time></div>
  <a className="press-photo-link" href={story.href} target="_blank" rel="noopener noreferrer" aria-label={`Read ${story.headline} on ${story.publisher}`}><Image src={`/images/press/${story.id}.webp`} alt={story.alt} width={story.width} height={story.height} sizes="(max-width: 700px) 90vw, (max-width: 1000px) 45vw, 40vw"/><span className="press-image-label">{story.kind}</span></a>
  <p className="press-photo-credit">{story.credit}</p>
  <h3><a href={story.href} target="_blank" rel="noopener noreferrer">{story.headline}</a></h3><p className="press-context">{story.context}</p><a className="press-read" href={story.href} target="_blank" rel="noopener noreferrer">Read the original report <span aria-hidden="true">↗</span></a>
 </article>)}</div>
 <aside className="photo-archive" aria-label="Additional photo reference"><a href="https://www.gettyimages.com/photos/heavy-flooded-in-nepal" target="_blank" rel="noopener noreferrer"><Image src="/images/press/getty.webp" alt="Getty Images preview showing a truck amid flood debris; original Getty watermark visible" width={547} height={365} sizes="(max-width: 700px) 85vw, 240px"/></a><div><span className="eyebrow">PHOTO ARCHIVE / GETTY IMAGES</span><h3>The aftermath, documented.</h3><p>Explore further photojournalism from Nepal. This is the stock-image preview you shared; its original watermark is retained.</p><p className="press-photo-credit">Ezra Acayan / Getty Images · Date not independently verified</p><a className="text-link" href="https://www.gettyimages.com/photos/heavy-flooded-in-nepal" target="_blank" rel="noopener noreferrer">View the photo collection ↗</a></div></aside>
 <div className="press-footnote"><p>Image previews supplied by the campaign owner, stored locally and compressed for this design. Photography remains with its respective rights holders; no publisher endorses this campaign. Public reuse permissions have not been established.</p><Link href="/accountability#press-media">Sources & image notes ↗</Link></div>
 </section>}
