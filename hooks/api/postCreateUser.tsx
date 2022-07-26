import axios from "axios";

type postCreateUserRequestBody = {
	name: string,
    accountId: string,
    encryptPassword: string
}

export const postCreateUser = async (payload: postCreateUserRequestBody) => {
    const data = await axios
			.post(
				`${process.env.NEXT_PUBLIC_BACK_END_URL}/account/create`,
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