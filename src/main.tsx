import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BookOpen, Bookmark, ChevronRight, Compass, Heart, Home, Library,
  Menu, MessageCircle, Moon, Search, Send, Sparkles, Sun, X
} from "lucide-react";
import "./styles.css";

type Section = "Home" | "Bible" | "Ask" | "Prayer" | "Library";

const dailyVerse = {
  text: "Come to me, all you who are weary and burdened, and I will give you rest.",
  reference: "Matthew 11:28",
  translation: "WEB",
};

const topicGroups = [
  { title: "Faith & Spiritual Growth", topics: ["Growing in faith", "Trusting God", "Finding purpose"] },
  { title: "Prayer & Spiritual Life", topics: ["How to pray", "Hearing God", "Gratitude"] },
  { title: "Life & Difficult Seasons", topics: ["Anxiety and peace", "Grief and comfort", "Hope in hard times"] },
  { title: "Relationships & Family", topics: ["Forgiveness", "Marriage and love", "Family"] },
];

function App() {
  const [section, setSection] = useState<Section>("Home");
  const [query, setQuery] = useState("");
  const [question, setQuestion] = useState("");
  const [showTopics, setShowTopics] = useState(false);
  const [savedVerse, setSavedVerse] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [dark, setDark] = useState(false);

  const filteredTopics = useMemo(() => {
    const q = query.trim().toLowerCase();
    return topicGroups.map(group => ({ ...group, topics: group.topics.filter(topic => !q || topic.toLowerCase().includes(q) || group.title.toLowerCase().includes(q)) })).filter(group => group.topics.length);
  }, [query]);

  function navigate(next: Section) {
    setSection(next);
    setMobileMenu(false);
    if (next === "Bible") setQuery("");
  }

  return (
    <div className={dark ? "app dark" : "app"}>
      <aside className={mobileMenu ? "sidebar mobile-open" : "sidebar"}>
        <div className="brand">
          <div className="brand-mark">✝</div>
          <div><div className="brand-name">Call2Christ</div><div className="brand-tagline">Walk with Christ. Every day.</div></div>
          <button className="icon-button close-menu" aria-label="Close menu" onClick={() => setMobileMenu(false)}><X size={19}/></button>
        </div>
        <div className="nav-label">YOUR JOURNEY</div>
        <nav>
          {([
            ["Home", Home], ["Bible", BookOpen], ["Ask", MessageCircle], ["Prayer", Heart], ["Library", Library],
          ] as const).map(([name, Icon]) => (
            <button key={name} className={section === name ? "nav-item active" : "nav-item"} onClick={() => navigate(name)}>
              <Icon size={19}/><span>{name === "Ask" ? "Ask Call2Christ" : name}</span>{section === name && <span className="active-dot"/>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-verse"><span className="tiny-cross">✝</span><p>“Be still, and know that I am God.”</p><small>Psalm 46:10 · WEB</small></div>
          <button className="nav-item settings-item" onClick={() => setDark(v => !v)}>{dark ? <Sun size={18}/> : <Moon size={18}/>}<span>{dark ? "Light appearance" : "Dark appearance"}</span></button>
          <div className="profile-row"><div className="profile-avatar">G</div><div><strong>Guest journey</strong><small>Your faith, your pace</small></div><ChevronRight size={17}/></div>
        </div>
      </aside>

      {mobileMenu && <button className="scrim" aria-label="Close navigation" onClick={() => setMobileMenu(false)}/>}

      <main className="main">
        <header className="topbar">
          <button className="icon-button mobile-menu-button" aria-label="Open menu" onClick={() => setMobileMenu(true)}><Menu size={21}/></button>
          <div className="breadcrumb">Your journey <ChevronRight size={14}/> <strong>{section === "Ask" ? "Ask Call2Christ" : section}</strong></div>
          <div className="top-actions">
            <button className="icon-button" aria-label="Toggle appearance" onClick={() => setDark(v => !v)}>{dark ? <Sun size={18}/> : <Moon size={18}/>}</button>
            <button className="profile-pill" onClick={() => navigate("Library")}><span className="profile-avatar">G</span><span>Guest</span></button>
          </div>
        </header>

        {section === "Home" && <div className="page home-page">
          <div className="welcome-row"><div><div className="eyebrow"><Sun size={14}/> A MOMENT WITH GOD</div><h1>A little closer to Him,<br/><em>one day at a time.</em></h1><p className="lead">Whatever today holds, you don't have to walk through it alone.</p></div><div className="sun-art" aria-hidden="true"><div className="sun-circle"/><div className="hill hill-back"/><div className="hill hill-front"/><span>✝</span></div></div>

          <section className="verse-card">
            <div className="verse-top"><span className="verse-label"><BookOpen size={15}/> TODAY'S SCRIPTURE</span><button className={savedVerse ? "verse-save saved" : "verse-save"} onClick={() => setSavedVerse(v => !v)} aria-label={savedVerse ? "Remove bookmark" : "Save verse"}><Bookmark size={17} fill={savedVerse ? "currentColor" : "none"}/></button></div>
            <div className="verse-text">“{dailyVerse.text}”</div>
            <div className="verse-reference">{dailyVerse.reference} <span>· {dailyVerse.translation}</span></div>
            <div className="verse-bottom"><span><Sparkles size={15}/> A promise of rest for the weary heart.</span><button className="text-link" onClick={() => navigate("Bible")}>Read passage <ChevronRight size={15}/></button></div>
          </section>

          <section className="ask-card">
            <div className="ask-icon"><MessageCircle size={21}/></div>
            <div className="ask-copy"><h2>What's on your heart?</h2><p>Ask a question, explore Scripture, or find a little clarity for the road ahead.</p></div>
            <form className="ask-form" onSubmit={e => {e.preventDefault(); if(question.trim()) {setQuery(question); setSection("Ask");}}}>
              <input value={question} onChange={e => setQuestion(e.target.value)} placeholder="Ask anything about faith, life, or the Bible…" aria-label="Ask Call2Christ a question"/>
              <button type="submit" aria-label="Submit question"><Send size={17}/></button>
            </form>
            <div className="suggestions"><span>TRY ASKING</span>{["How can I find peace?", "Help me understand grace"].map(q => <button key={q} onClick={() => {setQuestion(q);setQuery(q);setSection("Ask");}}>{q}</button>)}</div>
          </section>

          <div className="section-heading"><div><div className="eyebrow">EXPLORE AT YOUR PACE</div><h2>Where would you like to begin?</h2></div><button className="text-link" onClick={() => setShowTopics(v => !v)}>{showTopics ? "Show less" : "View all topics"} <ChevronRight size={15}/></button></div>
          <div className="quick-grid">
            <button className="quick-card bible-quick" onClick={() => navigate("Bible")}><span className="quick-icon"><BookOpen size={20}/></span><strong>Read the Bible</strong><span>Find a passage and spend time in the Word.</span><ChevronRight size={17}/></button>
            <button className="quick-card prayer-quick" onClick={() => navigate("Prayer")}><span className="quick-icon"><Heart size={20}/></span><strong>Make space to pray</strong><span>Bring your thoughts, thanks, and worries to God.</span><ChevronRight size={17}/></button>
            <button className="quick-card topics-quick" onClick={() => setShowTopics(v => !v)}><span className="quick-icon"><Compass size={20}/></span><strong>Explore a life topic</strong><span>Discover what Scripture says about real life.</span><ChevronRight size={17}/></button>
          </div>
          {showTopics && <section className="topics-panel"><div className="search-box"><Search size={17}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search topics…" aria-label="Search topics"/></div><div className="topic-groups">{filteredTopics.map(group => <div key={group.title}><h3>{group.title}</h3><div className="topic-chips">{group.topics.map(topic => <button key={topic} onClick={() => {setQuestion(topic);setQuery(topic);setSection("Ask");}}>{topic}<ChevronRight size={13}/></button>)}</div></div>)}</div></section>}
        </div>}

        {section === "Bible" && <div className="page sub-page"><div className="eyebrow"><BookOpen size={14}/> SCRIPTURE, AT YOUR PACE</div><h1>Open the <em>Word.</em></h1><p className="lead">Make room for truth, wisdom, and a moment of quiet.</p><div className="search-box bible-search"><Search size={18}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search a verse, book, or phrase…" aria-label="Search Bible"/><button onClick={() => setSection("Ask")}>Explore</button></div><div className="notice-card"><BookOpen size={22}/><div><strong>Your Bible library is being connected.</strong><p>The reading interface is ready for the verified Scripture database. We will connect the full text only after confirming translation and licensing details.</p></div></div><h2>Begin with a book</h2><div className="book-grid">{["Genesis","Psalms","Proverbs","Isaiah","Matthew","Mark","Luke","John","Romans","Ephesians","Philippians","Revelation"].map((book,i)=><button key={book} onClick={() => setQuery(book)}><span>{String(i+1).padStart(2,"0")}</span><strong>{book}</strong><ChevronRight size={16}/></button>)}</div></div>}

        {section === "Ask" && <div className="page sub-page"><div className="eyebrow"><Sparkles size={14}/> SCRIPTURE-FIRST GUIDANCE</div><h1>Let's explore this <em>together.</em></h1><p className="lead">Bring your question as you are. We'll begin with Scripture and move gently toward understanding and next steps.</p><div className="notice-card"><Heart size={22}/><div><strong>A thoughtful answer starts with trusted sources.</strong><p>The question experience is being prepared. Before live answers are enabled, it must be connected to verified Bible passages and tested to ensure it never invents Scripture references.</p></div></div><form className="ask-form standalone" onSubmit={e=>{e.preventDefault();setQuestion("");}}><input value={question || query} onChange={e=>{setQuestion(e.target.value);setQuery(e.target.value);}} placeholder="What is on your heart today?" aria-label="Your question"/><button type="submit" aria-label="Send question"><Send size={17}/></button></form><div className="suggestion-list"><span>YOU COULD EXPLORE</span>{["What does the Bible say about worry?","How can I forgive someone?","Where can I find hope in a difficult season?"].map(q=><button key={q} onClick={()=>{setQuestion(q);setQuery(q);}}><MessageCircle size={17}/>{q}<ChevronRight size={16}/></button>)}</div></div>}

        {section === "Prayer" && <div className="page sub-page"><div className="eyebrow"><Heart size={14}/> A QUIET PLACE</div><h1>Come as <em>you are.</em></h1><p className="lead">You don't need perfect words. Begin with what's on your heart.</p><div className="prayer-paper"><div className="paper-flower">✦</div><h2>A simple prayer for today</h2><p>Heavenly Father, meet me in this moment. Quiet the noise around me and within me. Give me wisdom for what I cannot understand, courage for what I must face, and a heart that remains open to Your love. Guide my next step, and help me walk in grace today. Amen.</p><span>Make this prayer your own.</span></div><label className="field-label" htmlFor="prayer-notes">My prayer notes</label><textarea id="prayer-notes" placeholder="Write a private prayer or reflection here…"></textarea><p className="privacy-note">Privacy matters. Prayer notes are not saved to an account or server in this initial preview.</p></div>}

        {section === "Library" && <div className="page sub-page"><div className="eyebrow"><Library size={14}/> YOUR PERSONAL SPACE</div><h1>Keep what <em>speaks to you.</em></h1><p className="lead">A place for verses, reflections, and prayers you want to return to.</p><div className="notice-card"><Bookmark size={22}/><div><strong>Your personal library starts here.</strong><p>Saved items will be linked to secure sign-in and private storage before they are persisted. Your spiritual notes should remain yours.</p></div></div>{savedVerse && <div className="saved-item"><BookOpen size={20}/><div><strong>{dailyVerse.reference}</strong><p>{dailyVerse.text}</p></div><button onClick={()=>setSavedVerse(false)} aria-label="Remove saved verse"><X size={17}/></button></div>}<button className="primary-button" onClick={()=>navigate("Bible")}>Explore Scripture <ChevronRight size={16}/></button></div>}

        <footer className="footer"><span>✝</span><span>Made for the journey, grounded in the Word.</span><span>Call2Christ · Preview</span></footer>
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<React.StrictMode><App /></React.StrictMode>);
