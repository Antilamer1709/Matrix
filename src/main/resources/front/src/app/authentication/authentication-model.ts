export class UserDTO {
  id: number;
  username: string;
  password: string;
  rememberMe: boolean;
}

export class RegistrationModel {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  confirmPassword: string;
}
