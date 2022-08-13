import { FC } from 'react';
import { Button, ButtonProps } from './Button';


export const SecondaryButton: FC<ButtonProps> = ({
  children,
  onClick = () => undefined,
  ...rest
}) => {
  return <Button
    onClick={onClick}
    {...rest}
    className={'p-2 hover:bg-gray-200 bg-gray-300'}
  >
    {children}
  </Button>;
};