import { createClient } from "@supabase/supabase-js";

const initializeSupabase = () => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;

  return createClient(supabaseUrl, supabaseKey);
};

export default initializeSupabase;
