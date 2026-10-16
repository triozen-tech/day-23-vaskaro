// All text and data for the Vaskaro site. Prices are samples (concept website).
export const IMG = "/images/vaskaro";

export const HERO_CLIPS = ["/frames/vaskaro-v1", "/frames/vaskaro-v2", "/frames/vaskaro-v3", "/frames/vaskaro-v4"];

export const MODELS = [
  { n: "PASSO", f: "PASSO 650", c: "#B8854A", img: "m-passo", t: "A calm twin built for long climbs. Even torque low down, upright seat, and a lamp that sees round the bend.", p: "₹ 6.9 lakh", g: ["Climb", "Calmly"] },
  { n: "CIMA", f: "CIMA 450", c: "#6F8CA3", img: "m-cima", t: "Light and quick on tight roads. A 450 single with a short wheelbase that turns in like it knows the way.", p: "₹ 4.8 lakh", g: ["Light", "On Its Line"] },
  { n: "VETTA", f: "VETTA 800", c: "#B5532F", img: "m-vetta", t: "The summit machine. 800 cc of long pull, bronze-lit dials and brakes that hold on the steepest drop.", p: "₹ 9.4 lakh", g: ["Take", "The Summit"] },
] as const;

export const GEARS = [
  "First gear: wake the lamp.",
  "Second gear: find the line.",
  "Third gear: lean into the bend.",
  "Fourth gear: the road opens.",
  "Fifth gear: above the cloud.",
  "Sixth gear: the summit.",
];

export const SPECS = [
  { id: "c1", n: 649, label: "cc parallel twin", left: 890, top: 610 },
  { id: "c2", n: 72, label: "hp at 8,500 rpm", left: 1290, top: 300 },
  { id: "c3", n: 186, label: "kg ready to ride", left: 110, top: 670 },
  { id: "c4", n: 6, label: "gears, slipper clutch", left: 1250, top: 570 },
];
export const SPEC_LINES = ["M700 520 L700 640 L880 640", "M950 450 L1100 340 L1280 340", "M560 560 L420 700 L260 700", "M1110 520 L1200 600 L1340 600"];

export const SHOP = [
  { img: "g1", name: "Switchback Jacket", price: "₹ 18,900", chips: ["#1A1F24", "#B8854A", "#8a8f8a"] },
  { img: "g2", name: "Ridge Helmet", price: "₹ 14,500" },
  { img: "g3", name: "Pass Gloves", price: "₹ 5,900" },
  { img: "g4", name: "Tank Bag", price: "₹ 7,200" },
];

export const ROADS = [
  { img: "r1", name: "Hairpin Ladder", meta: "38 bends · 2 h 10", d: "M30 480 C120 420 60 340 200 320 S340 200 410 80" },
  { img: "r2", name: "Cloud Crest", meta: "21 bends · 1 h 30", d: "M30 100 C160 140 60 260 220 280 S400 420 410 490" },
  { img: "r3", name: "Tea Terrace Run", meta: "54 bends · 3 h", d: "M40 460 C40 300 220 380 220 240 S400 220 400 60" },
  { img: "r4", name: "Valley Thread", meta: "17 bends · 1 h", d: "M30 260 C100 80 200 440 300 240 S400 120 420 300" },
  { img: "r5", name: "Snowline Pass", meta: "44 bends · 2 h 40", d: "M60 490 C160 380 40 300 180 230 S300 120 380 40" },
];

export const BOOK = {
  models: ["PASSO 650", "CIMA 450", "VETTA 800"],
  days: ["SAT 14", "SUN 15", "SAT 21", "SUN 22"],
  slots: ["07:00", "09:30", "12:00", "15:30"],
};
