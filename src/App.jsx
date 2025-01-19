import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { FiMail, FiShield, FiClock } from 'react-icons/fi';
import Header from './components/Header';
import Hero from './components/Hero';
import EmailBox from './components/EmailBox';
import MessageList from './components/MessageList';
import { createAccount, login, getMessages, getDomains } from './services/api';
import { generateEmailUsername } from './utils/generateEmailUsername';

function App() {
  const [email, setEmail] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [isAtTop, setIsAtTop] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 100);
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const addToRecentAccounts = (email, password) => {
    try {
      const accounts = JSON.parse(localStorage.getItem('recent_accounts') || '[]');
      const newAccount = { email, password, timestamp: new Date().toISOString() };
      
      // Remove if already exists
      const filteredAccounts = accounts.filter(acc => acc.email !== email);
      
      // Add to beginning and keep only last 5
      const updatedAccounts = [newAccount, ...filteredAccounts].slice(0, 5);
      
      localStorage.setItem('recent_accounts', JSON.stringify(updatedAccounts));
    } catch (error) {
      console.error('Failed to save recent account:', error);
    }
  };

  const generateEmail = async () => {
    try {
      setLoading(true);
      const domainsResponse = await getDomains();
      const domain = domainsResponse['hydra:member'][0].domain;
  
      let attempts = 0;
      const maxAttempts = 3;
  
      while (attempts < maxAttempts) {
        try {
          const username = generateEmailUsername();
          const address = `${username}@${domain}`;
          const newPassword = Math.random().toString(36).substring(7);
  
          await createAccount(address, newPassword);
          const loginResponse = await login(address, newPassword);
  
          setEmail(address);
          setPassword(newPassword);
          localStorage.setItem('tempmail_token', loginResponse.token);
          localStorage.setItem('tempmail_email', address);
          localStorage.setItem('tempmail_password', newPassword);
  
          // Add to recent accounts
          addToRecentAccounts(address, newPassword);
  
          console.log(`Generated Email: ${address}`);
          console.log(`Generated Password: ${newPassword}`);
  
          return;
        } catch (error) {
          attempts++;
          if (attempts === maxAttempts) {
            throw new Error('Failed to generate a unique email after multiple attempts');
          }
          if (error.message.includes('already taken')) {
            continue;
          }
          throw error;
        }
      }
    } catch (error) {
      toast.error(error.message || 'Failed to generate email. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('tempmail_token');
      if (token) {
        const response = await getMessages(token);
        setMessages(response['hydra:member']);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleAccountChange = () => {
    const savedEmail = localStorage.getItem('tempmail_email');
    const savedPassword = localStorage.getItem('tempmail_password');
    
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
    } else {
      setEmail('');
      setPassword('');
      setMessages([]);
      generateEmail();
    }
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem('tempmail_email');
    const savedPassword = localStorage.getItem('tempmail_password');
    const token = localStorage.getItem('tempmail_token');

    if (savedEmail && savedPassword && token) {
      setEmail(savedEmail);
      setPassword(savedPassword);
    } else {
      generateEmail();
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('tempmail_token');
    if (token) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 10000);
      return () => clearInterval(interval);
    }
  }, [email]);

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition-opacity"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`
        }}
      />
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: '#18181b',
            color: '#fff',
            border: '1px solid rgba(63, 63, 70, 0.4)',
          },
          success: {
            iconTheme: {
              primary: '#22c55e',
              secondary: '#18181b',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#18181b',
            },
          },
          duration: 4000,
        }} 
      />
      <div className="relative z-10">
        <Header 
          email={email} 
          password={password}
          onAccountChange={handleAccountChange}
          showTitle={!isAtTop}
        />
        <div className="pt-24 md:pt-32 pb-12 md:pb-16">
          <div className="max-w-[1200px] mx-auto space-y-16">
            <div className="animate-slide-up px-4">
              <div className="relative">
                <div className="absolute -inset-x-20 -top-20 h-80 bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-green-600/20 blur-3xl opacity-50" />
                <h1 className="relative text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-center mb-8 animate-fade-in bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 font-display tracking-tight">
                  DROPLY
                </h1>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center max-w-4xl mx-auto leading-tight tracking-tight text-zinc-100">
                Secure, disposable email addresses for{' '}
                <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                  everyone
                </span>
              </h2>
              <p className="mt-6 text-base sm:text-lg md:text-xl text-zinc-400 text-center max-w-2xl mx-auto">
                Get instant access to temporary email addresses. No registration required, 
                perfect for testing and protecting your privacy.
              </p>
            </div>
          </div>
        </div>
        <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
          <EmailBox 
            email={email} 
            onRefresh={generateEmail}
            loading={loading}
          />
          <MessageList messages={messages} />
          <Hero />
        </main>
      </div>
    </div>
  );
}

export default App