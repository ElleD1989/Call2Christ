# Call2Christ

**Scripture for the day. Hope for the journey.**

Call2Christ is a quiet, Scripture-centred companion for Christ lovers and devotees. The initial product is a curated library of Bible passages, traditional hymns, prayers, and daily encouragement—not a question-and-answer chatbot.

## Current frontend foundation

- React + TypeScript + Vite.
- Warm Dawn design system, responsive navigation, and light/dark appearance.
- Home screen with daily Scripture and encouragement.
- Starter Bible passage browser with search and saved verses.
- Starter hymn library with searchable entries and selected lyric excerpts.
- Prayer library with searchable prayers and related Scripture references.
- Session-only personal collection for saved verses, hymns, and prayers.
- Product and licensing notes for connecting the complete content libraries.

## Important status distinction

This is an initial frontend scaffold with sample content. It is **not yet a complete Bible, hymn book, production-ready app, or deployed service**. The current Bible screen includes selected passages, not all 66 books and chapters. Hymns are shown as selected excerpts, not complete hymn books. Saved items currently live only in app state and are not securely persisted.

A previous project update reported KJV + World English Bible (WEB) content with 62,197 verses in a Lovable environment. The Supabase project previously inspected through the connected tools showed a different schema and only a small verse sample. The intended content database must be identified and validated before claiming full Bible coverage.

## Run locally

Requirements: Node.js 20 or newer.

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Implementation sequence

1. Identify and verify the intended database without destructive changes.
2. Validate Bible translations, complete verse coverage, attribution, and distribution/commercial permissions.
3. Connect full Bible navigation and reference/keyword search.
4. Build a structured hymn library using public-domain or properly licensed lyrics and recordings.
5. Expand the prayer library and Scripture references.
6. Add persistent personal collections, with authentication and database-level privacy protections where needed.
7. Add content management, automated tests, accessibility review, and deployment.

## Product principles

- Calm, devotional, encouraging, and Scripture-centred.
- Core experience first: Bible, hymns, prayers, and daily encouragement.
- No public question-and-answer feature in the initial version.
- Future community features such as testimonies can be considered after the core library is complete.
- Respect translation and hymn copyright/licensing.
- Never describe a sample or placeholder collection as complete.
