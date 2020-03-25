export type TUser = {
  email: string;
  token: string;
  id: number;
  name: string;
};

export type TUserCredential = {
  email: string;
  password: string;
  name?: string;
};

export type TBlogFields = {
  blogHeader: string;
  blogContent: string;
  tags: string[];
};

export interface TCreateBlog extends TBlogFields {
  token: string;
}

export interface TCreateBlogFn extends TBlogFields {
  user: TCreatorOfBlog;
}

export type TBlog = {
  createdAt: string;
  blogHeader: string;
  blogContent: string;
  userId: string;
};

export type TCreatorOfBlog = {
  email: string;
  name: string;
  _id?: string;
};

export interface TGetMyBlogsQueryParameter extends TFilterDBSearch {
  token: string;
}

export type TFilterDBSearch = {
  createdAt?: string;
  beforeCurrentData?: boolean;
  tags?: string[];
};
