import React, { useState, useEffect, useRef } from 'react';
import { useFileSystemStore } from '../../store/useFileSystemStore';
import { useDesktopStore } from '../../store/useDesktopStore';
import { sound } from '../../sound/soundEngine';
import {
  DEMOCRACY_SIMULATION_OUTPUT,
  ACCOUNTABILITY_SEARCH_OUTPUT,
  PROMISES_INDEX_OUTPUT,
} from '../../data/satireData';

export const CommandPromptApp: React.FC<{ windowId: string }> = ({ windowId }) => {
  const { nodes, getChildren, recoverCorruptedSector } = useFileSystemStore();
  const { closeWindow, triggerBsod, triggerRandomSatiricalError } = useDesktopStore();

  const [currentDirId, setCurrentDirId] = useState<string>('root-c');
  const [history, setHistory] = useState<string[]>([
    'Microsoft(R) Windows 98 [Version 4.10.1998]',
    '   (C)Copyright Microsoft Corp 1981-1998. Gujarat Secretariat Edition.',
    '',
    'System Operator: R.K. Dave [Desk Officer, Archives & Records]',
    'Terminal ID: GNR-CMO-ADM-98 | Location: Sachivalaya, Gandhinagar',
    'Archival Scope: 2001 – November 2016 | Status: Recovered Nov 2026',
    '',
    'Type "HELP" for commands or try: "TIMELINE", "DEMOCRACY", "ACCOUNTABILITY", "RECOVER"',
    '',
  ]);
  const [inputVal, setInputVal] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cmdHistoryIdx, setCmdHistoryIdx] = useState(-1);
  const [isMatrixMode, setIsMatrixMode] = useState(false);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  const currentDirNode = nodes[currentDirId] || nodes['root-c'];
  const currentPath = currentDirNode.path || 'C:';

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isMatrixMode]);

  const handleCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) {
      setHistory((prev) => [...prev, `${currentPath}>`]);
      return;
    }

    sound.playKeyClick();
    setCmdHistory((prev) => [...prev, trimmed]);
    setCmdHistoryIdx(-1);

    const parts = trimmed.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    const promptLine = `${currentPath}>${trimmed}`;
    const output: string[] = [promptLine];

    switch (command) {
      case 'help':
        output.push(
          'Supported MS-DOS Commands:',
          '  HELP           Displays this help message',
          '  DIR            Lists files and directories in current folder',
          '  CD <dir>       Changes directory (e.g. "cd ..", "cd d:", "cd secret")',
          '  TYPE <file>    Displays contents of a document or archive file',
          '  CLS            Clears the terminal screen',
          '  DATE           Displays the system date',
          '  TIME           Displays the system time',
          '  WHOAMI         Displays logged-in operator and administrative post',
          '  VER            Displays Windows 98 version information',
          '  TREE           Graphically displays the folder hierarchy of C: and D:',
          '  ECHO <msg>     Displays a message on the screen',
          '  EXIT           Quits the MS-DOS command interpreter',
          '',
          'Special Political Archive & Diagnostic Commands:',
          '  TIMELINE       Displays chronological political milestones (2001–2016)',
          '  DEMOCRACY      Launches interactive Parliamentary Democracy Simulator',
          '  ACCOUNTABILITY Searches system registry for accountability records',
          '  PROMISES       Calculates the Political Promise Realization Index',
          '  ARCHIVE        Displays summary of the 2001–2016 historical collection',
          '  RECOVER        Reconstructs damaged sector cluster in D:\\UNRECOVERED_FILES',
          '  SECRET         Inspects hidden partition status and password clues',
          '  MATRIX         Toggles green telemetry stream',
          '  CRASH          Triggers kernel blue-screen fault'
        );
        break;

      case 'cls':
        setHistory([]);
        setInputVal('');
        return;

      case 'ver':
        output.push('Microsoft Windows 98 [Version 4.10.1998] Second Edition — Sachivalaya Archive Edition');
        break;

      case 'whoami':
        output.push('GANDHINAGAR-PC\\R.K. Dave [Desk Officer, Archives & Documentation, Gujarat Sachivalaya]');
        break;

      case 'date':
        output.push(`Current date is: ${new Date().toLocaleDateString()}`);
        break;

      case 'time':
        output.push(`Current time is: ${new Date().toLocaleTimeString()} IST`);
        break;

      case 'dir': {
        const children = getChildren(currentDirId);
        output.push(
          ` Volume in drive ${currentPath.substring(0, 2)} is ${currentPath.startsWith('D:') ? 'BACKUP_DRIVE' : 'ARCHIVE_C'}`,
          ` Directory of ${currentPath}`,
          ''
        );
        let fileCount = 0;
        let totalSize = 0;
        children.forEach((node) => {
          const dateStr = node.modified.replace('T', ' ');
          const isDirStr = node.isDirectory ? '<DIR>         ' : '              ';
          const sizeStr = node.isDirectory ? '' : String(node.size || 0).padStart(10, ' ');
          output.push(`${dateStr}    ${isDirStr} ${sizeStr}  ${node.name}`);
          if (!node.isDirectory) {
            fileCount++;
            totalSize += node.size || 0;
          }
        });
        output.push(
          '',
          `              ${fileCount} File(s)     ${totalSize} bytes`,
          `              2 Dir(s)   412,890,112 bytes free`
        );
        break;
      }

      case 'cd': {
        const target = args.join(' ').replace(/['"]/g, '');
        if (!target || target === '.') {
          output.push(currentPath);
        } else if (target === '..' || target === '\\') {
          if (currentDirNode.parentId) {
            setCurrentDirId(currentDirNode.parentId);
          } else {
            setCurrentDirId('root-c');
          }
        } else if (target.toLowerCase() === 'c:' || target.toLowerCase() === 'c:\\') {
          setCurrentDirId('root-c');
        } else if (target.toLowerCase() === 'd:' || target.toLowerCase() === 'd:\\') {
          setCurrentDirId('root-d');
        } else {
          const children = getChildren(currentDirId);
          const found = children.find(
            (c) => c.name.toLowerCase() === target.toLowerCase() && c.isDirectory
          );
          if (found) {
            setCurrentDirId(found.id);
          } else {
            sound.playError();
            output.push(`Invalid directory - "${target}"`);
          }
        }
        break;
      }

      case 'c:':
        setCurrentDirId('root-c');
        break;

      case 'd:':
        setCurrentDirId('root-d');
        break;

      case 'type':
      case 'cat': {
        const targetFile = args.join(' ').replace(/['"]/g, '');
        if (!targetFile) {
          output.push('Syntax: TYPE [filename]');
        } else {
          const children = getChildren(currentDirId);
          const fileNode = children.find(
            (c) => c.name.toLowerCase() === targetFile.toLowerCase()
          );
          if (!fileNode) {
            sound.playError();
            output.push(`File not found - ${targetFile}`);
          } else if (fileNode.isPasswordProtected) {
            sound.playError();
            output.push(`ERROR: Access Denied. File is encrypted. Password required (Hint: SACHIVALAYA).`);
          } else if (fileNode.content) {
            output.push(...fileNode.content.split('\n'));
          } else {
            output.push(`[Binary or empty file: ${fileNode.name}]`);
          }
        }
        break;
      }

      case 'tree':
        output.push(
          'Folder PATH listing for Volumes C: and D:',
          'C:.',
          '├── WINDOWS',
          '│   └── SYSTEM',
          '├── PROGRAM FILES',
          '├── MY DOCUMENTS',
          '│   ├── GUJARAT_2001_2013',
          '│   ├── ELECTIONS_2014',
          '│   ├── GOVERNMENT_POLICIES',
          '│   ├── CONTROVERSIES',
          '│   └── FINAL_ARCHIVE_2016',
          '├── MY PICTURES',
          '│   ├── GUJARAT_ARCHIVE',
          '│   ├── ELECTION_2014',
          '│   └── NATIONAL_EVENTS',
          '└── SECRET',
          '',
          'D:. (BACKUP DRIVE)',
          '├── HISTORICAL_RECORDS',
          '├── NEWS_CLIPPINGS',
          '├── PUBLIC_DOCUMENTS',
          '├── COURT_CASES',
          '└── UNRECOVERED_FILES'
        );
        break;

      case 'echo':
        output.push(args.join(' '));
        break;

      // Political Satire: Parliamentary Democracy Simulator
      case 'democracy':
      case 'democracy.exe':
        sound.playAsterisk();
        output.push(...DEMOCRACY_SIMULATION_OUTPUT);
        break;

      // Political Satire: Accountability Search
      case 'accountability':
      case 'accountability.exe':
        sound.playError();
        triggerRandomSatiricalError();
        output.push(...ACCOUNTABILITY_SEARCH_OUTPUT);
        break;

      // Political Satire: Promises Calculator
      case 'promises':
      case 'promises.exe':
        sound.playAsterisk();
        output.push(...PROMISES_INDEX_OUTPUT);
        break;

      // Historical Timeline Output
      case 'timeline':
        sound.playAsterisk();
        output.push(
          '========================================================================',
          '          HISTORICAL CHRONOLOGY: GUJARAT & INDIA (2001–2016)            ',
          '========================================================================',
          '2001 Oct 07 : Narendra Modi sworn in as Gujarat Chief Minister.',
          '2002 Feb 27 : Godhra Sabarmati Express coach S-6 fire tragedy (59 deaths).',
          '2002 Feb-May: Gujarat communal violence across 16 districts.',
          '2002 Dec 12 : Gujarat Assembly elections; BJP secures 127 seats.',
          '2003 Sep    : Inaugural Vibrant Gujarat Global Summit at Science City.',
          '2004 Apr 12 : Supreme Court transfers Best Bakery trial to Mumbai.',
          '2006        : Jyotigram Yojana completes 24x7 rural power feeder separation.',
          '2008 Mar 26 : Supreme Court appoints Special Investigation Team (SIT).',
          '2008 Oct    : Tata Nano plant relocates from Singur to Sanand, Gujarat.',
          '2010 Mar 27 : SIT questions CM Narendra Modi for over 9 hours in Gandhinagar.',
          '2012 Feb 08 : SIT submits closure report stating no prosecutable evidence.',
          '2013 Sep 13 : BJP Parliamentary Board announces Modi as 2014 PM Candidate.',
          '2013 Nov 15 : Snoopgate surveillance recordings released by Cobrapost/Gulail.',
          '2013 Dec 26 : Metropolitan Magistrate accepts SIT closure report.',
          '2014 May 16 : BJP wins 282 Lok Sabha seats (NDA: 336); Modi sworn in May 26.',
          '2014 Aug 28 : Pradhan Mantri Jan Dhan Yojana (PMJDY) launched.',
          '2014 Sep 25 : Make in India initiative launched across 25 industrial sectors.',
          '2014 Oct 02 : Swachh Bharat Mission launched at Rajghat.',
          '2015 Jul 01 : Digital India programme launched.',
          '2015 Aug 30 : Land Acquisition Amendment Ordinance allowed to lapse.',
          '2015 Sep 28 : Dadri lynching of Mohammad Akhlaq; Award Wapsi movement begins.',
          '2016 Jan 16 : Startup India action plan launched.',
          '2016 Feb 09 : JNU sedition controversy; Kanhaiya Kumar arrested.',
          '2016 Nov 08 : PM Modi announces Demonetisation of ₹500 and ₹1,000 notes.',
          '2016 Nov 12 : Last recorded activity on workstation GNR-CMO-ADM-98.',
          '========================================================================'
        );
        break;

      // Historical Archive Index
      case 'archive':
        sound.playAsterisk();
        output.push(
          '=== ARCHIVE CATALOG: WORKSTATION GNR-CMO-ADM-98 ===',
          'Location: Gandhinagar Secretariat, Gujarat',
          'Preservation Status: Recovered November 2026',
          '',
          'Active Repositories:',
          '  C:\\MY DOCUMENTS\\GUJARAT_2001_2013   -> 6 verified dossiers & timelines',
          '  C:\\MY DOCUMENTS\\ELECTIONS_2014       -> ECI csv results, manifesto, campaign',
          '  C:\\MY DOCUMENTS\\GOVERNMENT_POLICIES -> Make in India, Swachh Bharat, Jan Dhan',
          '  C:\\MY DOCUMENTS\\CONTROVERSIES       -> Dadri, Award Wapsi, JNU, Land Bill',
          '  C:\\MY DOCUMENTS\\FINAL_ARCHIVE_2016  -> Demonetisation 8 Nov 2016 & final logs',
          '  D:\\HISTORICAL_RECORDS              -> Constitutional & RBI Act statutes',
          '  D:\\COURT_CASES                     -> Supreme Court & Magistrate judgments',
          '  D:\\UNRECOVERED_FILES               -> 1 recoverable corrupted cluster',
          '',
          'Timeline constraint: Strictly concludes in mid-November 2016.'
        );
        break;

      // Sector Recovery
      case 'recover':
        sound.playAsterisk();
        recoverCorruptedSector();
        output.push(
          '[...] Initiating forensic sector scan on cluster 0x8F91...',
          '[...] Reading magnetic residue from 2016 power drop...',
          '[...] Reconstructing header bytes: SUCCESS.',
          '',
          'SECTOR 0x8F91 SUCCESSFULLY RESTORED:',
          'Created: D:\\UNRECOVERED_FILES\\recovered_archivist_confession.txt',
          'Status: Unlocked. Type "TYPE D:\\UNRECOVERED_FILES\\recovered_archivist_confession.txt"'
        );
        break;

      // Secret Archival Logs
      case 'secret':
        sound.playAsterisk();
        output.push(
          '=== SECRET ARCHIVAL DIAGNOSTIC ===',
          'Operator: Desk Officer R.K. Dave [STAFF #GNR-7729]',
          'Partition: C:\\SECRET (Encrypted with SACHIVALAYA cipher)',
          'Backup Partition: D:\\UNRECOVERED_FILES',
          '',
          'Archival Note:',
          '"All records from 2001 to November 2016 are duplicated here.',
          'The password to confidential_transfer_order.doc is: SACHIVALAYA',
          'Check the Mahatma Mandir photograph in My Pictures for the watermark."',
          '',
          'To restore the corrupted sector on D:, type: "RECOVER"'
        );
        break;

      case 'matrix':
        sound.playAsterisk();
        setIsMatrixMode(!isMatrixMode);
        output.push(isMatrixMode ? 'Digital stream terminated.' : 'Streaming green telemetry stream...');
        break;

      case 'crash':
        sound.playBeep();
        triggerBsod();
        break;

      case 'exit':
        sound.playClick();
        closeWindow(windowId);
        return;

      default:
        sound.playError();
        output.push(`Bad command or file name: "${command}" (Type "HELP" for available commands)`);
        break;
    }

    setHistory((prev) => [...prev, ...output, '']);
    setInputVal('');
  };

  return (
    <div
      className={`flex-1 flex flex-col h-full p-2 font-mono text-xs select-text overflow-hidden ${
        isMatrixMode ? 'bg-black text-[#00ff66]' : 'bg-black text-gray-200'
      }`}
    >
      <div className="flex-1 overflow-y-auto space-y-0.5 leading-tight">
        {history.map((line, idx) => (
          <div key={idx} className="whitespace-pre-wrap break-all">
            {line}
          </div>
        ))}

        {/* Current Command Input Line */}
        <div className="flex items-center text-white">
          <span className="text-gray-400 select-none mr-1">{currentPath}&gt;</span>
          <input
            type="text"
            className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-white"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleCommand(inputVal);
              } else if (e.key === 'ArrowUp') {
                if (cmdHistory.length > 0) {
                  const nextIdx =
                    cmdHistoryIdx === -1
                      ? cmdHistory.length - 1
                      : Math.max(0, cmdHistoryIdx - 1);
                  setCmdHistoryIdx(nextIdx);
                  setInputVal(cmdHistory[nextIdx]);
                }
              } else if (e.key === 'ArrowDown') {
                if (cmdHistoryIdx !== -1) {
                  const nextIdx = cmdHistoryIdx + 1;
                  if (nextIdx < cmdHistory.length) {
                    setCmdHistoryIdx(nextIdx);
                    setInputVal(cmdHistory[nextIdx]);
                  } else {
                    setCmdHistoryIdx(-1);
                    setInputVal('');
                  }
                }
              }
            }}
            autoFocus
          />
        </div>
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
};
