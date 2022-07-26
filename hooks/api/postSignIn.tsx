import axios from "axios";

type postSignInRequestBody = {
    accountId: string,
    encryptPassword: string
}

export const postSignIn = async (payload: postSignInRequestBody) => {
    const data = await axios
			.post(
				`${process.env.NEXT_PUBLIC_BACK_END_URL}/account/sign_in`,
				payload,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
			.then((response) => {
				return response.data;
			}).catch((error)=>{
                console.log(`error:${error}`)
            })

    return await data;
}