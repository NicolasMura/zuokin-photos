export class LoginResponse {
  access_token: string;
  status: number;
  logged: boolean;
  message: string;

  constructor(
    access_token: string,
    status: number,
    logged: boolean,
    message: string
  ) {
    this.access_token = access_token;
    this.status = status;
    this.logged = logged;
    this.message = message;
  }
}
