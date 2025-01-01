import React, { useEffect, useState, useRef } from 'react';
import { marked } from 'marked';
import hljs from 'highlight.js';
import { useNavigate } from 'react-router-dom';

interface Message {
  sender: 'user' | 'ai';
  content: string;
}

interface Chat {
  id: number;
  description: string;
  timestamp: string;
}

// Add this interface for chat history sections
interface ChatSections {
  today: Chat[];
  previous: Chat[];
}

// Add this new interface for typing effect
interface TypingState {
  isTyping: boolean;
  text: string;
}

// Update the API_CONFIG
const API_CONFIG = {
  BASE_URL: `${window.location.protocol}//${window.location.hostname}:5000`,
  ENDPOINTS: {
    generate: '/generate',
    signin: '/signin',
    chats: '/get_chats',
    chat: '/get_chat',
    save: '/save_chat',
    deleteChat: (id: number) => `/chats/${id}` // Add this new endpoint
  },
  CORS_CONFIG: {
    mode: 'cors' as RequestMode,
    credentials: 'omit' as RequestCredentials,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }
};

// Update TOKEN_CONFIG with the provided token
const TOKEN_CONFIG = {
  MANUAL_TOKEN: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZXhwIjoxNzM1MTU5NjcxfQ.sFgu0RVAgYDMaFG9yWvwcGQsp_hwuWfiV1BjxnyNtJs',
  LOCAL_TOKEN_URL: 'http://localhost:8000/token',
};

// Update TokenManager to include better token validation
const TokenManager = {
  get: () => localStorage.getItem('auth_token'),
  set: (token: string) => localStorage.setItem('auth_token', token),
  clear: () => localStorage.removeItem('auth_token'),
  isValid: () => {
    const token = localStorage.getItem('auth_token');
    return token !== null && token !== 'undefined' && token.length > 0;
  },
  // Add method to get token with bearer prefix
  getBearer: () => {
    const token = localStorage.getItem('auth_token');
    return token ? `Bearer ${token}` : '';
  },
  // Add expiration check
  isExpired: (error: any) => {
    return error?.response?.status === 401 || 
           error?.message?.toLowerCase().includes('unauthorized') ||
           error?.message?.toLowerCase().includes('expired');
  },
  // Add method to get token from local network
  getFromLocalNetwork: async () => {
    try {
      const response = await fetch(TOKEN_CONFIG.LOCAL_TOKEN_URL);
      if (response.ok) {
        const data = await response.json();
        return data.token;
      }
    } catch (error) {
      console.warn('Failed to get token from local network');
    }
    return null;
  },

  // Modify TokenManager initialize method to prioritize the manual token
  initialize: async () => {
    // 1. Always use manual token first if available
    if (TOKEN_CONFIG.MANUAL_TOKEN) {
      TokenManager.set(TOKEN_CONFIG.MANUAL_TOKEN);
      return true;
    }

    // 2. Try URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get('token');
    if (urlToken) {
      TokenManager.set(urlToken);
      window.history.replaceState({}, document.title, window.location.pathname);
      return true;
    }

    // 3. Try localStorage
    if (TokenManager.isValid()) {
      return true;
    }

    // 4. Try local network
    const networkToken = await TokenManager.getFromLocalNetwork();
    if (networkToken) {
      TokenManager.set(networkToken);
      return true;
    }

    return false;
  }
};

const ChatBot: React.FC = () => {
  const navigate = useNavigate();
  // Add back isLoading state
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatHistory, setChatHistory] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<number | null>(null);
  const [prompt, setPrompt] = useState('');
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [typing, setTyping] = useState<TypingState>({ isTyping: false, text: '' });
  const [isLoading, setIsLoading] = useState(false); // Add this back
  const [isTokenMode, setIsTokenMode] = useState(false); // Add new state for token input mode
  
  const responseRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Update initialization useEffect
  useEffect(() => {
    const init = async () => {
      marked.setOptions({
        // highlight: (code, lang) => hljs.highlightAuto(code).value,
        breaks: true
      });

      const hasToken = await TokenManager.initialize();
      if (hasToken) {
        fetchChatHistory();
      } else {
        setShowSignIn(true);
      }
    };

    init();
  }, []);

  // Add this effect to load chat history on component mount
  useEffect(() => {
    const loadInitialChat = async () => {
      await fetchChatHistory();
      const storedChatId = localStorage.getItem('currentChatId');
      if (storedChatId) {
        handleChatSelect(parseInt(storedChatId, 10));
      }
    };

    loadInitialChat();

    // Add event listener for online/offline status
    window.addEventListener('online', () => fetchChatHistory());
    window.addEventListener('offline', () => showErrorMessage('You are offline'));

    // Cleanup
    return () => {
      window.removeEventListener('online', () => fetchChatHistory());
      window.removeEventListener('offline', () => showErrorMessage('You are offline'));
    };
  }, []);

  // Modify chat history refresh interval
  useEffect(() => {
    const interval = setInterval(() => {
      // Only fetch if not currently loading and not typing
      if (!isLoading && !prompt.trim() && !typing.isTyping) {
        fetchChatHistory();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isLoading, prompt, typing.isTyping]);

  // Update the fetchWithAuth function to handle URLs properly
  const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
    const shouldShowLoading = !endpoint.includes('get_chats'); // Don't show loading for chat history
    if (shouldShowLoading) {
      setIsLoading(true);
    }

    if (!TokenManager.isValid()) {
      setShowSignIn(true);
      throw new Error('No valid token found');
    }

    try {
      const url = endpoint.startsWith('http') ? endpoint : `${API_CONFIG.BASE_URL}${endpoint}`;
      console.log('Fetching URL:', url);

      const headers = {
        ...API_CONFIG.CORS_CONFIG.headers,
        'Authorization': TokenManager.getBearer(),
        ...options.headers
      };

      console.log('Headers:', headers);
      
      const response = await fetch(url, {
        ...options,
        ...API_CONFIG.CORS_CONFIG,
        headers,
      });

      if (response.status === 401 || response.status === 403) {
        TokenManager.clear();
        setShowSignIn(true);
        throw new Error('Authentication failed. Please sign in again.');
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return response;
    } catch (error) {
      console.error('Fetch error details:', error); // Add debugging
      if (error instanceof Error) {
        if (error.message.includes('failed') || error.message.includes('401') || error.message.includes('403')) {
          TokenManager.clear();
          setShowSignIn(false);
        }
      }
      throw error;
    } finally {
      if (shouldShowLoading) {
        setIsLoading(false);
      }
    }
  };

  const submitMessage = async (messageText: string) => {
    if (!messageText.trim()) return;

    if (!TokenManager.isValid()) {
      setShowSignIn(true);
      return;
    }

    try {
      const userMessage: Message = { sender: 'user', content: messageText };
      setMessages(prev => [...prev, userMessage]);

      const response = await fetchWithAuth(API_CONFIG.ENDPOINTS.generate, {
        method: 'POST',
        body: JSON.stringify({ prompt: messageText, chat_id: currentChatId })
      });

      const data = await response.json();
      if (response.ok) {
        await simulateTyping(data.response);
        const aiMessage: Message = { sender: 'ai', content: data.response };
        setMessages(prev => [...prev, aiMessage]);
        setCurrentChatId(data.chat_id);
        fetchChatHistory();
      }
    } catch (error) {
      console.error('Error:', error);
      if (!TokenManager.isExpired(error)) {
        showErrorMessage('Failed to send message');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    const currentPrompt = prompt;
    setPrompt(''); // Clear input immediately
    
    await submitMessage(currentPrompt);
    setIsLoading(false);
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.signin}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      if (response.ok) {
        TokenManager.set(data.token);
        setShowSignIn(false);
        await fetchChatHistory();
        // Retry last failed operation if any
        if (prompt.trim()) {
          handleSubmit(new Event('submit') as any);
        }
      } else {
        throw new Error(data.error || 'Sign-in failed');
      }
    } catch (error) {
      console.error('Sign-in error:', error);
      showErrorMessage((error as Error).message);
    }
  };

  // Add handleTokenSubmit function
  const handleTokenSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const token = formData.get('token') as string;
  
    if (!token.trim()) {
      showErrorMessage('Please enter a token');
      return;
    }
  
    try {
      // Verify token with a test request
      const testResponse = await fetch(`${API_CONFIG.BASE_URL}/verify_token`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
  
      if (testResponse.ok) {
        TokenManager.set(token);
        setShowSignIn(false);
        await fetchChatHistory();
        // Retry last failed operation if any
        if (prompt.trim()) {
          handleSubmit(new Event('submit') as any);
        }
      } else {
        throw new Error('Invalid token');
      }
    } catch (error) {
      console.error('Token verification error:', error);
      showErrorMessage('Invalid token. Please try again.');
    }
  };

  // Update fetchChatHistory to include error handling and loading state
  const fetchChatHistory = async () => {
    if (!TokenManager.isValid()) {
      setShowSignIn(true);
      return;
    }
    
    try {
      setIsLoading(true);
      const response = await fetchWithAuth(API_CONFIG.ENDPOINTS.chats);
      const data = await response.json();
      
      if (!Array.isArray(data.chats)) {
        throw new Error('Invalid response format');
      }
      
      setChatHistory(data.chats.sort((a: Chat, b: Chat) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      ));
    } catch (error) {
      console.error('Error fetching chat history:', error);
      if (error instanceof Error && !error.message.includes('sign in')) {
        showErrorMessage(`Failed to load chat history: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Add missing function definitions
  const handleChatSelect = async (chatId: number) => {
    try {
      setIsLoading(true);
      const response = await fetchWithAuth(`${API_CONFIG.ENDPOINTS.chat}/${chatId}`);
      const data = await response.json();
      
      if (data.chat && data.chat.description) {
        setCurrentChatId(chatId);
        
        // Split messages by 'user:' or 'ai:' markers
        const messageRegex = /(user:|ai:)([\s\S]*?)(?=(user:|ai:|$))/g;
        const matches = [...data.chat.description.matchAll(messageRegex)];
        
        const parsedMessages = matches.map(match => ({
          sender: match[1].replace(':', '') as 'user' | 'ai',
          content: match[2].trim()
        }));

        console.log('Raw chat data:', data.chat.description);
        console.log('Parsed messages:', parsedMessages);
        
        setMessages(parsedMessages);
        localStorage.setItem('currentChatId', chatId.toString());
        
        // Scroll to bottom after messages are loaded
        setTimeout(() => {
          if (responseRef.current) {
            responseRef.current.scrollTop = responseRef.current.scrollHeight;
          }
        }, 100);
      }
    } catch (error) {
      console.error('Error loading chat:', error);
      showErrorMessage('Failed to load chat history');
    } finally {
      setIsLoading(false);
      setShowSideMenu(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setCurrentChatId(null);
    localStorage.removeItem('currentChatId');
    setShowSideMenu(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading) {
        handleSubmit(e as unknown as React.FormEvent);
      }
    }
    
    // Auto-resize textarea
    const textarea = e.currentTarget;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
  };

  // Add message parsing function
  const parseChatDescription = (description: string): Message[] => {
    if (!description) return [];
    
    const messages: Message[] = [];
    let currentMessage = '';
    let currentSender: 'user' | 'ai' | null = null;
    
    const lines = description.split('\n');
    
    lines.forEach(line => {
      const trimmedLine = line.trim();
      
      if (trimmedLine.startsWith('user: ') || trimmedLine.startsWith('ai: ')) {
        // Save previous message if exists
        if (currentSender && currentMessage) {
          messages.push({
            sender: currentSender,
            content: currentMessage.trimEnd()
          });
        }
        
        // Start new message
        currentSender = trimmedLine.startsWith('user: ') ? 'user' : 'ai';
        currentMessage = trimmedLine.substring(trimmedLine.startsWith('user: ') ? 6 : 4);
      } else if (currentSender && trimmedLine) {
        // Append line to current message with newline
        currentMessage += '\n' + line;
      }
    });
    
    // Add the last message
    if (currentSender && currentMessage) {
      messages.push({
        sender: currentSender,
        content: currentMessage.trimEnd()
      });
    }
    
    return messages;
  };

  // Add function to organize chats by date
  const organizeChatsByDate = (chats: Chat[]): ChatSections => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return chats.reduce((acc: ChatSections, chat) => {
      const chatDate = new Date(chat.timestamp);
      if (chatDate >= today) {
        acc.today.push(chat);
      } else {
        acc.previous.push(chat);
      }
      return acc;
    }, { today: [], previous: [] });
  };

  // Update the delete chat function
  const handleDeleteChat = async (chatId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this chat?')) return;

    try {
      // Fix the URL construction here
      const response = await fetchWithAuth(API_CONFIG.ENDPOINTS.deleteChat(chatId), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${TokenManager.get()}`
        }
      });

      if (response.ok) {
        // Remove chat from state
        setChatHistory(prev => prev.filter(chat => chat.id !== chatId));
        
        // Clear current chat if it was deleted
        if (currentChatId === chatId) {
          setMessages([]);
          setCurrentChatId(null);
          localStorage.removeItem('currentChatId');
        }

        // Show success message in a more user-friendly way
        const successMessage = document.createElement('div');
        successMessage.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg';
        successMessage.textContent = 'Chat deleted successfully';
        document.body.appendChild(successMessage);
        setTimeout(() => successMessage.remove(), 3000);
      } else {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete chat');
      }
    } catch (error) {
      console.error('Error deleting chat:', error);
      // Show error message in a more user-friendly way
      const errorMessage = document.createElement('div');
      errorMessage.className = 'fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg';
      errorMessage.textContent = `Failed to delete chat: ${(error as Error).message}`;
      document.body.appendChild(errorMessage);
      setTimeout(() => errorMessage.remove(), 3000);
    }
  };

  // Add this typing effect function
  const simulateTyping = async (text: string) => {
    setTyping({ isTyping: true, text: '' });
    let currentText = '';
    
    for (let i = 0; i < text.length; i++) {
      currentText += text[i];
      setTyping({ isTyping: true, text: currentText });
      await new Promise(resolve => setTimeout(resolve, 20)); // Adjust speed here
    }
    
    setTyping({ isTyping: false, text: '' });
  };

  // Add error message function
  const showErrorMessage = (message: string) => {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50';
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);
    setTimeout(() => errorDiv.remove(), 3000);
  };

  // Update chat history item render function
  const renderChatItem = (chat: Chat) => {
    // Get first user message for preview
    const messageRegex = /user:([\s\S]*?)(?=(user:|ai:|$))/;
    const match = chat.description.match(messageRegex);
    const previewText = match ? match[1].trim() : 'New Chat';

    return (
      <div
        key={chat.id}
        onClick={() => handleChatSelect(chat.id)}
        className="group relative w-full p-3 text-left text-white/90 rounded-lg 
          bg-white/5 hover:bg-white/10 transition-colors
          border border-white/10 hover:border-white/20 mb-2 cursor-pointer"
      >
        <div className="pr-12"> {/* Increased padding to accommodate delete icon */}
          <div className="truncate text-sm font-medium">
            {previewText}
          </div>
          <div className="text-xs text-white/60 mt-1">
            {new Date(chat.timestamp).toLocaleString('bn-BD', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </div>
        <button
          onClick={(e) => handleDeleteChat(chat.id, e)}
          className="absolute right-2 top-1/2 -translate-y-1/2 
            text-white/40 hover:text-red-400 transition-all
            w-8 h-8 flex items-center justify-center
            rounded-full hover:bg-white/5"
          title="মুছে ফেলুন"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    );
  };

  // Add a useEffect to handle initial chat loading
  useEffect(() => {
    const storedChatId = localStorage.getItem('currentChatId');
    if (storedChatId) {
      handleChatSelect(parseInt(storedChatId, 10));
    }
  }, []); // Run only once on mount

  // Update the chat history section in the return statement
  const renderChatHistory = () => {
    const { today, previous } = organizeChatsByDate(chatHistory);

    return (
      <div className="space-y-4">
        {today.length > 0 && (
          <div>
            <h3 className="text-gray-400 text-sm font-semibold mb-2">Today</h3>
            {today.map(renderChatItem)}
          </div>
        )}

        {previous.length > 0 && (
          <div>
            <h3 className="text-gray-400 text-sm font-semibold mb-2 mt-4">Previous</h3>
            {previous.map(renderChatItem)}
          </div>
        )}
      </div>
    );
  };

  // Update message rendering to include typing effect
  const renderMessage = (message: Message, index: number) => (
    <div 
      key={index}
      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div 
        className={`
          max-w-[80%] rounded-2xl shadow-md
          ${message.sender === 'user' 
            ? 'bg-green-400 text-black' 
            : 'bg-green-200 text-gray-800 border border-green-100'}
          p-4 animate-fadeIn whitespace-pre-wrap break-words
        `}
        dangerouslySetInnerHTML={{ 
          __html: message.content.split('\n').join('<br/>') 
        }}
      />
    </div>
  );

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  // Update the return statement to use SignInForm component
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Updated Side Menu with matching gradient */}
      <nav 
        className={`
          fixed inset-y-0 left-0
          w-full sm:w-[300px] md:w-[320px] lg:w-[380px]
          bg-gradient-to-r from-emerald-600 to-emerald-700
          transform transition-transform duration-300 ease-in-out z-50
          flex flex-col
          ${showSideMenu ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Updated Header part with matching border */}
        <div className="p-4 border-b border-emerald-500/20">
          <div className="flex items-center justify-between">
            <h2 className="text-white text-xl font-bold">Chat History</h2>
            <button 
              onClick={() => setShowSideMenu(false)}
              className="text-white/80 hover:text-white transition-colors hover:bg-white/10 p-2 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        {/* Updated Scrollable content with matching background */}
        <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-emerald-600/10 to-emerald-700/10">
          {renderChatHistory()}
        </div>
      </nav>

      {/* Main Content - Add responsive padding and width */}
      <div className="flex-1 relative">
        {/* Updated Header with new color and button positioning */}
        <header className="fixed top-0 w-full py-3.5 px-3 sm:px-4 bg-gradient-to-r from-emerald-600 to-emerald-700 backdrop-blur-md shadow-sm z-40 border-b border-emerald-800">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
              <button
                onClick={handleBack}
                className="p-2 hover:bg-white/10 rounded-md transition-colors text-white"
                title="Go back"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-sm sm:text-base font-medium flex items-center gap-1.5 text-white">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.5,3C5,3,3,5,3,7.5S5,12,7.5,12S12,10,12,7.5S10,3,7.5,3z" />
                </svg>
                <span>কৃষকের সহায়ক</span>
              </h1>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowSideMenu(true)}
                className="p-2 hover:bg-white/10 rounded-md transition-colors text-white"
                title="Show chat history"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <button 
                onClick={handleNewChat}
                className="bg-green-600/90 hover:bg-green-700 text-white px-2 sm:px-2.5 py-1 text-xs sm:text-sm rounded
                  transition-colors flex items-center gap-1 sm:gap-1.5 font-medium"
              >
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="hidden xs:inline">নতুন চ্যাট</span>
              </button>
            </div>
          </div>
        </header>

        {/* Messages Container - Responsive padding and width */}
        <div ref={responseRef} className="pt-16 pb-24 px-2 sm:px-4 md:px-6 h-screen overflow-y-auto">
          <div className="max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto space-y-4 sm:space-y-6">
            {messages.map((message, index) => (
              <div 
                key={index}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`
                    max-w-[85%] sm:max-w-[80%] rounded-2xl shadow-md
                    ${message.sender === 'user' 
                      ? 'bg-green-400 text-black' 
                      : 'bg-green-200 text-gray-800 border border-green-100'}
                    p-3 sm:p-4 text-sm sm:text-base animate-fadeIn whitespace-pre-wrap break-words
                  `}
                  dangerouslySetInnerHTML={{ 
                    __html: message.content.split('\n').join('<br/>') 
                  }}
                />
              </div>
            ))}
            {/* ...typing indicator... */}
          </div>
        </div>

        {/* Input Form - Make responsive */}
        <div className="fixed bottom-0 w-full p-2 sm:p-4 bg-white/95 backdrop-blur-md border-t border-gray-200">
          <div className="max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto flex gap-2 sm:gap-4">
            <textarea
              ref={textareaRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="কৃষি সম্পর্কিত প্রশ্ন করুন..."
              className="flex-1 p-2 sm:p-3 text-sm sm:text-base rounded-lg border border-gray-300
                focus:ring-2 focus:ring-green-500 focus:border-green-500
                resize-none h-[40px] sm:h-[50px] min-h-[40px] sm:min-h-[50px] max-h-[40px] sm:max-h-[50px] bg-gray-50"
              onKeyDown={handleKeyPress}
              disabled={isLoading}
              autoComplete="off"
              spellCheck={false}
            />
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                if (!isLoading && prompt.trim()) {
                  handleSubmit(e);
                }
              }}
              disabled={isLoading || !prompt.trim()}
              className={`p-2 sm:p-3 text-white rounded-lg transition-colors
                ${(isLoading || !prompt.trim())
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-green-600 hover:bg-green-700'}`}
            >
              {isLoading ? (
                <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Sign-in Modal - Make responsive */}
      {showSignIn && (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/50 z-50">
          <div className="bg-white w-full max-w-md rounded-lg shadow-xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">
                {isTokenMode ? 'Enter Token' : 'সাইন ইন করুন'}
              </h2>
              <button
                onClick={() => setIsTokenMode(!isTokenMode)}
                className="text-sm text-green-600 hover:text-green-700 underline"
              >
                {isTokenMode ? 'Back to Sign In' : 'Use Token Instead'}
              </button>
            </div>

            {isTokenMode ? (
              <form onSubmit={handleTokenSubmit} className="space-y-4">
                <div>
                  <label htmlFor="token" className="block text-sm font-medium text-gray-700">
                    API Token
                  </label>
                  <input
                    type="text"
                    name="token"
                    id="token"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
                      focus:border-green-500 focus:ring-green-500"
                    placeholder="Enter your API token"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-md
                    hover:bg-green-700 transition-colors"
                >
                  Verify Token
                </button>
              </form>
            ) : (
              <SignInForm onSubmit={handleSignIn} />
            )}
          </div>
        </div>
      )}

  
    </div>
  );
};

export default ChatBot;
