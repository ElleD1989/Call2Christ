# Call2Christ

**Walk with Christ. Every day.**

Call2Christ is a Scripture-centred Christian companion intended to help people move from **Question → Scripture → Understanding → Reflection → Prayer → Action → Spiritual Growth**.

## Current foundation

This repository now contains the first runnable frontend foundation:

- React + TypeScript + Vite.
- Warm Dawn design direction: cream, muted gold, deep ink, Spectral headings and DM Sans interface text.
- Responsive navigation and initial Home, Bible, Ask, Prayer and Library experiences.
- Topic discovery interactions and a daily Scripture presentation.
- Explicit notices where live data or server functionality is not connected yet.

## Important status distinction

This is an initial frontend scaffold, not a production-ready app. The Bible and Ask screens are not yet connected to a verified Scripture corpus or retrieval service. Prayer notes are not persisted. Authentication, secure personal storage, server functions, testing and deployment remain to be implemented and verified.

Earlier project updates reported a KJV + WEB corpus of 62,197 verses and a set of topics in a Lovable environment. The Supabase project previously inspected through the connected tools showed a different schema and only a small verse sample. Treat the corpus as **unverified in this repository** until the intended database is identified and its coverage, translation metadata and licensing are checked.

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

## Planned implementation sequence

1. Verify and connect the intended Supabase project without destructive changes.
2. Validate Bible translation data, verse counts, references, attribution and licensing.
3. Implement Scripture search and book/chapter/verse reading backed by the database.
4. Build Ask Call2Christ as retrieval-grounded server-side functionality with references and safety handling.
5. Add authentication and private bookmarks, notes, prayer journal and reading progress with row-level security.
6. Add automated checks, accessibility review, responsive testing and deployment configuration.

## Product principles

- Scripture is the foundation; AI explains retrieved passages rather than inventing biblical authority.
- Welcoming, compassionate and usable for people at different stages of faith.
- Respect privacy and the sensitivity of spiritual conversations.
- Provide appropriate real-world support for crisis, medical, abuse and mental-health situations.
- Respect Bible translation licensing and commercial-use restrictions.
- No feature should be labelled complete until it works and has been verified.
