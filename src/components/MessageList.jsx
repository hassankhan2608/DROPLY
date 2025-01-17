import React, { useState, useRef, useCallback, memo } from 'react';
import { FiMail, FiClock, FiUser, FiInbox, FiLoader, FiX, FiPaperclip, FiDownload, FiArrowLeft, FiTrash2, FiAlertTriangle } from 'react-icons/fi';
import { getMessage, deleteMessage, markMessageAsRead } from '../services/api';
import toast from 'react-hot-toast';

const MessageContentView = memo(({ message, onBack, loading, downloadAttachment, onDelete }) => {
  const contentRef = useRef(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const token = localStorage.getItem('tempmail_token');
      await deleteMessage(token, message.id);
      toast.success('Message deleted successfully');
      onDelete();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  if (showDeleteConfirm) {
    return (
      <div className="p-4 h-full flex flex-col">
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-red-500/10 p-2 rounded-lg">
              <FiAlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-lg font-medium text-red-500">Confirm Delete Message</h3>
          </div>
          <p className="text-zinc-400 mb-6">
            Are you sure you want to delete this message? This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="flex-1 px-4 py-2 rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
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

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4 flex-shrink-0">
        <button 
          onClick={onBack}
          className="md:hidden bg-zinc-800/50 p-2 rounded-lg hover:bg-zinc-700/50 transition-colors"
        >
          <FiArrowLeft className="w-5 h-5 text-zinc-400" />
        </button>
        <h3 className="text-xl font-medium text-white truncate flex-1">
          {message.subject || 'No Subject'}
        </h3>
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
        >
          <FiTrash2 className="w-5 h-5" />
        </button>
      </div>
      <div className="space-y-4 flex-shrink-0">
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2 text-zinc-400 min-w-0 max-w-full">
            <span className="font-medium shrink-0">From:</span>
            <span className="truncate">{message.from?.address || message.from}</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-400">
            <span className="font-medium">Date:</span>
            <span>{new Date(message.createdAt).toLocaleString()}</span>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <FiLoader className="w-6 h-6 text-green-500 animate-spin" />
          </div>
        ) : (
          <div className="border-t border-zinc-800/50 pt-4 flex-1 overflow-hidden">
            <div ref={contentRef} className="custom-scrollbar overflow-y-auto h-[calc(100vh-400px)]">
              {message.html ? (
                <div 
                  className="email-content"
                  dangerouslySetInnerHTML={{ __html: message.html }}
                />
              ) : message.text ? (
                <pre className="text-zinc-300 text-base whitespace-pre-wrap font-sans break-words">
                  {message.text}
                </pre>
              ) : (
                <p className="text-zinc-400 text-base">No content available</p>
              )}
            </div>
          </div>
        )}

        {message.attachments && message.attachments.length > 0 && (
          <div className="border-t border-zinc-800/50 pt-4 flex-shrink-0">
            <div className="flex items-center gap-2 text-zinc-400 mb-3">
              <FiPaperclip className="w-4 h-4" />
              <span className="font-medium text-sm">Attachments ({message.attachments.length})</span>
            </div>
            <div className="space-y-2">
              {message.attachments.map((attachment, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between bg-zinc-800/30 rounded-lg p-2 text-sm"
                >
                  <span className="text-zinc-300 truncate flex-1">
                    {attachment.filename}
                  </span>
                  <button
                    onClick={() => downloadAttachment(attachment)}
                    className="ml-3 p-1.5 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20 transition-colors"
                  >
                    <FiDownload className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

const MessageList = ({ messages }) => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleMessageClick = async (message) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('tempmail_token');
      
      if (!message.seen) {
        await markMessageAsRead(token, message.id);
      }
      
      const fullMessage = await getMessage(token, message.id);
      setSelectedMessage(fullMessage);
    } catch (error) {
      toast.error('Failed to load message content');
      console.error('Error loading message:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMessage = useCallback(() => {
    setSelectedMessage(null);
  }, []);

  const handleBack = useCallback(() => {
    setSelectedMessage(null);
  }, []);

  const downloadAttachment = useCallback((attachment) => {
    const link = document.createElement('a');
    link.href = attachment.downloadUrl;
    link.download = attachment.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  return (
    <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl overflow-hidden backdrop-blur-xl transform transition-all duration-300 hover:border-zinc-700/50 animate-fade-in h-[600px] flex flex-col">
      <div className="p-4 border-b border-zinc-800/50 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-green-500/10 p-2 rounded-lg">
              <FiInbox className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-white">Inbox</h2>
              <p className="text-sm text-zinc-400 hidden sm:block">Your temporary inbox</p>
            </div>
          </div>
          <div className="bg-zinc-800/50 px-2.5 py-1 rounded-full">
            <p className="text-sm text-zinc-400">
              <span className="text-green-500 font-medium">{messages.length}</span> messages
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className={`divide-y divide-zinc-800/50 overflow-y-auto custom-scrollbar ${selectedMessage && window.innerWidth >= 768 ? 'md:w-2/5 lg:w-1/3' : 'w-full'} ${selectedMessage && window.innerWidth < 768 ? 'hidden' : ''}`}>
          {messages.length === 0 ? (
            <div className="px-4 py-8 text-center">
              <div className="bg-green-500/10 p-2 rounded-xl inline-flex mb-3">
                <FiMail className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="text-base font-medium text-white mb-1">No messages yet</h3>
              <p className="text-zinc-400 text-sm">
                New messages will appear here automatically
              </p>
              <div className="mt-3 flex items-center justify-center gap-1.5 text-zinc-500">
                <FiLoader className="w-4 h-4 animate-spin" />
                <span className="text-sm">Checking for new messages...</span>
              </div>
            </div>
          ) : (
            messages.map((message, index) => (
              <div 
                key={message.id} 
                className={`px-4 py-3 hover:bg-zinc-800/20 transition-all duration-200 cursor-pointer animate-slide-up ${
                  selectedMessage?.id === message.id ? 'bg-zinc-800/30' : ''
                } ${message.seen ? 'opacity-75' : ''}`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => handleMessageClick(message)}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg shrink-0 transform transition-transform duration-200 group-hover:scale-105 ${
                    message.seen ? 'bg-zinc-500/10' : 'bg-green-500/10'
                  }`}>
                    <FiMail className={`w-4 h-4 ${message.seen ? 'text-zinc-500' : 'text-green-500'}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={`font-medium truncate ${
                      message.seen ? 'text-zinc-400' : 'text-white'
                    } ${selectedMessage ? 'text-sm' : 'text-base'}`}>
                      {message.subject || 'No Subject'}
                    </p>
                    <div className="mt-1 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-zinc-400">
                      <div className="flex items-center gap-1">
                        <FiUser className="w-4 h-4" />
                        <span className={`truncate ${selectedMessage ? 'text-xs' : 'text-sm'}`}>
                          {message.from?.address || message.from}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FiClock className="w-4 h-4" />
                        <span className={selectedMessage ? 'text-xs' : 'text-sm'}>
                          {new Date(message.createdAt).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {selectedMessage && (
          <div className={`border-l border-zinc-800/50 overflow-hidden ${window.innerWidth >= 768 ? 'md:w-3/5 lg:w-2/3' : 'w-full'}`}>
            <MessageContentView
              message={selectedMessage}
              onBack={handleBack}
              loading={loading}
              downloadAttachment={downloadAttachment}
              onDelete={handleDeleteMessage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageList;