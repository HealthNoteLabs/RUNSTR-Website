import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mofalmnixppnqcvfkveq.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vZmFsbW5peHBwbnFjdmZrdmVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1NzM4NDcsImV4cCI6MjA4NDE0OTg0N30.BsDKT7qqs7S69BDfIPJvWy5odshx2zKvEfb_sLc7RnA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
