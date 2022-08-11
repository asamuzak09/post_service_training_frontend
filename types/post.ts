type postUser = {
    accountId: string,
    name: string
}

export type Post = {
    id:string,
	content:string,
	date:string,
	postUser:postUser,
}