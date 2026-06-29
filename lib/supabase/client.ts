"use client";

import { createBrowserClient } from "@supabase/ssr";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** Tarayıcı tarafında Supabase yapılandırıldı mı? */
export const supabaseHazir = Boolean(url && anonKey);

/**
 * Tarayıcı tarafı Supabase istemcisi (admin: giriş, kayıt, fotoğraf yükleme).
 * Anahtarlar yoksa null döner.
 */
export function supabaseTarayici() {
  if (!url || !anonKey) return null;
  return createBrowserClient(url, anonKey);
}
