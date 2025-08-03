import { SignUp } from '@clerk/nextjs';
// import Link from 'next/link';

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex flex-col items-center">
          <img
            className="h-22 w-80 "
            src="/logo.jpeg"
            alt="Logo"
          />
          <SignUp />
          
        </div>
      </div>
    </div>
  );
}
