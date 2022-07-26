import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface Props {
  children?: React.ReactNode
}

/**
 * ログインが必要なページ用のラッパーコンポーネント。
 */
export const RequireLogin: React.VFC<Props> = ({ children }) => {
  const router = useRouter()
  const { data:session, status } = useSession();

  useEffect(() => {
    if (!session) router.push("/login");
  }, [session])

  if (status == "loading") {return <div>Loading...</div>}

  return <>{children}</>
}