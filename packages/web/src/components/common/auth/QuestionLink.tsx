import tw, { styled } from "twin.macro";
import Link from "next/link";
import { css } from "@emotion/react";
import { themedPalette } from "@/styles/palette";

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

const Block = styled.div(() => [
  tw`
    text-text2
  `,
  css`
    a {
      color: ${themedPalette.primary1};
      &:hover {
        text-decoration: underline;
      }
    }
  `,
]);

export default QuestionLink;
