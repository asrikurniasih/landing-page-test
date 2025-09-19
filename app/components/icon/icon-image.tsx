import { FC } from "react";

interface IconImageProps {
  className?: string;
}

const IconImage: FC<IconImageProps> = ({ className }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outline kotak gambar */}
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* Bulatan kecil (icon matahari) */}
      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
      {/* Garis gunung */}
      <path
        d="M21 17L16 12L11 17L7 13L3 17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconImage;
