export interface UserState {
  isLoggedIn: boolean;
  userDetails: {
    id?: string;
    name: string;
    email: string;
    token: string;
  } | null;
}
export interface RegisterFormInputs {
  id?: string;
  name: string;
  email: string;
  password: string;
}
export interface LoginFormInputs {
  email: string;
  password: string;
}
export interface ProfileFormData {
  name: string;
  email: string;
}