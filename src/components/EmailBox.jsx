import React, { useState, useEffect } from 'react';
import { FiCopy, FiRefreshCw } from 'react-icons/fi';
import toast from 'react-hot-toast';

const EmailBox = ({ email, onRefresh, loading }) => {
  const [displayText, setDisplayText] = useState('');
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789@._-';

  useEffect(() => {
    if (!loading && email) {
      let currentIndex = 0;
      const finalEmail = email;
      let currentText = Array(finalEmail.length).fill('_').join('');
      
      const interval = setInterval(() => {
        if (currentIndex >= finalEmail.length) {
          clearInterval(interval);
          return;
        }

        // Create array from current text for manipulation
        const textArray = currentText.split('');
        
        // Scramble all characters after current position
        for (let i = currentIndex; i < textArray.length; i++) {
          textArray[i] = chars[Math.floor(Math.random() * chars.length)];
        }

        // Lock in the next correct character
        textArray[currentIndex] = finalEmail[currentIndex];
        currentText = textArray.join('');
        currentIndex++;

        setDisplayText(currentText);
      }, 100);

      return () => clearInterval(interval);
    } else if (!loading) {
      setDisplayText('No email generated');
    } else {
      // Show scrambling effect while loading
      const scrambleInterval = setInterval(() => {
        const randomLength = Math.floor(Math.random() * 10) + 15; // Random length between 15-25
        const scrambledText = Array(randomLength)
          .fill()
          .map(() => chars[Math.floor(Math.random() * chars.length)])
          .join('');
        setDisplayText(scrambledText);
      }, 50);

      return () => clearInterval(scrambleInterval);
    }
  }, [email, loading]);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    toast.success('Email copied to clipboard');
  };

  return (
    <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl overflow-hidden backdrop-blur-xl transform transition-all duration-300 hover:border-zinc-700/50 animate-fade-in">
      <div className="p-4 sm:p-6">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <h2 className="text-sm font-medium text-zinc-400">Your temporary email</h2>
            <div className="flex items-center gap-3">
              <code className="text-base sm:text-lg font-medium text-white bg-zinc-800/50 py-1.5 px-3 rounded-lg w-full overflow-x-auto mobile-scroll whitespace-nowrap font-mono">
                {displayText}
              </code>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleCopy}
              disabled={!email || loading}
              className="flex-1 inline-flex items-center justify-center rounded-lg text-sm font-medium h-10 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-zinc-800 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <FiCopy className="w-4 h-4 mr-2" />
              Copy
            </button>
            <button
              onClick={onRefresh}
              disabled={loading}
              className="flex-1 inline-flex items-center justify-center rounded-lg text-sm font-medium h-10 px-4 py-2 bg-green-500 hover:bg-green-600 text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-500 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <FiRefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Generating...' : 'New Email'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailBox;