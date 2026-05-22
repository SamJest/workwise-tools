export type TradePage = {
  name: string;
  slug: string;
  plural: string;
  audience: string;
  primaryJobs: string[];
  paperworkPain: string[];
  workflowWins: string[];
  complianceNotes: string[];
  supplierExamples: string[];
};

export type TradeCity = {
  name: string;
  slug: string;
  region: string;
  localTerms: string[];
};

export const tradePages: TradePage[] = [
  {
    name: "Plumber",
    slug: "plumbers",
    plural: "plumbers",
    audience: "sole traders and small plumbing teams",
    primaryJobs: ["leak repairs", "bathroom installs", "tap and valve replacements", "emergency call-outs"],
    paperworkPain: ["quoting small jobs quickly", "keeping photos with the right customer", "turning accepted estimates into invoices"],
    workflowWins: ["send estimates from the van", "store before-and-after photos on the job", "keep customer history ready for repeat work"],
    complianceNotes: ["Keep clear notes where plumbing work affects water safety, access, or warranty expectations."],
    supplierExamples: ["Screwfix", "Toolstation", "City Plumbing"]
  },
  {
    name: "Electrician",
    slug: "electricians",
    plural: "electricians",
    audience: "domestic electricians, small electrical firms, and NICEIC-registered teams",
    primaryJobs: ["consumer unit upgrades", "lighting installs", "fault finding", "EICR follow-up work"],
    paperworkPain: ["tracking quoted remedial work", "recording photos against the right job", "following up after inspections"],
    workflowWins: ["separate estimate notes from certificate paperwork", "schedule remedial jobs clearly", "sync invoice drafts after completion"],
    complianceNotes: ["Keep certification and safety documentation in the specialist system you already trust."],
    supplierExamples: ["CEF", "Screwfix", "Toolstation"]
  },
  {
    name: "Builder",
    slug: "builders",
    plural: "builders",
    audience: "general builders, renovation teams, and small contractors",
    primaryJobs: ["extensions", "kitchen refits", "structural repairs", "small renovations"],
    paperworkPain: ["scope creep", "material changes", "customer approvals spread across messages"],
    workflowWins: ["keep estimate versions tidy", "attach progress photos", "track open jobs and outstanding decisions"],
    complianceNotes: ["Keep contract, planning, and building control documents attached to the job record where relevant."],
    supplierExamples: ["Jewson", "Travis Perkins", "Wickes Trade"]
  },
  {
    name: "Gas Engineer",
    slug: "gas-engineers",
    plural: "gas engineers",
    audience: "Gas Safe engineers and heating businesses",
    primaryJobs: ["boiler installs", "annual servicing", "landlord checks", "heating repairs"],
    paperworkPain: ["renewal reminders", "service history", "quote follow-up after breakdown visits"],
    workflowWins: ["log customer appliance notes", "set reminder dates", "turn accepted boiler estimates into jobs"],
    complianceNotes: ["Keep Gas Safe records and certificates in the approved compliance tools required for the work."],
    supplierExamples: ["City Plumbing", "Wolseley", "Screwfix"]
  },
  {
    name: "Carpenter",
    slug: "carpenters",
    plural: "carpenters",
    audience: "carpenters, joiners, and fitted furniture installers",
    primaryJobs: ["built-in storage", "door hanging", "kitchen fitting", "bespoke joinery"],
    paperworkPain: ["recording measurements", "quoting material-heavy jobs", "remembering customer preferences"],
    workflowWins: ["attach photos and measurements", "reuse line items", "keep deposits and completion payments visible"],
    complianceNotes: ["Keep design approvals and customer sign-off notes with the job before ordering custom materials."],
    supplierExamples: ["Howdens", "Jewson", "Toolstation"]
  },
  {
    name: "Painter and Decorator",
    slug: "painters-decorators",
    plural: "painters and decorators",
    audience: "decorators, painting teams, and finishing specialists",
    primaryJobs: ["interior repainting", "exterior decorating", "wallpapering", "rental refreshes"],
    paperworkPain: ["room-by-room scopes", "paint references", "small extras added during the job"],
    workflowWins: ["save room notes", "attach finish photos", "quote extras without losing the original scope"],
    complianceNotes: ["Keep access, surface condition, and customer-supplied material notes visible before starting."],
    supplierExamples: ["Dulux Decorator Centre", "Brewers", "Toolstation"]
  },
  {
    name: "Roofer",
    slug: "roofers",
    plural: "roofers",
    audience: "roofing teams handling repairs, replacements, and inspections",
    primaryJobs: ["roof repairs", "gutter work", "flat roofs", "storm damage assessments"],
    paperworkPain: ["photo evidence", "weather-sensitive scheduling", "insurance-related quote notes"],
    workflowWins: ["store survey photos", "track weather-dependent jobs", "keep customer approvals attached"],
    complianceNotes: ["Keep health and safety, access, and warranty notes clear for every roof job."],
    supplierExamples: ["Travis Perkins", "Jewson", "SIG Roofing"]
  },
  {
    name: "Landscaper",
    slug: "landscapers",
    plural: "landscapers",
    audience: "garden landscapers, maintenance teams, and outdoor contractors",
    primaryJobs: ["patios", "fencing", "garden clearances", "lawn and planting work"],
    paperworkPain: ["seasonal scheduling", "material choices", "multiple site visits before approval"],
    workflowWins: ["keep site photos together", "track material options", "follow up quotes before the season fills"],
    complianceNotes: ["Record access, waste removal, and customer-approved material choices before work begins."],
    supplierExamples: ["Jewson", "Travis Perkins", "B&Q TradePoint"]
  }
];

export const tradeCities: TradeCity[] = [
  { name: "London", slug: "london", region: "Greater London", localTerms: ["parking", "congestion zones", "multi-visit jobs"] },
  { name: "Manchester", slug: "manchester", region: "Greater Manchester", localTerms: ["domestic call-outs", "rental work", "renovations"] },
  { name: "Birmingham", slug: "birmingham", region: "West Midlands", localTerms: ["suburban jobs", "landlord work", "small commercial sites"] },
  { name: "Leeds", slug: "leeds", region: "West Yorkshire", localTerms: ["student lets", "family homes", "trade supplier runs"] },
  { name: "Liverpool", slug: "liverpool", region: "Merseyside", localTerms: ["terraced homes", "call-outs", "renovation work"] },
  { name: "Bristol", slug: "bristol", region: "South West England", localTerms: ["period homes", "low-emission zones", "high-demand suburbs"] },
  { name: "Glasgow", slug: "glasgow", region: "Scotland", localTerms: ["tenement flats", "rental maintenance", "weather delays"] },
  { name: "Edinburgh", slug: "edinburgh", region: "Scotland", localTerms: ["listed buildings", "access planning", "rental properties"] },
  { name: "Cardiff", slug: "cardiff", region: "Wales", localTerms: ["commuter suburbs", "rental work", "small business jobs"] },
  { name: "Nottingham", slug: "nottingham", region: "East Midlands", localTerms: ["student housing", "domestic repairs", "renovations"] },
  { name: "Sheffield", slug: "sheffield", region: "South Yorkshire", localTerms: ["hillside access", "family homes", "trade supplier trips"] },
  { name: "Newcastle", slug: "newcastle", region: "North East England", localTerms: ["rental maintenance", "call-outs", "commuter routes"] }
];

export function getTrade(slug: string): TradePage | undefined {
  return tradePages.find((trade) => trade.slug === slug);
}

export function getTradeCity(slug: string): TradeCity | undefined {
  return tradeCities.find((city) => city.slug === slug);
}

export function getTradeCityPairs() {
  return tradePages.flatMap((trade) => tradeCities.map((city) => ({ trade: trade.slug, city: city.slug })));
}

export function tradeFaqs(trade: TradePage, city?: TradeCity) {
  const place = city ? ` in ${city.name}` : "";
  return [
    {
      question: `What is the best job management app for ${trade.plural}${place}?`,
      answer: `The best option is the one that helps ${trade.audience} quote faster, keep customer records tidy, store job photos, and turn completed work into invoice drafts without adding admin at the end of the day.`
    },
    {
      question: `Can ${trade.plural} use Workwise for estimates and invoices?`,
      answer: `Yes. Workwise is built around estimates, jobs, customers, site photos, documents, and accounting handoff, so ${trade.plural} can manage the work from first enquiry to payment.`
    },
    {
      question: `Does Workwise replace specialist compliance software for ${trade.plural}?`,
      answer: `No. Workwise helps organise commercial workflow and job records. Specialist certificates, statutory records, or regulated compliance documents should stay in the dedicated system required for that work.`
    }
  ];
}

export function tradePageTitle(trade: TradePage, city?: TradeCity) {
  const tradeLabel = tradePluralLabel(trade);
  return city
    ? `Job Management Software for ${tradeLabel} in ${city.name}`
    : `Job Management Software for ${tradeLabel}`;
}

export function tradePluralLabel(trade: TradePage) {
  return titleCaseWords(trade.plural);
}

export function tradeDescription(trade: TradePage, city?: TradeCity) {
  if (city) {
    return `Workwise helps ${trade.plural} in ${city.name} send estimates, manage jobs, store customer records, and keep site photos organised.`;
  }

  return `Workwise helps ${trade.plural} send estimates, manage jobs, store customer records, track photos, and move completed work into invoicing.`;
}

function titleCaseWords(value: string) {
  return value
    .split(" ")
    .map((word, index) => (index > 0 && word === "and" ? word : word.charAt(0).toUpperCase() + word.slice(1)))
    .join(" ");
}
