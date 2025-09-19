import { FC } from 'react';

interface IconNotesAddProps {
  className?: string;
}

const IconNotesAdd: FC<IconNotesAddProps> = ({ className }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Notebook shape */}
      <path
        opacity="0.5"
        d="M3 10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H13C16.7712 2 18.6569 2 19.8284 3.17157C21 4.34315 21 6.22876 21 10V14C21 17.7712 21 19.6569 19.8284 20.8284C18.6569 22 16.7712 22 13 22H11C7.22876 22 5.34315 22 4.17157 20.8284C3 19.6569 3 17.7712 3 14V10Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* Horizontal line inside note */}
      <path d="M8 9H14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 13H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 17H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />

      {/* Plus (+) icon */}
      <path
        d="M17 8V12M15 10H19"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default IconNotesAdd;
