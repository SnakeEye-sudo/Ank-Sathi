(() => {
  const root = document.getElementById("appRoot");
  if (!root) return;

  root.innerHTML = `
    <section class="section-stack">
      <article class="tool-card">
        <div class="toolbar">
          <div>
            <p class="eyebrow">Numerology</p>
            <h3>Birth date aur name ka quick number map</h3>
          </div>
        </div>
        <label class="field-label" for="nameInput">Full name</label>
        <input class="text-input" id="nameInput" type="text" placeholder="Sangam Krishna">
        <label class="field-label" for="dobInput">Date of birth</label>
        <input class="text-input" id="dobInput" type="date">
        <div class="button-row">
          <button class="action-btn primary" id="calcBtn" type="button">Calculate</button>
        </div>
      </article>

      <article class="tool-card">
        <div class="numerology-grid" id="numberGrid"></div>
      </article>
    </section>

    <aside class="section-stack">
      <article class="info-card">
        <p class="eyebrow">Meaning</p>
        <div class="history-grid" id="meaningList"></div>
      </article>
      <article class="info-card">
        <p class="eyebrow">Method</p>
        <div class="history-grid">
          <div class="history-card"><strong>Life path</strong><span class="muted">DOB ke saare digits reduce karke.</span></div>
          <div class="history-card"><strong>Name number</strong><span class="muted">A1-Z26 style letters ko reduce karke.</span></div>
          <div class="history-card"><strong>Attitude</strong><span class="muted">Birth month + birth day.</span></div>
        </div>
      </article>
    </aside>
  `;

  const meanings = {
    1: "Leadership aur direct action ka number.",
    2: "Harmony, partnership, aur diplomacy.",
    3: "Creativity, expression, aur visibility.",
    4: "Discipline, routine, aur structure.",
    5: "Movement, change, aur freedom.",
    6: "Care, responsibility, aur family focus.",
    7: "Reflection, inner study, aur depth.",
    8: "Ambition, authority, aur material push.",
    9: "Compassion, completion, aur service."
  };

  const nameInput = document.getElementById("nameInput");
  const dobInput = document.getElementById("dobInput");
  const numberGrid = document.getElementById("numberGrid");
  const meaningList = document.getElementById("meaningList");

  function reduceNumber(value) {
    let current = value;
    while (current > 9 && current !== 11 && current !== 22) {
      current = String(current).split("").reduce((sum, digit) => sum + Number(digit), 0);
    }
    return current;
  }

  function nameToNumber(name) {
    const clean = name.toUpperCase().replace(/[^A-Z]/g, "");
    const total = clean.split("").reduce((sum, char) => sum + (char.charCodeAt(0) - 64), 0);
    return reduceNumber(total || 0);
  }

  function calculate() {
    const dob = dobInput.value;
    if (!dob) return;
    const digits = dob.replace(/-/g, "");
    const lifePath = reduceNumber(digits.split("").reduce((sum, digit) => sum + Number(digit), 0));
    const [, month, day] = dob.split("-").map(Number);
    const birthDay = reduceNumber(day);
    const attitude = reduceNumber(month + day);
    const nameNumber = nameToNumber(nameInput.value || "");

    const cards = [
      ["Life path", lifePath],
      ["Birth day", birthDay],
      ["Attitude", attitude],
      ["Name number", nameNumber || "--"]
    ];
    numberGrid.innerHTML = cards.map(([label, value]) => `
      <div class="stat-box">
        <p class="mini-label">${label}</p>
        <strong>${value}</strong>
      </div>
    `).join("");

    const distinct = [...new Set([lifePath, birthDay, attitude, nameNumber].filter(Boolean))];
    meaningList.innerHTML = distinct.map((num) => `
      <div class="history-card">
        <strong>Number ${num}</strong>
        <span class="muted">${meanings[num] || "Master vibration ya custom pattern."}</span>
      </div>
    `).join("");
  }

  document.getElementById("calcBtn")?.addEventListener("click", calculate);

  dobInput.value = "1998-01-01";
  nameInput.value = "Sangam Krishna";
  calculate();
})();