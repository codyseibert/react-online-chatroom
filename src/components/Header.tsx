import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import { PrimaryButton } from './buttons/PrimaryButton';
import { SecondaryButton } from './buttons/SecondaryButton';

const Header = () => {
  const session = useSession();
  const isLoggedIn = !!session.data;

  return (
    <div className="absolute w-full h-14 bg-blue-300 shadow-lg">
      <div className="container h-full mx-auto flex justify-between items-center">
        <div>online chat</div>
        <div>
          {isLoggedIn && <div className="flex gap-4 items-center">
            <img
              referrerPolicy="no-referrer"
              className="h-8 w-8 rounded-full"
              src={session.data?.user?.image}
              alt=""
            />
            {session.data?.user?.name}
            <SecondaryButton
              onClick={signOut}
            >
              Sign Out
            </SecondaryButton>
          </div>}

          {!isLoggedIn && <PrimaryButton onClick={signIn}>Sign In</PrimaryButton>}
        </div>
      </div>
    </div>
  );
};

export default Header;