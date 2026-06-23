

from abc import ABC, abstractmethod
import math

#  DSA: HASH MAP — Product Database  (O(1) lookup)

PRODUCT_DB = {
    "oily": {
        "facewash": {
            "name": "MandelAC Face Wash",
            "brand": "Jenpharm",
            "url": "https://jenpharm.com/products/mandelac-facewash",
            "desc": "Pakistan's #1 anti-acne face wash with 3% Mandelic Acid. Controls oil, reduces dark spots & post-acne marks.",
            "ingredients": ["Mandelic Acid 3%", "Aloe Vera", "Decyl Glucoside", "Glycerin"],
            "usage": ["Morning & evening", "Pea-sized amount on damp skin 30s",
                      "Rinse with cool water", "Follow with oil-free moisturizer"]
        },
        "moisturizer": {
            "name": "Dermive Oil Free Moisturizer",
            "brand": "Jenpharm",
            "url": "https://jenpharm.com/collections/skin-care",
            "desc": "Lightweight ceramide moisturizer for oily skin. Non-comedogenic — hydrates without clogging pores.",
            "ingredients": ["Ceramides", "Hyaluronic Acid", "Niacinamide", "Glycerin"],
            "usage": ["Small amount after cleansing", "Morning & night", "Safe for daily oily skin use"]
        },
        "sunscreen": {
            "name": "Sheer SPF Sunscreen (Matte)",
            "brand": "Organic Travellers",
            "url": "https://organictraveller.store/collections/all-skincare",
            "desc": "Lightweight matte-finish sunscreen for oily skin. Broad-spectrum UV protection, zero greasiness.",
            "ingredients": ["Broad Spectrum SPF", "Zinc Oxide", "Niacinamide", "Silica"],
            "usage": ["15 min before sun exposure", "Last AM step", "Reapply every 2-3 hours outdoors"]
        }
    },
    "dry": {
        "facewash": {
            "name": "Dermive Moisturizing Wash",
            "brand": "Jenpharm",
            "url": "https://jenpharm.com/products/dermive-moisturizing-wash",
            "desc": "Ultra-gentle barrier-repairing cleanser. Cleanses while providing deep hydration — no tight feeling.",
            "ingredients": ["Ceramides", "Fatty Acids", "Glycerin", "Allantoin", "Soothing Botanicals"],
            "usage": ["Morning & evening", "Gentle massage on dry skin",
                      "Lukewarm water rinse", "Moisturize immediately after"]
        },
        "moisturizer": {
            "name": "Moisturizing Cream (Dry Skin)",
            "brand": "CeraVe",
            "url": "https://www.cerave.com/skincare/moisturizers/moisturizing-cream",
            "desc": "Dermatologist-recommended ceramide cream. Restores skin barrier, locks in moisture for 24 hours.",
            "ingredients": ["Ceramides 1,3,6-II", "Hyaluronic Acid", "Petrolatum", "Glycerin"],
            "usage": ["Morning & night", "Layer under sunscreen in AM", "Use on face and body"]
        },
        "sunscreen": {
            "name": "Moisturizing Lotion SPF 30",
            "brand": "CeraVe",
            "url": "https://www.cerave.com/suncare",
            "desc": "Hydrating SPF 30 that doubles as moisturizer. Ceramides for barrier protection.",
            "ingredients": ["SPF 30 Broad Spectrum", "Ceramides", "Hyaluronic Acid", "Niacinamide"],
            "usage": ["Every morning, final AM step", "Reapply as needed"]
        }
    },
    "combination": {
        "facewash": {
            "name": "Maxdif Brightening Face Wash",
            "brand": "Jenpharm",
            "url": "https://jenpharm.com/products/maxdif-skin-brightening-facewash",
            "desc": "Clinically proven brightening cleanser. Unifies tone, reduces dark spots — 97% users saw brighter skin.",
            "ingredients": ["Brightening Complex", "Mandelic Acid", "Vitamin C", "Aloe Vera"],
            "usage": ["AM & PM", "Gentle massage 30s", "Lukewarm water rinse", "Pair with Maxdif Cream"]
        },
        "moisturizer": {
            "name": "B3 Pore Erasing Moisturizer",
            "brand": "Organic Travellers",
            "url": "https://organictraveller.store/collections/all-skincare",
            "desc": "Niacinamide moisturizer balancing oily T-zone while hydrating dry patches.",
            "ingredients": ["Niacinamide (B3)", "Hyaluronic Acid", "Argan Oil", "Aloe Vera"],
            "usage": ["After cleansing", "More on dry cheeks, less on T-zone", "Follow with sunscreen"]
        },
        "sunscreen": {
            "name": "Spectra Matt SPF 40+",
            "brand": "Jenpharm",
            "url": "https://jenpharm.com/collections/skin-care",
            "desc": "Shine-free SPF 40+ by Jenpharm. Zero white cast, perfect matte finish for combination skin.",
            "ingredients": ["SPF 40+ Broad Spectrum", "Zinc Oxide", "Titanium Dioxide", "Vitamin E"],
            "usage": ["Every morning after moisturizer", "Blend evenly", "Reapply every 2 hours outdoors"]
        }
    },
    "acne": {
        "facewash": {
            "name": "MandelAC Face Wash (Anti-Acne)",
            "brand": "Jenpharm",
            "url": "https://jenpharm.com/products/mandelac-facewash",
            "desc": "Clinical anti-acne face wash with 3% Mandelic Acid. Treats breakouts, prevents pimples, fades marks.",
            "ingredients": ["Mandelic Acid 3%", "Aloe Vera", "Decyl Glucoside", "Glycerin"],
            "usage": ["Morning & evening", "Gentle massage — do NOT scrub", "Pat dry", "Always apply SPF daytime"]
        },
        "moisturizer": {
            "name": "Acne Calming Moisturizer",
            "brand": "Organic Travellers",
            "url": "https://organictraveller.store/collections/all-skincare",
            "desc": "Non-comedogenic soothing moisturizer. Calms redness & inflammation without clogging pores.",
            "ingredients": ["Centella Asiatica", "Niacinamide", "Zinc", "Aloe Vera", "Salicylic Acid"],
            "usage": ["Thin layer after cleansing", "Morning & night", "Avoid eye area"]
        },
        "sunscreen": {
            "name": "Spectra Matt SPF 40",
            "brand": "Jenpharm",
            "url": "https://jenpharm.com/collections/skin-care",
            "desc": "Oil-free SPF essential for acne skin — UV worsens dark marks. Matte formula won't trigger breakouts.",
            "ingredients": ["SPF 40 Broad Spectrum", "Zinc Oxide", "Niacinamide", "Matte Agents"],
            "usage": ["Every morning — non-negotiable", "Prevents marks darkening", "Reapply every 2-3 hours"]
        }
    },
    "pigmentation": {
        "facewash": {
            "name": "Maxdif Brightening Face Wash",
            "brand": "Jenpharm",
            "url": "https://jenpharm.com/products/maxdif-skin-brightening-facewash",
            "desc": "Brightening cleanser targeting hyperpigmentation, dark spots & uneven tone.",
            "ingredients": ["Brightening Complex", "Mandelic Acid", "Vitamin C", "Aloe Vera"],
            "usage": ["Twice daily", "60s massage on damp skin", "Pair with Maxdif Cream"]
        },
        "moisturizer": {
            "name": "Maxdif Brightening Cream",
            "brand": "Jenpharm",
            "url": "https://jenpharm.com/collections/skin-care",
            "desc": "Pakistan's No.1 brightening cream. Reduces dark patches & hyperpigmentation. 97% success rate.",
            "ingredients": ["Alpha Arbutin", "Niacinamide", "Vitamin C", "Kojic Acid", "Ceramides"],
            "usage": ["Morning & night after cleansing", "Must wear SPF when using", "4-6 weeks for visible results"]
        },
        "sunscreen": {
            "name": "Spectra Block Max SPF 100",
            "brand": "Jenpharm",
            "url": "https://jenpharm.com/collections/skin-care",
            "desc": "Maximum SPF 100 protection. UV is #1 cause of worsening dark spots.",
            "ingredients": ["SPF 100 Broad Spectrum", "Zinc Oxide", "Titanium Dioxide", "Antioxidants"],
            "usage": ["Every single morning", "Reapply every 2 hours outdoors", "50% of pigmentation treatment"]
        }
    },
    "sensitive": {
        "facewash": {
            "name": "Dermive Moisturizing Wash",
            "brand": "Jenpharm",
            "url": "https://jenpharm.com/products/dermive-moisturizing-wash",
            "desc": "Ultra-gentle cleanser for reactive sensitive skin. Soothes & repairs barrier with every wash.",
            "ingredients": ["Ceramides", "Allantoin", "Glycerin", "Gentle Surfactants", "Soothing Botanicals"],
            "usage": ["Lukewarm water only", "Fingertips — no scrubbing", "Pat dry gently", "Moisturize while still damp"]
        },
        "moisturizer": {
            "name": "Moisturizing Lotion (Sensitive)",
            "brand": "CeraVe",
            "url": "https://www.cerave.com/skincare/moisturizers",
            "desc": "Fragrance-free CeraVe lotion. Restores barrier without irritation or allergic reactions.",
            "ingredients": ["Ceramides 1,3,6-II", "Hyaluronic Acid", "Glycerin", "MVE Technology"],
            "usage": ["Morning & night", "Fragrance-free formula", "Suitable for face and body"]
        },
        "sunscreen": {
            "name": "Moisturizing Lotion SPF 30 (Sensitive)",
            "brand": "CeraVe",
            "url": "https://www.cerave.com/suncare",
            "desc": "Mineral-based fragrance-free SPF 30. Only gentle mineral UV filters — no chemical irritants.",
            "ingredients": ["Zinc Oxide (Mineral)", "Ceramides", "Hyaluronic Acid", "No Fragrance", "No Parabens"],
            "usage": ["Every morning as last step", "Gentle enough for daily use"]
        }
    }
}


# =====================================================
#  DSA: STACK — Ordered Routine Builder
# =====================================================
class RoutineStack:
    """LIFO stack used to build ordered morning/evening routine steps."""

    def __init__(self):
        self.__items = []           # Encapsulation: private list

    def push(self, item):
        self.__items.append(item)

    def pop(self):
        return self.__items.pop() if self.__items else None

    def is_empty(self):
        return len(self.__items) == 0

    def to_list(self):
        return list(self.__items)   # return copy

    def __len__(self):
        return len(self.__items)


# =====================================================
#  OOP: ABSTRACT BASE CLASS  (Abstraction)
# =====================================================
class BaseAnalyzer(ABC):
    """
    Abstract base class for all skin analyzers.
    Demonstrates: Abstraction, Encapsulation
    Cannot be instantiated directly.
    """

    # DSA: Hash Map — skin type labels
    __SKIN_LABELS = {
        "oily":         "Oily Skin",
        "dry":          "Dry Skin",
        "combination":  "Combination Skin",
        "acne":         "Acne-Prone Skin",
        "pigmentation": "Hyperpigmentation / Dark Spots",
        "sensitive":    "Sensitive Skin"
    }

    def get_skin_label(self, skin_type: str) -> str:
        """Encapsulated: access to private label map."""
        return self.__SKIN_LABELS.get(skin_type, "Your Skin")

    def get_products(self, skin_type: str) -> dict:
        """DSA: O(1) HashMap lookup for products."""
        return PRODUCT_DB.get(skin_type, PRODUCT_DB["combination"])

    def build_routine(self, skin_type: str) -> list:
        """DSA: Uses Stack to build ordered routine steps."""
        stack = RoutineStack()
        is_dry  = skin_type in ("dry", "sensitive")
        is_oily = skin_type in ("oily", "acne")

        # Push morning routine block
        stack.push({
            "time": "Morning Routine",
            "steps": [
                {
                    "title": "Cleanse",
                    "detail": ("Gently massage on dry skin with lukewarm water. Pat dry softly."
                               if is_dry else
                               "Massage on damp skin 30-60 seconds. Rinse with cool water.")
                },
                {
                    "title": "Moisturize",
                    "detail": ("Thin oil-free moisturizer on slightly damp skin."
                               if is_oily else
                               "Apply generously on slightly damp skin for best absorption.")
                },
                {
                    "title": "Sunscreen (Final Step!)",
                    "detail": "Apply SPF every morning as FINAL step — 15 min before sun. Reapply every 2 hours outdoors."
                }
            ]
        })

        # Push evening routine block
        stack.push({
            "time": "Evening Routine",
            "steps": [
                {
                    "title": "Double Cleanse",
                    "detail": "Micellar water first to dissolve sunscreen/makeup, then your face wash."
                },
                {
                    "title": "Targeted Treatment",
                    "detail": (
                        "MandelAC Serum on breakout areas overnight."
                        if skin_type == "acne" else
                        "Maxdif Brightening Cream — works best overnight."
                        if skin_type == "pigmentation" else
                        "Serum for your specific skin concern."
                    )
                },
                {
                    "title": "Moisturize",
                    "detail": ("Apply generously at night — skin repairs while you sleep."
                               if is_dry else
                               "Apply moisturizer. Skin regenerates overnight — consistency gives results.")
                }
            ]
        })

        return stack.to_list()

    def format_results(self, skin_type: str, summary: str,
                       problems: list, products: dict, routine: list) -> dict:
        """Returns structured result dictionary."""
        return {
            "skin_type":  skin_type,
            "skin_label": self.get_skin_label(skin_type),
            "summary":    summary,
            "problems":   problems,
            "products":   products,
            "routine":    routine
        }

    def print_results(self, results: dict):
        """Console output formatter."""
        print("\n" + "=" * 60)
        print(f"  ✦  {results['skin_label'].upper()}")
        print("=" * 60)
        print(f"\n📋 Analysis:\n{results['summary']}\n")

        if results["problems"]:
            print("🔍 Skin Problems Detected:")
            for p in results["problems"]:
                print(f"   • {p}")

        print("\n🧴 Recommended Products:")
        for ptype, prod in results["products"].items():
            print(f"\n  [{ptype.upper()}]")
            print(f"  Name  : {prod['name']}")
            print(f"  Brand : {prod['brand']}")
            print(f"  URL   : {prod['url']}")
            print(f"  About : {prod['desc']}")
            print(f"  Key Ingredients: {', '.join(prod['ingredients'])}")
            print(f"  How to use:")
            for step in prod["usage"]:
                print(f"    → {step}")

        print("\n📅 Daily Routine:")
        for block in results["routine"]:
            print(f"\n  {block['time']}:")
            for i, step in enumerate(block["steps"], 1):
                print(f"  {i}. {step['title']}")
                print(f"     {step['detail']}")
        print("\n" + "=" * 60)

    @abstractmethod
    def analyze(self):
        """Abstract method — must be overridden by subclasses."""
        pass


# =====================================================
#  OOP: INHERITANCE — ManualAnalyzer
#  Demonstrates: Encapsulation + Inheritance
# =====================================================
class ManualAnalyzer(BaseAnalyzer):
    """
    Analyzes skin type based on user's manual input.
    Inherits from BaseAnalyzer.
    Encapsulates skin_type and concerns as private attributes.
    """

    def __init__(self, skin_type: str, concerns: list = None):
        # Encapsulation: private attributes (name-mangled with __)
        self.__skin_type = skin_type
        self.__concerns  = set(concerns) if concerns else set()   # DSA: Set for unique items

    def get_skin_type(self):
        """Encapsulation: controlled access via getter."""
        return self.__skin_type

    def get_concerns(self):
        """Encapsulation: controlled access via getter."""
        return list(self.__concerns)

    def analyze(self):
        """Polymorphism: overrides BaseAnalyzer.analyze() with manual logic."""
        # DSA: Hash Map for skin type descriptions
        notes = {
            "oily":        "Your skin produces excess sebum. Focus on balancing oil while maintaining hydration. Non-comedogenic products prevent pore congestion.",
            "dry":         "Your skin lacks moisture with a weakened barrier. Prioritize nourishing, hydrating formulas to repair and lock in moisture.",
            "combination": "Your T-zone tends oily while cheeks are drier. Lightweight balancing products that address both zones work best."
        }

        concern_text = (
            f" Concerns noted: {', '.join(self.__concerns)}."
            if self.__concerns else ""
        )
        summary  = notes.get(self.__skin_type, "Personalized routine for your skin type.") + concern_text
        problems = list(self.__concerns)
        products = self.get_products(self.__skin_type)
        routine  = self.build_routine(self.__skin_type)

        return self.format_results(self.__skin_type, summary, problems, products, routine)


# =====================================================
#  OOP: INHERITANCE + POLYMORPHISM — ImageAnalyzer
#  DSA: O(n) Pixel Array Analysis Algorithm
# =====================================================
class ImageAnalyzer(BaseAnalyzer):
    """
    Analyzes skin from pixel data (RGB values).
    Inherits from BaseAnalyzer.
    Polymorphism: completely different analyze() behavior.
    DSA: Implements O(n) pixel array processing algorithm.

    Expected input: list of (R, G, B) tuples from image.
    Compatible with: Pillow (PIL), OpenCV, or any RGB source.
    """

    def __init__(self, pixels: list):
        # Encapsulation: private pixel data
        self.__pixels = pixels      # list of (R, G, B) tuples

    def analyze(self):
        """Polymorphism: overrides BaseAnalyzer.analyze() with pixel analysis."""
        total = len(self.__pixels)
        if total == 0:
            raise ValueError("No pixel data provided.")

        # ── DSA: O(n) Single-Pass Pixel Statistics ──
        sum_r = sum_g = sum_b = sum_sat = sum_lum = 0.0
        very_bright = mod_bright = dark_patch = low_sat = extreme_red = 0

        for (r, g, b) in self.__pixels:
            # Luminance (perceptual brightness)
            lum = 0.299 * r + 0.587 * g + 0.114 * b
            # Saturation
            mx, mn = max(r, g, b), min(r, g, b)
            sat = (mx - mn) / mx if mx > 0 else 0.0

            sum_r   += r
            sum_g   += g
            sum_b   += b
            sum_sat += sat
            sum_lum += lum

            # Oily: specular highlights
            if lum > 215:   very_bright += 1
            elif lum > 175: mod_bright  += 1

            # Pigmentation: dark, desaturated patches
            if lum < 70 and sat < 0.30: dark_patch += 1

            # Dry: desaturated mid-tones
            if sat < 0.10 and 80 < lum < 175: low_sat += 1

            # Acne/extreme inflammation — VERY strict triple condition
            rg_ratio = r / g if g > 0 else 2.0
            rb_pixel  = r / b if b > 0 else 2.0
            if r > 170 and rg_ratio > 1.55 and rb_pixel > 1.65 and sat > 0.35:
                extreme_red += 1

        # ── Average channel values (ratio-based approach) ──
        avg_r   = sum_r   / total
        avg_g   = sum_g   / total
        avg_b   = sum_b   / total
        avg_sat = sum_sat / total
        avg_lum = sum_lum / total

        # Luminance variance — second pass
        variance = math.sqrt(
            sum((0.299 * r + 0.587 * g + 0.114 * b - avg_lum) ** 2
                for (r, g, b) in self.__pixels) / total
        )

        # ── Ratio-based scoring ──
        # rb ratio ranges: normal=1.10–1.35 | sensitive=1.35–1.58 | acne=1.58+
        rb = avg_r / avg_b if avg_b > 0 else 1.2
        rg = avg_r / avg_g if avg_g > 0 else 1.2

        oily_score = min(100, round(
            (very_bright / total) * 550 + (mod_bright / total) * 130 + (15 if avg_lum > 150 else 0)
        ))
        dry_score = min(100, round(
            (low_sat / total) * 420 + (20 if avg_lum < 120 else 0) + (18 if avg_sat < 0.18 else 0)
        ))
        pigment_score = min(100, round(
            (dark_patch / total) * 950 + variance * 0.38
        ))
        sensitive_score = (
            min(100, round((rb - 1.32) / 0.28 * 85))
            if 1.32 < rb < 1.60 else 0
        )

        extreme_density = extreme_red / total
        if rb > 1.58 and rg > 1.42 and extreme_density > 0.08:
            acne_score = min(100, round((rb - 1.58) * 380 + extreme_density * 350))
        elif rb > 1.68 and extreme_density > 0.04:
            acne_score = min(100, round((rb - 1.68) * 420 + 30))
        else:
            acne_score = 0

        combo_score = (
            min(100, round(min(oily_score, dry_score) * 0.75 + variance * 0.45))
            if oily_score > 18 and dry_score > 15 and variance > 22 else 0
        )

        # ── DSA: HashMap classification ──
        type_map = {
            "acne":          acne_score if acne_score > 28 else 0,
            "sensitive":     sensitive_score if sensitive_score > 22 and acne_score < 28 else 0,
            "oily":          oily_score if oily_score > 22 and acne_score < 28 else 0,
            "pigmentation":  pigment_score if pigment_score > 32 and acne_score < 22 else 0,
            "dry":           dry_score if dry_score > 22 and oily_score < 50 and acne_score < 28 else 0,
            "combination":   combo_score if combo_score > 20 and acne_score < 28 else 0
        }

        # DSA: find max value in dict (like Array reduce)
        skin_type = max(type_map, key=type_map.get)
        if all(v == 0 for v in type_map.values()):
            raw = {"acne": acne_score, "sensitive": sensitive_score, "oily": oily_score,
                   "pigmentation": pigment_score, "dry": dry_score, "combination": combo_score}
            skin_type = max(raw, key=raw.get)

        # ── Problems list ──
        problems = []
        if acne_score > 28:                        problems.append(f"Active Acne / Inflammation (severity: {acne_score}%)")
        if sensitive_score > 25 and acne_score <= 28: problems.append(f"Facial Redness / Sensitivity (index: {sensitive_score}%)")
        if oily_score > 30:                        problems.append(f"Excess Sebum / Oily Surface (shine: {oily_score}%)")
        if pigment_score > 32:                     problems.append(f"Hyperpigmentation / Uneven Tone (score: {pigment_score}%)")
        if dry_score > 28:                         problems.append(f"Skin Dryness / Dehydration (score: {dry_score}%)")
        if variance > 42:                          problems.append("Uneven Skin Texture / Tone Irregularity")
        if not problems:                           problems.append("Generally clear skin — preventive routine recommended")

        # Score summary dict
        scores = {
            "Oiliness / Shine":    oily_score,
            "Dryness":             dry_score,
            "Redness / Sensitive": sensitive_score,
            "Pigmentation":        pigment_score,
            "Acne / Inflammation": acne_score
        }

        summaries = {
            "acne":         f"Extreme red-channel dominance (rb={rb:.2f}, acne={acne_score}%) — active acne per DermNet NZ.",
            "sensitive":    f"Moderately elevated redness (rb={rb:.2f}) — sensitive/reactive skin.",
            "oily":         f"High luminance avg={avg_lum:.0f}, shine={oily_score}% — seborrhoeic skin type.",
            "pigmentation": f"Dark pixel density + variance={variance:.1f} — hyperpigmentation detected.",
            "dry":          f"Low saturation avg={avg_sat*100:.0f}%, dry={dry_score}% — compromised moisture barrier.",
            "combination":  f"Mixed signals: oily={oily_score}%, dry={dry_score}%, variance={variance:.1f} — combination skin."
        }

        products = self.get_products(skin_type)
        routine  = self.build_routine(skin_type)
        result   = self.format_results(skin_type, summaries[skin_type], problems, products, routine)
        result["scores"] = scores   # attach scores to result
        return result


# =====================================================
#  DEMO — Run from command line
# =====================================================
if __name__ == "__main__":

    print("\n╔══════════════════════════════════════════╗")
    print("║   DermAI – Skin Care Analysis (Python)   ║")
    print("╚══════════════════════════════════════════╝")

    # ── Demo 1: Manual Analysis ──
    print("\n── DEMO 1: Manual Analysis ──")
    # OOP: Encapsulation — skin_type and concerns are private
    # OOP: Inheritance   — ManualAnalyzer extends BaseAnalyzer
    analyzer1 = ManualAnalyzer(
        skin_type="oily",
        concerns=["Acne / Pimples", "Enlarged Pores", "Dark Spots"]
    )
    result1 = analyzer1.analyze()     # Polymorphism: calls ManualAnalyzer.analyze()
    analyzer1.print_results(result1)

    # ── Demo 2: Image Pixel Analysis ──
    print("\n── DEMO 2: Image Pixel Analysis ──")
    # Simulate pixel data for dry skin:
    # Low saturation, moderate luminance, no extreme redness
    import random
    random.seed(42)
    sample_pixels = [
        (
            random.randint(185, 215),    # R — warm but not extreme
            random.randint(160, 195),    # G
            random.randint(150, 185)     # B
        )
        for _ in range(10000)            # 10,000 pixels (e.g. 100x100 crop)
    ]

    # OOP: Inheritance   — ImageAnalyzer extends BaseAnalyzer
    # OOP: Polymorphism  — analyze() is completely different from ManualAnalyzer
    # DSA: O(n) pixel array processing
    analyzer2 = ImageAnalyzer(pixels=sample_pixels)
    result2 = analyzer2.analyze()

    print(f"\nDetected Skin Type : {result2['skin_label']}")
    print(f"Summary            : {result2['summary']}")
    print("\nScore Breakdown:")
    for label, val in result2["scores"].items():
        bar = "█" * (val // 5) + "░" * (20 - val // 5)
        print(f"  {label:<25} [{bar}] {val}%")

    print("\nDetected Problems:")
    for p in result2["problems"]:
        print(f"  • {p}")

    print("\nRecommended Products:")
    for ptype, prod in result2["products"].items():
        print(f"  {ptype.title():<15} → {prod['name']} ({prod['brand']})")

    # ── Demo 3: DSA Stack demonstration ──
    print("\n── DEMO 3: RoutineStack (DSA) ──")
    stack = RoutineStack()
    stack.push("Step 1: Cleanse")
    stack.push("Step 2: Moisturize")
    stack.push("Step 3: Sunscreen")
    print(f"Stack size: {len(stack)}")
    print(f"Stack contents: {stack.to_list()}")
    print(f"Popped: {stack.pop()}")
    print(f"Stack after pop: {stack.to_list()}")

    # ── Demo 4: Set for unique concerns (DSA) ──
    print("\n── DEMO 4: Set for unique concerns (DSA) ──")
    concerns_set = set()
    concerns_set.add("Acne")
    concerns_set.add("Dark Spots")
    concerns_set.add("Acne")       # duplicate — ignored by Set
    print(f"Concerns (Set, no duplicates): {concerns_set}")
