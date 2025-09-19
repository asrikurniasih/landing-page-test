import { FC } from "react";

interface IconImagePlusProps {
  className?: string;
}

const IconImagePlus: FC<IconImagePlusProps> = ({ className }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Frame kotak */}
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* Matahari */}
      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
      {/* Gunung */}
      <path
        d="M21 17L16 12L11 17L7 13L3 17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Plus (+) di pojok kanan atas */}
      <path
        d="M19 7V11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M17 9H21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default IconImagePlus;
