import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  // Yalnızca yönetim paneli yolları (oturum tazeleme + koruma orada gerekli)
  matcher: ["/admin/:path*"],
};
