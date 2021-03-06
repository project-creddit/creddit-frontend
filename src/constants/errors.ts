const ERRORS = Object.freeze({
  emailInvalid: '올바른 이메일 주소를 입력해주세요.',
  emailRequired: '이메일을 입력해주세요.',
  emailDuplicate: '이미 존재하는 이메일 주소입니다.',
  emailNotFound: '존재하지 않는 이메일 주소입니다.',
  nicknameInvalid: '닉네임에는 -, _를 제외한 특수문자가 들어갈 수 없습니다.',
  nicknameShort: '닉네임 길이는 2자 이상이어야 합니다.',
  nicknameLong: '닉네임 길이는 10자 이하여야 합니다.',
  nicknameRequired: '닉네임을 입력해주세요.',
  nicknameDuplicate: '이미 존재하는 닉네임입니다.',
  passwordInvalid:
    '비밀번호는 영어 대소문자, 숫자, 특수문자를 모두 사용해야 합니다.',
  passwordShort: '비밀번호 길이는 8자 이상이어야 합니다.',
  passwordLong: '비밀번호 길이는 20자 이하여야 합니다.',
  passwordRequired: '비밀번호를 입력해주세요.',
  newPasswordConfirmInvalid: '새 비밀번호가 일치하지 않습니다.',
  tempPasswordInvalid: '임시 비밀번호가 일치하지 않습니다.',
  emailOrPasswordInvalid: '이메일 또는 비밀번호가 잘못되었습니다.',
  contentLong: '글 내용은 2,000자 이상 작성할 수 없습니다.',
  commentLong: '댓글 내용은 2,000자 이상 작성할 수 없습니다.',
  commentRequired: '댓글이 비어있습니다.',
  imageLarge: '10MB 이하의 이미지만 업로드할 수 있습니다.',
  imageWrongType: 'JPG, PNG, GIF 파일만 업로드할 수 있습니다.',
});

export default ERRORS;
