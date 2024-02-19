export interface AuthFields {
  username: string;
  password: string;
}

export interface Tasks {
  _id: string;
  title: string;
  description: string | null;
  status: string;
}