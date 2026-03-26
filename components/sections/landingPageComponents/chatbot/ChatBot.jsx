"use client"
import axios from 'axios';
import React, { useState, useEffect, useRef, useDeferredValue } from 'react';
import { FiMessageCircle, FiX, FiSend, FiMinimize2, FiMaximize2, FiUser, FiHelpCircle } from 'react-icons/fi';
import { v4 as uuid } from 'uuid';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Predefined messages and responses
  const predefinedResponses = {
    greeting: {
      keywords: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon'],
      response: "Hello! 👋 Welcome to our support. How can I help you today?"
    },
    pricing: {
      keywords: ['price', 'cost', 'pricing', 'how much', 'expensive', 'cheap', 'budget'],
      response: "Our pricing varies based on your needs. We offer flexible plans starting from $49/month. Would you like me to connect you with our sales team for a custom quote?"
    },
    services: {
      keywords: ['service', 'services', 'offer', 'what do you do', 'products', 'solutions'],
      response: "We offer comprehensive digital solutions including: Web Development, Mobile Apps, E-commerce Solutions, Digital Marketing, and IT Consulting. Which service interests you?"
    },
    contact: {
      keywords: ['contact', 'email', 'phone', 'reach', 'support', 'call', 'whatsapp'],
      response: "You can reach us at:\n📧 support@company.com\n📞 +1 (555) 123-4567\n💬 Live chat: Available 24/7\nWorking hours: Monday-Friday, 9 AM - 6 PM"
    },
    demo: {
      keywords: ['demo', 'trial', 'show', 'see how', 'walkthrough', 'tour'],
      response: "We'd love to give you a personalized demo! Please share your name, email, and preferred time. Our team will contact you within 24 hours to schedule a demo."
    },
    help: {
      keywords: ['help', 'support', 'issue', 'problem', 'stuck', 'error', 'not working'],
      response: "I'm here to help! Could you please describe your issue in detail? You can also check our FAQ section or I can connect you with a support specialist."
    },
    timing: {
      keywords: ['time', 'hours', 'schedule', 'when', 'available', 'working'],
      response: "We're available Monday through Friday, 9 AM to 6 PM (EST). Our support team typically responds within 2-4 hours during business hours."
    },
    refund: {
      keywords: ['refund', 'return', 'money back', 'cancel', 'cancellation'],
      response: "We offer a 30-day money-back guarantee on all our services. Would you like me to help you with the refund process or connect you with our billing team?"
    },
    default: {
      response: "Thank you for your message! 📝 Our team will get back to you within 24 hours. In the meantime, you can:\n• Check our FAQ section\n• Email us at support@company.com\n• Call us at +1 (555) 123-4567\n\nHow else can I help you?"
    }
  };

  useEffect(() => {
    setMessages([{
      _id: 1,
      message: "Hi there! 👋 I'm your virtual assistant. How can I help you today?",
      role: 'bot',
      timestamp: new Date()
    }])
    const sessionId = localStorage.getItem("chat_session") || uuid();
    localStorage.setItem("chat_session", sessionId);
    getPrevMessages(sessionId)
  }, [])

  const getPrevMessages = async (sessionId) => {
    try {

      const resp = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/chat/${sessionId}`)
      console.log("resp for prev messages", resp)
      if (resp) {
        setMessages((prev) => [{
          _id: 1,
          message: "Hi there! 👋 I'm your virtual assistant. How can I help you today?",
          role: 'bot',
          timestamp: new Date()
        }, ...(resp?.data?.chat?.messages || [])])
      }

    } catch (error) {
      console.log("error in sending messages", error)
    }
  }

  useEffect(() => {
    // Show chatbot icon after scrolling past hero section
    const handleScroll = () => {
      const heroSection = document.querySelector('section:first-child, [class*="hero"]');
      if (heroSection) {
        const heroHeight = heroSection.offsetHeight;
        const scrollPosition = window.scrollY;
        setShowIcon(scrollPosition > heroHeight - 100);

        // Reset notification when icon appears
        if (scrollPosition > heroHeight - 100 && !isOpen) {
          setShowNotification(true);
        }
      } else {
        setShowIcon(window.scrollY > 100);
        if (window.scrollY > 100 && !isOpen) {
          setShowNotification(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      // Reset unread count when chat opens
      setUnreadCount(0);
    }
  }, [isOpen, isMinimized]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    const sessionId = localStorage.getItem('chat_session')
    const data = {
      sessionId,
      message: inputMessage,
      role: 'user'
    }
    try {

      const resp = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/chat`, data)
      console.log("response for send message", resp)
      if (resp) {
        setInputMessage('');
        setIsTyping(true);
        setMessages((prev) => [...prev, ...(resp?.data?.messages || [])])
      }

    } catch (error) {
      console.log("error in sending message", error)
    }
  }

  const generateResponse = (userInput) => {
    const input = userInput.toLowerCase();

    for (const [key, value] of Object.entries(predefinedResponses)) {
      if (key !== 'default' && value.keywords.some(keyword => input.includes(keyword))) {
        return value.response;
      }
    }

    return predefinedResponses.default.response;
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
      setUnreadCount(0);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
    if (!isMinimized) {
      setUnreadCount(0);
    }
  };

  if (!showIcon) return null;

  return (
    <>
      {/* Floating Chat Button with Animations */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Ripple Effect */}
        <div className="absolute inset-0 rounded-full animate-ping-slow bg-blue-400 opacity-75"></div>
        <div className="absolute inset-0 rounded-full animate-pulse-slow bg-blue-300 opacity-50"></div>

        {/* Main Button */}
        <button
          className={`relative p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 focus:outline-none group ${isOpen ? 'bg-red-500 hover:bg-red-600 rotate-90' : 'animate-float'
            }`}
          onClick={toggleChat}
          aria-label="Open chat"
        >
          {/* Icon with rotation animation */}
          <div className={`transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}>
            {isOpen ? <FiX size={24} /> : <FiMessageCircle size={24} />}
          </div>

          {/* Tooltip */}
          {!isOpen && (
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              Need help? Chat with us! 💬
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
            </div>
          )}
        </button>

        {/* Notification Badge */}
        {!isOpen && showNotification && (
          <div className="absolute -top-2 -right-2 animate-bounce">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75"></div>
              <div className="relative bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {unreadCount > 0 ? unreadCount : '!'}
              </div>
            </div>
          </div>
        )}

        {/* Unread Count Badge */}
        {!isOpen && unreadCount > 0 && (
          <div className="absolute -top-2 -right-2 animate-pulse">
            <div className="bg-red-500 text-white text-xs font-bold rounded-full min-w-5 h-5 px-1.5 flex items-center justify-center shadow-lg">
              {unreadCount}
            </div>
          </div>
        )}
      </div>

      {/* Chat Modal with Entrance Animation */}
      {isOpen && (
        <div className={`fixed bottom-24 right-6 z-50 bg-white rounded-2xl shadow-2xl transition-all duration-500 transform flex flex-col ${isMinimized ? 'w-80 h-16' : 'w-96 h-[600px] animate-slide-up'
          }`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-2xl p-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                <FiMessageCircle size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-white">Support Chat</h3>
                <p className="text-xs text-blue-100 flex items-center">
                  <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
                  Online • Usually replies in minutes
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={toggleMinimize}
                className="hover:bg-white/20 rounded-lg p-1 transition-colors"
              >
                {isMinimized ? <FiMaximize2 size={18} /> : <FiMinimize2 size={18} />}
              </button>
              <button
                onClick={toggleChat}
                className="hover:bg-white/20 rounded-lg p-1 transition-colors"
              >
                <FiX size={20} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((message, index) => (
                  <div
                    key={message._id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className={`flex items-start space-x-2 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                      }`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.role === 'user'
                        ? 'bg-blue-600'
                        : 'bg-gray-300'
                        }`}>
                        {message.role === 'user'
                          ? <FiUser size={14} className="text-white" />
                          : <FiHelpCircle size={14} className="text-gray-600" />
                        }
                      </div>
                      <div>
                        <div className={`rounded-2xl px-4 py-2 ${message.role === 'user'
                          ? 'bg-blue-600 text-white transform hover:scale-105 transition-transform'
                          : 'bg-white border border-gray-200 text-gray-800'
                          }`}>
                          <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                        </div>
                        {
                          message.createdAt && (
                            <p className={`text-xs mt-1 text-gray-400 ${message.rle === 'user' ? 'text-right' : 'text-left'
                              }`}>
                              {formatTime(message?.createdAt)}
                            </p>
                          )
                        }
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start animate-fade-in">
                    <div className="flex items-start space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                        <FiHelpCircle size={14} className="text-gray-600" />
                      </div>
                      <div className="bg-white border border-gray-200 rounded-2xl px-4 py-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
                <div className="flex space-x-2">
                  <textarea
                    ref={inputRef}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-300"
                    rows="1"
                    style={{ maxHeight: '100px' }}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className="px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <FiSend size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-2 text-center animate-pulse-slow">
                  💬 Our team typically responds within a few minutes
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Add custom animations to your global CSS */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes ping-slow {
          75%, 100% { transform: scale(1.5); opacity: 0; }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-float {
          animation: float 2s ease-in-out infinite;
        }
        
        .animate-ping-slow {
          animation: ping-slow 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
        
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
          opacity: 0;
        }
        
        .hover\\:shadow-3xl:hover {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </>
  );
};

export default Chatbot;