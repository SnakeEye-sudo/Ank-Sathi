/**
 * Ank-Sathi | Numerology Engine v2.0
 * Pure Logic & Real Calculations based on Chaldean & Vedic systems.
 * Author: Er. Sangam Krishna (Aapka-Sathi Family)
 */

const CHALDEAN_MAP = {
  'A': 1, 'I': 1, 'J': 1, 'Q': 1, 'Y': 1,
  'B': 2, 'K': 2, 'R': 2,
  'C': 3, 'G': 3, 'L': 3, 'S': 3,
  'D': 4, 'M': 4, 'T': 4,
  'E': 5, 'H': 5, 'N': 5, 'X': 5,
  'U': 6, 'V': 6, 'W': 6,
  'O': 7, 'Z': 7,
  'F': 8, 'P': 8
};

const NUM_DATA = {
  1: {
    traits: "Surya (Sun) - Leadership, Ambition, Vision.",
    meaning: "Aap ek swabhavik neta (leader) hain. Aapka vyaktitva swatantra aur prabhavshali hai. Aap naye raste banane mein vishwas rakhte hain.",
    destiny: "Aapka jeevan safalta aur shakti ki taraf ishara karta hai. Aapko bade faisle lene mein saksham banaya gaya hai.",
    prediction: "Saurya shakti aapke saath hai. Nayi shuruat ke liye yeh samay uttam hai."
  },
  2: {
    traits: "Chandra (Moon) - Intuition, Harmony, Sensitivity.",
    meaning: "Aap bhavuk (emotional) aur sah-yog (cooperative) karne wale vyakti hain. Aapko shanti aur santulan pasand hai.",
    destiny: "Aapka bhagya dusron ke saath milkar kaam karne mein hai. Aap ek acche salahkaar (advisor) ban sakte hain.",
    prediction: "Dharya (patience) rakhein. Aapke rishte aur intuition aapka मार्गदर्शन karenge."
  },
  3: {
    traits: "Guru (Jupiter) - Expression, Growth, Creativity.",
    meaning: "Aap buddhiman, gyanwan aur rachanatmak (creative) hain. Aapka abhivyakti ka tareeka dusron ko prabhavit karta hai.",
    destiny: "Vistar aur gyan aapke jeevan ka mool mantra hai. Aap apne gyan se duniya badalne ki kshamta rakhte hain.",
    prediction: "Khush-mizaaj rahein. Aapki rachanatmakta aapko nayi unchaiyon par le jayegi."
  },
  4: {
    traits: "Rahu - Discipline, Stability, Practicality.",
    meaning: "Aap mehnati aur vyavaharik (practical) hain. Aap har kaam ko vyavasthit (organized) dhang se karna pasand karte hain.",
    destiny: "Aapka jeevan adhaar (foundation) banane ke liye hai. Aapki mehnat hi aapki asli pehchan hai.",
    prediction: "Thoda sakht rahein par badlav ke liye taiyaar rahein. Safalta mehnat se hi milegi."
  },
  5: {
    traits: "Budh (Mercury) - Freedom, Change, Versatility.",
    meaning: "Aap ek adventurer aur tezz dimaag wale vyakti hain. Aapko badlav (change) aur azadi pasand hai.",
    destiny: "Sanchar (communication) aur vyapaar aapke bhagya mein hai. Aap har paristhiti mein dhalne ke liye bane hain.",
    prediction: "Naye vichaar aur safar aapko nayi disha denge. Khule dimaag se sochein."
  },
  6: {
    traits: "Shukra (Venus) - Love, Responsibility, Art.",
    meaning: "Aap ek dayalu (compassionate) aur zimmedar vyakti hain. Aapko sundarta aur parivaar se prem hai.",
    destiny: "Seva aur suvidha aapke jeevan ka hissa hain. Aap dusron ko sukoon dene ke liye bane hain.",
    prediction: "Apne apno ka dhyan rakhein. Prem aur kala aapke jeevan mein rounak layenge."
  },
  7: {
    traits: "Ketu - Introspection, Mystery, Spirituality.",
    meaning: "Aap ek gambhir chintak aur gyaani hain. Aapko vishleshan (analysis) aur akelapan (solitude) pasand hai.",
    destiny: "Aadhyatmikta aur Gehra gyan aapka rasta hai. Aap duniya ke piche ka satya khojne ke liye bane hain.",
    prediction: "Antar-man ki awaaz sunein. Vishleshan aapke liye naye dwar kholega."
  },
  8: {
    traits: "Shani (Saturn) - Ambition, Authority, Power.",
    meaning: "Aap ek shaktishali aur anushasit (disciplined) vyakti hain. Aapka dhyan bade lakshya aur nyay par hota hai.",
    destiny: "Satta aur prabandhan (management) aapke bhagya mein hai. Karmo ka phal aapko avashya milega.",
    prediction: "Nyay priya banein. Aapki mehnat aur dhairya aapko shikhar par pahunchayega."
  },
  9: {
    traits: "Mangal (Mars) - Humanity, Courage, Completion.",
    meaning: "Aap ek niswarth sevak aur saahasi (courageous) vyakti hain. Aap manavta ke liye kaam karna pasand karte hain.",
    destiny: "Parivartan aur samarpan aapka mission hai. Aap ek chakra ko pura karke naya aarambh karne ke liye bane hain.",
    prediction: "Apne saahas ka upyog dusron ki madad ke liye karein. Yeh samay tyag aur unchai ka hai."
  }
};

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Helper to reduce number to single digit (root)
function getRoot(num) {
  while (num > 9) {
    num = num.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
  }
  return num;
}

// Numerology Calculations
function calculateNumerology(name, dobStr) {
  const dob = new Date(dobStr);
  const day = dob.getDate();
  const month = dob.getMonth() + 1;
  const year = dob.getFullYear();

  // 1. Moolank (Psychic)
  const moolank = getRoot(day);

  // 2. Bhagyank (Destiny)
  const fullDOBSum = day + month + year;
  const bhagyank = getRoot(fullDOBSum);

  // 3. Namank (Name) - Chaldean
  let namankSum = 0;
  name.toUpperCase().split('').forEach(char => {
    if (CHALDEAN_MAP[char]) {
      namankSum += CHALDEAN_MAP[char];
    }
  });
  const namank = getRoot(namankSum);

  // 4. Personal Year for 2026 (based on system date)
  const currentYear = 2026;
  const personalYear = getRoot(day + month + currentYear);

  return { moolank, bhagyank, namank, personalYear, day, month, currentYear };
}

// UI Controllers
const inputScreen = document.getElementById('input-screen');
const reportScreen = document.getElementById('report-screen');
const form = document.getElementById('numerology-form');
const backBtn = document.getElementById('backBtn');
const menuToggle = document.getElementById('menuToggle');
const appDrawer = document.getElementById('appDrawer');
const drawerOverlay = document.getElementById('drawerOverlay');
const closeDrawer = document.getElementById('closeDrawer');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('fullName').value;
  const dob = document.getElementById('birthDate').value;

  if (name && dob) {
    const report = calculateNumerology(name, dob);
    generateReportUI(name, report);
    inputScreen.classList.remove('active');
    reportScreen.classList.add('active');
    window.scrollTo(0,0);
  }
});

backBtn.addEventListener('click', () => {
  reportScreen.classList.remove('active');
  inputScreen.classList.add('active');
});

menuToggle.addEventListener('click', () => {
  appDrawer.classList.add('open');
  drawerOverlay.classList.add('active');
});

[closeDrawer, drawerOverlay].forEach(el => el.addEventListener('click', () => {
  appDrawer.classList.remove('open');
  drawerOverlay.classList.remove('active');
}));

function generateReportUI(name, data) {
  document.getElementById('reportNameHeader').textContent = name;
  
  // Update Numbers
  document.getElementById('moolankVal').textContent = data.moolank;
  document.getElementById('moolankShort').textContent = NUM_DATA[data.moolank].traits;
  
  document.getElementById('bhagyankVal').textContent = data.bhagyank;
  document.getElementById('bhagyankShort').textContent = NUM_DATA[data.bhagyank].traits;
  
  document.getElementById('namankVal').textContent = data.namank;
  document.getElementById('namankShort').textContent = NUM_DATA[data.namank].traits;

  // Analysis Content
  const analysisHTML = `
    <p><strong>Moolank ${data.moolank}:</strong> ${NUM_DATA[data.moolank].meaning}</p>
    <br>
    <p><strong>Bhagyank ${data.bhagyank}:</strong> ${NUM_DATA[data.bhagyank].destiny}</p>
    <br>
    <p><strong>Namank ${data.namank}:</strong> Aapke naam ki vibration aapke ${NUM_DATA[data.namank].traits.split('-')[0]} ko darshata hai.</p>
  `;
  document.getElementById('fullAnalysis').innerHTML = analysisHTML;

  // 12-Month Timeline
  const timeline = document.getElementById('futureTimeline');
  timeline.innerHTML = '';
  
  // Start from current month (March 2026 is system context)
  let startMonth = 2; // Index for March
  let currentYear = 2026;

  for (let i = 0; i < 12; i++) {
    const monthIdx = (startMonth + i) % 12;
    const yearMod = Math.floor((startMonth + i) / 12);
    const displayYear = currentYear + yearMod;
    
    // Personal Month Calculation: Personal Year + Month Number
    const pMonth = getRoot(data.personalYear + (monthIdx + 1));
    
    const monthDiv = document.createElement('div');
    monthDiv.className = 'month-item';
    monthDiv.innerHTML = `
      <div class="month-header">
        <span class="month-name">${MONTHS[monthIdx]} ${displayYear}</span>
        <span class="month-tag">Vibration ${pMonth}</span>
      </div>
      <p class="month-text">${getForecast(pMonth)}</p>
    `;
    timeline.appendChild(monthDiv);
  }
}

function getForecast(num) {
  const forecasts = {
    1: "Naye vichaar aur projects shuru karne ke liye behtareen samay.",
    2: "Sajidhaari (partnership) aur sabrr (patience) ka mahina.",
    3: "Social rehne aur apni creative side dikhane ka mauka.",
    4: "Kadi mehnat aur apne kaam ko vyavasthit karne ka samay.",
    5: "Naye badlav aur travel ke mauke mil sakte hain.",
    6: "Parivaar aur ghar ki zimmedariyon par dhyan dega.",
    7: "Sikhte rahiye aur khud par vishleshan karein.",
    8: "Apne carrier aur dhan (finance) par focus karne ka samay.",
    9: "Purane kaamo ko khatam karke naya rasta dekhne ka mahina."
  };
  return forecasts[num];
}

// Download/Share (Simulated)
document.getElementById('downloadBtn').onclick = () => {
    alert("Premium Feature: Aapka PDF report taiyaar ho raha hai aur jald hi aapke phone mein save ho jayega. (Simulation Mode)");
};
