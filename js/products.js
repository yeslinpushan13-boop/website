/* =====================================================
   ZYMOMAX — Product Data
   ===================================================== */
const PRODUCTS = [
  {
    id: 'zym-pro-1',
    name: 'ZymoShrimp Pro™',
    badge: 'Bestseller',
    category: 'Probiotic Feed',
    desc: 'Advanced multi-strain probiotic feed formulated for Litopenaeus vannamei & Penaeus monodon. Enhances gut health, immunity & FCR.',
    fullDesc: 'ZymoShrimp Pro™ is our flagship probiotic aquaculture feed designed for intensive shrimp farming. Formulated with 5 proprietary Lactobacillus and Bacillus strains, it improves feed conversion ratio, reduces mortality by up to 40%, and enhances disease resistance against Vibrio and WSSV.',
    specs: ['CFU: 10⁹/g min', 'Protein: 38%', 'Pellet: 1.5mm–3mm', 'Moisture: <10%', 'Shelf life: 18 months'],
    price: 2499,
    priceUnit: '/ 5 kg bag',
    image: 'images/product.jpg',
    stock: true,
    tag: 'aquafeed'
  },
  {
    id: 'zym-pro-2',
    name: 'AquaBio Boost™',
    badge: 'New',
    category: 'Probiotic Supplement',
    desc: 'Water-soluble probiotic supplement for pond application. Balances microbiome, reduces ammonia & improves water quality.',
    fullDesc: 'AquaBio Boost™ is a water-soluble microbial consortium for pond-level application. Direct probiotic inoculation of culture ponds dramatically reduces harmful pathogens, controls ammonia/nitrite spikes, and creates a healthy pond ecosystem for maximum shrimp growth.',
    specs: ['CFU: 10¹⁰/g min', 'Solubility: Complete', 'Application: 500g/acre', 'pH stable: 5–9', 'Shelf life: 24 months'],
    price: 1299,
    priceUnit: '/ 500 g',
    image: 'images/product.jpg',
    stock: true,
    tag: 'supplement'
  },
  {
    id: 'zym-svc-1',
    name: 'Fermentation Consultancy',
    badge: 'Service',
    category: 'Consultancy',
    desc: 'End-to-end fermentation process design, strain selection, media optimization & scale-up advisory for biotech companies.',
    fullDesc: 'Our team of fermentation scientists (backed by ACE-TBI) provides comprehensive consultancy covering upstream process development, downstream processing, scale-up from lab to pilot to industrial scale, regulatory guidance, and technology transfer.',
    specs: ['Duration: 1–6 months', 'Mode: On-site + Remote', 'Deliverables: Full SOP', 'Industries: Aqua, Food, Pharma'],
    price: 25000,
    priceUnit: '/ project',
    image: 'images/hero.jpg',
    stock: true,
    tag: 'consultancy'
  },
  {
    id: 'zym-svc-2',
    name: 'Scale-Up Advisory',
    badge: 'Service',
    category: 'Scale-Up',
    desc: 'Pilot to commercial scale-up advisory for fermentation processes. Equipment selection, process validation, and troubleshooting.',
    fullDesc: 'Moving from lab to commercial scale is the biggest challenge in fermentation. Our scale-up advisory ensures you select the right bioreactor, optimize your process parameters at each scale, and validate your process for regulatory compliance.',
    specs: ['Scale: 5L → 10,000L', 'Bioreactor types: STR, Airlift', 'Regulatory: FDA, FSSAI guidance', 'Support: 12 months post-scale'],
    price: 50000,
    priceUnit: '/ project',
    image: 'images/hero.jpg',
    stock: true,
    tag: 'consultancy'
  },
  {
    id: 'zym-pro-3',
    name: 'ZymoFry™ Starter',
    badge: 'Specialized',
    category: 'Larval Feed',
    desc: 'Micro-encapsulated probiotic feed for shrimp larvae (nauplii to PL stages). Boosts survival rates in hatcheries.',
    fullDesc: 'ZymoFry™ Starter is a revolutionary micro-encapsulated feed for early larval stages. The encapsulation technology ensures probiotic viability in aquatic environments for up to 4 hours, maximizing bioavailability during the critical nauplii to PL15 developmental window.',
    specs: ['Particle size: 50–300 μm', 'Protein: 52%', 'DHA/EPA enriched', 'Survival improvement: +35%', 'Hatchery certified'],
    price: 3999,
    priceUnit: '/ 1 kg',
    image: 'images/product.jpg',
    stock: true,
    tag: 'aquafeed'
  },
  {
    id: 'zym-svc-3',
    name: 'Custom Formulation',
    badge: 'Premium',
    category: 'R&D Service',
    desc: 'Bespoke probiotic strain selection and feed formulation tailored to your specific aquaculture species and farming conditions.',
    fullDesc: 'Every aquaculture operation is unique. Our R&D team develops custom probiotic formulations based on your target species, local pathogen profile, water quality parameters, and business goals. Full characterization and efficacy trials included.',
    specs: ['Timeline: 3–8 months', 'Includes: Lab trials', 'IP: Client-owned', 'Species: Any aquatic', 'Report: Full technical dossier'],
    price: 75000,
    priceUnit: '/ formulation',
    image: 'images/hero.jpg',
    stock: true,
    tag: 'consultancy'
  }
];

window.PRODUCTS = PRODUCTS;
