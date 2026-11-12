"use client";

import { useMemo, useState } from "react";

type Artwork = {
  id: string; title: string; category: string; description: string;
  tags: string[]; kind: "Wallpaper" | "Illustration"; number: string;
};

const artworks: Artwork[] = [
  { id:"the-last-waltz", title:"The Last Waltz", category:"Romance", description:"A quiet dance beneath a thousand distant stars.", tags:["Wallpaper","Desktop","Dreamy"], kind:"Wallpaper", number:"01" },
  { id:"blue-hour", title:"Blue Hour", category:"Stillness", description:"The city slows down, and the sky has the final word.", tags:["4K","Desktop","Landscape"], kind:"Wallpaper", number:"02" },
  { id:"neon-promenade", title:"Neon Promenade", category:"After dark", description:"A little electric, a little nostalgic. A night worth remembering.", tags:["Anime","Desktop","Night"], kind:"Illustration", number:"03" },
  { id:"paper-moon", title:"Paper Moon", category:"Dreamscape", description:"A softer place to disappear for a while.", tags:["Wallpaper","Pastel","Dreamy"], kind:"Illustration", number:"04" },
  { id:"rooftop-reverie", title:"Rooftop Reverie", category:"Stillness", description:"Somewhere between the skyline and a slower state of mind.", tags:["4K","Landscape","Nature"], kind:"Wallpaper", number:"05" },
  { id:"sunflowers-at-midnight", title:"Sunflowers at Midnight", category:"Dreamscape", description:"For the ones who find a way to bloom after dark.", tags:["Nature","Wallpaper","Desktop"], kind:"Illustration", number:"06" },
  { id:"the-last-train", title:"The Last Train", category:"After dark", description:"A small reminder that the journey can be the beautiful part.", tags:["Anime","Landscape","Night"], kind:"Wallpaper", number:"07" },
  { id:"candlelight-waltz", title:"Candlelight Waltz", category:"Romance", description:"A room full of warmth, memory and almost-forgotten moments.", tags:["Pastel","Wallpaper","Dreamy"], kind:"Illustration", number:"08" }
];

const categories = ["All","Nature","Dreamy","Landscape","Anime","Night","Romance"];
const image = (id: string, full = false) => "/wallpaper/img/wallpapers/" + id + "-" + (full ? "full" : "card") + ".webp";

function Arrow() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" /></svg>; }
function Mark() { return <span className="sd-mark" aria-hidden="true">S<span>.</span></span>; }

export default function Home() {
  const [query,setQuery] = useState("");
  const [active,setActive] = useState("All");
  const [kind,setKind] = useState("All");
  const [sort,setSort] = useState("Featured");
  const [visible,setVisible] = useState(8);
  const [preview,setPreview] = useState<Artwork|null>(null);
  const [saved,setSaved] = useState<string[]>([]);
  const filtered = useMemo(() => {
    let list = artworks.filter(a => {
      const q = query.trim().toLowerCase();
      const matches = !q || [a.title,a.category,a.description,...a.tags].join(" ").toLowerCase().includes(q);
      const type = kind === "All" || (kind === "Wallpapers" && a.kind === "Wallpaper") || (kind === "Illustrations" && a.kind === "Illustration");
      return matches && type && (active === "All" || a.tags.some(t => t.toLowerCase() === active.toLowerCase()) || a.category.toLowerCase() === active.toLowerCase());
    });
    if (sort === "A–Z") list = [...list].sort((a,b) => a.title.localeCompare(b.title));
    if (sort === "Newest") list = [...list].reverse();
    return list;
  },[query,active,kind,sort]);

  function download(item: Artwork) {
    const link = document.createElement("a");
    link.href = image(item.id,true);
    link.download = "soullit-design-" + item.id + ".webp";
    document.body.appendChild(link); link.click(); link.remove();
  }
  function toggleSave(id: string) { setSaved(current => current.includes(id) ? current.filter(x => x !== id) : [...current,id]); }

  return <main className="studio" id="top">
    <header className="topbar">
      <a className="identity" href="#top" aria-label="Soullit Design home"><Mark/><span>SOULLIT DESIGN<small>INDEPENDENT ART STUDIO</small></span></a>
      <nav className="main-nav" aria-label="Main navigation">
        <a href="#collection">collection</a><a href="#approach">the approach</a><a href="#about">about</a>
      </nav>
      <a className="contact-link" href="https://github.com/soullitdesign/wallpaper/issues/new?template=wallpaper-request.yml" target="_blank" rel="noreferrer">request a wallpaper <Arrow/></a>
    </header>

    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow"><span>INDEPENDENT DIGITAL ART</span><i/> EST. 2026</p>
        <h1>Make room<br/>for <em>feeling.</em></h1>
        <p className="hero-intro">A growing collection of digital wallpapers and visual stories, created to make the everyday feel a little less ordinary.</p>
        <div className="hero-actions"><a className="button-light" href="#collection">Explore the collection <Arrow/></a><span className="hero-note">ORIGINAL ARTWORKS<br/>MADE TO LIVE ON YOUR SCREEN</span></div>
      </div>
      <div className="hero-visual">
        <img src={image("the-last-waltz")} alt="The Last Waltz — featured Soullit Design artwork"/>
        <div className="hero-image-label"><span>FEATURED ARTWORK / 001</span><span>THE LAST WALTZ ↗</span></div>
        <div className="hero-index">SD—001</div>
      </div>
      <div className="hero-foot"><span>ART THAT STAYS WITH YOU.</span><a href="#collection">SCROLL TO EXPLORE ↓</a><span>01 / 04 — THE STUDIO</span></div>
    </section>

    <section className="manifesto" id="about">
      <div className="section-kicker"><span>01 — THE STUDIO</span><span>A NOTE ON WHAT WE MAKE</span></div>
      <div className="manifesto-grid">
        <h2>Not just a<br/><em>background.</em></h2>
        <div className="manifesto-copy"><p className="lead">A screen is a space you return to every day. It should feel like yours.</p><p>Soullit Design is an independent creative studio exploring mood, memory and imagination through digital art. Each piece is made to bring a little atmosphere to the devices we live with — thoughtful visuals, considered details and stories that leave room for your own.</p><a href="#approach" className="text-link">A LITTLE ABOUT OUR PROCESS <Arrow/></a></div>
      </div>
      <div className="studio-stats"><div><strong>08</strong><span>ARTWORKS IN THE ARCHIVE</span></div><div><strong>02</strong><span>WAYS TO EXPLORE</span></div><div><strong>∞</strong><span>WAYS TO MAKE IT YOURS</span></div><p>THE COLLECTION IS ALWAYS IN PROGRESS.</p></div>
    </section>

    <section className="collection" id="collection">
      <div className="section-kicker"><span>02 — SELECTED WORKS</span><span>THE DIGITAL WALL / VOL. 01</span></div>
      <div className="collection-heading"><div><p className="eyebrow">FIND YOUR NEXT FAVOURITE</p><h2>The <em>collection.</em></h2></div><p>Small worlds, different moods.<br/>Find the one that feels like you.</p></div>
      <div className="collection-tools">
        <div className="collection-tabs">{["All","Wallpapers","Illustrations"].map(t=><button key={t} className={kind===t?"active":""} onClick={()=>{setKind(t);setVisible(8);}}>{t}</button>)}</div>
        <label className="search-box"><span>⌕</span><input value={query} onChange={e=>{setQuery(e.target.value);setVisible(8);}} placeholder="Search artworks..." aria-label="Search artworks"/>{query&&<button onClick={()=>setQuery("")} aria-label="Clear search">×</button>}</label>
      </div>
      <div className="category-row"><div className="category-list">{categories.map(c=><button key={c} className={active===c?"chosen":""} onClick={()=>{setActive(c);setVisible(8);}}>{c}</button>)}</div><label className="sort-label">SORT BY <select value={sort} onChange={e=>setSort(e.target.value)}><option>Featured</option><option>Newest</option><option>A–Z</option></select></label></div>
      {filtered.length===0 ? <div className="no-results"><span>NOTHING IN THIS FRAME</span><h3>Try another search.</h3><button onClick={()=>{setQuery("");setActive("All");setKind("All");}}>Reset collection <Arrow/></button></div> :
      <div className="artwork-grid">{filtered.slice(0,visible).map((item,index)=><article className={"artwork-card card-"+(index%4+1)} key={item.id}>
        <button className="artwork-image" onClick={()=>setPreview(item)} aria-label={"Preview "+item.title}><img src={image(item.id)} alt={item.title} loading={index<3?"eager":"lazy"}/><span className="image-number">{item.number} / 08</span><span className="image-open">VIEW ARTWORK <Arrow/></span></button>
        <div className="artwork-caption"><div><span className="artwork-category">{item.category} — {item.kind}</span><h3>{item.title}</h3></div><button className={saved.includes(item.id)?"save active":"save"} onClick={()=>toggleSave(item.id)} aria-label={saved.includes(item.id)?"Remove saved artwork":"Save artwork"}>{saved.includes(item.id)?"♥":"＋"}</button></div>
      </article>)}</div>}
      {filtered.length>visible&&<button className="load-more" onClick={()=>setVisible(v=>v+4)}>LOAD MORE ARTWORKS <span>＋</span></button>}
      <div className="collection-end"><span>YOU'VE REACHED THE END — FOR NOW.</span><span>{filtered.length.toString().padStart(2,"0")} PIECES / SOULLIT DESIGN</span></div>
    </section>

    <section className="feature-story">
      <div className="feature-image"><img src={image("blue-hour")} alt="Blue Hour — atmospheric city artwork"/><span>STUDY 002 / BLUE HOUR</span></div>
      <div className="feature-copy"><p className="eyebrow">03 — A CLOSER LOOK</p><h2>Somewhere<br/>between <em>light</em><br/>and silence.</h2><p>We like the in-between moments. The last light before evening, a city before it wakes, the feeling of being exactly where you need to be.</p><a href="#collection" className="text-link">DISCOVER THE COLLECTION <Arrow/></a><span className="feature-index">A STUDY IN STILLNESS / 2026</span></div>
    </section>

    <section className="approach" id="approach">
      <div className="section-kicker"><span>04 — THE APPROACH</span><span>FROM IDEA TO YOUR SCREEN</span></div>
      <div className="approach-heading"><h2>Made with <em>intention.</em></h2><p>Every artwork starts with a feeling. The rest is a process of finding the right form for it.</p></div>
      <div className="process-list">
        <div><span>01</span><h3>Find the feeling</h3><p>A mood, a memory, a place or a small moment worth holding onto.</p><b>IDEA / DIRECTION</b></div>
        <div><span>02</span><h3>Build the frame</h3><p>We explore composition, colour, light and detail until the image feels right.</p><b>ART / COMPOSITION</b></div>
        <div><span>03</span><h3>Make it yours</h3><p>Choose a piece, preview it and bring a new point of view to your screen.</p><b>DISCOVER / DOWNLOAD</b></div>
      </div>
    </section>

    <section className="request-section">
      <div className="request-art"><img src={image("candlelight-waltz")} alt="Candlelight Waltz artwork"/></div>
      <div className="request-copy"><p className="eyebrow">05 — YOUR IDEA, OUR NEXT CANVAS</p><h2>Have a mood<br/>in <em>mind?</em></h2><p>Tell us what you'd love to see next. A place, a colour, a feeling, a whole different world — your request could inspire the next piece in the collection.</p><a className="button-light" href="https://github.com/soullitdesign/wallpaper/issues/new?template=wallpaper-request.yml" target="_blank" rel="noreferrer">Request a wallpaper <Arrow/></a><span>MADE TO BE DISCOVERED. MADE TO BE SHARED.</span></div>
    </section>

    <footer className="footer">
      <a className="footer-identity" href="#top"><Mark/><span>SOULLIT DESIGN<small>INDEPENDENT ART STUDIO</small></span></a>
      <p>Art for the spaces you call your own.</p>
      <div className="footer-links"><a href="#collection">COLLECTION</a><a href="https://github.com/soullitdesign/wallpaper/issues/new?template=wallpaper-request.yml" target="_blank" rel="noreferrer">REQUEST ART</a><a href="#top">BACK TO TOP ↑</a></div>
      <div className="copyright"><span>© 2026 SOULLIT DESIGN</span><span>INDEPENDENTLY MADE / SHARED WITH YOU</span></div>
    </footer>

    {preview&&<div className="preview-overlay" role="dialog" aria-modal="true" aria-label={preview.title} onClick={()=>setPreview(null)}><button className="preview-close" onClick={()=>setPreview(null)} aria-label="Close preview">×</button><div className="preview-panel" onClick={e=>e.stopPropagation()}><img src={image(preview.id,true)} alt={preview.title}/><div className="preview-details"><p className="eyebrow">{preview.number} / SOULLIT DESIGN — {preview.category}</p><h2>{preview.title}</h2><p>{preview.description}</p><button onClick={()=>download(preview)}>DOWNLOAD WALLPAPER <Arrow/></button><small>PERSONAL USE / ORIGINAL DIGITAL ARTWORK</small></div></div></div>}
  </main>;
}
