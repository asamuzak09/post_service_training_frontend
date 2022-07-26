import { useState } from "react";
import { getCsrfToken, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { CtxOrReq } from "next-auth/client/_utils";
import { useForm } from "react-hook-form";
import { sha512 } from "js-sha512";

// POSTリクエスト（サインイン・サインアウトなど）に必要なCSRFトークンを返却する
export const getServerSideProps = async (context: CtxOrReq | undefined) => {
  return {
    props: {
      title: "login",
      csrfToken: await getCsrfToken(context),
    },
  };
};

interface IFormValues {
  accountId?: string;
  password?: string;
}
type Props = {
  csrfToken: string | undefined
}

const Login: React.FC<Props> = ({ csrfToken }) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm<IFormValues>();
  const signInUser = async (data: IFormValues) => {
    await signIn("credentials", {
      redirect: false,
      accountId: data.accountId,
      password: data.password,
      callbackUrl: `${window.location.origin}`,
    }).then((res) => {
      if (res?.error) {
        console.log(res)
        setError("ID,Passwordを正しく入力してください");
      } else {
        router.push("/");
      }
    });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <form onSubmit={handleSubmit(signInUser)}>
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <div style={{ marginTop: "15px" }}>
          <input
            type="text"
            placeholder="アカウントID"
            {...register("accountId")}
          ></input>
        </div>
        <div>
          <label htmlFor="password"></label>
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              setValueAs: (value) => sha512(value),
            })}
          ></input>
        </div>
        <p>
          <span style={{ color: "red" }}>{error}</span>
        </p>
        <div>
          <button
            type="submit"
          >
            ログイン
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;