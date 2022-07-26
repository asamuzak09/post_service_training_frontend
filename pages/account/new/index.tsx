import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { sha512 } from "js-sha512";
import { postCreateUser } from "../../../hooks/api/postCreateUser";

interface IFormValues {
    name?: string;
  accountId?: string;
  password?: string;
}
type Props = {}

const CreateAccount: React.FC<Props> = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm<IFormValues>();
  const createUser = async (data: IFormValues) => {
    if(data.name && data.accountId && data.password){
        await postCreateUser(
        {
            name: data.name, 
            accountId: data.accountId,
            encryptPassword: data.password,
        }
        ).then((res) => {
          if (res?.error) {
            setError("プロフィール名,ID,Passwordを正しく入力してください");
          } else {
            alert("アカウント作成成功")
            router.push("/");
          }
        });
    }else{
        setError("プロフィール名,ID,Passwordを正しく入力してください");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <form onSubmit={handleSubmit(createUser)}>
        <div style={{ marginTop: "15px" }}>
          <input
            type="text"
            placeholder="プロフィール名"
            {...register("name")}
          ></input>
        </div>
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
            アカウント作成
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAccount;