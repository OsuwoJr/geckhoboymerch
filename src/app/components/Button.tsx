'use client';

import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  text: string;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  text,
  href,
  type = 'button',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  onClick
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded font-medium transition-all duration-200 cursor-pointer border-none outline-none no-underline';
  
  const variantStyles = {
    primary: 'bg-[#a0b921] text-white hover:bg-[#8aa31d] hover:-translate-y-[1px] focus:outline-2 focus:outline-[#a0b921] focus:outline-offset-2',
    secondary: 'bg-transparent text-[#a0b921] border-2 border-[#a0b921] hover:bg-[#a0b921] hover:text-white hover:-translate-y-[1px] focus:outline-2 focus:outline-[#a0b921] focus:outline-offset-2'
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const disabledStyles = 'opacity-50 cursor-not-allowed pointer-events-none';
  const fullWidthStyles = 'w-full';

  const buttonClasses = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${disabled ? disabledStyles : ''}
    ${fullWidth ? fullWidthStyles : ''}
  `.trim();

  const buttonContent = (
    <span className="text-inherit whitespace-nowrap">{text}</span>
  );

  if (href) {
    return (
      <Link 
        href={href}
        className={buttonClasses}
        onClick={(e) => {
          if (disabled) {
            e.preventDefault();
          }
        }}
      >
        {buttonContent}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
    >
      {buttonContent}
    </button>
  );
};

export default Button; 