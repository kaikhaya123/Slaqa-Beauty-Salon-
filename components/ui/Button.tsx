'use client'

import Link from 'next/link'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  children: React.ReactNode
  asLink?: boolean
  href?: string
}

export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  asLink = false,
  href,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer active:scale-95 touch-manipulation pointer-events-auto'
  
  const variants = {
    primary: 'bg-black-900 text-white hover:bg-gray-900 focus:ring-black-800 active:bg-black-900',
    secondary: 'bg-gray-200 text-black-900 hover:bg-gray-300 focus:ring-gray-400 active:bg-gray-400',
    outline: 'border-2 border-black-900 text-black-900 hover:bg-gray-50 focus:ring-black-800 active:bg-gray-100',
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }
  
  const widthClass = fullWidth ? 'w-full' : ''
  
  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`

  if (asLink && href) {
    return (
      <Link href={href} className={`${classes} inline-block`}>
        {children}
      </Link>
    )
  }

  if (href && !asLink) {
    return (
      <Link href={href} className={`${classes} inline-block`}>
        {children}
      </Link>
    )
  }

  return (
    <button 
      className={classes} 
      {...props}
      type={props.type || 'button'}
    >
      {children}
    </button>
  )
}
