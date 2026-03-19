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
    meaning: "<strong>Moolank 1 (Sun):</strong> Aap ek swabhavik neta (leader) hain. Aapka vyaktitva Surya ki tarah tez aur prabhavshali hai. Aap kisi ke niche kaam karne se behtar khud ka rasta banana pasand karte hain. Aapke andar koot-koot kar atmavishwas bhara hai. Aapke liye leadership natural hai, aur naye projects ko lead karna aapki taakat hai. Bas dhyan rakhein ki kabhi-kabhi aapka yeh self-confidence 'Aham' (Ego) mein na badal jaye.",
    destiny: "<strong>Bhagyank 1:</strong> Aapka jeevan safalta aur shakti ki taraf ishara karta hai. Aapko bade faisle lene aur bade organisations ko manage karne ke liye banaya gaya hai. Aapka bhagya tab chamakta hai jab aap apne dar se aage badhkar naya kaam shuru karte hain. 28 se 35 saal ki umra ke beech aapko jeevan mein badi unchaiyan milne ke prabal yog hote hain.",
    prediction: "Saurya shakti aapke saath hai. Nayi shuruat ke liye yeh samay uttam hai."
  },
  2: {
    traits: "Chandra (Moon) - Intuition, Harmony, Sensitivity.",
    meaning: "<strong>Moolank 2 (Moon):</strong> Aap ek behad bhavuk (emotional) aur sah-yog (cooperative) karne wale vyakti hain. Aapka svabhav shanti priya hai aur aap rishton ki gehraiyon ko samajhte hain. Aapke pas ek adbhut intuition (antar-man ki shakti) hai jo aapko sahi rasta dikhati hai. Aap team work mein behad safal rehte hain kyunki aap logon ko jodna jante hain. Thoda sa dhyan apne mood swings par rakhein.",
    destiny: "<strong>Bhagyank 2:</strong> Aapka bhagya tab chamakta hai jab aap doosro ki madad karte hain ya kisi ke saath milkar kaam karte hain. Aap ek behtareen mediator, diplomat ya advisor ban sakte hain. Aapke jeevan mein shanti aur prem hamesha priority par rehte hain. Sahi partner ka saath aapke bhagya ko char chand laga dega.",
    prediction: "Dharya (patience) rakhein. Aapke rishte aur intuition aapka मार्गदर्शन karenge."
  },
  3: {
    traits: "Guru (Jupiter) - Expression, Growth, Creativity.",
    meaning: "<strong>Moolank 3 (Jupiter):</strong> Aap buddhiman, gyanwan aur rachanatmak (creative) hain. Aapka abhivyakti ka tareeka dusron ko prabhavit karta hai. Aap ek acche varta-kaar (communicator) hain aur aapko logon se milna-julna pasand hai. Aap hamesha kuch naya sikhne ke liye taiyaar rehte hain. Aapka optimism (sakaratmakta) hi aapki sabse badi taakat hai jo kathin samay mein bhi aapko khush rakhti hai.",
    destiny: "<strong>Bhagyank 3:</strong> Vistar aur gyan aapke jeevan ka mool mantra hai. Aap apne gyan aur creativity se duniya badalne ki kshamta rakhte hain. Aapko shiksha (education), kala (art) ya sanchar ke kshetra mein badi safalta milti hai. Aapka bhagya aapko hamesha aise logo se milwayega jo aapke growth mein madadgar honge.",
    prediction: "Khush-mizaaj rahein. Aapki rachanatmakta aapko nayi unchaiyon par le jayegi."
  },
  4: {
    traits: "Rahu - Discipline, Stability, Practicality.",
    meaning: "<strong>Moolank 4 (Rahu):</strong> Aap mehnati aur vyavaharik (practical) hain. Aap har kaam ko vyavasthit (organized) dhang se karna pasand karte hain. Aapke liye 'discipline' aur 'logic' sabse upar hai. Aap shortcuts ki jagah kadi mehnat aur sahi tareeke पर vishwas rakhte hain. Aap ek acche yojna-kar (planner) hain jo har cheez ki gehrai tak jaate hain. Kabhi-kabhi aap thode stubbon (ziddi) ho sakte hain, jise balance karna zaroori hai.",
    destiny: "<strong>Bhagyank 4:</strong> Aapka jeevan ek mazboot adhaar (foundation) banane ke liye hai. Aapki mehnat hi aapki asli pehchan hai. Bhale hi safalta thodi deri se mile, par jo milega wo pakka aur permanent hoga. Aap system ko sudharne aur chizon ko build karne ke liye bane hain. Aapka bhagya aapke practical dimaag mein chhupa hai.",
    prediction: "Thoda sakht rahein par badlav ke liye taiyaar rahein. Safalta mehnat se hi milegi."
  },
  5: {
    traits: "Budh (Mercury) - Freedom, Change, Versatility.",
    meaning: "<strong>Moolank 5 (Mercury):</strong> Aap ek adventurer aur tezz dimaag wale vyakti hain. Aapko badlav (change) aur azadi pasand hai. Aap naye logon se milna, naye jagah jaana aur nayi chizon ko explore karna pasand karte hain. Aapka communication skill kamaal ka hai aur aap kisi ko bhi apni baton se prabhavit kar sakte hain. Aapka dimaag computer ki tarah tezz chalta hai jo pal bhar mein solution nikal leta hai.",
    destiny: "<strong>Bhagyank 5:</strong> Sanchar (communication), sales aur vyapaar aapke bhagya mein hai. Aap har paristhiti mein dhalne ke liye bane hain. Aapke jeevan mein bohot saare badlav aayenge, lekin har badlav aapke liye naye avsar (opportunities) lekar aayega. Aap 50 ki umra tak bhi dil se jawaan aur energetic rahenge.",
    prediction: "Naye vichaar aur safar aapko nayi disha denge. Khule dimaag se sochein."
  },
  6: {
    traits: "Shukra (Venus) - Love, Responsibility, Art.",
    meaning: "<strong>Moolank 6 (Venus):</strong> Aap ek dayalu (compassionate) aur zimmedar vyakti hain. Aapko sundarta aur parivaar se asimit prem hai. Aapka svabhav hamesha dusron ka dhyan rakhne ka hota hai. Aap ghar ko swarg banane aur rishton ko sanjona jante hain. Log aapke paas sukoon aur sahi salah lene ke liye aate hain. Aapme ek artistic quality hai jo aapke kapdon se lekar aapke kaam tak dikhti hai.",
    destiny: "<strong>Bhagyank 6:</strong> Seva aur suvidha aapke jeevan ka hissa hain. Aap dusron ko sukoon dene aur luxury enjoy karne ke liye bane hain. Aapka bhagya tab chamakta hai jab aap apne parivaar ya community ke liye kuch karte hain. Aapko life mein hamesha pyar aur samman milta rahega.",
    prediction: "Apne apno ka dhyan rakhein. Prem aur kala aapke jeevan mein rounak layenge."
  },
  7: {
    traits: "Ketu - Introspection, Mystery, Spirituality.",
    meaning: "<strong>Moolank 7 (Ketu):</strong> Aap ek gambhir chintak aur gyaani hain. Aapko vishleshan (analysis) aur akelapan (solitude) pasand hai. Aapke liye akelapan bojh nahi balki taakat hai. Aap surface ki chizon se santusht nahi hote aur hamesha gehrai (depth) ki talash karte hain. Aapki research quality aur observation power aapko dusron se alag banati hai. Aap spiritual aur analytical dimaag ka ek anokha mishran hain.",
    destiny: "<strong>Bhagyank 7:</strong> Aadhyatmikta (Spirituality) aur Gehra gyan aapka rasta hai. Aap duniya ke piche ka satya khojne ke liye bane hain. Aap science, meditation ya kisi bhi technical research mein kamaal kar sakte hain. Aapka bhagya aapko hamesha satya ki taraf le jayega, chahe wo kitna bhi chhupa kyun na ho.",
    prediction: "Antar-man ki awaaz sunein. Vishleshan aapke liye naye dwar kholega."
  },
  8: {
    traits: "Shani (Saturn) - Ambition, Authority, Power.",
    meaning: "<strong>Moolank 8 (Saturn):</strong> Aap ek shaktishali, anushasit (disciplined) aur dhairya-wan vyakti hain. Aapka dhyan bade lakshya aur nyay par hota hai. Aapko life mein kadi chounatiyan (challenges) mil sakti hain par wahi aapko ek resilient (mazboot) insaan banati hain. Aap authority aur power handle karne ke liye bane hain. Aap dikhawe mein kam aur result-oriented kaam mein zyada vishwas rakhte hain.",
    destiny: "<strong>Bhagyank 8:</strong> Satta, prabandhan (management) aur finance aapke bhagya mein hai. Aapka bhagya thoda deri se chamakta hai par jab chamakta hai to koi use rok nahi sakta. Karmo ka phal aapko avashya milega. Aap 'Karm-Yogi' hain aur aapka status mehnat se banega.",
    prediction: "Nyay priya banein. Aapki mehnat aur dhairya aapko shikhar par pahunchayega."
  },
  9: {
    traits: "Mangal (Mars) - Humanity, Courage, Completion.",
    meaning: "<strong>Moolank 9 (Mars):</strong> Aap ek niswarth sevak aur saahasi (courageous) vyakti hain. Aap manavta ke liye kaam karna pasand karte hain. Aapke andar ek 'warrior spirit' hai jo kisi bhi musibat se darne nahi deti. Aap dusron ki madad karne ke liye hamesha taiyaar rehte hain. Aapka gussa thoda tezz ho sakta hai par aapka dil saaf hai. Aap ek sache dost aur protector hain.",
    destiny: "<strong>Bhagyank 9:</strong> Parivartan aur samarpan aapka mission hai. Aap ek purane pattern ko khatam karke naya rasta dikhane ke liye bane hain. Social service, justice ya leadership roles mein aapka bhagya bohot tezz hota hai. Aapko duniya mein bada badlav lane ka ashirwad mila hai.",
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
    <div class="analysis-section">
      <p>${NUM_DATA[data.moolank].meaning}</p>
    </div>
    <div class="analysis-section" style="margin-top: 20px;">
      <p>${NUM_DATA[data.bhagyank].destiny}</p>
    </div>
    <div class="analysis-section" style="margin-top: 20px;">
      <p><strong>Namank ${data.namank}:</strong> Aapke naam ki vibration aapke <strong>${NUM_DATA[data.namank].traits.split('-')[0]}</strong> gunon ko tezz karti hai. Iska matlab hai ki aapka naam aapke bhagya aur vyaktitva ke beech ek mazboot pul (bridge) ka kaam kar raha hai. Yeh vibration aapko smaaj mein ek vishisht pehchan dilane mein madadgar sabit hogi.</p>
    </div>
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
    1: "<strong>Naya Aarambh aur Shakti:</strong> Yeh mahina naye vichaar aur projects shuru karne ke liye behtareen hai. Aapke andar ek nayi urja (energy) hogi jo aapko lead lene ke liye uksayegi. Agar aap kuch naya kaam shuru karna chahte hain, to abhi sahi samay hai. Aapka atmavishwas charam par hoga.",
    2: "<strong>Dharya aur Rishte:</strong> Yeh mahina sabrr (patience) aur partnership ka hai. Is waqt jaldbazi na karein. Logo ke saath mil-kar kaam karne se hi safalta milegi. Rishton mein thodi garma-garmi ho sakti hai, isliye diplomatically react karein. Intuition par bharosa rakhein.",
    3: "<strong>Rachanatmakta aur Khushi:</strong> Yeh mahina bohot hi light aur creative hoga. Social life active rahegi aur aap naye logon se milenge. Apne thoughts ko khulkar express karein. Travel ke mauke mil sakte hain. Kaam ke saath-saath thoda enjoy karne ka bhi mahina hai.",
    4: "<strong>Kadi Mehnat aur Focus:</strong> Yeh mahina thoda heavy ho sakta hai kyunki focus kadi mehnat aur discipline par hoga. Short-cuts na maarein. Jo bhi build karna hai uski foundation mazboot karein. Financial planning aur management ke liye uttam samay hai.",
    5: "<strong>Badlav aur Azadi:</strong> Yeh mahina aapko thoda restless bana sakta hai kyunki naye badlav (changes) aane wale hain. Nayi opportunities milegi jisse aapka routine change hoga. Networking aur communication ke liye bohot accha waqt hai. Variety ko enjoy karein.",
    6: "<strong>Zimmedari aur Harmony:</strong> Yeh mahina ghar, parivaar aur rishton ka hai. Aapka dhyan home improvement aur apno ki seva par rahega. Romantically bhi yeh mahina accha ho sakta hai. Zimmedariyan badhengi par aap inhe khushi se nibhayenge.",
    7: "<strong>Aatm-Chintan aur Research:</strong> Yeh mahina thoda shaant rehne aur 'Inner-Self' ko janne ka hai. Surface level par bohot growth nahi dikhegi par andruni taur par aap seekhenge. Meditation aur technical research ke liye best time hai. Publicly thoda light rahein.",
    8: "<strong>Power aur Financial Gains:</strong> Yeh mahina carrier aur paise ke liye bohot positive hai. Aapne jo pichle mahino mein mehnat ki thi, uska phal milne ka samay aa gaya hai. Authority aur management roles mein aapka dabdaba rahega. Business deals final ho sakti hain.",
    9: "<strong>Completion aur Philanthropy:</strong> Yeh mahina purane cycles ko band karne ka hai. Jo bhi cheezein aapke liye ab kaam nahi kar rahi, unhe chhod de. Dusron ki madad (charity) karne se aapko mansik shanti milegi. Ek naya chapter shuru karne se pehle puraane bojh utar dein."
  };
  return forecasts[num];
}

// Download/Share (Simulated)
document.getElementById('downloadBtn').onclick = () => {
    alert("Premium Feature: Aapka PDF report taiyaar ho raha hai aur jald hi aapke phone mein save ho jayega. (Simulation Mode)");
};
