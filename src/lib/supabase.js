import { createClient } from '@supabase/supabase-js';

const defaultUrl = 'https://bsxsymzckrkbctgkqwbn.supabase.co';
const defaultKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzeHN5bXpja3JrYmN0Z2txd2JuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA5OTI5MDMsImV4cCI6MjEwNjU2ODkwM30.Unlh2ozXdN6LKbwj5_NK_i6j4OeEBESW6msu47x4g5o';

const envUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const envKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

const rawUrl = (envUrl && !envUrl.includes('PEGA_AQUI')) ? envUrl : defaultUrl;
export const SUPABASE_URL = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
export const SUPABASE_ANON_KEY = (envKey && !envKey.includes('PEGA_AQUI')) ? envKey : defaultKey;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});
