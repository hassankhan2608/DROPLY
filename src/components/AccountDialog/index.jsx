import React, { Fragment, useState, useEffect, useCallback, useMemo } from 'react';
import { Dialog, Transition, Tab } from '@headlessui/react';
import { Drawer } from 'vaul';
import { FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { getDomains, createAccount, login } from '../../services/api';
import LoginForm from './LoginForm';
import CreateAccountForm from './CreateAccountForm';
import RecentAccounts from './RecentAccounts';
import AccountDetails from './AccountDetails';

const AccountDialog = ({ isOpen, onClose, accountDetails, onSuccess }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [domains, setDomains] = useState([]);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    domain: ''
  });
  const [recentAccounts, setRecentAccounts] = useState([]);
  const [currentView, setCurrentView] = useState(accountDetails ? 'details' : 'auth');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const password = localStorage.getItem('tempmail_password');

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isOpen) {
      try {
        const accounts = JSON.parse(localStorage.getItem('recent_accounts') || '[]');
        setRecentAccounts(accounts.slice(0, 5));
      } catch (error) {
        console.error('Failed to load recent accounts:', error);
        setRecentAccounts([]);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const response = await getDomains();
        setDomains(response['hydra:member']);
        setFormData(prev => ({ ...prev, domain: response['hydra:member'][0]?.domain || '' }));
      } catch (error) {
        setError('Failed to fetch domains. Please try again.');
      }
    };

    if (isOpen && activeTab === 'register') {
      fetchDomains();
    }
  }, [isOpen, activeTab]);

  useEffect(() => {
    setCurrentView(accountDetails ? 'details' : 'auth');
  }, [accountDetails]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (activeTab === 'register') {
        const email = `${formData.email}@${formData.domain}`;
        await createAccount(email, formData.password);
        const loginResponse = await login(email, formData.password);
        localStorage.setItem('tempmail_token', loginResponse.token);
        localStorage.setItem('tempmail_email', email);
        localStorage.setItem('tempmail_password', formData.password);
        toast.success('Account created successfully');
        onSuccess();
        onClose();
      } else {
        const response = await login(formData.email, formData.password);
        localStorage.setItem('tempmail_token', response.token);
        localStorage.setItem('tempmail_email', formData.email);
        localStorage.setItem('tempmail_password', formData.password);
        toast.success('Logged in successfully');
        onSuccess();
        onClose();
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [activeTab, formData, onSuccess, onClose]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    setError('');
  }, []);

  const handleRecentAccountClick = useCallback((account) => {
    setFormData({
      ...formData,
      email: account.email,
      password: account.password
    });
    setError('');
  }, [formData]);

  const removeRecentAccount = useCallback((email, e) => {
    e.stopPropagation();
    try {
      const updatedAccounts = recentAccounts.filter(acc => acc.email !== email);
      localStorage.setItem('recent_accounts', JSON.stringify(updatedAccounts));
      setRecentAccounts(updatedAccounts);
      toast.success('Account removed from recent list');
    } catch (error) {
      toast.error('Failed to remove account');
    }
  }, [recentAccounts]);

  const formatDate = useCallback((dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }, []);

  const formatStorage = useCallback((used, quota) => {
    const usedBytes = used || 0;
    const quotaBytes = quota || 0;
    const usedDisplay = usedBytes < 1024 * 1024 
      ? `${(usedBytes / 1024).toFixed(2)} KB` 
      : `${(usedBytes / (1024 * 1024)).toFixed(2)} MB`;
    const quotaDisplay = `${(quotaBytes / (1024 * 1024)).toFixed(2)} MB`;
    const percentage = (usedBytes / quotaBytes) * 100;
    
    return {
      used: usedDisplay,
      quota: quotaDisplay,
      percentage: percentage.toFixed(1)
    };
  }, []);

  const handleCopy = useCallback((text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  }, []);

  const handleSwitchAccount = useCallback(() => {
    setCurrentView('auth');
    setActiveTab('login');
    setFormData({ email: '', password: '', domain: '' });
    setError('');
  }, []);

  const DialogContent = useMemo(() => {
    if (currentView === 'details') {
      return (
        <AccountDetails
          accountDetails={accountDetails}
          password={password}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          onSwitchAccount={handleSwitchAccount}
          onCopy={handleCopy}
          formatDate={formatDate}
          formatStorage={formatStorage}
        />
      );
    }

    return (
      <div className="space-y-6">
        <Tab.Group selectedIndex={activeTab === 'login' ? 0 : 1} onChange={(index) => {
          setActiveTab(index === 0 ? 'login' : 'register');
          setError('');
        }}>
          <Tab.List className="flex bg-zinc-800/30 p-1 rounded-lg gap-1">
            <Tab className={({ selected }) => `
              flex-1 py-2.5 text-sm font-medium rounded-md transition-all duration-200
              ${selected ? 'bg-green-500 text-white shadow-lg' : 'text-zinc-400 hover:text-white hover:bg-zinc-700/30'}
            `}>
              Login
            </Tab>
            <Tab className={({ selected }) => `
              flex-1 py-2.5 text-sm font-medium rounded-md transition-all duration-200
              ${selected ? 'bg-green-500 text-white shadow-lg' : 'text-zinc-400 hover:text-white hover:bg-zinc-700/30'}
            `}>
              Create Account
            </Tab>
          </Tab.List>

          <Tab.Panels>
            <Tab.Panel className="space-y-6">
              <LoginForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                loading={loading}
                error={error}
              />
              {recentAccounts.length > 0 && (
                <RecentAccounts
                  accounts={recentAccounts}
                  onAccountClick={handleRecentAccountClick}
                  onRemoveAccount={removeRecentAccount}
                />
              )}
            </Tab.Panel>

            <Tab.Panel className="space-y-4">
              <CreateAccountForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                loading={loading}
                domains={domains}
                error={error}
              />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    );
  }, [
    currentView,
    accountDetails,
    password,
    showPassword,
    handleSwitchAccount,
    handleCopy,
    formatDate,
    formatStorage,
    activeTab,
    formData,
    handleChange,
    handleSubmit,
    loading,
    error,
    recentAccounts,
    handleRecentAccountClick,
    removeRecentAccount,
    domains
  ]);

  const renderDialog = () => {
    const content = (
      <>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-white">
            {currentView === 'details' ? 'Account Details' : activeTab === 'register' ? 'Create Account' : 'Login'}
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-zinc-800/50 text-zinc-400 hover:text-white transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
        {DialogContent}
      </>
    );

    if (isMobile) {
      return (
        <Drawer.Root open={isOpen} onOpenChange={onClose}>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" />
            <Drawer.Content className="bg-black/95 backdrop-blur-xl fixed bottom-0 left-0 right-0 max-h-[96vh] rounded-t-[10px] flex flex-col z-50 drawer-slide-up border-t border-zinc-800/30">
              <div className="p-4 rounded-t-[10px] flex-1 overflow-auto custom-scrollbar">
                <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-800 mb-4" />
                {content}
                <div className="h-40" />
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      );
    }

    return (
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col bg-black/95 backdrop-blur-xl shadow-xl">
                      <div className="sticky top-0 z-10 px-6 py-4 bg-black/95 backdrop-blur-xl border-b border-zinc-800/30">
                        {content}
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    );
  };

  return renderDialog();
};

export default AccountDialog;