import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { chatApi } from '../services/api';
import { FiSend, FiX, FiMinimize2, FiMessageCircle } from 'react-icons/fi';

interface Message {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [emailInput, setEmailInput] = useState('');
  const [sessionId, setSessionId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sessionId === '') {
      setSessionId(`session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
    }
  }, [sessionId]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        text: t('chatbot.welcome'),
        sender: 'bot',
        timestamp: new Date(),
      }]);
    }
  }, [isOpen, t]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMsg: Message = {
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await chatApi.sendMessage({
        sessionId,
        message: inputMessage,
        userEmail: userEmail || undefined,
      });

      setSessionId(response.sessionId);

      const botMsg: Message = {
        text: response.message,
        sender: 'bot',
        timestamp: new Date(response.timestamp),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMsg: Message = {
        text: 'Sorry, I encountered an error. Please try again later.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSubmit = async () => {
    if (!emailInput.trim()) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput)) {
      alert(t('chatbot.emailInvalid'));
      return;
    }

    const isValid = await chatApi.validateEmail(emailInput);
    if (isValid) {
      setUserEmail(emailInput);
      setEmailInput('');
    } else {
      alert(t('chatbot.emailInvalid'));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-colors flex items-center justify-center z-50"
        aria-label={t('chatbot.title')}
      >
        <FiMessageCircle className="w-8 h-8" />
      </button>
    );
  }

  return (
    <div
      className={`fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-lg shadow-2xl z-50 flex flex-col ${
        isMinimized ? 'h-16' : 'h-[500px]'
      } transition-all duration-300`}
    >
      <div className="bg-primary-600 text-white p-4 rounded-t-lg flex justify-between items-center">
        <h3 className="font-semibold">{t('chatbot.title')}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="hover:bg-primary-700 p-1 rounded transition-colors"
            aria-label={t('chatbot.minimize')}
          >
            <FiMinimize2 className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              setIsOpen(false);
              setIsMinimized(false);
            }}
            className="hover:bg-primary-700 p-1 rounded transition-colors"
            aria-label={t('chatbot.close')}
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.sender === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {!userEmail && (
            <div className="border-t p-4 bg-gray-50">
              <p className="text-sm text-gray-700 mb-2">{t('chatbot.emailPrompt')}</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder={t('chatbot.emailPlaceholder')}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button
                  onClick={handleEmailSubmit}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm"
                >
                  {t('chatbot.emailSubmit')}
                </button>
              </div>
            </div>
          )}

          <div className="border-t p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t('chatbot.placeholder')}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiSend className="w-5 h-5" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Chatbot;
