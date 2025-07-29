import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('Supabase URL:', supabaseUrl);
console.log('Service Key exists:', !!supabaseServiceKey);

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createDemoUser() {
  try {
    console.log('Creating demo user...');
    
    const { data, error } = await supabase.auth.admin.createUser({
      email: 'demo@prospectify.com',
      password: 'Demo@123',
      email_confirm: true,
      user_metadata: {
        first_name: 'Demo',
        last_name: 'User',
        company: 'Demo Company',
        industry: 'Technology'
      }
    });

    if (error) {
      console.error('Error creating demo user:', error);
      
      // Try to check if user already exists
      const { data: existingUser, error: checkError } = await supabase.auth.admin.getUserById('demo@prospectify.com');
      if (checkError) {
        console.log('User does not exist, error was likely due to duplicate email or other issue');
      } else {
        console.log('Demo user might already exist');
      }
    } else {
      console.log('✅ Demo user created successfully!');
      console.log('User ID:', data.user?.id);
      console.log('Email:', data.user?.email);
    }
  } catch (err) {
    console.error('Script error:', err);
  }
}

createDemoUser();
