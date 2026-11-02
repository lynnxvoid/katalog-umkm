import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

function normalisasiUrl(url) {
  if (!url) return "";
  let bersih = url.trim().replace(/^["']|["']$/g, "");
  bersih = bersih.replace(/\/rest\/v1\/?$/, "");
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

export async function buatClientSesi() {
  const supabaseUrl = normalisasiUrl(process.env.SUPABASE_URL);
  const supabasePublishableKey = process.env.SUPABASE_PUBLISHABLE_KEY?.trim().replace(/^["']|["']$/g, "");

  if (!supabaseUrl || !supabasePublishableKey) {
    throw new Error(
      "SUPABASE_URL atau SUPABASE_PUBLISHABLE_KEY belum diatur di environment variable."
    );
  }

  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabasePublishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Abaikan jika dipanggil saat Server Component render
        }
      },
    },
  });
}

export const buatClientAdmin = buatClientSesi;
export default buatClientServer;
