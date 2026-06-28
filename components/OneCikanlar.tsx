import { type Ilan } from "@/lib/listings";
import IlanKart from "./IlanKart";

/*
  Öne çıkan ilanlar — kendiliğinden yatay kayan şerit (yalnızca burada otomatik kayma).
  Kesintisiz döngü için liste iki kez basılır; CSS translateX(-50%) ile sonsuz akar.
  Mobilde ~1, masaüstünde birden fazla kart ekrana sığar (vw tabanlı genişlik).
*/
export default function OneCikanlar({ ilanlar }: { ilanlar: Ilan[] }) {
  if (ilanlar.length === 0) return null;
  const dizi = [...ilanlar, ...ilanlar];

  return (
    <div className="marquee-pause overflow-hidden">
      <div className="marquee-track flex gap-6 py-2">
        {dizi.map((ilan, i) => (
          <div
            key={`${ilan.id}-${i}`}
            className="w-[78vw] max-w-[340px] shrink-0 sm:w-[42vw] lg:w-[30vw] xl:w-[22vw]"
            aria-hidden={i >= ilanlar.length}
          >
            <IlanKart ilan={ilan} />
          </div>
        ))}
      </div>
    </div>
  );
}
