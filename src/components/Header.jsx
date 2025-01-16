import React, { useState, useEffect } from 'react';
import { FiGithub } from 'react-icons/fi';
import AccountDialog from './AccountDialog/index';
import { getAccount } from '../services/api';

const Header = ({ email, onAccountChange, showTitle }) => {
  const [isAccountDialogOpen, setIsAccountDialogOpen] = useState(false);
  const [accountDetails, setAccountDetails] = useState(null);

  const getInitials = (email) => {
    if (!email) return 'DR';
    const [username] = email.split('@');
    return username.slice(0, 2).toUpperCase();
  };

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const token = localStorage.getItem('tempmail_token');
        if (token) {
          const details = await getAccount(token);
          setAccountDetails(details);
        }
      } catch (error) {
        console.error('Failed to fetch account details:', error);
      }
    };

    if (isAccountDialogOpen) {
      fetchAccountDetails();
    }
  }, [isAccountDialogOpen]);

  const handleLogout = () => {
    localStorage.removeItem('tempmail_token');
    localStorage.removeItem('tempmail_email');
    localStorage.removeItem('tempmail_password');
    setIsAccountDialogOpen(false);
    if (onAccountChange) {
      onAccountChange();
    }
  };

  const handleAccountSuccess = () => {
    if (onAccountChange) {
      onAccountChange();
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-black/50 backdrop-blur-sm z-50">
        <div className="max-w-full mx-0 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex-none">
            <a
              href="https://github.com/hassankhan2608/DROPLY.git"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="bg-zinc-800/50 p-2 rounded-lg transition-all duration-500 hover:bg-zinc-700/50 animate-breath">
                <FiGithub className="w-5 h-5 text-white" />
              </div>
            </a>
          </div>
          
          {showTitle && (
            <h1 className="text-xl font-semibold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent flex-1 text-center">
              Droply
            </h1>
          )}
          
          <div className="flex-none">
            <button
              onClick={() => setIsAccountDialogOpen(true)}
              className="bg-green-500/10 w-10 h-10 rounded-full flex items-center justify-center hover:bg-green-500/20 transition-colors duration-200"
            >
              <span className="text-green-500 font-medium text-sm">{getInitials(email)}</span>
            </button>
          </div>
        </div>
      </header>

      <AccountDialog
        isOpen={isAccountDialogOpen}
        onClose={() => setIsAccountDialogOpen(false)}
        accountDetails={accountDetails}
        onSuccess={handleAccountSuccess}
      />
    </>
  );
};

export default Header;