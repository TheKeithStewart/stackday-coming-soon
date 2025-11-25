import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory storage for the demo
// In production, you'd use Supabase, ConvertKit, or another service
const waitlist: Set<string> = new Set();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Basic validation
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Check if already on waitlist
    if (waitlist.has(email.toLowerCase())) {
      return NextResponse.json(
        { error: 'This email is already on the waitlist' },
        { status: 400 }
      );
    }

    // Add to waitlist
    waitlist.add(email.toLowerCase());

    // In production, you would:
    // 1. Save to database (Supabase)
    // 2. Send confirmation email
    // 3. Add to email service (ConvertKit, Mailchimp, etc.)
    
    // For now, just log it
    console.log(`New waitlist signup: ${email}`);
    console.log(`Total waitlist size: ${waitlist.size}`);

    // Optional: If you want to use Supabase right away, uncomment this:
    /*
    import { createClient } from '@supabase/supabase-js';
    
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    );

    const { error } = await supabase
      .from('waitlist')
      .insert([{ 
        email: email.toLowerCase(),
        source: 'coming-soon',
        created_at: new Date().toISOString()
      }]);

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }
    */

    return NextResponse.json(
      { 
        message: 'Successfully joined waitlist',
        position: waitlist.size + 127 // Starting from 127 as shown in the UI
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Optional: Return waitlist count for display
  return NextResponse.json({
    count: waitlist.size + 127,
    spotsLeft: Math.max(0, 100 - waitlist.size)
  });
}
