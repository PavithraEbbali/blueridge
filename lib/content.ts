/* ==========================================================================
   lib/content.ts — SINGLE SOURCE OF TRUTH
   --------------------------------------------------------------------------
   Every price, speed, plan, feature bullet, FAQ and legal link rendered on
   this site is read from this file. Nothing is hard-coded in a component.
   When a rate card changes, this is the ONLY file that needs to be edited.

   Plan data audited against https://www.brctv.com
   ========================================================================== */

import type { StaticImageData } from 'next/image';

/* Photography. Statically imported so Next.js can derive intrinsic
   dimensions and generate a blur placeholder for each one at build time —
   that is what keeps the layout from shifting as they load. */
import cableWorkFromHome from '@/public/images/cable-work-from-home.webp';
import fiberInstallation from '@/public/images/fiber-installation.webp';
import homefiShelf from '@/public/images/homefi-shelf.webp';
import localTechnicianPorch from '@/public/images/local-technician-porch.webp';
import mobileMainStreet from '@/public/images/mobile-main-street.webp';
import phoneKitchenCounter from '@/public/images/phone-kitchen-counter.webp';
import tvFamilyEvening from '@/public/images/tv-family-evening.webp';
import tvVoiceRemote from '@/public/images/tv-voice-remote.webp';

/* --------------------------------------------------------------------------
   1. CORE TYPES
   -------------------------------------------------------------------------- */

/** A photograph plus the alt text that describes it. */
export interface Media {
  src: StaticImageData;
  /** Describes the photo for screen readers. Never repeats nearby copy. */
  alt: string;
}

export type ServiceLine =
  | 'fiber'
  | 'cable'
  | 'bundle'
  | 'tv'
  | 'mobile'
  | 'phone';

export interface PlanItem {
  id: string;
  name: string;
  serviceLine: ServiceLine;
  /** Download speed in Mbps. 1000 = 1 Gig. Omit for non-data plans. */
  speedDown?: number;
  /** Upload speed in Mbps. Omit for non-data plans. */
  speedUp?: number;
  /** Whole-dollar portion of the monthly price. Omit => renders "Call for pricing". */
  price?: number;
  /** Cents as a two-character string, e.g. "95". Omit for whole-dollar prices. */
  cents?: string;
  /** Small print sitting directly under the price lockup. */
  promoQualifier?: string;
  equipmentFee?: string;
  dataPolicy?: string;
  contractTerm?: string;
  features: string[];
  isPopular?: boolean;
  /** Optional one-line positioning statement shown above the plan name. */
  eyebrow?: string;
  /** Who the tier is built for — rendered as a compact "Ideal for" list. */
  idealFor?: string[];
}

export interface ServiceSection {
  id: string;
  serviceLine: ServiceLine;
  eyebrow: string;
  title: string;
  /** Rendered as the section's supporting paragraph. */
  description: string;
  plans: PlanItem[];
  /** Optional footnote rendered beneath the plan grid. */
  footnote?: string;
  /**
   * Section photograph. On split layouts it heads the supporting column;
   * on grid layouts it sits beside the section heading.
   */
  media?: Media;
  /**
   * Render `media` as a full-bleed section background instead of a framed
   * card. The section switches to its dark treatment when this is set.
   */
  mediaAsBackground?: boolean;
}

/* --------------------------------------------------------------------------
   2. RETAILER IDENTITY & GLOBAL CONFIG
   -------------------------------------------------------------------------- */

export const site = {
  /** The name carried in the header, footer and page titles. */
  retailerName: 'Blue Ridge Communications',
  /** Shown in the persistent top disclosure bar, on every page. */
  disclosure: 'Independent Authorized Retailer of Blue Ridge Communications.',
  brandName: 'Blue Ridge Communications',
  /* ---------------------------------------------------------------------
     REPLACE WITH YOUR TRACKED SALES LINE BEFORE LAUNCH.
     555-01xx is the reserved fictional range, used here as a safe default
     so the build never dials a live third-party number.
     Change these two values and every CTA on the site updates.
     --------------------------------------------------------------------- */
  phoneDisplay: '(855) 555-0143',
  phoneHref: 'tel:+18555550143',
  hours: 'Sales line open 7 days a week, 8am - 11pm ET',
  serviceArea: 'Northeast & Central Pennsylvania and New York',
} as const;

export const nav = [
  { label: 'Fiber', href: '#fiber' },
  { label: 'Internet', href: '#cable' },
  { label: 'Bundles', href: '#bundles' },
  { label: 'TV', href: '#tv' },
  { label: 'Mobile', href: '#mobile' },
  { label: 'Home Phone', href: '#phone' },
  { label: 'FAQ', href: '#faq' },
] as const;

/* --------------------------------------------------------------------------
   3. HERO — headline + live promotions from brctv.com
   -------------------------------------------------------------------------- */

export const hero = {
  promoBadge: 'Featured offer — 36-month price guarantee',
  headline: 'High-speed internet for',
  headlineAccent: 'Northeast and Central Pennsylvania.',
  subhead:
    'Serving Pennsylvania communities since 1950, Blue Ridge Communications delivers download speeds up to 2 Gig on an unlimited connection, whole-home HomeFi℠ WiFi, and price guarantees of up to 36 months. Enter your ZIP code to see the offers available at your address.',
  zipLabel: 'Check availability at your address',
  zipPlaceholder: 'Enter your ZIP code',
  zipCta: 'Check availability',

  /* ---------------------------------------------------------------------
     The headline promotion currently running on brctv.com, featured in the
     hero exactly as Blue Ridge presents it.
     --------------------------------------------------------------------- */
  featuredOffer: {
    eyebrow: 'Current promotion',
    title: '$50/month Internet + a free unlimited mobile line',
    price: 50,
    cents: '00',
    term: 'per month for 36 months',
    qualifier: 'With AutoPay and Paperless Billing. New residential internet customers.',
    inclusions: [
      'Download speeds up to 500 Mbps',
      'One free unlimited mobile line for 12 months',
      'Blue Ridge Total Protection free for one year',
      'Modem, HomeFi℠ unit and Blue Ridge Stream unit included',
    ],
  },

  /** Supporting promotions, also live on brctv.com. */
  promos: [
    {
      id: 'promo-1200',
      icon: 'gauge' as FeatureIcon,
      title: '1.2 Gig for $69.95/mo',
      detail: 'A 36-month price guarantee on the same three-year deal structure.',
    },
    {
      id: 'promo-300',
      icon: 'layers' as FeatureIcon,
      title: '300 Mbps for $29.95/mo',
      detail: 'The entry tier in the three-year lineup, also with a free mobile line.',
    },
    {
      id: 'promo-protection',
      icon: 'shield' as FeatureIcon,
      title: 'Total Protection, free for a year',
      detail: 'Cybersecurity across every device on the account, at no charge for 12 months.',
    },
  ],
  stats: [
    { value: '1950', label: 'Serving Pennsylvania since' },
    { value: '2 Gig', label: 'Maximum download speed' },
    { value: '24/7', label: 'Technical support' },
  ],
} as const;

/* --------------------------------------------------------------------------
   4. TRUST MARQUEE
   -------------------------------------------------------------------------- */

export const marqueeItems = [
  'Up to 2 Gig download',
  'Unlimited data on every tier',
  'No annual contract',
  'HomeFi℠ whole-home WiFi',
  'eero Pro 7 · WiFi 7',
  '30-day money-back guarantee',
  'Free service calls',
  '2-hour appointment windows',
  '24/7 technical support',
  'CableFax Independent Operator of the Year 2025',
  '100% fiber-to-the-home expansion',
  'Local Pennsylvania service teams',
] as const;

/* --------------------------------------------------------------------------
   5. SERVICE LINES — rendered in this exact order
   -------------------------------------------------------------------------- */

/* ---- 5a. FIBER ---------------------------------------------------------- */

const fiberPlans: PlanItem[] = [
  {
    id: 'fiber-fth',
    name: 'Blue Ridge Fiber',
    serviceLine: 'fiber',
    eyebrow: '100% fiber-to-the-home',
    promoQualifier: 'Availability is address-by-address as the build reaches each street.',
    dataPolicy: 'Unlimited data',
    contractTerm: 'No annual contract',
    equipmentFee: 'Free professional installation',
    features: [
      'Symmetrical upload and download speeds',
      'Lower latency than a cable connection',
      'Consistent performance through peak evening hours',
      'Built for streaming, gaming, remote work and video calls',
      'Unlimited data with no overage charges',
      'Free installation on new fiber connections',
    ],
    idealFor: [
      'Households uploading as much as they download',
      'Remote work and daily video calls',
      'Competitive and low-latency gaming',
      'Homes planning around the next decade',
    ],
    isPopular: true,
  },
];

/* ---- 5b. CABLE (Blue Ridge High-Speed Internet) -------------------------- */

const cablePlans: PlanItem[] = [
  {
    id: 'cable-2gig',
    name: '2 Gig Internet',
    serviceLine: 'cable',
    speedDown: 2000,
    speedUp: 40,
    price: 99,
    cents: '95',
    promoQualifier: 'With AutoPay and Paperless Billing',
    contractTerm: '24-month rate',
    dataPolicy: 'Unlimited data',
    equipmentFee: 'HomeFi℠ included',
    idealFor: [
      '5+ users simultaneously',
      'Livestreaming and game streaming',
      'Ultra-fast, large file downloads',
      '20+ devices with heavy usage',
    ],
    features: [
      'Download speeds up to 2 Gig',
      'Upload speeds up to 40 Mbps',
      'Unlimited data, no overage fees',
      'HomeFi℠ whole-home WiFi included',
      'No annual contract required',
    ],
  },
  {
    id: 'cable-1200',
    name: '1.2 Gig Internet',
    serviceLine: 'cable',
    speedDown: 1200,
    speedUp: 40,
    price: 69,
    cents: '95',
    promoQualifier: 'With AutoPay and Paperless Billing',
    contractTerm: '36-month rate',
    dataPolicy: 'Unlimited data',
    equipmentFee: 'HomeFi℠ included',
    idealFor: [
      '5+ users',
      'Multiplayer gaming',
      'Immersive media (VR)',
      '20+ devices with heavy usage',
    ],
    features: [
      'Download speeds up to 1.2 Gig',
      'Upload speeds up to 40 Mbps',
      'Unlimited data, no overage fees',
      'HomeFi℠ whole-home WiFi included',
      'Three-year price guarantee',
    ],
  },
  {
    id: 'cable-700',
    name: '700 Mbps Internet',
    serviceLine: 'cable',
    speedDown: 700,
    speedUp: 20,
    price: 74,
    cents: '95',
    promoQualifier: 'With AutoPay and Paperless Billing',
    contractTerm: '24-month rate',
    dataPolicy: 'Unlimited data',
    equipmentFee: 'HomeFi℠ included',
    idealFor: ['5+ users', 'Online gaming', 'Fast downloads', '20+ devices simultaneously'],
    features: [
      'Download speeds up to 700 Mbps',
      'Upload speeds up to 20 Mbps',
      'Unlimited data, no overage fees',
      'HomeFi℠ whole-home WiFi included',
      'No annual contract required',
    ],
  },
  {
    id: 'cable-600',
    name: '600 Mbps Internet',
    serviceLine: 'cable',
    speedDown: 600,
    speedUp: 15,
    price: 64,
    cents: '95',
    promoQualifier: 'With AutoPay and Paperless Billing',
    contractTerm: '24-month rate',
    dataPolicy: 'Unlimited data',
    equipmentFee: 'HomeFi℠ included',
    idealFor: [
      '5+ users',
      '4K video streaming',
      'Heavy internet usage',
      '20+ devices simultaneously',
    ],
    features: [
      'Download speeds up to 600 Mbps',
      'Upload speeds up to 15 Mbps',
      'Unlimited data, no overage fees',
      'HomeFi℠ whole-home WiFi included',
      'No annual contract required',
    ],
  },
  {
    id: 'cable-500',
    name: '500 Mbps Internet',
    serviceLine: 'cable',
    speedDown: 500,
    speedUp: 12,
    price: 50,
    cents: '00',
    promoQualifier: 'With AutoPay and Paperless Billing',
    contractTerm: '36-month rate',
    dataPolicy: 'Unlimited data',
    equipmentFee: 'HomeFi℠ included',
    isPopular: true,
    idealFor: [
      '5+ users',
      'Work from home',
      'Heavy internet usage',
      '20+ devices simultaneously',
    ],
    features: [
      'Download speeds up to 500 Mbps',
      'Upload speeds up to 12 Mbps',
      'Unlimited data, no overage fees',
      'HomeFi℠ whole-home WiFi included',
      'Three-year price guarantee',
    ],
  },
  {
    id: 'cable-400',
    name: '400 Mbps Internet',
    serviceLine: 'cable',
    speedDown: 400,
    speedUp: 10,
    price: 44,
    cents: '95',
    promoQualifier: 'With AutoPay and Paperless Billing',
    contractTerm: '24-month rate',
    dataPolicy: 'Unlimited data',
    equipmentFee: 'HomeFi℠ included',
    idealFor: [
      'Up to 5 users',
      'HD video streaming',
      'Medium to heavy usage',
      'Up to 20 devices simultaneously',
    ],
    features: [
      'Download speeds up to 400 Mbps',
      'Upload speeds up to 10 Mbps',
      'Unlimited data, no overage fees',
      'HomeFi℠ whole-home WiFi included',
      'No annual contract required',
    ],
  },
  {
    id: 'cable-300',
    name: '300 Mbps Internet',
    serviceLine: 'cable',
    speedDown: 300,
    speedUp: 7,
    price: 29,
    cents: '95',
    promoQualifier: 'With AutoPay and Paperless Billing',
    contractTerm: '36-month rate',
    dataPolicy: 'Unlimited data',
    equipmentFee: 'HomeFi℠ included',
    idealFor: [
      'Up to 5 users',
      'Video chatting',
      'Moderate internet usage',
      'Up to 20 devices simultaneously',
    ],
    features: [
      'Download speeds up to 300 Mbps',
      'Upload speeds up to 7 Mbps',
      'Unlimited data, no overage fees',
      'HomeFi℠ whole-home WiFi included',
      'Three-year price guarantee',
    ],
  },
];

/* ---- 5c. BUNDLES (3-year internet + mobile) ------------------------------ */

const bundlePlans: PlanItem[] = [
  {
    id: 'bundle-1200',
    name: '1.2 Gig + Free Mobile Line',
    serviceLine: 'bundle',
    speedDown: 1200,
    speedUp: 40,
    price: 69,
    cents: '95',
    promoQualifier: 'With AutoPay and Paperless Billing',
    contractTerm: '36-month price guarantee',
    dataPolicy: 'Unlimited data',
    equipmentFee: 'Modem, HomeFi℠ and Stream unit included',
    eyebrow: 'Maximum headroom',
    features: [
      'Download speeds up to 1.2 Gig',
      '1 free modem included',
      '1 HomeFi℠ unit included',
      '1 Blue Ridge Stream unit included',
      '1 free unlimited mobile line for 12 months',
      '1 year of Blue Ridge Total Protection free',
    ],
  },
  {
    id: 'bundle-500',
    name: '500 Mbps + Free Mobile Line',
    serviceLine: 'bundle',
    speedDown: 500,
    speedUp: 12,
    price: 50,
    cents: '00',
    promoQualifier: 'With AutoPay and Paperless Billing',
    contractTerm: '36-month price guarantee',
    dataPolicy: 'Unlimited data',
    equipmentFee: 'Modem, HomeFi℠ and Stream unit included',
    eyebrow: 'Most ordered bundle',
    isPopular: true,
    features: [
      'Download speeds up to 500 Mbps',
      '1 free modem included',
      '1 HomeFi℠ unit included',
      '1 Blue Ridge Stream unit included',
      '1 free unlimited mobile line for 12 months',
      '1 year of Blue Ridge Total Protection free',
    ],
  },
  {
    id: 'bundle-300',
    name: '300 Mbps + Free Mobile Line',
    serviceLine: 'bundle',
    speedDown: 300,
    speedUp: 7,
    price: 29,
    cents: '95',
    promoQualifier: 'With AutoPay and Paperless Billing',
    contractTerm: '36-month price guarantee',
    dataPolicy: 'Unlimited data',
    equipmentFee: 'Modem, HomeFi℠ and Stream unit included',
    eyebrow: 'Best entry value',
    features: [
      'Download speeds up to 300 Mbps',
      '1 free modem included',
      '1 HomeFi℠ unit included',
      '1 Blue Ridge Stream unit included',
      '1 free unlimited mobile line for 12 months',
      '1 year of Blue Ridge Total Protection free',
    ],
  },
];

/* ---- 5d. TV (Blue Ridge Stream + Live TV packages) ----------------------- */

const tvPlans: PlanItem[] = [
  {
    id: 'tv-basic',
    name: 'Broadcast Basic HD',
    serviceLine: 'tv',
    eyebrow: 'The essentials',
    features: [
      'All the major broadcast networks',
      'A handful of other popular channels',
      '50 Music Choice channels included',
      'Exclusive Blue Ridge local programming',
    ],
  },
  {
    id: 'tv-basic-plus',
    name: 'Basic+ HD',
    serviceLine: 'tv',
    eyebrow: 'Four times the lineup',
    features: [
      'Everything in Broadcast Basic HD',
      '4x more channels than Basic HD',
      '50 Music Choice channels included',
      'Exclusive Blue Ridge local programming',
    ],
  },
  {
    id: 'tv-expanded',
    name: 'Expanded',
    serviceLine: 'tv',
    eyebrow: 'The family standard',
    equipmentFee: 'One digital box rental included',
    isPopular: true,
    features: [
      'Dozens more channels than Basic+ HD',
      '50 Music Choice channels included',
      'One digital box rental included',
      'Exclusive Blue Ridge local programming',
    ],
  },
  {
    id: 'tv-expanded-plus',
    name: 'Expanded+',
    serviceLine: 'tv',
    eyebrow: 'More of everything',
    equipmentFee: 'One digital box rental included',
    features: [
      'The enhanced version of Expanded',
      'Even more channels in the lineup',
      'One digital box rental included',
      'Exclusive Blue Ridge local programming',
    ],
  },
  {
    id: 'tv-premier',
    name: 'Premier',
    serviceLine: 'tv',
    eyebrow: 'The full slate',
    features: [
      '18 additional channels on top of your package',
      'Access to MGM+',
      'NFL RedZone included',
      'Smithsonian Channel and more',
    ],
  },
];

/** The two Blue Ridge Stream platform options, shown above the TV tiers. */
export const streamOptions: {
  id: string;
  name: string;
  description: string;
  highlights: string[];
  media: Media;
}[] = [
  {
    id: 'stream',
    name: 'Blue Ridge Stream',
    media: {
      src: tvVoiceRemote,
      alt: 'A hand holding a television remote in a dimly lit living room, with a television glowing out of focus behind it.',
    },
    description:
      'A TiVo® experience built on Google Android TV™. Reach every streaming app through the Google Play Store, steer the whole thing with the voice remote, and browse 500+ TiVo+ channels alongside exclusive local programming.',
    highlights: [
      'TiVo® interface with universal search',
      'Google Assistant voice control',
      '5,000+ apps and games via Google Play',
      'Chromecast built-in',
    ],
  },
  {
    id: 'stream-live',
    name: 'Blue Ridge Stream+ Live TV',
    media: {
      src: tvFamilyEvening,
      alt: 'A family of three seen from behind, sitting together on a sofa watching television in a warmly lit living room.',
    },
    description:
      'Everything that makes Blue Ridge Stream worth owning, with live television layered on top. Optional Cloud DVR, plus local news, live sports and community events carried exclusively by Blue Ridge.',
    highlights: [
      'Live TV delivered over your WiFi',
      'Optional Cloud DVR tiers',
      'Exclusive Blue Ridge local channels',
      'Watch in-home on the Blue Ridge Stream app',
    ],
  },
];

/* ---- 5e. MOBILE --------------------------------------------------------- */

const mobilePlans: PlanItem[] = [
  {
    id: 'mobile-free-line',
    name: 'Free Unlimited Line',
    serviceLine: 'mobile',
    eyebrow: 'Special offer',
    price: 0,
    promoQualifier: 'For 12 months on one line; additional lines at the standard rate',
    contractTerm: '12-month promotional period',
    dataPolicy: 'Unlimited talk, text and data',
    features: [
      '1 free unlimited mobile line',
      'Unlimited talk, text and data',
      'Runs on the network America relies on',
      'For new Blue Ridge Mobile customers',
    ],
  },
  {
    id: 'mobile-unlimited',
    name: 'Unlimited Plan',
    serviceLine: 'mobile',
    eyebrow: 'Everyday value',
    price: 30,
    promoQualifier: 'Per line, per month',
    dataPolicy: 'Unlimited talk, text and data',
    isPopular: true,
    features: [
      'Unlimited talk, text and data',
      'Expansive 5G and 4G LTE coverage',
      'Keep your current number',
      'Add lines as your household grows',
    ],
  },
  {
    id: 'mobile-shared',
    name: 'Shared Data Plan',
    serviceLine: 'mobile',
    eyebrow: 'Lowest price',
    price: 15,
    promoQualifier: 'Per line with one or more lines',
    dataPolicy: '1 GB per line, shared across the account',
    features: [
      'Unlimited talk and text',
      '1 GB per line in a shared pool',
      'Expansive 5G and 4G LTE coverage',
      'Ideal for light data households',
    ],
  },
];

/* ---- 5f. HOME PHONE ------------------------------------------------------ */

const phonePlans: PlanItem[] = [
  {
    id: 'phone-home',
    name: 'Blue Ridge Home Phone',
    serviceLine: 'phone',
    eyebrow: 'Unlimited calling',
    contractTerm: 'No annual contract',
    features: [
      'Unlimited local and long distance calling',
      'Covers the U.S., Canada, Puerto Rico, Guam and the U.S. Virgin Islands',
      'Caller ID included',
      'International calling available',
      'Directory assistance included',
      'Keep your existing number when you switch',
    ],
  },
];

/* ---- 5g. ORDERED SECTION REGISTRY ---------------------------------------- */

export const serviceSections: ServiceSection[] = [
  {
    id: 'fiber',
    serviceLine: 'fiber',
    eyebrow: 'Blue Ridge Fiber',
    title: 'Fiber-optic internet, direct to your home',
    description:
      'Blue Ridge Communications is extending 100% fiber-optic infrastructure to additional Pennsylvania neighborhoods, including rural communities. Fiber delivers symmetrical upload and download speeds, lower latency and consistent performance during peak hours. Installation on a new fiber connection is included at no charge.',
    plans: fiberPlans,
    media: {
      src: fiberInstallation,
      alt: 'A technician kneeling beside an open fiber-optic terminal box on the exterior wall of a house, connecting a fiber cable.',
    },
    footnote:
      'Fiber availability is determined street by street as the build progresses. A quick ZIP check or a call will confirm whether your address is ready.',
  },
  {
    id: 'cable',
    serviceLine: 'cable',
    eyebrow: 'Blue Ridge High-Speed Internet',
    title: 'Seven speed tiers, every one with unlimited data',
    description:
      'Blue Ridge Communications offers download speeds from 300 Mbps up to 2 Gig across seven tiers. Every tier includes unlimited data and HomeFi℠ whole-home WiFi, and none requires an annual contract.',
    plans: cablePlans,
    media: {
      src: cableWorkFromHome,
      alt: 'A woman working at a laptop and second monitor set up on a dining table at home, mid-conversation on a video call.',
    },
    footnote:
      'Rates shown reflect the $5 monthly discount for enrolling in both AutoPay and Paperless Billing. Taxes, fees and surcharges are additional.',
  },
  {
    id: 'bundles',
    serviceLine: 'bundle',
    eyebrow: 'Internet + Mobile',
    title: 'Internet and mobile with a 36-month price guarantee',
    description:
      'Each bundle pairs a price-locked internet tier with one free unlimited mobile line for 12 months and a full year of Blue Ridge Total Protection. A modem, a HomeFi℠ unit and a Blue Ridge Stream unit are included in every package.',
    plans: bundlePlans,
    footnote:
      'Bundle offers are for new residential internet customers. The free mobile line runs for 12 months; additional lines bill at the standard rate.',
  },
  {
    id: 'tv',
    serviceLine: 'tv',
    eyebrow: 'Blue Ridge Stream & Live TV',
    title: 'Live television and streaming in a single interface',
    description:
      'Blue Ridge Stream brings live television and your streaming applications together in one TiVo®-powered interface built on Android TV™. Add a Live TV package for the complete channel lineup, including local news, live sports and community programming available only through Blue Ridge Communications.',
    plans: tvPlans,
    footnote:
      'Live TV packages build on one another. Channel counts and lineups vary by service area.',
  },
  {
    id: 'mobile',
    serviceLine: 'mobile',
    eyebrow: 'Blue Ridge Mobile',
    title: 'Nationwide mobile service, priced per line',
    description:
      'Blue Ridge Mobile operates on a nationwide 5G and 4G LTE network, with plans from $15 per line per month. Mobile service is available to Blue Ridge Communications internet subscribers, who can add and manage lines directly on their existing account.',
    plans: mobilePlans,
    media: {
      src: mobileMainStreet,
      alt: 'A person walking along a small-town main street in autumn, looking at their phone.',
    },
    footnote:
      'Blue Ridge Mobile is available to Blue Ridge Internet subscribers. Bring your own device or pick up a new 5G phone when you order.',
  },
  {
    id: 'phone',
    serviceLine: 'phone',
    eyebrow: 'Blue Ridge Home Phone',
    title: 'Home phone service with unlimited calling',
    description:
      'Excellent call quality, a complete feature set and an expansive calling footprint, suitable as a primary line or as a dependable backup. Blue Ridge Communications handles the transfer from your current provider, and you keep your existing number.',
    plans: phonePlans,
    media: {
      src: phoneKitchenCounter,
      alt: 'A cordless home telephone resting in its charging base on a kitchen counter beside a notepad, keys and a mug of coffee.',
    },
    mediaAsBackground: true,
  },
];

/* --------------------------------------------------------------------------
   6. HONEST FINE PRINT — inclusions and fees comparison grid
   -------------------------------------------------------------------------- */

export interface FinePrintRow {
  label: string;
  fiber: string;
  cable: string;
  bundle: string;
}

export const finePrint: {
  eyebrow: string;
  title: string;
  description: string;
  columns: [string, string, string];
  rows: FinePrintRow[];
  notes: string[];
} = {
  eyebrow: 'Inclusions and fees',
  title: 'Inclusions, equipment and billing terms',
  description:
    'A side-by-side comparison of what each service line includes, what equipment is provided, and which charges are billed in addition to the monthly rate.',
  columns: ['Blue Ridge Fiber', 'High-Speed Internet', '3-Year Bundles'],
  rows: [
    { label: 'Data allowance', fiber: 'Unlimited', cable: 'Unlimited', bundle: 'Unlimited' },
    {
      label: 'Annual contract',
      fiber: 'Not required',
      cable: 'Not required',
      bundle: 'Not required',
    },
    {
      label: 'Rate guarantee',
      fiber: 'Confirmed at order',
      cable: '24 or 36 months by tier',
      bundle: '36 months',
    },
    {
      label: 'WiFi equipment',
      fiber: 'HomeFi℠ available',
      cable: 'HomeFi℠ included',
      bundle: 'HomeFi℠ unit included',
    },
    {
      label: 'Modem',
      fiber: 'Included with install',
      cable: 'Included on promotional tiers',
      bundle: 'Free modem included',
    },
    {
      label: 'Installation',
      fiber: 'Free on new fiber connections',
      cable: 'Quoted at order',
      bundle: 'Quoted at order',
    },
    {
      label: 'AutoPay + Paperless discount',
      fiber: '$5 / month',
      cable: '$5 / month',
      bundle: '$5 / month',
    },
    { label: 'Service calls', fiber: 'Free', cable: 'Free', bundle: 'Free' },
    {
      label: 'Money-back window',
      fiber: 'First 30 days',
      cable: 'First 30 days',
      bundle: 'First 30 days',
    },
    {
      label: 'Taxes, fees and surcharges',
      fiber: 'Additional',
      cable: 'Additional',
      bundle: 'Additional',
    },
  ],
  notes: [
    'Advertised rates assume enrollment in both AutoPay and Paperless Billing. Without both, add $5 per month.',
    'Promotional rates apply for the stated term. Standard rates apply afterward.',
    'Speeds shown are maximum wired download speeds. Actual throughput varies with in-home wiring, device capability and WiFi conditions.',
    'Equipment inclusions differ between promotional offers and standard rate plans.',
  ],
};

/* --------------------------------------------------------------------------
   7. WHY BLUE RIDGE — staggered feature grid
   -------------------------------------------------------------------------- */

export type FeatureIcon =
  | 'shield'
  | 'wifi'
  | 'clock'
  | 'map'
  | 'bolt'
  | 'receipt'
  | 'award'
  | 'headset'
  | 'gauge'
  | 'gift'
  | 'layers';

export interface FeatureItem {
  id: string;
  title: string;
  body: string;
  icon: FeatureIcon;
  /** Grid emphasis. 'wide' spans two columns on large screens. */
  span?: 'wide' | 'normal';
  /** When present the card renders as a photo card instead of a glyph card. */
  media?: Media;
}

export const whyUs: {
  eyebrow: string;
  title: string;
  description: string;
  items: FeatureItem[];
} = {
  eyebrow: 'The Blue Ridge Advantage',
  title: 'Serving Pennsylvania communities since 1950',
  description:
    'An independent Pennsylvania provider for seventy-five years. These commitments come with every service.',
  items: [
    {
      id: 'local',
      title: 'Local customer service',
      body: 'The team answering your call lives in the communities the network serves.',
      icon: 'map',
      media: {
        src: localTechnicianPorch,
        alt: 'A service technician talking with a homeowner on the front porch of a house on a residential street.',
      },
    },
    {
      id: 'guarantee',
      title: '30-day money-back guarantee',
      body: 'Not right in your first month? Disconnect and your money comes back.',
      icon: 'shield',
    },
    {
      id: 'homefi',
      title: 'HomeFi℠ with eero Pro 7',
      body: 'A WiFi 7 mesh system with TrueMesh™ routing, built-in security and automatic updates.',
      icon: 'wifi',
      media: {
        src: homefiShelf,
        alt: 'A compact white mesh WiFi unit on a wooden bookshelf beside a stack of worn paperbacks and a trailing houseplant.',
      },
    },
    {
      id: 'appointments',
      title: '2-hour appointment windows',
      body: 'A two-hour arrival window, not an open-ended afternoon.',
      icon: 'clock',
    },
    {
      id: 'servicecalls',
      title: 'Free service calls',
      body: 'When something needs attention, the technician visit is on Blue Ridge.',
      icon: 'bolt',
    },
    {
      id: 'bill',
      title: 'A bill you can read',
      body: 'No annual contracts, no buried line items. Every charge is itemised.',
      icon: 'receipt',
    },
    {
      id: 'award',
      title: 'Independent Operator of the Year',
      body: 'Named by CableFax Magazine in 2025.',
      icon: 'award',
    },
    {
      id: 'support',
      title: '24/7 technical support',
      body: 'Staffed around the clock, every day of the year.',
      icon: 'headset',
    },
  ],
};

/* --------------------------------------------------------------------------
   8. FAQ
   -------------------------------------------------------------------------- */

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const faqIntro = {
  eyebrow: 'Common questions',
  title: 'What to review before you order',
  description:
    'Clear answers on speeds, equipment, installation and terms. If your question is not addressed below, a brief call will resolve it.',
} as const;

export const faqs: FaqItem[] = [
  {
    id: 'faq-speed',
    question: 'How much speed does my household actually need?',
    answer:
      'A useful rule: 300 Mbps comfortably handles up to five people, video calls and around twenty connected devices. From 500 Mbps up you are covering work-from-home, 4K streaming on several screens at once and heavy device counts. The 1.2 Gig and 2 Gig tiers exist for large households moving big files, livestreaming or running immersive media. If you are between two tiers, start lower, because Blue Ridge lets you move up without an annual contract holding you in place.',
  },
  {
    id: 'faq-updown',
    question: 'Why is the upload speed lower than the download speed?',
    answer:
      'On a cable connection the network is engineered around downstream traffic, because most of what you do (loading pages, streaming video, downloading files) pulls data toward you. Upload matters for video calls, sending large files and parts of gaming. Blue Ridge cable tiers run from 7 Mbps up to 40 Mbps upstream. Blue Ridge Fiber is different: upload and download are symmetrical, which is the main reason to take fiber when it reaches your street.',
  },
  {
    id: 'faq-router',
    question: 'Do I need my own router, or is WiFi included?',
    answer:
      'Blue Ridge internet tiers include HomeFi℠, which replaces a traditional router with an eero Pro 7 mesh system. It runs WiFi 7 across the 2.4, 5 and 6 GHz bands, uses TrueMesh™ to pick the fastest path from each device, updates its own security automatically, and adds units to blanket larger homes. HomeFi Max adds extra ports and wider coverage, and HomeFi Outdoor is weather-rated for porches, patios and yards.',
  },
  {
    id: 'faq-install',
    question: 'What does installation look like?',
    answer:
      'You get a two-hour appointment window rather than an open-ended day. A local technician handles the connection, sets up your modem and HomeFi℠ units, and confirms speeds before leaving. Installation on a new Blue Ridge Fiber connection is free, and service calls afterward are free as well.',
  },
  {
    id: 'faq-data',
    question: 'Is there a data cap or an overage charge?',
    answer:
      'No. Every Blue Ridge internet tier carries unlimited data. There is no monthly allowance to track, no throttling threshold to plan around and no overage line appearing on a later bill.',
  },
  {
    id: 'faq-contract',
    question: 'Am I signing an annual contract?',
    answer:
      'No annual contract is required on Blue Ridge internet, TV or home phone. Promotional tiers carry a price guarantee, 24 or 36 months depending on the tier, which locks your rate for that period rather than locking you into the service.',
  },
  {
    id: 'faq-discount',
    question: 'How do I get the advertised rate?',
    answer:
      'The advertised rates reflect a $5 monthly discount for enrolling in both AutoPay and Paperless Billing. Enroll in both when you order and the discount applies from your first statement. Without them, add $5 per month to the price shown. Taxes, fees and surcharges are additional in every case.',
  },
  {
    id: 'faq-fiber-vs-cable',
    question: 'Should I wait for fiber or order cable internet now?',
    answer:
      'Blue Ridge Fiber is arriving street by street, so the honest answer depends on your address. If fiber is already at your home, take it, because symmetrical speeds and lower latency are a real upgrade. If the build has not reached you yet, the cable tiers deliver up to 2 Gig downstream today with no annual contract to unwind when fiber does arrive. A ZIP check or a short call settles it in about a minute.',
  },
  {
    id: 'faq-mobile',
    question: 'Can I add mobile lines to my account?',
    answer:
      'Yes, once you have Blue Ridge Internet. Blue Ridge Mobile runs on the network America relies on, with nationwide 5G and 4G LTE. The Shared Data plan is $15 per line with 1 GB per line pooled across the account, and the Unlimited plan is $30 per line. New mobile customers currently get one unlimited line free for 12 months.',
  },
  {
    id: 'faq-bundle',
    question: 'What is included in the three-year bundles?',
    answer:
      'Each bundle locks your internet rate for 36 months and includes a free modem, a HomeFi℠ unit and a Blue Ridge Stream unit. On top of that you get one free unlimited mobile line for 12 months and a year of Blue Ridge Total Protection cybersecurity. Bundles are available at 300 Mbps, 500 Mbps and 1.2 Gig.',
  },
];

/* --------------------------------------------------------------------------
   9. FOOTER — legal pages and disclosure
   -------------------------------------------------------------------------- */

export interface LegalPage {
  slug: string;
  title: string;
  summary: string;
  sections: { heading: string; body: string[] }[];
}

export const legalPages: LegalPage[] = [
  {
    slug: 'privacy-data-protection',
    title: 'Privacy & Data Protection',
    summary:
      'How this site collects, uses, stores and protects the information you provide when you request pricing or place an order.',
    sections: [
      {
        heading: 'Information we collect',
        body: [
          'When you submit a ZIP code, request availability, or contact our ordering team, we collect the information you choose to provide. That typically includes your name, service address, ZIP code, telephone number and email address.',
          'We also collect limited technical information automatically, including your IP address, browser type, device category, referring page and the pages you view on this site. This information is used to keep the site working correctly and to understand which pages are useful.',
        ],
      },
      {
        heading: 'How we use your information',
        body: [
          'Your information is used to confirm whether service is available at your address, to prepare an accurate quote, to place and provision an order on your behalf, and to follow up on a request you initiated.',
          'We do not sell your personal information, and we do not share it with third parties for their own independent marketing purposes.',
        ],
      },
      {
        heading: 'Data retention and security',
        body: [
          'We retain order-related information for as long as required to fulfill the order and to satisfy applicable legal, tax and record-keeping obligations, and no longer than necessary.',
          'Information is protected with administrative, technical and physical safeguards appropriate to its sensitivity, including encryption in transit and access controls that limit internal access to personnel with a business need.',
        ],
      },
      {
        heading: 'Your choices',
        body: [
          'You may request access to, correction of, or deletion of the personal information we hold about you, and you may withdraw consent for future marketing contact at any time. Requests are handled through the contact channel listed in this policy.',
          'Depending on your state of residence, you may have additional rights regarding the sale or sharing of personal information. Because we do not sell personal information, those rights are honored by default.',
        ],
      },
      {
        heading: 'Children',
        body: [
          'This site is directed to adults establishing residential service. We do not knowingly collect personal information from anyone under the age of 13.',
        ],
      },
    ],
  },
  {
    slug: 'disclaimer',
    title: 'Disclaimer',
    summary:
      'The basis on which pricing, speeds, availability and promotional terms are presented on this website.',
    sections: [
      {
        heading: 'Independent authorized retailer',
        body: [
          'This website is operated by an independent authorized retailer of Blue Ridge Communications. It is not the corporate website of Blue Ridge Communications, and it is not operated by Blue Ridge Communications.',
        ],
      },
      {
        heading: 'Pricing and availability',
        body: [
          'Pricing, speed tiers, promotional periods and equipment inclusions reflect published information for the service area and are subject to change without notice.',
          'Availability is determined address by address. Speeds, packages and promotions vary by location, and not every offer described on this site is available at every serviceable address.',
        ],
      },
      {
        heading: 'Performance',
        body: [
          'Advertised speeds are maximum wired download speeds. Actual speeds vary with in-home wiring, device capability, WiFi conditions, concurrent usage and network conditions. No specific speed is guaranteed to any individual device at any given moment.',
        ],
      },
      {
        heading: 'Final terms',
        body: [
          'The terms governing your service are the terms presented and accepted at the time your order is placed, together with the applicable service agreement. Where this website and those documents differ, those documents control.',
          'Taxes, fees, surcharges and any applicable installation charges are additional to the rates shown on this site unless expressly stated otherwise.',
        ],
      },
    ],
  },
  {
    slug: 'cookies-policy',
    title: 'Cookies Policy',
    summary:
      'What cookies and similar technologies this site uses, what they do, and how to control them.',
    sections: [
      {
        heading: 'What cookies are',
        body: [
          'Cookies are small text files placed on your device by a website. They allow a site to remember your actions and preferences over a period of time, and they support basic functionality such as maintaining state between pages.',
        ],
      },
      {
        heading: 'Categories we use',
        body: [
          'Strictly necessary cookies support core functionality such as page navigation, form submission and security. The site cannot function correctly without them and they cannot be switched off through our interface.',
          'Performance and analytics cookies help us understand which pages are viewed and where visitors encounter difficulty. This information is aggregated and is not used to identify you individually.',
          'Functional cookies remember choices you have made, such as a ZIP code you entered, so you do not have to re-enter them.',
        ],
      },
      {
        heading: 'Managing cookies',
        body: [
          'Every major browser allows you to view, block and delete cookies through its settings. Blocking strictly necessary cookies may prevent parts of this site from working as intended.',
          'Where required by applicable law, non-essential cookies are set only after you have consented, and consent can be withdrawn at any time through your browser settings.',
        ],
      },
    ],
  },
  {
    slug: 'tcpa-policy',
    title: 'TCPA Policy',
    summary:
      'How we obtain consent for telephone contact and how you can revoke it at any time.',
    sections: [
      {
        heading: 'Consent to be contacted',
        body: [
          'By submitting your telephone number through a form on this website, you consent to receive calls and text messages at that number regarding the service inquiry you initiated, including calls placed using automated telephone dialing technology or a prerecorded or artificial voice.',
          'Consent to receive marketing calls or texts is not a condition of purchasing any goods or services. You may place an order by calling our sales line directly.',
        ],
      },
      {
        heading: 'Message frequency and cost',
        body: [
          'Message frequency varies with the status of your inquiry. Message and data rates may apply according to your mobile plan. We do not charge for messages we send.',
        ],
      },
      {
        heading: 'Revoking consent',
        body: [
          'You may revoke consent at any time by replying STOP to any text message, by telling the representative on a call that you do not wish to be contacted again, or by submitting a written request through the contact channel on this site.',
          'Revocation is processed promptly. You may continue to receive transactional messages directly related to an order already in progress.',
        ],
      },
      {
        heading: 'Calling hours and do-not-call',
        body: [
          'Outbound calls are placed only within the hours permitted by applicable federal and state law. We maintain an internal do-not-call list and honor entries on it, along with entries on the National Do Not Call Registry, as required by law.',
        ],
      },
    ],
  },
  {
    slug: 'trademarks',
    title: 'Trademarks',
    summary: 'Ownership of the marks, names and logos referenced on this website.',
    sections: [
      {
        heading: 'Third-party marks',
        body: [
          'Blue Ridge Communications, Blue Ridge, Blue Ridge Fiber, Blue Ridge Stream, HomeFi and Blue Ridge Total Protection are trademarks or service marks of Blue Ridge Communications and its affiliates.',
          'eero is a trademark of eero LLC. TiVo is a trademark of TiVo Corporation. Android TV, Google Play, Google Assistant and Chromecast are trademarks of Google LLC. MGM+, HBO Max, Cinemax, Paramount+ with SHOWTIME, STARZ, NFL RedZone, Smithsonian Channel and Music Choice are trademarks of their respective owners.',
        ],
      },
      {
        heading: 'Basis of use',
        body: [
          'All third-party marks appear on this site solely to identify the services available for order through an authorized retail channel. Their use is nominative and does not imply that the mark holder endorses, sponsors or operates this website.',
          'No right, license or interest in any third-party mark is granted by its appearance on this site.',
        ],
      },
      {
        heading: 'Requests',
        body: [
          'A mark holder who believes a reference on this site should be corrected or removed may submit a request through the contact channel listed on this site, and it will be reviewed promptly.',
        ],
      },
    ],
  },
  {
    slug: 'marketing-policy',
    title: 'Marketing Policy',
    summary:
      'The standards governing how this site and our representatives describe pricing, promotions and service.',
    sections: [
      {
        heading: 'Accuracy standard',
        body: [
          'Every rate, speed tier and promotional term presented on this site is drawn from published information for the applicable service area. Material terms, meaning the promotional period, the conditions attached to a discount, and what is and is not included, are stated alongside the price rather than hidden in a footnote.',
        ],
      },
      {
        heading: 'How we describe offers',
        body: [
          'We do not present a promotional rate as a standard rate. Where a rate depends on enrollment in AutoPay and Paperless Billing, that condition is stated next to the price. Where equipment is included for a promotional period only, the period is stated.',
          'Where a package has no published rate, the site says so and directs you to a call rather than displaying an estimated figure.',
        ],
      },
      {
        heading: 'Representative conduct',
        body: [
          'Representatives identify themselves and the company at the start of every call. They do not create artificial urgency, misstate the terms of an offer, or place an order without your clear and informed authorization.',
        ],
      },
      {
        heading: 'Corrections',
        body: [
          'If published information changes or an error is identified on this site, the affected content is corrected promptly. Orders already placed are honored on the terms presented and accepted at the time of the order.',
        ],
      },
    ],
  },
  {
    slug: 'service-fulfillment',
    title: 'Service Fulfillment',
    summary:
      'What happens between placing an order on this site and having working service at your address.',
    sections: [
      {
        heading: 'Order placement',
        body: [
          'Orders are placed through our sales line. A representative confirms serviceability at your exact address, reviews the plan, the promotional term, the equipment included and the total expected monthly charge, and records your authorization before the order is submitted.',
        ],
      },
      {
        heading: 'Provisioning and installation',
        body: [
          'Once submitted, the order is provisioned for scheduling. You receive an appointment with a two-hour arrival window. A technician completes the connection, configures your modem and HomeFi℠ equipment, and verifies performance before leaving.',
        ],
      },
      {
        heading: 'Serviceability',
        body: [
          'If your address turns out not to be serviceable, or the tier you selected is unavailable there, we will tell you before anything is submitted and walk through what is actually available at that address.',
        ],
      },
      {
        heading: 'Changes and cancellation',
        body: [
          'You may change or cancel an order before installation at no charge. After installation, the terms of your service agreement govern, including the 30-day money-back window described in the offer materials.',
        ],
      },
    ],
  },
  {
    slug: 'pci-dss',
    title: 'PCI DSS',
    summary: 'How payment card information is handled, and the boundaries we keep around it.',
    sections: [
      {
        heading: 'Scope',
        body: [
          'This website does not collect, process, transmit or store payment card data. No page on this site contains a payment form, and no cardholder data is submitted through it.',
        ],
      },
      {
        heading: 'Where payment is handled',
        body: [
          'Payment details are collected exclusively at the point of provisioning through a PCI DSS compliant payment processor. Our representatives do not record full card numbers, and card data is never stored in our own systems.',
        ],
      },
      {
        heading: 'Applicable standards',
        body: [
          'Card payment handling within the fulfillment chain is conducted under the Payment Card Industry Data Security Standard. Encryption in transit, access restriction on a need-to-know basis, and logging of access to systems within scope are maintained as required by that standard.',
        ],
      },
      {
        heading: 'Reporting a concern',
        body: [
          'If you are ever asked for card details through a form on this website, do not provide them, because no such form exists. Report the request through the contact channel on this site so it can be investigated.',
        ],
      },
    ],
  },
];

export const footerCta = {
  title: 'Confirm availability at your address',
  description:
    'A single call confirms which speed tiers and promotions are available at your location, reviews the total monthly cost, and completes your order.',
} as const;

export const footer = {
  tagline:
    'Ordering, pricing and provisioning for Blue Ridge Communications residential services across Northeast and Central Pennsylvania and New York.',
  disclosure:
    'This website is operated by an independent authorized retailer of Blue Ridge Communications and is not the corporate website of Blue Ridge Communications. All product names, logos, brands, trademarks and registered trademarks are the property of their respective owners and are used here solely to identify the services available for order through this authorized retail channel.',
  columns: [
    {
      heading: 'Services',
      links: [
        { label: 'Blue Ridge Fiber', href: '/#fiber' },
        { label: 'High-Speed Internet', href: '/#cable' },
        { label: 'Internet + Mobile Bundles', href: '/#bundles' },
        { label: 'Stream & Live TV', href: '/#tv' },
        { label: 'Blue Ridge Mobile', href: '/#mobile' },
        { label: 'Home Phone', href: '/#phone' },
      ],
    },
    {
      heading: 'Ordering',
      links: [
        { label: 'Check availability', href: '/#hero' },
        { label: 'Compare inclusions', href: '/#fine-print' },
        { label: 'Why Blue Ridge', href: '/#why' },
        { label: 'Common questions', href: '/#faq' },
      ],
    },
  ],
} as const;

/* --------------------------------------------------------------------------
   10. DERIVED HELPERS
   -------------------------------------------------------------------------- */

/** Formats a Mbps figure the way the rate card reads it: 1200 -> "1.2 Gig". */
export function formatSpeed(mbps: number): { value: string; unit: string } {
  if (mbps >= 1000) {
    const gig = mbps / 1000;
    return { value: Number.isInteger(gig) ? String(gig) : gig.toFixed(1), unit: 'Gig' };
  }
  return { value: String(mbps), unit: 'Mbps' };
}

/** The button label rule: priced plans order, unpriced plans ask. */
export function ctaLabel(plan: PlanItem): string {
  return typeof plan.price === 'number' ? 'Call to order' : 'Call for pricing';
}

/** Lowest advertised monthly rate across every priced plan above $0. */
export const lowestPrice: number = Math.min(
  ...serviceSections
    .flatMap((section) => section.plans)
    .map((plan) => plan.price)
    .filter((price): price is number => typeof price === 'number' && price > 0),
);
