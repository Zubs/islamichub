# Design

## Decisions

- **Content is generated from sources, then committed.** Each Arabic text was cut from the Qur'an text or from the Arabic of the cited hadith in the open fawazahmed0 datasets by locating its first and last words, so no Arabic was typed by hand. Hadith numbers were confirmed by reading the English of the same entry.
- **Sources are limited to collections whose cited numbering the library shares** (Sahih al-Bukhari, Abu Dawud, al-Tirmidhi, Ibn Majah) and the Qur'an, so no numbering map entries are needed.
- **`AdhkarCard` gains three optional things:** a title, a "when to say it" line, and `counter` (default on). Duas with a count store their progress under `dua:<id>` in the existing adhkar progress, so it survives a reload like the rest.
- **`utils/duas.js`** holds `searchDuas(query, duas, situations)` and `foldText`, which lower-cases and strips combining marks and the ʿ and ʾ signs. Yoruba and Hausa search (features 27 and 28) can reuse it.
- **Unknown situation → 404** through a route guard that redirects to the catch-all route while keeping the address.
- **Anchors:** each card has `id="<dua id>"`; the router's `scrollBehavior` scrolls to a hash after the page transition.
- **Search results link to the dua's anchor on its first situation's page.**

## Risks / Trade-offs

- [Grades of the hadiths outside Sahih al-Bukhari were not verified] → listed under "Final" for the reviewer.
- [Transliterations and translations are the site's own wording] → listed under "Final" for the reviewer.
