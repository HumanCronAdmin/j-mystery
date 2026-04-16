# J-Mystery — Japanese Mystery Novel Database

## Problem
After "The Decagon House Murders" was translated to English, interest in
Japanese mystery fiction exploded. But no dedicated English resource exists.
Readers rely on scattered Reddit threads and Goodreads lists.

Key confusion: honkaku (orthodox) vs shin-honkaku vs shakai-ha (social).
Nobody explains the subgenres clearly in English.

## Solution
Low-maintenance database of 36+ translated Japanese mystery novels with
subgenre classification, "what to read next" pathways, and a translation
release calendar. Book affiliate links for passive revenue.

### Core features
1. **Novel Database** — filterable by subgenre, author, publication year, availability
2. **Subgenre Guide** — honkaku / shin-honkaku / shakai-ha explained clearly
3. **What to Read Next** — "liked X? try Y" recommendation engine
4. **Translation Calendar** — upcoming English translations of Japanese mysteries
5. **Where to Buy** — Amazon links (new + used), library availability

### Differentiators
- Only dedicated J-mystery site in English
- Subgenre education (fills a real knowledge gap)
- Translation tracking (fans want to know what's coming)

## Tech Stack
- GitHub Pages (static), Vanilla JS + Tailwind CSS
- data/products.json (existing 36 novels)
- GA4 + Clarity

## MVP Scope (low effort, set and forget)
1. Fill ASINs for all 36 books
2. Add subgenre field and related_books field to data
3. Translation calendar page (static, updated quarterly)
4. 2 SEO articles:
   - "Japanese Mystery Novels in English: Complete Guide"
   - "Honkaku vs Social Mystery: Understanding Japanese Detective Fiction"

## Revenue Model
- Amazon US affiliate (japantool-20): book purchases
- Low traffic but steady (evergreen niche)
- Near-zero maintenance cost
