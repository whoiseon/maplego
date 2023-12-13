import { useGetRankList } from '@/lib/hooks/queries/game/useGetRankList';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import styled from '@emotion/styled';
import { themedPalette } from '@/styles/palette';
import Card from '@/components/common/system/Card';
import RankCharacter from '@/components/desktop/maple/rank/RankCharacter';

function MapleRankList() {
  const page = useSearchParams().get('page') || 1;
  const target = useSearchParams().get('target') || 'all';
  const world = useSearchParams().get('world') || 0;

  const { data } = useGetRankList(target, Number(page), Number(world));

  const renderRankListHeader = useMemo(() => {
    switch (target) {
      case 'all':
        return (
          <tr>
            <th>순위</th>
            <th>캐릭터</th>
            <th>경험치</th>
            <th>인기도</th>
            <th>길드</th>
          </tr>
        );
      case 'pop':
        return (
          <tr>
            <th>순위</th>
            <th>캐릭터</th>
            <th>경험치</th>
            <th>인기도</th>
            <th>길드</th>
          </tr>
        );
      case 'union':
        return (
          <tr>
            <th>순위</th>
            <th>캐릭터</th>
            <th>유니온 레벨</th>
            <th>유니온 전투력</th>
          </tr>
        );
      case 'dojang':
        return (
          <tr>
            <th>순위</th>
            <th>캐릭터</th>
            <th>기록</th>
            <th>클리어 타임</th>
          </tr>
        );
      case 'seed':
        return (
          <tr>
            <th>순위</th>
            <th>캐릭터</th>
            <th>기록</th>
            <th>클리어 타임</th>
          </tr>
        );
      default:
        return (
          <tr>
            <th>순위</th>
            <th>캐릭터</th>
            <th>경험치</th>
            <th>인기도</th>
            <th>길드</th>
          </tr>
        );
    }
  }, [target]);

  const renderRankList = useMemo(() => {
    return data?.payload.data.map((rank) => {
      switch (target) {
        case 'all':
          return (
            <tr key={rank.characterName}>
              <td>{rank.rank}</td>
              <td>
                <RankCharacter
                  server={Number(rank.server)}
                  characterImage={rank.characterImage}
                  characterName={rank.characterName}
                  level={Number(rank.level)}
                  job={rank.jobName}
                  target={target}
                />
              </td>
              <td>{rank.exp}</td>
              <td>{rank.pop}</td>
              <td>{rank.guild}</td>
            </tr>
          );
        case 'pop':
          return (
            <tr key={rank.characterName}>
              <td>{rank.rank}</td>
              <td>
                <RankCharacter
                  server={Number(rank.server)}
                  characterImage={rank.characterImage}
                  characterName={rank.characterName}
                  level={Number(rank.level)}
                  job={rank.jobName}
                  target={target}
                />
              </td>
              <td>{rank.exp}</td>
              <td>{rank.pop}</td>
              <td>{rank.guild}</td>
            </tr>
          );
        case 'union':
          return (
            <tr key={rank.characterName}>
              <td>{rank.rank}</td>
              <td>
                <RankCharacter
                  server={Number(rank.server)}
                  characterImage={rank.characterImage}
                  characterName={rank.characterName}
                  level={Number(rank.level)}
                  job={rank.jobName}
                  target={target}
                />
              </td>
              <td>{rank.unionLevel}</td>
              <td>{rank.unionPower}</td>
            </tr>
          );
        case 'dojang':
          return (
            <tr key={rank.characterName}>
              <td>{rank.rank}</td>
              <td>
                <RankCharacter
                  server={Number(rank.server)}
                  characterImage={rank.characterImage}
                  characterName={rank.characterName}
                  level={Number(rank.level)}
                  job={rank.jobName}
                  target={target}
                />
              </td>
              <td>{rank.record} 층</td>
              <td>{rank.clearTime}</td>
            </tr>
          );
        case 'seed':
          return (
            <tr key={rank.characterName}>
              <td>{rank.rank}</td>
              <td>
                <RankCharacter
                  server={Number(rank.server)}
                  characterImage={rank.characterImage}
                  characterName={rank.characterName}
                  level={Number(rank.level)}
                  job={rank.jobName}
                  target={target}
                />
              </td>
              <td>{rank.record} 층</td>
              <td>{rank.clearTime}</td>
            </tr>
          );
        default:
          return (
            <tr key={rank.characterName}>
              <td>{rank.rank}</td>
              <td>
                <RankCharacter
                  server={Number(rank.server)}
                  characterImage={rank.characterImage}
                  characterName={rank.characterName}
                  level={Number(rank.level)}
                  job={rank.jobName}
                  target={target}
                />
              </td>
              <td>{rank.exp}</td>
              <td>{rank.pop}</td>
              <td>{rank.guild}</td>
            </tr>
          );
      }
    });
  }, [data]);

  return (
    <Block>
      <Card>
        <StyledTable>
          <Thead>{renderRankListHeader}</Thead>
          <Tbody>{renderRankList}</Tbody>
        </StyledTable>
      </Card>
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px 0;
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
`;

const Thead = styled.thead`
  th {
    height: 46px;
    color: ${themedPalette.text4};
    font-size: 13px;
    font-weight: 500;
    border-bottom: 1px solid ${themedPalette.border3};

    &:nth-of-type(1) {
      width: 80px;
    }

    &:nth-of-type(2) {
      width: 400px;
    }
  }
`;

const Tbody = styled.tbody`
  td {
    height: 56px;
    color: ${themedPalette.text2};
    font-size: 13px;
    text-align: center;
    border-bottom: 1px solid ${themedPalette.border4};
    padding: 0 8px;
    font-weight: 500;

    &:nth-of-type(1) {
      color: ${themedPalette.text2};
      font-size: 18px;
    }

    &:nth-of-type(2) {
      text-align: left;
      font-size: 14px;
      font-weight: 600;
    }
  }
`;

export default MapleRankList;
