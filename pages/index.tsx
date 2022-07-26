import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router';

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter()

  return (
    <div>
      {session ? (
        <>
          accountId: {session.user.accountId} <br/>
          name: {session.user.name} <br/>
          userId: {session.user.userId} <br/>
          <button onClick={()=>{signOut()}}>Sign out</button>
        </>
      ):(<>
        Not signed in <br/>
        <button onClick={()=>{signIn()}}>Sign in</button>
        <button onClick={()=>{signIn("google")}}>google Sign in</button>
        <button onClick={()=>{router.push("/account/new")}}>アカウント作成</button>
      </>)}
    </div>
  )
}