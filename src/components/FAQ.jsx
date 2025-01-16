import React, { useState } from 'react';
import { FiChevronDown, FiHelpCircle } from 'react-icons/fi';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is Droply?",
      answer: "Droply is a secure disposable email service that provides temporary email addresses without requiring registration. It allows you to protect your privacy while still being able to receive emails for verification, sign-ups, or testing purposes."
    },
    {
      question: "How do I create a new email address?",
      answer: "Creating a new email address is simple:\n1. Click the 'New Email' button at the top of the page\n2. Wait a moment while we generate a unique address\n3. Your new email address will be displayed and ready to use immediately"
    },
    {
      question: "How do I create an account?",
      answer: "To create an account:\n1. Click your profile icon in the top right corner\n2. Select the 'Create Account' tab\n3. Enter your desired username\n4. Select a domain from the dropdown\n5. Enter a password\n6. Click 'Create Account'\n\nNote: Creating an account is optional but allows you to keep your email address permanently."
    },
    {
      question: "How do I log in to my account?",
      answer: "To log in:\n1. Click your profile icon in the top right corner\n2. Enter your email address and password\n3. Click 'Login'\n\nYou can also use the 'Recent Accounts' section to quickly access your previous accounts."
    },
    {
      question: "How long do emails stay in my inbox?",
      answer: "Emails are stored for 7 days from the time they are received. After this period, they are automatically deleted to maintain privacy and system performance."
    },
    {
      question: "Can I send emails from my temporary address?",
      answer: "No, Droply is a receive-only service. You cannot send emails from your temporary email address. This helps maintain the security and integrity of the service."
    },
    {
      question: "How secure is my temporary email?",
      answer: "Droply implements several security measures:\n- End-to-end encryption for all communications\n- Automatic deletion of messages after 7 days\n- No personal information required\n- Secure password storage\n- Protection against spam and malware"
    },
    {
      question: "Can I create multiple email addresses?",
      answer: "Yes! You can create as many temporary email addresses as you need. Each address can be managed separately, and you can switch between them easily using the account menu."
    },
    {
      question: "How do I switch between different email addresses?",
      answer: "To switch between addresses:\n1. Click your profile icon in the top right\n2. Use the 'Recent Accounts' section to select a previous address\n3. Or log in to a different account using your credentials"
    },
    {
      question: "What happens if I forget my password?",
      answer: "Since Droply prioritizes privacy and security, we don't store any personal information or recovery options. If you forget your password, you won't be able to recover your account. We recommend saving your credentials securely if you plan to use the account long-term."
    },
    {
      question: "Can I download attachments from received emails?",
      answer: "Yes, you can download attachments from received emails. When viewing an email with attachments, you'll see them listed at the bottom of the message with a download button for each file."
    },
    {
      question: "Is there a limit to how many emails I can receive?",
      answer: "There's no strict limit on the number of emails you can receive. However, each account has a storage quota to ensure fair usage. You can view your storage usage in your account details."
    },
    {
      question: "How do I delete my account?",
      answer: "To delete your account:\n1. Log in to your account\n2. Click your profile icon\n3. Go to Account Details\n4. Scroll to the bottom and click 'Delete Account'\n\nNote: This action is permanent and will delete all your emails immediately."
    },
    {
      question: "Are my emails private?",
      answer: "Yes, your emails are completely private. Only you can access them with your account credentials. We don't read, scan, or share your emails with any third parties."
    },
    {
      question: "What should I do if I'm not receiving expected emails?",
      answer: "If you're not receiving expected emails:\n1. Check if the sender's email service blocks temporary email domains\n2. Verify you've provided the correct email address\n3. Wait a few minutes as some emails may be delayed\n4. Check your storage quota isn't full\n5. Try generating a new email address"
    }
  ];

  return (
    <div className="bg-zinc-900/70 border border-zinc-800/50 rounded-xl p-6 md:p-8 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-green-500/10 p-2 rounded-lg">
          <FiHelpCircle className="w-6 h-6 text-green-500" />
        </div>
        <h3 className="text-2xl font-bold text-zinc-100">Frequently Asked Questions</h3>
      </div>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-zinc-800/50 rounded-lg overflow-hidden transition-all duration-200 hover:border-green-500/30"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-4 text-left bg-zinc-900/50 hover:bg-zinc-800/50 transition-colors"
            >
              <span className="font-medium text-white">{faq.question}</span>
              <FiChevronDown
                className={`w-5 h-5 text-zinc-400 transition-transform duration-200 ${
                  openIndex === index ? 'transform rotate-180' : ''
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-200 ${
                openIndex === index ? 'max-h-[500px]' : 'max-h-0'
              }`}
            >
              <div className="p-4 bg-zinc-900/30 border-t border-zinc-800/50">
                <p className="text-zinc-400 whitespace-pre-line">{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;