import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const RequireLogin: React.FC = ({}) => {
  const router = useRouter()
  const notRequireLoginPaths = ["/","/login","/account/new"]
  const { status } = useSession()

  useEffect(() => {
    // ログイン不要のURLでなく、認証がされていない場合はrootに飛ばす
    if(notRequireLoginPaths.filter((path)=>{return path === router.pathname}).length === 0){
      if (status === "unauthenticated") router.push("/");
    }
  }, [status])

  if (status == "loading") {return <div>Loading...</div>}

  return <></>
}