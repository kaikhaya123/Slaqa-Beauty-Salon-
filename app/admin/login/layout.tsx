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
    <html lang="en" className={`${rethinkSans.variable} h-full`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <style>{`
          html, body {
            margin: 0;
            padding: 0;
            min-height: 100vh;
            min-height: 100dvh;
            overflow-x: hidden;
            overflow-y: auto;
            width: 100%;
            background: #fdfcfa;
          }
          
          @media (max-width: 640px) {
            html { font-size: 14px; }
          }
          
          @media (min-width: 641px) and (max-width: 1024px) {
            html { font-size: 15px; }
          }
          
          @media (min-width: 1025px) {
            html { font-size: 16px; }
          }
          
          * {
            box-sizing: border-box;
            -webkit-tap-highlight-color: transparent;
          }
          
          body {
            touch-action: manipulation;
            -webkit-overflow-scrolling: clip;
            -webkit-user-select: none;
            -webkit-touch-callout: none;
            -webkit-text-size-adjust: 100%;
            font-feature-settings: 'kern' 1;
          }
          
          input, button {
            -webkit-user-select: text;
            -webkit-touch-callout: default;
          }
          
          button:focus-visible, input:focus-visible {
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
          
          @supports (height: 100dvh) {
            html, body { height: 100dvh; }
          }
        `}</style>
      </head>
      <body className="font-sans antialiased h-full overflow-hidden">
        <div className="relative w-full h-full">
          {children}
        </div>
      </body>
    </html>
  )
}
