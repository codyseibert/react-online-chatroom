import { signIn } from 'next-auth/react';
import React from 'react';
import { PrimaryButton } from '../components/buttons/PrimaryButton';

const LoginPage = () => {
  return (
    <div>
      <PrimaryButton
        onClick={() => signIn('google', {
          callbackUrl: '/'
        })}
      >Login</PrimaryButton>
    </div>
  );
};

export default LoginPage;