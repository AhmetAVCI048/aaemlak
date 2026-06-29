import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** Supabase yapılandırıldı mı? (env anahtarları var mı) */
export const supabaseHazir = Boolean(url && anonKey);

/**
 * Sunucu tarafı Supabase istemcisi. Anahtarlar yoksa null döner;
 * bu durumda veri katmanı örnek (sahte) verilere düşer.
 */
export async function supabaseSunucu() {
  if (!url || !anonKey) return null;
  const cookieStore = await cookies();

  return createServerClient(url, anonKey, {
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
          // Server Component içinden cookie yazılamaz; oturum yenileme
          // middleware tarafından yapılır, bu yüzden sorun değil.
        }
      },
    },
  });
}
