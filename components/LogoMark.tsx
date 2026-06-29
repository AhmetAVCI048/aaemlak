/*
  Vektörel logo (yedek + koyu zeminler için). fill="currentColor" olduğu için
  bulunduğu yerin metin rengini alır: koyu zeminde text-white verilir.
*/
export default function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 190"
      className={className}
      role="img"
      aria-label="AA Emlak — Ahmet Avcı Real Estate"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M78 56 L100 30 L122 56 L122 79 L78 79 Z M94 79 L94 62 L106 62 L106 79 Z"
      />
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
