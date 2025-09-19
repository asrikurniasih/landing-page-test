import { FC } from 'react';

interface IconHouseUserProps {
  className?: string;
  fill?: boolean;
}

const IconHouseUser: FC<IconHouseUserProps> = ({ className, fill = false }) => {
  return (
    <>
      {!fill ? (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          {/* House outline */}
          <path
            opacity="0.5"
            d="M12 1L2 10V21C2 22.1 2.9 23 4 23H20C21.1 23 22 22.1 22 21V10L12 1Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          {/* User head */}
          <circle cx="12" cy="11" r="3" stroke="currentColor" strokeWidth="1.2" />
          {/* User body */}
          <path
            opacity="0.5"
            d="M8.5 18C8.5 16 10 14.5 12 14.5C14 14.5 15.5 16 15.5 18"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          {/* House outline */}
          <path
            opacity="0.5"
            d="M12 3L4 9V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V9L12 3Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* User head filled */}
          <circle cx="12" cy="11" r="3" fill="currentColor" />
          {/* User body filled */}
          <path
            opacity="0.5"
            d="M8.5 18C8.5 16 10 14.5 12 14.5C14 14.5 15.5 16 15.5 18C15.5 19 14 20 12 20C10 20 8.5 19 8.5 18Z"
            fill="currentColor"
          />
        </svg>
      )}
    </>
  );
};

export default IconHouseUser;
