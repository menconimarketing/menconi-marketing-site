// Smart-template positioning library for the audit tool.
// v1: rule-based per trade. v2 can swap in Claude API.

export type Trade = {
  id: string;
  label: string;
  currentPosition: string;
  competitorArchetypes: { name: string; position: string; weakness: string }[];
  wedges: string[];
};

const universalCompetitors = [
  {
    name: "The Lowest Price Guy",
    position: "Wins on cost. Quality unclear, margins zero.",
    weakness: "Burns out customers and crews. Can\u2019t scale.",
  },
  {
    name: "The Biggest Crew in Town",
    position: "Wins on volume. Sells you to a coordinator.",
    weakness: "You\u2019re a ticket number. No personal touch.",
  },
  {
    name: "The Referral-Only Veteran",
    position: "Wins on word-of-mouth. Doesn\u2019t acquire.",
    weakness: "Invisible online. Loses every job that searches first.",
  },
];

export const TRADES: Trade[] = [
  {
    id: "landscaping",
    label: "Landscaping",
    currentPosition:
      "Right now, your business looks like every other landscaper in your zip code. Same \u201cquality work, free estimates, family-owned\u201d that 47 other companies say. There\u2019s nothing here that tells a homeowner why to call YOU instead of the next quote.",
    competitorArchetypes: universalCompetitors,
    wedges: [
      "The landscaper who handles the entire property year-round, not just mowing.",
      "Native-plant specialist \u2014 the only landscaper in your area who designs zero-maintenance yards.",
      "Same-week estimates and start dates, in writing.",
      "Drainage and grading specialists \u2014 the only landscaper homeowners call when their yard floods.",
    ],
  },
  {
    id: "plastering",
    label: "Plastering / Stucco",
    currentPosition:
      "Right now, your business looks like every other plasterer in your area. \u201cWe do good work\u201d isn\u2019t a position \u2014 it\u2019s a filler. There\u2019s nothing here that makes a homeowner pick you over the cheapest bid.",
    competitorArchetypes: universalCompetitors,
    wedges: [
      "The plasterer who guarantees crack-free walls in writing for 5 years.",
      "Old-house restoration specialist \u2014 the only plasterer who matches original textures.",
      "Same-day patch repairs \u2014 book by 10am, fixed by 5pm.",
      "Insurance-claim specialist \u2014 the plasterer that handles the paperwork for you.",
    ],
  },
  {
    id: "roofing",
    label: "Roofing",
    currentPosition:
      "Right now, your business looks like every other roofer chasing the same generic homeowner. \u201c30 years experience, free inspection\u201d is the same line every competitor uses. You\u2019re competing on price because nothing else stands out.",
    competitorArchetypes: universalCompetitors,
    wedges: [
      "The roofer who guarantees the install date in writing \u2014 or pays for every day late.",
      "Storm-damage specialist who works directly with your insurance.",
      "Solar-ready install warranty \u2014 the only roofer in your area certified for both.",
      "Same-week leak repairs \u2014 no waiting weeks for someone to show up.",
    ],
  },
  {
    id: "hvac",
    label: "HVAC",
    currentPosition:
      "Right now, your business looks like every other HVAC company. \u201c24/7 service, free quotes\u201d is the table-stakes line. Customers can\u2019t tell you apart from the call-center brands buying every Google ad in the zip code.",
    competitorArchetypes: universalCompetitors,
    wedges: [
      "Same-day diagnostics or you don\u2019t pay the call-out fee.",
      "The HVAC company that won\u2019t sell you a new system unless yours is actually dead.",
      "Old-home retrofit specialist \u2014 the only HVAC team that handles century-old houses.",
      "Heat-pump specialist \u2014 the local expert when everyone else is still pushing furnaces.",
    ],
  },
  {
    id: "remodeling",
    label: "Remodeling / GC",
    currentPosition:
      "Right now, your business looks like every other remodeler. \u201cQuality craftsmanship, on-time delivery\u201d is what 200 other GCs in your market promise \u2014 and most break the promise. There\u2019s nothing here that proves you\u2019re different before the consult.",
    competitorArchetypes: universalCompetitors,
    wedges: [
      "Fixed-price kitchen remodels \u2014 no surprise charges, ever.",
      "The remodeler who delivers on the day promised, not the month.",
      "Aging-in-place specialist \u2014 the only GC certified to retrofit homes for older homeowners.",
      "Open-permit-cleanup specialist \u2014 the GC who fixes the previous contractor\u2019s mess.",
    ],
  },
  {
    id: "property-maintenance",
    label: "Property Maintenance",
    currentPosition:
      "Right now, your business looks like every other property maintenance company. \u201cReliable, professional, insured\u201d is what every competitor claims. Landlords have no reason to call you over the company they already use \u2014 or to call you back.",
    competitorArchetypes: universalCompetitors,
    wedges: [
      "Same-week lockouts, board-ups, and emergency repairs for landlords.",
      "The property maintenance company that handles ALL your buildings, not just emergencies.",
      "Insurance-cleared turnover specialist \u2014 paperwork done for you.",
      "24-hour response on tenant requests \u2014 in writing, with a credit if missed.",
    ],
  },
  {
    id: "painting",
    label: "Painting",
    currentPosition:
      "Right now, your business looks like every other painter. \u201cQuality work, competitive pricing\u201d is the same line on every competitor\u2019s site. Homeowners pick the cheapest quote because there\u2019s nothing else to pick on.",
    competitorArchetypes: universalCompetitors,
    wedges: [
      "Furniture-and-floor protection guaranteed \u2014 we cover everything, not just the walls.",
      "Same-day color-match for matching old paint jobs \u2014 no two-week wait.",
      "Spec-perfect commercial painters \u2014 bid by sq ft, no add-on charges.",
      "Lead-paint certified \u2014 the only painter qualified for pre-1978 homes in your area.",
    ],
  },
  {
    id: "electrical",
    label: "Electrical",
    currentPosition:
      "Right now, your business looks like every other electrician. \u201cLicensed, bonded, insured\u201d is the legal minimum, not a position. Homeowners can\u2019t tell why to choose you over the next 12 results on Google.",
    competitorArchetypes: universalCompetitors,
    wedges: [
      "The electrician who books the job same day \u2014 not next month.",
      "Code-update specialist for old houses (sub-panel, knob & tube, aluminum wiring).",
      "EV charger installation specialist \u2014 the local expert other electricians refer to.",
      "Smart-home wiring specialist \u2014 the only electrician who installs it cleanly the first time.",
    ],
  },
  {
    id: "concrete",
    label: "Concrete / Masonry",
    currentPosition:
      "Right now, your business looks like every other concrete contractor. \u201cQuality work, fair prices\u201d isn\u2019t a position \u2014 it\u2019s wallpaper. Homeowners shop on bid amount alone because there\u2019s nothing else to compare.",
    competitorArchetypes: universalCompetitors,
    wedges: [
      "Stamped concrete with a 10-year crack guarantee.",
      "Same-week driveway repours \u2014 no waiting until spring.",
      "The only concrete company in your area that does residential AND commercial slabs.",
      "Foundation-crack repair specialist \u2014 the team called in when basements start leaking.",
    ],
  },
  {
    id: "fencing",
    label: "Fencing",
    currentPosition:
      "Right now, your business looks like every other fence company. \u201cQuality fences, fast install\u201d is the same line as the competitor down the street. You\u2019re competing on price by default.",
    competitorArchetypes: universalCompetitors,
    wedges: [
      "We pull the permit FOR you \u2014 the only fence company in your area that does.",
      "Privacy fence specialist \u2014 8ft stockade installed in one day.",
      "Coastal-rated fencing \u2014 hurricane-spec installs no other competitor offers.",
      "Pet-containment specialist \u2014 designs and installs to keep dogs in, not just look pretty.",
    ],
  },
  {
    id: "flooring",
    label: "Flooring",
    currentPosition:
      "Right now, your business looks like every other flooring company. \u201cQuality install, free estimate\u201d is what the box stores already promise. Homeowners default to whoever\u2019s cheapest because there\u2019s nothing else to weigh.",
    competitorArchetypes: universalCompetitors,
    wedges: [
      "We move your furniture for free \u2014 no other flooring company does.",
      "Pet-proof flooring specialist \u2014 scratch-resistant warranties no one else offers.",
      "Old-house refinishing specialist \u2014 not new construction, only restoration.",
      "Same-week installs on in-stock material \u2014 not the 6-week wait everyone else quotes.",
    ],
  },
  {
    id: "other",
    label: "Other Trade",
    currentPosition:
      "Right now, your business probably looks like every other competitor in your trade. \u201cQuality work, family-owned, free estimates\u201d is the line every competitor uses. Customers can\u2019t tell you apart \u2014 so they shop on price.",
    competitorArchetypes: universalCompetitors,
    wedges: [
      "The fastest response time in your trade, in writing.",
      "Specialist for the niche your competitors won\u2019t touch.",
      "The trade pro who handles paperwork (permits, insurance) for the customer.",
      "Same-day or same-week service when everyone else makes them wait.",
    ],
  },
];

export function getTrade(id: string): Trade {
  return TRADES.find((t) => t.id === id) ?? TRADES[TRADES.length - 1];
}

// Pick a wedge based on a stable hash of the inputs so the same business
// always gets the same suggestion (feels less random / more "real").
export function pickWedge(trade: Trade, businessName: string, city: string) {
  const hash = (businessName + city)
    .toLowerCase()
    .split("")
    .reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return trade.wedges[hash % trade.wedges.length];
}
