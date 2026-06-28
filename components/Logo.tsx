/*
  AA Emlak logosu — Ahmet Avcı'nın logosunun vektörel (SVG) uyarlaması.
  fill="currentColor" olduğu için bulunduğu yerin metin rengini alır:
  açık zeminde text-brand-900, koyu zeminde text-white ver yeter.
  Orijinal PNG istenirse bu bileşen <img src="/logo.png"> ile değiştirilebilir.
*/
export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 190"
      className={className}
      role="img"
      aria-label="AA Emlak — Ahmet Avcı Real Estate"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* İki "A"nın tepesi arasına oturan ev ikonu (kapı boşluklu) */}
      <path
        fillRule="evenodd"
        d="M78 56 L100 30 L122 56 L122 79 L78 79 Z M94 79 L94 62 L106 62 L106 79 Z"
      />
      {/* AA monogramı (serif) */}
      <text
        x="100"
        y="140"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="118"
        fontWeight="700"
        letterSpacing="-6"
      >
        AA
      </text>
      {/* İsim */}
      <text
        x="100"
        y="166"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="21"
        fontWeight="700"
        letterSpacing="1.5"
      >
        AHMET AVCI
      </text>
      {/* Alt başlık */}
      <text
        x="100"
        y="184"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="11"
        letterSpacing="6"
      >
        REAL ESTATE
      </text>
    </svg>
  );
}
