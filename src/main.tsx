import React, { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { createRoot } from "react-dom/client";
import {
  BookOpen, Bookmark, ChevronLeft, ChevronRight, Heart, Home, Library,
  Menu, Moon, Music2, Search, Sun, X, Check
} from "lucide-react";
import "./styles.css";

type Section = "Home" | "Bible" | "Hymns" | "Prayers" | "Saved";
type Verse = { reference: string; book: string; chapter: number; verse: number; text: string; translation: "WEB" | "KJV"; theme: string };
type Hymn = { title: string; author: string; year: string; category: string; lyrics: string[]; note: string };
type Prayer = { title: string; category: string; scripture: string; text: string };

const sampleVerses: Verse[] = [
  { reference: "Psalm 23:1", book: "Psalms", chapter: 23, verse: 1, text: "Yahweh is my shepherd: I shall lack nothing.", translation: "WEB", theme: "Comfort" },
  { reference: "Psalm 46:10", book: "Psalms", chapter: 46, verse: 10, text: "Be still, and know that I am God.", translation: "WEB", theme: "Peace" },
  { reference: "Matthew 11:28", book: "Matthew", chapter: 11, verse: 28, text: "Come to me, all you who labor and are heavily burdened, and I will give you rest.", translation: "WEB", theme: "Rest" },
  { reference: "Proverbs 3:5", book: "Proverbs", chapter: 3, verse: 5, text: "Trust in Yahweh with all your heart, and don't lean on your own understanding.", translation: "WEB", theme: "Trust" },
  { reference: "Isaiah 41:10", book: "Isaiah", chapter: 41, verse: 10, text: "Don't be afraid, for I am with you. Don't be dismayed, for I am your God. I will strengthen you. Yes, I will help you. Yes, I will uphold you with the right hand of my righteousness.", translation: "WEB", theme: "Courage" },
  { reference: "John 3:16", book: "John", chapter: 3, verse: 16, text: "For God so loved the world, that he gave his one and only Son, that whoever believes in him should not perish, but have eternal life.", translation: "WEB", theme: "Love" },
  { reference: "Philippians 4:6", book: "Philippians", chapter: 4, verse: 6, text: "In nothing be anxious, but in everything, by prayer and petition with thanksgiving, let your requests be made known to God.", translation: "WEB", theme: "Peace" },
  { reference: "Romans 8:28", book: "Romans", chapter: 8, verse: 28, text: "We know that all things work together for good for those who love God, to those who are called according to his purpose.", translation: "WEB", theme: "Hope" },
  { reference: "Psalm 119:105", book: "Psalms", chapter: 119, verse: 105, text: "Your word is a lamp to my feet, and a light for my path.", translation: "WEB", theme: "Guidance" },
  { reference: "1 Corinthians 13:4", book: "1 Corinthians", chapter: 13, verse: 4, text: "Love is patient and is kind. Love doesn't envy. Love doesn't brag, is not proud.", translation: "WEB", theme: "Love" },
  { reference: "Joshua 1:9", book: "Joshua", chapter: 1, verse: 9, text: "Haven't I commanded you? Be strong and courageous. Don't be afraid. Don't be dismayed, for Yahweh your God is with you wherever you go.", translation: "WEB", theme: "Courage" },
  { reference: "Psalm 34:18", book: "Psalms", chapter: 34, verse: 18, text: "Yahweh is near to those who have a broken heart, and saves those who have a crushed spirit.", translation: "WEB", theme: "Comfort" },
];

const hymns: Hymn[] = [
  { title: "Amazing Grace", author: "John Newton", year: "1779", category: "Grace", lyrics: ["Amazing grace! How sweet the sound,", "That saved a wretch like me!", "I once was lost, but now am found;", "Was blind, but now I see."], note: "A beloved hymn celebrating grace, redemption, and the gift of being found." },
  { title: "Be Thou My Vision", author: "Traditional Irish; translated by Mary E. Byrne", year: "1912 translation", category: "Devotion", lyrics: ["Be Thou my Vision, O Lord of my heart;", "Naught be all else to me, save that Thou art;", "Thou my best Thought, by day or by night,", "Waking or sleeping, Thy presence my light."], note: "An old prayer of devotion asking God to guide every part of life." },
  { title: "Holy, Holy, Holy", author: "Reginald Heber", year: "1826", category: "Worship", lyrics: ["Holy, holy, holy! Lord God Almighty!", "Early in the morning our song shall rise to Thee;", "Holy, holy, holy! Merciful and mighty!", "God in three Persons, blessed Trinity!"], note: "A hymn of reverence and praise to the Holy Trinity." },
  { title: "What a Friend We Have in Jesus", author: "Joseph M. Scriven", year: "1855", category: "Comfort", lyrics: ["What a Friend we have in Jesus,", "All our sins and griefs to bear!", "What a privilege to carry", "Everything to God in prayer!"], note: "A reminder to bring every burden and concern to God in prayer." },
  { title: "Praise to the Lord, the Almighty", author: "Joachim Neander", year: "1680", category: "Praise", lyrics: ["Praise to the Lord, the Almighty, the King of creation!", "O my soul, praise Him, for He is thy health and salvation!", "All ye who hear, now to His temple draw near;", "Praise Him in glad adoration."], note: "A joyful invitation to praise God for His care and creation." },
  { title: "It Is Well with My Soul", author: "Horatio G. Spafford", year: "1873", category: "Peace", lyrics: ["When peace, like a river, attendeth my way,", "When sorrows like sea billows roll;", "Whatever my lot, Thou hast taught me to say,", "It is well, it is well, with my soul."], note: "A hymn of trust and enduring faith through sorrow and hardship." },
];

const starterPrayers: Prayer[] = [
  { title: "Morning Prayer", category: "Daily devotion", scripture: "Psalm 143:8", text: "Heavenly Father, thank You for the gift of a new day. Guide my thoughts, words, and actions. Help me walk in love, show kindness to those I meet, and recognise Your goodness in ordinary moments. Let my life bring honour to You. Amen." },
  { title: "Prayer for Peace", category: "Peace & comfort", scripture: "Philippians 4:6–7", text: "Lord, quiet my heart when worry grows loud. Help me lay down what I cannot control and trust You with what lies ahead. Fill me with Your peace, steady my thoughts, and remind me that I am never beyond Your care. Amen." },
  { title: "Prayer of Gratitude", category: "Thanksgiving", scripture: "1 Thessalonians 5:18", text: "Gracious God, open my eyes to the blessings I might overlook. Thank You for life, for love, for the people who walk beside me, and for the hope found in Your Word. Teach me to live with a grateful heart, in every season. Amen." },
  { title: "Prayer for Strength", category: "Courage", scripture: "Isaiah 41:10", text: "Faithful Father, when I feel weak, remind me that I do not have to rely on my strength alone. Give me courage for today's responsibilities, patience for the things that take time, and wisdom for each next step. Uphold me in Your love. Amen." },
  { title: "Evening Prayer", category: "Rest & reflection", scripture: "Psalm 4:8", text: "Lord, as this day comes to an end, I place its joys and troubles in Your hands. Forgive where I have fallen short, help me make things right where I can, and grant me peaceful rest. May I wake tomorrow with renewed hope. Amen." },
  { title: "Prayer for Loved Ones", category: "Family & friends", scripture: "Numbers 6:24–26", text: "God of love, please watch over the people dear to me. Give them strength when days are difficult, comfort when they are hurting, wisdom for their choices, and joy in moments of goodness. Help me care for them with patience, generosity, and grace. Amen." },
];

const bookList = ["Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther", "Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi", "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude", "Revelation"];

function App() {
  const [section, setSection] = useState<Section>("Home");
  const [verses, setVerses] = useState<Verse[]>(sampleVerses);
  const [prayers, setPrayers] = useState<Prayer[]>(starterPrayers);
  const [scriptureSource, setScriptureSource] = useState<"sample" | "database">("sample");
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState<string[]>([]);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [dark, setDark] = useState(false);
  const [selectedVerse, setSelectedVerse] = useState<Verse | null>(null);
  const [selectedHymn, setSelectedHymn] = useState<Hymn | null>(null);
  const [selectedPrayer, setSelectedPrayer] = useState<Prayer | null>(null);
  const [showBooks, setShowBooks] = useState(false);

  useEffect(() => {
    const url = import.meta.env.VITE_SUPABASE_URL;
    const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
    if (!url || !publishableKey) return;

    const client = createClient(url, publishableKey);
    let cancelled = false;

    async function loadPublishedScripture() {
      // Supabase REST responses are paginated; load every published verse in bounded batches.
      const pageSize = 1000;
      const allRows: unknown[] = [];
      for (let from = 0; !cancelled; from += pageSize) {
        const { data, error } = await client
          .from("bible_verses")
          .select("book_code, chapter, verse, text, translations!inner(code), bible_books!inner(name, sort_order)")
          .eq("is_published", true)
          .order("book_code", { ascending: true })
          .order("chapter", { ascending: true })
          .order("verse", { ascending: true })
          .range(from, from + pageSize - 1);

        if (error || !data) return;
        allRows.push(...data);
        if (data.length < pageSize) break;
      }

      if (cancelled || allRows.length === 0) return;

      type ScriptureRow = {
        book_code: string;
        chapter: number;
        verse: number;
        text: string;
        translations: { code: string } | { code: string }[];
        bible_books: { name: string; sort_order: number } | { name: string; sort_order: number }[];
      };

      const rows = allRows as ScriptureRow[];
      const loaded = rows
        .map((row): Verse => {
          const book = Array.isArray(row.bible_books) ? row.bible_books[0] : row.bible_books;
          const translation = Array.isArray(row.translations) ? row.translations[0] : row.translations;
          return {
            reference: `${book.name} ${row.chapter}:${row.verse}`,
            book: book.name,
            chapter: row.chapter,
            verse: row.verse,
            text: row.text,
            translation: translation.code === "KJV" ? "KJV" : "WEB",
            theme: "Scripture",
          };
        })
        .sort((a, b) => {
          const bookOrder = bookList.indexOf(a.book) - bookList.indexOf(b.book);
          return bookOrder || a.chapter - b.chapter || a.verse - b.verse;
        });

      if (loaded.length > 0 && !cancelled) {
        // Keep the curated starter passages visible until the complete Bible import is verified.
        // Database records take precedence when the same reference exists in both sources.
        const byReference = new Map<string, Verse>();
        sampleVerses.forEach(verse => byReference.set(verse.reference, verse));
        loaded.forEach(verse => byReference.set(verse.reference, verse));
        const merged = Array.from(byReference.values()).sort((a, b) => {
          const bookOrder = bookList.indexOf(a.book) - bookList.indexOf(b.book);
          return bookOrder || a.chapter - b.chapter || a.verse - b.verse;
        });
        setVerses(merged);
        setScriptureSource("database");
      }
    }

    void loadPublishedScripture();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const url = import.meta.env.VITE_SUPABASE_URL;
    const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
    if (!url || !publishableKey) return;

    const client = createClient(url, publishableKey);
    let cancelled = false;

    async function loadPublishedPrayers() {
      const { data, error } = await client
        .from("content_items")
        .select("slug, title, subtitle, excerpt, body")
        .eq("content_type", "prayer")
        .eq("status", "published")
        .order("sort_order", { ascending: true });

      if (error || !data || data.length === 0 || cancelled) return;

      const published: Prayer[] = data.map(row => ({
        title: row.title,
        category: row.subtitle || "Prayer",
        scripture: "",
        text: row.body || row.excerpt || "",
      }));

      if (!cancelled && published.length > 0) setPrayers(published);
    }

    void loadPublishedPrayers();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredVerses = useMemo(() => {
    const q = query.trim().toLowerCase();
    return verses.filter(v => !q || v.reference.toLowerCase().includes(q) || v.book.toLowerCase().includes(q) || v.text.toLowerCase().includes(q) || v.theme.toLowerCase().includes(q));
  }, [query, verses]);
  const filteredHymns = useMemo(() => {
    const q = query.trim().toLowerCase();
    return hymns.filter(h => !q || h.title.toLowerCase().includes(q) || h.author.toLowerCase().includes(q) || h.category.toLowerCase().includes(q));
  }, [query]);
  const filteredPrayers = useMemo(() => {
    const q = query.trim().toLowerCase();
    return prayers.filter(p => !q || p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.scripture.toLowerCase().includes(q) || p.text.toLowerCase().includes(q));
  }, [query, prayers]);

  function navigate(next: Section) {
    setSection(next);
    setMobileMenu(false);
    setQuery("");
    setSelectedVerse(null);
    setSelectedHymn(null);
    setSelectedPrayer(null);
    setShowBooks(false);
  }
  function toggleSave(id: string) {
    setSaved(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]);
  }

  const dailyVerse = verses.find(v => v.reference === "Matthew 11:28") ?? sampleVerses[2];

  return (
    <div className={dark ? "app dark" : "app"}>
      <aside className={mobileMenu ? "sidebar mobile-open" : "sidebar"}>
        <div className="brand">
          <div className="brand-mark">✝</div>
          <div><div className="brand-name">Call2Christ</div><div className="brand-tagline">Walk with Christ. Every day.</div></div>
          <button className="icon-button close-menu" aria-label="Close menu" onClick={() => setMobileMenu(false)}><X size={19}/></button>
        </div>
        <div className="nav-label">YOUR DAILY COMPANION</div>
        <nav>
          {([
            ["Home", Home], ["Bible", BookOpen], ["Hymns", Music2], ["Prayers", Heart], ["Saved", Library],
          ] as const).map(([name, Icon]) => (
            <button key={name} className={section === name ? "nav-item active" : "nav-item"} onClick={() => navigate(name)}>
              <Icon size={19}/><span>{name === "Saved" ? "My collection" : name}</span>{section === name && <span className="active-dot"/>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-verse"><span className="tiny-cross">✝</span><p>“Be still, and know that I am God.”</p><small>Psalm 46:10 · WEB</small></div>
          <button className="nav-item settings-item" onClick={() => setDark(v => !v)}>{dark ? <Sun size={18}/> : <Moon size={18}/>}<span>{dark ? "Light appearance" : "Dark appearance"}</span></button>
          <div className="profile-row"><div className="profile-avatar">✝</div><div><strong>A moment with Christ</strong><small>Scripture · Hymns · Prayer</small></div><Heart size={17}/></div>
        </div>
      </aside>
      {mobileMenu && <button className="scrim" aria-label="Close navigation" onClick={() => setMobileMenu(false)}/>}

      <main className="main">
        <header className="topbar">
          <button className="icon-button mobile-menu-button" aria-label="Open menu" onClick={() => setMobileMenu(true)}><Menu size={21}/></button>
          <div className="breadcrumb">Call2Christ <ChevronRight size={14}/> <strong>{section === "Saved" ? "My collection" : section}</strong></div>
          <div className="top-actions">
            <button className="icon-button" aria-label="Toggle appearance" onClick={() => setDark(v => !v)}>{dark ? <Sun size={18}/> : <Moon size={18}/>}</button>
          </div>
        </header>

        {section === "Home" && <div className="page home-page">
          <div className="welcome-row"><div><div className="eyebrow"><Sun size={14}/> A MOMENT WITH GOD</div><h1>Let His Word be<br/><em>your daily light.</em></h1><p className="lead">A quiet place for Scripture, timeless hymns, and prayers that draw your heart closer to Christ.</p></div><div className="sun-art" aria-hidden="true"><div className="sun-circle"/><div className="hill hill-back"/><div className="hill hill-front"/><span>✝</span></div></div>
          <section className="verse-card">
            <div className="verse-top"><span className="verse-label"><BookOpen size={15}/> SCRIPTURE FOR TODAY</span><button className={saved.includes("verse:"+dailyVerse.reference) ? "verse-save saved" : "verse-save"} onClick={() => toggleSave("verse:"+dailyVerse.reference)} aria-label="Save verse"><Bookmark size={17} fill={saved.includes("verse:"+dailyVerse.reference) ? "currentColor" : "none"}/></button></div>
            <div className="verse-text">“{dailyVerse.text}”</div><div className="verse-reference">{dailyVerse.reference} <span>· {dailyVerse.translation}</span></div>
            <div className="verse-bottom"><span><Heart size={15}/> Take a breath. Be still. Rest in His promise.</span><button className="text-link" onClick={() => {setSection("Bible");setSelectedVerse(dailyVerse);}}>Read Scripture <ChevronRight size={15}/></button></div>
          </section>
          <div className="section-heading"><div><div className="eyebrow">A LIBRARY FOR THE SOUL</div><h2>Spend a moment with the Word</h2></div></div>
          <div className="quick-grid">
            <button className="quick-card bible-quick" onClick={() => navigate("Bible")}><span className="quick-icon"><BookOpen size={20}/></span><strong>The Holy Bible</strong><span>Find verses for every season of life.</span><ChevronRight size={17}/></button>
            <button className="quick-card prayer-quick" onClick={() => navigate("Hymns")}><span className="quick-icon"><Music2 size={20}/></span><strong>Hymns of faith</strong><span>Return to the songs generations have cherished.</span><ChevronRight size={17}/></button>
            <button className="quick-card topics-quick" onClick={() => navigate("Prayers")}><span className="quick-icon"><Heart size={20}/></span><strong>Prayers for every day</strong><span>Words for gratitude, comfort, and hope.</span><ChevronRight size={17}/></button>
          </div>
          <div className="section-heading"><div><div className="eyebrow">A LITTLE ENCOURAGEMENT</div><h2>Words to carry with you</h2></div><button className="text-link" onClick={() => navigate("Bible")}>More verses <ChevronRight size={15}/></button></div>
          <div className="encouragement-grid">{verses.slice(0,3).map(v=><button className="encouragement-card" key={v.reference} onClick={()=>{setSection("Bible");setSelectedVerse(v);}}><span>{v.theme}</span><p>“{v.text}”</p><strong>{v.reference} <ChevronRight size={14}/></strong></button>)}</div>
        </div>}

        {section === "Bible" && <div className="page sub-page">
          <div className="eyebrow"><BookOpen size={14}/> SCRIPTURE LIBRARY</div><h1>Return to the <em>Word.</em></h1><p className="lead">Search a passage or explore verses for encouragement, hope, strength, and peace.</p>
          <div className="search-box bible-search"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search by reference, word, or theme…" aria-label="Search Scripture"/><button onClick={()=>setQuery("")}>Clear</button></div>
          {selectedVerse ? <div className="reader-card"><button className="back-link" onClick={()=>setSelectedVerse(null)}><ChevronLeft size={16}/> All verses</button><span className="verse-label">SCRIPTURE · {selectedVerse.translation}</span><h2>{selectedVerse.reference}</h2><p className="reader-verse">“{selectedVerse.text}”</p><div className="reader-actions"><button className="primary-button" onClick={()=>toggleSave("verse:"+selectedVerse.reference)}>{saved.includes("verse:"+selectedVerse.reference)?<Check size={16}/>:<Bookmark size={16}/>} {saved.includes("verse:"+selectedVerse.reference)?"Saved":"Save verse"}</button><span>{selectedVerse.theme}</span></div></div> :
          <><div className="content-count">{filteredVerses.length} passages available <span>· {bookList.length} books listed below{scriptureSource === "database" ? " · database connected" : " · preview content"}</span></div><div className="verse-list">{filteredVerses.map(v=><article className="verse-row" key={v.reference}><button className="verse-open" onClick={()=>setSelectedVerse(v)}><span className="verse-label">{v.theme.toUpperCase()}</span><strong>{v.reference}</strong><p>{v.text}</p><small>{v.translation} · {v.book} {v.chapter}:{v.verse}</small></button><button className={saved.includes("verse:"+v.reference)?"row-save saved":"row-save"} onClick={()=>toggleSave("verse:"+v.reference)} aria-label={"Save "+v.reference}><Bookmark size={17} fill={saved.includes("verse:"+v.reference)?"currentColor":"none"}/></button></article>)}</div><button className="outline-button book-toggle" onClick={()=>setShowBooks(v=>!v)}>{showBooks?"Hide book list":"Browse Bible books"} <ChevronRight size={16}/></button>{showBooks&&<div className="book-grid">{bookList.map((book,i)=><button key={book} onClick={()=>setQuery(book)}><span>{String(i+1).padStart(2,"0")}</span><strong>{book}</strong><ChevronRight size={16}/></button>)}</div>}</>}
          <div className="library-note"><strong>Building the complete Bible library</strong><p>This preview contains selected passages, not the complete Bible text. The full book, chapter, and verse library will be connected after the source database and translation permissions are verified.</p></div>
        </div>}

        {section === "Hymns" && <div className="page sub-page"><div className="eyebrow"><Music2 size={14}/> HYMNS OF FAITH</div><h1>Songs that lift the <em>soul.</em></h1><p className="lead">Timeless words of praise, trust, grace, and hope, cherished by generations of believers.</p><div className="search-box bible-search"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search hymns or authors…" aria-label="Search hymns"/><button onClick={()=>setQuery("")}>Clear</button></div>{selectedHymn?<div className="reader-card hymn-reader"><button className="back-link" onClick={()=>setSelectedHymn(null)}><ChevronLeft size={16}/> All hymns</button><div className="hymn-emblem"><Music2 size={24}/></div><span className="verse-label">{selectedHymn.category.toUpperCase()}</span><h2>{selectedHymn.title}</h2><p className="hymn-meta">{selectedHymn.author} · {selectedHymn.year}</p><div className="hymn-lyrics">{selectedHymn.lyrics.map((line,i)=><p key={i}>{line}</p>)}</div><p className="hymn-note">{selectedHymn.note}</p><button className="primary-button" onClick={()=>toggleSave("hymn:"+selectedHymn.title)}>{saved.includes("hymn:"+selectedHymn.title)?<Check size={16}/>:<Bookmark size={16}/>} {saved.includes("hymn:"+selectedHymn.title)?"Saved to collection":"Save hymn"}</button></div>:<><div className="content-count">{filteredHymns.length} hymns in this starter collection <span>· Lyrics shown are excerpts</span></div><div className="hymn-grid">{filteredHymns.map((h,i)=><button className="hymn-card" key={h.title} onClick={()=>setSelectedHymn(h)}><span className="hymn-number">{String(i+1).padStart(2,"0")} <Music2 size={16}/></span><strong>{h.title}</strong><small>{h.author}</small><p>{h.note}</p><span className="hymn-open">Read hymn <ChevronRight size={14}/></span></button>)}</div></>}<div className="library-note"><strong>Growing the hymn collection responsibly</strong><p>Only verified public-domain lyrics or appropriately licensed material should be included in the full library. This starter view shows excerpts, not complete hymn books or recordings.</p></div></div>}

        {section === "Prayers" && <div className="page sub-page"><div className="eyebrow"><Heart size={14}/> PRAYER LIBRARY</div><h1>Words for your <em>quiet moments.</em></h1><p className="lead">Simple prayers for the beginning of a day, a moment of gratitude, or a season when you need strength.</p><div className="search-box bible-search"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search prayers or themes…" aria-label="Search prayers"/><button onClick={()=>setQuery("")}>Clear</button></div>{selectedPrayer?<div className="reader-card prayer-reader"><button className="back-link" onClick={()=>setSelectedPrayer(null)}><ChevronLeft size={16}/> All prayers</button><div className="hymn-emblem"><Heart size={23}/></div><span className="verse-label">{selectedPrayer.category.toUpperCase()}</span><h2>{selectedPrayer.title}</h2>{selectedPrayer.scripture && <div className="prayer-scripture">A Scripture to reflect on · {selectedPrayer.scripture}</div>}<p className="prayer-full-text">{selectedPrayer.text}</p><button className="primary-button" onClick={()=>toggleSave("prayer:"+selectedPrayer.title)}>{saved.includes("prayer:"+selectedPrayer.title)?<Check size={16}/>:<Bookmark size={16}/>} {saved.includes("prayer:"+selectedPrayer.title)?"Saved to collection":"Save prayer"}</button></div>:<><div className="content-count">{filteredPrayers.length} prayers in this starter collection</div><div className="prayer-grid">{filteredPrayers.map(p=><button className="prayer-card" key={p.title} onClick={()=>setSelectedPrayer(p)}><span className="prayer-card-icon"><Heart size={18}/></span><span className="verse-label">{p.category.toUpperCase()}</span><strong>{p.title}</strong><p>{p.text}</p>{p.scripture && <small>Reflect on {p.scripture}</small>}<span className="hymn-open">Read prayer <ChevronRight size={14}/></span></button>)}</div></>}</div>}

        {section === "Saved" && <div className="page sub-page"><div className="eyebrow"><Library size={14}/> YOUR COLLECTION</div><h1>Keep close what <em>encourages you.</em></h1><p className="lead">A personal collection of saved Bible verses, hymns, and prayers in this session.</p>{saved.length===0?<div className="empty-state"><Bookmark size={28}/><h2>Your collection starts here.</h2><p>Save a verse, hymn, or prayer and it will appear here while this preview is open.</p><button className="primary-button" onClick={()=>navigate("Bible")}>Explore Scripture <ChevronRight size={16}/></button></div>:<div className="saved-list">{saved.map(id=>{const [kind,...rest]=id.split(":");const name=rest.join(":");const verse=verses.find(v=>v.reference===name);const hymn=hymns.find(h=>h.title===name);const prayer=prayers.find(p=>p.title===name);return <article className="saved-item" key={id}><div className="saved-type">{kind==="verse"?<BookOpen size={18}/>:kind==="hymn"?<Music2 size={18}/>:<Heart size={18}/>}</div><div><span className="verse-label">{kind.toUpperCase()}</span><strong>{verse?.reference||hymn?.title||prayer?.title||name}</strong><p>{verse?.text||hymn?.note||prayer?.text||""}</p><button className="text-link" onClick={()=>{if(verse){setSection("Bible");setSelectedVerse(verse);}else if(hymn){setSection("Hymns");setSelectedHymn(hymn);}else if(prayer){setSection("Prayers");setSelectedPrayer(prayer);}}}>Open <ChevronRight size={14}/></button></div><button className="row-save" onClick={()=>toggleSave(id)} aria-label="Remove from saved"><X size={16}/></button></article>})}</div>}<p className="privacy-note">This first preview keeps saved items in temporary app state only. Secure cross-device saving will be added later.</p></div>}

        <footer className="footer"><span>✝</span><span>Scripture for the day. Hope for the journey.</span><span>Call2Christ · Starter library</span></footer>
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<React.StrictMode><App /></React.StrictMode>);
