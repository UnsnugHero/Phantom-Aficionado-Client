import { History } from 'history';

// http

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  data: {
    accessToken: string;
  };
}

// props

export interface LoginCardProps {
  history: History;
}

export interface LoginFormProps {
  history: History;
}
