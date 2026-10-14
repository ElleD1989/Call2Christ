# Call2Christ — Product Foundation

## Mission

Create a beautiful, welcoming digital library for Christ lovers and devotees, centred on Bible passages, hymns, prayers, and daily encouragement.

Call2Christ should feel like a quiet companion for daily devotion—not a chatbot or a social network in its initial release.

## Initial product journey

**Daily Encouragement → Scripture → Hymn → Prayer → Reflection**

## MVP priorities

### 1. Home / Daily encouragement
- Verse or short Scripture passage for the day.
- Brief, carefully reviewed encouragement rooted in the selected passage.
- Simple entry points to the Bible, hymns, and prayers.
- A calm and accessible reading experience.

### 2. Bible library
- Navigate all 66 books, chapters, and verses.
- Search by Bible reference, word, or phrase.
- Display translation name and verse reference clearly.
- Save selected verses to a personal collection.
- Link related passages where reliable relationships are available.

### 3. Hymn library
- Browse and search hymn titles, authors, themes, and categories.
- Show hymn background and lyrics where the rights permit.
- Clearly distinguish public-domain texts from licensed works.
- Audio and recordings can be considered later after their rights and hosting requirements are confirmed.

### 4. Prayer library
- Browse prayers by purpose, such as morning, evening, gratitude, peace, courage, comfort, and loved ones.
- Include a relevant Scripture reference with each prayer where appropriate.
- Keep the tone reverent, gentle, and welcoming.
- Private prayer notes can be considered after secure storage is implemented.

### 5. Personal collection
- Save Bible passages, hymns, and prayers.
- Later add secure account-based syncing and privacy controls.
- For the first preview, saved items are temporary and not persisted to a server.

## Future possibilities (not MVP requirements)

- Sharing testimonies and faith stories.
- Optional community interaction and moderation.
- Audio Bible and hymn recordings.
- Reading plans, devotional series, additional languages, and accessibility preferences.

No open-ended question-and-answer feature is planned for the initial version.

## Design direction

Warm Dawn: cream backgrounds, muted gold accents, deep ink text, Spectral headings and DM Sans interface text. The interface should be mobile responsive, uncluttered, easy to read, and comfortable for longer periods of devotional reading.

## Technical direction

- React + TypeScript + Vite frontend.
- Supabase is a candidate for content storage, subject to verifying the intended existing project.
- Content must be data-driven rather than hard-coded in UI components.
- Private collections require appropriate authentication and database-level access controls before cloud persistence.
- No secrets should be shipped in browser code.

## Content integrity and licensing

A previous status report described a KJV + World English Bible (WEB) corpus of 62,197 verses. A separate live Supabase audit found a conflicting state. Before connecting the full library, confirm:
1. Exact backend and environment.
2. All books, chapters, verses, and reference consistency.
3. Translation metadata and rights for intended distribution and commercial use.
4. Hymn lyric rights and any separate audio/recording rights.
5. Backups and migration history before changing an existing database.

## Definition of ready

A library is complete only when its actual content coverage has been measured and verified. A visual list of books or a small selection of passages must not be presented as a complete Bible. A feature is ready only after its data source, normal and error states, mobile layout, accessibility, and persistence behaviour have been tested.
