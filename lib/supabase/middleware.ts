import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Her istekte Supabase oturumunu tazeler ve /admin sayfalarını korur.
 * Anahtarlar yoksa hiçbir şey yapmadan geçer (örnek veri modunda site açık kalır).
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });
  if (!url || !anonKey) return response;

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const adminAlani = path.startsWith("/admin");
  const girisSayfasi = path === "/admin/giris";

  // Girişsiz kullanıcı admin'e giremez → giriş sayfasına
  if (adminAlani && !girisSayfasi && !user) {
    const hedef = request.nextUrl.clone();
    hedef.pathname = "/admin/giris";
    return NextResponse.redirect(hedef);
  }

  // Girişli kullanıcı giriş sayfasına gelirse → panele
  if (girisSayfasi && user) {
    const hedef = request.nextUrl.clone();
    hedef.pathname = "/admin";
    return NextResponse.redirect(hedef);
  }

  return response;
}
