import { useState, useEffect, useCallback } from "react";

// ─── DATA ────────────────────────────────────────────────────────
const COLORS = {
  "Georgia Southern Collard": "#1B5E20",
  "Ole Timey Blue Collard": "#4CAF50",
  "Dazzling Blue Kale": "#0D47A1",
  "Blue Curled Scotch Kale": "#42A5F5",
  "Buttercrunch Lettuce": "#66BB6A",
  "Merlot Lettuce": "#880E4F",
  "Red Salad Bowl Lettuce": "#E57373",
  "Devil's Ear Lettuce": "#F48FB1",
  "Red Velvet Lettuce": "#AD1457",
  "Wasabi Arugula": "#AFB42B",
  "Standard Arugula": "#9E9D24",
  "Early Mizuna": "#00897B",
  "Pink Mizuna": "#F06292",
  "Purple Lady Bok Choy": "#7B1FA2",
  "Milk Bok Choy": "#BA68C8",
  "Carolina Broadleaf Mustard": "#FF8F00",
  "Evergreen Bunching Onion": "#CE93D8",
  "Ishikura Onion": "#AB47BC",
  "Golden Acre Cabbage": "#1565C0",
  "Violaceo Cabbage": "#6A1B9A",
  "Purple Dragon Carrot": "#E040FB",
  "Danvers 126 Carrot": "#FF9800",
  "Li Li Stane Carrot": "#FFB74D",
  "Detroit Dark Red Beet": "#B71C1C",
  "Golden Beet": "#FDD835",
  "Texas Early Grano Onion": "#FFF176",
  "Autumn Stam Red Onion": "#D32F2F",
  "Sichuan Red Beauty Radish": "#FF5252",
  "Tokinashi Turnip": "#8D6E63",
  "Aunt Ruby's German Green Tomato": "#2E7D32",
  "Martino's Roma Tomato": "#C62828",
  "Peron Tomato": "#E65100",
  "Rosella Cherry Tomato": "#FF7043",
  "Black Cherry Tomato": "#4E342E",
  "Straight Eight Cucumber": "#00695C",
  "Marketmore 76 Cucumber": "#26A69A",
  "Heavy Hitter Okra": "#558B2F",
  "Alabama Red Okra": "#BF360C",
  "Hale's Best 45 Melon": "#FF6D00",
  "Leelanau Sweetglo Watermelon": "#D50000",
  "Crimson Sweet Watermelon": "#1B8E1B",
  "Golden Honeymoon Melon": "#FFD600",
  "Sweet Granite Melon": "#E88D3F",
  "Mexican Sour Gherkin": "#7CB342",
};

const textColor = (bg) => {
  if (!bg) return "#333";
  const hex = bg.replace("#", "");
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  return r * 0.299 + g * 0.587 + b * 0.114 > 150 ? "#1a1a1a" : "#ffffff";
};

const SEED_INFO = {
  "Georgia Southern Collard": { type: "Collard", days: "55-80", spacing: "1/sq ft", sun: "Full", hardy: true, source: "Baker Creek", startMethod: "Direct sow", companions: "Onions, garlic, beets" },
  "Ole Timey Blue Collard": { type: "Collard", days: "55-80", spacing: "1/sq ft", sun: "Full", hardy: true, source: "Seed Savers", startMethod: "Direct sow", companions: "Onions, garlic, beets" },
  "Dazzling Blue Kale": { type: "Kale", days: "45-65", spacing: "1/sq ft", sun: "Full", hardy: true, source: "Baker Creek", startMethod: "Direct sow", companions: "Beets, onions, potatoes" },
  "Blue Curled Scotch Kale": { type: "Kale", days: "45-65", spacing: "1/sq ft", sun: "Full", hardy: true, source: "Baker Creek", startMethod: "Direct sow", companions: "Beets, onions, potatoes" },
  "Buttercrunch Lettuce": { type: "Lettuce", days: "60-80", spacing: "4/sq ft", sun: "Part shade OK", hardy: true, source: "Baker Creek", startMethod: "Direct sow", companions: "Carrots, radishes, onions" },
  "Merlot Lettuce": { type: "Lettuce", days: "55-60", spacing: "4/sq ft", sun: "Part shade OK", hardy: true, source: "Baker Creek", startMethod: "Direct sow", companions: "Carrots, radishes, onions" },
  "Red Salad Bowl Lettuce": { type: "Lettuce", days: "50", spacing: "4/sq ft", sun: "Part shade OK", hardy: true, source: "Seed Savers", startMethod: "Direct sow", companions: "Carrots, radishes, onions" },
  "Devil's Ear Lettuce": { type: "Lettuce", days: "50", spacing: "4/sq ft", sun: "Part shade OK", hardy: true, source: "Baker Creek", startMethod: "Direct sow", companions: "Carrots, radishes, onions" },
  "Red Velvet Lettuce": { type: "Lettuce", days: "55", spacing: "4/sq ft", sun: "Part shade OK", hardy: true, source: "Seed Savers", startMethod: "Direct sow", companions: "Carrots, radishes, onions" },
  "Wasabi Arugula": { type: "Arugula", days: "40-50", spacing: "4-6/sq ft", sun: "Part shade OK", hardy: true, source: "Baker Creek", startMethod: "Direct sow", companions: "Lettuce, carrots, beets" },
  "Standard Arugula": { type: "Arugula", days: "40-50", spacing: "4-6/sq ft", sun: "Part shade OK", hardy: true, source: "Baker Creek", startMethod: "Direct sow", companions: "Lettuce, carrots, beets" },
  "Early Mizuna": { type: "Mizuna", days: "35-50", spacing: "4/sq ft", sun: "Part shade OK", hardy: true, source: "Baker Creek", startMethod: "Direct sow", companions: "Lettuce, onions, beets" },
  "Pink Mizuna": { type: "Mizuna", days: "35-50", spacing: "4/sq ft", sun: "Part shade OK", hardy: true, source: "Baker Creek", startMethod: "Direct sow", companions: "Lettuce, onions, beets" },
  "Purple Lady Bok Choy": { type: "Bok Choy", days: "40-50", spacing: "4/sq ft", sun: "Part shade OK", hardy: true, source: "Baker Creek", startMethod: "Direct sow", companions: "Onions, garlic, beets" },
  "Milk Bok Choy": { type: "Bok Choy", days: "40-50", spacing: "4/sq ft", sun: "Part shade OK", hardy: true, source: "Baker Creek", startMethod: "Direct sow", companions: "Onions, garlic, beets" },
  "Carolina Broadleaf Mustard": { type: "Mustard", days: "45", spacing: "4/sq ft", sun: "Full", hardy: true, source: "Seed Savers", startMethod: "Direct sow", companions: "Onions, lettuce, beans" },
  "Evergreen Bunching Onion": { type: "Onion", days: "60-90", spacing: "16/sq ft", sun: "Full", hardy: true, source: "Baker Creek", startMethod: "Direct sow", companions: "Carrots, beets, lettuce" },
  "Ishikura Onion": { type: "Onion", days: "60-90", spacing: "16/sq ft", sun: "Full", hardy: true, source: "Baker Creek", startMethod: "Direct sow", companions: "Carrots, beets, lettuce" },
  "Golden Acre Cabbage": { type: "Cabbage", days: "55-65", spacing: "1/sq ft", sun: "Full", hardy: true, source: "Baker Creek", startMethod: "Buy transplants", companions: "Onions, dill, lettuce" },
  "Violaceo Cabbage": { type: "Cabbage", days: "80-90", spacing: "1/sq ft", sun: "Full", hardy: true, source: "Baker Creek", startMethod: "Buy transplants", companions: "Onions, dill, lettuce" },
  "Purple Dragon Carrot": { type: "Carrot", days: "65-70", spacing: "16/sq ft", sun: "Full", hardy: true, source: "Baker Creek", startMethod: "Direct sow", companions: "Lettuce, onions, tomatoes" },
  "Danvers 126 Carrot": { type: "Carrot", days: "65-75", spacing: "16/sq ft", sun: "Full", hardy: true, source: "Baker Creek", startMethod: "Direct sow", companions: "Lettuce, onions, tomatoes" },
  "Li Li Stane Carrot": { type: "Carrot", days: "75", spacing: "16/sq ft", sun: "Full", hardy: true, source: "Baker Creek", startMethod: "Direct sow", companions: "Lettuce, onions, tomatoes" },
  "Detroit Dark Red Beet": { type: "Beet", days: "50-65", spacing: "9/sq ft", sun: "Full", hardy: true, source: "Baker Creek", startMethod: "Direct sow", companions: "Onions, lettuce, cabbage" },
  "Golden Beet": { type: "Beet", days: "50-65", spacing: "9/sq ft", sun: "Full", hardy: true, source: "Baker Creek", startMethod: "Direct sow", companions: "Onions, lettuce, cabbage" },
  "Texas Early Grano Onion": { type: "Onion", days: "100-175", spacing: "9/sq ft", sun: "Full", hardy: true, source: "Baker Creek", startMethod: "Direct sow / Sets", companions: "Carrots, beets, lettuce" },
  "Autumn Stam Red Onion": { type: "Onion", days: "100-120", spacing: "9/sq ft", sun: "Full", hardy: true, source: "Baker Creek", startMethod: "Direct sow / Sets", companions: "Carrots, beets, lettuce" },
  "Sichuan Red Beauty Radish": { type: "Radish", days: "50-55", spacing: "16/sq ft", sun: "Full", hardy: true, source: "Baker Creek", startMethod: "Direct sow", companions: "Carrots, lettuce, peas" },
  "Tokinashi Turnip": { type: "Turnip", days: "45-60", spacing: "9/sq ft", sun: "Full", hardy: true, source: "Baker Creek", startMethod: "Direct sow", companions: "Peas, onions, garlic" },
  "Aunt Ruby's German Green Tomato": { type: "Tomato", days: "75-85", spacing: "1/bucket", sun: "Full", hardy: false, source: "Baker Creek", startMethod: "Start indoors", companions: "Carrots, basil, onions" },
  "Martino's Roma Tomato": { type: "Tomato", days: "75-80", spacing: "1/bucket", sun: "Full", hardy: false, source: "Baker Creek", startMethod: "Start indoors", companions: "Carrots, basil, onions" },
  "Peron Tomato": { type: "Tomato", days: "68-80", spacing: "1/bucket", sun: "Full", hardy: false, source: "Baker Creek", startMethod: "Start indoors", companions: "Carrots, basil, onions" },
  "Rosella Cherry Tomato": { type: "Tomato", days: "70-80", spacing: "1/bucket", sun: "Full", hardy: false, source: "Baker Creek", startMethod: "Start indoors", companions: "Carrots, basil, onions" },
  "Black Cherry Tomato": { type: "Tomato", days: "64-75", spacing: "1/bucket", sun: "Full", hardy: false, source: "Baker Creek", startMethod: "Start indoors", companions: "Carrots, basil, onions" },
  "Straight Eight Cucumber": { type: "Cucumber", days: "60-70", spacing: "2/bucket", sun: "Full", hardy: false, source: "Baker Creek", startMethod: "Start indoors", companions: "Beans, peas, radishes" },
  "Marketmore 76 Cucumber": { type: "Cucumber", days: "70-90", spacing: "2/bucket", sun: "Full", hardy: false, source: "Baker Creek", startMethod: "Start indoors", companions: "Beans, peas, radishes" },
  "Heavy Hitter Okra": { type: "Okra", days: "55-65", spacing: "1/bucket", sun: "Full", hardy: false, source: "Baker Creek", startMethod: "Start indoors mid-Apr", companions: "Peppers, eggplant, basil" },
  "Alabama Red Okra": { type: "Okra", days: "55-65", spacing: "1/bucket", sun: "Full", hardy: false, source: "Baker Creek", startMethod: "Start indoors mid-Apr", companions: "Peppers, eggplant, basil" },
  "Hale's Best 45 Melon": { type: "Cantaloupe", days: "80-86", spacing: "2/row (trellised)", sun: "Full", hardy: false, source: "Baker Creek", startMethod: "Start indoors 3-4 wks", companions: "Corn, sunflowers, radishes" },
  "Leelanau Sweetglo Watermelon": { type: "Watermelon", days: "80-85", spacing: "2/row (trellised)", sun: "Full", hardy: false, source: "Baker Creek", startMethod: "Start indoors 3-4 wks", companions: "Corn, radishes, nasturtiums" },
  "Crimson Sweet Watermelon": { type: "Watermelon", days: "85", spacing: "2/row (trellised)", sun: "Full", hardy: false, source: "Baker Creek", startMethod: "Start indoors 3-4 wks", companions: "Corn, radishes, nasturtiums" },
  "Golden Honeymoon Melon": { type: "Honeydew", days: "80-90", spacing: "2/row (trellised)", sun: "Full", hardy: false, source: "Baker Creek", startMethod: "Start indoors 3-4 wks", companions: "Corn, sunflowers, radishes" },
  "Sweet Granite Melon": { type: "Cantaloupe", days: "70", spacing: "2/row (trellised)", sun: "Full", hardy: false, source: "Seed Savers", startMethod: "Start indoors 2-3 wks", companions: "Corn, sunflowers, radishes" },
  "Mexican Sour Gherkin": { type: "Gherkin", days: "60-75", spacing: "1/bucket", sun: "Full", hardy: false, source: "Baker Creek", startMethod: "Start indoors 3-4 wks", companions: "Beans, peas, radishes" },
};

const BEDS = [
  {
    name: "Bed 1", size: "4×4", theme: "Brassica & Greens Power Bed",
    note: "Collards + Kale + Bunching Onions — onions deter cabbage moths & aphids",
    cols: 4,
    cells: [
      "Georgia Southern Collard","Ole Timey Blue Collard","Georgia Southern Collard","Ole Timey Blue Collard",
      "Dazzling Blue Kale","Evergreen Bunching Onion","Ishikura Onion","Blue Curled Scotch Kale",
      "Ole Timey Blue Collard","Georgia Southern Collard","Ole Timey Blue Collard","Georgia Southern Collard",
      "Blue Curled Scotch Kale","Dazzling Blue Kale","Evergreen Bunching Onion","Dazzling Blue Kale",
    ],
  },
  {
    name: "Bed 2", size: "4×4", theme: "Salad Greens Bed",
    note: "Lettuce + Arugula + Mizuna = cut-and-come-again salad. Succession sow every 2 weeks.",
    cols: 4,
    cells: [
      "Buttercrunch Lettuce","Merlot Lettuce","Red Salad Bowl Lettuce","Devil's Ear Lettuce",
      "Wasabi Arugula","Early Mizuna","Pink Mizuna","Standard Arugula",
      "Red Velvet Lettuce","Buttercrunch Lettuce","Merlot Lettuce","Red Salad Bowl Lettuce",
      "Early Mizuna","Wasabi Arugula","Standard Arugula","Devil's Ear Lettuce",
    ],
  },
  {
    name: "Bed 3", size: "4×4", theme: "Asian Greens & Mustard Bed",
    note: "Bok Choy + Mustard + Onions — mustard acts as trap crop for flea beetles",
    cols: 4,
    cells: [
      "Purple Lady Bok Choy","Carolina Broadleaf Mustard","Milk Bok Choy","Purple Lady Bok Choy",
      "Evergreen Bunching Onion","Pink Mizuna","Early Mizuna","Ishikura Onion",
      "Milk Bok Choy","Carolina Broadleaf Mustard","Purple Lady Bok Choy","Milk Bok Choy",
      "Wasabi Arugula","Standard Arugula","Carolina Broadleaf Mustard","Wasabi Arugula",
    ],
  },
  {
    name: "Bed 4", size: "5×4", theme: "Cabbage & Lettuce Succession Bed",
    note: "Cabbage + Lettuce living mulch — lettuce shades soil for cabbage roots",
    cols: 5,
    cells: [
      "Golden Acre Cabbage","Violaceo Cabbage","Golden Acre Cabbage","Violaceo Cabbage","Golden Acre Cabbage",
      "Buttercrunch Lettuce","Merlot Lettuce","Devil's Ear Lettuce","Red Salad Bowl Lettuce","Buttercrunch Lettuce",
      "Violaceo Cabbage","Golden Acre Cabbage","Violaceo Cabbage","Golden Acre Cabbage","Violaceo Cabbage",
      "Red Velvet Lettuce","Early Mizuna","Standard Arugula","Pink Mizuna","Merlot Lettuce",
    ],
  },
  {
    name: "Bed 5 (Melon)", size: "4×8", theme: "Trellised Melon & Watermelon Bed",
    note: "All melons trellised on north side. Use slings/mesh bags for heavy fruit (esp. Crimson Sweet). Soil must be 70°F+.",
    cols: 4,
    cells: [
      "Hale's Best 45 Melon","Hale's Best 45 Melon","Sweet Granite Melon","Sweet Granite Melon",
      "Golden Honeymoon Melon","Golden Honeymoon Melon","Golden Honeymoon Melon","Hale's Best 45 Melon",
      "Leelanau Sweetglo Watermelon","Leelanau Sweetglo Watermelon","Crimson Sweet Watermelon","Crimson Sweet Watermelon",
    ],
  },
];

const BUCKETS = [
  { num: "1", variety: "Aunt Ruby's German Green Tomato", note: "1 plant, needs cage/stake" },
  { num: "2", variety: "Aunt Ruby's German Green Tomato", note: "1 plant, needs cage/stake" },
  { num: "3", variety: "Martino's Roma Tomato", note: "1 plant, determinate" },
  { num: "4", variety: "Martino's Roma Tomato", note: "1 plant, determinate" },
  { num: "5", variety: "Peron Tomato", note: "1 plant, needs cage/stake" },
  { num: "6", variety: "Peron Tomato", note: "1 plant, needs cage/stake" },
  { num: "7", variety: "Rosella Cherry Tomato", note: "1 plant, needs tall stake" },
  { num: "8", variety: "Rosella Cherry Tomato", note: "1 plant, needs tall stake" },
  { num: "9", variety: "Black Cherry Tomato", note: "1 plant, needs tall stake" },
  { num: "10", variety: "Black Cherry Tomato", note: "1 plant, needs tall stake" },
  { num: "11", variety: "Straight Eight Cucumber", note: "2 plants, needs trellis" },
  { num: "12", variety: "Straight Eight Cucumber", note: "2 plants, needs trellis" },
  { num: "13", variety: "Straight Eight Cucumber", note: "2 plants, needs trellis" },
  { num: "14", variety: "Marketmore 76 Cucumber", note: "2 plants, needs trellis" },
  { num: "15", variety: "Marketmore 76 Cucumber", note: "2 plants, needs trellis" },
  { num: "16", variety: "Marketmore 76 Cucumber", note: "2 plants, needs trellis" },
  { num: "17", variety: "Heavy Hitter Okra", note: "1 plant, very productive" },
  { num: "18", variety: "Heavy Hitter Okra", note: "1 plant, very productive" },
  { num: "19", variety: "Alabama Red Okra", note: "1 plant, ornamental pods" },
  { num: "20", variety: "Alabama Red Okra", note: "1 plant, ornamental pods" },
  { num: "21", variety: "Mexican Sour Gherkin", note: "1 plant, needs trellis" },
];

const SUCCESSION = [
  { crop: "All Lettuces", schedule: "Every 2 wks: Apr 1 → Apr 15 → May 1 → PAUSE summer → Aug 15 → Sep 1", dates: ["2026-04-01","2026-04-15","2026-05-01","2026-08-15","2026-09-01"] },
  { crop: "Arugula (both)", schedule: "Every 2 wks: Apr 1 → Apr 15 → May 1 → PAUSE → Sep 1 → Sep 15", dates: ["2026-04-01","2026-04-15","2026-05-01","2026-09-01","2026-09-15"] },
  { crop: "Mizuna (both)", schedule: "Every 2 wks: Apr 1 → Apr 15 → May 1 → PAUSE → Aug 15 → Sep 1", dates: ["2026-04-01","2026-04-15","2026-05-01","2026-08-15","2026-09-01"] },
  { crop: "Radishes", schedule: "Every 2 wks: Apr 1 → May 15 → PAUSE → Sep 1 → Sep 15", dates: ["2026-04-01","2026-04-15","2026-05-01","2026-05-15","2026-09-01","2026-09-15"] },
  { crop: "Carrots (all 3)", schedule: "3 sowings: Apr 1 → May 1 → Jul 15 (fall)", dates: ["2026-04-01","2026-05-01","2026-07-15"] },
  { crop: "Beets (both)", schedule: "3 sowings: Apr 1 → May 1 → Jul 15 (fall)", dates: ["2026-04-01","2026-05-01","2026-07-15"] },
  { crop: "Bunching Onions", schedule: "Every 3 wks: Apr 1 through October", dates: ["2026-04-01","2026-04-22","2026-05-13","2026-06-03","2026-06-24","2026-07-15","2026-08-05","2026-08-26","2026-09-16","2026-10-07"] },
  { crop: "Bok Choy (both)", schedule: "Spring: Apr 1 → Apr 15 → PAUSE → Fall: Aug 15 → Sep 1", dates: ["2026-04-01","2026-04-15","2026-08-15","2026-09-01"] },
  { crop: "Mustard Greens", schedule: "Apr 1 → Apr 15 → PAUSE → Aug 15 → Sep 1", dates: ["2026-04-01","2026-04-15","2026-08-15","2026-09-01"] },
  { crop: "Collards & Kale", schedule: "Spring sow now → Fall: Jul 15 & Aug 1", dates: ["2026-04-01","2026-07-15","2026-08-01"] },
  { crop: "Turnips", schedule: "Apr 1 → Apr 15 → Fall: Aug 15 → Sep 1", dates: ["2026-04-01","2026-04-15","2026-08-15","2026-09-01"] },
  { crop: "Cabbage", schedule: "Spring transplant now → Fall indoors Jul 1 → transplant Aug 1", dates: ["2026-04-01","2026-07-01","2026-08-01"] },
];

const ACTIONS = [
  { crop: "All 5 Tomato varieties", action: "Start seeds indoors TODAY", priority: "urgent", icon: "🍅" },
  { crop: "Both Cucumber varieties", action: "Start seeds indoors this week", priority: "urgent", icon: "🥒" },
  { crop: "Both Cabbage varieties", action: "Buy transplants from garden center", priority: "urgent", icon: "🥬" },
  { crop: "Collards, Kale", action: "Direct sow outdoors today", priority: "now", icon: "🥬" },
  { crop: "All 5 Lettuces", action: "Direct sow outdoors today", priority: "now", icon: "🥗" },
  { crop: "Arugula, Mizuna, Bok Choy, Mustard", action: "Direct sow outdoors today", priority: "now", icon: "🌿" },
  { crop: "All 3 Carrots", action: "Direct sow outdoors today (keep moist!)", priority: "now", icon: "🥕" },
  { crop: "Both Beets", action: "Soak seeds 24hrs, sow tomorrow", priority: "now", icon: "🫒" },
  { crop: "All Onions, Turnips, Radishes", action: "Direct sow outdoors today", priority: "now", icon: "🧅" },
  { crop: "Both Okra varieties", action: "Wait — start indoors mid-April", priority: "later", icon: "🌶" },
  { crop: "All 6 Melon/Watermelon varieties", action: "Start seeds indoors THIS WEEK (need 3-4 wks)", priority: "urgent", icon: "🍈" },
  { crop: "Mexican Sour Gherkin", action: "Start seeds indoors this week", priority: "urgent", icon: "🥒" },
];

// ─── PERSISTENT STORAGE ──────────────────────────────────────────
const STORAGE_KEYS = {
  tracked: "garden-tracked",
  succession: "garden-succession",
  actionsDone: "garden-actions-done",
};

async function loadFromStorage(key, fallback) {
  try {
    const result = localStorage.getItem(key);
    return result ? JSON.parse(result) : fallback;
  } catch {
    return fallback;
  }
}

async function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error("Storage save error:", e);
  }
}

// ─── COMPONENTS ──────────────────────────────────────────────────
const tabs = [
  { id: "dashboard", label: "Dashboard", icon: "📋" },
  { id: "beds", label: "Beds", icon: "🌱" },
  { id: "buckets", label: "Buckets", icon: "🪣" },
  { id: "succession", label: "Calendar", icon: "📅" },
];

function CellDetail({ name, onClose }) {
  const info = SEED_INFO[name];
  if (!info) return null;
  const bg = COLORS[name] || "#888";
  return (
    <div style={{ position:"fixed",inset:0,zIndex:100,display:"flex",alignItems:"flex-end",justifyContent:"center",background:"rgba(0,0,0,0.5)" }} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{ background:"#fff",borderRadius:"20px 20px 0 0",padding:"24px 20px 32px",width:"100%",maxWidth:420,maxHeight:"70vh",overflow:"auto" }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16 }}>
          <div style={{ display:"flex",alignItems:"center",gap:10 }}>
            <div style={{ width:18,height:18,borderRadius:4,background:bg,flexShrink:0 }}/>
            <h3 style={{ fontSize:18,fontWeight:700,margin:0 }}>{name}</h3>
          </div>
          <button onClick={onClose} style={{ background:"none",border:"none",fontSize:22,cursor:"pointer",padding:4 }}>✕</button>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px 16px",fontSize:14 }}>
          {[
            ["Type", info.type],["Days to Maturity", info.days],["Spacing", info.spacing],["Sun", info.sun],
            ["Frost Hardy", info.hardy?"Yes ✓":"No ✗"],["Source", info.source],["Start Method", info.startMethod],["Companions", info.companions],
          ].map(([k,v])=>(
            <div key={k}><div style={{fontSize:11,color:"#999",textTransform:"uppercase",letterSpacing:.5}}>{k}</div><div style={{fontWeight:600,marginTop:2}}>{v}</div></div>
          ))}
        </div>
      </div>
    </div>
  );
}

function getPlantCount(name) {
  const info = SEED_INFO[name];
  if (!info) return "";
  const s = info.spacing;
  if (s === "1/sq ft" || s === "1/bucket") return "1 plant";
  if (s === "2/bucket") return "2 plants";
  if (s.includes("trellised")) return "2 plants";
  const match = s.match(/^(\d+)/);
  if (match) return `${match[1]} plants`;
  return "";
}

function BedGrid({ bed, tracked, onTrack, onCellTap }) {
  return (
    <div style={{ background:"#fff",borderRadius:14,padding:16,marginBottom:16,boxShadow:"0 1px 8px rgba(0,0,0,.06)" }}>
      <div style={{ fontWeight:700,fontSize:16,marginBottom:2 }}>{bed.name} ({bed.size})</div>
      <div style={{ fontSize:13,fontWeight:600,color:"#2E7D32",marginBottom:4 }}>{bed.theme}</div>
      <div style={{ fontSize:12,color:"#888",fontStyle:"italic",marginBottom:12 }}>{bed.note}</div>
      <div style={{ display:"grid",gridTemplateColumns:`repeat(${bed.cols},1fr)`,gap:3 }}>
        {bed.cells.map((name,i)=>{
          const key=`${bed.name}-${i}`;
          const bg=COLORS[name]||"#ccc";
          const done=tracked[key];
          const count = getPlantCount(name);
          return (
            <div key={i} onClick={()=>onCellTap(name)} style={{ aspectRatio:bed.name.includes("Melon")?"2/1":"1",borderRadius:8,background:bg,color:textColor(bg),display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",fontSize:10,fontWeight:600,lineHeight:1.2,padding:6,cursor:"pointer",position:"relative",opacity:done?.9:1,border:done?"3px solid #2E7D32":"2px solid rgba(0,0,0,.1)",transition:"all .15s" }}>
              {done && <div style={{position:"absolute",top:2,right:3,fontSize:12}}>✓</div>}
              <span>{name.replace(/ (Lettuce|Collard|Kale|Arugula|Onion|Cabbage|Mizuna|Bok Choy|Mustard)$/,"")}</span>
              {count && <span style={{fontSize:8,fontWeight:400,opacity:.8,marginTop:1}}>{count}</span>}
            </div>
          );
        })}
      </div>
      <div style={{ display:"flex",gap:6,marginTop:10,flexWrap:"wrap" }}>
        {bed.cells.filter((v,i,a)=>a.indexOf(v)===i).map(name=>{
          const anyDone = bed.cells.some((_,i)=>tracked[`${bed.name}-${i}`] && bed.cells[i]===name);
          return (
            <button key={name} onClick={()=>{
              const updates = {};
              bed.cells.forEach((c,i)=>{ if(c===name) updates[`${bed.name}-${i}`] = !anyDone?"sowed":null; });
              onTrack(updates);
            }} style={{ fontSize:10,padding:"4px 8px",borderRadius:20,border:"1px solid #ddd",background:anyDone?"#C8E6C9":"#f5f5f5",cursor:"pointer",fontWeight:600 }}>
              {anyDone?"✓ ":""}{name.split(" ")[0]}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function BucketCard({ bucket, tracked, onTrack, onCellTap }) {
  const bg = COLORS[bucket.variety] || "#E0E0E0";
  const key = `bucket-${bucket.num}`;
  const status = tracked[key] || null;
  const stages = ["sowed","sprouted","transplanted","harvesting"];
  return (
    <div style={{ borderRadius:12,background:bg,color:textColor(bg),padding:12,textAlign:"center",fontSize:12,fontWeight:600,lineHeight:1.3,position:"relative",minHeight:110,display:"flex",flexDirection:"column",justifyContent:"center" }}>
      <div onClick={()=>onCellTap(bucket.variety)} style={{ cursor:"pointer" }}>
        <div style={{ fontSize:10,fontWeight:400,opacity:.7 }}>#{bucket.num}</div>
        <div style={{ marginTop:2 }}>{bucket.variety.replace(/(Tomato|Cucumber|Okra|Gherkin)$/,"")}</div>
        {bucket.note && <div style={{ fontSize:8,fontWeight:400,opacity:.7,marginTop:1 }}>{bucket.note}</div>}
        <div style={{ fontSize:7,opacity:.5,marginTop:2 }}>tap for details</div>
      </div>
      <div style={{ marginTop:8,display:"flex",gap:3,justifyContent:"center",flexWrap:"wrap" }}>
          {stages.map(s=>(
            <button key={s} onClick={(e)=>{
              e.stopPropagation();
              const updates = {};
              updates[key] = status===s ? null : s;
              onTrack(updates);
            }} style={{ fontSize:8,padding:"2px 6px",borderRadius:10,border:"none",cursor:"pointer",fontWeight:700,textTransform:"uppercase",background:status===s?"rgba(255,255,255,.4)":"rgba(0,0,0,.15)",color:status===s?textColor(bg):"inherit",letterSpacing:.3 }}>{s==="harvesting"?"🌾":""}{s.slice(0,4)}</button>
          ))}
        </div>
    </div>
  );
}

function getNextSowing(dates) {
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}-${String(now.getDate()).padStart(2,"0")}`;
  for (const d of dates) {
    if (d >= today) return d;
  }
  return null;
}

function daysUntil(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr + "T00:00:00");
  const now = new Date();
  now.setHours(0,0,0,0);
  return Math.ceil((d - now) / (1000*60*60*24));
}

// ─── APP ─────────────────────────────────────────────────────────
export default function GardenApp() {
  const [tab, setTab] = useState("dashboard");
  const [tracked, setTracked] = useState({});
  const [detail, setDetail] = useState(null);
  const [successionDone, setSuccessionDone] = useState({});
  const [actionsDone, setActionsDone] = useState({});
  const [loading, setLoading] = useState(true);

  // Load persistent data on mount
  useEffect(() => {
    async function load() {
      const [t, s, a] = await Promise.all([
        loadFromStorage(STORAGE_KEYS.tracked, {}),
        loadFromStorage(STORAGE_KEYS.succession, {}),
        loadFromStorage(STORAGE_KEYS.actionsDone, {}),
      ]);
      setTracked(t);
      setSuccessionDone(s);
      setActionsDone(a);
      setLoading(false);
    }
    load();
  }, []);

  // Batch update tracked items and persist
  const handleTrack = useCallback((updates) => {
    setTracked(prev => {
      const next = { ...prev };
      for (const [key, value] of Object.entries(updates)) {
        if (value === null) delete next[key]; else next[key] = value;
      }
      saveToStorage(STORAGE_KEYS.tracked, next);
      return next;
    });
  }, []);

  const handleSuccessionDone = useCallback((crop, dateStr) => {
    setSuccessionDone(prev => {
      const key = `${crop}-${dateStr}`;
      const next = { ...prev };
      if (next[key]) delete next[key]; else next[key] = true;
      saveToStorage(STORAGE_KEYS.succession, next);
      return next;
    });
  }, []);

  const handleActionDone = useCallback((idx) => {
    setActionsDone(prev => {
      const next = { ...prev };
      if (next[idx]) delete next[idx]; else next[idx] = true;
      saveToStorage(STORAGE_KEYS.actionsDone, next);
      return next;
    });
  }, []);

  // Stats
  const totalBedCells = BEDS.reduce((a, b) => a + b.cells.length, 0);
  const sowedCells = Object.keys(tracked).filter(k => k.startsWith("Bed") && tracked[k]).length;
  const bucketProgress = Object.keys(tracked).filter(k => k.startsWith("bucket-") && tracked[k]).length;
  const totalSuccDates = SUCCESSION.reduce((a,s)=>a+s.dates.length,0);

  if (loading) {
    return (
      <div style={{ fontFamily:"'Segoe UI',system-ui,sans-serif",background:"#F5F0E6",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center" }}>
        <div style={{ textAlign:"center" }}>
          <div style={{ fontSize:40,marginBottom:12 }}>🌱</div>
          <div style={{ fontSize:16,fontWeight:600,color:"#2E7D32" }}>Loading your garden...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily:"'Segoe UI',system-ui,-apple-system,sans-serif",background:"#F5F0E6",minHeight:"100vh",maxWidth:480,margin:"0 auto",paddingBottom:80,position:"relative" }}>
      {/* Header */}
      <div style={{ background:"linear-gradient(135deg,#1B5E20,#2E7D32,#388E3C)",padding:"20px 16px 16px",color:"#fff" }}>
        <div style={{ fontSize:22,fontWeight:800,letterSpacing:-.5 }}>🌱 Garden Planner</div>
        <div style={{ fontSize:12,opacity:.8,marginTop:2 }}>Clarksville, TN • Zone 7a • Last Frost: Apr 10</div>
        <div style={{ fontSize:10,opacity:.6,marginTop:4 }}>✓ Data saves automatically between sessions</div>
      </div>

      {/* Content */}
      <div style={{ padding:12 }}>

        {/* DASHBOARD */}
        {tab === "dashboard" && (
          <>
            {/* Progress */}
            <div style={{ background:"#fff",borderRadius:14,padding:16,marginBottom:12,boxShadow:"0 1px 8px rgba(0,0,0,.06)" }}>
              <div style={{ fontWeight:700,fontSize:15,marginBottom:12 }}>📊 Garden Progress</div>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10 }}>
                {[
                  { label:"Bed Squares", val:`${sowedCells}/${totalBedCells}`, pct:totalBedCells?sowedCells/totalBedCells:0 },
                  { label:"Buckets", val:`${bucketProgress}/21`, pct:bucketProgress/21 },
                  { label:"Succession", val:`${Object.keys(successionDone).length} done`, pct:Object.keys(successionDone).length / totalSuccDates },
                ].map(({label,val,pct})=>(
                  <div key={label} style={{ textAlign:"center" }}>
                    <div style={{ width:56,height:56,borderRadius:"50%",margin:"0 auto 6px",position:"relative",background:`conic-gradient(#2E7D32 ${pct*360}deg, #E8F5E9 0deg)`,display:"flex",alignItems:"center",justifyContent:"center" }}>
                      <div style={{ width:42,height:42,borderRadius:"50%",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700 }}>{Math.round(pct*100)}%</div>
                    </div>
                    <div style={{ fontSize:11,fontWeight:700 }}>{val}</div>
                    <div style={{ fontSize:10,color:"#999" }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Items */}
            <div style={{ background:"#fff",borderRadius:14,padding:16,marginBottom:12,boxShadow:"0 1px 8px rgba(0,0,0,.06)" }}>
              <div style={{ fontWeight:700,fontSize:15,marginBottom:10 }}>🚨 Action Items</div>
              {ACTIONS.map((a,i)=>(
                <div key={i} onClick={()=>handleActionDone(i)} style={{ display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:i<ACTIONS.length-1?"1px solid #f0f0f0":"none",cursor:"pointer",opacity:actionsDone[i]?.6:1,transition:"all .15s" }}>
                  <span style={{ fontSize:20 }}>{a.icon}</span>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:600,fontSize:13,textDecoration:actionsDone[i]?"line-through":"none" }}>{a.crop}</div>
                    <div style={{ fontSize:12,color:"#666",textDecoration:actionsDone[i]?"line-through":"none" }}>{a.action}</div>
                  </div>
                  <div style={{ display:"flex",alignItems:"center",gap:6 }}>
                    {actionsDone[i] && <span style={{ fontSize:16,color:"#2E7D32" }}>✓</span>}
                    <span style={{ padding:"3px 10px",borderRadius:20,fontSize:10,fontWeight:700,background:actionsDone[i]?"#C8E6C9":a.priority==="urgent"?"#FFCDD2":a.priority==="now"?"#C8E6C9":"#FFF9C4",color:actionsDone[i]?"#2E7D32":a.priority==="urgent"?"#C62828":a.priority==="now"?"#2E7D32":"#F57F17" }}>
                      {actionsDone[i]?"DONE":a.priority==="urgent"?"URGENT":a.priority==="now"?"TODAY":"LATER"}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Upcoming Succession */}
            <div style={{ background:"#fff",borderRadius:14,padding:16,boxShadow:"0 1px 8px rgba(0,0,0,.06)" }}>
              <div style={{ fontWeight:700,fontSize:15,marginBottom:10 }}>📅 Upcoming Succession Sowings</div>
              {SUCCESSION.map(s => {
                const next = getNextSowing(s.dates);
                const days = daysUntil(next);
                if (days === null || days > 30) return null;
                const key = `${s.crop}-${next}`;
                const done = successionDone[key];
                return (
                  <div key={s.crop} onClick={()=>handleSuccessionDone(s.crop, next)} style={{ display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:"1px solid #f0f0f0",cursor:"pointer",opacity:done?.6:1 }}>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:600,fontSize:13,textDecoration:done?"line-through":"none" }}>{s.crop}</div>
                      <div style={{ fontSize:11,color:"#888" }}>Next: {next}</div>
                    </div>
                    {done && <span style={{ fontSize:16,color:"#2E7D32" }}>✓</span>}
                    <span style={{ padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:700,background:done?"#C8E6C9":days<=0?"#FFCDD2":days<=7?"#FFF9C4":"#E8F5E9",color:done?"#2E7D32":days<=0?"#C62828":days<=7?"#F57F17":"#2E7D32" }}>
                      {done?"DONE":days <= 0 ? "TODAY!" : `${days}d`}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Reset button */}
            <div style={{ marginTop:20,textAlign:"center" }}>
              <button onClick={async ()=>{
                if(confirm("Reset all tracking data? This cannot be undone.")){
                  setTracked({});setSuccessionDone({});setActionsDone({});
                  await Promise.all([
                    saveToStorage(STORAGE_KEYS.tracked, {}),
                    saveToStorage(STORAGE_KEYS.succession, {}),
                    saveToStorage(STORAGE_KEYS.actionsDone, {}),
                  ]);
                }
              }} style={{ fontSize:11,padding:"6px 16px",borderRadius:20,border:"1px solid #ddd",background:"#fff",cursor:"pointer",color:"#999" }}>
                Reset All Tracking Data
              </button>
            </div>
          </>
        )}

        {/* BEDS */}
        {tab === "beds" && (
          <>
            <div style={{ fontSize:12,color:"#888",marginBottom:12,fontStyle:"italic" }}>Tap any square for variety details. Use buttons below each bed to track sowing.</div>
            {BEDS.map((bed,i)=>(
              <BedGrid key={i} bed={bed} tracked={tracked} onTrack={handleTrack} onCellTap={setDetail} />
            ))}
            {/* Round beds */}
            <div style={{ background:"#fff",borderRadius:14,padding:16,marginBottom:16,boxShadow:"0 1px 8px rgba(0,0,0,.06)" }}>
              <div style={{ fontWeight:700,fontSize:16,marginBottom:4 }}>Round Bed 1 (38" dia)</div>
              <div style={{ fontSize:13,fontWeight:600,color:"#2E7D32",marginBottom:8 }}>Root Vegetable Bed</div>
              <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:4 }}>
                {["Purple Dragon Carrot","Danvers 126 Carrot","Li Li Stane Carrot","Detroit Dark Red Beet","Golden Beet","Li Li Stane Carrot"].map((name,i)=>{
                  const bg=COLORS[name];
                  return <div key={i} onClick={()=>setDetail(name)} style={{borderRadius:8,background:bg,color:textColor(bg),padding:10,textAlign:"center",fontSize:10,fontWeight:600,cursor:"pointer"}}>{name.replace(/ (Carrot|Beet)$/,"")}<br/><span style={{fontSize:8,fontWeight:400,opacity:.8}}>{getPlantCount(name)}</span></div>;
                })}
              </div>
            </div>
            <div style={{ background:"#fff",borderRadius:14,padding:16,marginBottom:16,boxShadow:"0 1px 8px rgba(0,0,0,.06)" }}>
              <div style={{ fontWeight:700,fontSize:16,marginBottom:4 }}>Round Bed 2 (38" dia)</div>
              <div style={{ fontSize:13,fontWeight:600,color:"#2E7D32",marginBottom:8 }}>Allium & Quick Crop Bed</div>
              <div style={{ display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:4 }}>
                {["Texas Early Grano Onion","Autumn Stam Red Onion","Sichuan Red Beauty Radish","Tokinashi Turnip"].map((name,i)=>{
                  const bg=COLORS[name];
                  return <div key={i} onClick={()=>setDetail(name)} style={{borderRadius:8,background:bg,color:textColor(bg),padding:12,textAlign:"center",fontSize:11,fontWeight:600,cursor:"pointer"}}>{name.replace(/ (Onion|Radish|Turnip)$/,"")}<br/><span style={{fontSize:8,fontWeight:400,opacity:.8}}>{getPlantCount(name)}</span></div>;
                })}
              </div>
            </div>
          </>
        )}

        {/* BUCKETS */}
        {tab === "buckets" && (
          <>
            <div style={{ fontSize:12,color:"#888",marginBottom:12,fontStyle:"italic" }}>Track each bucket's stage: sowed → sprouted → transplanted → harvesting</div>
            <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8 }}>
              {BUCKETS.map(b=><BucketCard key={b.num} bucket={b} tracked={tracked} onTrack={handleTrack} onCellTap={setDetail} />)}
            </div>
          </>
        )}

        {/* SUCCESSION */}
        {tab === "succession" && (
          <>
            <div style={{ fontSize:12,color:"#888",marginBottom:12,fontStyle:"italic" }}>Tap dates to mark as done. Your progress saves automatically!</div>
            {SUCCESSION.map(s=>{
              const next = getNextSowing(s.dates);
              return (
                <div key={s.crop} style={{ background:"#fff",borderRadius:14,padding:14,marginBottom:10,boxShadow:"0 1px 8px rgba(0,0,0,.06)" }}>
                  <div style={{ fontWeight:700,fontSize:14,marginBottom:4 }}>{s.crop}</div>
                  <div style={{ fontSize:11,color:"#888",marginBottom:8 }}>{s.schedule}</div>
                  <div style={{ display:"flex",gap:6,flexWrap:"wrap" }}>
                    {s.dates.map(d=>{
                      const key=`${s.crop}-${d}`;
                      const done=successionDone[key];
                      const isNext = d===next && !done;
                      const days = daysUntil(d);
                      const isPast = days !== null && days < 0 && !done;
                      return (
                        <button key={d} onClick={()=>handleSuccessionDone(s.crop,d)} style={{ fontSize:11,padding:"5px 10px",borderRadius:20,border:isNext?"2px solid #2E7D32":"1px solid #ddd",background:done?"#C8E6C9":isPast?"#FFCDD2":isNext?"#E8F5E9":"#fafafa",cursor:"pointer",fontWeight:isNext?700:done?600:400,color:done?"#2E7D32":isPast?"#C62828":"#333",textDecoration:done?"line-through":"none",transition:"all .15s" }}>
                          {done?"✓ ":""}{d.slice(5)}
                          {isNext && !done && days !== null && <span style={{fontSize:9,marginLeft:3}}>({days<=0?"today!":`${days}d`})</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>

      {/* Bottom Nav */}
      <div style={{ position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,background:"#fff",borderTop:"1px solid #e0e0e0",display:"flex",zIndex:50,paddingBottom:"env(safe-area-inset-bottom,0)" }}>
        {tabs.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{ flex:1,padding:"10px 0 8px",border:"none",background:tab===t.id?"#E8F5E9":"transparent",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2,transition:"all .15s" }}>
            <span style={{ fontSize:20 }}>{t.icon}</span>
            <span style={{ fontSize:10,fontWeight:tab===t.id?700:500,color:tab===t.id?"#2E7D32":"#999" }}>{t.label}</span>
          </button>
        ))}
      </div>

      {/* Detail Modal */}
      {detail && <CellDetail name={detail} onClose={()=>setDetail(null)} />}
    </div>
  );
}
