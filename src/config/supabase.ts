import { createClient } from "@supabase/supabase-js";

export const SUPABASE_DB_URL = process.env.REACT_APP_SUPABASE_DB_URL;
export const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!SUPABASE_DB_URL || !SUPABASE_ANON_KEY)
  throw new Error("Missing Supabase credentials");

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_DB_URL || "",
  process.env.REACT_APP_SUPABASE_ANON_KEY || ""
);

export default supabase;
