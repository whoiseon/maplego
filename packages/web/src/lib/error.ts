const ALREADY_EXISTS = 'AlreadyExists';
const WRONG_CREDENTIALS = 'WrongCredentials';
const UNKNWON = 'Unknown';
const USER_ALREADY_EXISTS = 'UsernameAlreadyExists';

export function appError(message: string, payload?: any): string {
  switch (message) {
    case ALREADY_EXISTS:
      const field = payload?.field === 'username' ? '아이디' : '별명';
      return `이미 사용중인 ${field} 입니다!`;
    case WRONG_CREDENTIALS:
      return '잘못된 계정 정보입니다!';

    case USER_ALREADY_EXISTS:
      return '이미 사용중인 아이디 또는 별명입니다!';
    case UNKNWON:
      return '알 수 없는 오류';
    default:
      return '알 수 없는 오류';
  }
}
