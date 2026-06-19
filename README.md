# Church Event Planner

A simple, browser-based tool for organizing the church calendar — events, volunteers, budgets, checklists, and notes, all in one place. No apps to install, no accounts to create. Just open the link and start planning.

---

## How to Open the Planner

The planner lives at a web address your church has set up. Open that link in any browser (Chrome, Edge, Firefox, Safari) on any device — computer, tablet, or phone.

> **Bookmark the link** so you can find it quickly each time.

---

## Basic Use

### Selecting an Event
Click any event card on the left to open its planning details on the right.

### Adding a New Event
Click **Add Event** and fill in the title, date, coordinator, and any other details you have. Click **Create Event** when ready. If AI Setup is enabled (see below), the planner will automatically suggest a checklist, volunteers, and supplies within a few seconds.

### Updating an Event
Select the event, make your changes in the fields on the right, and click **Save Updates**. Changes are also saved automatically as you type.

### Marking Checklist Items Complete
Open an event and check off items in the Planning Checklist section as your team completes them. Progress updates automatically on the event card.

### Archiving a Completed Event
When an event is finished, click **Archive Event** to move it out of the active list. Archived events are still visible at the bottom of the left panel and can be restored at any time.

---

## Saving and Sharing the Planner

The planner saves automatically in your browser. To back it up or share it with someone else:

- Click **Save Planner As** to download a copy of all events as a file.
- Click **Open Planner** to load a previously saved file.

> **Tip:** Save a copy before making major changes so you always have a backup.

---

## AI Features (Optional)

The planner includes an optional AI assistant powered by OpenAI. You need an API key to use these features. The key is stored only in your browser — it is never sent anywhere except directly to OpenAI.

### Getting an OpenAI API Key

1. Go to [platform.openai.com](https://platform.openai.com) and create a free account.
2. In the left menu, go to **API Keys** and click **Create new secret key**.
3. Copy the key — it starts with `sk-`. You will only see it once, so copy it before closing the window.
4. Add a small amount of credit under **Billing** — a few dollars covers many months of light use.

### Adding Your Key to the Planner

1. Click **Settings** at the top of the planner.
2. Paste your key into the field and click **Save Key**.
3. AI features will appear immediately.

To remove the key, go back to **Settings** and click **Remove Key**.

### What the AI Features Do

| Feature | How to use it |
|---|---|
| **AI Setup** | When adding a new event, leave the "AI Setup" checkbox checked. After clicking Create Event, the AI fills in a tailored checklist, volunteer roles, and supplies list. Review and adjust as needed. |
| **AI Planning Assistant** | On any event, scroll to the AI Planning Assistant section. Use the quick-action buttons or type your own question and press Ask. |
| **AI Brief** | Click the **AI Brief** button at the top of any event to generate a planning summary you can copy and share with your team by email. |

> AI features require an internet connection. The rest of the planner works without internet.

---

## Printing

- **Print Planner** — prints a summary of all events.
- **Print Event** — prints the full details for the currently selected event only.

---

## Handing Off to the Next Coordinator

When a new coordinator takes over:

1. Share the planner web address with them.
2. Click **Save Planner As** and send them the downloaded file.
3. They open the planner, click **Open Planner**, and load that file to pick up exactly where you left off.
4. If they want AI features, they set up their own OpenAI API key in Settings using the steps above.

---

## For Whoever Manages the GitHub Account

The planner is hosted on GitHub Pages. The three files that make up the app are:

| File | What it does |
|---|---|
| `index.html` | The page structure |
| `styles.css` | The visual design |
| `app.js` | All the logic and AI features |

To update the app, edit these files in the GitHub repository. Changes go live at the planner's web address within a minute or two.

To hand off the GitHub account to a new administrator, share the account login or transfer ownership through GitHub's account settings.

---

## Something Not Working?

| Problem | What to try |
|---|---|
| Planner won't load | Check your internet connection and refresh the page |
| AI features not responding | Go to Settings and confirm your API key is entered correctly |
| Data seems missing | Use Save Planner As regularly — each browser keeps its own local copy |
| Anything else | Contact whoever manages the church GitHub account |
