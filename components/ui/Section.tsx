interface SectionProps {
  children: React.ReactNode
  className?: string
  background?: 'white' | 'gray' | 'primary' | 'cream' | 'black'
  padding?: 'sm' | 'md' | 'lg'
  id?: string
}

export default function Section({ 
  children, 
  className = '', 
  background = 'white',
  padding = 'lg',
  id
}: SectionProps) {
  const backgrounds = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    primary: 'bg-primary-50',
    cream: 'bg-cream-50',
    black: 'bg-black',
  }
  
  const paddings = {
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16 md:py-20',
  }

  return (
    <section id={id} className={`${backgrounds[background]} ${paddings[padding]} ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  )
}
