export interface ChangePasswordResponseType {
  changed: boolean;
  payload?: {
    field: 'currentPassword' | 'newPassword';
  };
}
