# Design Brief: EatBy

**Core Concept:** A high-utility, privacy-focused food inventory app that uses a calendar interface to track expiry dates. The goal is to reduce food waste through a "scan-and-set" workflow with automated notifications.

---

## 1. Visual Identity & Vibe

- **Persona:** Professional, clean, and urgent (but not stressful).
- **Design Language:** Minimalist Utility. High contrast is key so users can see deadlines at a glance.
- **Color Palette Suggestion:** \* **Primary:** A "Fresh Green" (Success/Freshness).
- **Secondary:** "Warning Orange/Red" (Used for items approaching their deadline).
- **Background:** Neutral whites/greys to keep the calendar data legible.

---

## 2. Screen-by-Screen Requirements

### A. The Homepage (The "Food Calendar")

- **The View:** A full-screen calendar interface mimicking the Google Calendar layout (set in month mode, no switch allowed)
- **Data Visualization:** \* Items should appear as "events" or "blocks" on their deadline date.
- _Design Tip:_ Use color-coding (e.g., Green for $>3$ days, Orange for Tomorrow, Red for Today).

### B. The "Add Food" Workflow (Modal)

- **Trigger:** Tapping the `scan` screen.
- **Step 1: The Scanner:** The top half of the modal should be a live camera view for barcode scanning. (user can always add a manual entry on the same screen)
- **Step 2: Data Entry:** Once scanned, the app populates the **Product Name** (fetched from the scan).
- **Step 3: The Deadline:** A prominent Date Picker where the user manually selects the "Deadline."
- **Success State:** A quick animation showing the item "flying" into the calendar background.

### C. The Edit/Detail View

- **Constraint:** Keep it simple. When a user taps a food item on the calendar, a small card or modal appears.
- **Editable Fields:**
- Product Name (Text Field).
- Deadline Date (Date Picker).
- **Remove Button:** A clear "Delete" or "Consumed" button to clear the item from the local database.

---

## 3. User Experience (UX) Goals

- **Speed is Priority:** The scan-to-save process should take less than 5 seconds.
- **Privacy First:** No "Login" or "Cloud Sync" UI elements are needed. The design should feel self-contained and local.
- **Notification Style:** Design a custom look for the "Tomorrow" push notification—it should be helpful and distinct from social media pings.

---

## 4. Technical Reference for Designers

- **Navigation:** Simple bottom or top navigation for switching calendar views.
- **Empty State:** If the calendar is empty, show a friendly illustration of an empty fridge with a call to action to "Scan your first item."

---

### A Quick Note for the Designer:

> "The 'Agenda Mode' is the most important view for power users. It should look like a countdown list, showing how many hours or days are left for each item, sorted by the soonest deadline."

Does this structure capture everything you were envisioning for the workflow?
