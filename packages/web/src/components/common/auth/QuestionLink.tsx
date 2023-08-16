import Link from 'next/link';
import { themedPalette } from '@/styles/palette';
import styled from '@emotion/styled';

interface Props {
  question?: string;
  name: string;
  to: string;
  className?: string;
}

function QuestionLink({ question, name, to, className }: Props) {
  return (
    <Block className={className}>
      {question && question} <Link href={to}>{name}</Link>
    </Block>
  );
}

const Block = styled.div`
  color: ${themedPalette.text2};
  font-size: 14px;

  a {
    color: ${themedPalette.primary1};
    &:hover {
      text-decoration: underline;
    }
  }

  &.text-center {
    text-align: center;
  }
`;

export default QuestionLink;
