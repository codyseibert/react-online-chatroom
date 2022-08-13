import { FC } from 'react';
import { Button, ButtonProps } from './Button';

export const RoundedButton: FC<ButtonProps> = ({
  children,
  onClick = () => undefined,
  ...rest
}) => {
  return <Button
    onClick={onClick}
    {...rest}
    className={'p-2 rounded-full w-12 h-12 bg-blue-400 hover:bg-blue-300'}
  >
    {children}
  </Button>;
};