const storageKey = "church-event-planner-data-v1";
const aiKeyStorageKey = "church-planner-ai-key";

const defaultEvents = [
  {
    id: "advent",
    title: "Advent Celebration",
    archived: false,
    season: "Advent",
    date: "2026-11-29",
    coordinator: "Worship Ministry",
    category: "Worship",
    budget: "600",
    theme: "Prepare the way of the Lord",
    notes: "Plan scripture readings, candles, choir specials, and foyer decor.",
    volunteers: "Advent Readers\nChoir Team\nDecorating Team",
    supplies: "Advent wreath\nCandles\nBulletin inserts",
    checklist: [
      { label: "Confirm theme and scripture focus", done: true },
      { label: "Schedule readers and worship leaders", done: false },
      { label: "Prepare decorations and foyer welcome table", done: false },
      { label: "Promote service dates to congregation", done: true }
    ]
  },
  {
    id: "christmas",
    title: "Christmas Program",
    archived: false,
    season: "Christmas",
    date: "2026-12-20",
    coordinator: "Children's Ministry",
    category: "Family",
    budget: "1200",
    theme: "Joy to the World",
    notes: "Coordinate rehearsals early and confirm nativity costumes.",
    volunteers: "Children's Teachers\nStage Helpers\nHospitality Team",
    supplies: "Costumes\nPrograms\nRefreshments",
    checklist: [
      { label: "Choose program order and participants", done: true },
      { label: "Arrange rehearsals and sound checks", done: false },
      { label: "Organize refreshments and seating", done: false },
      { label: "Assign photographers and welcome team", done: false }
    ]
  },
  {
    id: "lent",
    title: "Lenten Prayer Gathering",
    archived: false,
    season: "Lent",
    date: "2026-02-18",
    coordinator: "Prayer Team",
    category: "Prayer",
    budget: "250",
    theme: "Return to the Lord",
    notes: "Consider weekly prayer guides and small-group reflection prompts.",
    volunteers: "Prayer Leaders\nGreeters",
    supplies: "Prayer guides\nCommunion supplies\nSignage",
    checklist: [
      { label: "Finalize prayer format and teaching plan", done: true },
      { label: "Prepare prayer guide handouts", done: false },
      { label: "Invite ministry leaders to participate", done: false },
      { label: "Set up prayer stations", done: false }
    ]
  },
  {
    id: "easter",
    title: "Easter Sunday Service",
    archived: false,
    season: "Easter",
    date: "2026-04-05",
    coordinator: "Senior Pastor",
    category: "Worship",
    budget: "1800",
    theme: "He Is Risen",
    notes: "Coordinate overflow seating, parking, and follow-up for guests.",
    volunteers: "Greeters\nParking Team\nChoir\nFollow-up Team",
    supplies: "Flower cross\nGuest cards\nCommunion elements",
    checklist: [
      { label: "Confirm sermon series and worship flow", done: true },
      { label: "Recruit extra greeters and parking team", done: true },
      { label: "Prepare guest follow-up system", done: false },
      { label: "Finalize decorations and communion setup", done: false }
    ]
  },
  {
    id: "vbs",
    title: "Vacation Bible School",
    archived: false,
    season: "Summer",
    date: "2026-07-13",
    coordinator: "Children's Director",
    category: "Outreach",
    budget: "2500",
    theme: "Faith Adventure Week",
    notes: "Track registration, classroom leaders, snacks, and security coverage.",
    volunteers: "Registration Team\nClass Leaders\nSnack Team\nSecurity Team",
    supplies: "Craft materials\nName tags\nSnacks\nDecor kits",
    checklist: [
      { label: "Open registration and collect forms", done: true },
      { label: "Assign classroom and activity leaders", done: false },
      { label: "Purchase snack and craft supplies", done: false },
      { label: "Confirm child safety and check-in process", done: false }
    ]
  },
  {
    id: "youth-sunday",
    title: "Youth Sunday",
    archived: false,
    season: "Ordinary Time",
    date: "2026-09-20",
    coordinator: "Youth Pastor",
    category: "Youth",
    budget: "400",
    theme: "Let No One Despise Your Youth",
    notes: "Include testimony slots and youth-led worship opportunities.",
    volunteers: "Youth Band\nMentors\nMedia Team",
    supplies: "Testimony outlines\nSlides\nInvitation cards",
    checklist: [
      { label: "Select youth participants and mentors", done: true },
      { label: "Plan worship set and testimonies", done: false },
      { label: "Run rehearsal with media team", done: false },
      { label: "Prepare follow-up conversation groups", done: false }
    ]
  },
  {
    id: "harvest",
    title: "Harvest Fellowship",
    archived: false,
    season: "Fall",
    date: "2026-10-17",
    coordinator: "Hospitality Team",
    category: "Fellowship",
    budget: "900",
    theme: "Gratitude and Community",
    notes: "Coordinate food signups, games, and outreach invitations.",
    volunteers: "Setup Crew\nKitchen Team\nGames Team",
    supplies: "Tables\nServing trays\nDecor\nOutdoor signs",
    checklist: [
      { label: "Confirm venue layout and schedule", done: false },
      { label: "Collect food and dessert signups", done: false },
      { label: "Prepare family activities and games", done: false },
      { label: "Invite guests and neighborhood families", done: true }
    ]
  }
];

const state = {
  events: loadEvents(),
  selectedId: null,
  printMode: "planner"
};

// --- DOM refs: existing ---

const eventList = document.getElementById("eventList");
const archivedEventList = document.getElementById("archivedEventList");
const eventCount = document.getElementById("eventCount");
const activeEventCount = document.getElementById("activeEventCount");
const archivedEventCount = document.getElementById("archivedEventCount");
const emptyState = document.getElementById("emptyState");
const eventForm = document.getElementById("eventForm");
const eventTitle = document.getElementById("eventTitle");
const statusBadge = document.getElementById("statusBadge");
const saveIndicator = document.getElementById("saveIndicator");

const formElements = {
  date: document.getElementById("eventDate"),
  coordinator: document.getElementById("eventCoordinator"),
  category: document.getElementById("eventCategory"),
  budget: document.getElementById("eventBudget"),
  theme: document.getElementById("eventTheme"),
  notes: document.getElementById("eventNotes"),
  volunteers: document.getElementById("eventVolunteers"),
  supplies: document.getElementById("eventSupplies")
};

const checklistContainer = document.getElementById("checklistContainer");
const newPlannerButton = document.getElementById("newPlannerButton");
const openPlannerButton = document.getElementById("openPlannerButton");
const savePlannerButton = document.getElementById("savePlannerButton");
const printPlannerButton = document.getElementById("printPlannerButton");
const resetDataButton = document.getElementById("resetDataButton");
const importDataInput = document.getElementById("importDataInput");
const addEventButton = document.getElementById("addEventButton");
const printEventButton = document.getElementById("printEventButton");
const archiveEventButton = document.getElementById("archiveEventButton");
const restoreEventButton = document.getElementById("restoreEventButton");
const deleteEventButton = document.getElementById("deleteEventButton");
const saveUpdatesButton = document.getElementById("saveUpdatesButton");
const eventModal = document.getElementById("eventModal");
const eventModalBackdrop = document.getElementById("eventModalBackdrop");
const closeEventModalButton = document.getElementById("closeEventModalButton");
const secondaryCancelEventModalButton = document.getElementById("secondaryCancelEventModalButton");
const addEventForm = document.getElementById("addEventForm");

const newEventFields = {
  title: document.getElementById("newEventTitle"),
  season: document.getElementById("newEventSeason"),
  date: document.getElementById("newEventDate"),
  coordinator: document.getElementById("newEventCoordinator"),
  category: document.getElementById("newEventCategory"),
  budget: document.getElementById("newEventBudget"),
  theme: document.getElementById("newEventTheme"),
  notes: document.getElementById("newEventNotes")
};

// --- DOM refs: AI ---

const settingsButton = document.getElementById("settingsButton");
const settingsModal = document.getElementById("settingsModal");
const settingsModalBackdrop = document.getElementById("settingsModalBackdrop");
const closeSettingsModalButton = document.getElementById("closeSettingsModalButton");
const apiKeyInput = document.getElementById("apiKeyInput");
const saveKeyButton = document.getElementById("saveKeyButton");
const removeKeyButton = document.getElementById("removeKeyButton");
const aiKeySetState = document.getElementById("aiKeySetState");
const aiKeyInputState = document.getElementById("aiKeyInputState");
const aiKeyStatusText = document.getElementById("aiKeyStatusText");
const aiSetupRow = document.getElementById("aiSetupRow");
const aiSetupToggle = document.getElementById("aiSetupToggle");
const aiAssistSection = document.getElementById("aiAssistSection");
const aiQuestion = document.getElementById("aiQuestion");
const aiAskButton = document.getElementById("aiAskButton");
const aiResponse = document.getElementById("aiResponse");
const generateBriefButton = document.getElementById("generateBriefButton");
const briefModal = document.getElementById("briefModal");
const briefModalBackdrop = document.getElementById("briefModalBackdrop");
const closeBriefModalButton = document.getElementById("closeBriefModalButton");
const briefContent = document.getElementById("briefContent");
const copyBriefButton = document.getElementById("copyBriefButton");

// --- Core data functions ---

function loadEvents() {
  const raw = localStorage.getItem(storageKey);
  if (!raw) {
    return structuredClone(defaultEvents);
  }

  try {
    return sanitizeEvents(JSON.parse(raw));
  } catch {
    return structuredClone(defaultEvents);
  }
}

function saveEvents() {
  localStorage.setItem(storageKey, JSON.stringify(state.events));
  saveIndicator.textContent = `Auto-saved in this browser at ${new Date().toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit"
  })}`;
}

function getSelectedEvent() {
  return state.events.find((event) => event.id === state.selectedId) ?? null;
}

function getProgress(event) {
  const total = event.checklist.length || 1;
  const complete = event.checklist.filter((item) => item.done).length;
  return Math.round((complete / total) * 100);
}

function getStatusLabel(progress) {
  if (progress === 100) return "Ready";
  if (progress >= 50) return "In Progress";
  return "Planning";
}

// --- Render ---

function renderEventList() {
  const activeEvents = state.events.filter((event) => !event.archived);
  const archivedEvents = state.events.filter((event) => event.archived);

  eventCount.textContent = `${state.events.length} events`;
  activeEventCount.textContent = `${activeEvents.length}`;
  archivedEventCount.textContent = `${archivedEvents.length}`;
  eventList.innerHTML = "";
  archivedEventList.innerHTML = "";

  activeEvents.forEach((event) => {
    eventList.appendChild(buildEventCard(event));
  });

  archivedEvents.forEach((event) => {
    archivedEventList.appendChild(buildEventCard(event));
  });

  if (!activeEvents.length) {
    eventList.innerHTML = '<div class="empty-list">No active events right now. Add a new one or restore an archived event.</div>';
  }

  if (!archivedEvents.length) {
    archivedEventList.innerHTML = '<div class="empty-list">Archived events will appear here after they are completed.</div>';
  }
}

function buildEventCard(event) {
    const progress = getProgress(event);
    const button = document.createElement("button");
    button.type = "button";
    button.className = `event-card${event.id === state.selectedId ? " is-active" : ""}${event.archived ? " is-archived" : ""}`;
    button.innerHTML = `
      <div class="event-card__top">
        <div>
          <div class="event-card__title">${escapeHtml(event.title)}</div>
          <div class="event-card__season">${escapeHtml(event.season)}</div>
        </div>
        <div class="summary-pill">${event.archived ? "Archived" : getStatusLabel(progress)}</div>
      </div>
      <div class="event-card__bottom">
        <div class="event-card__meta">${formatDate(event.date)}</div>
        <div class="event-card__meta">${progress}% complete</div>
      </div>
      <div class="progress-bar" aria-hidden="true">
        <span style="width: ${progress}%"></span>
      </div>
    `;

    button.addEventListener("click", () => {
      state.selectedId = event.id;
      render();
    });

    return button;
}

function renderChecklist(event) {
  checklistContainer.innerHTML = "";

  event.checklist.forEach((item) => {
    const label = document.createElement("label");
    label.className = "checklist-item";
    label.innerHTML = `
      <input type="checkbox" ${item.done ? "checked" : ""} aria-label="${escapeHtml(item.label)}">
      <div class="checklist-item__copy">
        <strong>${escapeHtml(item.label)}</strong>
        <span>${item.done ? "Completed" : "Still needs attention"}</span>
      </div>
    `;

    const checkbox = label.querySelector("input");
    checkbox.addEventListener("change", () => {
      item.done = checkbox.checked;
      saveEvents();
      render();
    });

    checklistContainer.appendChild(label);
  });
}

function renderDetails() {
  const event = getSelectedEvent();
  if (!event) {
    emptyState.classList.remove("hidden");
    eventForm.classList.add("hidden");
    return;
  }

  emptyState.classList.add("hidden");
  eventForm.classList.remove("hidden");

  const progress = getProgress(event);
  eventTitle.textContent = event.title;
  statusBadge.textContent = `${event.archived ? "Archived" : getStatusLabel(progress)} | ${progress}% complete`;
  archiveEventButton.classList.toggle("hidden", event.archived);
  restoreEventButton.classList.toggle("hidden", !event.archived);

  formElements.date.value = event.date ?? "";
  formElements.coordinator.value = event.coordinator ?? "";
  formElements.category.value = event.category ?? "";
  formElements.budget.value = event.budget ?? "";
  formElements.theme.value = event.theme ?? "";
  formElements.notes.value = event.notes ?? "";
  formElements.volunteers.value = event.volunteers ?? "";
  formElements.supplies.value = event.supplies ?? "";

  // Clear AI assist state when switching events
  aiResponse.classList.add("hidden");
  aiResponse.textContent = "";
  aiQuestion.value = "";

  renderChecklist(event);
}

function render() {
  document.body.dataset.printMode = state.printMode;
  renderEventList();
  renderDetails();
  updateAiVisibility();
}

function updateSelectedEvent(field, value) {
  const event = getSelectedEvent();
  if (!event) return;

  event[field] = value;
  saveEvents();
  renderEventList();
  renderDetailsHeaderOnly(event);
}

function renderDetailsHeaderOnly(event) {
  const progress = getProgress(event);
  eventTitle.textContent = event.title;
  statusBadge.textContent = `${event.archived ? "Archived" : getStatusLabel(progress)} | ${progress}% complete`;
  archiveEventButton.classList.toggle("hidden", event.archived);
  restoreEventButton.classList.toggle("hidden", !event.archived);
}

// --- Utilities ---

function formatDate(dateString) {
  if (!dateString) return "No date set";
  const date = new Date(`${dateString}T12:00:00`);
  return date.toLocaleDateString([], {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function createDefaultChecklist() {
  return [
    { label: "Confirm date and venue", done: false },
    { label: "Assign coordinator and ministry team", done: false },
    { label: "Prepare supplies and communications", done: false },
    { label: "Review final setup and day-of schedule", done: false }
  ];
}

function sanitizeChecklist(checklist) {
  if (!Array.isArray(checklist) || !checklist.length) {
    return createDefaultChecklist();
  }

  return checklist
    .map((item) => ({
      label: typeof item?.label === "string" && item.label.trim() ? item.label.trim() : "",
      done: Boolean(item?.done)
    }))
    .filter((item) => item.label);
}

function sanitizeEvent(event, index = 0) {
  const title = typeof event?.title === "string" && event.title.trim() ? event.title.trim() : `Imported Event ${index + 1}`;
  const fallbackId = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "event"}-${Date.now()}-${index}`;
  const checklist = sanitizeChecklist(event?.checklist);

  return {
    id: typeof event?.id === "string" && event.id.trim() ? event.id.trim() : fallbackId,
    title,
    archived: Boolean(event?.archived),
    season: typeof event?.season === "string" && event.season.trim() ? event.season.trim() : "Special Event",
    date: typeof event?.date === "string" ? event.date : "",
    coordinator: typeof event?.coordinator === "string" ? event.coordinator : "",
    category: typeof event?.category === "string" ? event.category : "",
    budget: typeof event?.budget === "string" || typeof event?.budget === "number" ? String(event.budget) : "",
    theme: typeof event?.theme === "string" ? event.theme : "",
    notes: typeof event?.notes === "string" ? event.notes : "",
    volunteers: typeof event?.volunteers === "string" ? event.volunteers : "",
    supplies: typeof event?.supplies === "string" ? event.supplies : "",
    checklist: checklist.length ? checklist : createDefaultChecklist()
  };
}

function sanitizeEvents(data) {
  if (!Array.isArray(data)) {
    throw new Error("Invalid event data");
  }

  return data.map((event, index) => sanitizeEvent(event, index));
}

function downloadTextFile(filename, content) {
  const blob = new Blob([content], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function exportEvents() {
  const stamp = new Date().toISOString().slice(0, 10);
  downloadTextFile(`church-event-planner-${stamp}.json`, JSON.stringify(state.events, null, 2));
  saveIndicator.textContent = "Planner file downloaded";
}

function importEventsFromFile(file) {
  if (!file) return;

  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      const importedEvents = sanitizeEvents(JSON.parse(String(reader.result)));
      state.events = importedEvents;
      state.selectedId = state.events[0]?.id ?? null;
      saveEvents();
      render();
      saveIndicator.textContent = `Opened planner with ${state.events.length} events`;
    } catch {
      window.alert("That file could not be opened. Please choose a Church Event Planner JSON file.");
    } finally {
      importDataInput.value = "";
    }
  });

  reader.addEventListener("error", () => {
    importDataInput.value = "";
    window.alert("The selected file could not be read.");
  });

  reader.readAsText(file);
}

function newPlanner() {
  const confirmed = window.confirm("Start a new planner with the starter events? Unsaved local changes will be replaced.");
  if (!confirmed) return;

  state.events = structuredClone(defaultEvents);
  state.selectedId = state.events[0]?.id ?? null;
  saveEvents();
  render();
  saveIndicator.textContent = "Started a new planner from the starter template";
}

function saveCurrentEventUpdates() {
  const event = getSelectedEvent();
  if (!event) return;

  saveEvents();
  saveIndicator.textContent = `Saved updates for ${event.title}`;
}

function printPlanner() {
  state.printMode = "planner";
  render();
  window.print();
}

function printSelectedEvent() {
  const event = getSelectedEvent();
  if (!event) return;

  state.printMode = "event";
  render();
  window.print();
}

function openEventModal() {
  addEventForm.reset();
  newEventFields.season.value = "Special Event";
  eventModal.classList.remove("hidden");
  newEventFields.title.focus();
}

function closeEventModal() {
  eventModal.classList.add("hidden");
  addEventButton.focus();
}

function createEventFromForm() {
  const title = newEventFields.title.value.trim();
  if (!title) return;

  const shouldAiSetup = hasApiKey() && aiSetupToggle.checked;
  const season = newEventFields.season.value.trim() || "Special Event";
  const id = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`;

  const event = {
    id,
    title,
    season,
    archived: false,
    date: newEventFields.date.value,
    coordinator: newEventFields.coordinator.value.trim(),
    category: newEventFields.category.value.trim(),
    budget: newEventFields.budget.value,
    theme: newEventFields.theme.value.trim(),
    notes: newEventFields.notes.value.trim(),
    volunteers: "",
    supplies: "",
    checklist: createDefaultChecklist()
  };

  state.events.push(event);
  state.selectedId = event.id;
  saveEvents();
  render();
  closeEventModal();

  if (shouldAiSetup) {
    runSmartEventSetup(event.id);
  }
}

function archiveSelectedEvent() {
  const event = getSelectedEvent();
  if (!event || event.archived) return;

  event.archived = true;
  saveEvents();
  render();
}

function restoreSelectedEvent() {
  const event = getSelectedEvent();
  if (!event || !event.archived) return;

  event.archived = false;
  saveEvents();
  render();
}

function deleteSelectedEvent() {
  const event = getSelectedEvent();
  if (!event) return;

  const confirmed = window.confirm(`Delete "${event.title}"? This cannot be undone.`);
  if (!confirmed) return;

  state.events = state.events.filter((item) => item.id !== event.id);
  state.selectedId = state.events[0]?.id ?? null;
  saveEvents();
  render();
}

// --- Existing event listeners ---

Object.entries(formElements).forEach(([field, element]) => {
  element.addEventListener("input", () => {
    updateSelectedEvent(field, element.value);
  });
});

addEventButton.addEventListener("click", openEventModal);
archiveEventButton.addEventListener("click", archiveSelectedEvent);
restoreEventButton.addEventListener("click", restoreSelectedEvent);
deleteEventButton.addEventListener("click", deleteSelectedEvent);
saveUpdatesButton.addEventListener("click", saveCurrentEventUpdates);
newPlannerButton.addEventListener("click", newPlanner);
openPlannerButton.addEventListener("click", () => importDataInput.click());
savePlannerButton.addEventListener("click", exportEvents);
printPlannerButton.addEventListener("click", printPlanner);
printEventButton.addEventListener("click", printSelectedEvent);
importDataInput.addEventListener("change", () => {
  importEventsFromFile(importDataInput.files?.[0]);
});
closeEventModalButton.addEventListener("click", closeEventModal);
secondaryCancelEventModalButton.addEventListener("click", closeEventModal);
eventModalBackdrop.addEventListener("click", closeEventModal);

addEventForm.addEventListener("submit", (event) => {
  event.preventDefault();
  createEventFromForm();
});

resetDataButton.addEventListener("click", () => {
  state.events = structuredClone(defaultEvents);
  state.selectedId = state.events[0]?.id ?? null;
  saveEvents();
  render();
  saveIndicator.textContent = "Reset to the starter events";
});

window.addEventListener("afterprint", () => {
  state.printMode = "planner";
  render();
});

// ===== AI FEATURES =====

// --- API key management ---

function getApiKey() {
  return localStorage.getItem(aiKeyStorageKey) || "";
}

function hasApiKey() {
  return Boolean(getApiKey());
}

function saveApiKey(key) {
  const trimmed = key.trim();
  if (trimmed) {
    localStorage.setItem(aiKeyStorageKey, trimmed);
  } else {
    localStorage.removeItem(aiKeyStorageKey);
  }
}

// --- Settings modal ---

function openSettingsModal() {
  updateSettingsKeyDisplay();
  settingsModal.classList.remove("hidden");
  if (!hasApiKey()) apiKeyInput.focus();
}

function closeSettingsModal() {
  settingsModal.classList.add("hidden");
  apiKeyInput.value = "";
  settingsButton.focus();
}

function updateSettingsKeyDisplay() {
  const key = getApiKey();
  if (key) {
    aiKeySetState.classList.remove("hidden");
    aiKeyInputState.classList.add("hidden");
    aiKeyStatusText.textContent = `AI features active  (sk-…${key.slice(-4)})`;
  } else {
    aiKeySetState.classList.add("hidden");
    aiKeyInputState.classList.remove("hidden");
  }
}

function handleSaveKey() {
  const key = apiKeyInput.value.trim();
  if (!key) {
    apiKeyInput.focus();
    return;
  }
  saveApiKey(key);
  updateSettingsKeyDisplay();
  render();
  saveIndicator.textContent = "AI features are now active";
}

function handleRemoveKey() {
  if (!window.confirm("Remove the API key? AI features will be turned off.")) return;
  saveApiKey("");
  updateSettingsKeyDisplay();
  render();
  saveIndicator.textContent = "API key removed. AI features are off.";
}

settingsButton.addEventListener("click", openSettingsModal);
closeSettingsModalButton.addEventListener("click", closeSettingsModal);
settingsModalBackdrop.addEventListener("click", closeSettingsModal);
saveKeyButton.addEventListener("click", handleSaveKey);
removeKeyButton.addEventListener("click", handleRemoveKey);
apiKeyInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleSaveKey();
});

// --- Show / hide AI elements ---

function updateAiVisibility() {
  const hasKey = hasApiKey();
  aiSetupRow.classList.toggle("hidden", !hasKey);
  aiAssistSection.classList.toggle("hidden", !hasKey);
  generateBriefButton.classList.toggle("hidden", !hasKey);
}

// --- OpenAI API helper ---

async function callOpenAI(messages, { jsonMode = false, maxTokens = 800, temperature = 0.7 } = {}) {
  const key = getApiKey();
  if (!key) throw new Error("No API key. Click Settings to add one.");

  const body = {
    model: "gpt-4o-mini",
    messages,
    temperature,
    max_tokens: maxTokens
  };

  if (jsonMode) {
    body.response_format = { type: "json_object" };
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${key}`
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    if (response.status === 401) throw new Error("Invalid API key. Please check Settings.");
    if (response.status === 429) throw new Error("Rate limit reached. Please wait a moment and try again.");
    throw new Error(errData.error?.message || "AI request failed. Please try again.");
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

// --- Smart Event Setup ---

async function runSmartEventSetup(eventId) {
  const event = state.events.find((e) => e.id === eventId);
  if (!event) return;

  saveIndicator.textContent = "AI is setting up your event…";

  try {
    const result = await callOpenAI(
      [
        {
          role: "system",
          content: "You are a church event planning assistant. Return only valid JSON, no markdown."
        },
        {
          role: "user",
          content: `Create a practical planning package for this church event. Return ONLY valid JSON.

Event: ${event.title}
Season / Focus: ${event.season}
Ministry Area: ${event.category || "General"}
Theme: ${event.theme || "not set"}
Date: ${event.date || "not set"}

JSON format (no other text):
{
  "checklist": [{"label": "specific task", "done": false}],
  "volunteers": "Role 1\\nRole 2\\nRole 3",
  "supplies": "Item 1\\nItem 2\\nItem 3",
  "notes": "One or two sentence planning note for the coordinator."
}

Include 6-8 specific checklist items tailored to this type of event. Volunteer roles and supplies should be realistic for a mid-size church.`
        }
      ],
      { jsonMode: true, temperature: 0.4, maxTokens: 700 }
    );

    const setup = JSON.parse(result);

    if (Array.isArray(setup.checklist) && setup.checklist.length) {
      event.checklist = sanitizeChecklist(setup.checklist);
    }
    if (typeof setup.volunteers === "string" && setup.volunteers.trim()) {
      event.volunteers = setup.volunteers.trim();
    }
    if (typeof setup.supplies === "string" && setup.supplies.trim()) {
      event.supplies = setup.supplies.trim();
    }
    if (typeof setup.notes === "string" && setup.notes.trim() && !event.notes) {
      event.notes = setup.notes.trim();
    }

    saveEvents();
    render();
    saveIndicator.textContent = "AI setup complete — review and adjust as needed";
  } catch (err) {
    saveIndicator.textContent = `AI setup failed: ${err.message}`;
    render();
  }
}

// --- AI Assist panel ---

function setAiResponseLoading() {
  aiResponse.classList.remove("hidden");
  aiResponse.innerHTML = `<div class="ai-loading"><div class="spinner"></div><span>Thinking…</span></div>`;
}

function setAiResponseContent(text) {
  aiResponse.classList.remove("hidden");
  aiResponse.textContent = text;
}

function setAiResponseError(msg) {
  aiResponse.classList.remove("hidden");
  aiResponse.textContent = `⚠ ${msg}`;
}

async function askAiAssistant(question) {
  const event = getSelectedEvent();
  if (!event || !question.trim()) return;

  aiAskButton.disabled = true;
  setAiResponseLoading();

  const checklistSummary = event.checklist
    .map((item) => `[${item.done ? "x" : " "}] ${item.label}`)
    .join("\n");

  const context = `Event: ${event.title}
Season: ${event.season}
Date: ${formatDate(event.date)}
Coordinator: ${event.coordinator || "Not assigned"}
Ministry Area: ${event.category || "General"}
Budget: ${event.budget ? "$" + event.budget : "Not set"}
Theme: ${event.theme || "Not set"}
Notes: ${event.notes || "None"}
Volunteers: ${event.volunteers || "None listed"}
Supplies: ${event.supplies || "None listed"}
Progress: ${getProgress(event)}% complete
Checklist:
${checklistSummary}`;

  try {
    const answer = await callOpenAI(
      [
        {
          role: "system",
          content: "You are a helpful church event planning assistant. Be concise, practical, and warm. Keep responses brief — 2–4 sentences or a short list."
        },
        {
          role: "user",
          content: `Current event plan:\n\n${context}\n\nQuestion: ${question}`
        }
      ],
      { temperature: 0.7, maxTokens: 400 }
    );

    setAiResponseContent(answer);
  } catch (err) {
    setAiResponseError(err.message);
  } finally {
    aiAskButton.disabled = false;
  }
}

aiAskButton.addEventListener("click", () => askAiAssistant(aiQuestion.value));

aiQuestion.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    askAiAssistant(aiQuestion.value);
  }
});

document.querySelectorAll(".ai-quick-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    aiQuestion.value = btn.dataset.prompt;
    askAiAssistant(btn.dataset.prompt);
  });
});

// --- Brief Generator ---

function openBriefModal() {
  briefContent.innerHTML = `<div class="ai-loading"><div class="spinner"></div><span>Generating event brief…</span></div>`;
  briefModal.classList.remove("hidden");
  generateBrief();
}

function closeBriefModal() {
  briefModal.classList.add("hidden");
  generateBriefButton.focus();
}

async function generateBrief() {
  const event = getSelectedEvent();
  if (!event) return;

  try {
    const brief = await callOpenAI(
      [
        {
          role: "system",
          content: "You are a church event planning assistant. Write clear, warm, professional event summaries suitable for sharing with ministry team members."
        },
        {
          role: "user",
          content: `Write a concise event planning brief (2–3 short paragraphs) for the following church event. Cover the key details, volunteer needs, and important planning notes. Make it easy to read and share with the team.

Event: ${event.title}
Date: ${formatDate(event.date)}
Season: ${event.season}
Coordinator: ${event.coordinator || "TBD"}
Ministry Area: ${event.category || "General"}
Budget: ${event.budget ? "$" + event.budget : "Not set"}
Theme / Goal: ${event.theme || "Not set"}
Notes: ${event.notes || "None"}
Volunteers Needed: ${event.volunteers || "To be determined"}
Supplies: ${event.supplies || "To be determined"}
Planning Progress: ${getProgress(event)}% of checklist complete`
        }
      ],
      { temperature: 0.6, maxTokens: 500 }
    );

    briefContent.textContent = brief;
    copyBriefButton.textContent = "Copy to Clipboard";
  } catch (err) {
    briefContent.textContent = `⚠ ${err.message}`;
  }
}

copyBriefButton.addEventListener("click", async () => {
  const text = briefContent.textContent;
  if (!text) return;

  try {
    await navigator.clipboard.writeText(text);
    copyBriefButton.textContent = "Copied!";
  } catch {
    // Fallback: select the text so user can copy manually
    const range = document.createRange();
    range.selectNodeContents(briefContent);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    copyBriefButton.textContent = "Text selected — press Ctrl+C";
  }

  setTimeout(() => { copyBriefButton.textContent = "Copy to Clipboard"; }, 2500);
});

generateBriefButton.addEventListener("click", openBriefModal);
closeBriefModalButton.addEventListener("click", closeBriefModal);
briefModalBackdrop.addEventListener("click", closeBriefModal);

// --- Escape key (all modals) ---

document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  if (!eventModal.classList.contains("hidden")) closeEventModal();
  if (!settingsModal.classList.contains("hidden")) closeSettingsModal();
  if (!briefModal.classList.contains("hidden")) closeBriefModal();
});

// ===== INIT =====

state.selectedId = state.events[0]?.id ?? null;
render();
