export const signUpFormErrors = {
  displayName: {
    required: {
      value: true,
      message: '별명을 입력해주세요!',
    },
    maxLength: {
      value: 16,
      message: '별명은 16자 이하로 입력해주세요!',
    },
    minLength: {
      value: 2,
      message: '별명은 2글자 이상으로 입력해주세요!',
    },
    pattern: {
      value: /^[a-zA-Z가-힣0-9]+$/,
      message: '영문, 한글, 숫자만 입력 가능합니다!',
    },
  },
  username: {
    required: {
      value: true,
      message: '아이디를 입력해주세요!',
    },
    maxLength: {
      value: 20,
      message: '아이디는 20자 이하로 입력해주세요!',
    },
    minLength: {
      value: 4,
      message: '아이디는 4글자 이상으로 입력해주세요!',
    },
    pattern: {
      value: /^[a-zA-Z가-힣0-9]+$/,
      message: '영문, 한글, 숫자만 입력 가능합니다!',
    },
  },
  password: {
    required: {
      value: true,
      message: '비밀번호를 입력해주세요!',
    },
    minLength: {
      value: 8,
      message: '비밀번호는 8자 이상으로 입력해주세요!',
    },
  },
};

export const signInFormErrors = {
  username: {
    required: {
      value: true,
      message: '이메일을 입력해주세요!',
    },
  },
  password: {
    required: {
      value: true,
      message: '비밀번호를 입력해주세요!',
    },
  },
};
