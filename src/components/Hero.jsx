import React from 'react';
import { FiShield, FiClock, FiMail, FiInbox, FiRefreshCw, FiLock } from 'react-icons/fi';
import FAQ from './FAQ';

const Hero = () => {
  return (
    <div className="space-y-16">
      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
        <div className="group bg-zinc-900/70 border border-zinc-800/50 rounded-xl p-6 backdrop-blur-sm hover:border-green-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/5">
          <div className="bg-green-500/10 p-3 rounded-xl mb-4 w-fit group-hover:scale-110 transition-transform duration-300">
            <FiShield className="w-6 h-6 text-green-500" />
          </div>
          <h3 className="text-lg font-semibold text-zinc-100 mb-2">Enhanced Privacy</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Protect your real email from spam and data breaches. Our service ensures your primary inbox stays clean and secure.
          </p>
        </div>

        <div className="group bg-zinc-900/70 border border-zinc-800/50 rounded-xl p-6 backdrop-blur-sm hover:border-green-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/5">
          <div className="bg-green-500/10 p-3 rounded-xl mb-4 w-fit group-hover:scale-110 transition-transform duration-300">
            <FiClock className="w-6 h-6 text-green-500" />
          </div>
          <h3 className="text-lg font-semibold text-zinc-100 mb-2">No Time Limits</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Unlike 10-minute email services, our addresses remain active as long as you need them. Access your messages anytime.
          </p>
        </div>

        <div className="group bg-zinc-900/70 border border-zinc-800/50 rounded-xl p-6 backdrop-blur-sm hover:border-green-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/5">
          <div className="bg-green-500/10 p-3 rounded-xl mb-4 w-fit group-hover:scale-110 transition-transform duration-300">
            <FiMail className="w-6 h-6 text-green-500" />
          </div>
          <h3 className="text-lg font-semibold text-zinc-100 mb-2">Instant Access</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Generate new email addresses instantly. No registration or personal information required. Start using immediately.
          </p>
        </div>

        <div className="group bg-zinc-900/70 border border-zinc-800/50 rounded-xl p-6 backdrop-blur-sm hover:border-green-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/5">
          <div className="bg-green-500/10 p-3 rounded-xl mb-4 w-fit group-hover:scale-110 transition-transform duration-300">
            <FiInbox className="w-6 h-6 text-green-500" />
          </div>
          <h3 className="text-lg font-semibold text-zinc-100 mb-2">Full Inbox Features</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            View, read, and manage your messages with a clean interface. Support for attachments and rich HTML content.
          </p>
        </div>

        <div className="group bg-zinc-900/70 border border-zinc-800/50 rounded-xl p-6 backdrop-blur-sm hover:border-green-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/5">
          <div className="bg-green-500/10 p-3 rounded-xl mb-4 w-fit group-hover:scale-110 transition-transform duration-300">
            <FiRefreshCw className="w-6 h-6 text-green-500" />
          </div>
          <h3 className="text-lg font-semibold text-zinc-100 mb-2">Multiple Addresses</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Create and manage multiple disposable email addresses. Perfect for testing, development, or maintaining privacy.
          </p>
        </div>

        <div className="group bg-zinc-900/70 border border-zinc-800/50 rounded-xl p-6 backdrop-blur-sm hover:border-green-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/5">
          <div className="bg-green-500/10 p-3 rounded-xl mb-4 w-fit group-hover:scale-110 transition-transform duration-300">
            <FiLock className="w-6 h-6 text-green-500" />
          </div>
          <h3 className="text-lg font-semibold text-zinc-100 mb-2">Secure Storage</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Your messages are encrypted and securely stored. Access them from any device with complete privacy.
          </p>
        </div>
      </div>

      {/* About Section */}
      <div className="space-y-12 animate-fade-in">
        <div className="bg-zinc-900/70 border border-zinc-800/50 rounded-xl p-6 md:p-8 backdrop-blur-sm">
          <h3 className="text-2xl font-bold text-zinc-100 mb-4">What is Droply?</h3>
          <div className="prose prose-invert max-w-none">
            <p className="text-zinc-400 leading-relaxed">
              Droply is a sophisticated disposable email service that provides temporary email addresses for users who want to protect their privacy online. Unlike traditional 10-minute email services that self-destruct after a brief period, Droply offers persistent addresses that remain active until you decide to dispose of them.
            </p>
            <p className="text-zinc-400 leading-relaxed mt-4">
              Our service is perfect for situations where you need to provide an email address but want to avoid spam, marketing emails, or potential data breaches. Whether you're signing up for a service, downloading content, or testing applications, Droply ensures your real email address stays private and protected.
            </p>
          </div>
        </div>

        <div className="bg-zinc-900/70 border border-zinc-800/50 rounded-xl p-6 md:p-8 backdrop-blur-sm">
          <h3 className="text-2xl font-bold text-zinc-100 mb-4">The Technology Behind Droply</h3>
          <div className="prose prose-invert max-w-none">
            <p className="text-zinc-400 leading-relaxed">
              Droply utilizes advanced email infrastructure to provide reliable, secure, and instant email services. Our system is built with modern technology that ensures:
            </p>
            <ul className="text-zinc-400 mt-4 space-y-2">
              <li>• Real-time email delivery and notifications</li>
              <li>• Secure message storage with encryption</li>
              <li>• Spam and malware filtering</li>
              <li>• Support for attachments and HTML content</li>
              <li>• High availability and reliability</li>
            </ul>
            <p className="text-zinc-400 leading-relaxed mt-4">
              Unlike other temporary email services, we prioritize both privacy and functionality. Our infrastructure is designed to handle high volumes of email traffic while maintaining security and user privacy at all times.
            </p>
          </div>
        </div>

        <div className="bg-zinc-900/70 border border-zinc-800/50 rounded-xl p-6 md:p-8 backdrop-blur-sm">
          <h3 className="text-2xl font-bold text-zinc-100 mb-4">Why Choose Droply?</h3>
          <div className="prose prose-invert max-w-none">
            <p className="text-zinc-400 leading-relaxed">
              Droply stands out from other disposable email services for several key reasons:
            </p>
            <ul className="text-zinc-400 mt-4 space-y-2">
              <li>• No time limitations - emails remain accessible as long as you need</li>
              <li>• No registration required - instant access to email addresses</li>
              <li>• Multiple email addresses - create as many as you need</li>
              <li>• Full-featured inbox - read, reply, and manage attachments</li>
              <li>• Privacy focused - no personal information required</li>
              <li>• Clean interface - easy to use and navigate</li>
            </ul>
            <p className="text-zinc-400 leading-relaxed mt-4">
              Whether you're a developer testing applications, a privacy-conscious individual, or someone who wants to avoid spam, Droply provides the perfect solution for temporary email needs.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <FAQ />
      </div>
    </div>
  );
};

export default Hero;