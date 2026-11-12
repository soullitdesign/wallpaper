"use client";

import { useMemo, useState } from "react";

type Artwork = {
  id: string; title: string; category: string; description: string;
  tags: string[]; ratio: string; kind: "Wallpaper" | "Illustration";
};

const artworks: Artwork[] = [
  { id:"the-last-waltz", title:"The Last Waltz", category:"Romance", description:"A dance beneath a thousand quiet stars.", tags:["Wallpaper","Desktop","Dreamy"], ratio:"4 / 5", kind:"Wallpaper" },
  { id:"blue-hour", title:"Blue Hour", category:"Stillness", description:"Where the city learns to breathe.", tags:["4K","Desktop","Landscape"], ratio:"5 / 4", kind:"Wallpaper" },
  { id:"neon-promenade", title:"Neon Promenade", category:"After dark", description:"A little electric, a little nostalgic.", tags:["Anime","Desktop","Night"], ratio:"4 / 5", kind:"Illustration" },
  { id:"paper-moon", title:"Paper Moon", category:"Dreamscape", description:"A softer place to disappear.", tags:["Wallpaper","Pastel","Dreamy"], ratio:"3 / 4", kind:"Illustration" },
  { id:"rooftop-reverie", title:"Rooftop Reverie", category:"Stillness", description:"Somewhere between here and the skyline.", tags:["4K","Landscape","Nature"], ratio:"5 / 4", kind:"Wallpaper" },
  { id:"sunflowers-at-midnight", title:"Sunflowers at Midnight", category:"Dreamscape", description:"For the ones who bloom after dark.", tags:["Nature","Wallpaper","Desktop"], ratio:"4 / 5", kind:"Illustration" },
  { id:"the-last-train", title:"The Last Train", category:"After dark", description:"The beautiful things between destinations.", tags:["Anime","Landscape","Night"], ratio:"5 / 4", kind:"Wallpaper" },
  { id:"candlelight-waltz", title:"Candlelight Waltz", category:"Romance", description:"A room full of almost-forgotten warmth.", tags:["Pastel","Wallpaper","Dreamy"], ratio:"4 / 5", kind:"Illustration" }
];

const categories = ["All","Nature","Dreamy","Landscape","Anime","Night","Romance"];
const image = (id:string, full=false) => "/wallpaper/img/wallpapers/" + id + "-" + (full ? "full" : "card") + ".webp";

function Icon({name}:{name:string}) {
  const common={width:17,height:17,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:1.7,strokeLinecap:"round" as const,strokeLinejoin:"round" as const, "aria-hidden":true as const};
  const paths:Record<string,React.ReactNode>={
    search:<><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.5 4.5"/></>,
    arrow:<><path d="M5 12h14m-6-6 6 6-6 6"/></>,
    download:<><path d="M12 3v12m-5-5 5 5 5-5"/><path d="M5 18v3h14v-3"/></>,
    bookmark:<><path d="M6 4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21l-6-4-6 4V4.5Z"/></>,
    close:<><path d="m6 6 12 12M18 6 6 18"/></>,
    plus:<><path d="M12 5v14M5 12h14"/></>
  };
  return <svg {...common}>{paths[name]||paths.arrow}</svg>;
}

export default function Home() {
  const [query,setQuery]=useState("");
  const [active,setActive]=useState("All");
  const [kind,setKind]=useState("All");
  const [sort,setSort]=useState("Featured");
  const [visible,setVisible]=useState(8);
  const [selected,setSelected]=useState<Artwork>(artworks[0]);
  const [preview,setPreview]=useState<Artwork|null>(null);
  const [saved,setSaved]=useState<string[]>([]);
  const filtered=useMemo(()=>{
    let list=artworks.filter(a=>{
      const q=query.trim().toLowerCase();
      const search=!q||[a.title,a.category,a.description,...a.tags].join(" ").toLowerCase().includes(q);
      const type=kind==="All"||(kind==="Wallpapers"&&a.kind==="Wallpaper")||(kind==="Illustrations"&&a.kind==="Illustration");
      return search&&type&&(active==="All"||a.tags.some(t=>t.toLowerCase()===active.toLowerCase())||a.category.toLowerCase()===active.toLowerCase());
    });
    if(sort==="A–Z") list=[...list].sort((a,b)=>a.title.localeCompare(b.title));
    if(sort==="Newest") list=[...list].reverse();
    return list;
  },[query,active,kind,sort]);
  function download(item:Artwork){
    const a=document.createElement("a");a.href=image(item.id,true);a.download="soullit-design-"+item.id+".webp";document.body.appendChild(a);a.click();a.remove();
  }
  function toggleSave(id:string){setSaved(current=>current.includes(id)?current.filter(x=>x!==id):[...current,id]);}
  return <main className="site-shell" id="top">
    <header className="masthead">
      <a className="brand" href="#top" aria-label="Soullit Design home"><span className="brand-mark">S.</span><span className="brand-name">SOULLIT DESIGN<small>WALLPAPER ARCHIVE</small></span></a>
      <div className="header-center"><span>AN INDEPENDENT ART & WALLPAPER COLLECTION</span></div>
      <a className="request-link" href="https://github.com/soullitdesign/wallpaper/issues/new?template=wallpaper-request.yml" target="_blank" rel="noreferrer"><Icon name="plus"/> Request artwork</a>
    </header>

    <section className="intro">
      <div className="intro-copy"><p className="overline">THE DIGITAL CANVAS / VOL. 01</p><h1>Find your<br/><em>point of view.</em></h1><p className="intro-text">A considered collection of wallpapers and digital art, made to give your everyday screen a little more character.</p></div>
      <div className="intro-side"><span className="intro-index">01 — 08</span><span className="intro-rule"></span><p>CURATED VISUALS<br/>FOR YOUR EVERYDAY</p><a href="#gallery">EXPLORE THE ARCHIVE <Icon name="arrow"/></a></div>
      <div className="intro-art"><img src={image("blue-hour")} alt="Blue Hour atmospheric landscape wallpaper"/><span>FEATURED / 001</span></div>
    </section>

    <section className="archive" id="gallery">
      <div className="archive-heading"><div><p className="overline">THE COLLECTION</p><h2>Wallpaper archive<span>({filtered.length.toString().padStart(2,"0")})</span></h2></div><div className="archive-search"><Icon name="search"/><input value={query} onChange={e=>{setQuery(e.target.value);setVisible(8);}} placeholder="Search the archive" aria-label="Search the archive"/>{query&&<button onClick={()=>setQuery("")} aria-label="Clear search"><Icon name="close"/></button>}</div></div>
      <div className="archive-controls"><div className="filter-list">{categories.map(c=><button key={c} className={active===c?"active":""} onClick={()=>{setActive(c);setVisible(8);}}>{c}</button>)}</div><div className="sort-controls"><button className={kind==="All"?"active":""} onClick={()=>setKind("All")}>All work</button><button className={kind==="Wallpapers"?"active":""} onClick={()=>setKind("Wallpapers")}>Wallpapers</button><button className={kind==="Illustrations"?"active":""} onClick={()=>setKind("Illustrations")}>Illustrations</button><select value={sort} onChange={e=>setSort(e.target.value)} aria-label="Sort artwork"><option>Featured</option><option>Newest</option><option>A–Z</option></select></div></div>
      {filtered.length===0?<div className="empty-state"><p>NO RESULTS FOUND</p><h3>Nothing in this frame.</h3><button onClick={()=>{setQuery("");setActive("All");setKind("All");}}>Reset filters <Icon name="arrow"/></button></div>:
      <div className="art-grid">{filtered.slice(0,visible).map((item,index)=><article className="art-card" key={item.id}><button className="art-image" onClick={()=>{setSelected(item);setPreview(item);}} aria-label={"Open "+item.title}><img src={image(item.id)} alt={item.title} loading={index<4?"eager":"lazy"}/><span className="view-label">VIEW ARTWORK <Icon name="arrow"/></span></button><div className="art-caption"><button className="art-title" onClick={()=>{setSelected(item);setPreview(item);}}><span>{item.title}</span><small>{item.category} / {item.kind}</small></button><button className={saved.includes(item.id)?"save-button is-saved":"save-button"} onClick={()=>toggleSave(item.id)} aria-label={saved.includes(item.id)?"Unsave artwork":"Save artwork"}><Icon name="bookmark"/></button></div></article>)}</div>}
      {filtered.length>visible&&<button className="more-button" onClick={()=>setVisible(v=>v+4)}>LOAD MORE <Icon name="plus"/></button>}
    </section>

    <section className="request-banner"><div><p className="overline">HAVE SOMETHING IN MIND?</p><h2>Your screen.<br/><em>Your atmosphere.</em></h2></div><a href="https://github.com/soullitdesign/wallpaper/issues/new?template=wallpaper-request.yml" target="_blank" rel="noreferrer">REQUEST A WALLPAPER <Icon name="arrow"/></a></section>

    <footer className="footer"><a className="footer-brand" href="#top">SOULLIT DESIGN<span>© 2026</span></a><p>Made with intent. Shared with you.</p><a href="#top">BACK TO TOP ↑</a></footer>

    {preview&&<div className="lightbox" role="dialog" aria-modal="true" aria-label={preview.title} onClick={()=>setPreview(null)}><button className="lightbox-close" onClick={()=>setPreview(null)} aria-label="Close preview"><Icon name="close"/></button><div className="lightbox-content" onClick={e=>e.stopPropagation()}><img src={image(preview.id,true)} alt={preview.title}/><div className="lightbox-info"><p className="overline">{preview.category} / SOULLIT DESIGN</p><h2>{preview.title}</h2><p>{preview.description}</p><button onClick={()=>download(preview)}><Icon name="download"/> DOWNLOAD WALLPAPER</button></div></div></div>}
  </main>;
}
