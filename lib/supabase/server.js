import { createClient } from "@supabase/supabase-js";

function normalisasiUrl(url) {
  if (!url) return "";
  let bersih = url.trim().replace(/^["']|["']$/g, "");
  // Hapus path /rest/v1 jika tidak sengaja disertakan dari dashboard API
  bersih = bersih.replace(/\/rest\/v1\/?$/, "");
  // Hapus trailing slash
  return bersih.replace(/\/+$/, "");
}

export function buatClientServer() {
  const supabaseUrl = normalisasiUrl(process.env.SUPABASE_URL);
  const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY?.trim().replace(/^["']|["']$/g, "");

  if (!supabaseUrl || !supabaseSecretKey) {
    throw new Error(
      "SUPABASE_URL atau SUPABASE_SECRET_KEY belum diatur di environment variable."
    );
  }

  return createClient(supabaseUrl, supabaseSecretKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export default buatClientServer;
