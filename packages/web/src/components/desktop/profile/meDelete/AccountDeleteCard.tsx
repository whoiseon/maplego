import MeCard from '@/components/desktop/profile/MeCard';
import styled from '@emotion/styled';
import TrashIcon from '@/assets/images/vectors/trash-icon.svg';
import { themedPalette } from '@/styles/palette';
import { useGetMyAccount } from '@/lib/hooks/queries/me/useGetMyAccount';
import Input from '@/components/common/system/Input';
import { useInput } from '@/lib/hooks/useInput';

function AccountDeleteCard() {
  const { data: meData } = useGetMyAccount();
  const [deleteInput, onChangeDeleteInput] = useInput('');

  const deleteText: string = '이해했으며, 계정을 삭제하겠습니다.';

  const onClickDeleteAccount = () => {
    console.log('delete');
  };

  return (
    <MeCard
      title="계정삭제"
      icon={<TrashIcon />}
      onEdit={onClickDeleteAccount}
      buttonVariant="danger"
      buttonDisabled={deleteInput !== deleteText}
      buttonText="삭제"
    >
      <DeleteBox>
        <Precautions>
          <h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="icon-md text-icon-default min-w-[18px]"
              role="img"
            >
              <g id="info-circle">
                <path
                  id="Solid"
                  fillRule="evenodd"
                  d="M12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1ZM12 7C11.4477 7 11 7.44772 11 8C11 8.55228 11.4477 9 12 9H12.01C12.5623 9 13.01 8.55228 13.01 8C13.01 7.44772 12.5623 7 12.01 7H12ZM13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12V16C11 16.5523 11.4477 17 12 17C12.5523 17 13 16.5523 13 16V12Z"
                  clipRule="evenodd"
                ></path>
              </g>
            </svg>
            주의사항
          </h2>
          <ul>
            <li>
              사용하고 계신 계정
              <em>
                {meData?.displayName}({meData?.username})
              </em>
              은 삭제 시 재사용 및 복구가 불가능합니다.
            </li>
            <li>
              삭제 후 회원정보, MP 등 서비스 이용기록은 모두 삭제되며, 삭제된
              데이터는 복구할 수 없습니다.
            </li>
            <li>
              삭제 후 커뮤니티 서비스, 경매장 등 직접 등록하신 모든 컨텐츠는
              삭제되지 않고 유지됩니다.
            </li>
            <li>
              보안을 위해 <em>이메일 인증</em> 후 삭제를 진행할 수 있습니다.
            </li>
          </ul>
        </Precautions>
        <ConfirmBox>
          <div className="confirm-text">
            <h2>삭제 확인</h2>
            <p>
              계정 삭제를 계속 진행하려면 아래 필드에 <em>{deleteText}</em>를
              입력하세요.
            </p>
          </div>
          <Input
            placeholder={deleteText}
            value={deleteInput}
            onChange={onChangeDeleteInput}
          />
        </ConfirmBox>
      </DeleteBox>
    </MeCard>
  );
}

const DeleteBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem 0;
  padding: 0 1.5rem 1.5rem;
`;

const Precautions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem 0;
  background: ${themedPalette.bg_element3};
  border-radius: 4px;
  padding: 1rem;
  border: 1px solid ${themedPalette.border3};
  box-shadow: ${themedPalette.shadow2};

  h2 {
    display: flex;
    align-items: center;
    gap: 0 0.5rem;
    font-size: 16px;
    color: ${themedPalette.danger2};

    svg {
      width: 18px;
      height: 18px;
    }
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 0.875rem 0;
    padding: 0 1rem;

    li {
      list-style: disc;

      em {
        font-style: normal;
        padding: 3px 6px 4px;
        border-radius: 4px;
        background: ${themedPalette.bg_page1};
        border: 1px solid ${themedPalette.border3};
        box-shadow: ${themedPalette.shadow2};
        margin: 0 0.25rem;
        color: ${themedPalette.text1};
      }
    }
  }
`;

const ConfirmBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem 0;

  .confirm-text {
    display: flex;
    flex-direction: column;
    gap: 0.5rem 0;

    h2 {
      font-size: 15px;
      font-weight: 600;
    }

    em {
      font-style: normal;
      padding: 3px 6px 4px;
      border-radius: 4px;
      background: ${themedPalette.bg_page1};
      border: 1px solid ${themedPalette.border3};
      box-shadow: ${themedPalette.shadow2};
      margin: 0 0.25rem;
      color: ${themedPalette.text1};
    }

    p {
      font-size: 14px;
      color: ${themedPalette.text3};
    }
  }

  input {
    font-size: 16px;
    height: 52px;

    &:focus {
      border: 1px solid ${themedPalette.border2};
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
    }
  }
`;

export default AccountDeleteCard;
