import { FC } from 'react';
import { Button, ButtonProps } from './Button';

export const PrimaryButton: FC<ButtonProps> = ({
  children,
  onClick = () => undefined,
  ...rest
}) => {
  return <Button
    onClick={onClick}
    {...rest}
    className={'p-2 bg-blue-400 hover:bg-blue-300'}
  >
    {children}
  </Button>;
};