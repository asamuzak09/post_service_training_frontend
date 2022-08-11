import axios from "axios";
import { Post } from "../../types/post";

export const getUserPosts = (): Array<Post> => {
    return( 
		[
			{
				postUser:{
					name:"江田",
					accountId:"@asamuzak",
				},

				id:"1",
				content:"投稿1",
				date:"2022/08/06",
			},
			{
				postUser:{
					name:"しおり",
					accountId:"@shiori",
				},

				id:"2",
				content:"投稿2",
				date:"2022/08/07",
			}
		]
	)
}