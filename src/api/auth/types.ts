export type User = {
  id: string;
  username: string;
  email: string;
  access_token: string;
};

export type PostLoginBody = {
  username: string;
  password: string;
};

export type CreateUserBody = {
  username: string;
  password: string;
};
