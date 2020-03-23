export type  TUser = {
    email: string;
    token: string;
    id: number;
    blogsId: Array<number>;
    name: string;
}



export type TUserCredential = {
    email: string;
    password: string;
    name: string;
}

export type TCreateBlog = {
    token: string;
    blogHeader: string;
    blogContent: string;
    tags: string[];

}

export type TBlog = {
    createdAt: string;
    blogHeader: string;
    blogContent: string;
    userId: string
}
