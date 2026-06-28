"use client";

/* Çoklu seçim kutusu — başlık altında onay kutusu ızgarası (İç Özellikler vb.). */
export default function CokluSecim({
  baslik,
  secenekler,
  secili,
  onChange,
}: {
  baslik: string;
  secenekler: string[];
  secili: string[];
  onChange: (yeni: string[]) => void;
}) {
  const degistir = (deger: string) => {
    onChange(
      secili.includes(deger)
        ? secili.filter((s) => s !== deger)
        : [...secili, deger]
    );
  };

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-semibold text-brand-700">{baslik}</span>
        {secili.length > 0 && (
          <span className="text-xs text-accent-600">{secili.length} seçili</span>
        )}
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3 lg:grid-cols-4">
        {secenekler.map((s) => (
          <label
            key={s}
            className="flex cursor-pointer items-center gap-2 text-sm text-brand-700"
          >
            <input
              type="checkbox"
              checked={secili.includes(s)}
              onChange={() => degistir(s)}
              className="h-4 w-4 shrink-0 accent-accent-500"
            />
            {s}
          </label>
        ))}
      </div>
    </div>
  );
}
