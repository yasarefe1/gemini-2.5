import React, { useState, useEffect, useRef } from 'react';
import { AIIcon, LoadingSpinnerIcon, PaperAirplaneIcon, CheckCircleIcon } from './icons';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
}

const WaitlistChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'ai', text: "Hello! To join our waitlist, please enter your email address below." }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputValue.trim() || isLoading || isCompleted) return;

    const userMessage: Message = {
      id: Date.now(),
      sender: 'user',
      text: inputValue,
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Validate email
    if (!/\S+@\S+\.\S+/.test(userMessage.text)) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          sender: 'ai',
          text: "That doesn't look like a valid email. Could you please try again with a correct email address?"
        }]);
        setIsLoading(false);
      }, 1000);
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate a successful response
    setMessages(prev => [...prev, {
      id: Date.now() + 1,
      sender: 'ai',
      text: `Perfect! We've added ${userMessage.text} to our waitlist. We'll be in touch soon!`
    }]);
    setIsLoading(false);
    setIsCompleted(true);
  };

  return (
    <div className="mt-8">
      <div className="h-64 space-y-4 overflow-y-auto pr-2">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
            {msg.sender === 'ai' && (
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center">
                <AIIcon className="h-5 w-5 text-white" />
              </div>
            )}
            <div className={`max-w-xs rounded-2xl p-3 text-sm ${
              msg.sender === 'ai' 
                ? 'bg-white/10 text-gray-200' 
                : 'bg-indigo-500 text-white'
            }`}>
              <p className="break-words">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex items-start gap-3">
                 <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center">
                    <AIIcon className="h-5 w-5 text-white" />
                </div>
                <div className="max-w-xs rounded-2xl p-3 text-sm bg-white/10 text-gray-200">
                    <div className="flex items-center justify-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-pulse [animation-delay:-0.3s]"></span>
                        <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-pulse [animation-delay:-0.15s]"></span>
                        <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-pulse"></span>
                    </div>
                </div>
            </div>
        )}
         {isCompleted && (
             <div className="text-center flex flex-col items-center p-4">
                <CheckCircleIcon className="h-10 w-10 text-green-400" />
                <p className="mt-3 text-sm text-green-300">You're all set!</p>
            </div>
         )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className={`flex w-full items-center space-x-2 rounded-xl bg-white/5 p-2 ring-1 ring-white/10 ${!isCompleted && 'focus-within:ring-2 focus-within:ring-indigo-500'} transition-all duration-200`}>
          <input
            type="email"
            name="email"
            id="email"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="block w-full flex-1 bg-transparent py-1.5 px-2 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 border-none outline-none"
            placeholder={isCompleted ? "You're on the list!" : "you@example.com"}
            required
            disabled={isLoading || isCompleted}
          />
          <button
            type="submit"
            disabled={isLoading || isCompleted}
            className="inline-flex items-center justify-center rounded-lg bg-indigo-500 p-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            aria-label="Join waitlist"
          >
            {isLoading ? (
              <LoadingSpinnerIcon className="h-5 w-5 animate-spin" />
            ) : (
              <PaperAirplaneIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default WaitlistChat;
