import { FC, ReactNode } from 'react';

export type ButtonProps = {
  children: ReactNode,
  onClick?: () => void
  variant?: Variant
  className?: string
  [x: string]: any;
}

export enum Variant {
  Secondary,
  Primary
}

export const Button: FC<ButtonProps> = ({
  children,
  onClick = () => undefined,
  className = '',
  variant = Variant.Primary,
  ...rest
}) => {
  const colorClass = {
    [Variant.Primary]: 'bg-blue-400 hover:bg-blue-300',
    [Variant.Secondary]: 'bg-gray-400 hover:bg-gray-300'
  }[variant];

  return <button
    onClick={onClick}
    className={`${className} pt-2 ${colorClass}`}
    {...rest}
  >
    {children}
  </button>;
};