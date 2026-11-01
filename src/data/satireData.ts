export interface SatiricalError {
  id: string;
  title: string;
  message: string;
  type: 'error' | 'warning' | 'info';
}

export const SATIRICAL_ERRORS: Omit<SatiricalError, 'id'>[] = [
  {
    title: 'Accountability Subsystem',
    message: 'Error 404: Accountability Not Found. The requested institution is currently undergoing bureaucratic restructuring. Please check back after the next election cycle.',
    type: 'error',
  },
  {
    title: 'Archive File Protection',
    message: 'Are you sure you want to delete this controversy? Warning: Public memory may persist in third-party archives and newspaper clippings.',
    type: 'warning',
  },
  {
    title: 'Consensus Manager',
    message: 'Too many conflicting opinions detected. Windows has decided to suspend public debate until further notice.',
    type: 'error',
  },
  {
    title: 'System Storage Advisory',
    message: 'Your system has detected an unusually high number of political promises. Available disk space may be exhausted by manifesto bullet points.',
    type: 'warning',
  },
  {
    title: 'Bureaucracy Service Pack 1',
    message: 'File clearance stalled at Step 47 of 112: The Under Secretary has requested an additional stamp in violet ink before file transit.',
    type: 'info',
  },
];

export const DEMOCRACY_SIMULATION_OUTPUT = [
  '========================================================================',
  '                 PARLIAMENTARY DEMOCRACY SIMULATOR v1.0                 ',
  '                  [Lok Sabha / Rajya Sabha Engine 98]                   ',
  '========================================================================',
  '',
  '[09:00:00] Speaker takes the chair. "Question Hour begins."',
  '[09:01:15] Question #12: Inquiry into status of rural electrification & MoUs.',
  '[09:02:40] Minister rises to present 84-page statistical appendix.',
  '[09:04:10] Opposition members raise slogans: "Roll back the amendments!"',
  '[09:06:00] Pandemonium in the well of the House. Papers tossed into the air.',
  '[09:08:22] Speaker: "Hon\'ble members, please return to your seats!"',
  '[09:09:45] House adjourned until 12:00 noon.',
  '',
  '[12:00:00] Zero Hour reconvenes.',
  '[12:01:30] Government introduces: "The National Infrastructure Acceleration Bill".',
  '[12:04:00] Opposition stages walkout citing insufficient clause-by-clause review.',
  '[12:05:15] Electronic voting console activated...',
  '           AYES:    312  [████████████████████████████████]',
  '           NOES:    042  [████]',
  '           ABSTAIN: 008  [█]',
  '[12:06:30] "The \'Ayes\' have it! The Bill is passed."',
  '[12:07:00] National anthem plays. Members rush to the canteen for tea.',
  '========================================================================',
];

export const ACCOUNTABILITY_SEARCH_OUTPUT = [
  'Searching local system registry for "accountability.dll"...',
  '[...] Scanning C:\\WINDOWS\\SYSTEM...',
  '[...] Scanning C:\\MY DOCUMENTS\\GOVERNMENT_POLICIES...',
  '[...] Scanning D:\\HISTORICAL_RECORDS...',
  '',
  'ERROR 404: Accountability Not Found.',
  'Reason: Module "RTI_Response.vxd" timed out after 30 days without substantive disclosure.',
  'Diagnostic: File has been referred to an Inter-Ministerial Standing Committee for further study.',
  'Recommendation: Try searching for "press_conference.exe" or wait for the 2019 general election.',
];

export const PROMISES_INDEX_OUTPUT = [
  '========================================================================',
  '              POLITICAL PROMISE REALIZATION CALCULATOR (PPRC)           ',
  '========================================================================',
  'Indexed Manifestos: 2002, 2007, 2012, 2014',
  '',
  'Category 1: Double-Digit GDP Growth          -> [STATUS: 68% REALIZED]',
  'Category 2: 24x7 Rural Three-Phase Power     -> [STATUS: 92% REALIZED (Jyotigram)]',
  'Category 3: Complete Eradication of Black Money -> [STATUS: UNDER CALCULATION / NOV 2016 CRUNCH]',
  'Category 4: Bullet Train Mumbai-Ahmedabad    -> [STATUS: SURVEY PHASE / GROUNDING PENDING]',
  'Category 5: Affordable Housing for All       -> [STATUS: IN PROGRESS]',
  'Category 6: Abolition of Red Tape            -> [BUFFER OVERFLOW: Too much paperwork to measure]',
  '',
  'System Summary: 4,129 promises tracked. Citizen satisfaction index varies by news channel.',
  '========================================================================',
];

