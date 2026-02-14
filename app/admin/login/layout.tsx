import localFont from 'next/font/local'

const rethinkSans = localFont({
  src: [
    {
      path: '../../../public/Font/rethink-sans/RethinkSans[wght].ttf',
      weight: '100 900',
      style: 'normal',
    },
  ],
  variable: '--font-rethink-sans',
  display: 'swap',
})

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${rethinkSans.variable} relative w-full min-h-screen h-full`}>
      <style>{`
        * {
          box-sizing: border-box;
          -webkit-tap-highlight-color: transparent;
        }
        
        [data-login-layout] {
          touch-action: manipulation;
          -webkit-overflow-scrolling: clip;
          -webkit-user-select: none;
          -webkit-touch-callout: none;
          -webkit-text-size-adjust: 100%;
          font-feature-settings: 'kern' 1;
        }
        
        [data-login-layout] input, [data-login-layout] button {
          -webkit-user-select: text;
          -webkit-touch-callout: default;
        }
        
        [data-login-layout] button:focus-visible, [data-login-layout] input:focus-visible {
          outline: 2px solid #0a0a0a;
          outline-offset: 2px;
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
      <div className="font-sans antialiased h-full overflow-hidden" data-login-layout>
        {children}
      </div>
    </div>
  )
}
