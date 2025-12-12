import WaitlistContent from '@/components/WaitlistContent';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

async function getWaitlistCount() {
  const { count, error } = await supabase
    .from('waitlist')
    .select('*', { count: 'exact', head: true });

  if (error) {
    console.error('Error fetching waitlist count:', error);
    return 0;
  }

  return count || 0;
}

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const waitlistCount = await getWaitlistCount();

  return <WaitlistContent initialCount={waitlistCount} />;
}
