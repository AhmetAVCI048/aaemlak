"use client";

import { useState } from "react";
import { whatsappLink } from "@/lib/site-config";
import { WhatsAppIcon, CloseIcon } from "./icons";

const TURLER = ["Daire", "Villa", "Müstakil Ev", "Yazlık", "Arsa", "İş Yeri"];
const ODALAR = ["1+1", "2+1", "3+1", "4+1", "5+1 ve üzeri"];

/*
  "Mülkünü Sat / Kirala" butonu — açılan kısa formdan seçimlerle WhatsApp mesajı
  oluşturup gönderir. Hem masaüstü hem mobilde kullanılır.
*/
export default function SatisPopup({
  triggerClassName,
  triggerLabel = "Mülkünü Sat / Kirala",
  whatsapp,
}: {
  triggerClassName?: string;
  triggerLabel?: string;
  whatsapp?: string;
}) {
  const [acik, setAcik] = useState(false);
  const [islem, setIslem] = useState<"satmak" | "kiralamak">("satmak");
  const [tur, setTur] = useState("");
  const [konum, setKonum] = useState("");
  const [oda, setOda] = useState("");
  const [not, setNot] = useState("");

  const gonder = () => {
    const detaylar = [
      tur && `Emlak Türü: ${tur}`,
      konum && `Konum: ${konum}`,
      oda && `Oda Sayısı: ${oda}`,
      not && `Not: ${not}`,
    ].filter(Boolean) as string[];

    const mesaj = [
      `Merhaba, gayrimenkulümü sizin aracılığınızla ${islem} istiyorum.`,
      "",
      ...detaylar,
      "",
      "Bilgi verebilir misiniz?",
    ].join("\n");

    window.open(whatsappLink(mesaj, whatsapp), "_blank");
    setAcik(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setAcik(true)}
        className={
          triggerClassName ??
          "flex items-center justify-center gap-2 rounded-xl bg-white/15 px-5 py-3 font-semibold text-white ring-1 ring-white/40 transition hover:bg-white/25"
        }
      >
        <WhatsAppIcon className="h-5 w-5" />
        {triggerLabel}
      </button>

      {acik && (
        <div
          className="fixed inset-0 z-[70] flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4"
          onClick={() => setAcik(false)}
        >
          <div
            className="w-full max-w-md rounded-t-2xl bg-white p-6 shadow-xl sm:rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-brand-800">Mülkünü Değerlendir</h3>
                <p className="text-sm text-brand-500">
                  Birkaç seçim yap, WhatsApp'tan bize ulaşalım.
                </p>
              </div>
              <button
                onClick={() => setAcik(false)}
                className="rounded-lg p-1 text-brand-400 hover:bg-brand-50"
                aria-label="Kapat"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* İşlem */}
              <div>
                <span className="mb-1.5 block text-sm font-medium text-brand-700">İşlem</span>
                <div className="grid grid-cols-2 gap-2">
                  {(["satmak", "kiralamak"] as const).map((i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setIslem(i)}
                      className={`rounded-lg border py-2.5 text-sm font-semibold capitalize transition ${
                        islem === i
                          ? "border-accent-500 bg-accent-500 text-brand-900"
                          : "border-brand-200 text-brand-600 hover:bg-brand-50"
                      }`}
                    >
                      {i === "satmak" ? "Satmak" : "Kiralamak"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tür */}
              <div>
                <span className="mb-1.5 block text-sm font-medium text-brand-700">Emlak Türü</span>
                <div className="flex flex-wrap gap-2">
                  {TURLER.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTur(tur === t ? "" : t)}
                      className={`rounded-full border px-3 py-1.5 text-sm transition ${
                        tur === t
                          ? "border-accent-500 bg-accent-500 font-semibold text-brand-900"
                          : "border-brand-200 text-brand-600 hover:bg-brand-50"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Oda (konut türlerinde) */}
              {tur && tur !== "Arsa" && tur !== "İş Yeri" && (
                <div>
                  <span className="mb-1.5 block text-sm font-medium text-brand-700">Oda Sayısı</span>
                  <div className="flex flex-wrap gap-2">
                    {ODALAR.map((o) => (
                      <button
                        key={o}
                        type="button"
                        onClick={() => setOda(oda === o ? "" : o)}
                        className={`rounded-full border px-3 py-1.5 text-sm transition ${
                          oda === o
                            ? "border-accent-500 bg-accent-500 font-semibold text-brand-900"
                            : "border-brand-200 text-brand-600 hover:bg-brand-50"
                        }`}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Konum */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-brand-700">Konum</label>
                <input
                  value={konum}
                  onChange={(e) => setKonum(e.target.value)}
                  placeholder="İlçe / mahalle (örn. Bodrum, Yalıkavak)"
                  className="filtre-input"
                />
              </div>

              {/* Not */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-brand-700">
                  Eklemek istediğin not (isteğe bağlı)
                </label>
                <textarea
                  value={not}
                  onChange={(e) => setNot(e.target.value)}
                  rows={2}
                  className="filtre-input resize-y"
                />
              </div>
            </div>

            <button
              onClick={gonder}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3.5 font-semibold text-white transition hover:bg-green-500"
            >
              <WhatsAppIcon className="h-5 w-5" />
              WhatsApp'tan Gönder
            </button>
          </div>
        </div>
      )}
    </>
  );
}
