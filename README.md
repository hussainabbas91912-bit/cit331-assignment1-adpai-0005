# Campus Tech Fest 2026 – Event Registration Website

**Course:** CIT331 – Web Development
**Author:** Gulraiz
**Roll No:** adpai-0005
**Repository:** https://github.com/hussainabbas91912-bit/cit331-assignment1-adpai-0005

A three-page static website for a fictional student technology festival. It demonstrates semantic HTML5, modern CSS (box model, Flexbox, media queries, selectors and pseudo-classes) and client-side JavaScript that stores form submissions in `localStorage`.

---

## Project Structure

```
CIT331-Assignment/
├── index.html      # Home page – hero, about section, highlights, quick-info sidebar
├── events.html     # Events page – Flexbox grid of event cards
├── register.html   # Registration form + table of saved entries
├── css/
│   └── style.css   # All site styles
├── js/
│   └── script.js   # Form handling, localStorage, dynamic table, Clear All
└── README.md
```

## How to Run

No build tools or server are needed.

1. Open the `CIT331-Assignment` folder.
2. Double-click `index.html` (or right-click → *Open with* → your browser).
3. Use the navigation bar to move between **Home**, **Events** and **Register**.

> Event images are loaded from `picsum.photos`, so an internet connection is needed to see them. The site works fully offline otherwise.

---

## Requirements Checklist

### 1. Semantic HTML5 (`index.html`, `events.html`, `register.html`)

| Element | Where it is used |
|---|---|
| `<header>` | Site header with logo and navigation on every page |
| `<nav>` | Main navigation menu (`aria-label="Main navigation"`) |
| `<main>` | Unique page content on every page |
| `<section>` | Hero, about, highlights, schedule, form and entries sections |
| `<article>` | Highlight cards (home) and each event card (events) |
| `<aside>` | Quick Info, Categories and Need Help sidebars |
| `<figure>` / `<figcaption>` | Feature image on home page; image in each event card |
| `<time datetime="…">` | Festival dates, event times, deadlines, submission timestamps |
| `<footer>` | Site footer on every page |

Other good practices: `lang` attribute, viewport meta tag, descriptive `alt` text, `<label for>` on every form field, `aria-current="page"` on the active link and an `aria-live` status message for the form.

### 2. CSS (`css/style.css`)

- **Box model reset** – `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }`
- **Flexbox navigation** – `.header-inner` and `.main-nav ul` use `display: flex` with `justify-content`, `align-items` and `gap`.
- **Flexbox event grid** – `.event-grid` / `.highlight-grid` use `flex-wrap: wrap` with `flex: 1 1 calc(50% - 1.5rem)` cards; the page body and sidebar layout (`.page-layout`) is also Flexbox.
- **Responsive design** – `@media (max-width: 768px)` stacks the header, sidebar and event cards into a single column.
- **Selectors used**
  - Element: `body`, `h1`, `a`, `img`, `label`, `input`, `figcaption` …
  - Class: `.container`, `.btn`, `.event-card`, `.sidebar` …
  - ID: `#registration-form`, `#entries-table`, `#register .entries-section`
  - Attribute: `a[aria-current="page"]`, `.event-card[data-category="talk"]`, `input[type="email"]`, `input[required]`, `.btn-danger[disabled]`
- **Pseudo-classes** – `:hover` on links, nav items, buttons, cards, inputs and table rows; also `:focus`, `:last-child`, `:nth-child(even)`.
- CSS custom properties (variables) in `:root` for colours, radius and shadows.

### 3. JavaScript (`js/script.js`)

- Listens for the form's `submit` event and calls **`e.preventDefault()`** so the page does not reload.
- Validates required fields (name, email format, student ID, event) and highlights invalid inputs.
- Builds an entry object and stores the full list in **`localStorage`** under the key `techFestRegistrations` using **`JSON.stringify`**; it is read back with **`JSON.parse`**.
- **Dynamically renders** every saved entry as a row in the `<table>` (using `createElement` + `textContent`, which avoids HTML injection) and updates the entry counter.
- Saved entries remain after refreshing or reopening the page.
- **Clear All** button asks for confirmation, removes the key from `localStorage` and empties the table. It is disabled when there is nothing to clear.

### 4. Version Control (Git)

The project was built up in 10 small, sequential commits:

| # | Commit message | What it adds |
|---|---|---|
| 1 | Add home page | `index.html` – semantic page structure |
| 2 | Add events page | `events.html` – event cards with article, figure and time |
| 3 | Add registration page | `register.html` – form and entries table |
| 4 | Add CSS reset and base styles | Box-model reset, variables, element selectors |
| 5 | Add Flexbox navigation styles | Flexbox header/nav with hover states |
| 6 | Add page layout and event grid styles | Flexbox layout, buttons, event grid, attribute selectors |
| 7 | Add form, table and responsive styles | Form/table styles, ID selectors, `@media (max-width: 768px)` |
| 8 | Add form submission and localStorage logic | `e.preventDefault()`, JSON storage, dynamic table |
| 9 | Add Clear All button | Removes all saved registrations |
| 10 | Add README | This documentation |

View the history with:

```bash
git clone https://github.com/hussainabbas91912-bit/cit331-assignment1-adpai-0005.git
cd cit331-assignment1-adpai-0005
git log --oneline
```

---

## Testing Performed

| Test | Expected result | Result |
|---|---|---|
| Submit empty form | Error message, required fields highlighted in red | Pass |
| Submit valid form | Success message, form resets, row added to table | Pass |
| Refresh `register.html` | Saved rows still shown (loaded from `localStorage`) | Pass |
| Click **Clear All** and confirm | Table emptied, counter shows 0 | Pass |
| Resize to ≤ 768px | Navigation, sidebar and event cards stack vertically | Pass |
| Browser console | No JavaScript errors | Pass |

## Technologies

HTML5 · CSS3 (Flexbox, media queries, custom properties) · Vanilla JavaScript (ES6) · Web Storage API (`localStorage`) · Git
