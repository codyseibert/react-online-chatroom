import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
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
        <div>ONLINE CHAT</div>
        <div>
          {isLoggedIn && <div className="flex gap-4 items-center">
            <Image
              referrerPolicy="no-referrer"
              className="h-8 w-8 rounded-full"
              src={session.data?.user?.image || ''}
              alt=""
              width="30"
              height="30"
            />
            {session.data?.user?.name}
            <SecondaryButton
              onClick={signOut}
            >
              Sign Out
            </SecondaryButton>
          </div>}

          {!isLoggedIn && <SecondaryButton onClick={signIn}>Sign In</SecondaryButton>}
        </div>
      </div>
    </div>
  );
};

export default Header;