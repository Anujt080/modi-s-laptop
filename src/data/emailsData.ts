export interface ArchiveEmail {
  id: string;
  sender: string;
  email: string;
  subject: string;
  date: string;
  size: string;
  body: string;
  isRead: boolean;
  folder: 'inbox' | 'sent' | 'deleted';
  attachment?: {
    name: string;
    type: string;
    content: string;
  };
}

export const INITIAL_ARCHIVE_EMAILS: ArchiveEmail[] = [
  {
    id: 'mail-demonetisation-alert',
    sender: 'Under Secretary (Finance / Banking Coordination)',
    email: 'finance_cell@gujarat.gov.in',
    subject: 'URGENT & CONFIDENTIAL: Standby Instructions regarding National Address',
    date: '2016-11-08 17:45',
    size: '3 KB',
    isRead: false,
    folder: 'inbox',
    body: `CONFIDENTIAL / SPECIAL CIRCULAR

To: All Branch Heads, General Administration Dept & District Collectorates
Date: 08 November 2016 — 17:45 IST

All senior administrative personnel, treasury officers, and district revenue staff are advised to remain on standby post-20:00 hours tonight following an extraordinary televised address to the nation by the Hon'ble Prime Minister.

While exact operational details remain classified until the broadcast, preliminary coordination with State Level Bankers' Committee (SLBC) representatives and district lead bank managers is being established.

District magistrates are directed to monitor law and order at commercial bank branches and automated teller machine installations over the next 72 hours.

— General Administration Department (Finance Branch), Gandhinagar`,
  },
  {
    id: 'mail-swarnim-shift',
    sender: 'Estate Officer (Sachivalaya Complex)',
    email: 'estate_sec10@gujarat.gov.in',
    subject: 'FINAL NOTICE: Physical Relocation to Swarnim Sankul-2 & Scrap Clearance',
    date: '2016-11-10 11:20',
    size: '2 KB',
    isRead: false,
    folder: 'inbox',
    body: `To: Desk Officer R.K. Dave (Archives & Documentation)
Reference: GAD/ESTATE/PH-3/REORG-16

Dear Dave-bhai,

As per the Chief Secretary's directive regarding complete modernization, all departmental files and office infrastructure in Block 3 (Old Sachivalaya) must be vacated by November 15.

Notice regarding your station hardware:
Your terminal (Pentium II 450, Windows 98) is classified as redundant scrap asset #7729. IT Cell has confirmed that all official government software has migrated to Windows 7 / NIC servers.

Please ensure all local hard disks are wiped or turned over to the hardware scrap auction committee. No local backups of pre-2014 documents are to be removed from the premises.

Regards,
P.T. Joshi
Estate & Assets Officer, Gandhinagar`,
  },
  {
    id: 'mail-delhi-transition',
    sender: 'Joint Secretary (Cabinet Coordination)',
    email: 'cabinet_liaison@pmo-transition.gov.in',
    subject: 'Transfer of Gujarat Model Documentation to PMO Transition Cell / New Delhi',
    date: '2014-05-20 16:30',
    size: '4 KB',
    isRead: true,
    folder: 'inbox',
    body: `CONFIDENTIAL DISPATCH
From: Gujarat Bhavan Liaison Desk, New Delhi
To: Archives Branch, Gandhinagar Secretariat

Subject: Dossiers required for new Union Ministries

Following the historic mandate of 16 May 2014, the Prime Minister-designate has instructed the preparation of comprehensive briefing dossiers on successful Gujarat governance initiatives for implementation at the union level:

1. Jyotigram Yojana (feeder separation model for 24x7 rural power) -> for Ministry of Power.
2. Sabarmati Riverfront Development Project -> for Ministry of Water Resources / Namami Gange.
3. SWAGAT Online Grievance System -> for PMO citizen portal modernization.
4. Solar canal-top engineering specifications -> for Ministry of New & Renewable Energy.

Please dispatch digitized copies of all policy frameworks by special courier to 7 Race Course Road / South Block transition cell before 25 May.

Best regards,
A.K. Sharma, IAS
Special Officer on Duty`,
  },
  {
    id: 'mail-sit-proceedings',
    sender: 'Legal Cell (Home Department)',
    email: 'legal_home@gujarat.gov.in',
    subject: 'Record of Metropolitan Magistrate Order: SIT Closure Report Accepted',
    date: '2013-12-26 17:15',
    size: '3 KB',
    isRead: true,
    folder: 'inbox',
    body: `URGENT LEGAL DISPATCH
Date: 26 December 2013
Case: Zakia Jafri vs State of Gujarat & Ors. (Cr. Case No. 2006/SIT)

The Court of Metropolitan Magistrate B.J. Ganatra in Ahmedabad has delivered its final order today at 16:30 IST.

Summary of Judicial Order:
1. The protest petition filed by Zakia Jafri contesting the Supreme Court SIT's closure report has been rejected in its entirety.
2. The court has formally accepted the SIT's final report dated 8 February 2012, which concluded that there is no prosecutable evidentiary basis to frame criminal conspiracy charges against the 63 respondents, including the Chief Minister.
3. Certified copies of the judgment (approx. 340 pages) have been requisitioned for the official state record repository.

Please archive these judicial papers under Permanent Record Series GNR-LAW-2013-09.

— Chief Legal Officer, Home Department`,
  },
  {
    id: 'mail-vibrant-gujarat-targets',
    sender: 'Managing Director, iNDEXTb',
    email: 'md_indextb@vibrantgujarat.com',
    subject: 'Vibrant Gujarat 2011: MoU Verification & Grounding Rate Compilation',
    date: '2011-01-22 14:05',
    size: '3 KB',
    isRead: true,
    folder: 'inbox',
    body: `To: Archival & Documentation Cell, Secretariat

Following the conclusion of the 5th Vibrant Gujarat Global Summit at the newly constructed Mahatma Mandir in Gandhinagar, the Hon'ble Chief Minister has reviewed the preliminary MoU dashboard:

* Total signed commitments: 7,936 MoUs worth ₹20.83 lakh crore.
* High focus sectors: Port infrastructure, automobile manufacturing (following Tata Nano at Sanand), and renewable solar park development in Charanka, Patan.

Critical Instruction:
The opposition and certain financial dailies are raising queries regarding the actual realization and conversion rate of MoUs into grounded factories. Desk Officer Dave is requested to compile a factual comparative matrix of 2003, 2005, 2007, and 2009 summits demonstrating actual land allocations and factory commercial operations.

Ensure the presentation emphasizes that major petrochemical and mega-infrastructure investments operate on 5-to-10 year capital cycles.

Regards,
Secretariat Industrial Coordination Cell`,
  },
  {
    id: 'mail-bhuj-earthquake-2001',
    sender: 'Relief & Rehabilitation Commissioner',
    email: 'disaster_cell@gujarat.gov.in',
    subject: 'HISTORICAL ARCHIVE: Oath of Office & Transition to New CM (October 2001)',
    date: '2001-10-08 09:30',
    size: '2 KB',
    isRead: true,
    folder: 'inbox',
    body: `OFFICIAL TRANSITION NOTIFICATION
Date: 08 October 2001

This is to notify all branches that Shri Narendra Modi has assumed office as the Chief Minister of Gujarat on 07 October 2001.

Immediate Administrative Focus:
1. Expediting pending reconstruction grants and house allotment verifications in Kutch and Bhuj disaster zones.
2. Restructuring drought relief distribution in Saurashtra.
3. Punctuality and strict adherence to office hours across all Sachivalaya blocks.

All desk officers shall review pending earthquake relief files by end of this week.

— General Administration Department`,
  },
];

