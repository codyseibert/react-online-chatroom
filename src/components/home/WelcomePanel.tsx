import React from 'react';

export const WelcomePanel = () => {
  return (
    <div className="p-8 flex flex-col gap-8">
      <h1 className="font-bold text-4xl">Welcome!</h1>
      <h4 className="text-xl">Please select a room to start chatting</h4>
    </div>
  );
};
