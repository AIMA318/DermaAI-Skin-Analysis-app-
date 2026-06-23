// =====================================================
//  DermAI – Skin Care Analysis App
//  JavaScript File (script.js)
//  Subject: Advanced Computer Programming
//  OOP Concepts: Encapsulation, Inheritance,
//                Polymorphism, Abstraction
//  DSA Concepts: HashMap, Stack, O(n) Array Analysis
// =====================================================

// ── Particle Animation (Visual Effect) ──
(function createParticles() {
  const container = document.getElementById('particles');
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'pt';
    p.style.cssText = `
      left:${Math.random() * 100}%;
      width:${2 + Math.random() * 4}px;
      height:${2 + Math.random() * 4}px;
      animation-delay:${Math.random() * 16}s;
      animation-duration:${10 + Math.random() * 12}s;
      opacity:${0.1 + Math.random() * 0.3}
    `;
    container.appendChild(p);
  }
})();

// =====================================================
//  DSA: HASH MAP — Product Database  (O(1) lookup)
// =====================================================
const PRODUCT_DB = {
  oily: {
    facewash: {
      name: "MandelAC Face Wash",
      brand: "Jenpharm",
      url: "https://jenpharm.com/products/mandelac-facewash",
      desc: "Pakistan's #1 anti-acne face wash with 3% Mandelic Acid. Controls oil, reduces dark spots & post-acne marks, gently exfoliates without stripping moisture.",
      ing: ["Mandelic Acid 3%", "Aloe Vera", "Decyl Glucoside", "Glycerin"],
      use: ["Morning & evening", "Pea-sized amount on damp skin, 30s", "Rinse with cool water", "Follow with oil-free moisturizer"]
    },
    moisturizer: {
      name: "Dermive Oil Free Moisturizer",
      brand: "Jenpharm",
      url: "https://jenpharm.com/collections/skin-care",
      desc: "Best-selling lightweight ceramide moisturizer for oily skin. Non-comedogenic — hydrates without clogging pores. Niacinamide minimizes pores.",
      ing: ["Ceramides", "Hyaluronic Acid", "Niacinamide", "Glycerin"],
      use: ["Small amount after cleansing", "Morning & night", "Safe for daily oily skin use"]
    },
    sunscreen: {
      name: "Sheer SPF Sunscreen (Matte)",
      brand: "Organic Travellers",
      url: "https://organictraveller.store/collections/all-skincare",
      desc: "Lightweight matte-finish sunscreen for oily skin. Broad-spectrum UV protection with zero greasiness or white cast.",
      ing: ["Broad Spectrum SPF", "Zinc Oxide", "Niacinamide", "Silica"],
      use: ["15 min before sun exposure", "Last AM step", "Reapply every 2-3 hours outdoors"]
    }
  },
  dry: {
    facewash: {
      name: "Dermive Moisturizing Wash",
      brand: "Jenpharm",
      url: "https://jenpharm.com/products/dermive-moisturizing-wash",
      desc: "Ultra-gentle barrier-repairing cleanser for dry skin. Cleanses while providing deep hydration — no tight feeling after wash.",
      ing: ["Ceramides", "Fatty Acids", "Glycerin", "Allantoin", "Soothing Botanicals"],
      use: ["Morning & evening", "Gentle massage on dry skin", "Lukewarm water rinse", "Moisturize on damp skin immediately"]
    },
    moisturizer: {
      name: "Moisturizing Cream (Dry Skin)",
      brand: "CeraVe",
      url: "https://www.cerave.com/skincare/moisturizers/moisturizing-cream",
      desc: "Dermatologist-recommended rich ceramide cream. Restores skin barrier and locks in moisture for 24 hours.",
      ing: ["Ceramides 1,3,6-II", "Hyaluronic Acid", "Petrolatum", "Glycerin"],
      use: ["Morning & night", "Layer under sunscreen in AM", "Use on face and body"]
    },
    sunscreen: {
      name: "Moisturizing Lotion SPF 30",
      brand: "CeraVe",
      url: "https://www.cerave.com/suncare",
      desc: "Hydrating SPF 30 that doubles as a moisturizer. Ceramides for barrier protection — ideal for dry skin.",
      ing: ["SPF 30 Broad Spectrum", "Ceramides", "Hyaluronic Acid", "Niacinamide"],
      use: ["Every morning, final AM step", "Reapply as needed"]
    }
  },
  combination: {
    facewash: {
      name: "Maxdif Brightening Face Wash",
      brand: "Jenpharm",
      url: "https://jenpharm.com/products/maxdif-skin-brightening-facewash",
      desc: "Clinically proven brightening cleanser. Unifies tone, reduces dark spots — 97% users saw brighter skin.",
      ing: ["Brightening Complex", "Mandelic Acid", "Vitamin C", "Aloe Vera"],
      use: ["AM & PM", "Gentle massage 30s", "Lukewarm water rinse", "Pair with Maxdif Cream"]
    },
    moisturizer: {
      name: "B3 Pore Erasing Moisturizer",
      brand: "Organic Travellers",
      url: "https://organictraveller.store/collections/all-skincare",
      desc: "Niacinamide moisturizer balancing oily T-zone while hydrating dry patches. Minimizes enlarged pores effectively.",
      ing: ["Niacinamide (B3)", "Hyaluronic Acid", "Argan Oil", "Aloe Vera"],
      use: ["After cleansing", "More on dry cheeks, less on T-zone", "Follow with sunscreen"]
    },
    sunscreen: {
      name: "Spectra Matt SPF 40+",
      brand: "Jenpharm",
      url: "https://jenpharm.com/collections/skin-care",
      desc: "Shine-free SPF 40+ by Jenpharm. Zero white cast, perfect matte finish for combination skin.",
      ing: ["SPF 40+ Broad Spectrum", "Zinc Oxide", "Titanium Dioxide", "Vitamin E"],
      use: ["Every morning after moisturizer", "Blend evenly", "Reapply every 2 hours outdoors"]
    }
  },
  acne: {
    facewash: {
      name: "MandelAC Face Wash (Anti-Acne)",
      brand: "Jenpharm",
      url: "https://jenpharm.com/products/mandelac-facewash",
      desc: "Clinical anti-acne face wash with 3% Mandelic Acid. Treats active breakouts, prevents new pimples, fades post-acne dark marks.",
      ing: ["Mandelic Acid 3%", "Aloe Vera", "Decyl Glucoside", "Glycerin"],
      use: ["Morning & evening", "Gentle massage — do NOT scrub", "Pat dry", "Always apply SPF daytime"]
    },
    moisturizer: {
      name: "Acne Calming Moisturizer",
      brand: "Organic Travellers",
      url: "https://organictraveller.store/collections/all-skincare",
      desc: "Non-comedogenic soothing moisturizer. Calms redness & inflammation. Centella & Zinc formula won't clog pores.",
      ing: ["Centella Asiatica", "Niacinamide", "Zinc", "Aloe Vera", "Salicylic Acid"],
      use: ["Thin layer after cleansing", "Morning & night", "Avoid eye area"]
    },
    sunscreen: {
      name: "Spectra Matt SPF 40",
      brand: "Jenpharm",
      url: "https://jenpharm.com/collections/skin-care",
      desc: "Oil-free SPF essential for acne skin — UV worsens dark marks. Matte formula won't trigger breakouts.",
      ing: ["SPF 40 Broad Spectrum", "Zinc Oxide", "Niacinamide", "Matte Agents"],
      use: ["Every morning — non-negotiable", "Prevents marks darkening", "Reapply every 2-3 hours"]
    }
  },
  pigmentation: {
    facewash: {
      name: "Maxdif Brightening Face Wash",
      brand: "Jenpharm",
      url: "https://jenpharm.com/products/maxdif-skin-brightening-facewash",
      desc: "Brightening cleanser targeting hyperpigmentation, dark spots & uneven tone. Clinically proven formula.",
      ing: ["Brightening Complex", "Mandelic Acid", "Vitamin C", "Aloe Vera"],
      use: ["Twice daily", "60s massage on damp skin", "Pair with Maxdif Cream for max results"]
    },
    moisturizer: {
      name: "Maxdif Brightening Cream",
      brand: "Jenpharm",
      url: "https://jenpharm.com/collections/skin-care",
      desc: "Pakistan's No.1 brightening cream. Reduces dark patches & hyperpigmentation. 97% success rate.",
      ing: ["Alpha Arbutin", "Niacinamide", "Vitamin C", "Kojic Acid", "Ceramides"],
      use: ["Morning & night after cleansing", "Must wear SPF when using", "4-6 weeks for visible results"]
    },
    sunscreen: {
      name: "Spectra Block Max SPF 100",
      brand: "Jenpharm",
      url: "https://jenpharm.com/collections/skin-care",
      desc: "Maximum SPF 100 protection. UV is #1 cause of worsening dark spots. Non-negotiable with brightening treatment.",
      ing: ["SPF 100 Broad Spectrum", "Zinc Oxide", "Titanium Dioxide", "Antioxidants"],
      use: ["Every single morning", "Reapply every 2 hours outdoors", "50% of pigmentation treatment"]
    }
  },
  sensitive: {
    facewash: {
      name: "Dermive Moisturizing Wash",
      brand: "Jenpharm",
      url: "https://jenpharm.com/products/dermive-moisturizing-wash",
      desc: "Ultra-gentle cleanser for reactive sensitive skin. Zero harsh actives — soothes & repairs barrier with every wash.",
      ing: ["Ceramides", "Allantoin", "Glycerin", "Gentle Surfactants", "Soothing Botanicals"],
      use: ["Lukewarm water only", "Fingertips only — no scrubbing", "Pat dry gently", "Moisturize while still damp"]
    },
    moisturizer: {
      name: "Moisturizing Lotion (Sensitive)",
      brand: "CeraVe",
      url: "https://www.cerave.com/skincare/moisturizers",
      desc: "Fragrance-free CeraVe lotion. Restores barrier without irritation or allergic reactions.",
      ing: ["Ceramides 1,3,6-II", "Hyaluronic Acid", "Glycerin", "MVE Technology"],
      use: ["Morning & night", "Fragrance-free formula", "Suitable for face and body"]
    },
    sunscreen: {
      name: "Moisturizing Lotion SPF 30 (Sensitive)",
      brand: "CeraVe",
      url: "https://www.cerave.com/suncare",
      desc: "Mineral-based fragrance-free SPF 30. Only gentle mineral UV filters — no chemical irritants.",
      ing: ["Zinc Oxide (Mineral)", "Ceramides", "Hyaluronic Acid", "No Fragrance", "No Parabens"],
      use: ["Every morning as last step", "Gentle enough for daily use"]
    }
  }
};

// =====================================================
//  DSA: STACK — Ordered Routine Builder
// =====================================================
class RoutineStack {
  constructor() { this.items = []; }
  push(item)    { this.items.push(item); }
  toArray()     { return [...this.items]; }
}

// =====================================================
//  OOP: ABSTRACT BASE CLASS (Abstraction)
// =====================================================
class BaseAnalyzer {
  constructor() {
    if (new.target === BaseAnalyzer)
      throw new Error("Cannot instantiate abstract class BaseAnalyzer directly");
  }

  // Returns readable skin type label
  skinLabel(k) {
    return ({
      oily:         "Oily Skin",
      dry:          "Dry Skin",
      combination:  "Combination Skin",
      acne:         "Acne-Prone Skin",
      pigmentation: "Hyperpigmentation / Dark Spots",
      sensitive:    "Sensitive Skin"
    })[k] || "Your Skin";
  }

  // DSA: O(1) HashMap lookup
  prods(type) { return PRODUCT_DB[type] || PRODUCT_DB.combination; }

  // DSA: Stack — builds ordered morning/evening routine
  routine(st) {
    const s = new RoutineStack();
    const dry  = ["dry", "sensitive"].includes(st);
    const oily = ["oily", "acne"].includes(st);

    s.push({
      time: "☀️ Morning Routine",
      steps: [
        { t: "Cleanse",
          d: dry
            ? "Gently massage on dry skin with lukewarm water. Pat dry softly."
            : "Massage on damp skin 30–60 seconds. Rinse with cool water." },
        { t: "Moisturize",
          d: oily
            ? "Thin oil-free moisturizer on slightly damp skin."
            : "Apply generously on slightly damp skin for best absorption." },
        { t: "Sunscreen — Final Essential Step!",
          d: "Apply SPF every morning as FINAL step — 15 min before sun. Reapply every 2 hours outdoors." }
      ]
    });

    s.push({
      time: "🌙 Evening Routine",
      steps: [
        { t: "Double Cleanse",
          d: "Micellar water first to dissolve sunscreen/makeup, then your face wash." },
        { t: "Targeted Treatment",
          d: st === "acne"
            ? "MandelAC Serum on breakout areas overnight."
            : st === "pigmentation"
              ? "Maxdif Brightening Cream — works best overnight."
              : "Serum for your specific skin concern." },
        { t: "Moisturize",
          d: dry
            ? "Apply generously at night — skin repairs and renews while you sleep."
            : "Apply moisturizer. Skin regenerates overnight — daily consistency gives results." }
      ]
    });

    return s.toArray();
  }

  // Builds a product card HTML string
  cardHTML(type, p) {
    return `<div class="pcard">
      <div class="pcard-body">
        <div class="ptype-badge">${type}</div>
        <h4>${p.name}</h4>
        <div class="brand-tag">${p.brand}</div>
        <p class="pcard-desc">${p.desc}</p>
        <div class="ing-list">${p.ing.map(i => `<span class="ing">${i}</span>`).join('')}</div>
        <a class="plink" href="${p.url}" target="_blank">Shop on ${p.brand} ↗</a>
      </div>
    </div>`;
  }

  // Builds routine section HTML
  routineHTML(r) {
    return `<div class="rwrap">${r.map(b => `
      <div class="usec">
        <h4>${b.time}</h4>
        <div class="rsteps">
          ${b.steps.map((s, i) => `
            <div class="ritem">
              <div class="rnum">${i + 1}</div>
              <div class="rtext"><strong>${s.t}</strong>${s.d}</div>
            </div>`).join('')}
        </div>
      </div>`).join('')}
    </div>`;
  }

  // Assembles full result HTML
  buildHTML(skinType, summary, problems, scores, products, routine) {
    const probHTML = problems.length ? `
      <div class="problem-box">
        <h4>🔍 Skin Problems Detected</h4>
        ${problems.map((p, i) =>
          `<span class="ptag" style="animation-delay:${i * 0.08}s">${p}</span>`
        ).join('')}
      </div>` : '';

    const scoreHTML = scores ? `
      <div class="score-section">
        <h4>📊 Skin Analysis Score Breakdown</h4>
        ${scores.map(s => `
          <div class="score-row">
            <div class="score-label">${s.label}</div>
            <div class="score-bar-wrap">
              <div class="score-bar" data-w="${s.val}"></div>
            </div>
            <div class="score-pct">${s.val}%</div>
          </div>`).join('')}
      </div>` : '';

    return `
      <div class="analysis-banner">
        <h3>✦ ${this.skinLabel(skinType)}</h3>
        <p>${summary}</p>
      </div>
      ${probHTML}
      ${scoreHTML}
      <div class="products-title">Your Recommended Products</div>
      <div class="products-grid">
        ${this.cardHTML("Face Wash",   products.facewash)}
        ${this.cardHTML("Moisturizer", products.moisturizer)}
        ${this.cardHTML("Sunscreen",   products.sunscreen)}
      </div>
      <div class="slabel">Daily Routine Guide</div>
      ${this.routineHTML(routine)}`;
  }
}

// =====================================================
//  OOP: INHERITANCE — ManualAnalyzer extends BaseAnalyzer
//  Concept demonstrated: Encapsulation + Inheritance
// =====================================================
class ManualAnalyzer extends BaseAnalyzer {
  // Encapsulation: skinType and concerns stored as private-like instance properties
  constructor(skinType, concerns) {
    super();
    this.skinType = skinType;   // encapsulated
    this.concerns = concerns;   // encapsulated
  }

  analyze() {
    const notes = {
      oily:        "Your skin produces excess sebum. Focus on balancing oil while maintaining hydration. Non-comedogenic products prevent pore congestion.",
      dry:         "Your skin lacks moisture with a weakened barrier. Prioritize nourishing, hydrating formulas to repair and lock in moisture.",
      combination: "Your T-zone tends oily while cheeks are drier. Lightweight balancing products that address both zones work best."
    };
    const concernText = this.concerns.length
      ? ` Concerns noted: <strong>${this.concerns.join(', ')}</strong>.`
      : '';
    return this.buildHTML(
      this.skinType,
      (notes[this.skinType] || '') + concernText,
      this.concerns,
      null,
      this.prods(this.skinType),
      this.routine(this.skinType)
    );
  }
}

// =====================================================
//  OOP: INHERITANCE + POLYMORPHISM — ImageAnalyzer
//  DSA: O(n) Pixel Array Analysis Algorithm
//  Polymorphism: analyze() overrides BaseAnalyzer method
// =====================================================
class ImageAnalyzer extends BaseAnalyzer {
  constructor(canvas) {
    super();
    this.canvas = canvas; // encapsulated
  }

  // Polymorphism: completely different analyze() behavior from ManualAnalyzer
  analyze() {
    const ctx   = this.canvas.getContext('2d');
    const w     = this.canvas.width;
    const h     = this.canvas.height;
    const data  = ctx.getImageData(0, 0, w, h).data; // flat Uint8ClampedArray [R,G,B,A,...]
    const total = w * h;

    // ── DSA: O(n) Single-Pass Pixel Collection ──
    let sumR = 0, sumG = 0, sumB = 0, sumSat = 0, sumLum = 0;
    let veryBright = 0, modBright = 0, darkPatch = 0, lowSat = 0, extremeRed = 0;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i], g = data[i + 1], b = data[i + 2];
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;       // luminance formula
      const mx  = Math.max(r, g, b), mn = Math.min(r, g, b);
      const sat = mx === 0 ? 0 : (mx - mn) / mx;            // saturation

      sumR += r; sumG += g; sumB += b; sumSat += sat; sumLum += lum;

      if (lum > 215) veryBright++;           // oily specular highlights
      else if (lum > 175) modBright++;       // moderate shine

      if (lum < 70 && sat < 0.30) darkPatch++;    // dark pigmentation patches
      if (sat < 0.10 && lum > 80 && lum < 175) lowSat++;  // dry/dull skin

      // True acne lesion pixel — VERY strict triple condition
      if (r > 170 && r > g * 1.55 && r > b * 1.65 && sat > 0.35) extremeRed++;
    }

    // ── Average channel values (ratio-based approach) ──
    const avgR = sumR / total, avgG = sumG / total, avgB = sumB / total;
    const avgSat = sumSat / total, avgLum = sumLum / total;

    // Luminance variance (texture / unevenness) — second pass
    let variance = 0;
    for (let i = 0; i < data.length; i += 4) {
      const l = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      variance += (l - avgLum) ** 2;
    }
    variance = Math.sqrt(variance / total);

    // ── Ratio-Based Skin Type Scoring ──
    // rb (red/blue ratio): normal=1.1–1.35 | sensitive=1.35–1.58 | acne=1.58+
    const rb = avgB > 0 ? avgR / avgB : 1.2;
    const rg = avgG > 0 ? avgR / avgG : 1.2;

    const oilyScore = Math.min(100, Math.round(
      (veryBright / total) * 550 + (modBright / total) * 130 + (avgLum > 150 ? 15 : 0)
    ));
    const dryScore = Math.min(100, Math.round(
      (lowSat / total) * 420 + (avgLum < 120 ? 20 : 0) + (avgSat < 0.18 ? 18 : 0)
    ));
    const pigmentScore = Math.min(100, Math.round(
      (darkPatch / total) * 950 + variance * 0.38
    ));
    const sensitiveScore = (rb > 1.32 && rb < 1.60)
      ? Math.min(100, Math.round((rb - 1.32) / 0.28 * 85))
      : 0;

    const extremeDensity = extremeRed / total;
    const acneScore = (rb > 1.58 && rg > 1.42 && extremeDensity > 0.08)
      ? Math.min(100, Math.round((rb - 1.58) * 380 + extremeDensity * 350))
      : (rb > 1.68 && extremeDensity > 0.04)
        ? Math.min(100, Math.round((rb - 1.68) * 420 + 30))
        : 0;

    const comboScore = (oilyScore > 18 && dryScore > 15 && variance > 22)
      ? Math.min(100, Math.round(Math.min(oilyScore, dryScore) * 0.75 + variance * 0.45))
      : 0;

    // ── DSA: HashMap Classification ──
    const typeMap = {
      acne:          acneScore > 28 ? acneScore : 0,
      sensitive:     sensitiveScore > 22 && acneScore < 28 ? sensitiveScore : 0,
      oily:          oilyScore > 22 && acneScore < 28 ? oilyScore : 0,
      pigmentation:  pigmentScore > 32 && acneScore < 22 ? pigmentScore : 0,
      dry:           dryScore > 22 && oilyScore < 50 && acneScore < 28 ? dryScore : 0,
      combination:   comboScore > 20 && acneScore < 28 ? comboScore : 0
    };

    // DSA: Array reduce — find highest scoring type
    let skinType = Object.entries(typeMap).reduce((a, b) => b[1] > a[1] ? b : a)[0];
    if (Object.values(typeMap).every(v => v === 0)) {
      skinType = Object.entries({
        oily: oilyScore, dry: dryScore, combination: comboScore,
        sensitive: sensitiveScore, pigmentation: pigmentScore, acne: acneScore
      }).reduce((a, b) => b[1] > a[1] ? b : a)[0];
    }

    // ── Build Problem List ──
    const problems = [];
    if (acneScore > 28)                      problems.push(`Active Acne / Inflammation detected (severity: ${acneScore}%)`);
    if (sensitiveScore > 25 && acneScore <= 28) problems.push(`Facial Redness / Sensitivity (index: ${sensitiveScore}%)`);
    if (oilyScore > 30)                      problems.push(`Excess Sebum / Oily Surface (shine: ${oilyScore}%)`);
    if (pigmentScore > 32)                   problems.push(`Hyperpigmentation / Uneven Tone (score: ${pigmentScore}%)`);
    if (dryScore > 28)                       problems.push(`Skin Dryness / Dehydration (score: ${dryScore}%)`);
    if (variance > 42)                       problems.push(`Uneven Skin Texture / Tone Irregularity`);
    if (problems.length === 0)               problems.push("Generally clear skin — preventive maintenance routine recommended");

    // ── Clinical Summaries ──
    const sums = {
      acne:         `Extreme red-channel dominance detected (rb-ratio: ${rb.toFixed(2)}, acne index: ${acneScore}%) — consistent with active papulopustular acne per DermNet NZ. Concentrated inflamed lesions are visible with significantly elevated redness markers above normal skin-tone range. Mandelic acid-based anti-acne actives are recommended. Daily SPF is critical to prevent post-acne hyperpigmentation.`,
      sensitive:    `Moderately elevated skin warmth (rb-ratio: ${rb.toFixed(2)}) indicates persistent facial redness consistent with sensitive or reactive skin type. This falls within the rosacea-like flush range per DermNet NZ, without signs of active acne lesions. Fragrance-free ceramide-rich gentle products will soothe and repair the skin barrier.`,
      oily:         `High average luminance (${Math.round(avgLum)}) and significant bright-pixel density (${Math.round(veryBright / total * 100)}%) indicate active sebum production. Enlarged pores and shine are consistent with seborrhoeic skin type. Lightweight non-comedogenic products with niacinamide balance oil without stripping.`,
      pigmentation: `Dark pixel concentration and luminance variance (${Math.round(variance)}) indicate hyperpigmentation, post-inflammatory marks, or melasma per DermNet NZ standards. Alpha arbutin and niacinamide-based brightening products with maximum SPF are the core treatment. Consistent use for 4–6 weeks yields visible improvement.`,
      dry:          `Low average saturation (${(avgSat * 100).toFixed(0)}%) and high desaturated-pixel density (${Math.round(lowSat / total * 100)}%) indicate moisture deficit and a compromised skin barrier. Ceramide-rich cleansers and thick barrier-repair creams are essential. Moisturize on damp skin and avoid hot water.`,
      combination:  `Mixed luminance signals — oily-zone shine (${oilyScore}%) and dry patches (${dryScore}%) with texture variance of ${Math.round(variance)}. Consistent with combination skin: oily T-zone with drier cheeks. Zone-targeted lightweight niacinamide products balance both areas without over-treating either.`
    };

    const scoreDisplay = [
      { label: "Oiliness / Shine",    val: oilyScore },
      { label: "Dryness",             val: dryScore },
      { label: "Redness / Sensitive", val: sensitiveScore },
      { label: "Pigmentation",        val: pigmentScore },
      { label: "Acne / Inflammation", val: acneScore }
    ];

    return this.buildHTML(
      skinType, sums[skinType], problems, scoreDisplay,
      this.prods(skinType), this.routine(skinType)
    );
  }
}

// =====================================================
//  APP STATE  (DSA: Array, Set, primitives)
// =====================================================
const SKIN_TYPES = [
  { key: "oily",        icon: "💧", name: "Oily",        desc: "Shiny, enlarged pores" },
  { key: "dry",         icon: "🌵", name: "Dry",          desc: "Flaky, tight feeling" },
  { key: "combination", icon: "☯️", name: "Combination",  desc: "Oily T-zone, dry cheeks" }
];

const CONCERNS = [
  "Acne / Pimples", "Blackheads", "Dark Spots", "Redness",
  "Dullness", "Enlarged Pores", "Sensitivity", "Uneven Tone", "Oiliness", "Dryness"
];

let selectedSkinType = null;
const selectedConcerns = new Set(); // DSA: Set ensures unique selections
let imageCanvas = null;
let loaderTimer = null;

// ── Animated Loader ──
function startLoader() {
  const steps = document.querySelectorAll('.lstep');
  let i = 0;
  steps.forEach(s => s.classList.remove('active'));
  steps[0].classList.add('active');
  loaderTimer = setInterval(() => {
    steps.forEach(s => s.classList.remove('active'));
    i = (i + 1) % steps.length;
    steps[i].classList.add('active');
  }, 600);
}
function stopLoader() {
  clearInterval(loaderTimer);
  document.querySelectorAll('.lstep').forEach(s => s.classList.remove('active'));
}

// ── UI Initialization ──
function initUI() {
  // Build skin type buttons
  const stg = document.getElementById('skinTypeGrid');
  SKIN_TYPES.forEach(st => {
    const d = document.createElement('div');
    d.className = 'skin-btn';
    d.id = 'st_' + st.key;
    d.innerHTML = `<span class="sico">${st.icon}</span><div class="sname">${st.name}</div><div class="sdesc">${st.desc}</div>`;
    d.onclick = () => selectSkinType(st.key);
    stg.appendChild(d);
  });

  // Build concern chips
  const cg = document.getElementById('concernsGrid');
  CONCERNS.forEach(c => {
    const s = document.createElement('span');
    s.className = 'cchip';
    s.textContent = c;
    s.onclick = () => toggleConcern(c, s);
    cg.appendChild(s);
  });
}

function selectSkinType(key) {
  selectedSkinType = key;
  document.querySelectorAll('.skin-btn').forEach(b => b.classList.remove('selected'));
  document.getElementById('st_' + key)?.classList.add('selected');
}

function toggleConcern(c, el) {
  selectedConcerns.has(c)
    ? (selectedConcerns.delete(c), el.classList.remove('selected'))
    : (selectedConcerns.add(c),    el.classList.add('selected'));
}

function switchMode(m) {
  [1, 2].forEach(i => {
    document.getElementById('tab'   + i).classList.toggle('active', i === m);
    document.getElementById('panel' + i).classList.toggle('hidden', i !== m);
  });
  document.getElementById('results').classList.add('hidden');
}

function handleFile(file) {
  if (!file) return;
  const img = new Image();
  img.onload = () => {
    const c = document.createElement('canvas');
    const max = 700;
    let w = img.width, h = img.height;
    if (w > max || h > max) {
      const r = Math.min(max / w, max / h);
      w = Math.round(w * r);
      h = Math.round(h * r);
    }
    c.width = w; c.height = h;
    c.getContext('2d').drawImage(img, 0, 0, w, h);
    imageCanvas = c;
    document.getElementById('previewImg').src = URL.createObjectURL(file);
    document.getElementById('previewBox').style.display = 'block';
    document.getElementById('analyzeImgBtn').disabled = false;
  };
  img.src = URL.createObjectURL(file);
}

function handleDrop(e) {
  e.preventDefault();
  document.getElementById('uploadZone').classList.remove('drag-over');
  const f = e.dataTransfer.files[0];
  if (f && f.type.startsWith('image/')) handleFile(f);
}

function showLoader() {
  document.getElementById('loader').classList.add('active');
  document.getElementById('results').classList.add('hidden');
  startLoader();
}
function hideLoader() {
  document.getElementById('loader').classList.remove('active');
  stopLoader();
}

function showResults(html) {
  const r = document.getElementById('results');
  r.innerHTML = html;
  r.classList.remove('hidden');
  setTimeout(() => {
    document.querySelectorAll('.score-bar').forEach(b => { b.style.width = b.dataset.w + '%'; });
    r.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 200);
}

// ── Analyze (Manual Mode) ──
function analyzeManual() {
  if (!selectedSkinType) { alert("Please select your skin type first."); return; }
  showLoader();
  setTimeout(() => {
    // OOP: Instantiate ManualAnalyzer (Inheritance from BaseAnalyzer)
    const analyzer = new ManualAnalyzer(selectedSkinType, [...selectedConcerns]);
    showResults(analyzer.analyze());
    hideLoader();
  }, 1200);
}

// ── Analyze (Image Mode) ──
function analyzeImage() {
  if (!imageCanvas) { alert("Please upload an image first."); return; }
  showLoader();
  document.getElementById('analyzeImgBtn').disabled = true;
  setTimeout(() => {
    try {
      // OOP: Instantiate ImageAnalyzer (Inheritance + Polymorphism)
      const analyzer = new ImageAnalyzer(imageCanvas);
      showResults(analyzer.analyze());
      hideLoader();
    } catch (e) {
      hideLoader();
      showResults(`<div class="analysis-banner"><h3>⚠️ Error</h3><p>${e.message}</p></div>`);
    } finally {
      document.getElementById('analyzeImgBtn').disabled = false;
    }
  }, 3800);
}

// ── Boot ──
initUI();
