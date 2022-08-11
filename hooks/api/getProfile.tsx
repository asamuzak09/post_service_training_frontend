import axios from "axios";
import { Profile } from "../../types/profile";

export const getProfile = async (userId: number): Promise<Profile> => {
    const data = await axios
			.get(
				`${process.env.NEXT_PUBLIC_BACK_END_URL}/profile/${userId}`,
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

	 return {
		 profileName: data.name,
		 accountId: data.accountId,
		 statusMessage: data.statusComment,
		 location: data.location,
		 birthday: data.birthday,
		 followCount: data.followCount || "0",
		 followerCount: data.followerCount || "0",
		 iconUrl: data.iconUrl,
		 backGroundUrl: data.backGroundImageUrl,
	 }
}