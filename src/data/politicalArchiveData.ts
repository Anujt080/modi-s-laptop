import type { FileNode } from '../types';
import { MEME_NODES } from './memeImagesData';

/**
 * Historical Political Archive (2001–2016)
 * Recovered from an abandoned Windows 98 terminal in Gandhinagar, Gujarat.
 *
 * All historical records adhere to rigorous historiographical standards:
 * - Differentiating verified facts, official statements, allegations, investigations, and court findings.
 * - Historical timeline strictly ends in November 2016.
 * - Fictional narrative elements are clearly marked with storytelling disclaimers.
 */

export const INITIAL_POLITICAL_NODES: Record<string, FileNode> = {
  // ==========================================
  // ROOT DRIVES
  // ==========================================
  'root-c': {
    id: 'root-c',
    name: 'Local Disk (C:)',
    isDirectory: true,
    parentId: null,
    path: 'C:',
    modified: '2016-11-11 23:14',
    fileType: 'folder',
    icon: 'drive-c',
  },
  'root-d': {
    id: 'root-d',
    name: 'Backup Drive (D:)',
    isDirectory: true,
    parentId: null,
    path: 'D:',
    modified: '2016-11-10 18:42',
    fileType: 'folder',
    icon: 'drive-d',
  },

  // ==========================================
  // C: DRIVE CORE DIRECTORIES
  // ==========================================
  'dir-windows': {
    id: 'dir-windows',
    name: 'WINDOWS',
    isDirectory: true,
    parentId: 'root-c',
    path: 'C:\\WINDOWS',
    modified: '2008-04-12 11:20',
    fileType: 'folder',
    icon: 'folder',
  },
  'dir-system': {
    id: 'dir-system',
    name: 'SYSTEM',
    isDirectory: true,
    parentId: 'dir-windows',
    path: 'C:\\WINDOWS\\SYSTEM',
    modified: '2008-04-12 11:22',
    fileType: 'folder',
    icon: 'folder',
  },
  'dir-program-files': {
    id: 'dir-program-files',
    name: 'PROGRAM FILES',
    isDirectory: true,
    parentId: 'root-c',
    path: 'C:\\PROGRAM FILES',
    modified: '2008-04-12 11:25',
    fileType: 'folder',
    icon: 'folder',
  },
  'dir-my-docs': {
    id: 'dir-my-docs',
    name: 'MY DOCUMENTS',
    isDirectory: true,
    parentId: 'root-c',
    path: 'C:\\MY DOCUMENTS',
    modified: '2016-11-11 22:50',
    fileType: 'folder',
    icon: 'documents',
  },
  'dir-my-pics': {
    id: 'dir-my-pics',
    name: 'MY PICTURES',
    isDirectory: true,
    parentId: 'root-c',
    path: 'C:\\MY PICTURES',
    modified: '2016-11-04 14:10',
    fileType: 'folder',
    icon: 'pictures',
  },
  'dir-secret': {
    id: 'dir-secret',
    name: 'SECRET',
    isDirectory: true,
    parentId: 'root-c',
    path: 'C:\\SECRET',
    modified: '2016-11-12 01:45',
    fileType: 'folder',
    icon: 'secret',
    isHidden: false,
  },

  // ==========================================
  // C:\MY DOCUMENTS SUBDIRECTORIES
  // ==========================================
  'dir-gujarat-2001-2013': {
    id: 'dir-gujarat-2001-2013',
    name: 'GUJARAT_2001_2013',
    isDirectory: true,
    parentId: 'dir-my-docs',
    path: 'C:\\MY DOCUMENTS\\GUJARAT_2001_2013',
    modified: '2013-12-30 16:20',
    fileType: 'folder',
    icon: 'folder',
  },
  'dir-elections-2014': {
    id: 'dir-elections-2014',
    name: 'ELECTIONS_2014',
    isDirectory: true,
    parentId: 'dir-my-docs',
    path: 'C:\\MY DOCUMENTS\\ELECTIONS_2014',
    modified: '2014-06-02 10:15',
    fileType: 'folder',
    icon: 'folder',
  },
  'dir-govt-policies': {
    id: 'dir-govt-policies',
    name: 'GOVERNMENT_POLICIES',
    isDirectory: true,
    parentId: 'dir-my-docs',
    path: 'C:\\MY DOCUMENTS\\GOVERNMENT_POLICIES',
    modified: '2016-03-15 17:40',
    fileType: 'folder',
    icon: 'folder',
  },
  'dir-controversies': {
    id: 'dir-controversies',
    name: 'CONTROVERSIES',
    isDirectory: true,
    parentId: 'dir-my-docs',
    path: 'C:\\MY DOCUMENTS\\CONTROVERSIES',
    modified: '2016-04-18 19:30',
    fileType: 'folder',
    icon: 'folder',
  },
  'dir-final-archive-2016': {
    id: 'dir-final-archive-2016',
    name: 'FINAL_ARCHIVE_2016',
    isDirectory: true,
    parentId: 'dir-my-docs',
    path: 'C:\\MY DOCUMENTS\\FINAL_ARCHIVE_2016',
    modified: '2016-11-12 02:40',
    fileType: 'folder',
    icon: 'folder',
  },

  // ==========================================
  // C:\MY PICTURES SUBDIRECTORIES
  // ==========================================
  'dir-work-epstein': {
    id: 'dir-work-epstein',
    name: 'WORK WITH EPSTEIN',
    isDirectory: true,
    parentId: 'dir-my-pics',
    path: 'C:\\MY PICTURES\\WORK WITH EPSTEIN',
    modified: '2016-11-10 19:45',
    fileType: 'folder',
    icon: 'pictures',
  },
  'dir-memes-political': {
    id: 'dir-memes-political',
    name: 'POLITICAL MEMES',
    isDirectory: true,
    parentId: 'dir-my-pics',
    path: 'C:\\MY PICTURES\\POLITICAL MEMES',
    modified: '2016-11-10 20:30',
    fileType: 'folder',
    icon: 'pictures',
  },
  'dir-pics-gujarat': {
    id: 'dir-pics-gujarat',
    name: 'GUJARAT_ARCHIVE',
    isDirectory: true,
    parentId: 'dir-my-pics',
    path: 'C:\\MY PICTURES\\GUJARAT_ARCHIVE',
    modified: '2013-11-10 12:00',
    fileType: 'folder',
    icon: 'pictures',
  },
  'dir-pics-election2014': {
    id: 'dir-pics-election2014',
    name: 'ELECTION_2014',
    isDirectory: true,
    parentId: 'dir-my-pics',
    path: 'C:\\MY PICTURES\\ELECTION_2014',
    modified: '2014-05-28 15:30',
    fileType: 'folder',
    icon: 'pictures',
  },
  'dir-pics-national': {
    id: 'dir-pics-national',
    name: 'NATIONAL_EVENTS',
    isDirectory: true,
    parentId: 'dir-my-pics',
    path: 'C:\\MY PICTURES\\NATIONAL_EVENTS',
    modified: '2016-01-20 18:20',
    fileType: 'folder',
    icon: 'pictures',
  },

  // ==========================================
  // D: BACKUP DRIVE SUBDIRECTORIES
  // ==========================================
  'dir-d-historical': {
    id: 'dir-d-historical',
    name: 'HISTORICAL_RECORDS',
    isDirectory: true,
    parentId: 'root-d',
    path: 'D:\\HISTORICAL_RECORDS',
    modified: '2015-08-14 11:00',
    fileType: 'folder',
    icon: 'folder',
  },
  'dir-d-news': {
    id: 'dir-d-news',
    name: 'NEWS_CLIPPINGS',
    isDirectory: true,
    parentId: 'root-d',
    path: 'D:\\NEWS_CLIPPINGS',
    modified: '2016-11-10 16:30',
    fileType: 'folder',
    icon: 'folder',
  },
  'dir-d-public-docs': {
    id: 'dir-d-public-docs',
    name: 'PUBLIC_DOCUMENTS',
    isDirectory: true,
    parentId: 'root-d',
    path: 'D:\\PUBLIC_DOCUMENTS',
    modified: '2016-09-05 14:15',
    fileType: 'folder',
    icon: 'folder',
  },
  'dir-d-court-cases': {
    id: 'dir-d-court-cases',
    name: 'COURT_CASES',
    isDirectory: true,
    parentId: 'root-d',
    path: 'D:\\COURT_CASES',
    modified: '2014-03-22 10:45',
    fileType: 'folder',
    icon: 'folder',
  },
  'dir-d-unrecovered': {
    id: 'dir-d-unrecovered',
    name: 'UNRECOVERED_FILES',
    isDirectory: true,
    parentId: 'root-d',
    path: 'D:\\UNRECOVERED_FILES',
    modified: '2016-11-12 02:15',
    fileType: 'folder',
    icon: 'secret',
  },

  // ==========================================
  // FILES IN GUJARAT_2001_2013
  // ==========================================
  'file-guj-timeline': {
    id: 'file-guj-timeline',
    name: 'gujarat_timeline_2001_2013.txt',
    isDirectory: false,
    parentId: 'dir-gujarat-2001-2013',
    path: 'C:\\MY DOCUMENTS\\GUJARAT_2001_2013\\gujarat_timeline_2001_2013.txt',
    fileType: 'text',
    icon: 'file-text',
    size: 4320,
    modified: '2013-12-28 17:30',
    metadata: {
      documentTitle: 'Gujarat Political & Governance Chronology (2001–2013)',
      historicalDate: 'October 2001 – December 2013',
      sourceOrPublication: 'Gujarat Information Bureau / General Administration Dept Archive',
      category: 'verified_fact',
      summary: 'Chronological milestone record documenting key administrative, judicial, and electoral events during Narendra Modi\'s tenure as Chief Minister of Gujarat.',
      publicSourceUrl: 'https://gujaratindia.gov.in/archive',
    },
    content: `=== HISTORICAL ARCHIVE: GUJARAT CHRONOLOGY (2001–2013) ===
CLASSIFICATION: [VERIFIED HISTORICAL FACT]
SOURCE: Official Gazette of Gujarat & General Administration Dept records
RECORD COMPILATION: Administrative Branch, Gandhinagar Secretariat

1. OCTOBER 07, 2001 — OATH OF OFFICE
Narendra Modi was sworn in as the 14th Chief Minister of Gujarat following the resignation of Keshubhai Patel amidst health concerns and reconstruction challenges following the devastating Bhuj earthquake of January 26, 2001.

2. FEBRUARY 24, 2002 — RAJKOT II BY-ELECTION
Modi contested his first electoral contest from Rajkot-II assembly constituency, winning by a margin of 14,728 votes over Congress candidate Ashwin Mehta to secure his legislative assembly seat.

3. FEBRUARY 27, 2002 — GODHRA SABARMATI EXPRESS TRAGEDY
Coach S-6 of the Sabarmati Express carrying kar sevaks returning from Ayodhya was set ablaze near Godhra railway station. 59 passengers (including 27 women and 10 children) were killed. The state government instituted the Justice K.G. Shah Commission of Inquiry on March 6, 2002, later reconstituted as the Nanavati-Mehta Commission.

4. FEBRUARY 28 – MARCH 2002 — GUJARAT RIOTS
Widespread communal violence erupted across multiple districts of Gujarat, particularly Ahmedabad, Vadodara, and Panchmahal. Major incidents included Gulbarg Society, Naroda Patiya, and Best Bakery. Official home ministry figures presented in Parliament recorded 1,044 deaths (790 Muslims, 254 Hindus), 223 persons missing, and over 2,500 injured.

5. DECEMBER 12, 2002 — GUJARAT ASSEMBLY GENERAL ELECTIONS
BJP secured an absolute majority winning 127 out of 182 seats under the Gaurav Yatra campaign banner. Congress won 51 seats. Modi took oath for his second term on December 22, 2002.

6. SEPTEMBER 2003 — INAUGURAL VIBRANT GUJARAT GLOBAL SUMMIT
Launched at the Science City, Ahmedabad, to rebrand Gujarat as an investment destination. 76 Memoranda of Understanding (MoUs) worth an estimated ₹66,000 crore were signed, establishing a biennial tradition.

7. 2006 — JYOTIGRAM YOJANA (RURAL 24x7 ELECTRICITY)
The state government segregated agricultural feeders from domestic rural power supplies, providing 24x7 three-phase domestic power to over 18,000 villages and scheduled farm power for tubewell irrigation.

8. MARCH 2008 — SUPREME COURT APPOINTS SPECIAL INVESTIGATION TEAM (SIT)
The Supreme Court of India directed the constitution of an SIT headed by former CBI Director R.K. Raghavan to re-investigate nine major 2002 riot cases including Gulbarg Society, Naroda Patiya, and Godhra.

9. OCTOBER 2008 — TATA NANO SANAND RELOCATION
Following land protests in Singur, West Bengal, Tata Motors relocated the Nano manufacturing facility to Sanand, Gujarat, following rapid government clearances within 48 hours.

10. FEBRUARY 2012 — SIT CLOSURE REPORT FILED
The Supreme Court-appointed SIT submitted its final closure report before the Metropolitan Magistrate in Ahmedabad, stating there was no prosecutable evidence against Narendra Modi and 62 others named in Zakia Jafri's complaint.

11. DECEMBER 2012 — THIRD SUCCESSIVE ASSEMBLY VICTORY
BJP won 115 seats in the 2012 Gujarat Assembly Elections. Modi commenced his fourth tenure as Chief Minister.

12. JUNE – SEPTEMBER 2013 — NATIONAL PM CANDIDATURE
At the BJP National Executive in Goa (June 2013), Modi was appointed Campaign Committee Chief. On September 13, 2013, BJP Parliamentary Board officially announced Narendra Modi as the Prime Ministerial candidate for the 2014 Lok Sabha elections.

13. DECEMBER 26, 2013 — MAGISTRATE COURT ACCEPTS SIT CLOSURE REPORT
Metropolitan Magistrate B.J. Ganatra rejected the protest petition filed by Zakia Jafri and accepted the SIT's closure report finding no evidence of a criminal conspiracy at the highest level during the 2002 riots.`,
  },

  'file-godhra-2002': {
    id: 'file-godhra-2002',
    name: 'godhra_2002_archive.pdf',
    isDirectory: false,
    parentId: 'dir-gujarat-2001-2013',
    path: 'C:\\MY DOCUMENTS\\GUJARAT_2001_2013\\godhra_2002_archive.pdf',
    fileType: 'pdf',
    icon: 'file-pdf',
    size: 5120,
    modified: '2012-03-01 14:10',
    metadata: {
      documentTitle: 'Dossier on Godhra Incident and Subsequent Communal Violence (2002)',
      historicalDate: '27 February 2002 – 2011 Judicial Verdicts',
      sourceOrPublication: 'Nanavati-Mehta Commission Report / SIT Special Court Verdicts',
      category: 'judicial_finding',
      summary: 'Comprehensive historical and judicial dossier detailing the burning of Sabarmati Express coach S-6 and subsequent judicial findings by the SIT Special Court.',
      publicSourceUrl: 'https://archive.org/details/nanavati-mehta-commission-report-part-1',
    },
    content: `=== DOSSIER: GODHRA TRAIN BURNING & 2002 GUJARAT RIOTS ===
DOCUMENT CLASSIFICATION: [JUDICIAL FINDINGS & VERIFIED PUBLIC RECORDS]
OFFICIAL REFERENCES:
- Nanavati-Mehta Commission of Inquiry Part I (Submitted Sept 2008)
- SIT Special Court Judgment (Sessions Case No. 47/2009, Pronounced March 2011)
- Parliamentary Hansard, Lok Sabha Question No. 377 (Answered May 11, 2005)

1. EVENT RECONSTRUCTION: GODHRA (27 FEBRUARY 2002)
* Time of Occurrence: 07:43 AM IST.
* Location: Godhra Railway Station outer signal, Signal Faliya.
* Train: 9166 Down Sabarmati Express from Muzaffarpur to Ahmedabad.
* Coach: S-6 sleeper compartment.
* Fatalities: 59 persons (including 27 women and 10 children).
* Injured: 48 persons hospitalized.
* Passengers: Contained kar sevaks returning from the 'Purna Ahuti Yagna' organized by the Vishva Hindu Parishad (VHP) in Ayodhya.

2. JUDICIAL PROCEEDINGS & SPECIAL COURT VERDICT (MARCH 01, 2011)
* Additional Sessions Judge P.R. Patel of the SIT Special Court delivered the verdict after an 8-year trial.
* The court convicted 31 accused under charges of murder and criminal conspiracy under IPC Section 302 and Section 120B.
* 11 convicts were awarded capital punishment (death penalty), and 20 convicts were sentenced to life imprisonment.
* 63 accused were acquitted due to lack of substantive evidence, including prime accused Maulvi Umarji.
* The court accepted the SIT's finding that 140 litres of petrol had been procured from Aman Guest House and poured into coach S-6 from the vestibule.

3. SUBSEQUENT RIOTS ACROSS GUJARAT (28 FEBRUARY – MAY 2002)
* Bandh declared by VHP on February 28, supported by the state BJP unit.
* Violence spread across 151 towns and 993 villages in 16 out of 25 districts.
* Casualties (Government Data submitted to Parliament):
  - Total deaths: 1,044 (790 Muslims, 254 Hindus).
  - Missing persons: 223.
  - Injured: 2,548.
  - Relief camps established: 115 camps accommodating 150,000 displaced citizens.

4. CRITICAL SCRUTINY AND UNRESOLVED QUESTIONS:
* Allegations raised by civil rights organizations (PUCL, Citizens for Justice and Peace):
  - Inadequate preventive police deployment during the initial 72 hours.
  - Delays in military deployment despite Army flag marches on March 1, 2002.
* Official State Government Position:
  - Curfew was clamped in 26 cities and towns by 28 February afternoon.
  - Police fired 10,559 rounds of bullets, 33,450 teargas shells, and arrested 35,552 persons (27,901 preventive arrests) during the crisis.
  - 137 rioters were killed directly in police firing across both communities.`,
  },

  'file-riot-investigation': {
    id: 'file-riot-investigation',
    name: 'riot_investigation_timeline.doc',
    isDirectory: false,
    parentId: 'dir-gujarat-2001-2013',
    path: 'C:\\MY DOCUMENTS\\GUJARAT_2001_2013\\riot_investigation_timeline.doc',
    fileType: 'doc',
    icon: 'file-text',
    size: 4800,
    modified: '2013-12-27 11:20',
    metadata: {
      documentTitle: 'Judicial Proceedings and Investigation Trajectory (2002–2013)',
      historicalDate: 'March 2002 – December 2013',
      sourceOrPublication: 'Supreme Court of India Case Archives & Special Investigation Team (SIT)',
      category: 'judicial_finding',
      summary: 'Chronology of commissions, Supreme Court interventions, Best Bakery transfer, SIT formation, and closure report findings.',
      publicSourceUrl: 'https://main.sci.gov.in/judgments',
    },
    content: `=== CHRONOLOGY: GUJARAT RIOT JUDICIAL INVESTIGATIONS ===
CLASSIFICATION: [JUDICIAL RECORD / SUPREME COURT ORDERS]
LEGAL MATTERS: WP (Crl.) 109/2003, SLP (Crl.) 1088/2008

1. NANAVATI-MEHTA COMMISSION (MARCH 2002 – NOVEMBER 2014)
* Appointed on 6 March 2002 by Gujarat Government under the Commissions of Inquiry Act, 1952.
* Chaired initially by retired SC Justice K.G. Shah, joined in May 2002 by retired SC Justice G.T. Nanavati as Chairman. After Justice Shah's demise in 2008, retired Gujarat HC Justice Akshay Mehta was inducted.
* Part I Report (Tabled in Gujarat Assembly Sept 2008):
  - Concluded Godhra train burning was not an accidental fire, but a premeditated conspiracy.
* Part II Report (Final submission Nov 2014, tabled Dec 2019):
  - Concluded there was no evidence that the Chief Minister or other state ministers directed police to withhold action during the riots.

2. SUPREME COURT INTERVENTION & BEST BAKERY TRANSFER (2003–2004)
* Best Bakery Case (Vadodara): 14 people killed on March 1, 2002.
* All 21 accused acquitted by Vadodara Fast Track Court in June 2003 following key witness Zahira Sheikh turning hostile.
* In April 2004, the Supreme Court of India took the unprecedented step of quashing the acquittal, ordering a retrial, and transferring the case outside Gujarat to a Special Court in Mumbai, Maharashtra.
* The Supreme Court bench delivered harsh observations on prosecutorial failure.

3. CONSTITUTION OF SUPREME COURT SPECIAL INVESTIGATION TEAM (2008)
* On 26 March 2008, a three-judge Supreme Court bench headed by Chief Justice K.G. Balakrishnan ordered the constitution of a Special Investigation Team (SIT).
* Composition:
  - Former CBI Director R.K. Raghavan (Chairman)
  - Former DG Uttar Pradesh Police C.B. Satpathy
  - Three senior Gujarat police officers: Geetha Johri, Shivanand Jha, Ashish Bhatia.
* Mandate: Re-investigate 9 critical cases: Godhra, Gulbarg Society, Naroda Patiya, Naroda Gam, Sardarpura, Dipda Darwaja, Ode (2 cases), and British nationals killing in Prantij.

4. SIT QUESTIONING OF NARENDRA MODI (MARCH 27–28, 2010)
* Under Supreme Court directives on Zakia Jafri's complaint, SIT officer A.K. Malhotra summoned CM Narendra Modi to the SIT office in Gandhinagar.
* Modi appeared voluntarily without legal counsel and was interrogated for over 9 hours over two sessions, answering 71 detailed questions.

5. AMICUS CURIAE RAJU RAMACHANDRAN (2011–2012)
* The Supreme Court appointed senior advocate Raju Ramachandran as independent Amicus Curiae to assess the SIT's findings.
* Amicus Curiae noted in his report that certain conflicting statements by suspended IPS officer Sanjiv Bhatt warranted testing in a trial court, though the SIT concluded Bhatt's presence at the February 27 meeting was unsubstantiated by cell tower records.

6. SIT CLOSURE REPORT & MAGISTRATE VERDICT (2012–2013)
* On February 8, 2012, SIT filed a 541-page closure report before Metropolitan Magistrate B.J. Ganatra stating no prosecutable evidence existed against Narendra Modi and 62 others.
* On December 26, 2013, the court upheld the closure report and dismissed Zakia Jafri's protest petition.`,
  },

  'file-zakia-jafri': {
    id: 'file-zakia-jafri',
    name: 'zakia_jafri_case.txt',
    isDirectory: false,
    parentId: 'dir-gujarat-2001-2013',
    path: 'C:\\MY DOCUMENTS\\GUJARAT_2001_2013\\zakia_jafri_case.txt',
    fileType: 'text',
    icon: 'file-text',
    size: 3450,
    modified: '2013-12-27 16:45',
    metadata: {
      documentTitle: 'Zakia Jafri Case Dossier & Criminal Complaint Against 63 Persons',
      historicalDate: 'June 2006 – December 2013',
      sourceOrPublication: 'Court of Metropolitan Magistrate, Ahmedabad / Supreme Court of India',
      category: 'judicial_finding',
      summary: 'Details of the Gulbarg Society massacre, the complaint by Zakia Jafri, SIT findings, and magistrate court closure orders.',
      publicSourceUrl: 'https://indiankanoon.org/doc/zakia-jafri-magistrate-order-2013',
    },
    content: `=== LEGAL RECORD: ZAKIA JAFRI COMPLAINT & JUDICIAL PROCEEDINGS ===
CLASSIFICATION: [JUDICIAL PROCEEDINGS & COURT TESTIMONY]
CASE: Zakia Ehsan Jafri & CJP vs. State of Gujarat & Others

1. BACKGROUND: GULBARG SOCIETY MASSACRE (FEBRUARY 28, 2002)
* Gulbarg Society, a residential Muslim neighborhood in Chamanpura, Ahmedabad.
* A violent mob surrounded the society from 09:00 AM onwards.
* Former Congress Member of Parliament Ehsan Jafri and 68 other residents were killed; 31 went missing and were presumed dead after seven years.
* In 2016, a Special SIT Court convicted 24 persons for the Gulbarg killings (11 for murder), while acquitting 36 others.

2. THE COMPLAINT OF JUNE 08, 2006
* Zakia Jafri (widow of Ehsan Jafri) submitted a 67-page complaint to the Director General of Police, Gujarat, seeking registration of an FIR against 63 individuals, including:
  - Chief Minister Narendra Modi
  - Cabinet ministers and MLAs
  - Top bureaucrats (Chief Secretary, Home Secretary)
  - Senior police officials (DGP, Commissioners of Police)
* Allegations:
  - Larger criminal conspiracy behind the post-Godhra riots.
  - Instructions allegedly given at a late-night meeting on February 27, 2002 at the Chief Minister's residence to allow "Hindus to vent their anger".
  - Systematic transfer of upright police officers who controlled mobs.
  - Failure to preserve wireless telephone and control room logs.

3. SUPREME COURT DIRECTIVE TO SIT (APRIL 27, 2009)
* Following Gujarat Police's refusal to register the FIR, Zakia Jafri and Citizens for Justice and Peace (headed by Teesta Setalvad) approached the Supreme Court.
* The Supreme Court directed its SIT to look into the allegations in the complaint.

4. SIT'S FINAL CLOSURE REPORT (SUBMITTED 8 FEBRUARY 2012)
* The SIT examined 168 witnesses, including Narendra Modi, police chiefs, and bureaucrats.
* Key Findings:
  - No evidence of a meeting where instructions were given to allow riots.
  - Sanjiv Bhatt's claim of attending the February 27 meeting was found unreliable; police logbooks and mobile tower records showed he was elsewhere.
  - Deployment of Army was requisitioned on the evening of February 28, and troops were airlifted by early March 1 morning.
  - No prosecutable material established to frame charges under IPC 120B (Criminal Conspiracy).

5. MAGISTRATE COURT JUDGMENT (26 DECEMBER 2013)
* Metropolitan Magistrate B.J. Ganatra rejected Zakia Jafri's protest petition in its entirety.
* The court observed that the SIT had performed an exhaustive investigation under the direct monitoring of the Supreme Court and accepted the closure report.`,
  },

  'file-vibrant-gujarat': {
    id: 'file-vibrant-gujarat',
    name: 'vibrant_gujarat_archive.doc',
    isDirectory: false,
    parentId: 'dir-gujarat-2001-2013',
    path: 'C:\\MY DOCUMENTS\\GUJARAT_2001_2013\\vibrant_gujarat_archive.doc',
    fileType: 'doc',
    icon: 'file-text',
    size: 4200,
    modified: '2013-09-14 11:30',
    metadata: {
      documentTitle: 'Vibrant Gujarat Global Investor Summits: Economic Dossier (2003–2013)',
      historicalDate: '2003 – 2013',
      sourceOrPublication: 'Industrial Extension Bureau (iNDEXTb) / Dept of Industries, Gujarat',
      category: 'official_statement',
      summary: 'Official data on Vibrant Gujarat summits, investment MoUs, industrialization, alongside economic critiques regarding MoU conversion rates.',
      publicSourceUrl: 'https://vibrantgujarat.com/archive',
    },
    content: `=== ECONOMIC REPORT: VIBRANT GUJARAT & INDUSTRIAL EXPANSION ===
CLASSIFICATION: [OFFICIAL DATA WITH ECONOMIC ANALYTICAL CRITIQUE]
AGENCY: Industrial Extension Bureau (iNDEXTb), Government of Gujarat

1. OVERVIEW & OBJECTIVES
Conceived in 2003 by Chief Minister Narendra Modi to restore business confidence following the 2001 earthquake and 2002 communal unrest. Evolved into a biennial global platform held at Mahatma Mandir in Gandhinagar.

2. SUMMIT CHRONOLOGY & DECLARED MoUs (2003–2013):
* Vibrant Gujarat 2003: 76 MoUs signed; pledged value ₹66,000 Crore.
* Vibrant Gujarat 2005: 226 MoUs signed; pledged value ₹1,06,000 Crore.
* Vibrant Gujarat 2007: 675 MoUs signed; pledged value ₹4,62,000 Crore. Focus on SEZs and ports.
* Vibrant Gujarat 2009: 8,668 MoUs; pledged value ₹12,00,000 Crore. Featured corporate captains (Ratan Tata, Mukesh Ambani, Kumar Mangalam Birla).
* Vibrant Gujarat 2011: 7,936 MoUs; pledged value ₹20,83,000 Crore. Inauguration of Mahatma Mandir convention center.
* Vibrant Gujarat 2013: Over 17,000 intentions / MoUs signed; participation from 121 countries. Focus on defense, green energy, smart cities.

3. FLAGSHIP INDUSTRIAL PROJECTS:
* Tata Nano Sanand Plant: Established in 2008 on 1,100 acres of Anand Agricultural University land after rapid regulatory clearances. Spurred an automobile cluster (Ford, Maruti Suzuki, Hero MotoCorp).
* Mundra & Dahej Port & SEZ: Development of India's largest private commercial port and petroleum/chemicals hub.
* Jyotigram Yojana: 24-hour uninterrupted three-phase rural electricity through feeder separation.
* Sabarmati Riverfront Development: 11.5 km reclaimed urban waterfront along Ahmedabad.

4. ECONOMIC DEBATE: MoUs VS. IMPLEMENTATION REALIZATION:
* Opposition & Independent Economist Critiques (Indira Hirway, Bibek Debroy, EPW):
  - Comptroller and Auditor General (CAG) reports pointed out that actual project realization rates hovered between 25% and 35% of total pledged values.
  - Capital-intensive nature of industrialization (petrochemicals, refineries) generated fewer direct manufacturing jobs relative to capital invested.
  - Social indicators: Despite rapid SGDP growth (average ~10% between 2002–2010), critics highlighted that Gujarat ranked lower on human development metrics (malnutrition, female literacy, health expenditure).
* Government Defense:
  - Pledged MoUs represent multi-decade investment horizons.
  - Gujarat contributed 16% of India's industrial output and 22% of total exports with only 5% of the country's population.`,
  },

  'file-snoopgate-2013': {
    id: 'file-snoopgate-2013',
    name: 'snoopgate_2013_archive.pdf',
    isDirectory: false,
    parentId: 'dir-gujarat-2001-2013',
    path: 'C:\\MY DOCUMENTS\\GUJARAT_2001_2013\\snoopgate_2013_archive.pdf',
    fileType: 'pdf',
    icon: 'file-pdf',
    size: 3800,
    modified: '2013-11-20 18:40',
    metadata: {
      documentTitle: 'Gujarat Surveillance Controversy Archive (November 2013)',
      historicalDate: 'August 2009 (Recordings) / November 2013 (Public Release)',
      sourceOrPublication: 'Cobrapost / Gulail Investigative Release & Supreme Court Filings',
      category: 'journalistic_investigation',
      summary: 'Investigative releases by news portals alleging state machinery surveillance on a young woman architect, political fallout, family statements, and judicial developments.',
      publicSourceUrl: 'https://cobrapost.com/snoopgate-investigation-2013',
    },
    content: `=== INVESTIGATIVE DOSSIER: THE 2013 SURVEILLANCE CONTROVERSY ===
CLASSIFICATION: [JOURNALISTIC INVESTIGATION / OFFICIAL RESPONSES / COURT FILINGS]
DISCLOSURE DATE: 15 November 2013
PORTALS: Cobrapost.com & Gulail.com

1. THE INVESTIGATIVE ALLEGATIONS (NOVEMBER 2013)
* Investigative journalism portals Cobrapost and Gulail released audio recordings purportedly from August–September 2009.
* The tapes featured telephone conversations between Gujarat Minister of State for Home Amit Shah and suspended IPS officer G.L. Singhal.
* The recordings purported to show state police apparatus (ATS and intelligence officials) conducting extensive physical surveillance and telephone interception on a young female architect in Ahmedabad and Bhavnagar.
* In the tapes, the minister purportedly referred to instructions from an unnamed "Saheb".

2. POLITICAL FALLOUT & OPPOSITION DEMANDS
* The revelations occurred two months after Narendra Modi was nominated as the BJP's 2014 Prime Ministerial candidate.
* The Indian National Congress, Left parties, and women's rights groups demanded a Supreme Court-monitored judicial probe into the illegal use of state machinery and violation of telephone interception rules (Indian Telegraph Act 1885).
* Demands were raised for an inquiry into whether official sanction had been obtained from the State Home Secretary for phone interception.

3. THE ARCHITECT FAMILY'S RESPONSE
* On November 17, 2013, the father of the woman architect issued a formal written statement:
  - Stated that the family had personally requested Chief Minister Narendra Modi to provide security and oversight for his daughter during a sensitive family emergency.
  - Affirmed that the family was fully aware of the surveillance and had consented to it.
  - Requested political parties not to politicize a private family matter or violate his daughter's privacy.

4. OFFICIAL INQUIRY COMMISSION (NOVEMBER 2013)
* The Gujarat Government constituted a two-member Commission of Inquiry headed by retired High Court Judge Sugnya Bhatt on November 25, 2013, to probe the allegations and authenticity of the tapes.

5. SUPREME COURT PROCEEDINGS (MAY 2014)
* The woman architect and her father filed a writ petition in the Supreme Court of India seeking an injunction against any central or state commission of inquiry, asserting their fundamental right to privacy.
* On May 6, 2014, a Supreme Court bench headed by Chief Justice R.M. Lodha allowed the withdrawal of the petition while disposing of pending petitions, as the family reiterated they did not wish for any inquiry to proceed.`,
  },

  // ==========================================
  // FILES IN ELECTIONS_2014
  // ==========================================
  'file-election-results': {
    id: 'file-election-results',
    name: 'election_results_2014.csv',
    isDirectory: false,
    parentId: 'dir-elections-2014',
    path: 'C:\\MY DOCUMENTS\\ELECTIONS_2014\\election_results_2014.csv',
    fileType: 'csv',
    icon: 'file-text',
    size: 3200,
    modified: '2014-05-18 16:20',
    metadata: {
      documentTitle: 'Official 16th Lok Sabha General Election Results (2014)',
      historicalDate: '16 May 2014',
      sourceOrPublication: 'Election Commission of India (ECI)',
      category: 'verified_fact',
      summary: 'State-wise and party-wise seat tally and vote share data from the official declaration of the 2014 Lok Sabha general election.',
      publicSourceUrl: 'https://eci.gov.in/statistical-report/statistical-reports-lok-sabha-2014',
    },
    content: `Party/Alliance,Seats Contested,Seats Won,Seat Change (vs 2009),Popular Vote Count,Vote Share (%)
Bharatiya Janata Party (BJP),428,282,+166,171660230,31.00%
Indian National Congress (INC),464,44,-162,106935942,19.31%
All India Anna Dravida Munnetra Kazhagam (AIADMK),40,37,+28,17983168,3.24%
All India Trinamool Congress (AITC),131,34,+15,21259681,3.84%
Biju Janata Dal (BJD),21,20,+6,9489946,1.71%
Shiv Sena (SHS - NDA),58,18,+7,10262544,1.85%
Telugu Desam Party (TDP - NDA),30,16,+10,14099230,2.55%
Telangana Rashtra Samithi (TRS),17,11,+9,6736270,1.22%
Communist Party of India (Marxist) (CPI-M),93,9,-7,17986773,3.25%
YSR Congress Party (YSRCP),38,9,+9,13991280,2.53%
Samajwadi Party (SP),197,5,-18,18673089,3.37%
Aam Aadmi Party (AAP),432,4,+4,11322444,2.05%
National Democratic Alliance (NDA Total),-,336,+199,214000000,38.50%
United Progressive Alliance (UPA Total),-,59,-203,130000000,23.00%
Total Lok Sabha Seats,543,543,-,553802946,100.00%`,
  },

  'file-manifesto-2014': {
    id: 'file-manifesto-2014',
    name: 'manifesto_2014.txt',
    isDirectory: false,
    parentId: 'dir-elections-2014',
    path: 'C:\\MY DOCUMENTS\\ELECTIONS_2014\\manifesto_2014.txt',
    fileType: 'text',
    icon: 'file-text',
    size: 4600,
    modified: '2014-04-07 10:30',
    metadata: {
      documentTitle: 'BJP Election Manifesto 2014: "Ek Bharat, Shreshtha Bharat"',
      historicalDate: '07 April 2014',
      sourceOrPublication: 'Bharatiya Janata Party Central Office, New Delhi',
      category: 'official_statement',
      summary: 'Key pledges, governance commitments, economic blueprints, and infrastructure priorities outlined in the 2014 election manifesto.',
      publicSourceUrl: 'https://bjp.org/manifesto2014',
    },
    content: `=== OFFICIAL DOCUMENT: BJP MANIFESTO 2014 HIGHLIGHTS ===
TITLE: "Ek Bharat, Shreshtha Bharat — Sabka Saath, Sabka Vikas"
RELEASE DATE: 07 April 2014 (Released at BJP HQ, New Delhi)
MANIFESTO COMMITTEE CHAIRMAN: Dr. Murli Manohar Joshi

1. CORE GOVERNANCE PRINCIPLES
* "Minimum Government, Maximum Governance" — Rationalization of ministries, elimination of archaic regulations, digital file-tracking.
* Cooperative Federalism — Revival of the Inter-State Council and active collaboration with state Chief Ministers.
* Zero tolerance toward corruption and institution of transparent auction regimes for coal, telecom spectrum, and mineral rights.

2. ECONOMIC RESURGENCE & EMPLOYMENT
* Curbing inflation: Establishment of a Price Stabilization Fund and unbundling Food Corporation of India (FCI) operations.
* Manufacturing Revival: Promotion of labor-intensive manufacturing hubs, industrial corridors, and single-window environmental clearances.
* Opposition to Foreign Direct Investment (FDI) in multi-brand retail to protect small shopkeepers, while welcoming FDI in infrastructure and defense.
* Tax Reforms: Simplification of direct taxes and accelerated nationwide implementation of the Goods and Services Tax (GST).

3. INFRASTRUCTURE: "SAGARMALA & DIAMOND QUADRILATERAL"
* Diamond Quadrilateral project of High-Speed Bullet Trains connecting major metropolitan nodes.
* Sagarmala project for port modernization and coastal economic zone integration.
* 100 New Smart Cities equipped with modern sanitation, broadband networks, and GIS master planning.
* Pradhan Mantri Gram Sinchayee Yojana — Ensuring irrigation access to every agricultural field ("Har Khet Ko Paani").

4. SOCIAL SECTOR & CITIZEN WELFARE
* National Health Assurance Mission to provide affordable universal medicine and secondary health centers.
* Universal Financial Inclusion: Bank accounts for every household coupled with direct subsidy benefit transfers.
* Total sanitation campaign targeting Open Defecation Free status by Mahatma Gandhi's 150th birth anniversary in 2019.

5. STRATEGIC & FOREIGN POLICY
* Zero tolerance toward cross-border terrorism.
* Upgrading defense procurement, encouraging domestic defense manufacturing under private-public partnerships.
* Protection and rehabilitation of persecuted minority refugees from neighboring countries.`,
  },

  'file-campaign-archive': {
    id: 'file-campaign-archive',
    name: 'campaign_archive.doc',
    isDirectory: false,
    parentId: 'dir-elections-2014',
    path: 'C:\\MY DOCUMENTS\\ELECTIONS_2014\\campaign_archive.doc',
    fileType: 'doc',
    icon: 'file-text',
    size: 3900,
    modified: '2014-05-27 12:00',
    metadata: {
      documentTitle: '2014 General Election Campaign Architecture & Swearing-In Dossier',
      historicalDate: 'September 2013 – May 2014',
      sourceOrPublication: 'Election Management Documentation / Rashtrapati Bhavan Communiques',
      category: 'verified_fact',
      summary: 'Archival report on the 2014 election campaign, 3D hologram rallies, turnout figures, Varanasi contest, and the May 26 swearing-in ceremony with SAARC leaders.',
      publicSourceUrl: 'https://rashtrapatibhavan.gov.in/press-release-26-may-2014',
    },
    content: `=== CAMPAIGN DOSSIER: THE 2014 LOK SABHA ELECTION ===
CLASSIFICATION: [HISTORICAL RECORD & ELECTORAL ANALYSIS]

1. CAMPAIGN SCALE & REACH (SEPTEMBER 2013 – MAY 2014)
* Narendra Modi addressed 437 mega public rallies across 25 states.
* Travelled an estimated 300,000 km across India.
* 3D Hologram Projection Technology: 1,350 holographic broadcast rallies conducted simultaneously across thousands of rural and semi-urban locations.
* "Chai pe Charcha" (Discussions over Tea): Over 1,000 direct interactive sessions held across tea stalls using DTH and internet video downlinks.
* Campaign Slogan: "Achhe Din Aane Wale Hain" (Good days are coming) and "Abki Baar Modi Sarkar".

2. ELECTORAL PARTICIPATION
* Total registered electorate: 834 million citizens.
* Voter Turnout: 66.44% — highest voter turnout in Indian parliamentary history up to that point.
* Phases: Conducted over 9 phases between 7 April and 12 May 2014.

3. THE HIGH-PROFILE VARANASI CONTEST
* Constituency: Varanasi (Uttar Pradesh).
* Key Candidates:
  - Narendra Modi (BJP)
  - Arvind Kejriwal (Aam Aadmi Party)
  - Ajay Rai (Indian National Congress)
* Results:
  - Narendra Modi: 581,022 votes (56.37%)
  - Arvind Kejriwal: 209,238 votes (20.30%)
  - Ajay Rai: 75,614 votes (7.34%)
* Victory Margin: 371,784 votes. Modi also won Vadodara (Gujarat) by a record margin of 570,128 votes, subsequently vacating Vadodara to retain Varanasi.

4. SWEARING-IN CEREMONY (26 MAY 2014)
* Venue: Forecourt of Rashtrapati Bhavan, New Delhi.
* Attendees: 4,000 dignitaries, ministers, diplomats.
* Historic Diplomatic Initiative: Heads of state of all 8 South Asian Association for Regional Cooperation (SAARC) nations attended, including:
  - Prime Minister Nawaz Sharif (Pakistan)
  - President Mahinda Rajapaksa (Sri Lanka)
  - Prime Minister Sheikh Hasina (represented by Speaker Shirin Sharmin Chaudhury, Bangladesh)
  - President Hamid Karzai (Afghanistan)
  - Prime Minister Tshering Tobgay (Bhutan)
  - Prime Minister Sushil Koirala (Nepal)
  - President Abdulla Yameen (Maldives).`,
  },

  // ==========================================
  // FILES IN GOVERNMENT_POLICIES (2014–2016)
  // ==========================================
  'file-make-in-india': {
    id: 'file-make-in-india',
    name: 'make_in_india.pdf',
    isDirectory: false,
    parentId: 'dir-govt-policies',
    path: 'C:\\MY DOCUMENTS\\GOVERNMENT_POLICIES\\make_in_india.pdf',
    fileType: 'pdf',
    icon: 'file-pdf',
    size: 4100,
    modified: '2014-09-26 15:45',
    metadata: {
      documentTitle: 'Make in India Policy Launch & Industrial Framework',
      historicalDate: '25 September 2014',
      sourceOrPublication: 'Department of Industrial Policy & Promotion (DIPP), Ministry of Commerce',
      category: 'official_statement',
      summary: 'Launch details, target sectors, FDI liberalizations, regulatory streamlining, and industrial objectives.',
      publicSourceUrl: 'https://www.makeinindia.com/about',
    },
    content: `=== GOVERNMENT POLICY ARCHIVE: MAKE IN INDIA ===
CLASSIFICATION: [OFFICIAL GOVERNMENT POLICY INITIATIVE]
LAUNCH DATE: 25 September 2014
LOCATION: Vigyan Bhavan, New Delhi
NODAL DEPARTMENT: Department of Industrial Policy and Promotion (DIPP)

1. VISION & OBJECTIVES
* Transform India into a global design and manufacturing hub.
* Target: Increase manufacturing sector contribution to GDP from 16% to 25% by 2022.
* Job Creation Goal: Generate 100 million additional manufacturing jobs over a decade.
* Emblem: A lion silhouette composed of interlocking industrial gears and cogs.

2. TARGET INDUSTRIAL SECTORS (25 SECTORS)
Aerospace, Automobiles, Auto Components, Aviation, Biotechnology, Chemicals, Construction, Defense Manufacturing, Electrical Machinery, Electronic Systems, Food Processing, IT and BPM, Leather, Media and Entertainment, Mining, Oil and Gas, Pharmaceuticals, Ports and Shipping, Railways, Renewable Energy, Roads and Highways, Space, Textiles and Garments, Thermal Power, Tourism and Hospitality.

3. KEY POLICY ENABLERS (2014–2016)
* Defense Sector FDI: Automatic approval cap raised from 26% to 49%, and up to 100% on case-by-case technology sharing basis.
* Railways: 100% FDI allowed in railway infrastructure development (high-speed rail, suburban corridors, dedicated freight lines).
* Ease of Doing Business: Introduction of the online e-Biz portal integrating 14 central government regulatory permissions into a single-window interface.
* Environment Clearances: Decentralization of environmental approvals; validity period of industrial licenses extended from 2 years to 3 years.

4. HISTORICAL CONTROVERSIES & PERFORMANCE EVALUATION (2014–2016)
* Successes: Substantial increase in mobile phone assembly units (from 2 units in 2014 to over 11 units by late 2016).
* Critiques by Trade Economists:
  - Global economic slowdown and drop in export demand restrained overall private sector capital expenditure (capex).
  - Infrastructure bottlenecks and complex land acquisition laws slowed large-scale factory relocations.`,
  },

  'file-swachh-bharat': {
    id: 'file-swachh-bharat',
    name: 'swachh_bharat.txt',
    isDirectory: false,
    parentId: 'dir-govt-policies',
    path: 'C:\\MY DOCUMENTS\\GOVERNMENT_POLICIES\\swachh_bharat.txt',
    fileType: 'text',
    icon: 'file-text',
    size: 3800,
    modified: '2014-10-03 09:15',
    metadata: {
      documentTitle: 'Swachh Bharat Mission (Clean India Campaign) Charter',
      historicalDate: '02 October 2014',
      sourceOrPublication: 'Ministry of Drinking Water & Sanitation / Ministry of Urban Development',
      category: 'official_statement',
      summary: 'Campaign charter launched at Rajghat targeting an Open Defecation Free (ODF) nation by 2019, toilet construction subsidies, and behavioral change campaigns.',
      publicSourceUrl: 'https://swachhbharatmission.gov.in',
    },
    content: `=== GOVERNMENT POLICY ARCHIVE: SWACHH BHARAT MISSION ===
CLASSIFICATION: [OFFICIAL CHARTER & PERFORMANCE METRICS]
LAUNCH DATE: 02 October 2014 (Gandhi Jayanti)
LOCATION: Rajghat & Valmiki Basti, New Delhi
NODAL MINISTRIES: Ministry of Drinking Water and Sanitation (Gramin) / Ministry of Urban Development (Urban)

1. OBJECTIVES & TIMELINE
* Aim: Eliminate open defecation and achieve universal sanitation across India by 02 October 2019 (150th birth anniversary of Mahatma Gandhi).
* Construction of over 100 million household toilets in rural India.
* Solid and liquid waste management across 4,041 statutory towns and 600,000 villages.

2. FINANCING & IMPLEMENTATION
* Financial Assistance: ₹12,000 provided per Individual Household Latrine (IHHL) (Centre share: ₹7,200; State share: ₹4,800; special states 90:10 ratio).
* Funding Sources: Central budgetary allocations, World Bank loan assistance ($1.5 billion approved in Dec 2015), and Swachh Bharat Cess (0.5% levied on taxable services from Nov 2015).
* Swachhata Ambassadors: Prominent cultural figures, sportspersons, and spiritual leaders nominated to lead voluntary cleaning drives (Shramdaan).

3. REPORTED PROGRESS (OCTOBER 2014 – OCTOBER 2016)
* Official data reported over 25 million household toilets constructed within the first two years.
* Over 100,000 villages and several districts declared themselves Open Defecation Free (ODF).
* Swachh Survekshan: Annual cleanliness ranking of Indian cities inaugurated in 2016 (Mysuru ranked #1 in the first survey).

4. PUBLIC SCRUTINY & FIELD STUDY DEBATES
* Research Institute for Compassionate Economics (r.i.c.e.) & Accountability Initiative Studies:
  - Highlighted that toilet construction did not always translate to regular usage due to entrenched caste taboos around pit emptying.
  - Verification discrepancies: Independent audits found cases where villages declared ODF still exhibited partial open defecation.
  - Government Response: Instituted geo-tagging of toilets with photographs before subsidy disbursement.`,
  },

  'file-jan-dhan': {
    id: 'file-jan-dhan',
    name: 'jan_dhan_yojana.doc',
    isDirectory: false,
    parentId: 'dir-govt-policies',
    path: 'C:\\MY DOCUMENTS\\GOVERNMENT_POLICIES\\jan_dhan_yojana.doc',
    fileType: 'doc',
    icon: 'file-text',
    size: 3500,
    modified: '2015-08-29 11:45',
    metadata: {
      documentTitle: 'Pradhan Mantri Jan Dhan Yojana (PMJDY) Financial Inclusion Record',
      historicalDate: '28 August 2014',
      sourceOrPublication: 'Department of Financial Services, Ministry of Finance',
      category: 'official_statement',
      summary: 'Universal banking access, zero-balance Basic Savings Bank Deposit Accounts, RuPay debit cards, and the JAM (Jan Dhan-Aadhaar-Mobile) trinity architecture.',
      publicSourceUrl: 'https://pmjdy.gov.in/archive',
    },
    content: `=== GOVERNMENT POLICY ARCHIVE: PRADHAN MANTRI JAN DHAN YOJANA ===
CLASSIFICATION: [OFFICIAL PROGRAMME DATA & AUDIT METRICS]
LAUNCH DATE: 28 August 2014
ANNOUNCED: 15 August 2014 (Independence Day Address)
NODAL AGENCY: Department of Financial Services, Ministry of Finance

1. CORE PILLARS OF THE SCHEME
* Universal access to banking facilities with at least one basic bank account per household.
* Zero minimum balance requirements (Basic Savings Bank Deposit Account - BSBDA).
* RuPay Debit Card issued with an inbuilt ₹100,000 accidental insurance cover.
* Overdraft facility up to ₹5,000 permitted to one woman account holder per household after 6 months of satisfactory operation.
* Direct Benefit Transfer (DBT): Integration of government subsidies (LPG Pahal, MNREGA wages, scholarships) directly into accounts.

2. GUINNESS WORLD RECORD (JANUARY 2015)
* Recognized by Guinness World Records for "Most bank accounts opened in one week" (18,096,130 accounts opened between 23 August and 29 August 2014).

3. THE "JAM TRINITY" ARCHITECTURE
* Concept formulated by Chief Economic Adviser Arvind Subramanian in the Economic Survey 2014–15:
  - J: Jan Dhan bank accounts
  - A: Aadhaar biometric identity
  - M: Mobile phone connectivity
* Intended to plug leakage in state welfare transfers by bypassing bureaucratic intermediaries.

4. CRITICISM & ZERO-BALANCE ACCOUNT DEBATES (2015–2016)
* Investigative Reports (The Indian Express, Sept 2016):
  - Revealed that bank branch managers, under pressure to reduce "zero-balance" account percentages, deposited ₹1 or ₹2 from their own branch administrative allowances into dormant accounts.
  - Zero-balance accounts dropped from 76% in September 2014 to around 24% by August 2016.
* Subsequent Utility:
  - PMJDY accounts became a critical conduit during the November 2016 demonetisation drive for cash deposits and welfare payments.`,
  },

  'file-digital-india': {
    id: 'file-digital-india',
    name: 'digital_india.pdf',
    isDirectory: false,
    parentId: 'dir-govt-policies',
    path: 'C:\\MY DOCUMENTS\\GOVERNMENT_POLICIES\\digital_india.pdf',
    fileType: 'pdf',
    icon: 'file-pdf',
    size: 3700,
    modified: '2015-07-02 18:20',
    metadata: {
      documentTitle: 'Digital India Programme Architecture & Pillars',
      historicalDate: '01 July 2015',
      sourceOrPublication: 'Ministry of Electronics & Information Technology (MeitY)',
      category: 'official_statement',
      summary: 'Broadband highways, public internet access, BharatNet, DigiLocker, e-Sign, and digital infrastructure initiatives.',
      publicSourceUrl: 'https://digitalindia.gov.in/about',
    },
    content: `=== GOVERNMENT POLICY ARCHIVE: DIGITAL INDIA ===
CLASSIFICATION: [OFFICIAL STRATEGY FRAMEWORK]
LAUNCH DATE: 01 July 2015
VENUE: Indira Gandhi Indoor Stadium, New Delhi
NODAL MINISTRY: Ministry of Electronics and Information Technology (MeitY)

1. NINE CORE PILLARS
1. Broadband Highways (Rural broadband across 250,000 gram panchayats under BharatNet; National Information Infrastructure).
2. Universal Access to Mobile Connectivity (Covering remaining uncovered villages).
3. Public Internet Access Programme (Common Service Centres - CSCs in every gram panchayat).
4. e-Governance: Reforming Government through Technology (Form simplification, database integration, online tracking).
5. e-Kranti: Electronic Delivery of Services (Digital education, digital health, online agriculture mandi access via e-NAM).
6. Information for All (Open data portal, citizen engagement via MyGov.in).
7. Electronics Manufacturing: Target Net Zero Imports by 2020.
8. IT for Jobs: Skill training for 10 million rural citizens in IT/ITES.
9. Early Harvest Programmes: Biometric attendance in central ministries, Wi-Fi in universities, secure email.

2. FLAGSHIP CITIZEN APPLICATIONS (2015–2016)
* DigiLocker: Cloud-based repository for verified digital documents (driver's licenses, marksheets).
* Unified Payment Interface (UPI): Architectural approval by RBI and pilot launch by NPCI in April 2016.
* e-Hospital: Online OPD appointment registration, blood bank status, and electronic medical reports.
* Bharat Interface for Money (BHIM): Conceived in late 2016.`,
  },

  'file-startup-india': {
    id: 'file-startup-india',
    name: 'startup_india.txt',
    isDirectory: false,
    parentId: 'dir-govt-policies',
    path: 'C:\\MY DOCUMENTS\\GOVERNMENT_POLICIES\\startup_india.txt',
    fileType: 'text',
    icon: 'file-text',
    size: 3200,
    modified: '2016-01-17 14:10',
    metadata: {
      documentTitle: 'Startup India Action Plan',
      historicalDate: '16 January 2016',
      sourceOrPublication: 'Department of Industrial Policy & Promotion (DIPP)',
      category: 'official_statement',
      summary: 'Action plan to build an innovation ecosystem, 3-year tax exemptions, patent fast-tracking, and ₹10,000 crore Fund of Funds.',
      publicSourceUrl: 'https://startupindia.gov.in/action-plan',
    },
    content: `=== GOVERNMENT POLICY ARCHIVE: STARTUP INDIA ACTION PLAN ===
CLASSIFICATION: [OFFICIAL PROGRAMME BLUEPRINT]
LAUNCH DATE: 16 January 2016
VENUE: Vigyan Bhavan, New Delhi
KEYNOTE GUESTS: Masayoshi Son (SoftBank), Travis Kalanick (Uber), Adam Neumann (WeWork)

1. CORE INCENTIVES
* Compliance Simplification: Self-certification compliance under 9 environmental and labor laws via mobile app.
* Patent Fast-Tracking: 80% rebate in patent application filing fees for registered startups.
* Faster Exit: Insolvency and Bankruptcy Code framework permitting startup wind-up within 90 days.
* Financial Support: ₹10,000 Crore "Fund of Funds for Startups" (FFS) managed by SIDBI.
* Tax Exemptions: 3-year income tax exemption on profits for eligible startups within first 5 years.
* Angel Tax: Initial guidelines issued to exempt registered investments from Section 56(2)(viib) scrutiny.

2. ATAL INNOVATION MISSION (AIM)
* Establishment of Atal Tinkering Labs (ATLs) across schools and incubation centers across academic universities.`,
  },

  // ==========================================
  // FILES IN CONTROVERSIES (2014–2016)
  // ==========================================
  'file-dadri-2015': {
    id: 'file-dadri-2015',
    name: 'dadri_2015_archive.pdf',
    isDirectory: false,
    parentId: 'dir-controversies',
    path: 'C:\\MY DOCUMENTS\\CONTROVERSIES\\dadri_2015_archive.pdf',
    fileType: 'pdf',
    icon: 'file-pdf',
    size: 4200,
    modified: '2015-10-15 17:20',
    metadata: {
      documentTitle: 'Dadri Lynching Incident and National Intolerance Debate Dossier',
      historicalDate: '28 September 2015 – October 2015',
      sourceOrPublication: 'Uttar Pradesh Police FIR / Forensic Science Laboratory Reports / Press Coverage',
      category: 'journalistic_investigation',
      summary: 'Details of the killing of Mohammad Akhlaq in Bisada village, forensic testing controversies, political reactions, and national public discourse.',
      publicSourceUrl: 'https://thehindu.com/news/national/dadri-lynching-case-timeline',
    },
    content: `=== CONTROVERSY DOSSIER: DADRI MOB VIOLENCE (SEPTEMBER 2015) ===
CLASSIFICATION: [POLICE FIR / FORENSIC REPORTS / NATIONAL DEBATE]
INCIDENT DATE: 28 September 2015 (~10:30 PM IST)
LOCATION: Bisada Village, Dadri, Gautam Buddh Nagar District, Uttar Pradesh

1. THE INCIDENT ACCORDING TO POLICE FIR
* Mohammad Akhlaq (aged 52) and his 22-year-old son Danish were attacked inside their house by a mob of villagers following announcements made from the local temple loudspeaker alleging cow slaughter.
* Mohammad Akhlaq succumbed to severe head injuries before reaching hospital; Danish survived with critical injuries after multiple neurosurgeries.
* Uttar Pradesh Police lodged FIR No. 241/2015 at Jarcha Police Station under IPC Sections 147 (rioting), 148, 149, 302 (murder), and 307 (attempt to murder).
* 18 suspects, including youth from the village, were arrested.

2. FORENSIC TESTING CONTROVERSIES
* Initial veterinary doctor preliminary report (October 2015): Concluded meat recovered from the vicinity was mutton/goat meat.
* Subsequent Mathura forensic lab report (June 2016): Asserted the sample belonged to cow or its progeny.
* Legal argument: Defense lawyers sought FIR against Akhlaq's family under UP Cow Slaughter Act, while human rights advocates stressed that murder could not be justified regardless of meat species.

3. NATIONAL POLITICAL FALLOUT
* President Pranab Mukherjee (07 October 2015): Appealed for preserving India's core civilizational values of pluralism, diversity, and tolerance.
* Prime Minister Narendra Modi (08 October 2015, speaking at election rally in Nawada, Bihar):
  - "Hindus and Muslims should together fight poverty, not each other... Communal harmony and brotherhood are the only way forward."
* Opposition Parties & Civil Society Critique:
  - Alleged provocative public statements by local political leaders in Bisada.
  - Condemned vigilantism by cow protection groups (Gau Rakshaks).
* In August 2016, PM Modi publicly rebuked fake cow vigilantes at a town hall meeting in Delhi: "70-80% of these people run shops in the name of cow protection to hide their illegal activities. State governments should prepare dossiers on them."`,
  },

  'file-award-wapsi': {
    id: 'file-award-wapsi',
    name: 'award_wapsi_2015.txt',
    isDirectory: false,
    parentId: 'dir-controversies',
    path: 'C:\\MY DOCUMENTS\\CONTROVERSIES\\award_wapsi_2015.txt',
    fileType: 'text',
    icon: 'file-text',
    size: 3600,
    modified: '2015-11-20 16:15',
    metadata: {
      documentTitle: 'The "Award Wapsi" Protest Movement (Autumn 2015)',
      historicalDate: 'September – November 2015',
      sourceOrPublication: 'Sahitya Akademi Records & National Press Statements',
      category: 'public_criticism',
      summary: 'Chronicle of writers, poets, filmmakers, and scientists returning national awards in protest against perceived rising intolerance and attacks on rationalists.',
      publicSourceUrl: 'https://indianexpress.com/article/explained/award-wapsi-explained-2015',
    },
    content: `=== PUBLIC DISCOURSE ARCHIVE: THE AWARD WAPSI MOVEMENT (2015) ===
CLASSIFICATION: [PUBLIC PROTEST / INTELLECTUAL CRITIQUE / GOVERNMENT COUNTER-ARGUMENTS]
TIMELINE: September – November 2015

1. ORIGINS & TRIGGERING EVENTS
* August 30, 2015: Assassination of prominent Kannada scholar and rationalist M.M. Kalburgi at his residence in Dharwad, Karnataka.
* Previous unsolved assassinations of rationalists Narendra Dabholkar (Pune, Aug 2013) and Govind Pansare (Kolhapur, Feb 2015).
* September 2015: Mob lynching of Mohammad Akhlaq in Dadri.
* Alleged silence and inaction of the national Sahitya Akademi in condemning Kalburgi's murder.

2. KEY FIGURES RETURNING AWARDS
* Uday Prakash (04 Sept 2015): First Hindi writer to return his Sahitya Akademi award.
* Nayantara Sahgal (06 Oct 2015): Returned 1986 Akademi award citing "unmaking of modern India".
* Ashok Vajpeyi: Poet and former Lalit Kala Akademi chairman.
* Over 40 literary figures across multiple languages (including Krishna Sobti, Keki Daruwalla, G.N. Devy, Sarah Joseph) returned awards or resigned from the Akademi general council.
* Filmmakers: Dibakar Banerjee, Anand Patwardhan returned National Film Awards.
* Scientists: P.M. Bhargava (founder of CCMB) returned his Padma Bhushan.

3. SAHITYA AKADEMI RESOLUTION (23 OCTOBER 2015)
* Executive Board passed a unanimous resolution strongly condemning the killing of Kalburgi and urging central and state governments to protect writers and freedom of expression.

4. GOVERNMENT & COUNTER-PROTEST ARGUMENTS
* Finance Minister Arun Jaitley termed the movement "a manufactured paper rebellion" and ideological intolerance against the 2014 electoral verdict.
* Counter-protests led by actor Anupam Kher and authors ("March for India", 07 November 2015) argued that returning awards tarnished India's image abroad while ignoring earlier periods of emergency and riots.`,
  },

  'file-jnu-controversy': {
    id: 'file-jnu-controversy',
    name: 'jnu_controversy_2016.doc',
    isDirectory: false,
    parentId: 'dir-controversies',
    path: 'C:\\MY DOCUMENTS\\CONTROVERSIES\\jnu_controversy_2016.doc',
    fileType: 'doc',
    icon: 'file-text',
    size: 4300,
    modified: '2016-03-25 14:30',
    metadata: {
      documentTitle: 'Jawaharlal Nehru University (JNU) Sedition Controversy (February 2016)',
      historicalDate: '09 February 2016 – March 2016',
      sourceOrPublication: 'Delhi Police FIR / Delhi Government Magisterial Inquiry / High Court Bail Order',
      category: 'judicial_finding',
      summary: 'Events of 9 Feb 2016 at JNU campus, police arrest of Kanhaiya Kumar under IPC 124A (Sedition), Patiala House scuffles, forensic scrutiny of TV news clips, and Delhi High Court bail order.',
      publicSourceUrl: 'https://delhihighcourt.nic.in/order-kanhaiya-kumar-bail-2016',
    },
    content: `=== CONTROVERSY DOSSIER: JNU FEBRUARY 2016 INCIDENTS ===
CLASSIFICATION: [MAGISTERIAL INQUIRY / POLICE CHARGES / DELHI HC BAIL ORDER]
INCIDENT DATE: 09 February 2016
LOCATION: Sabarmati Dhaba, JNU Campus, New Delhi

1. THE EVENT & THE PROTEST
* A poetry-reading event titled "The Country Without a Post Office" was organized by student activists marking the third anniversary of the hanging of Parliament attack convict Afzal Guru.
* JNU administration withdrew permission shortly before the event citing potential law-and-order friction with the Akhil Bharatiya Vidyarthi Parishad (ABVP).
* Clashing student groups gathered; controversial slogans questioning the judicial verdict and calling for the breakup of India ("Bharat tere tukde honge") were allegedly raised.

2. POLICE ACTION & SEDITION CHARGES
* On 11 February 2016, Delhi Police registered FIR No. 110/2016 at Vasant Kunj North Police Station under IPC Section 124A (Sedition) and 120B (Criminal Conspiracy) following complaints by BJP MP Maheish Girri and ABVP leaders.
* JNU Students' Union (JNUSU) President Kanhaiya Kumar was arrested on 12 February.
* Two other students, Umar Khalid and Anirban Bhattacharya, surrendered to police on 23 February.

3. PATIALA HOUSE COURT SCUFFLES
* On 15 and 17 February 2016, scuffles broke out at Patiala House Courts complex when groups of lawyers assaulted journalists, JNU faculty members, and Kanhaiya Kumar as he was brought for remand hearings.
* The Supreme Court rushed a panel of senior lawyers (Kapil Sibal, Rajeev Dhavan, Dushyant Dave) to inspect security conditions.

4. THE MAGISTERIAL INQUIRY & FORENSIC SCRUTINY
* Delhi Government ordered a Magisterial Inquiry conducted by District Magistrate Sanjay Kumar:
  - Report (March 2016): Found no evidence that Kanhaiya Kumar personally raised anti-India slogans.
  - Video Authenticity: Forensic examination of 7 broadcast news clips found that at least two clips aired on private television channels had been doctored (audio of slogans inserted onto unrelated visuals).
  - Identified presence of outsiders whose identity was not established.

5. DELHI HIGH COURT BAIL ORDER (02 MARCH 2016)
* Justice Pratibha Rani granted 6 months interim bail to Kanhaiya Kumar.
* The bail judgment opened with lines from a Bollywood patriotic song ("Mere Desh Ki Dharti") and cautioned students about limits of free speech while upholding democratic disagreement.
* Kumar delivered a fiery speech upon returning to JNU campus stating: "We want freedom in India, not freedom from India (Azadi Hindustan se nahi, Hindustan mein chahiye)."`,
  },

  'file-land-acquisition': {
    id: 'file-land-acquisition',
    name: 'land_acquisition_debate.pdf',
    isDirectory: false,
    parentId: 'dir-controversies',
    path: 'C:\\MY DOCUMENTS\\CONTROVERSIES\\land_acquisition_debate.pdf',
    fileType: 'pdf',
    icon: 'file-pdf',
    size: 3900,
    modified: '2015-09-02 11:20',
    metadata: {
      documentTitle: 'Land Acquisition Amendment Ordinance & Parliamentary Deadlock (2014–2015)',
      historicalDate: 'December 2014 – August 2015',
      sourceOrPublication: 'Gazette of India / Lok Sabha Hansard / Joint Parliamentary Committee Records',
      category: 'official_statement',
      summary: 'Details of the 2014/2015 Land Acquisition Ordinances, exemptions from consent and Social Impact Assessment clauses, parliamentary opposition, farmer protests, and subsequent policy withdrawal.',
      publicSourceUrl: 'https://prsindia.org/billtrack/the-right-to-fair-compensation-and-transparency-in-land-acquisition-rehabilitation-and-resettlement-amendment-bill-2015',
    },
    content: `=== POLICY CONTROVERSY: THE LAND ACQUISITION ORDINANCE (2014–2015) ===
CLASSIFICATION: [PARLIAMENTARY PROCEEDINGS & LEGISLATIVE RETRACTATION]
BILL: Right to Fair Compensation and Transparency in Land Acquisition (Amendment) Ordinance

1. LEGISLATIVE CONTEXT & THE 2013 UPA ACT
* The 2013 Land Act passed under the UPA government required:
  - 80% consent of land-owning families for private projects (70% for PPP projects).
  - Mandatory Social Impact Assessment (SIA) prior to any acquisition.
  - Return of land to owners if unused after 5 years.

2. THE NDA AMENDMENT ORDINANCES (DECEMBER 2014 – MAY 2015)
* Promulgated by President Pranab Mukherjee on 31 December 2014.
* Re-promulgated twice in April 2015 and May 2015 due to failure to pass the Rajya Sabha where the NDA lacked a majority.
* Proposed Exemptions:
  - Exempted 5 categories from the consent clause and SIA: Defense projects, rural infrastructure, affordable housing, industrial corridors, and PPP infrastructure projects.
* Government Rationale:
  - Essential to eliminate multi-year procedural delays for critical defense corridors, rural roads, and job-creating industrial zones.

3. POLITICAL PUSHBACK & FARMER PROTESTS
* Intense opposition led by the Indian National Congress, Left parties, and regional allies.
* Congress leader Rahul Gandhi coined the slogan "Suit-Boot Ki Sarkar" during parliamentary debates.
* Farmer organizations (Bhartiya Kisan Union, All India Kisan Sabha) organized protests across Punjab, Haryana, and Western UP.
* Social activist Anna Hazare held a 2-day protest at Jantar Mantar in February 2015.

4. THE JOINT PARLIAMENTARY COMMITTEE (JPC) & POLICY WITHDRAWAL
* Bill referred to a 30-member JPC chaired by SS Ahluwalia.
* Amid persistent deadlock and upcoming Bihar assembly elections, Prime Minister Modi announced on his monthly radio address "Mann Ki Baat" (30 August 2015) that the government would allow the ordinance to lapse on 31 August 2015.
* Strategy Shift: The Central Government advised state governments to enact their own state-level amendments under Article 254(2) of the Constitution.`,
  },

  // ==========================================
  // FILES IN FINAL_ARCHIVE_2016
  // ==========================================
  'file-demonetisation': {
    id: 'file-demonetisation',
    name: 'demonetisation_announcement.txt',
    isDirectory: false,
    parentId: 'dir-final-archive-2016',
    path: 'C:\\MY DOCUMENTS\\FINAL_ARCHIVE_2016\\demonetisation_announcement.txt',
    fileType: 'text',
    icon: 'file-text',
    size: 4700,
    modified: '2016-11-08 20:30',
    metadata: {
      documentTitle: 'Prime Minister\'s Address to the Nation: Demonetisation Announcement',
      historicalDate: '08 November 2016 (08:00 PM IST)',
      sourceOrPublication: 'Press Information Bureau (PIB) / Prime Minister\'s Office',
      category: 'official_statement',
      summary: 'Transcript extract of Prime Minister Narendra Modi\'s televised address announcing the withdrawal of the legal tender status of ₹500 and ₹1,000 currency notes.',
      publicSourceUrl: 'https://pib.gov.in/newsite/PrintRelease.aspx?relid=153401',
    },
    content: `=== HISTORICAL ARCHIVE: ADDRESS TO THE NATION (08 NOVEMBER 2016) ===
CLASSIFICATION: [OFFICIAL STATEMENT / GOVERNMENT OF INDIA COMMUNIQUE]
SPEAKER: Prime Minister Narendra Modi
TIME: 08:00 PM – 08:42 PM IST, 08 November 2016
BROADCAST: Doordarshan & National Television Channels

TRANSCRIPT EXCERPTS:

"My dear countrymen,
Brothers and sisters,

In the life of every country, there arrive moments when historical milestones are etched. Today, I am speaking with you about some critical decisions aimed at breaking the grip of corruption and black money...

Corruption and black money are diseases that impede progress. From the rankings on international corruption indices to the daily hardships of common citizens, this cancer has permeated deeply...

To break the grip of corruption and black money, we have decided that the five hundred rupee and one thousand rupee currency notes currently in circulation will no longer be legal tender from midnight tonight, that is, 8th November 2016.

This means that these notes will not be acceptable for transactions from midnight immediately. The five hundred and thousand rupee notes will become just worthless pieces of paper.

However, to ensure that citizens do not lose the fruits of their honest toil, detailed arrangements have been made:

1. Persons holding old notes can deposit them in their bank or post office accounts from 10 November to 30 December 2016 — a period of 50 days. There is no need for panic; your money remains your money.
2. For urgent cash requirements, notes up to ₹4,000 can be exchanged across bank counters with valid identification till 24 November.
3. For humanitarian convenience, hospitals, railway ticketing counters, government bus stations, and fuel pumps will accept the old notes for 72 hours, until midnight of 11 November.
4. Reserve Bank of India will issue new high-security ₹500 and ₹2,000 currency notes.
5. All banks will remain closed to the public tomorrow, 9 November, to prepare systems, and ATMs will not function on 9 November and in some places on 10 November.

I invite every citizen to join this 'Maha Yajna' against corruption, fake currency rackets, and terror funding. In this noble endeavour, short-term inconvenience will be borne for long-term national integrity.

Jai Hind."`,
  },

  'file-nov-2016-news': {
    id: 'file-nov-2016-news',
    name: 'november_2016_news.pdf',
    isDirectory: false,
    parentId: 'dir-final-archive-2016',
    path: 'C:\\MY DOCUMENTS\\FINAL_ARCHIVE_2016\\november_2016_news.pdf',
    fileType: 'pdf',
    icon: 'file-pdf',
    size: 4200,
    modified: '2016-11-11 19:15',
    metadata: {
      documentTitle: 'National Press Roundup: Demonetisation Days 1–3 (09–11 November 2016)',
      historicalDate: '09 – 11 November 2016',
      sourceOrPublication: 'The Hindu, The Indian Express, Mint, The Economic Times',
      category: 'journalistic_investigation',
      summary: 'Front-page reportage capturing initial public reactions, long bank queues, ATM recalibration issues, and political responses during the first 72 hours.',
      publicSourceUrl: 'https://thehindu.com/archive/november-2016',
    },
    content: `=== PRESS ROUNDUP: THE IMMEDIATE AFTERMATH (09–11 NOVEMBER 2016) ===
CLASSIFICATION: [JOURNALISTIC REPORTAGE AS RECORDED AT TIME OF EVENT]
HISTORICAL NOTE: This file represents the final contemporary news entry recorded on this workstation before its abandonment in mid-November 2016.

1. THE INDIAN EXPRESS (09 NOVEMBER 2016) — BANNER HEADLINE:
"PM DROPS 8 PM BOMB: 500, 1000 RS NOTES DEAD AT MIDNIGHT"
* Panic and confusion at petrol pumps, jewelry outlets, and neighborhood grocery stores on the night of November 8 as citizens rushed to spend old notes before midnight.
* Toll plazas on National Highways witnessed massive gridlock; Union Transport Minister Nitin Gadkari suspended toll collection until November 11 midnight.
* Sensex plunged 1,689 points in early trading on November 9, also impacted by Donald Trump's victory in the US Presidential Election occurring simultaneously.

2. THE HINDU (10 NOVEMBER 2016):
"BANKS REOPEN TO SURGING CROWDS; ATMS STILL DRY"
* Tens of thousands queued outside commercial bank branches across metropolitan cities and rural district headquarters from 6:00 AM.
* Rapid exhaustion of new ₹2,000 currency notes within the first three hours of trading.
* Reserve Bank of India clarified that recalibration of 220,000 ATMs across the nation would take up to two to three weeks because the newly sized ₹2,000 and ₹500 notes did not fit the existing physical cassette dimensions inside cash machines.

3. THE ECONOMIC TIMES (11 NOVEMBER 2016):
"INFORMAL SECTOR CASH CRUNCH; WEDDING SEASON DISTRESS"
* Vegetable wholesale markets (APMCs) across Azadpur (Delhi), Vashi (Navi Mumbai), and Surat reported 50% drops in trading volumes due to currency liquidity scarcity.
* Families with winter weddings reported acute distress procuring cash within the ₹20,000 weekly withdrawal ceiling.
* Opposition Reaction: Congress, Trinamool Congress, Left, and BSP demanded an immediate rollback, calling the move "anti-poor" and financial anarchy.
* Government Stance: Finance Minister Arun Jaitley affirmed there would be no rollback and appealed for public patience while new currency remonetization picked up speed.`,
  },

  'file-last-system-log': {
    id: 'file-last-system-log',
    name: 'last_system_activity.log',
    isDirectory: false,
    parentId: 'dir-final-archive-2016',
    path: 'C:\\MY DOCUMENTS\\FINAL_ARCHIVE_2016\\last_system_activity.log',
    fileType: 'log',
    icon: 'file-text',
    size: 2100,
    modified: '2016-11-12 02:41',
    metadata: {
      documentTitle: 'System Audit Log: Workstation GNR-CMO-ADM-98',
      historicalDate: '12 November 2016 (02:41:19 IST)',
      sourceOrPublication: 'Windows 98 Security Event Subsystem / Local Station Audit',
      category: 'fictional_story',
      summary: 'Automated operating system audit log recording the sudden disconnection of network cables and emergency file backup on the night of 11-12 November 2016.',
      isFictional: true,
    },
    content: `[ARCHIVIST FICTIONAL RECORD - STORYTELLING ELEMENT]
=== WIN98 SYSTEM AUDIT TRAIL [TERMINAL ID: GNR-CMO-ADM-98] ===
LOCATION: BLOCK 3, SECRETARIAT (OLD SACHIVALAYA), GANDHINAGAR
REGISTERED OPERATOR: R.K. DAVE (ARCHIVAL OFFICER)

[2016-11-08 19:54:12] User session active: R_DAVE
[2016-11-08 20:02:40] Browser navigation: http://www.rbi.org.in/press/demonetisation_2016
[2016-11-08 20:45:11] File saved: C:\\MY DOCUMENTS\\FINAL_ARCHIVE_2016\\demonetisation_announcement.txt
[2016-11-09 10:14:02] Local area network packet broadcast: URGENT PROTOCOL ALERT FROM FINANCE WING
[2016-11-10 16:22:50] Drive D: (BACKUP DRIVE) mounted successfully.
[2016-11-10 18:30:14] Batch archive sync: C:\\MY DOCUMENTS\\* -> D:\\
[2016-11-11 22:15:09] Internal memo received: "NOTICE OF ADMINISTRATIVE OFFICE REORGANIZATION TO SWARNIM SANKUL - PHASE 3"
[2016-11-11 23:40:02] File deleted to Recycle Bin: memo_shred_order_nov2016.txt
[2016-11-12 01:20:45] Command executed: ATTRIB +H C:\\SECRET
[2016-11-12 01:55:18] Unlocked encrypted vault: confidential_transfer_order.doc
[2016-11-12 02:38:04] NETWORK INTERFACE CARD DISCONNECTED (Physical cable unplugged).
[2016-11-12 02:41:19] SYSTEM FORCED SHUTDOWN INTERRUPT RECEIVED.
[2016-11-12 02:41:20] POWER LOSS DETECTED.
---------------------------------------------------------------------
[NO SYSTEM ACTIVITY LOGGED: NOVEMBER 2016 – NOVEMBER 2026]
---------------------------------------------------------------------
[2026-11-01 15:33:00] UNKNOWN BOOT INITIALIZATION: RECOVERED BY FORENSIC READER.
[2026-11-01 15:33:02] INTEGRITY CHECK: PARTIAL SECTOR CORRUPTION DETECTED IN CLUSTER 0x8F91.`,
  },

  // ==========================================
  // FILES IN C:\MY PICTURES
  // ==========================================
  'pic-mahatma-mandir': {
    id: 'pic-mahatma-mandir',
    name: 'mahatma_mandir_gandhinagar.bmp',
    isDirectory: false,
    parentId: 'dir-pics-gujarat',
    path: 'C:\\MY PICTURES\\GUJARAT_ARCHIVE\\mahatma_mandir_gandhinagar.bmp',
    fileType: 'image',
    icon: 'file-image',
    size: 64200,
    modified: '2011-01-15 14:00',
    content: 'mahatma_mandir',
    metadata: {
      documentTitle: 'Mahatma Mandir Convention Center & Dandi Kutir, Gandhinagar',
      historicalDate: 'January 2011',
      sourceOrPublication: 'Gujarat Information Bureau Photographic Archives',
      category: 'verified_fact',
      summary: 'Photograph showing the iconic salt-mound architecture of Mahatma Mandir, venue of the Vibrant Gujarat Global Summits. (Inspect with UV Scanner for archival markings).',
      publicSourceUrl: 'https://gandhinagar.nic.in/tourist-place/mahatma-mandir',
    },
  },
  'pic-sabarmati': {
    id: 'pic-sabarmati',
    name: 'sabarmati_riverfront_2012.bmp',
    isDirectory: false,
    parentId: 'dir-pics-gujarat',
    path: 'C:\\MY PICTURES\\GUJARAT_ARCHIVE\\sabarmati_riverfront_2012.bmp',
    fileType: 'image',
    icon: 'file-image',
    size: 58400,
    modified: '2012-08-20 16:30',
    content: 'sabarmati_riverfront',
    metadata: {
      documentTitle: 'Sabarmati Riverfront Promenade, Ahmedabad',
      historicalDate: 'August 2012',
      sourceOrPublication: 'Ahmedabad Municipal Corporation / Riverfront Development Ltd',
      category: 'verified_fact',
      summary: 'Visual record of the 11.5 km two-level concrete promenade along the Sabarmati river, opened to public recreation in 2012.',
      publicSourceUrl: 'https://srfdcl.com',
    },
  },
  'pic-canal-solar': {
    id: 'pic-canal-solar',
    name: 'canal_solar_project_2012.bmp',
    isDirectory: false,
    parentId: 'dir-pics-gujarat',
    path: 'C:\\MY PICTURES\\GUJARAT_ARCHIVE\\canal_solar_project_2012.bmp',
    fileType: 'image',
    icon: 'file-image',
    size: 52100,
    modified: '2012-04-25 11:15',
    content: 'canal_solar',
    metadata: {
      documentTitle: 'Narmada Canal-Top Solar Power Project, Sanand',
      historicalDate: 'April 2012',
      sourceOrPublication: 'Gujarat State Electricity Corporation Limited (GSECL)',
      category: 'verified_fact',
      summary: '1 MW pilot project mounting photovoltaic solar panels across the Narmada branch canal, reducing water evaporation while generating clean energy.',
      publicSourceUrl: 'https://gsecl.in',
    },
  },
  'pic-election-celebration': {
    id: 'pic-election-celebration',
    name: 'bjp_hq_celebrations_may2014.bmp',
    isDirectory: false,
    parentId: 'dir-pics-election2014',
    path: 'C:\\MY PICTURES\\ELECTION_2014\\bjp_hq_celebrations_may2014.bmp',
    fileType: 'image',
    icon: 'file-image',
    size: 61200,
    modified: '2014-05-16 18:00',
    content: 'election_celebration',
    metadata: {
      documentTitle: 'Election Victory Celebrations, 11 Ashoka Road, New Delhi',
      historicalDate: '16 May 2014',
      sourceOrPublication: 'National Press Pool Photo',
      category: 'verified_fact',
      summary: 'Public celebrations outside the BJP national headquarters following the declaration of a 282-seat single-party majority in the 16th Lok Sabha.',
    },
  },
  'pic-swearing-in': {
    id: 'pic-swearing-in',
    name: 'swearing_in_ceremony_rashtrapati_bhavan.bmp',
    isDirectory: false,
    parentId: 'dir-pics-election2014',
    path: 'C:\\MY PICTURES\\ELECTION_2014\\swearing_in_ceremony_rashtrapati_bhavan.bmp',
    fileType: 'image',
    icon: 'file-image',
    size: 67800,
    modified: '2014-05-26 21:00',
    content: 'swearing_in',
    metadata: {
      documentTitle: 'Prime Minister Swearing-in Ceremony, Rashtrapati Bhavan Forecourt',
      historicalDate: '26 May 2014',
      sourceOrPublication: 'President\'s Secretariat Photo Division',
      category: 'verified_fact',
      summary: 'President Pranab Mukherjee administering the oath of office to Prime Minister Narendra Modi in the presence of 4,000 guests and SAARC leaders.',
    },
  },
  'pic-make-in-india-lion': {
    id: 'pic-make-in-india-lion',
    name: 'make_in_india_lion_launch.bmp',
    isDirectory: false,
    parentId: 'dir-pics-national',
    path: 'C:\\MY PICTURES\\NATIONAL_EVENTS\\make_in_india_lion_launch.bmp',
    fileType: 'image',
    icon: 'file-image',
    size: 55000,
    modified: '2014-09-25 18:30',
    content: 'make_in_india_lion',
    metadata: {
      documentTitle: 'Make in India Cog-Wheel Lion Emblem Launch',
      historicalDate: '25 September 2014',
      sourceOrPublication: 'DIPP, Ministry of Commerce',
      category: 'verified_fact',
      summary: 'Official emblem unveiling of the industrial lion constructed from mechanical gears and cogs at Vigyan Bhavan.',
    },
  },
  'pic-swachh-bharat-launch': {
    id: 'pic-swachh-bharat-launch',
    name: 'swachh_bharat_rajghat_2014.bmp',
    isDirectory: false,
    parentId: 'dir-pics-national',
    path: 'C:\\MY PICTURES\\NATIONAL_EVENTS\\swachh_bharat_rajghat_2014.bmp',
    fileType: 'image',
    icon: 'file-image',
    size: 53200,
    modified: '2014-10-02 11:00',
    content: 'swachh_bharat_launch',
    metadata: {
      documentTitle: 'Swachh Bharat Launch at Rajghat, New Delhi',
      historicalDate: '02 October 2014',
      sourceOrPublication: 'PIB Photo Division',
      category: 'verified_fact',
      summary: 'PM Narendra Modi initiating the national cleanliness drive with a broom at Valmiki Basti and Rajghat.',
    },
  },

  // ==========================================
  // C:\MY PICTURES\WORK WITH EPSTEIN
  // ==========================================
  'pic-epstein-wa0009': {
    id: 'pic-epstein-wa0009',
    name: 'IMG-20261101-WA0009.jpg',
    isDirectory: false,
    parentId: 'dir-work-epstein',
    path: 'C:\\MY PICTURES\\WORK WITH EPSTEIN\\IMG-20261101-WA0009.jpg',
    fileType: 'image',
    icon: 'file-image',
    size: 150554,
    modified: '2026-11-01 16:13',
    content: '/images/IMG-20261101-WA0009.jpg',
    metadata: {
      documentTitle: 'Archived Photograph: IMG-20261101-WA0009.jpg',
      historicalDate: 'November 2026 Recovery Archive',
      sourceOrPublication: 'Photographic Records Archive',
      category: 'journalistic_investigation',
      summary: 'High-resolution photographic record recovered from C:\\MY PICTURES\\WORK WITH EPSTEIN\\IMG-20261101-WA0009.jpg.',
    },
  },

  // ==========================================
  // FILES IN D:\ BACKUP DRIVE
  // ==========================================
  'file-d-const-extracts': {
    id: 'file-d-const-extracts',
    name: 'constitution_of_india_extracts.txt',
    isDirectory: false,
    parentId: 'dir-d-historical',
    path: 'D:\\HISTORICAL_RECORDS\\constitution_of_india_extracts.txt',
    fileType: 'text',
    icon: 'file-text',
    size: 2800,
    modified: '2015-01-26 10:00',
    metadata: {
      documentTitle: 'Constitutional Articles Concerning Executive Powers & Ordinances',
      historicalDate: 'Adopted 26 January 1950',
      sourceOrPublication: 'Legislative Department, Ministry of Law & Justice',
      category: 'verified_fact',
      summary: 'Extracts of Articles 74, 75, 123 (Presidential Ordinances), and 254(2) regarding Centre-State legislative division.',
      publicSourceUrl: 'https://legislative.gov.in/constitution-of-india',
    },
    content: `=== CONSTITUTION OF INDIA: STATUTORY EXTRACTS ===
REFERENCE REPOSITORY: ARCHIVAL DISK D:

ARTICLE 74: COUNCIL OF MINISTERS TO AID AND ADVISE PRESIDENT
(1) There shall be a Council of Ministers with the Prime Minister at the head to aid and advise the President who shall, in the exercise of his functions, act in accordance with such advice.

ARTICLE 123: POWER OF PRESIDENT TO PROMULGATE ORDINANCES
(1) If at any time, except when both Houses of Parliament are in session, the President is satisfied that circumstances exist which render it necessary for him to take immediate action, he may promulgate such Ordinances as the circumstances appear to him to require.
(2) An Ordinance promulgated under this article shall have the same force and effect as an Act of Parliament, but every such Ordinance shall be laid before both Houses of Parliament and shall cease to operate at the expiration of six weeks from the reassembly of Parliament.

ARTICLE 254(2): INCONSISTENCY BETWEEN LAWS MADE BY PARLIAMENT AND LAWS MADE BY THE LEGISLATURES OF STATES
Where a law made by the Legislature of a State with respect to one of the matters enumerated in the Concurrent List contains any provision repugnant to the provisions of an earlier law made by Parliament or an existing law with respect to that matter, then, the law so made by the Legislature of such State shall, if it has been reserved for the consideration of the President and has received his assent, prevail in that State.`,
  },

  'file-d-rbi-act': {
    id: 'file-d-rbi-act',
    name: 'rbi_act_section_26_powers.txt',
    isDirectory: false,
    parentId: 'dir-d-historical',
    path: 'D:\\HISTORICAL_RECORDS\\rbi_act_section_26_powers.txt',
    fileType: 'text',
    icon: 'file-text',
    size: 2400,
    modified: '2016-11-09 11:30',
    metadata: {
      documentTitle: 'Reserve Bank of India Act, 1934: Section 26 Legal Provision',
      historicalDate: '1934 (Statute in Force)',
      sourceOrPublication: 'Reserve Bank of India Bulletin / Central Acts Repository',
      category: 'verified_fact',
      summary: 'Statutory basis under Section 26(2) empowering the Central Government to declare that any series of bank notes of any denomination shall cease to be legal tender.',
      publicSourceUrl: 'https://rbi.org.in/scripts/Statutes.aspx',
    },
    content: `=== RESERVE BANK OF INDIA ACT, 1934 ===
SECTION 26: LEGAL TENDER CHARACTER OF NOTES

(1) Subject to the provisions of sub-section (2), every bank note shall be legal tender at any place in India in payment or on account for the amount expressed therein, and shall be guaranteed by the Central Government.

(2) On recommendation of the Central Board the Central Government may, by notification in the Gazette of India, declare that, with effect from such date as may be specified in the notification, any series of bank notes of any denomination shall cease to be legal tender, save at such office or agency of the Bank and to such extent as may be specified in the notification.

HISTORICAL LEGAL NOTE (RECORDED 09 NOV 2016):
Gazette Notification S.O. 3407(E) was issued on 08 November 2016 citing Section 26(2) following the resolution passed by the Central Board of the Reserve Bank of India earlier that evening.`,
  },

  'file-d-news-frontline': {
    id: 'file-d-news-frontline',
    name: 'frontline_godhra_special_2002.txt',
    isDirectory: false,
    parentId: 'dir-d-news',
    path: 'D:\\NEWS_CLIPPINGS\\frontline_godhra_special_2002.txt',
    fileType: 'text',
    icon: 'file-text',
    size: 3400,
    modified: '2002-03-20 15:40',
    metadata: {
      documentTitle: 'Frontline Magazine Special Investigation: Gujarat 2002',
      historicalDate: 'March 2002',
      sourceOrPublication: 'Frontline (The Hindu Group)',
      category: 'journalistic_investigation',
      summary: 'Contemporary journalistic coverage by Dionne Bunsha and Sukumar Muralidharan analyzing the violence, administrative response, and relief efforts in March 2002.',
      publicSourceUrl: 'https://frontline.thehindu.com/archive-2002',
    },
    content: `=== CONTEMPORARY JOURNALISTIC RECORD: FRONTLINE (MARCH 2002) ===
COVER STORY: "A TRAVESTY OF GOVERNANCE"
AUTHORS: Sukumar Muralidharan & Dionne Bunsha

Summary of contemporary reportage:
* The report highlights the intense communal rupture in Ahmedabad and Vadodara in the immediate wake of the Godhra train attack.
* Documents testimonies of survivors from Gulbarg Society and Naroda Patiya describing calls placed to local police stations that went unanswered during critical hours.
* Examines the socio-economic impact on small traders, daily wage laborers, and handloom workers in relief camps like Shah Alam.
* Highlights the courageous actions of ordinary citizens who sheltered neighbors across community divides amidst widespread arson.`,
  },

  'file-d-news-2014-verdict': {
    id: 'file-d-news-2014-verdict',
    name: 'indian_express_2014_verdict.txt',
    isDirectory: false,
    parentId: 'dir-d-news',
    path: 'D:\\NEWS_CLIPPINGS\\indian_express_2014_verdict.txt',
    fileType: 'text',
    icon: 'file-text',
    size: 2900,
    modified: '2014-05-17 08:30',
    metadata: {
      documentTitle: 'The Indian Express Editorial: "The 282 Tsunami"',
      historicalDate: '17 May 2014',
      sourceOrPublication: 'The Indian Express Editorial Desk',
      category: 'journalistic_investigation',
      summary: 'Post-election editorial analysis dissecting the first single-party parliamentary majority in 30 years since 1984.',
      publicSourceUrl: 'https://indianexpress.com/article/opinion/editorials/the-mandate-of-2014',
    },
    content: `=== EDITORIAL CLIPPING: THE INDIAN EXPRESS (17 MAY 2014) ===
HEADLINE: "THE MODI MANDATE: A HISTORIC REORIENTATION"

Editorial Analysis:
"The 2014 election outcome shatters three decades of coalition politics in India. For the first time since 1984, a single party has crossed the 272-seat halfway mark in the Lok Sabha.

The mandate is simultaneously a decisive rejection of the policy paralysis, high consumer inflation, and high-profile corruption scandals (2G spectrum, coal block allocations) that characterized the second tenure of the UPA, and an affirmative endorsement of Modi's aspirational governance pitch.

Modi's campaign successfully forged an unprecedented cross-caste and cross-regional social coalition across northern, western, and central India, capitalizing on youth aspirations for jobs, infrastructure, and rapid industrialization."`,
  },

  'file-d-court-best-bakery': {
    id: 'file-d-court-best-bakery',
    name: 'supreme_court_best_bakery_transfer_2004.txt',
    isDirectory: false,
    parentId: 'dir-d-court-cases',
    path: 'D:\\COURT_CASES\\supreme_court_best_bakery_transfer_2004.txt',
    fileType: 'text',
    icon: 'file-text',
    size: 3100,
    modified: '2004-04-14 16:00',
    metadata: {
      documentTitle: 'Supreme Court Judgment: Zahira Habibullah Sheikh vs. State of Gujarat (2004)',
      historicalDate: '12 April 2004',
      sourceOrPublication: 'Supreme Court Cases (2004) 4 SCC 158',
      category: 'judicial_finding',
      summary: 'Landmark judgment ordering retrial of the Best Bakery case outside Gujarat and delivering severe strictures on judicial and investigative integrity.',
      publicSourceUrl: 'https://main.sci.gov.in/judgment/judis/26105.pdf',
    },
    content: `=== SUPREME COURT OF INDIA: BEST BAKERY JUDGMENT (2004) ===
CASE: Zahira Habibullah Sheikh & Anr. v. State of Gujarat & Ors.
BENCH: Justice Doraiswamy Raju & Justice Arijit Pasayat
DATE: 12 April 2004

KEY JUDICIAL EXCERPTS:

"The modern day 'Neros' were looking elsewhere when Best Bakery and innocent children and women were burning, and were probably deliberating how the perpetrators of the crime can be saved or protected.

When the investigation itself is conducted with prejudice and the prosecution fails to present the available evidence before the court, justice becomes a casualty.

In the extraordinary circumstances of this case, where witnesses turned hostile under intimidation and threat, fair trial is impossible within the state. We direct that the retrial shall take place before a competent Court of Session in the State of Maharashtra."`,
  },

  // ==========================================
  // UNRECOVERED FILES & SATIRE (D:\UNRECOVERED_FILES)
  // ==========================================
  'file-satire-report': {
    id: 'file-satire-report',
    name: 'FINAL_DEVELOPMENT_REPORT_FINAL_FINAL_v7.doc',
    isDirectory: false,
    parentId: 'dir-d-unrecovered',
    path: 'D:\\UNRECOVERED_FILES\\FINAL_DEVELOPMENT_REPORT_FINAL_FINAL_v7.doc',
    fileType: 'doc',
    icon: 'file-text',
    size: 3120,
    modified: '2016-10-30 23:59',
    metadata: {
      documentTitle: 'FINAL_DEVELOPMENT_REPORT_FINAL_FINAL_v7.doc',
      historicalDate: '30 October 2016',
      sourceOrPublication: 'Inter-Departmental Coordination Committee on Presentation Aesthetics',
      category: 'fictional_story',
      summary: 'Satirical fictional bureaucratic draft exhibiting classic administrative procrastination, revision creep, and committee jargon.',
      isFictional: true,
    },
    content: `[ARCHIVIST FICTIONAL RECORD - SATIRICAL BUREAUCRATIC ELEMENT]
=== GOVERNMENT OF GUJARAT / SPECIAL CELL DRAFT ===
DOCUMENT: FINAL_DEVELOPMENT_REPORT_FINAL_FINAL_v7.doc
FILE NUMBER: GNR/ADM/REV-889-B/CONFIDENTIAL
STATUS: PENDING RE-RE-APPROVAL BY ADDITIONAL CHIEF SECRETARY

VERSION CONTROL HISTORY:
* v1.0 (Jan 2014): Initial comprehensive draft (42 pages).
* v2.1 (Mar 2014): Revised to add 18 charts with upward-pointing 45-degree arrows.
* v3.4 (Nov 2014): Renamed 'Preliminary Output Summary' after objections from audit.
* v4.0 (May 2015): Rebranded with modern tagline: "Synergistic Paradigms of Granular Scalability".
* v5.2 (Jan 2016): Font size adjusted to 11.5pt Garamond after 3 committee meetings.
* v6.0 (Aug 2016): All adjectives replaced with 'Vibrant', 'Empowered', or 'Resilient'.
* v7.0 (Oct 2016): Marked FINAL_FINAL. Awaiting signature of 14 separate branch officers.

EXECUTIVE SUMMARY:
"This document conclusively proves that targets set for the preceding fiscal quadrant have either been achieved, exceeded, or strategically postponed to a future fiscal quadrant where achievement will be substantially more impactful."

[MARGIN NOTE SCRAWLED IN RED INK]:
"Dave-bhai: Do not print this yet. The Under Secretary wants the cover page changed from saffron-and-green to deep navy blue because it looks more authoritative on overhead projectors."`,
  },

  'file-corrupted-cluster': {
    id: 'file-corrupted-cluster',
    name: 'sector_corrupted_cluster_0x8F91.dat',
    isDirectory: false,
    parentId: 'dir-d-unrecovered',
    path: 'D:\\UNRECOVERED_FILES\\sector_corrupted_cluster_0x8F91.dat',
    fileType: 'system',
    icon: 'file-exe',
    size: 16400,
    modified: '2016-11-12 02:40',
    content: 'CORRUPTED_SECTOR_RECOVERABLE',
    metadata: {
      documentTitle: 'Damaged Archive Sector Cluster 0x8F91',
      historicalDate: '12 November 2016',
      sourceOrPublication: 'Physical Hard Disk Sector Partition',
      category: 'fictional_story',
      summary: 'Damaged sector cluster containing fragmentary records from the sudden shutdown in November 2016. Can be analyzed in MS-DOS Prompt via the "RECOVER" command.',
      isFictional: true,
    },
  },

  'file-recovered-fragment': {
    id: 'file-recovered-fragment',
    name: 'recovered_fragment_secret_memo.txt',
    isDirectory: false,
    parentId: 'dir-d-unrecovered',
    path: 'D:\\UNRECOVERED_FILES\\recovered_fragment_secret_memo.txt',
    fileType: 'text',
    icon: 'file-text',
    size: 1850,
    modified: '2016-11-11 23:50',
    metadata: {
      documentTitle: 'Fragmentary Memo: Archives Preservation Directive',
      historicalDate: '11 November 2016',
      sourceOrPublication: 'Secretariat Archives Branch Internal Note',
      category: 'fictional_story',
      summary: 'Partially salvaged memorandum directing the preservation of historical records before administrative shift to New Sachivalaya.',
      isFictional: true,
    },
    content: `[ARCHIVIST FICTIONAL RECORD - STORYTELLING ELEMENT]
=== PARTIALLY RECOVERED ARCHIVE FRAGMENT ===
RECOVERED BY FORENSIC CLUSTER REBUILDER

"...Directive to Desk Officer R.K. Dave:
In view of the complete digitization protocol and the shifting of administrative files from Old Sachivalaya Block 3 to Swarnim Sankul, all obsolete hardware (including 1998-era archival workstation GNR-CMO-ADM-98) must be decommissioned and handed over to Central Stores for physical disposal.

Duplicate local drives (C: and D:) must be wiped in accordance with Section 12 of the Record Retention Rules.

Under no circumstances should unofficial backups of 2001-2016 documents, cabinet press dossiers, or riot inquiry records be retained outside the central server..."

[HANDWRITTEN NOTE BY R.K. DAVE]:
"They want the past erased or repackaged. I cannot delete fifteen years of history. I am cloning both partitions to D: and moving the machine into wooden crate #77 in the basement record room. If truth matters, someone will find it."`,
  },

  // ==========================================
  // FILES IN C:\SECRET
  // ==========================================
  'file-who-deleted': {
    id: 'file-who-deleted',
    name: 'WHO_DELETED_THE_ARCHIVE.txt',
    isDirectory: false,
    parentId: 'dir-secret',
    path: 'C:\\SECRET\\WHO_DELETED_THE_ARCHIVE.txt',
    fileType: 'text',
    icon: 'file-text',
    size: 2980,
    modified: '2016-11-12 01:40',
    metadata: {
      documentTitle: 'Confession of the Archivist: "Who Deleted The Archive?"',
      historicalDate: '12 November 2016',
      sourceOrPublication: 'Personal Note of R.K. Dave',
      category: 'fictional_story',
      summary: 'Fictional note left by administrative archivist R.K. Dave detailing why this computer was hidden in November 2016.',
      isFictional: true,
    },
    content: `[ARCHIVIST FICTIONAL RECORD - STORYTELLING ELEMENT]
=== TO WHOEVER FINDS THIS COMPUTER IN THE FUTURE ===
AUTHOR: R.K. Dave, Desk Officer (Documentation & Records)
LOCATION: Sachivalaya, Gandhinagar, Gujarat
DATE: 12 November 2016 — 01:40 AM IST

If you are reading this file, you have managed to boot this old Pentium II Windows 98 terminal. By the time you read this, years or decades will have passed since the events recorded on this disk.

Tonight, Gandhinagar is in chaos.
Three nights ago, on November 8, Prime Minister Modi addressed the nation and demonetised all ₹500 and ₹1,000 notes. Ever since, every bank in Gujarat is surrounded by kilometer-long queues. In the secretariat corridors, orders arrived to speed up the relocation of our wing to the new Swarnim Sankul building and immediately destroy outdated 1998-era terminals.

They told us: "Everything is on the cloud now. Destroy the old physical drives."

I could not do it.
For fifteen years — from October 2001 when Narendra Modi first walked into the Chief Minister's chamber after the Bhuj earthquake, through the horrors of Godhra and the 2002 riots, through the Supreme Court SIT inquiries, the frantic energy of the Vibrant Gujarat summits, the Tata Nano deal, the 2014 Delhi election tsunami, all the way to this November night — I maintained this archive.

I collected everything:
- Official government press notes and white papers.
- Supreme Court judgments and SIT closure orders.
- Investigative exposés by journalists and opposition criticisms.
- The contradictions, the achievements, and the tragedies.

I locked the confidential transfer file with our secretariat password:
"SACHIVALAYA"

I hid this computer in archival crate #77 beneath the old municipal water tax ledgers in the basement of Block 3.

History is not what a single party claims, nor what their detractors imagine. History is the stubborn weight of recorded facts.

Find the truth. Judge for yourself.
— R.K. Dave`,
  },

  'file-archivist-diary': {
    id: 'file-archivist-diary',
    name: 'archivist_diary_2016.txt',
    isDirectory: false,
    parentId: 'dir-secret',
    path: 'C:\\SECRET\\archivist_diary_2016.txt',
    fileType: 'text',
    icon: 'file-text',
    size: 4200,
    modified: '2016-11-11 23:30',
    metadata: {
      documentTitle: 'Personal Diary of R.K. Dave (2001–2016)',
      historicalDate: '2001 – November 2016',
      sourceOrPublication: 'Personal Journal',
      category: 'fictional_story',
      summary: 'Fictional diary entries tracing the life of a Sachivalaya administrative employee through key political milestones.',
      isFictional: true,
    },
    content: `[ARCHIVIST FICTIONAL RECORD - STORYTELLING ELEMENT]
=== PERSONAL DIARY: R.K. DAVE (1974–2016) ===
DESK OFFICER, GUJARAT SECRETARIAT, GANDHINAGAR

OCTOBER 08, 2001
New Chief Minister took oath yesterday. Narendra Modi. Everyone in the administration noticed the immediate change in tempo. Keshubhai's tenure was laid-back and paternal. Modi walked into the Sachivalaya at 8:30 AM today, inspected the sanitation in the corridors, and ordered every file older than 1990 to be bound or indexed within two weeks. My desk is swamped with Bhuj earthquake relief files.

FEBRUARY 28, 2002
A nightmare has fallen upon Gujarat. Yesterday the train was burnt at Godhra. Today mobs are rioting across Ahmedabad. Our office landlines are ringing non-stop. Police wireless sets in the home department are crackling with panic from Naroda and Chamanpura. Rumors fly that ministers are visiting control rooms. Curfew is everywhere. The smoke from Ahmedabad was visible from the highway bridge this evening. A terrible, dark chapter has opened.

JANUARY 13, 2005
Vibrant Gujarat has transformed this quiet administrative town. Gandhinagar used to be a sleepwalker's paradise after 6:00 PM. Now there are foreign delegations from Japan, Britain, and Singapore walking through Sector 10. Chief Minister Modi does not tolerate power cuts or delayed presentations. The Power Department rolled out Jyotigram; farmers grumble about metered power, but village homes have lights all night.

OCTOBER 07, 2008
Ratan Tata came to Gandhinagar today. Mamata Banerjee drove the Nano out of Singur, and within 48 hours, Gujarat allotted 1,100 acres in Sanand. The Chief Minister reportedly sent Ratan Tata a one-word SMS: "Welcome to Gujarat." Our desk worked till 4:00 AM preparing the revenue department mutation deeds.

DECEMBER 26, 2013
Metropolitan Magistrate Ganatra in Ahmedabad rejected Zakia Jafri's petition today and accepted the SIT's closure report. The Chief Minister tweeted simply: "Satyamev Jayate." Twelve years of relentless judicial inquiry, SIT grilling, Nanavati hearings... and legally, the clean chit is formal. The path to New Delhi is wide open.

MAY 16, 2014
The 2014 election results! 282 seats for BJP. The entire secretariat gathered around the small CRT television in the canteen. Half the senior IAS officers are already packing their suitcases; they know Modi will call them to Delhi to staff the PMO. The center of political gravity has moved from the Sabarmati to the Yamuna.

NOVEMBER 08, 2016 - 11:30 PM
Unbelievable night. Modi appeared on television at 8:00 PM and announced demonetisation. ₹500 and ₹1,000 notes are void. The street outside my colony in Sector 21 is packed with people queuing at the SBI cash deposit machine. In our office, orders arrived to pack up our archival wing for the shifting to Swarnim Sankul. They want to shred old physical papers and scrap these old PCs.
I am staying late tonight to copy everything. This computer holds the chronicle of Gujarat and India from 2001 to 2016. I will protect it.`,
  },

  'file-confidential-transfer': {
    id: 'file-confidential-transfer',
    name: 'confidential_transfer_order.doc',
    isDirectory: false,
    parentId: 'dir-secret',
    path: 'C:\\SECRET\\confidential_transfer_order.doc',
    fileType: 'doc',
    icon: 'file-text',
    size: 2600,
    modified: '2016-11-11 20:10',
    isPasswordProtected: true,
    password: 'SACHIVALAYA',
    metadata: {
      documentTitle: 'CONFIDENTIAL: Office Decommissioning Directive #7729',
      historicalDate: '11 November 2016',
      sourceOrPublication: 'General Administration Dept (Confidential Branch)',
      category: 'fictional_story',
      summary: 'Password-protected confidential memo ordering the evacuation of archives from Old Sachivalaya Block 3. (Password: SACHIVALAYA).',
      isFictional: true,
    },
    content: `[ARCHIVIST FICTIONAL RECORD - STORYTELLING ELEMENT]
=== TOP SECRET / CONFIDENTIAL ADMINISTRATIVE ORDER ===
GOVERNMENT OF GUJARAT — GENERAL ADMINISTRATION DEPARTMENT
ORDER NO. GAD/SEC-10/2016/CONF-7729
DATE: 11 NOVEMBER 2016

SUBJECT: PHYSICAL REORGANIZATION OF HISTORICAL ARCHIVES WING

In pursuant of Phase-3 modernisation and shift of departments to the Swarnim Sankul complex:

1. Terminal GNR-CMO-ADM-98 (assigned to Desk Officer R.K. Dave) is hereby declared legacy surplus hardware.
2. The officer-in-charge shall verify that all local hard drives are erased using magnetic degaussing or physical formatting.
3. Historical files relating to 2001–2013 commissions, press scrapbooks, and duplicate election records shall be moved to Central Repository Section B or shredded.
4. Officer R.K. Dave is transferred with immediate effect to Revenue Inspection, Vadodara Division, effective 14 November 2016.

BY ORDER OF THE GOVERNOR OF GUJARAT
SECRETARY, GENERAL ADMINISTRATION DEPARTMENT`,
  },

  'file-cipher-key': {
    id: 'file-cipher-key',
    name: 'cipher.key',
    isDirectory: false,
    parentId: 'dir-secret',
    path: 'C:\\SECRET\\cipher.key',
    fileType: 'text',
    icon: 'file-text',
    size: 1150,
    modified: '2016-11-12 01:10',
    metadata: {
      documentTitle: 'Archival Vault Key & Terminal Diagnostic Guide',
      historicalDate: '12 November 2016',
      sourceOrPublication: 'Personal Cryptographic Reference',
      category: 'fictional_story',
      summary: 'Clue sheet left by the archivist for unlocking confidential documents and navigating terminal commands.',
      isFictional: true,
    },
    content: `[ARCHIVIST FICTIONAL RECORD - STORYTELLING ELEMENT]
=== ARCHIVAL VAULT DECRYPTION REFERENCE ===

PASSWORD CLUES:
* The locked document (confidential_transfer_order.doc) is encrypted with the capital name of the Gandhinagar State Administrative Complex:
  --> "SACHIVALAYA"
* (Alternative administrative watermark can also be found on the Mahatma Mandir photograph in My Pictures).

TERMINAL SPECIAL COMMANDS (MS-DOS PROMPT):
  democracy     -> Simulates the Indian parliamentary debate & bill voting process
  accountability-> Searches the bureaucratic system for accountability records
  promises      -> Calculates the realization index of political promises
  archive       -> Displays the indexing summary of the 2001-2016 historical repository
  timeline      -> Prints the complete chronological milestone timeline
  recover       -> Runs forensic sector repair on D:\\UNRECOVERED_FILES\\sector_corrupted_cluster_0x8F91.dat
  secret        -> Displays archivist security status and partition logs`,
  },

  // ==========================================
  // RECYCLE BIN DELETED FILES
  // ==========================================
  'bin-draft-press': {
    id: 'bin-draft-press',
    name: 'draft_press_release_2007.txt',
    isDirectory: false,
    parentId: null,
    path: 'Recycle Bin\\draft_press_release_2007.txt',
    fileType: 'text',
    icon: 'file-text',
    size: 820,
    modified: '2007-12-15 18:20',
    content: `[DISCARDED DRAFT PRESS NOTE - DECEMBER 2007]
"The state government categorically refutes all opposition advertisements claiming economic disparity. Gujarat's industrial growth is visible in every village.
[PENCIL NOTE BY SECTION OFFICER]: Discard this draft. Too defensive. Focus instead on Vibrant Gujarat 2008 and the 5.5% agricultural growth claims."`,
  },

  'bin-complaint': {
    id: 'bin-complaint',
    name: 'deleted_complaint_letter.doc',
    isDirectory: false,
    parentId: null,
    path: 'Recycle Bin\\deleted_complaint_letter.doc',
    fileType: 'doc',
    icon: 'file-text',
    size: 1100,
    modified: '2011-04-10 11:30',
    content: `[CITIZEN PETITION FORWARDED VIA SWAGAT GRIEVANCE CELL]
PETITIONER: Farmer Representative, Kutch Canal Water Users Association
DATE: April 2011
COMPLAINT: The Narmada branch canal distribution network in our taluka remains incomplete despite the main canal inauguration two years ago. Water is reaching industrial estates in Mundra while adjacent agricultural fields are dry.
[BUREAUCRATIC ENDORSEMENT]: "Forwarded to Sardar Sarovar Narmada Nigam Ltd (SSNNL) for necessary action. File marked pending."`,
  },

  'bin-slogan-ideas': {
    id: 'bin-slogan-ideas',
    name: 'discarded_slogan_ideas.txt',
    isDirectory: false,
    parentId: null,
    path: 'Recycle Bin\\discarded_slogan_ideas.txt',
    fileType: 'text',
    icon: 'file-text',
    size: 940,
    modified: '2013-08-20 17:45',
    content: `[MARKETING CAMPAIGN BRAINSTORMING SCRATCHPAD - 2013]
CAMPAIGN SLOGAN CANDIDATES:
1. "Governance That Delivers" (Rejected: Too boring)
2. "From Gandhinagar to Raisina Hill" (Rejected: Too arrogant)
3. "Gujarat Model For All India" (Approved for regional media)
4. "Achhe Din Aane Wale Hain" (Shortlisted for national advertising blitz)
5. "Congress-Mukt Bharat" (High energy, approved for rallies)
6. "Sabka Saath, Sabka Vikas" (Universal appeal, approved for manifesto title)`,
  },

  'bin-shred-order': {
    id: 'bin-shred-order',
    name: 'memo_shred_order_nov2016.txt',
    isDirectory: false,
    parentId: null,
    path: 'Recycle Bin\\memo_shred_order_nov2016.txt',
    fileType: 'text',
    icon: 'file-text',
    size: 780,
    modified: '2016-11-10 15:30',
    content: `[CIRCULAR TO ALL SECTION OFFICERS - OLD SACHIVALAYA]
DATE: 10 NOVEMBER 2016
"In connection with the physical shift to Swarnim Sankul 1 & 2:
All departmental desks are instructed to conduct physical weed-out of duplicate non-gazetted paper records and scrap pre-Y2K electronic hardware.
Complete clearance by November 15."
[R.K. Dave deleted this file after saving copies to D: drive].`,
  },

  // ==========================================
  // SYSTEM BAD DRIVER (BSOD TRIGGER)
  // ==========================================
  'win-bad-driver': {
    id: 'win-bad-driver',
    name: 'bad_driver.vxd',
    isDirectory: false,
    parentId: 'dir-system',
    path: 'C:\\WINDOWS\\SYSTEM\\bad_driver.vxd',
    fileType: 'system',
    icon: 'file-exe',
    size: 16400,
    modified: '2008-04-12 11:22',
    content: 'CRASH_TRIGGER',
  },

  // Political Satire Memes
  ...MEME_NODES,
};

export const INITIAL_RECYCLE_BIN_IDS = [
  'bin-draft-press',
  'bin-complaint',
  'bin-slogan-ideas',
  'bin-shred-order',
];

