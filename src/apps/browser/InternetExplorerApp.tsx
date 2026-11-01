import React, { useState } from 'react';
import { sound } from '../../sound/soundEngine';
import { HISTORICAL_SEARCH_INDEX } from '../../data/historicalWebsites';

export const InternetExplorerApp: React.FC<{ windowId: string }> = () => {
  const [url, setUrl] = useState('http://www.gujaratindia.com');
  const [inputUrl, setInputUrl] = useState('http://www.gujaratindia.com');
  const [history, setHistory] = useState<string[]>([
    'http://www.gujaratindia.com',
    'http://eci.gov.in/results2014',
    'http://www.rbi.org.in/press/demonetisation_2016',
    'http://news.thehindu.com/archive/2002_2016',
    'http://www.supremecourtofindia.nic.in/sit_order_2013',
    'http://sachivalaya.internal/bulletin',
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Search Engine state
  const [searchQuery, setSearchQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  // Intranet feedback form state
  const [feedbackName, setFeedbackName] = useState('');
  const [feedbackDept, setFeedbackDept] = useState('');
  const [feedbackNote, setFeedbackNote] = useState('');
  const [bulletinNotes, setBulletinNotes] = useState([
    { name: 'P.T. Joshi (Estate)', dept: 'Admin Block 3', date: '2016-11-10', text: 'All desk officers must return obsolete hardware to basement stores before the weekend.' },
    { name: 'K. Patel (Revenue)', dept: 'Secretariat Sector 10', date: '2016-11-09', text: 'State bank ATM outside gate 1 has run out of ₹100 notes. Prepare for long lines.' },
    { name: 'Canteen Supervisor', dept: 'Sachivalaya Mess', date: '2016-11-08', text: 'Reminder: Canteen coupon books are only valid with new legal tender starting tomorrow.' },
  ]);

  const navigateTo = (targetUrl: string) => {
    sound.playClick();
    setIsLoading(true);
    let formatted = targetUrl.trim();
    if (!formatted.startsWith('http://') && !formatted.startsWith('https://')) {
      formatted = 'http://' + formatted;
    }

    setTimeout(() => {
      setUrl(formatted);
      setInputUrl(formatted);
      if (!history.includes(formatted)) {
        setHistory((prev) => [...prev.slice(0, historyIndex + 1), formatted]);
        setHistoryIndex((prev) => prev + 1);
      } else {
        setHistoryIndex(history.indexOf(formatted));
      }
      setIsLoading(false);
      sound.playAsterisk();
    }, 350);
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      sound.playClick();
      const nextIdx = historyIndex - 1;
      setHistoryIndex(nextIdx);
      setUrl(history[nextIdx]);
      setInputUrl(history[nextIdx]);
    }
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      sound.playClick();
      const nextIdx = historyIndex + 1;
      setHistoryIndex(nextIdx);
      setUrl(history[nextIdx]);
      setInputUrl(history[nextIdx]);
    }
  };

  const handleRefresh = () => {
    sound.playClick();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      sound.playAsterisk();
    }, 250);
  };

  const handleAddFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackName.trim() || !feedbackNote.trim()) return;
    sound.playClick();
    setBulletinNotes([
      {
        name: feedbackName.trim(),
        dept: feedbackDept.trim() || 'General Admin',
        date: '2016-11-11',
        text: feedbackNote.trim(),
      },
      ...bulletinNotes,
    ]);
    setFeedbackName('');
    setFeedbackDept('');
    setFeedbackNote('');
  };

  // Filter search results
  const filteredSearchResults = HISTORICAL_SEARCH_INDEX.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      item.title.toLowerCase().includes(q) ||
      item.snippet.toLowerCase().includes(q) ||
      item.tag.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex-1 flex flex-col h-full bg-[#c0c0c0] select-none text-[11px]">
      {/* Menu Bar */}
      <div className="win-menubar">
        <div className="win-menu-item"><u>F</u>ile</div>
        <div className="win-menu-item"><u>E</u>dit</div>
        <div className="win-menu-item"><u>V</u>iew</div>
        <div className="win-menu-item"><u>G</u>o</div>
        <div className="win-menu-item"><u>F</u>avorites</div>
        <div className="win-menu-item"><u>H</u>elp</div>
      </div>

      {/* Navigation Toolbar */}
      <div className="bg-[#c0c0c0] p-1 flex items-center justify-between border-b border-[#808080]">
        <div className="flex items-center gap-1">
          <button
            className={`win-btn ${historyIndex <= 0 ? 'opacity-50 pointer-events-none' : ''}`}
            style={{ minWidth: 46, minHeight: 22 }}
            onClick={handleBack}
            title="Back"
          >
            ◀ Back
          </button>
          <button
            className={`win-btn ${historyIndex >= history.length - 1 ? 'opacity-50 pointer-events-none' : ''}`}
            style={{ minWidth: 50, minHeight: 22 }}
            onClick={handleForward}
            title="Forward"
          >
            Forward ▶
          </button>
          <button
            className="win-btn font-bold text-[#ff0000]"
            style={{ minWidth: 42, minHeight: 22 }}
            onClick={() => setIsLoading(false)}
            title="Stop"
          >
            ✕ Stop
          </button>
          <button
            className="win-btn"
            style={{ minWidth: 50, minHeight: 22 }}
            onClick={handleRefresh}
            title="Refresh"
          >
            ⟳ Refresh
          </button>
          <button
            className="win-btn"
            style={{ minWidth: 46, minHeight: 22 }}
            onClick={() => navigateTo('http://www.gujaratindia.com')}
            title="Home"
          >
            ⌂ Home
          </button>
          <button
            className="win-btn"
            style={{ minWidth: 48, minHeight: 22 }}
            onClick={() => navigateTo('http://www.google.co.in')}
            title="Search"
          >
            🔍 Search
          </button>
        </div>

        {/* Animated Windows Logo indicator */}
        <div className="win-inset w-6 h-6 bg-black flex items-center justify-center font-bold text-[#00ff00] text-[12px]">
          {isLoading ? '⌛' : 'e'}
        </div>
      </div>

      {/* Address Bar */}
      <div className="bg-[#c0c0c0] px-1 py-1 flex items-center gap-1.5 border-b border-[#808080]">
        <span className="font-bold text-[11px] text-[#404040]">Address</span>
        <div className="win-inset bg-white flex-1 flex items-center px-1">
          <input
            type="text"
            className="w-full text-[11px] outline-none font-mono bg-transparent text-black"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') navigateTo(inputUrl);
            }}
          />
        </div>
        <button
          className="win-btn font-bold"
          style={{ minWidth: 32, minHeight: 20, padding: 0 }}
          onClick={() => navigateTo(inputUrl)}
        >
          Go
        </button>
      </div>

      {/* Quick Bookmarks Bar (Believable 2001-2016 Web History) */}
      <div className="bg-[#dfdfdf] px-2 py-0.5 border-b border-[#808080] flex flex-wrap gap-2 text-[10px] text-[#000080]">
        <span
          className="cursor-pointer hover:underline font-semibold"
          onClick={() => navigateTo('http://www.gujaratindia.com')}
        >
          [Gujarat State Portal]
        </span>
        <span
          className="cursor-pointer hover:underline font-semibold"
          onClick={() => navigateTo('http://eci.gov.in/results2014')}
        >
          [ECI Results 2014]
        </span>
        <span
          className="cursor-pointer hover:underline font-semibold"
          onClick={() => navigateTo('http://www.rbi.org.in/press/demonetisation_2016')}
        >
          [RBI Demonetisation 2016]
        </span>
        <span
          className="cursor-pointer hover:underline font-semibold"
          onClick={() => navigateTo('http://www.supremecourtofindia.nic.in/sit_order_2013')}
        >
          [Supreme Court SIT Orders]
        </span>
        <span
          className="cursor-pointer hover:underline font-semibold"
          onClick={() => navigateTo('http://news.thehindu.com/archive/2002_2016')}
        >
          [The Hindu News Archive]
        </span>
        <span
          className="cursor-pointer hover:underline font-semibold"
          onClick={() => navigateTo('http://sachivalaya.internal/bulletin')}
        >
          [Sachivalaya Intranet]
        </span>
        <span
          className="cursor-pointer hover:underline font-semibold text-emerald-800"
          onClick={() => navigateTo('http://www.google.co.in')}
        >
          [Google India Beta]
        </span>
      </div>

      {/* Web Content Render Frame */}
      <div className="flex-1 overflow-auto bg-white p-3 select-text text-black font-sans">
        {/* ========================================================= */}
        {/* PAGE 1: GUJARAT STATE GOVERNMENT PORTAL (gujaratindia.com) */}
        {/* ========================================================= */}
        {url.includes('gujaratindia.com') && (
          <div className="max-w-3xl mx-auto border-2 border-[#000080] bg-[#fafafa] p-3 shadow-md">
            {/* Header Banner */}
            <div className="bg-[#003366] text-white p-3 border-b-4 border-[#ff9933] flex justify-between items-center">
              <div>
                <h1 className="text-xl font-bold tracking-tight">
                  GOVERNMENT OF GUJARAT
                </h1>
                <p className="text-xs text-orange-200">
                  Official State Portal | Sachivalaya, Gandhinagar
                </p>
              </div>
              <div className="text-right text-[10px] text-gray-300 font-mono">
                <div>SWAPNIL GUJARAT</div>
                <div className="text-yellow-300 font-bold">VIBRANT GUJARAT SUMMIT</div>
              </div>
            </div>

            {/* Tricolor decorative ribbon */}
            <div className="h-1 bg-gradient-to-r from-orange-500 via-white to-green-600 mb-3" />

            {/* CM Profile & Governance Highlight */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              <div className="border border-gray-300 bg-white p-2">
                <div className="bg-[#f0f4f8] p-2 border border-gray-200 text-center mb-2">
                  <div className="w-16 h-16 bg-blue-900 text-white font-bold flex items-center justify-center mx-auto text-xl rounded">
                    CM
                  </div>
                  <h3 className="font-bold text-xs text-[#000080] mt-1">Narendra Modi</h3>
                  <span className="text-[10px] text-gray-600 block">
                    Chief Minister of Gujarat (2001–2014)
                  </span>
                </div>
                <p className="text-[10px] text-gray-700 leading-relaxed">
                  "Development is our sole mantra. Our goal is to make Gujarat a model of transparent e-governance and industrial resurgence."
                </p>
              </div>

              <div className="md:col-span-2 border border-gray-300 bg-white p-2 text-xs space-y-2">
                <h2 className="font-bold text-sm text-[#000080] border-b pb-1">
                  Key Governance Flagships (2001–2013)
                </h2>
                <ul className="list-disc list-inside space-y-1 text-gray-800 text-[11px]">
                  <li>
                    <b>Jyotigram Yojana:</b> Feeder separation guaranteeing 24-hour uninterrupted 3-phase electricity to 18,000 villages.
                  </li>
                  <li>
                    <b>SWAGAT Online Grievance System:</b> Direct monthly video conferencing between citizens and Chief Minister for grievance disposal.
                  </li>
                  <li>
                    <b>Vibrant Gujarat Global Investors Summit:</b> Biennial summits at Mahatma Mandir, Gandhinagar, signing MoUs for industrial investments.
                  </li>
                  <li>
                    <b>Sabarmati Riverfront & Canal Solar Power:</b> Urban regeneration and clean energy projects over Narmada branch canals.
                  </li>
                </ul>
              </div>
            </div>

            {/* Official Notices */}
            <div className="border border-gray-300 bg-yellow-50 p-2 text-[11px] mb-3">
              <b className="text-orange-900">Official Notice:</b> General Administration Department has completed the initial archiving of 2001–2013 cabinet resolutions. Reorganization of secretariat documentation wing in progress.
            </div>

            <div className="text-[10px] text-center text-gray-500 border-t pt-2">
              National Informatics Centre (NIC) Gujarat State Centre | Best viewed in 800x600 resolution.
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* PAGE 2: ELECTION COMMISSION OF INDIA (eci.gov.in) */}
        {/* ========================================================= */}
        {url.includes('eci.gov.in') && (
          <div className="max-w-3xl mx-auto border border-gray-400 bg-white p-4">
            <div className="border-b-2 border-red-800 pb-2 mb-3 flex justify-between items-center">
              <div>
                <h1 className="text-lg font-bold text-red-900">
                  ELECTION COMMISSION OF INDIA
                </h1>
                <p className="text-xs text-gray-600">
                  General Election to 16th Lok Sabha — Official Declaration of Results
                </p>
              </div>
              <div className="text-right text-[10px] font-mono text-gray-500">
                16 MAY 2014
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-300 p-2 text-xs mb-3">
              <b>Result Summary:</b> Bharatiya Janata Party (BJP) crosses the parliamentary majority mark with <b>282 seats</b>. The National Democratic Alliance (NDA) secures <b>336 seats</b>.
            </div>

            {/* Official Result Table */}
            <table className="w-full text-[11px] border-collapse border border-gray-300 mb-4">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-300 text-left">
                  <th className="p-1 border border-gray-300">Party / Alliance</th>
                  <th className="p-1 border border-gray-300 text-center">Seats Won</th>
                  <th className="p-1 border border-gray-300 text-center">Seat Change</th>
                  <th className="p-1 border border-gray-300 text-right">Vote Share (%)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-green-50 font-semibold">
                  <td className="p-1 border border-gray-300">Bharatiya Janata Party (BJP)</td>
                  <td className="p-1 border border-gray-300 text-center font-bold text-green-800">282</td>
                  <td className="p-1 border border-gray-300 text-center text-green-700">+166</td>
                  <td className="p-1 border border-gray-300 text-right">31.00%</td>
                </tr>
                <tr>
                  <td className="p-1 border border-gray-300">Indian National Congress (INC)</td>
                  <td className="p-1 border border-gray-300 text-center font-bold text-red-700">44</td>
                  <td className="p-1 border border-gray-300 text-center text-red-600">-162</td>
                  <td className="p-1 border border-gray-300 text-right">19.31%</td>
                </tr>
                <tr>
                  <td className="p-1 border border-gray-300">AIADMK (Tamil Nadu)</td>
                  <td className="p-1 border border-gray-300 text-center">37</td>
                  <td className="p-1 border border-gray-300 text-center">+28</td>
                  <td className="p-1 border border-gray-300 text-right">3.24%</td>
                </tr>
                <tr>
                  <td className="p-1 border border-gray-300">All India Trinamool Congress (AITC)</td>
                  <td className="p-1 border border-gray-300 text-center">34</td>
                  <td className="p-1 border border-gray-300 text-center">+15</td>
                  <td className="p-1 border border-gray-300 text-right">3.84%</td>
                </tr>
                <tr>
                  <td className="p-1 border border-gray-300">Biju Janata Dal (BJD)</td>
                  <td className="p-1 border border-gray-300 text-center">20</td>
                  <td className="p-1 border border-gray-300 text-center">+6</td>
                  <td className="p-1 border border-gray-300 text-right">1.71%</td>
                </tr>
                <tr className="bg-gray-100 font-bold">
                  <td className="p-1 border border-gray-300">Total Lok Sabha Seats</td>
                  <td className="p-1 border border-gray-300 text-center">543</td>
                  <td className="p-1 border border-gray-300 text-center">-</td>
                  <td className="p-1 border border-gray-300 text-right">100.0%</td>
                </tr>
              </tbody>
            </table>

            <div className="text-[10px] text-gray-500 font-mono">
              Certified by Nirvachan Sadan, Ashoka Road, New Delhi — 110001
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* PAGE 3: RESERVE BANK OF INDIA (rbi.org.in) */}
        {/* ========================================================= */}
        {url.includes('rbi.org.in') && (
          <div className="max-w-2xl mx-auto border border-gray-400 bg-white p-4">
            <div className="border-b border-gray-300 pb-2 mb-3 flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center text-white font-serif font-bold text-sm">
                RBI
              </div>
              <div>
                <h1 className="text-base font-bold text-gray-900">
                  RESERVE BANK OF INDIA
                </h1>
                <p className="text-xs text-gray-600">
                  Communications & Monetary Policy Department, Central Office, Mumbai
                </p>
              </div>
            </div>

            <div className="text-[11px] font-mono text-gray-500 mb-2">
              PRESS RELEASE: 2016-2017/1144 | DATE: NOVEMBER 08, 2016
            </div>

            <h2 className="font-bold text-sm text-[#000080] mb-3">
              Withdrawal of Legal Tender Character of Existing ₹ 500 and ₹ 1000 Bank Notes
            </h2>

            <div className="text-xs text-gray-800 space-y-2.5 leading-relaxed">
              <p>
                In terms of Gazette Notification No. 3407(E) dated November 08, 2016 issued by the Government of India, the legal tender character of the existing bank notes in denominations of ₹ 500 and ₹ 1000 issued by the Reserve Bank of India shall stand withdrawn at the close of business hours on November 08, 2016.
              </p>

              <div className="bg-gray-50 border border-gray-300 p-2 space-y-1 text-[11px]">
                <b className="text-blue-900">Key Arrangements for the Public:</b>
                <ul className="list-disc list-inside space-y-0.5">
                  <li>Old High Denomination (OHD) bank notes can be tendered at all commercial bank branches and post offices from November 10, 2016 to December 30, 2016.</li>
                  <li>Over-the-counter cash exchange limit of ₹ 4,000 per person with valid photo identification.</li>
                  <li>ATMs will resume functioning on November 11, 2016 with an initial daily withdrawal cap of ₹ 2,000 per card.</li>
                  <li>Introduction of new Mahatma Gandhi (New) Series ₹ 500 and ₹ 2000 denomination banknotes.</li>
                </ul>
              </div>

              <p className="text-[10px] text-gray-500 italic">
                [Historical archive boundary: Demonetisation announced on 8 November 2016. Workstation active through mid-November 2016.]
              </p>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* PAGE 4: SUPREME COURT SIT JUDGMENTS (supremecourtofindia.nic.in) */}
        {/* ========================================================= */}
        {url.includes('supremecourtofindia.nic.in') && (
          <div className="max-w-2xl mx-auto border border-gray-400 bg-white p-4">
            <div className="border-b border-gray-300 pb-2 mb-3">
              <h1 className="text-base font-bold text-gray-900">
                SUPREME COURT OF INDIA JUDGMENTS REPOSITORY
              </h1>
              <p className="text-xs text-gray-600">
                Record of Proceedings: Gujarat Riots SIT Inquiries & Closure Filings
              </p>
            </div>

            <div className="space-y-3 text-xs text-gray-800 leading-relaxed">
              <div className="border border-gray-200 p-2 bg-gray-50">
                <b className="text-blue-900">1. Transfer of Best Bakery Case (2004)</b>
                <p className="mt-1 text-[11px]">
                  Supreme Court bench ordered retrial outside Gujarat in Mumbai after key witness intimidation concerns were established.
                </p>
              </div>

              <div className="border border-gray-200 p-2 bg-gray-50">
                <b className="text-blue-900">2. Constitution of Special Investigation Team (2008)</b>
                <p className="mt-1 text-[11px]">
                  Order dated 26 March 2008 appointing an SIT headed by former CBI Director R.K. Raghavan to re-investigate nine major cases.
                </p>
              </div>

              <div className="border border-gray-200 p-2 bg-gray-50">
                <b className="text-blue-900">3. SIT Closure Report & Magistrate Acceptance (2012–2013)</b>
                <p className="mt-1 text-[11px]">
                  SIT concluded that no prosecutable evidence was available against Narendra Modi and 62 others. On 26 December 2013, Metropolitan Magistrate B.J. Ganatra rejected Zakia Jafri's protest petition.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* PAGE 5: THE HINDU ARCHIVES (news.thehindu.com) */}
        {/* ========================================================= */}
        {url.includes('thehindu.com') && (
          <div className="max-w-3xl mx-auto font-serif">
            <div className="border-b-2 border-black pb-2 mb-3 text-center">
              <h1 className="text-3xl font-black tracking-tight text-gray-950 font-serif">
                THE HINDU
              </h1>
              <p className="text-[10px] text-gray-600 uppercase tracking-widest font-sans mt-0.5">
                India's National Newspaper Since 1878 — Digital Retrospective (2002–2016)
              </p>
            </div>

            <div className="space-y-4 text-xs font-serif leading-relaxed">
              <article className="border-b border-gray-300 pb-3">
                <span className="text-[10px] text-red-800 font-sans font-bold uppercase">
                  November 09, 2016 | National Desk
                </span>
                <h2 className="text-base font-bold text-gray-900 mt-0.5">
                  PM Modi Announces ₹500 and ₹1,000 Notes Withdrawn as Legal Tender
                </h2>
                <p className="text-gray-700 mt-1">
                  In a dramatic 8 PM broadcast, Prime Minister Narendra Modi declared existing high-value banknotes invalid from midnight in a bid to curb black money, terror funding, and fake currency rackets. Banks will close for a day to prepare for public deposits.
                </p>
              </article>

              <article className="border-b border-gray-300 pb-3">
                <span className="text-[10px] text-blue-800 font-sans font-bold uppercase">
                  March 03, 2016 | Legal Affairs
                </span>
                <h2 className="text-base font-bold text-gray-900 mt-0.5">
                  Delhi High Court Grants Interim Bail to Kanhaiya Kumar in JNU Sedition Case
                </h2>
                <p className="text-gray-700 mt-1">
                  Justice Pratibha Rani granted six months interim bail to JNU student union president Kanhaiya Kumar, observing that while anti-national slogans are impermissible, peaceful disagreement remains protected. Magisterial inquiry points to doctored video footage.
                </p>
              </article>

              <article className="border-b border-gray-300 pb-3">
                <span className="text-[10px] text-orange-800 font-sans font-bold uppercase">
                  October 09, 2015 | Civil Society
                </span>
                <h2 className="text-base font-bold text-gray-900 mt-0.5">
                  Writers Return Sahitya Akademi Awards Following Dadri Lynching
                </h2>
                <p className="text-gray-700 mt-1">
                  Nayantara Sahgal, Ashok Vajpeyi, and dozens of writers return awards protesting against perceived rising intolerance following the Dadri incident and killings of rationalists Narendra Dabholkar, Govind Pansare, and M.M. Kalburgi.
                </p>
              </article>

              <article className="pb-2">
                <span className="text-[10px] text-green-800 font-sans font-bold uppercase">
                  May 17, 2014 | General Election
                </span>
                <h2 className="text-base font-bold text-gray-900 mt-0.5">
                  BJP Crosses 272-Mark Single-Handedly; Modi Swearing-in on May 26
                </h2>
                <p className="text-gray-700 mt-1">
                  The 2014 parliamentary verdict delivers an unprecedented 282 seats to the BJP, ending thirty years of fractured coalition governments in New Delhi.
                </p>
              </article>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* PAGE 6: SACHIVALAYA INTRANET (sachivalaya.internal/bulletin) */}
        {/* ========================================================= */}
        {url.includes('sachivalaya.internal') && (
          <div className="max-w-2xl mx-auto border-2 border-gray-600 bg-[#ece9d8] p-3">
            <div className="bg-[#000080] text-yellow-300 p-2 text-center font-mono font-bold mb-3 border border-gray-500">
              === GANDHINAGAR SACHIVALAYA INTERNAL NOTICE BOARD ===
              <div className="text-[10px] text-white font-normal mt-0.5">
                Block 3 Admin Subnet | Restricted to Secretariat Employees
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="bg-white p-2 border border-gray-400 text-xs">
                <div className="flex justify-between text-blue-900 font-bold border-b pb-0.5">
                  <span>CIRCULAR: Office Relocation to Swarnim Sankul</span>
                  <span className="text-gray-500 text-[10px]">10 Nov 2016</span>
                </div>
                <p className="mt-1 text-[11px] text-gray-800">
                  All administrative desks in Old Sachivalaya must pack physical records before Monday. IT Cell will decommission legacy Pentium II terminals. Wiped hardware to be stored in basement crate #77.
                </p>
              </div>

              <div className="bg-white p-2 border border-gray-400 text-xs">
                <div className="flex justify-between text-blue-900 font-bold border-b pb-0.5">
                  <span>Canteen Advisory: Currency Policy</span>
                  <span className="text-gray-500 text-[10px]">09 Nov 2016</span>
                </div>
                <p className="mt-1 text-[11px] text-gray-800">
                  Following yesterday's central announcement, the secretariat canteen will strictly accept ₹10, ₹20, and ₹100 notes or monthly meal tokens. No ₹500 notes accepted under any circumstances.
                </p>
              </div>

              {/* Dynamic Posts */}
              {bulletinNotes.map((note, idx) => (
                <div key={idx} className="bg-white p-2 border border-gray-400 text-xs">
                  <div className="flex justify-between text-gray-800 font-semibold border-b pb-0.5">
                    <span>{note.name} ({note.dept})</span>
                    <span className="text-gray-500 text-[10px]">{note.date}</span>
                  </div>
                  <p className="mt-1 text-[11px] text-gray-700">{note.text}</p>
                </div>
              ))}
            </div>

            {/* Post Internal Message Form */}
            <div className="border border-gray-400 bg-gray-100 p-2">
              <h3 className="font-bold text-xs text-gray-800 mb-1">
                Post Internal Notice (Archival Record)
              </h3>
              <form onSubmit={handleAddFeedback} className="space-y-1.5 text-xs">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Officer Name / Desk"
                    className="win-inset px-1.5 py-0.5 text-xs flex-1 bg-white outline-none"
                    value={feedbackName}
                    onChange={(e) => setFeedbackName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Department (e.g. Archives)"
                    className="win-inset px-1.5 py-0.5 text-xs flex-1 bg-white outline-none"
                    value={feedbackDept}
                    onChange={(e) => setFeedbackDept(e.target.value)}
                  />
                </div>
                <textarea
                  placeholder="Enter notice text..."
                  className="win-inset px-1.5 py-0.5 text-xs h-10 w-full bg-white outline-none resize-none"
                  value={feedbackNote}
                  onChange={(e) => setFeedbackNote(e.target.value)}
                />
                <button type="submit" className="win-btn font-bold">
                  Post Notice
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* PAGE 7: GOOGLE INDIA BETA (SEARCH ENGINE) */}
        {/* ========================================================= */}
        {url.includes('google.co.in') && (
          <div className="max-w-xl mx-auto text-center pt-4">
            <div className="text-4xl font-bold font-serif mb-3 tracking-tighter">
              <span className="text-blue-600">G</span>
              <span className="text-red-600">o</span>
              <span className="text-yellow-500">o</span>
              <span className="text-blue-600">g</span>
              <span className="text-green-600">l</span>
              <span className="text-red-600">e</span>
              <span className="text-xs text-gray-500 font-sans italic ml-1">India (Beta)</span>
            </div>

            <div className="win-inset bg-gray-100 p-4 border border-gray-400 mb-4 inline-block w-full">
              <div className="text-xs mb-2 font-sans text-gray-700">
                Search the historical political archive (2001–2016)
              </div>
              <div className="flex justify-center mb-2">
                <input
                  type="text"
                  className="win-inset px-2 py-1 text-xs w-72 bg-white outline-none font-mono text-black"
                  value={searchQuery}
                  placeholder="e.g. godhra, vibrant gujarat, election 2014, demonetisation"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      sound.playClick();
                      setHasSearched(true);
                    }
                  }}
                />
              </div>
              <div className="flex justify-center gap-2">
                <button
                  className="win-btn font-bold"
                  onClick={() => {
                    sound.playClick();
                    setHasSearched(true);
                  }}
                >
                  Google Search
                </button>
                <button
                  className="win-btn"
                  onClick={() => {
                    sound.playClick();
                    setSearchQuery('demonetisation 2016');
                    setHasSearched(true);
                  }}
                >
                  I'm Feeling Lucky
                </button>
              </div>
            </div>

            {/* Historical Search Results */}
            {hasSearched && (
              <div className="text-left text-xs space-y-3 mt-4 border-t border-gray-300 pt-3">
                <div className="text-gray-500 text-[11px]">
                  Showing historical archive matches for: <b>{searchQuery || 'All records'}</b>
                </div>

                {filteredSearchResults.length === 0 ? (
                  <div className="text-gray-500 italic p-2">
                    No results found in the 2001-2016 archive for this query.
                  </div>
                ) : (
                  filteredSearchResults.map((res, i) => (
                    <div key={i} className="p-1">
                      <a
                        className="text-blue-800 font-bold underline cursor-pointer text-sm"
                        onClick={() => navigateTo(res.url)}
                      >
                        {res.title}
                      </a>
                      <div className="text-gray-700 text-xs mt-0.5">
                        {res.snippet}
                      </div>
                      <div className="text-green-800 text-[10px] mt-0.5">
                        {res.url} • <span className="text-gray-500">{res.tag} ({res.date})</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Browser Status Bar */}
      <div className="h-[20px] bg-[#c0c0c0] border-t border-[#808080] flex items-center px-2 text-[10px] text-black justify-between">
        <div className="flex items-center gap-1.5">
          <span>{isLoading ? '⌛ Opening page...' : '✔ Done'}</span>
        </div>
        <div className="win-inset px-2 py-0.5">
          Archived Intranet / Internet Zone
        </div>
      </div>
    </div>
  );
};
