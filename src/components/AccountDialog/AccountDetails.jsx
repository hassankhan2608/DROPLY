import React, { useState } from 'react';
import { FiUser, FiMail, FiKey, FiCalendar, FiHardDrive, FiCopy, FiEye, FiEyeOff, FiUserPlus, FiTrash2, FiLoader, FiAlertTriangle, FiInbox } from 'react-icons/fi';
import { deleteAccount, deleteAllMessages } from '../../services/api';
import toast from 'react-hot-toast';

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
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeletingMessages, setIsDeletingMessages] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteMessagesConfirm, setShowDeleteMessagesConfirm] = useState(false);
  const storage = formatStorage(accountDetails.used, accountDetails.quota);
  
  const handleDeleteAccount = async () => {
    try {
      setIsDeleting(true);
      const token = localStorage.getItem('tempmail_token');
      
      await deleteAccount(token, accountDetails.id);
      
      localStorage.removeItem('tempmail_token');
      localStorage.removeItem('tempmail_email');
      localStorage.removeItem('tempmail_password');
      
      try {
        const accounts = JSON.parse(localStorage.getItem('recent_accounts') || '[]');
        const updatedAccounts = accounts.filter(acc => acc.email !== accountDetails.address);
        localStorage.setItem('recent_accounts', JSON.stringify(updatedAccounts));
      } catch (error) {
        console.error('Failed to update recent accounts:', error);
      }
      
      toast.success('Account deleted successfully');
      
      if (onSwitchAccount) {
        onSwitchAccount();
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleDeleteAllMessages = async () => {
    try {
      setIsDeletingMessages(true);
      const token = localStorage.getItem('tempmail_token');
      await deleteAllMessages(token);
      toast.success('All messages deleted successfully');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsDeletingMessages(false);
      setShowDeleteMessagesConfirm(false);
    }
  };

  if (showDeleteConfirm) {
    return (
      <div className="space-y-6">
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-red-500/10 p-2 rounded-lg">
              <FiAlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-lg font-medium text-red-500">Confirm Account Deletion</h3>
          </div>
          <p className="text-zinc-400 mb-6">
            Are you sure you want to delete this account? This action cannot be undone and all your emails will be permanently deleted.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="flex-1 px-4 py-2 rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteAccount}
              disabled={isDeleting}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDeleting && <FiLoader className="w-4 h-4 animate-spin" />}
              Confirm Delete
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showDeleteMessagesConfirm) {
    return (
      <div className="space-y-6">
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-red-500/10 p-2 rounded-lg">
              <FiAlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-lg font-medium text-red-500">Confirm Delete All Messages</h3>
          </div>
          <p className="text-zinc-400 mb-6">
            Are you sure you want to delete all messages? This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setShowDeleteMessagesConfirm(false)}
              className="flex-1 px-4 py-2 rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteAllMessages}
              disabled={isDeletingMessages}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDeletingMessages && <FiLoader className="w-4 h-4 animate-spin" />}
              Confirm Delete
            </button>
          </div>
        </div>
      </div>
    );
  }

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
        {/* Rest of the account details remain the same */}
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
              <code className="text-sm font-medium text-white bg-zinc-800/50 py-1.5 px-3 rounded-lg w-full overflow-x-auto whitespace-nowrap block pr-10">
                {showPassword ? password : '•'.repeat(password.length)}
              </code>
              <div 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-lg text-zinc-400 hover:text-white transition-colors cursor-pointer touch-manipulation"
                role="button"
                tabIndex={0}
              >
                {showPassword ? (
                  <FiEyeOff className="w-4 h-4" />
                ) : (
                  <FiEye className="w-4 h-4" />
                )}
              </div>
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

      <div className="space-y-3">
        <button
          onClick={() => setShowDeleteMessagesConfirm(true)}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
        >
          <FiInbox className="w-5 h-5" />
          Delete All Messages
        </button>

        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
        >
          <FiTrash2 className="w-5 h-5" />
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default AccountDetails;