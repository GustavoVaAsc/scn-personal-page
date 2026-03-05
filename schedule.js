/**
 * schedule.js — Schedule data & renderer
 *
 * To add, remove or change an activity, edit the SCHEDULE_DATA array below.
 * Each entry has:
 *   time  — label shown in the first column  (e.g. "7 AM")
 *   slots — object keyed by day abbreviation (sun|mon|tue|wed|thu|fri|sat)
 *           Each slot:  { label: "Text in cell", type: "class|work|gym|personal" }
 *           Leave a day out (or set to null) for a free slot.
 */

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const SCHEDULE_DATA = [
  {
    time: "7 AM",
    slots: {
      tue: { label: "Microcomputers class",    type: "class" },
      thu: { label: "Microcomputers class",    type: "class" },
    },
  },
  {
    time: "8 AM",
    slots: {
      tue: { label: "Microcomputers class",    type: "class" },
      thu: { label: "Microcomputers class",    type: "class" },
      sun: { label: "Football",                type: "personal" },
    },
  },
  {
    time: "9 AM",
    slots: {
      sun: { label: "Football", type: "personal" },
      mon: { label: "Machine Learning",   type: "class" },
      tue: { label: "Amazon",   type: "work" },
      wed: { label: "Machine Learning",   type: "class" },
      thu: { label: "Amazon",   type: "work" },
      fri: { label: "Amazon",   type: "work" },
    },
  },
  {
    time: "10 AM",
    slots: {
      sun: { label: "Football", type: "personal" },
      mon: { label: "Machine Learning",   type: "class" },
      tue: { label: "Amazon",   type: "work" },
      wed: { label: "Machine Learning",   type: "class" },
      thu: { label: "Amazon",   type: "work" },
      fri: { label: "Amazon",   type: "work" },
    },
  },
  {
    time: "11 AM",
    slots: {
      mon: { label: "Quantum Computing", type: "class" },
      tue: { label: "Amazon", type: "work" },
      wed: { label: "Quantum Computing", type: "class" },
      thu: { label: "Amazon", type: "work" },
      fri: { label: "Amazon", type: "work" },
      sun: { label: "Football", type: "personal" },
    },
  },
  {
    time: "12 PM",
    slots: {
      mon: { label: "Quantum Computing", type: "class" },
      tue: { label: "Amazon", type: "work" },
      wed: { label: "Quantum Computing", type: "class" },
      thu: { label: "Amazon", type: "work" },
      fri: { label: "Amazon", type: "work" },
    },
  },
  {
    time: "1 PM",
    slots: {
      mon: { label: "Microcomputers lab", type: "class" },
      tue: { label: "Amazon", type: "work" },
      wed: { label: "Meeting", type: "class" },
      thu: { label: "Amazon", type: "work" },
      fri: { label: "Amazon", type: "work" },
    },
  },
  {
    time: "2 PM",
    slots: {
        mon: { label: "Microcomputers lab", type: "class" },
        tue: { label: "Amazon", type: "work" },
        wed: { label: "Meeting", type: "class" },
        thu: { label: "Amazon", type: "work" },
        fri: { label: "Amazon", type: "work" },
    },
  },
  {
    time: "3 PM",
    slots: {
      mon: { label: "Distributed Systems",        type: "class" },
      tue: { label: "Amazon", type: "work" },
      wed: { label: "Distributed Systems",        type: "class" },
      thu: { label: "Amazon", type: "work" },
      fri: { label: "Amazon",        type: "work" },
    },
  },
  {
    time: "4 PM",
    slots: {
      mon: { label: "Distributed Systems",        type: "class" },
      tue: { label: "Amazon", type: "work" },
      wed: { label: "Distributed Systems",        type: "class" },
      thu: { label: "Amazon", type: "work" },
    },
  },
  {
    time: "5 PM",
    slots: {
      fri: { label: "Computer Networks Lab", type: "class" },
    },
  },
  {
    time: "6 PM",
    slots: {
      mon: { label: "SS Meeting", type: "class" },
      wed: { label: "SS Meeting", type: "class" },
    },
  },
  {
    time: "7 PM",
    slots: {
         mon: { label: "Computer Networks", type: "class" },
            tue: { label: "Computer Networks", type: "class" },
            thu: { label: "Computer Networks", type: "class" },
    },
  },
  {
    time: "8 PM",
    slots: {
        mon: { label: "Computer Networks", type: "class" },
            tue: { label: "Computer Networks", type: "class" },
            thu: { label: "Computer Networks", type: "class" },
    },
  },
  {
    time: "9 PM",
    slots: {},
  },
];

/* ── Renderer ──────────────────────────────────────────────────────────── */

function buildScheduleTable() {
  const container = document.getElementById("schedule-container");
  if (!container) return;

  // Header row
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  const timeHeader = document.createElement("th");
  timeHeader.className = "time-col";
  timeHeader.textContent = "Time";
  headerRow.appendChild(timeHeader);
  DAYS.forEach((day) => {
    const th = document.createElement("th");
    th.textContent = day;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);

  // Per-column state for binary class-block colour alternation.
  // toggle=true  → busy--class (mid purple, --purple-500)
  // toggle=false → busy--class-alt (light purple, --purple-300)
  const colState = Object.fromEntries(
    DAYS.map((_, i) => [i, { inClass: false, toggle: false }])
  );

  // Body rows
  const tbody = document.createElement("tbody");
  SCHEDULE_DATA.forEach((row) => {
    const tr = document.createElement("tr");

    const timeCell = document.createElement("td");
    timeCell.className = "time-col";
    timeCell.textContent = row.time;
    tr.appendChild(timeCell);

    DAYS.forEach((day, colIdx) => {
      const key = day.toLowerCase();
      const slot = row.slots[key];
      const td = document.createElement("td");
      const state = colState[colIdx];

      if (slot) {
        if (slot.type === "class") {
          // New contiguous block starts → flip the toggle
          if (!state.inClass) {
            state.toggle = !state.toggle;
            state.inClass = true;
          }
          const variant = state.toggle ? "busy--class" : "busy--class-alt";
          td.className = `busy ${variant}`;
        } else {
          state.inClass = false;
          td.className = `busy busy--${slot.type}`;
        }
        td.textContent = slot.label;
      } else {
        state.inClass = false;
      }

      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });

  const table = document.createElement("table");
  table.className = "schedule-table";
  table.appendChild(thead);
  table.appendChild(tbody);

  container.appendChild(table);
}

document.addEventListener("DOMContentLoaded", buildScheduleTable);
