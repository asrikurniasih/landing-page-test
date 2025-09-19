import { FC } from 'react';

interface IconShieldAlertProps {
  className?: string;
}

const IconShieldAlert: FC<IconShieldAlertProps> = ({ className }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Shield Shape */}
      <path
        opacity="0.5"
        d="M12 2L20 6V12C20 16.9706 16.9706 20.9706 12 22C7.02944 20.9706 4 16.9706 4 12V6L12 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Alert (exclamation mark) */}
      <path
        d="M12 8V13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="12" cy="16" r="1" fill="currentColor" />
    </svg>
  );
};

export default IconShieldAlert;
