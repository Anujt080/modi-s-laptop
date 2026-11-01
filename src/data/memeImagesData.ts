import type { FileNode } from '../types';

// Helper to encode SVG into clean Data URI
const svgToDataUri = (svg: string) => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

export const MEME_NODES: Record<string, FileNode> = {
  'meme-demonetisation-queue': {
    id: 'meme-demonetisation-queue',
    name: 'demonetisation_atm_queue_masterstroke.jpg',
    isDirectory: false,
    parentId: 'dir-memes-political',
    path: 'C:\\MY PICTURES\\POLITICAL MEMES\\demonetisation_atm_queue_masterstroke.jpg',
    fileType: 'image',
    icon: 'file-image',
    size: 245000,
    modified: '2016-11-10 09:15',
    metadata: {
      documentTitle: 'The 50 Days Miracle: ATM Queue Simulator (Nov 2016)',
      historicalDate: '10 November 2016',
      sourceOrPublication: 'Social Media Political Satire Archive',
      category: 'public_criticism',
      summary: 'Viral political cartoon satirizing the sudden 8 PM demonetisation announcement and the nationwide bank queues under the slogan "Mitron, give me 50 days!"',
    },
    content: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" width="600" height="420" viewBox="0 0 600 420" style="background:#1a1a2e; font-family:'Segoe UI',sans-serif;">
        <rect x="10" y="10" width="580" height="400" fill="#0f3460" stroke="#e94560" stroke-width="3" rx="8"/>
        <!-- Header -->
        <rect x="15" y="15" width="570" height="48" fill="#e94560"/>
        <text x="300" y="44" fill="#ffffff" font-size="20" font-weight="bold" text-anchor="middle" letter-spacing="1">
          BREAKING 8:00 PM: THE MASTERSTROKE
        </text>

        <!-- TV Broadcast Frame -->
        <rect x="35" y="80" width="220" height="150" fill="#000000" stroke="#ffd369" stroke-width="2" rx="4"/>
        <rect x="40" y="85" width="210" height="115" fill="#16213e"/>
        <circle cx="145" cy="135" r="32" fill="#ffd369"/>
        <path d="M125 155 Q145 170 165 155" stroke="#333" stroke-width="3" fill="none"/>
        <circle cx="136" cy="130" r="4" fill="#333"/>
        <circle cx="154" cy="130" r="4" fill="#333"/>
        <rect x="130" y="145" width="30" height="12" rx="3" fill="#ffffff"/>
        <text x="145" y="190" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">"MITRON! JUST 50 DAYS!"</text>
        <rect x="40" y="202" width="210" height="23" fill="#e94560"/>
        <text x="145" y="218" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">TILL 30 DEC 2016 ONLY</text>

        <!-- ATM Queue Illustration -->
        <rect x="280" y="80" width="280" height="150" fill="#16213e" stroke="#533483" stroke-width="2" rx="4"/>
        <text x="420" y="105" fill="#ffd369" font-size="14" font-weight="bold" text-anchor="middle">STATE BANK ATM — OUT OF CASH</text>
        
        <!-- Queue silhouettes -->
        <g fill="#e94560">
          <circle cx="310" cy="140" r="10"/>
          <rect x="305" y="152" width="10" height="30" rx="3"/>
          <circle cx="340" cy="142" r="10"/>
          <rect x="335" y="154" width="10" height="28" rx="3"/>
          <circle cx="370" cy="140" r="10"/>
          <rect x="365" y="152" width="10" height="30" rx="3"/>
          <circle cx="400" cy="143" r="10"/>
          <rect x="395" y="155" width="10" height="27" rx="3"/>
          <circle cx="430" cy="140" r="10"/>
          <rect x="425" y="152" width="10" height="30" rx="3"/>
          <circle cx="460" cy="141" r="10"/>
          <rect x="455" y="153" width="10" height="29" rx="3"/>
          <circle cx="490" cy="140" r="10"/>
          <rect x="485" y="152" width="10" height="30" rx="3"/>
          <circle cx="520" cy="144" r="10"/>
          <rect x="515" y="156" width="10" height="26" rx="3"/>
        </g>
        <!-- Ground line -->
        <line x1="290" y1="184" x2="550" y2="184" stroke="#ffd369" stroke-width="2"/>
        <text x="420" y="210" fill="#ffffff" font-size="11" text-anchor="middle">Queue Length: 4.2 Kilometers</text>
        <text x="420" y="224" fill="#a8a8a8" font-size="9" text-anchor="middle">Expected Wait Time: 7 Hours 45 Mins</text>

        <!-- Bottom Satirical Stats Cards -->
        <g transform="translate(35, 245)">
          <rect x="0" y="0" width="165" height="145" fill="#16213e" stroke="#ffd369" rx="4"/>
          <text x="82" y="25" fill="#ffd369" font-size="12" font-weight="bold" text-anchor="middle">BLACK MONEY CAUGHT</text>
          <text x="82" y="70" fill="#ffffff" font-size="32" font-weight="900" text-anchor="middle">0.7%</text>
          <text x="82" y="100" fill="#e94560" font-size="11" text-anchor="middle">99.3% Deposited Back</text>
          <text x="82" y="125" fill="#a8a8a8" font-size="9" text-anchor="middle">(RBI Annual Report 2018)</text>
        </g>

        <g transform="translate(215, 245)">
          <rect x="0" y="0" width="165" height="145" fill="#16213e" stroke="#ffd369" rx="4"/>
          <text x="82" y="25" fill="#ffd369" font-size="12" font-weight="bold" text-anchor="middle">RULES CHANGED</text>
          <text x="82" y="70" fill="#ffffff" font-size="32" font-weight="900" text-anchor="middle">62</text>
          <text x="82" y="100" fill="#ffd369" font-size="11" text-anchor="middle">In 50 Days Window</text>
          <text x="82" y="125" fill="#a8a8a8" font-size="9" text-anchor="middle">(1.24 circulars per day)</text>
        </g>

        <g transform="translate(395, 245)">
          <rect x="0" y="0" width="165" height="145" fill="#16213e" stroke="#e94560" rx="4"/>
          <text x="82" y="25" fill="#e94560" font-size="12" font-weight="bold" text-anchor="middle">NEW ₹2000 FEATURE</text>
          <text x="82" y="65" fill="#ffffff" font-size="18" font-weight="900" text-anchor="middle">NANO-GPS CHIP*</text>
          <text x="82" y="95" fill="#ffd369" font-size="10" text-anchor="middle">*Direct ISRO Satellite Sync</text>
          <text x="82" y="125" fill="#a8a8a8" font-size="9" text-anchor="middle">(Claims made by TV Anchors)</text>
        </g>
      </svg>
    `),
  },

  'meme-nano-gps-chip': {
    id: 'meme-nano-gps-chip',
    name: 'gps_chip_2000_note_breaking_news.png',
    isDirectory: false,
    parentId: 'dir-memes-political',
    path: 'C:\\MY PICTURES\\POLITICAL MEMES\\gps_chip_2000_note_breaking_news.png',
    fileType: 'image',
    icon: 'file-image',
    size: 285000,
    modified: '2016-11-12 14:40',
    metadata: {
      documentTitle: 'TV News Nano-GPS Chip in ₹2000 Note Parody',
      historicalDate: '12 November 2016',
      sourceOrPublication: 'Satirical Media Monitor Bulletin',
      category: 'public_criticism',
      summary: 'Mock television breaking news graphic capturing the sensational claim made on prime-time television that the new magenta ₹2000 currency notes contained nano-GPS tracking chips operating without batteries.',
    },
    content: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" width="600" height="420" viewBox="0 0 600 420" style="background:#000000; font-family:'Segoe UI',Impact,sans-serif;">
        <!-- TV Screen Border -->
        <rect x="5" y="5" width="590" height="410" fill="#0d1117" stroke="#30363d" stroke-width="4"/>
        
        <!-- Live Badge -->
        <rect x="25" y="25" width="80" height="30" fill="#ff0000"/>
        <text x="65" y="46" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">🔴 LIVE</text>
        <text x="120" y="46" fill="#ffff00" font-size="16" font-weight="bold">NEWS 24x7 SPECIAL REPORT</text>

        <!-- ₹2000 Note Representation -->
        <g transform="translate(60, 75)">
          <rect x="0" y="0" width="480" height="170" rx="8" fill="#e91e63" stroke="#f8bbd0" stroke-width="3"/>
          <!-- Watermark Gandhi -->
          <circle cx="80" cy="85" r="45" fill="#f48fb1" opacity="0.6"/>
          <text x="80" y="93" fill="#880e4f" font-size="22" font-weight="bold" text-anchor="middle">₹2000</text>
          
          <!-- Note Center details -->
          <text x="260" y="50" fill="#ffffff" font-size="22" font-weight="bold" text-anchor="middle">RESERVE BANK OF INDIA</text>
          <text x="260" y="80" fill="#ffd54f" font-size="34" font-weight="900" text-anchor="middle">₹ 2 0 0 0</text>
          <text x="260" y="115" fill="#ffffff" font-size="14" text-anchor="middle">GUARANTEED BY THE CENTRAL GOVERNMENT</text>
          <rect x="390" y="25" width="70" height="120" fill="#ad1457" stroke="#ffffff" rx="4"/>
          <text x="425" y="90" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">MANGALYAAN</text>

          <!-- Sci-Fi Target Reticle on Chip -->
          <circle cx="340" cy="130" r="24" stroke="#00ffff" stroke-width="3" fill="none" stroke-dasharray="4,4"/>
          <circle cx="340" cy="130" r="10" fill="#00ffff" opacity="0.8"/>
          <line x1="310" y1="130" x2="370" y2="130" stroke="#00ffff" stroke-width="2"/>
          <line x1="340" y1="100" x2="340" y2="160" stroke="#00ffff" stroke-width="2"/>
          <text x="340" y="90" fill="#00ffff" font-size="10" font-weight="bold" text-anchor="middle">NGC-704 CHIP</text>
        </g>

        <!-- Radar Wave Lines to Satellite -->
        <path d="M400 205 L470 120" stroke="#00ffff" stroke-width="2" stroke-dasharray="6,4"/>
        <text x="500" y="110" fill="#00ffff" font-size="10">🛰️ SATELLITE 120m DEEP</text>

        <!-- Lower Third Headline Banners -->
        <rect x="20" y="270" width="560" height="45" fill="#ffcc00"/>
        <text x="300" y="300" fill="#000000" font-size="22" font-weight="900" text-anchor="middle">
          BIGGEST DISCOVERY: NANO GPS CHIP IN ₹2000 NOTE!
        </text>

        <rect x="20" y="318" width="560" height="40" fill="#b71c1c"/>
        <text x="300" y="343" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">
          CAN TRANSMIT LOCATION THROUGH 120 METERS OF CONCRETE WITHOUT BATTERY
        </text>

        <!-- Ticker -->
        <rect x="20" y="362" width="560" height="28" fill="#1b5e20"/>
        <text x="300" y="381" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">
          TICKER: RBI Governor Clarifies No Chip Inside • TV Anchors Insist Chip Exists in Fourth Dimension
        </text>
      </svg>
    `),
  },

  'meme-masterstroke-flowchart': {
    id: 'meme-masterstroke-flowchart',
    name: 'masterstroke_formula_flowchart.webp',
    isDirectory: false,
    parentId: 'dir-memes-political',
    path: 'C:\\MY PICTURES\\POLITICAL MEMES\\masterstroke_formula_flowchart.webp',
    fileType: 'image',
    icon: 'file-image',
    size: 210000,
    modified: '2016-10-20 16:00',
    metadata: {
      documentTitle: 'The Universal Masterstroke Flowchart',
      historicalDate: 'October 2016',
      sourceOrPublication: 'Satirical Media & Discourse Lab',
      category: 'public_criticism',
      summary: 'Humorous infographic dissecting the media and online discourse cycle where every policy announcement is branded an infallible geopolitical masterstroke.',
    },
    content: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" width="600" height="420" viewBox="0 0 600 420" style="background:#0f172a; font-family:'Segoe UI',sans-serif;">
        <!-- Title -->
        <rect x="15" y="15" width="570" height="42" fill="#3b82f6" rx="6"/>
        <text x="300" y="42" fill="#ffffff" font-size="18" font-weight="bold" text-anchor="middle">
          THE UNIVERSAL 4-STEP "MASTERSTROKE" FLOWCHART
        </text>

        <!-- Step 1 -->
        <g transform="translate(40, 80)">
          <rect x="0" y="0" width="220" height="60" fill="#1e293b" stroke="#38bdf8" stroke-width="2" rx="6"/>
          <text x="110" y="26" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">STEP 1: THE ANNOUNCEMENT</text>
          <text x="110" y="48" fill="#ffffff" font-size="11" text-anchor="middle">Any policy declared at 8:00 PM</text>
        </g>

        <!-- Arrow 1 -->
        <path d="M260 110 L340 110" stroke="#f59e0b" stroke-width="3" marker-end="url(#arrow)"/>
        <text x="300" y="102" fill="#f59e0b" font-size="11" text-anchor="middle">Immediate</text>

        <!-- Step 2 -->
        <g transform="translate(340, 80)">
          <rect x="0" y="0" width="220" height="60" fill="#1e293b" stroke="#10b981" stroke-width="2" rx="6"/>
          <text x="110" y="26" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">STEP 2: THE REACTION</text>
          <text x="110" y="48" fill="#ffffff" font-size="11" text-anchor="middle">Prime time calls it "HISTORIC"</text>
        </g>

        <!-- Arrow 2 down -->
        <path d="M450 140 L450 190" stroke="#f59e0b" stroke-width="3"/>

        <!-- Step 3 Decision Diamond -->
        <g transform="translate(330, 190)">
          <polygon points="120,0 240,40 120,80 0,40" fill="#312e81" stroke="#a855f7" stroke-width="2"/>
          <text x="120" y="38" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">Does policy succeed</text>
          <text x="120" y="52" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">as originally promised?</text>
        </g>

        <!-- Branch YES -->
        <path d="M330 230 L220 230" stroke="#10b981" stroke-width="3"/>
        <text x="270" y="222" fill="#10b981" font-size="12" font-weight="bold">YES</text>
        <g transform="translate(30, 205)">
          <rect x="0" y="0" width="190" height="50" fill="#064e3b" stroke="#10b981" stroke-width="2" rx="6"/>
          <text x="95" y="24" fill="#6ee7b7" font-size="11" font-weight="bold" text-anchor="middle">56-INCH CHEST PROVEN</text>
          <text x="95" y="40" fill="#ffffff" font-size="10" text-anchor="middle">100 Full Page Ads Printed</text>
        </g>

        <!-- Branch NO -->
        <path d="M450 270 L450 310" stroke="#ef4444" stroke-width="3"/>
        <text x="460" y="295" fill="#ef4444" font-size="12" font-weight="bold">NO</text>
        
        <g transform="translate(260, 310)">
          <rect x="0" y="0" width="300" height="85" fill="#450a0a" stroke="#ef4444" stroke-width="2" rx="6"/>
          <text x="150" y="24" fill="#fca5a5" font-size="12" font-weight="bold" text-anchor="middle">STEP 4: STRATEGIC SHIFT</text>
          <text x="150" y="44" fill="#ffffff" font-size="11" text-anchor="middle">1. "Goal was never that, goal was digital all along!"</text>
          <text x="150" y="60" fill="#ffffff" font-size="11" text-anchor="middle">2. "Nehru did not build enough ATMs in 1952."</text>
          <text x="150" y="76" fill="#ffd369" font-size="10" text-anchor="middle">3. Repeat Step 1 with a new scheme name!</text>
        </g>
      </svg>
    `),
  },

  'meme-vibrant-gujarat-mous': {
    id: 'meme-vibrant-gujarat-mous',
    name: 'vibrant_gujarat_mou_trillion_dollars.jpeg',
    isDirectory: false,
    parentId: 'dir-memes-political',
    path: 'C:\\MY PICTURES\\POLITICAL MEMES\\vibrant_gujarat_mou_trillion_dollars.jpeg',
    fileType: 'image',
    icon: 'file-image',
    size: 230000,
    modified: '2015-01-14 18:00',
    metadata: {
      documentTitle: 'Vibrant Gujarat Summit: The ₹25 Lakh Crore MoU Machine',
      historicalDate: 'January 2015',
      sourceOrPublication: 'Gandhinagar Satirical Chronicle',
      category: 'public_criticism',
      summary: 'Parody diagram highlighting the recurring economic debate over the gap between proposed investment MoUs signed on stage versus actual ground projects completed.',
    },
    content: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" width="600" height="420" viewBox="0 0 600 420" style="background:#1e1e24; font-family:'Segoe UI',sans-serif;">
        <rect x="15" y="15" width="570" height="390" fill="#2b2d42" stroke="#d90429" stroke-width="3" rx="8"/>
        
        <text x="300" y="45" fill="#edf2f4" font-size="20" font-weight="bold" text-anchor="middle">
          VIBRANT GUJARAT SUMMIT: THE MOU ARITHMETIC
        </text>
        <text x="300" y="68" fill="#ef233c" font-size="12" font-weight="bold" text-anchor="middle">
          MAHATMA MANDIR, GANDHINAGAR — BIENNIAL SPECTACLE
        </text>

        <!-- Big comparison meters -->
        <g transform="translate(45, 95)">
          <rect x="0" y="0" width="240" height="180" fill="#1e1e24" stroke="#8d99ae" stroke-width="2" rx="6"/>
          <text x="120" y="30" fill="#edf2f4" font-size="13" font-weight="bold" text-anchor="middle">STAGE CELEBRATIONS</text>
          <text x="120" y="75" fill="#ef233c" font-size="34" font-weight="900" text-anchor="middle">₹ 25 LAKH</text>
          <text x="120" y="105" fill="#ef233c" font-size="26" font-weight="900" text-anchor="middle">CRORE</text>
          <text x="120" y="135" fill="#8d99ae" font-size="11" text-anchor="middle">MoUs Signed on Camera</text>
          <text x="120" y="155" fill="#2ec4b6" font-size="10" text-anchor="middle">✨ Guaranteed Round of Applause</text>
        </g>

        <g transform="translate(315, 95)">
          <rect x="0" y="0" width="240" height="180" fill="#1e1e24" stroke="#8d99ae" stroke-width="2" rx="6"/>
          <text x="120" y="30" fill="#edf2f4" font-size="13" font-weight="bold" text-anchor="middle">ACTUAL FACTORIES ON GROUND</text>
          <text x="120" y="75" fill="#ffd166" font-size="34" font-weight="900" text-anchor="middle">~ 8.4%</text>
          <text x="120" y="105" fill="#ffd166" font-size="16" font-weight="bold" text-anchor="middle">COMMISSIONED</text>
          <text x="120" y="135" fill="#8d99ae" font-size="11" text-anchor="middle">Projects Operational Post-Summit</text>
          <text x="120" y="155" fill="#e71d36" font-size="10" text-anchor="middle">⚠️ Remaining MoUs in Quantum State</text>
        </g>

        <!-- Quote banner -->
        <rect x="45" y="300" width="510" height="80" fill="#1e1e24" stroke="#ffd166" stroke-width="2" rx="6"/>
        <text x="300" y="328" fill="#ffd166" font-size="13" font-style="italic" text-anchor="middle">
          "If all Vibrant Gujarat MoUs were built, Gujarat would have 14 layers of factories
        </text>
        <text x="300" y="348" fill="#ffd166" font-size="13" font-style="italic" text-anchor="middle">
          stacked on top of each other all the way into low Earth orbit."
        </text>
        <text x="300" y="370" fill="#8d99ae" font-size="10" text-anchor="middle">
          — Anonymous Senior Officer, Industries Commissionerate, Sachivalaya Gandhinagar
        </text>
      </svg>
    `),
  },

  'meme-clouds-radar-stealth': {
    id: 'meme-clouds-radar-stealth',
    name: 'clouds_and_radar_stealth_theory.gif',
    isDirectory: false,
    parentId: 'dir-memes-political',
    path: 'C:\\MY PICTURES\\POLITICAL MEMES\\clouds_and_radar_stealth_theory.gif',
    fileType: 'image',
    icon: 'file-image',
    size: 260000,
    modified: '2016-09-30 19:20',
    metadata: {
      documentTitle: 'Cloud Cover Radar Absorption Theorem',
      historicalDate: 'September 2016',
      sourceOrPublication: 'Aeronautical Satire Society',
      category: 'public_criticism',
      summary: 'Humorous technical blueprint spoofing the famous interview remark that heavy cloud cover and rain could prevent military radar from detecting strike aircraft.',
    },
    content: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" width="600" height="420" viewBox="0 0 600 420" style="background:#03071e; font-family:'Segoe UI',monospace;">
        <rect x="15" y="15" width="570" height="390" fill="#0b090a" stroke="#0077b6" stroke-width="3" rx="6"/>
        
        <text x="300" y="45" fill="#48cae4" font-size="17" font-weight="bold" text-anchor="middle">
          DRDO DEPT OF CLOUD-BASED RADAR DEFLECTION (SECRET)
        </text>
        
        <!-- Cloud Graphic -->
        <g transform="translate(180, 80)">
          <path d="M40 70 A30 30 0 0 1 90 40 A45 45 0 0 1 170 30 A40 40 0 0 1 220 70 A30 30 0 0 1 200 110 L50 110 A30 30 0 0 1 40 70 Z" fill="#4a5568" stroke="#cbd5e1" stroke-width="3"/>
          <text x="130" y="80" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">CUMULONIMBUS SHIELD</text>
          
          <!-- Raindrops -->
          <line x1="60" y1="120" x2="50" y2="140" stroke="#38bdf8" stroke-width="2"/>
          <line x1="90" y1="120" x2="80" y2="140" stroke="#38bdf8" stroke-width="2"/>
          <line x1="120" y1="120" x2="110" y2="140" stroke="#38bdf8" stroke-width="2"/>
          <line x1="150" y1="120" x2="140" y2="140" stroke="#38bdf8" stroke-width="2"/>
          <line x1="180" y1="120" x2="170" y2="140" stroke="#38bdf8" stroke-width="2"/>
        </g>

        <!-- Aircraft behind cloud -->
        <g transform="translate(260, 115)">
          <polygon points="40,0 20,40 40,35 60,40" fill="#e63946" stroke="#ffffff" stroke-width="2"/>
          <text x="40" y="55" fill="#e63946" font-size="10" font-weight="bold" text-anchor="middle">FIGHTER JET</text>
        </g>

        <!-- Radar Station -->
        <g transform="translate(50, 240)">
          <rect x="10" y="60" width="60" height="40" fill="#161a1d" stroke="#0077b6" stroke-width="2"/>
          <path d="M20 60 Q40 20 60 60" fill="none" stroke="#00b4d8" stroke-width="4"/>
          <line x1="40" y1="35" x2="40" y2="15" stroke="#ff0000" stroke-width="3"/>
          <circle cx="40" cy="15" r="4" fill="#ff0000"/>
          <text x="40" y="115" fill="#90e0ef" font-size="10" text-anchor="middle">ENEMY RADAR</text>
        </g>

        <!-- Radar Waves Bouncing Off Cloud -->
        <path d="M100 250 Q200 200 240 180" stroke="#ff0054" stroke-width="2" stroke-dasharray="6,4" fill="none"/>
        <path d="M240 180 Q210 230 180 280" stroke="#ff0054" stroke-width="2" stroke-dasharray="6,4" fill="none"/>
        <text x="180" y="210" fill="#ff0054" font-size="11" font-weight="bold">RADAR SIGNAL BOUNCES OFF WATER VAPOR</text>

        <!-- Footer Caption -->
        <rect x="35" y="330" width="530" height="55" fill="#001219" stroke="#94d2bd" stroke-width="1" rx="4"/>
        <text x="300" y="352" fill="#94d2bd" font-size="12" font-style="italic" text-anchor="middle">
          "The weather was bad, there was heavy rain, there were clouds...
        </text>
        <text x="300" y="370" fill="#94d2bd" font-size="12" font-style="italic" text-anchor="middle">
          A thought struck my mind: can we benefit from the clouds? Radar se bach sakte hain!"
        </text>
      </svg>
    `),
  },

  'meme-acche-din-setup': {
    id: 'meme-acche-din-setup',
    name: 'acche_din_loading_screen_99_percent.jpg',
    isDirectory: false,
    parentId: 'dir-memes-political',
    path: 'C:\\MY PICTURES\\POLITICAL MEMES\\acche_din_loading_screen_99_percent.jpg',
    fileType: 'image',
    icon: 'file-image',
    size: 220000,
    modified: '2014-06-01 12:00',
    metadata: {
      documentTitle: 'Windows 98 Setup: Acche Din Installation Wizard',
      historicalDate: 'June 2014',
      sourceOrPublication: 'Retro Computing Political Parody',
      category: 'public_criticism',
      summary: 'Windows 98 setup dialog parody showing the installation progress of "Acche Din" (Good Days) stuck at 99% with an estimated completion time of several decades.',
    },
    content: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" width="600" height="420" viewBox="0 0 600 420" style="background:#008080; font-family:'Segoe UI',Tahoma,sans-serif;">
        <!-- Windows 98 Setup Window Box -->
        <g transform="translate(60, 40)">
          <!-- Window Base -->
          <rect x="0" y="0" width="480" height="340" fill="#c0c0c0" stroke="#ffffff" stroke-width="2"/>
          <line x1="480" y1="0" x2="480" y2="340" stroke="#000000" stroke-width="2"/>
          <line x1="0" y1="340" x2="480" y2="340" stroke="#000000" stroke-width="2"/>

          <!-- Titlebar -->
          <rect x="3" y="3" width="474" height="22" fill="#000080"/>
          <text x="12" y="18" fill="#ffffff" font-size="12" font-weight="bold">Microsoft Windows 98 Setup - Acche Din Edition</text>
          
          <!-- Inner content -->
          <text x="25" y="55" fill="#000080" font-size="18" font-weight="bold">Installing Acche Din (Good Days)...</text>
          <text x="25" y="78" fill="#000000" font-size="11">Setup is currently copying promises to your national hard drive.</text>

          <!-- Status Box -->
          <rect x="25" y="95" width="430" height="150" fill="#ffffff" stroke="#808080" stroke-width="2"/>
          <text x="40" y="125" fill="#000000" font-size="12" font-weight="bold">Component Progress:</text>
          
          <text x="40" y="150" fill="#008000" font-size="11">✔ 15 Lakh Rupees in Every Bank Account ............ [PENDING FOREVER]</text>
          <text x="40" y="170" fill="#008000" font-size="11">✔ 2 Crore Jobs Per Year ......................................... [BUFFERING...]</text>
          <text x="40" y="190" fill="#008000" font-size="11">✔ Dollar to Rupee Equal to 1 ................................. [REVERSE GEAR]</text>
          <text x="40" y="210" fill="#008000" font-size="11">✔ Bullet Train Ahmedabad to Mumbai ................... [LAND DISPUTE]</text>
          <text x="40" y="230" fill="#000080" font-size="11" font-weight="bold">✔ Status: 99% Complete (Remaining: 2024 to 2047)</text>

          <!-- Windows 98 Progress Bar -->
          <rect x="25" y="260" width="430" height="24" fill="#ffffff" stroke="#808080" stroke-width="2"/>
          <!-- Progress blocks -->
          <g fill="#000080">
            <rect x="28" y="263" width="10" height="18"/>
            <rect x="40" y="263" width="10" height="18"/>
            <rect x="52" y="263" width="10" height="18"/>
            <rect x="64" y="263" width="10" height="18"/>
            <rect x="76" y="263" width="10" height="18"/>
            <rect x="88" y="263" width="10" height="18"/>
            <rect x="100" y="263" width="10" height="18"/>
            <rect x="112" y="263" width="10" height="18"/>
            <rect x="124" y="263" width="10" height="18"/>
            <rect x="136" y="263" width="10" height="18"/>
            <rect x="148" y="263" width="10" height="18"/>
            <rect x="160" y="263" width="10" height="18"/>
            <rect x="172" y="263" width="10" height="18"/>
            <rect x="184" y="263" width="10" height="18"/>
            <rect x="196" y="263" width="10" height="18"/>
            <rect x="208" y="263" width="10" height="18"/>
            <rect x="220" y="263" width="10" height="18"/>
            <rect x="232" y="263" width="10" height="18"/>
            <rect x="244" y="263" width="10" height="18"/>
            <rect x="256" y="263" width="10" height="18"/>
            <rect x="268" y="263" width="10" height="18"/>
            <rect x="280" y="263" width="10" height="18"/>
            <rect x="292" y="263" width="10" height="18"/>
            <rect x="304" y="263" width="10" height="18"/>
            <rect x="316" y="263" width="10" height="18"/>
            <rect x="328" y="263" width="10" height="18"/>
            <rect x="340" y="263" width="10" height="18"/>
            <rect x="352" y="263" width="10" height="18"/>
            <rect x="364" y="263" width="10" height="18"/>
            <rect x="376" y="263" width="10" height="18"/>
            <rect x="388" y="263" width="10" height="18"/>
            <rect x="400" y="263" width="10" height="18"/>
            <rect x="412" y="263" width="10" height="18"/>
          </g>

          <!-- Buttons -->
          <rect x="375" y="298" width="80" height="26" fill="#c0c0c0" stroke="#ffffff" stroke-width="1"/>
          <text x="415" y="316" fill="#000000" font-size="11" font-weight="bold" text-anchor="middle">Cancel</text>
        </g>
      </svg>
    `),
  },
};

