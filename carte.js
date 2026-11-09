"use strict";

// 1. Enhance the static seasonal lists only when all expected controls exist.
const seasonTabs = document.querySelector(".carte-tabs");
if (seasonTabs) {
  const buttons = Array.from(seasonTabs.querySelectorAll("[data-season]"));
  const panels = buttons.map((button) =>
    document.getElementById(button.getAttribute("aria-controls")),
  );

  if (buttons.length === 4 && panels.every(Boolean)) {
    // 2. Expose tab semantics after enhancement; all dishes are readable without JavaScript.
    seasonTabs.hidden = false;
    seasonTabs.setAttribute("role", "tablist");
    buttons.forEach((button, index) => {
      button.setAttribute("role", "tab");
      panels[index].setAttribute("role", "tabpanel");
      panels[index].setAttribute("aria-labelledby", button.id);
      panels[index].tabIndex = 0;
    });

    // 3. Keep the visible panel, selection state, and keyboard tab stop in sync.
    function selectSeason(selectedIndex, moveFocus = false) {
      buttons.forEach((button, index) => {
        const selected = index === selectedIndex;
        button.setAttribute("aria-selected", String(selected));
        button.tabIndex = selected ? 0 : -1;
        panels[index].hidden = !selected;
      });
      if (moveFocus) buttons[selectedIndex].focus();
    }

    // 4. Support mouse, touch, arrow keys, Home, and End without submitting any forms.
    buttons.forEach((button, index) => {
      button.addEventListener("click", () => selectSeason(index));
      button.addEventListener("keydown", (event) => {
        let nextIndex;
        if (event.key === "ArrowRight") nextIndex = (index + 1) % buttons.length;
        else if (event.key === "ArrowLeft")
          nextIndex = (index + buttons.length - 1) % buttons.length;
        else if (event.key === "Home") nextIndex = 0;
        else if (event.key === "End") nextIndex = buttons.length - 1;
        else return;
        event.preventDefault();
        selectSeason(nextIndex, true);
      });
    });

    // 5. Open autumn first, matching the supplied reference and preserving a predictable default.
    selectSeason(0);
  }
}
