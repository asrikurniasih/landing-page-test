import { FC } from "react";

interface IconPetugasProps {
  className?: string;
}

const IconPetugas: FC<IconPetugasProps> = ({ className }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* User Head */}
      <circle cx="10" cy="7" r="4" stroke="currentColor" strokeWidth="1.2" opacity="0.8" />

      {/* User Body */}
      <path
        opacity="0.4"
        d="M16 18C16 15.2386 13.3137 13 10 13C6.68629 13 4 15.2386 4 18C4 20.7614 6.68629 22 10 22C13.3137 22 16 20.7614 16 18Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />

      {/* Shield for Petugas - digeser kanan bawah */}
      <path
        d="M19 11.5L23 13.5V17.5C23 20 21.2 22 19 22.7C16.8 22 15 20 15 17.5V13.5L19 11.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.8"
        strokeLinejoin="round"
      />
      <path
        d="M17.2 17.2L18.7 18.7L20.8 16.6"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconPetugas;
