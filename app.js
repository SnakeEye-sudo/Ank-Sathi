"use strict";
(() => {
  // src/app.ts
  (() => {
    const root = document.getElementById("appRoot");
    if (!root) return;
    const STORAGE_KEY = "ank-sathi-profile";
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    root.innerHTML = `
    <div class="app-shell">
      <section class="topbar">
        <div class="brand-orb" aria-hidden="true">8</div>
        <div>
          <p class="eyebrow">Detailed numerology app</p>
          <h1>Ank Sathi</h1>
        </div>
        <div class="top-actions">
          <span class="chip active">Moolank</span>
          <span class="chip">Bhagyank</span>
          <span class="chip">12 month guidance</span>
        </div>
      </section>

      <section class="hero">
        <div class="hero-copy">
          <p class="eyebrow">Naam + janm tithi reading</p>
          <h2>Sirf number nahi, poora ank-profile.</h2>
          <p>Yahan moolank, bhagyank, namank, atmaank, vyaktitva ank, aur personal year standard numerology reduction rules se calculate hote hain. Result ko ek user report ki tarah dikhaya gaya hai taaki app truly useful lage.</p>
        </div>
        <div class="hero-focus">
          <div>
            <p class="eyebrow">Active vibration</p>
            <span class="focus-number" id="heroNumber">--</span>
          </div>
          <p id="heroMeaning">Apna naam aur DOB bharte hi yahan strongest active energy dikhegi.</p>
          <div class="tag-row" id="heroTags"></div>
        </div>
      </section>

      <section class="profile-grid">
        <article class="panel">
          <div>
            <p class="eyebrow">Input</p>
            <h3>Apni detail bharo</h3>
          </div>
          <div class="form-grid">
            <label class="field-group">
              <span class="field-label">Full name</span>
              <input class="text-input" id="nameInput" type="text" placeholder="Sangam Krishna">
            </label>
            <label class="field-group">
              <span class="field-label">Date of birth</span>
              <input class="text-input" id="dobInput" type="date">
            </label>
            <div class="hero-actions">
              <button class="primary-btn" id="calcBtn" type="button">Reading nikalo</button>
              <button class="ghost-btn" id="resetBtn" type="button">Reset</button>
            </div>
          </div>
          <div class="quick-code">
            <p class="eyebrow">Quick code</p>
            <strong id="quickCode">--</strong>
            <p id="quickSummary">Result aate hi yahan aapka short numerology code dikhega.</p>
          </div>
        </article>

        <article class="panel">
          <div>
            <p class="eyebrow">Core numbers</p>
            <h3>Aapka number matrix</h3>
          </div>
          <div class="number-grid" id="numberGrid"></div>
        </article>
      </section>

      <section class="profile-grid">
        <article class="panel">
          <div>
            <p class="eyebrow">Interpretation</p>
            <h3>Aapki vibrations kya bolti hain</h3>
          </div>
          <div class="trait-grid" id="traitGrid"></div>
        </article>

        <article class="panel">
          <div>
            <p class="eyebrow">Method</p>
            <h3>Calculation ka basis</h3>
          </div>
          <div class="method-grid" id="methodGrid"></div>
        </article>
      </section>

      <section class="panel">
        <div>
          <p class="eyebrow">12 month guidance</p>
          <h3>Agle 12 mahino ka ank-flow</h3>
        </div>
        <div class="forecast-grid" id="forecastGrid"></div>
      </section>
    </div>
  `;
    const meanings = {
      1: { title: "Leader", energy: "Initiative, ambition, self-start", strength: "Nayi shuruat aur decision making", caution: "Zyada ego ya impatience se bachna" },
      2: { title: "Peacemaker", energy: "Sensitivity, harmony, partnership", strength: "Rishton ko handle karna aur diplomacy", caution: "Overthinking aur self-doubt se bachna" },
      3: { title: "Creator", energy: "Expression, art, communication", strength: "Creativity aur public charm", caution: "Scattered focus se bachna" },
      4: { title: "Builder", energy: "Discipline, routine, foundation", strength: "Consistency aur practical results", caution: "Rigidity aur overload se bachna" },
      5: { title: "Explorer", energy: "Movement, change, freedom", strength: "Adaptability aur bold shifts", caution: "Restless decisions se bachna" },
      6: { title: "Guardian", energy: "Care, beauty, responsibility", strength: "Family, healing, nurturing", caution: "Har cheez ka bojh akela mat uthao" },
      7: { title: "Seeker", energy: "Depth, study, intuition", strength: "Research aur inner clarity", caution: "Isolation aur trust issues se bachna" },
      8: { title: "Power Maker", energy: "Authority, ambition, material scale", strength: "Execution aur status building", caution: "Control ya harshness se bachna" },
      9: { title: "Humanitarian", energy: "Completion, service, compassion", strength: "Big-picture thinking aur empathy", caution: "Emotional drain se bachna" },
      11: { title: "Intuitive Master", energy: "Inspiration, vision, spiritual sensitivity", strength: "Insight aur powerful intuition", caution: "Nervous overload se bachna" },
      22: { title: "Master Builder", energy: "Vision ko reality me utarna", strength: "Large impact aur disciplined creation", caution: "Pressure aur fear of failure se bachna" },
      33: { title: "Master Teacher", energy: "Healing, devotion, upliftment", strength: "Deep seva aur emotional wisdom", caution: "Self-sacrifice ko limit me rakho" }
    };
    const monthThemes = {
      1: { theme: "Nayi shuruat", advice: "Initiative lo, pending kaam khol do, fresh decision lo." },
      2: { theme: "Sambandh aur patience", advice: "Soft communication rakho, results force mat karo." },
      3: { theme: "Expression aur creativity", advice: "Presentation, networking, content aur art me shine karo." },
      4: { theme: "System aur discipline", advice: "Routine set karo, finances aur planning tidy rakho." },
      5: { theme: "Change aur movement", advice: "Travel, shifts, experimentation ke liye open raho." },
      6: { theme: "Family aur duty", advice: "Ghar, health, beauty aur care-oriented kaam par dhyan do." },
      7: { theme: "Study aur inner work", advice: "Research, exam prep, contemplation aur deep focus best rahega." },
      8: { theme: "Results aur money", advice: "Career, authority, deals aur practical outcomes par \u091C\u094B\u0930 \u0926\u094B." },
      9: { theme: "Release aur completion", advice: "Purane loops band karo, forgive karo, cleanup karo." },
      11: { theme: "Intuitive boost", advice: "Strong ideas ko lightly mat lo, journal aur observe karo." },
      22: { theme: "Big build month", advice: "Long-term project ko structure do aur execution start karo." },
      33: { theme: "Service aur healing", advice: "Dusron ko uplift karte hue apni energy ko bhi protect karo." }
    };
    const methodGrid = document.getElementById("methodGrid");
    const numberGrid = document.getElementById("numberGrid");
    const traitGrid = document.getElementById("traitGrid");
    const forecastGrid = document.getElementById("forecastGrid");
    const heroNumber = document.getElementById("heroNumber");
    const heroMeaning = document.getElementById("heroMeaning");
    const heroTags = document.getElementById("heroTags");
    const quickCode = document.getElementById("quickCode");
    const quickSummary = document.getElementById("quickSummary");
    const nameInput = document.getElementById("nameInput");
    const dobInput = document.getElementById("dobInput");
    function reduceNumber(value) {
      let current = value;
      while (current > 9 && current !== 11 && current !== 22 && current !== 33) {
        current = String(current).split("").reduce((sum, digit) => sum + Number(digit), 0);
      }
      return current;
    }
    function letterValue(char) {
      return (char.charCodeAt(0) - 65) % 9 + 1;
    }
    function cleanName(name) {
      return name.toUpperCase().replace(/[^A-Z]/g, "");
    }
    function nameSum(name, picker) {
      return cleanName(name).split("").filter(picker).reduce((sum, char) => sum + letterValue(char), 0);
    }
    function numberMeaning(value) {
      return meanings[value] || meanings[reduceNumber(value)] || meanings[1];
    }
    function personalYear(month, day, year) {
      const universalYear = reduceNumber(String(year).split("").reduce((sum, digit) => sum + Number(digit), 0));
      return reduceNumber(month + day + universalYear);
    }
    function calculateReading(name, dob) {
      if (!dob) return null;
      const [year, month, day] = dob.split("-").map(Number);
      const allDigitsTotal = dob.replace(/-/g, "").split("").reduce((sum, digit) => sum + Number(digit), 0);
      const nameTotal = nameSum(name, () => true);
      const vowels = nameSum(name, (char) => "AEIOU".includes(char));
      const consonants = nameSum(name, (char) => !"AEIOU".includes(char));
      const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
      const moolank = reduceNumber(day);
      const bhagyank = reduceNumber(allDigitsTotal);
      const namank = reduceNumber(nameTotal || 0);
      const atmaank = reduceNumber(vowels || 0);
      const vyaktitva = reduceNumber(consonants || 0);
      const maturity = reduceNumber(bhagyank + namank);
      const attitude = reduceNumber(day + month);
      return {
        moolank,
        bhagyank,
        namank,
        atmaank,
        vyaktitva,
        maturity,
        attitude,
        personalYear: personalYear(month, day, currentYear)
      };
    }
    function buildForecast(dob, reading) {
      const [, birthMonth, birthDay] = dob.split("-").map(Number);
      const now = /* @__PURE__ */ new Date();
      return Array.from({ length: 12 }, (_, index) => {
        const target = new Date(now.getFullYear(), now.getMonth() + index, 1);
        const yearValue = personalYear(birthMonth, birthDay, target.getFullYear());
        const personalMonthValue = reduceNumber(yearValue + (target.getMonth() + 1));
        const info = monthThemes[personalMonthValue] || monthThemes[reduceNumber(personalMonthValue)];
        return {
          label: new Intl.DateTimeFormat("hi-IN", { month: "long", year: "numeric" }).format(target),
          value: personalMonthValue,
          theme: info.theme,
          advice: info.advice
        };
      });
    }
    function renderMethod() {
      methodGrid.innerHTML = `
      <article class="method-card">
        <p class="micro-label">Moolank</p>
        <strong>Birth day reduce karke</strong>
        <p>Sirf janm ki date ka vibration, jo natural style batata hai.</p>
      </article>
      <article class="method-card">
        <p class="micro-label">Bhagyank</p>
        <strong>Pure DOB digits reduce karke</strong>
        <p>Life path ya destiny flow, long-term direction ke liye.</p>
      </article>
      <article class="method-card">
        <p class="micro-label">Namank</p>
        <strong>Name letters ka total</strong>
        <p>Pythagorean 1-9 mapping se naam ki public vibration.</p>
      </article>
      <article class="method-card">
        <p class="micro-label">12 month</p>
        <strong>Personal year + personal month</strong>
        <p>Har mahine ke liye numerology theme aur practical guidance.</p>
      </article>
    `;
    }
    function renderReading(name, dob) {
      const reading = calculateReading(name, dob);
      if (!reading) return;
      const strongest = [reading.bhagyank, reading.namank, reading.personalYear].sort((a, b) => b - a)[0];
      const mainMeaning = numberMeaning(reading.bhagyank);
      const forecast = buildForecast(dob, reading);
      const nameLabel = name.trim() || "Aap";
      heroNumber.textContent = `${reading.bhagyank}`;
      heroMeaning.textContent = `${nameLabel} ki core life direction ${mainMeaning.title.toLowerCase()} vibration dikhati hai: ${mainMeaning.energy}.`;
      heroTags.innerHTML = `
      <span class="chip active">Moolank ${reading.moolank}</span>
      <span class="chip">Namank ${reading.namank}</span>
      <span class="chip">Personal year ${reading.personalYear}</span>
    `;
      quickCode.textContent = `${reading.moolank} \u2022 ${reading.bhagyank} \u2022 ${reading.namank}`;
      quickSummary.textContent = `${nameLabel} ka short code dikhata hai ki aapka natural mode ${numberMeaning(reading.moolank).title.toLowerCase()} hai, jabki life path ${mainMeaning.title.toLowerCase()} track par chal raha hai.`;
      const cards = [
        ["Moolank", reading.moolank, "Janm ki asli surface energy"],
        ["Bhagyank", reading.bhagyank, "Long-term life path"],
        ["Namank", reading.namank, "Naam ki duniya ko dikhne wali vibration"],
        ["Atmaank", reading.atmaank, "Dil ki andar wali desire"],
        ["Vyaktitva", reading.vyaktitva, "Outer image aur impression"],
        ["Maturity", reading.maturity, "Age ke saath settle hone wala tone"]
      ];
      numberGrid.innerHTML = cards.map(([label, value, note]) => `
      <article class="number-card">
        <p class="micro-label">${label}</p>
        <strong>${numberMeaning(value).title}</strong>
        <span class="number-value">${value}</span>
        <p>${note}</p>
      </article>
    `).join("");
      const traits = [
        {
          label: "Core vibe",
          value: reading.bhagyank,
          text: `${mainMeaning.energy}. Strength: ${mainMeaning.strength}.`
        },
        {
          label: "Relationship style",
          value: reading.atmaank,
          text: `${numberMeaning(reading.atmaank).energy}. Dil ke level par aapko yahi cheez pull karti hai.`
        },
        {
          label: "Public image",
          value: reading.vyaktitva,
          text: `${numberMeaning(reading.vyaktitva).strength}. Log aapko isi lens se padhte hain.`
        },
        {
          label: "Current year focus",
          value: reading.personalYear,
          text: `${monthThemes[reading.personalYear]?.theme || "Special flow"}: ${(monthThemes[reading.personalYear] || monthThemes[reduceNumber(reading.personalYear)]).advice}`
        },
        {
          label: "Attitude number",
          value: reading.attitude,
          text: `${numberMeaning(reading.attitude).energy}. First reaction aur daily tone ko yeh influence karta hai.`
        },
        {
          label: "Watch-out",
          value: strongest,
          text: numberMeaning(strongest).caution
        }
      ];
      traitGrid.innerHTML = traits.map((trait) => `
      <article class="trait-card">
        <p class="micro-label">${trait.label}</p>
        <strong>${numberMeaning(trait.value).title} ${trait.value}</strong>
        <p>${trait.text}</p>
      </article>
    `).join("");
      forecastGrid.innerHTML = forecast.map((month) => `
      <article class="month-card">
        <p class="micro-label">${month.label}</p>
        <strong>Personal month ${month.value}</strong>
        <span class="month-theme">${month.theme}</span>
        <p>${month.advice}</p>
      </article>
    `).join("");
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ name, dob }));
    }
    function seedDefaults() {
      if (nameInput) nameInput.value = saved.name || "Sangam Krishna";
      if (dobInput) dobInput.value = saved.dob || "1995-09-11";
    }
    document.getElementById("calcBtn")?.addEventListener("click", () => {
      renderReading(nameInput?.value || "", dobInput?.value || "");
    });
    document.getElementById("resetBtn")?.addEventListener("click", () => {
      if (nameInput) nameInput.value = "";
      if (dobInput) dobInput.value = "";
      localStorage.removeItem(STORAGE_KEY);
      seedDefaults();
      renderReading(nameInput?.value || "", dobInput?.value || "");
    });
    renderMethod();
    seedDefaults();
    renderReading(nameInput?.value || "", dobInput?.value || "");
  })();
})();
