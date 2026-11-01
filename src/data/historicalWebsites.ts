export interface HistoricalWebPage {
  url: string;
  title: string;
  category: string;
  date: string;
  renderType:
    | 'gujarat_portal'
    | 'eci_portal'
    | 'rbi_press'
    | 'supreme_court'
    | 'hindu_archive'
    | 'sachivalaya_intranet'
    | 'google_search';
}

export const HISTORICAL_WEBSITES: Record<string, HistoricalWebPage> = {
  'http://www.gujaratindia.com': {
    url: 'http://www.gujaratindia.com',
    title: 'Welcome to Government of Gujarat - Official State Web Portal',
    category: 'State Government Portal',
    date: 'Updated: October 2013',
    renderType: 'gujarat_portal',
  },
  'http://eci.gov.in/results2014': {
    url: 'http://eci.gov.in/results2014',
    title: 'Election Commission of India - General Elections 2014 Results',
    category: 'Election Results Portal',
    date: '16 May 2014',
    renderType: 'eci_portal',
  },
  'http://www.rbi.org.in/press/demonetisation_2016': {
    url: 'http://www.rbi.org.in/press/demonetisation_2016',
    title: 'Reserve Bank of India - Press Release: Withdrawal of ₹500 and ₹1000 Banknotes',
    category: 'Central Banking Press Release',
    date: '08 November 2016',
    renderType: 'rbi_press',
  },
  'http://www.supremecourtofindia.nic.in/sit_order_2013': {
    url: 'http://www.supremecourtofindia.nic.in/sit_order_2013',
    title: 'Supreme Court of India - Judgments on SIT Gujarat Riot Inquiries',
    category: 'Judicial Repository',
    date: 'December 2013',
    renderType: 'supreme_court',
  },
  'http://news.thehindu.com/archive/2002_2016': {
    url: 'http://news.thehindu.com/archive/2002_2016',
    title: 'The Hindu Digital Archive - India Political Coverage (2002-2016)',
    category: 'National Newspaper Archive',
    date: 'November 2016',
    renderType: 'hindu_archive',
  },
  'http://sachivalaya.internal/bulletin': {
    url: 'http://sachivalaya.internal/bulletin',
    title: 'Gandhinagar Sachivalaya Intranet Bulletin Board (Internal Network)',
    category: 'Administrative Intranet',
    date: '11 November 2016',
    renderType: 'sachivalaya_intranet',
  },
  'http://www.google.co.in': {
    url: 'http://www.google.co.in',
    title: 'Google India (Beta) - Search the Historical Web',
    category: 'Search Engine',
    date: 'Historical Index 2001–2016',
    renderType: 'google_search',
  },
};

export interface SearchResultItem {
  title: string;
  snippet: string;
  url: string;
  date: string;
  tag: string;
}

export const HISTORICAL_SEARCH_INDEX: SearchResultItem[] = [
  {
    title: 'Gujarat State Official Portal: CM Profile & Policy Dashboard',
    snippet: 'Official profile of Chief Minister Narendra Modi (2001-2014), Jyotigram Yojana rural electrification, SWAGAT grievance resolution portal, and industrial policies.',
    url: 'http://www.gujaratindia.com',
    date: '2013',
    tag: 'Official Portal',
  },
  {
    title: 'ECI Results 2014: 16th Lok Sabha Party-wise Seat Tally',
    snippet: 'Official declaration by Election Commission of India: BJP secures 282 seats, NDA wins 336 seats. Congress tally reduced to 44. Total votes polled: 553.8 million.',
    url: 'http://eci.gov.in/results2014',
    date: '16 May 2014',
    tag: 'Election Commission',
  },
  {
    title: 'RBI Press Release: Legal Tender Character of Existing ₹ 500 & ₹ 1000 Notes Withdrawn',
    snippet: 'Notification issued on November 8, 2016, under Section 26(2) of the RBI Act 1934. Guidelines for depositing currency in bank branches and exchange limits until December 30.',
    url: 'http://www.rbi.org.in/press/demonetisation_2016',
    date: '08 Nov 2016',
    tag: 'Monetary Policy',
  },
  {
    title: 'Supreme Court of India: Record of Proceedings on SIT 2002 Riot Probes',
    snippet: 'Summary of the SIT investigation under former CBI Director R.K. Raghavan, closure report filed in Ahmedabad magistrate court, and subsequent judicial dismissals.',
    url: 'http://www.supremecourtofindia.nic.in/sit_order_2013',
    date: '2013',
    tag: 'Judicial Orders',
  },
  {
    title: 'The Hindu National News Archive (2002–2016)',
    snippet: 'Comprehensive journalistic coverage from Godhra train burning, Best Bakery trials, 2014 general election campaigns, Dadri lynching debates, JNU sedition row, to November 2016 demonetisation queues.',
    url: 'http://news.thehindu.com/archive/2002_2016',
    date: '2002–2016',
    tag: 'News Archive',
  },
  {
    title: 'Sachivalaya Internal Network: Secretariat Notice Board',
    snippet: 'Staff notices, office relocation to Swarnim Sankul Phase 3, missing files alert, canteen samosa tariff committee, and 1998 hardware disposal directives.',
    url: 'http://sachivalaya.internal/bulletin',
    date: 'Nov 2016',
    tag: 'Secretariat Intranet',
  },
  {
    title: 'Vibrant Gujarat Global Investors Summit History (2003-2013)',
    snippet: 'Comprehensive archives of the biennial investor summits held at Science City and Mahatma Mandir, MoUs signed, and industrial growth in Sanand, Mundra, and Dahej.',
    url: 'http://www.gujaratindia.com#vibrant',
    date: '2013',
    tag: 'Investment',
  },
  {
    title: 'Dadri Lynching Incident & National Intolerance Debate (2015)',
    snippet: 'Investigation into the killing of Mohammad Akhlaq in Bisada village, forensic testing on meat samples, President Pranab Mukherjee\'s appeal, and Award Wapsi movement.',
    url: 'http://news.thehindu.com/archive/2002_2016#dadri',
    date: 'Oct 2015',
    tag: 'Controversy',
  },
  {
    title: 'JNU Sedition Row & Patiala House Scuffles (February 2016)',
    snippet: 'Arrest of student union leader Kanhaiya Kumar under IPC 124A, magisterial inquiry report on doctored news broadcasts, and Delhi High Court bail order.',
    url: 'http://news.thehindu.com/archive/2002_2016#jnu',
    date: 'Mar 2016',
    tag: 'Legal/Student Politics',
  },
];

