export const createAuthEmail = (code: number) => {
  const subject = 'Maplego - 회원가입 인증코드';
  const body = `
    <div style="max-width: 100%; width: 640px; margin: 0 auto; border: 1px solid #ECECEC; border-top: 2px solid #ff8537">
      <div style="padding: 1.5rem;">
        <a href="https://maplego.me"><img src="https://maplego.me/images/media/logo-text.svg" style="display: block; width: 108px;" alt="maplego logo"/></a>
        <div style="max-width: 100%; width: 400px; margin: 0 auto; margin-top: 4rem; text-align: center; font-size: 24px">
          메이플고 <b style="color: #ff8537">인증번호</b>가 <br />
            발송되었습니다.
        </div>
        <div style="max-width: 100%; width: 400px; margin: 0 auto; text-align: center; margin-top: 1.5rem; font-size: 16px">
          회원님의 가입 인증번호입니다.
        </div>
        <div style="max-width: 100%; width: 400px; margin: 0 auto; padding: 1rem; text-align: center; background: #f8f9fa; border: 1px solid #dee2e6; box-sizing: border-box; border-radius: 4px; color: #666; margin-top: 1.5rem; box-sizing: border-box; font-size: 24px">
            <b>${code}</b>
        </div>
        <div style="max-width: 100%; width: 400px; text-align:center; display:block; margin: 0 auto; line-height: 1.5; font-size: 14px; margin-top: 1rem; color: #999; margin-bottom: 2.5rem"> 발급된 인증번호를 진행 중인 회원가입 페이지에 입력해주세요!</div>
      </div>
      <div style="border-top: 1px solid #ff8537; background: #f8f9fa; padding: 1.5rem 0; color: #666; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 6px 0">
            <div style="max-width: 100%;font-size: 14px;">
          본 메일은 수신이 불가능한 발신전용 입니다.
        </div>
        <div style="font-size: 14px;">
          © maplego all rights reserved.
        </div>
      </div>
    </div>
  `;
  return { subject, body };
};
