# Call2Christ — Product Foundation

## Mission

Build a comprehensive, modern, welcoming, spiritually grounded Christian application that helps people connect with God, understand the Bible, find biblical guidance, grow in faith, pray, learn and apply Scripture to everyday life.

Call2Christ should feel like a living Christian companion, not merely a static Bible database or a collection of articles.

## Central journey

**Question → Scripture → Understanding → Reflection → Prayer → Action → Spiritual Growth**

## Core principles

- Bible-first and Scripture-centred.
- Accessible to curious visitors, new believers, mature Christians and people in difficult seasons.
- Welcoming rather than intimidating.
- Compassionate without replacing pastors, qualified professionals or emergency services.
- Structured and scalable rather than dependent on hard-coded content.
- Privacy-conscious, particularly around questions, prayers and personal reflections.
- Internationally extensible while respecting each translation's rights and licensing.

## MVP experience

### Home / Today
- Scripture of the day and reflection.
- Continue reading and suggested topics.
- A clear entry point to Ask Call2Christ.
- Quick access to Bible, prayer and personal library.

### Bible
- Navigate Testament, book, chapter and verse.
- Search references, phrases and keywords.
- Save bookmarks, highlights and notes after secure persistence is implemented.
- Link related passages and themes.
- Show translation and licensing information accurately.

### Ask Call2Christ
- Accept natural-language questions.
- Retrieve passages from the verified Bible database before composing answers.
- Present Scripture references, context, explanation, reflection prompts, prayer and related topics.
- Never fabricate a verse, reference or claim that an answer is God's direct instruction.
- Respect denominational differences where Christians interpret a passage differently.
- Apply safe response patterns for crisis, abuse, self-harm, health and other high-stakes situations.

### Topics and structured knowledge
Organise discovery across Faith & Spiritual Growth; Prayer & Spiritual Life; Emotional & Personal Life; Relationships & Family; Life & Purpose; and Difficult Seasons. Over time, connect topics to passages, biblical people and places, events, themes, concepts, parables, miracles, prayers, covenants, prophecies and timelines.

### Prayer and personal library
- Private prayer journal and optional status tracking.
- Scripture-informed prayer prompts.
- Bookmarks, notes, saved answers, saved studies and reading history.
- Secure authentication and database-level access controls before syncing private data.

## Technical direction

- React + TypeScript + Vite frontend.
- Supabase for relational content, authentication and private user data, subject to verification of the intended existing project.
- Data-driven content models, indexes for search, server-side AI keys and retrieval.
- Row-level security for personal records.
- Responsive mobile-first interface and accessible reading typography.

## Data integrity gate

A prior status report described KJV and World English Bible (WEB) content with 62,197 verses. A separate live Supabase audit found a conflicting state. This must be reconciled before connecting Bible reading or Ask features. Confirm:
1. Exact backend/project identity and environment.
2. Translation IDs, full verse coverage and referential integrity.
3. Translation text and permission for intended distribution/use.
4. Search performance and citation correctness.
5. Backups and migration history before any schema changes.

## Definition of ready

A feature is ready only when it is implemented, connected to the intended data/services, tested for normal and failure cases, accessible on mobile and desktop, and accurately described in the interface. A visual mockup alone is not a working feature.
