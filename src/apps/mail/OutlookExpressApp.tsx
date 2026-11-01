import React, { useState } from 'react';
import { sound } from '../../sound/soundEngine';
import { INITIAL_ARCHIVE_EMAILS, type ArchiveEmail } from '../../data/emailsData';

export const OutlookExpressApp: React.FC<{ windowId: string }> = () => {
  const [emails, setEmails] = useState<ArchiveEmail[]>(INITIAL_ARCHIVE_EMAILS);
  const [selectedFolder, setSelectedFolder] = useState<'inbox' | 'sent' | 'deleted'>('inbox');
  const [selectedEmailId, setSelectedEmailId] = useState<string>('mail-demonetisation-alert');

  const filteredEmails = emails.filter((e) => e.folder === selectedFolder);
  const currentEmail = emails.find((e) => e.id === selectedEmailId);

  const handleSelectEmail = (id: string) => {
    sound.playClick();
    setSelectedEmailId(id);
    setEmails((prev) =>
      prev.map((e) => (e.id === id ? { ...e, isRead: true } : e))
    );
  };

  const handleDeleteEmail = () => {
    if (!currentEmail) return;
    sound.playRecycle();
    setEmails((prev) =>
      prev.map((e) =>
        e.id === currentEmail.id ? { ...e, folder: 'deleted' } : e
      )
    );
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#c0c0c0] select-none text-[11px]">
      {/* Menu Bar */}
      <div className="win-menubar">
        <div className="win-menu-item"><u>F</u>ile</div>
        <div className="win-menu-item"><u>E</u>dit</div>
        <div className="win-menu-item"><u>V</u>iew</div>
        <div className="win-menu-item"><u>T</u>ools</div>
        <div className="win-menu-item"><u>M</u>essage</div>
        <div className="win-menu-item"><u>H</u>elp</div>
      </div>

      {/* Toolbar */}
      <div className="bg-[#c0c0c0] p-1 flex items-center gap-1 border-b border-[#808080]">
        <button
          className="win-btn flex items-center gap-1"
          onClick={() => {
            sound.playAsterisk();
            alert('Cannot connect to mail server (POP3 error 0x800CCC0E): Network dialer is disconnected.');
          }}
        >
          ✉ New Mail
        </button>
        <button
          className="win-btn flex items-center gap-1"
          onClick={() => {
            sound.playClick();
            sound.playAsterisk();
          }}
        >
          ↩ Reply
        </button>
        <button
          className="win-btn flex items-center gap-1"
          onClick={handleDeleteEmail}
        >
          🗑 Delete
        </button>
        <button
          className="win-btn flex items-center gap-1 ml-auto"
          onClick={() => {
            sound.playFloppySeek();
            sound.playAsterisk();
          }}
        >
          ⟳ Send/Recv
        </button>
      </div>

      {/* Main 3-Pane Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Folder Tree */}
        <div className="w-36 bg-white win-inset m-1 p-1 flex flex-col gap-0.5">
          <div className="font-bold text-[#000080] mb-1">Outlook Express</div>
          <div
            className={`px-1.5 py-1 cursor-pointer flex items-center gap-1 ${
              selectedFolder === 'inbox' ? 'bg-[#000080] text-white font-bold' : 'hover:bg-gray-100'
            }`}
            onClick={() => {
              sound.playClick();
              setSelectedFolder('inbox');
            }}
          >
            <span>📥</span>
            <span>Inbox ({emails.filter((e) => e.folder === 'inbox' && !e.isRead).length})</span>
          </div>
          <div
            className={`px-1.5 py-1 cursor-pointer flex items-center gap-1 ${
              selectedFolder === 'sent' ? 'bg-[#000080] text-white font-bold' : 'hover:bg-gray-100'
            }`}
            onClick={() => {
              sound.playClick();
              setSelectedFolder('sent');
            }}
          >
            <span>📤</span>
            <span>Sent Items</span>
          </div>
          <div
            className={`px-1.5 py-1 cursor-pointer flex items-center gap-1 ${
              selectedFolder === 'deleted' ? 'bg-[#000080] text-white font-bold' : 'hover:bg-gray-100'
            }`}
            onClick={() => {
              sound.playClick();
              setSelectedFolder('deleted');
            }}
          >
            <span>🗑</span>
            <span>Deleted Items</span>
          </div>
        </div>

        {/* Right Split View */}
        <div className="flex-1 flex flex-col m-1 overflow-hidden">
          {/* Top: Email List */}
          <div className="h-44 bg-white win-inset overflow-y-auto mb-1">
            <table className="w-full text-[11px] border-collapse">
              <thead>
                <tr className="bg-[#dfdfdf] border-b border-[#808080] text-left">
                  <th className="p-1 border-r border-[#c0c0c0] w-6">!</th>
                  <th className="p-1 border-r border-[#c0c0c0] w-36">From</th>
                  <th className="p-1 border-r border-[#c0c0c0]">Subject</th>
                  <th className="p-1 border-r border-[#c0c0c0] w-28">Received</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmails.map((email) => (
                  <tr
                    key={email.id}
                    className={`cursor-pointer ${
                      email.id === selectedEmailId
                        ? 'bg-[#000080] text-white'
                        : email.isRead
                        ? 'text-gray-800 hover:bg-gray-100'
                        : 'font-bold text-black bg-blue-50'
                    }`}
                    onClick={() => handleSelectEmail(email.id)}
                  >
                    <td className="p-1 text-center">{!email.isRead ? '✉' : '🗎'}</td>
                    <td className="p-1 truncate max-w-[120px]">{email.sender}</td>
                    <td className="p-1 truncate max-w-[200px]">{email.subject}</td>
                    <td className="p-1 text-[10px] opacity-80">{email.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom: Email Preview Pane */}
          <div className="flex-1 bg-white win-inset p-3 overflow-y-auto select-text">
            {currentEmail ? (
              <div>
                <div className="border-b border-gray-300 pb-2 mb-2">
                  <div className="text-xs">
                    <b className="text-gray-700">From:</b> {currentEmail.sender} &lt;{currentEmail.email}&gt;
                  </div>
                  <div className="text-xs">
                    <b className="text-gray-700">Date:</b> {currentEmail.date}
                  </div>
                  <div className="text-xs">
                    <b className="text-gray-700">To:</b> Alex Morgan &lt;alex_m@pinemail.net&gt;
                  </div>
                  <div className="text-xs font-bold text-blue-900 mt-1">
                    <b className="text-gray-700 font-normal">Subject:</b> {currentEmail.subject}
                  </div>
                </div>

                <div className="whitespace-pre-wrap font-sans text-xs leading-relaxed text-black">
                  {currentEmail.body}
                </div>
              </div>
            ) : (
              <div className="text-gray-500 italic text-center pt-8">
                No message selected.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-[20px] bg-[#c0c0c0] border-t border-[#808080] flex items-center px-2 text-[10px] justify-between">
        <div>{emails.filter((e) => e.folder === 'inbox').length} message(s), {emails.filter((e) => e.folder === 'inbox' && !e.isRead).length} unread</div>
        <div className="win-inset px-2 py-0.5">Connected via Modem 56K</div>
      </div>
    </div>
  );
};
