console.log('VITE url:', import.meta.env.VITE_SUPABASE_URL);
console.log('VITE key present:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);

import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { supabase } from './lib/supabase';

supabase.auth.getSession().then(({ error }) => {
  if (error) {
    console.error('Supabase init error:', error);
  } else {
    console.log('Supabase client OK');
  }
});


createRoot(document.getElementById("root")!).render(<App />);
