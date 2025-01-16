import React from 'react';
import { FiUser, FiMail, FiKey, FiCalendar, FiHardDrive, FiCopy, FiEye, FiEyeOff, FiUserPlus } from 'react-icons/fi';

const AccountDetails = ({ 
  accountDetails, 
  password,
  showPassword,
  setShowPassword,
  onSwitchAccount,
  onCopy,
  formatDate,
  formatStorage 
}) => {
  const storage = formatStorage(accountDetails.used, accountDetails.quota);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-white">Account Details</h3>
        <button
          onClick={onSwitchAccount}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20 transition-colors text-sm font-medium"
        >
          <FiUserPlus className="w-4 h-4" />
          Switch Account
        </button>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-4 space-y-4 backdrop-blur-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="bg-green-500/10 p-2 rounded-lg">
              <FiUser className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-sm text-zinc-400">Account ID</p>
          </div>
          <div className="flex gap-2">
            <code className="text-sm font-medium text-white bg-zinc-800/50 py-1.5 px-3 rounded-lg w-full overflow-x-auto whitespace-nowrap">
              {accountDetails.id}
            </code>
            <button
              onClick={() => onCopy(accountDetails.id, 'Account ID')}
              className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-all"
            >
              <FiCopy className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="bg-green-500/10 p-2 rounded-lg">
              <FiMail className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-sm text-zinc-400">Email Address</p>
          </div>
          <div className="flex gap-2">
            <code className="text-sm font-medium text-white bg-zinc-800/50 py-1.5 px-3 rounded-lg w-full overflow-x-auto whitespace-nowrap">
              {accountDetails.address}
            </code>
            <button
              onClick={() => onCopy(accountDetails.address, 'Email')}
              className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-all"
            >
              <FiCopy className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="bg-green-500/10 p-2 rounded-lg">
              <FiKey className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-sm text-zinc-400">Password</p>
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <code className="text-sm font-medium text-white bg-zinc-800/50 py-1.5 px-3 rounded-lg w-full overflow-x-auto whitespace-nowrap block">
                {showPassword ? password : '•'.repeat(password.length)}
              </code>
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-lg text-zinc-400 hover:text-white transition-colors"
              >
                {showPassword ? (
                  <FiEyeOff className="w-4 h-4" />
                ) : (
                  <FiEye className="w-4 h-4" />
                )}
              </button>
            </div>
            <button
              onClick={() => onCopy(password, 'Password')}
              className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-all"
            >
              <FiCopy className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-4 space-y-4 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="bg-green-500/10 p-2 rounded-lg">
            <FiCalendar className="w-5 h-5 text-green-500" />
          </div>
          <div>
            <p className="text-sm text-zinc-400">Created At</p>
            <p className="text-sm font-medium text-white mt-1">
              {formatDate(accountDetails.createdAt)}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="bg-green-500/10 p-2 rounded-lg">
              <FiHardDrive className="w-5 h-5 text-green-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-zinc-400">Storage</p>
              <p className="text-sm font-medium text-white mt-1">
                {storage.used} of {storage.quota} used
              </p>
            </div>
          </div>
          <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-green-500 h-full rounded-full transition-all duration-500 progress-striped"
              style={{ 
                width: `${Math.min(storage.percentage, 100)}%`,
                backgroundImage: 'linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent)',
                backgroundSize: '1rem 1rem',
                animation: 'progress-stripes 1s linear infinite'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;