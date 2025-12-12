import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

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
    const { data: existingEmail } = await supabase
      .from('waitlist')
      .select('email')
      .eq('email', email.toLowerCase())
      .single();

    if (existingEmail) {
      return NextResponse.json(
        { error: 'This email is already on the waitlist' },
        { status: 400 }
      );
    }

    // Add to waitlist
    const { error: insertError } = await supabase
      .from('waitlist')
      .insert([{
        email: email.toLowerCase(),
        source: 'coming-soon',
        created_at: new Date().toISOString()
      }]);

    if (insertError) {
      console.error('Supabase insert error:', insertError);
      throw insertError;
    }

    // Get updated count
    const { count } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true });

    console.log(`New waitlist signup: ${email}`);
    console.log(`Total waitlist size: ${count}`);

    return NextResponse.json(
      {
        message: 'Successfully joined waitlist',
        position: count || 0
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
  try {
    // Get actual count from database
    const { count, error } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('Supabase count error:', error);
      throw error;
    }

    const totalCount = count || 0;

    return NextResponse.json({
      count: totalCount,
      spotsLeft: Math.max(0, 100 - totalCount)
    });
  } catch (error) {
    console.error('Error fetching waitlist count:', error);
    return NextResponse.json(
      { error: 'Failed to fetch waitlist count' },
      { status: 500 }
    );
  }
}
