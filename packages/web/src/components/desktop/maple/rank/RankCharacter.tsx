import styled from '@emotion/styled';
import ServerIcon from '@/components/common/maple/ServerIcon';
import { themedPalette } from '@/styles/palette';

interface Props {
  server: number;
  characterImage: string;
  characterName: string;
  level: number;
  job: string;
  target: string;
}

function RankCharacter({
  server,
  characterImage,
  characterName,
  level,
  job,
  target,
}: Props) {
  return (
    <Block>
      <CharImage>
        <img src={characterImage} alt={characterName} />
      </CharImage>
      <CharInfoBox>
        <CharName>
          <ServerIcon code={server} />
          <span>{characterName}</span>
        </CharName>
        <CharInfo>
          {target !== 'union' && (
            <>
              <span>Lv.{level}</span>
              <span>ˑ</span>
            </>
          )}
          <span>{job}</span>
        </CharInfo>
      </CharInfoBox>
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  align-items: center;
  gap: 0 8px;
`;

const CharImage = styled.div`
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
  }
`;

const CharInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px 0;
`;

const CharName = styled.div`
  display: flex;
  align-items: center;
  gap: 0 4px;

  span {
    font-size: 14px;
    font-weight: 600;
    color: ${themedPalette.text1};
  }
`;

const CharInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  font-size: 13px;
  color: ${themedPalette.text2};
`;

export default RankCharacter;
