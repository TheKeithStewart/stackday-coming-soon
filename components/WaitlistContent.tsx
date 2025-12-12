'use client';

import { useState } from 'react';
import EmailCapture from '@/components/EmailCapture';
import { CheckCircle, AlertTriangle, Clock, Brain } from 'lucide-react';

interface WaitlistContentProps {
  initialCount: number;
}

export default function WaitlistContent({ initialCount }: WaitlistContentProps) {
  const [emailCount, setEmailCount] = useState(initialCount);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white">
      {/* Hero Section */}
      <section className="relative px-6 py-20 mx-auto max-w-4xl">
        <div className="text-center space-y-6">
          {/* Logo/Brand */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-2xl font-semibold text-gray-900">StackDay</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            Your day has{' '}
            <span className="text-blue-600">8 hours</span>.
            <br />
            Your task list has{' '}
            <span className="text-red-600">12</span>.
            <br />
            <span className="text-3xl md:text-5xl mt-4 block text-gray-700">
              We'll tell you BEFORE you fail.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mt-6">
            StackDay is the first time-blocking app that warns you when you're
            overcommitting—before your day begins. Built specifically for ADHD
            brains that struggle with time blindness.
          </p>

          {/* Email Capture */}
          <div className="mt-10 max-w-md mx-auto">
            <EmailCapture onSuccess={() => setEmailCount(prev => prev + 1)} />
            <p className="text-sm text-gray-500 mt-3">
              🎉 First 100 people get <span className="font-semibold">40% off forever</span>
              {' • '}
              <span className="text-blue-600 font-semibold">{Math.max(0, 100 - emailCount)} spots left</span>
            </p>
          </div>

          {/* Trust Signal */}
          <p className="text-sm text-gray-600 mt-8 italic">
            Built by someone with ADHD who was tired of planning impossible days.
          </p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            You're not failing. Your plan is.
          </h2>
          <p className="text-lg text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Every morning you plan an ambitious day. Every evening you feel like
            a failure. But here's the truth: You're trying to fit 12 hours of
            work into 8 hours of time. No one could succeed at that.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: '📋',
                quote: '"I\'ll definitely finish all 15 tasks today"',
                reality: '(You won\'t. That\'s 10 hours of work.)'
              },
              {
                icon: '⏰',
                quote: '"This will only take 30 minutes"',
                reality: '(It takes 2 hours. Every time.)'
              },
              {
                icon: '😰',
                quote: '"Why am I always behind?"',
                reality: '(You\'re not behind. You\'re overcommitted.)'
              },
              {
                icon: '🔄',
                quote: '"Tomorrow I\'ll catch up"',
                reality: '(Tomorrow has even more tasks.)'
              }
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 border-l-4 border-l-blue-500 border-t border-r border-b border-gray-200">
                <div className="text-3xl mb-3">{item.icon}</div>
                <p className="text-gray-900 font-medium mb-2">{item.quote}</p>
                <p className="text-gray-600 text-sm">{item.reality}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Preview */}
      <section className="px-6 py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Finally see the truth before you start
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: <AlertTriangle className="w-8 h-8 text-red-500" />,
                title: 'Block-Level Warnings',
                description: 'See exactly which parts of your day are overcommitted. Red blocks = too many tasks. Simple.'
              },
              {
                icon: <Brain className="w-8 h-8 text-blue-500" />,
                title: 'Personal Duration Learning',
                description: 'StackDay learns how long YOUR tasks actually take. No more guessing. No more 30-minute tasks that take 2 hours.'
              },
              {
                icon: <Clock className="w-8 h-8 text-green-500" />,
                title: 'Works With Your Calendar',
                description: 'Integrates with Google Calendar. See your meetings AND your tasks. Know your real available time.'
              },
              {
                icon: <CheckCircle className="w-8 h-8 text-purple-500" />,
                title: 'Built for ADHD',
                description: 'Clean, calm, obvious. No overwhelming features. No decision paralysis. Just clarity about what\'s actually possible.'
              }
            ].map((feature, index) => (
              <div key={index} className="flex space-x-4">
                <div className="flex-shrink-0">{feature.icon}</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Stop planning impossible days.
            <br />
            Start finishing what you plan.
          </h2>

          <p className="text-lg text-gray-600 mb-8">
            Join {emailCount} people already on the waitlist. Launching March 2026.
          </p>

          <div className="max-w-md mx-auto">
            <EmailCapture onSuccess={() => setEmailCount(prev => prev + 1)} />
            <div className="mt-4 space-y-1 text-sm text-gray-600">
              <p>✓ 40% off forever (first 100 only)</p>
              <p>✓ Beta access (February 2026)</p>
              <p>✓ Cancel anytime</p>
              <p>✓ No spam, just launch updates</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm">
            Built with 💙 and ADHD hyperfocus by Keith Stewart
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Questions? <a href="mailto:keith@stackday.app" className="text-blue-400 hover:underline">keith@stackday.app</a>
          </p>
        </div>
      </footer>
    </main>
  );
}
