'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface EmailCaptureProps {
  onSuccess?: () => void;
}

export default function EmailCapture({ onSuccess }: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;

    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('🎉 You\'re on the list! Check your email for confirmation.');
        setEmail('');
        if (onSuccess) onSuccess();
        
        // Reset after 5 seconds
        setTimeout(() => {
          setStatus('idle');
          setMessage('');
        }, 5000);
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email for early access"
          className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          disabled={status === 'loading' || status === 'success'}
          required
        />
        <button
          type="submit"
          disabled={status === 'loading' || status === 'success' || !email}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px] shadow-md hover:shadow-lg hover:scale-105"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Joining...
            </>
          ) : status === 'success' ? (
            '✓ Joined!'
          ) : (
            'Get Early Access'
          )}
        </button>
      </div>
      
      {message && (
        <p className={`text-sm ${status === 'error' ? 'text-red-600' : 'text-green-600'}`}>
          {message}
        </p>
      )}
    </form>
  );
}
