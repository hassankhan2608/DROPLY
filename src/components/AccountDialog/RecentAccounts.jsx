import React from 'react';
import { FiUser, FiClock, FiTrash2 } from 'react-icons/fi';

const RecentAccounts = ({ accounts, onAccountClick, onRemoveAccount }) => {
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-zinc-800/50"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-zinc-900 px-2 text-zinc-500">Recent Accounts</span>
        </div>
      </div>

      <div className="space-y-2 max-h-[200px] overflow-y-auto custom-scrollbar pr-2">
        {accounts.map((account) => (
          <div
            key={account.email}
            onClick={() => onAccountClick(account)}
            className="group flex items-center justify-between bg-zinc-800/30 rounded-lg p-3 hover:bg-zinc-800/50 transition-all cursor-pointer border border-zinc-700/30 hover:border-green-500/30 hover:shadow-lg hover:shadow-green-500/5"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <div className="bg-green-500/10 p-1.5 rounded-lg">
                  <FiUser className="w-4 h-4 text-green-500" />
                </div>
                <p className="text-sm font-medium text-white truncate">
                  {account.email}
                </p>
              </div>
              <div className="flex items-center gap-1 mt-1 text-xs text-zinc-500">
                <FiClock className="w-3 h-3" />
                <span>Last used {formatTimestamp(account.timestamp)}</span>
              </div>
            </div>
            <button
              onClick={(e) => onRemoveAccount(account.email, e)}
              className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-500/10 text-zinc-400 hover:text-red-500 transition-all"
            >
              <FiTrash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentAccounts;