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

const filters = ["4K Wallpaper","Anime","Desktop","Wallpaper","Nature","Laptop Wallpaper","Background","Landscape"];
const image = (id:string, full=false) => `/wallpaper/img/wallpapers/${id}-${full?"full":"card"}.webp`;

function Icon({name}:{name:string}) {
  const common={width:18,height:18,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:1.7,strokeLinecap:"round" as const,strokeLinejoin:"round" as const, "aria-hidden":true as const};
  const paths:Record<string,React.ReactNode>={
    grid:<><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    image:<><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></>,
    spark:<><path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z"/><path d="m19 14 1.2 2.8L23 18l-2.8 1.2L19 22l-1.2-2.8L15 18l2.8-1.2L19 14Z"/></>,
    bookmark:<><path d="M6 4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21l-6-4-6 4V4.5Z"/></>,
    download:<><path d="M12 3v12m-5-5 5 5 5-5"/><path d="M5 18v3h14v-3"/></>,
    user:<><circle cx="12" cy="8" r="3.5"/><path d="M4 21c.8-4 3.5-6 8-6s7.2 2 8 6"/></>,
    menu:<><path d="M4 6h16M4 12h16M4 18h16"/></>,
    search:<><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.5 4.5"/></>,
    arrow:<><path d="M5 12h14m-6-6 6 6-6 6"/></>,
    close:<><path d="m6 6 12 12M18 6 6 18"/></>
  };
  return <svg {...common}>{paths[name]||paths.grid}</svg>;
}

export default function Home() {
  const [query,setQuery]=useState("");
  const [active,setActive]=useState("All");
  const [kind,setKind]=useState("Photos");
  const [orientation,setOrientation]=useState("All");
  const [sort,setSort]=useState("Relevance");
  const [visible,setVisible]=useState(6);
  const [selected,setSelected]=useState<Artwork>(artworks[0]);
  const [preview,setPreview]=useState<Artwork|null>(null);
  const [saved,setSaved]=useState<string[]>([]);
  const [mobileMenu,setMobileMenu]=useState(false);

  const filtered=useMemo(()=>{
    let list=artworks.filter(a=>{
      const q=query.trim().toLowerCase();
      const matchesQuery=!q||[a.title,a.category,a.description,...a.tags].join(" ").toLowerCase().includes(q);
      const matchesKind=kind==="Photos"||a.kind==="Illustration";
      const matchesFilter=active==="All"||a.tags.some(t=>t.toLowerCase()===active.toLowerCase().replace(" wallpaper",""))||a.category.toLowerCase()===active.toLowerCase();
      const isLandscape=a.ratio==="5 / 4";
      const matchesOrientation=orientation==="All"||(orientation==="Landscape"&&isLandscape)||(orientation==="Portrait"&&!isLandscape);
      return matchesQuery&&matchesKind&&matchesFilter&&matchesOrientation;
    });
    if(sort==="A–Z") list=[...list].sort((a,b)=>a.title.localeCompare(b.title));
    if(sort==="Newest") list=[...list].reverse();
    return list;
  },[query,active,kind,orientation,sort]);

  function download(item:Artwork){
    const a=document.createElement("a");a.href=image(item.id,true);a.download=`soullit-design-${item.id}.webp`;document.body.appendChild(a);a.click();a.remove();
  }
  function toggleSave(id:string){setSaved(current=>current.includes(id)?current.filter(x=>x!==id):[...current,id]);}

  return <main className="discover">
    <aside className="rail" aria-label="Quick navigation">
      <a className="rail-logo" href="#top" aria-label="Soullit Design home"><span>SD</span></a>
      <button className="rail-active" title="Discover" onClick={()=>{setKind("Photos");setActive("All");}}><Icon name="grid"/></button>
      <button title="Illustrations" onClick={()=>setKind("Illustrations")}><Icon name="image"/></button>
      <a href="#collections" title="Collections"><Icon name="spark"/></a>
      <button title="Saved artwork" onClick={()=>setQuery(saved.map(id=>artworks.find(a=>a.id===id)?.title||"").join(" "))}><Icon name="bookmark"/></button>
      <span className="rail-spacer"/>
      <a href="#about" title="About Soullit Design"><Icon name="user"/></a>
      <button title="More filters" onClick={()=>setMobileMenu(!mobileMenu)}><Icon name="menu"/></button>
    </aside>

    <div className="workspace" id="top">
      <header className="topbar">
        <a className="wordmark" href="#top"><strong>SOULLIT<span> DESIGN</span></strong><small>WALLPAPERS & DIGITAL ART</small></a>
        <label className="searchbox"><Icon name="search"/><input value={query} onChange={e=>{setQuery(e.target.value);setVisible(6);}} placeholder="Search wallpapers, moods, colours..." aria-label="Search wallpapers"/>{query&&<button onClick={()=>setQuery("")} aria-label="Clear search"><Icon name="close"/></button>}<kbd>⌘ K</kbd></label>
        <div className="top-actions"><a href="#about">About</a><a className="submit-link" href="https://github.com/soullitdesign/wallpaper/issues/new?template=wallpaper-request.yml" target="_blank" rel="noreferrer">Request a wallpaper <Icon name="arrow"/></a></div>
      </header>

      <div className="mobile-brand"><strong>SOULLIT DESIGN</strong><button onClick={()=>setMobileMenu(!mobileMenu)}><Icon name="menu"/></button></div>
      <section className="browse-head">
        <div className="tabs"><button className={kind==="Photos"?"selected":""} onClick={()=>{setKind("Photos");setVisible(6);}}> <Icon name="image"/> Wallpapers <sup>08</sup></button><button className={kind==="Illustrations"?"selected":""} onClick={()=>{setKind("Illustrations");setVisible(6);}}> <Icon name="spark"/> Illustrations <sup>04</sup></button><button onClick={()=>setActive("All")}>Collections⌄</button></div>
        <div className="browse-tools"><label>License <select aria-label="License"><option>All artwork</option><option>Personal use</option></select></label><label>Orientation <select value={orientation} onChange={e=>setOrientation(e.target.value)} aria-label="Orientation"><option>All</option><option>Landscape</option><option>Portrait</option></select></label><label>Sort by <select value={sort} onChange={e=>setSort(e.target.value)} aria-label="Sort by"><option>Relevance</option><option>Newest</option><option>A–Z</option></select></label></div>
      </section>

      <section className="title-row" id="collections"><div><p className="eyebrow">THE SOULLIT DESIGN WALLPAPER LIBRARY</p><h1>{query?<>Search results for <em>“{query}”</em></>:kind==="Photos"?"Desktop wallpaper":"Illustrations"}</h1><p className="result-count">{filtered.length} thoughtfully made artworks <span>·</span> A little inspiration for your screen</p></div><div className="title-note">A CURATED WORLD<br/>BY SOULLIT DESIGN <span>✳</span></div></section>

      <nav className="chips" aria-label="Wallpaper categories">{filters.map(f=><button key={f} className={active===f?"chip-active":""} onClick={()=>{setActive(active===f?"All":f);setVisible(6);}}>{f}</button>)}<button className="chip-next" onClick={()=>setActive("All")} aria-label="Clear category filters">×</button></nav>

      <div className="content-layout">
        <section className="gallery" aria-label="Wallpaper gallery">
          {filtered.length===0?<div className="empty"><span>✳</span><h2>Nothing here just yet.</h2><p>Try another search or clear the filters to wander again.</p><button onClick={()=>{setQuery("");setActive("All");setOrientation("All");setKind("Photos");}}>Clear all filters</button></div>:
            <div className="masonry">{filtered.slice(0,visible).map((item,index)=><article className={selected.id===item.id?"tile tile-selected":"tile"} key={item.id}>
              <button className="tile-image" onClick={()=>{setSelected(item);setPreview(item);}} aria-label={`Preview ${item.title}`}><img src={image(item.id)} alt={item.title} loading={index<3?"eager":"lazy"}/><span className="tile-overlay">Preview <Icon name="arrow"/></span></button>
              <div className="tile-meta"><button onClick={()=>{setSelected(item);setPreview(item);}}><strong>{item.title}</strong><small>{item.category} · Soullit Design</small></button><button className={saved.includes(item.id)?"save saved":"save"} onClick={()=>toggleSave(item.id)} aria-label={saved.includes(item.id)?"Remove saved artwork":"Save artwork"}><Icon name="bookmark"/></button></div>
            </article>)}</div>
          }
          {filtered.length>visible&&<button className="load-more" onClick={()=>setVisible(v=>v+4)}>Load more artwork <Icon name="arrow"/></button>}
          {filtered.length>0&&filtered.length<=visible&&<p className="end-note">YOU’VE REACHED THE END OF THIS COLLECTION · {filtered.length.toString().padStart(2,"0")} / 08</p>}
        </section>

        <aside className="detail-panel">
          <div className="detail-preview"><img src={image(selected.id)} alt={selected.title}/><button onClick={()=>setPreview(selected)}>View full artwork <Icon name="arrow"/></button></div>
          <div className="detail-info"><div className="detail-kicker">FEATURED WALLPAPER <span>✳</span></div><h2>{selected.title}</h2><p>{selected.description}</p><div className="detail-tags">{selected.tags.slice(0,3).map(t=><span key={t}>{t}</span>)}</div><button className="download-button" onClick={()=>download(selected)}><Icon name="download"/> Download wallpaper</button><button className="save-line" onClick={()=>toggleSave(selected.id)}><Icon name="bookmark"/>{saved.includes(selected.id)?"Saved to your collection":"Save for later"}</button></div>
          <div className="related"><div className="related-head"><strong>Related illustrations</strong><button onClick={()=>{setKind("Illustrations");setActive("All");}}>See all <Icon name="arrow"/></button></div><div className="related-grid">{artworks.filter(a=>a.id!==selected.id).slice(0,4).map(a=><button key={a.id} onClick={()=>setSelected(a)}><img src={image(a.id)} alt={a.title}/></button>)}</div></div>
          <div className="panel-note"><span>✳</span><p>Make your screen feel a little more like <em>you.</em></p><small>ARTWORK WITH A SOULLIT.</small></div>
        </aside>
      </div>

      <footer className="site-footer" id="about"><div><strong>SOULLIT DESIGN</strong><span>Original wallpapers & digital art, made with feeling.</span></div><nav><a className="footer-request" href="https://github.com/soullitdesign/wallpaper/issues/new?template=wallpaper-request.yml" target="_blank" rel="noreferrer">Request a wallpaper ↗</a><a href="#top">Back to top ↑</a></nav><small>© 2026 SOULLIT DESIGN · MADE FOR YOUR EVERYDAY</small></footer>
    </div>

    {preview&&<div className="preview-modal" role="dialog" aria-modal="true" aria-label={preview.title} onClick={()=>setPreview(null)}><button className="modal-close" onClick={()=>setPreview(null)} aria-label="Close preview"><Icon name="close"/></button><div className="preview-card" onClick={e=>e.stopPropagation()}><img src={image(preview.id,true)} alt={preview.title}/><div><small>{preview.category.toUpperCase()} · SOULLIT DESIGN</small><h2>{preview.title}</h2><p>{preview.description}</p><button className="download-button" onClick={()=>download(preview)}><Icon name="download"/> Download wallpaper</button></div></div></div>}
  </main>;
}
