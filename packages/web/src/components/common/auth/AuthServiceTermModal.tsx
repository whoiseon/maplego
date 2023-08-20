import styled from '@emotion/styled';
import Modal from '../system/Modal';
import { themedPalette } from '@/styles/palette';
import { media } from '@/lib/media';
import WallPaper from '@/assets/images/vectors/wallpaper-01.svg';

interface Props {
  type: 'service' | 'privacy';
  onToggle: () => void;
}

const ServiceTermAndCondition = `MS인 서비스 이용 약관

1. 약관의 수락

이 서비스 이용 약관(이하 "약관")은 MS인 (이하 "MS인")과 이용자(이하 "사용자") 간의 서비스 이용에 대한 조건을 규정합니다. 본 약관에 동의함으로써 사용자는 약관의 내용을 숙지하였으며, 이에 동의하는 것으로 간주됩니다.

2. 서비스 제공 및 이용

MS인은 커뮤니티 사이트를 통해 게시물 작성, 댓글 등록, 사진 및 동영상 업로드, 정보 공유 등 다양한 서비스를 제공합니다.
사용자는 본 약관을 준수하며, MS인이 제공하는 서비스를 이용할 수 있습니다.
사용자는 개인정보의 보호와 관련된 사항에 대해 MS인의 개인정보처리방침을 숙지하고 준수하여야 합니다.

3. 사용자의 책임과 권한

사용자는 자신이 게시한 게시물에 대한 모든 책임을 지며, 타인의 권리를 침해하지 않는 범위 내에서 게시물을 작성해야 합니다.
사용자는 MS인이 제공하는 서비스를 악용하지 않아야 하며, 타인의 정보를 무단으로 수집하거나 다른 사용자의 접속을 방해하거나 스팸을 전송하는 행위를 해서는 안 됩니다.

4. 게시물의 관리

MS인은 사용자의 게시물을 사전 통지 없이 삭제하거나 수정할 수 있습니다.
사용자가 게시한 게시물이 타인의 권리를 침해하거나 불법적인 내용을 포함하는 경우, 해당 게시물은 즉시 삭제될 수 있습니다.

5. 책임의 제한

MS인은 기술적인 결함이나 서비스 중단으로 발생하는 손해에 대해 책임을 지지 않습니다. 또한 사용자 간의 분쟁이 발생한 경우, MS인은 이에 대한 책임을 지지 않으며 중재에 관여하지 않습니다.

6. 약관의 변경 및 해지

MS인은 약관을 변경할 권리를 가지며, 변경된 약관은 사이트에 게시함으로써 효력을 발생합니다. 사용자는 변경된 약관에 동의하지 않을 경우 회원 탈퇴를 선택할 수 있습니다.

7. 기타 사항
본 약관에 명시되지 않은 사항은 관련 법령 및 MS인의 지침에 따릅니다.

본 약관에 동의하고 MS인의 서비스를 이용하고자 하는 사용자는 본 약관 내용을 숙지하고 준수하여야 합니다.

마지막 수정일: 2023-08-16
`;

const PrivacyPolicy = `MS인 개인정보 보호 정책

1. 개인정보 수집 및 이용목적

[MS인] (이하 "회사")는 회원 가입, 서비스 이용 및 제공, 고객지원 등을 위해 사용자의 개인정보를 수집합니다.
MS인은 개인정보를 다음 목적을 위해 사용합니다: 회원 관리, 서비스 제공 및 개선, 안전한 거래 보장, 고객 문의 응답 등

2. 수집하는 개인정보 항목

MS인은 필요한 최소한의 개인정보만을 수집하며, 회원 가입 시에는 아래 정보를 요청할 수 있습니다: 이름, 이메일 주소, 연락처 등
서비스 이용 중 추가 정보가 필요한 경우 사전 동의를 받은 후에만 해당 정보를 수집합니다.

3. 개인정보의 제3자 제공

MS인은 사용자의 개인정보를 제3자에게 제공하지 않습니다. 다만, 사용자의 사전 동의가 있거나 법령에 따른 경우 예외적으로 제공할 수 있습니다.
제3자 제공 시에는 해당 목적과 정보의 범위 등을 명확하게 고지하고 사용자의 동의를 얻습니다.

4. 개인정보 보호 조치

MS인은 사용자의 개인정보를 보호하기 위해 관련 법령에 따라 안전한 보안 시스템을 유지하고 관리합니다.
사용자 비밀번호는 암호화되어 저장되며, MS인 직원 외에는 접근할 수 없습니다.

5. 개인정보의 보유기간

MS인은 사용자의 개인정보를 수집 및 이용목적 달성 시까지 보유하며, 이후에는 파기합니다.
단, 관련 법령에 따라 보존할 필요성이 있는 경우에는 해당 기간 동안 보관합니다.

6. 개인정보 열람 및 수정

사용자는 언제든지 자신의 개인정보를 열람하고 수정할 수 있습니다. MS인의 개인정보 처리방침을 참고하여 절차를 따릅니다.

7. 개인정보 보호책임자

사용자는 개인정보 관련 문의나 불만을 MS인의 개인정보 보호책임자에게 문의할 수 있습니다.
개인정보 보호책임자의 연락처: 010-9593-xxxx

8. 기타 사항
본 개인정보 보호 정책에 명시되지 않은 사항은 관련 법령 및 MS인의 지침에 따릅니다.

본 개인정보 보호 정책에 동의하고 MS인의 서비스를 이용하고자 하는 사용자는 본 정책 내용을 숙지하고 준수하여야 합니다.

마지막 수정일: 2023-08-16
`;

const dataMap = {
  service: {
    title: '서비스 이용 약관',
    content: ServiceTermAndCondition,
  },
  privacy: {
    title: '개인정보 보호 정책',
    content: PrivacyPolicy,
  },
};

function AuthServiceTermModal({ type, onToggle }: Props) {
  const { title, content } = dataMap[type];
  return (
    <Modal title={title} onToggle={onToggle} hasCancel={false}>
      <ModalBlock>
        <textarea readOnly>{content}</textarea>
        <div>
          <WallPaper />
          <p>MS인 {title}</p>
        </div>
      </ModalBlock>
    </Modal>
  );
}

const ModalBlock = styled.div`
  display: flex;
  gap: 1rem;

  textarea {
    resize: none;
    border: 1px solid ${themedPalette.border3};
    background: ${themedPalette.bg_page1};
    border-radius: 4px;
    padding: 0.75rem;
    font-size: 0.875rem;
    width: 100%;
    height: 84vh;
    outline: none;
    overflow-y: auto;

    ${media.mobile} {
      width: 380px;
      height: 600px;
    }
  }

  div {
    display: none;

    ${media.mobile} {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;
      justify-content: center;
      width: 380px;
      height: 600px;
    }

    p {
      font-size: 1.25rem;
      font-weight: bold;
    }
  }
`;

export default AuthServiceTermModal;
