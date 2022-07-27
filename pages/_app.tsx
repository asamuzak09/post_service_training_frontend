import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { RequireLogin } from '../components/common/auth/RequireLogin'

function MyApp({ Component, pageProps: { session, ...pageProps }}: AppProps) {
  return(
    <div>
      <SessionProvider session={session}>
        <RequireLogin />
        <Component {...pageProps} />
      </SessionProvider>
    </div>
    
  )
}


export default MyApp
