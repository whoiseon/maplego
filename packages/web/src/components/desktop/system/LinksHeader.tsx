import styled from '@emotion/styled';
import Card from '@/components/common/system/Card';
import { themedPalette } from '@/styles/palette';
import Button from '@/components/common/system/Button';
import { useMemo } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';

interface Props {
  title: string;
  description?: string;
  links?: {
    name: string;
    href: string;
  }[];
}

function LinksHeader({ title, description, links }: Props) {
  const pathname = usePathname();
  const renderLinks = useMemo(
    () =>
      links?.map((link) => {
        const isActive = pathname.includes(link.href);
        return (
          <Button
            key={link.name}
            href={`/talk/${link.href}`}
            variant={isActive ? 'primary' : 'gray'}
            size="small"
          >
            {link.name}
          </Button>
        );
      }),
    [pathname],
  );

  return (
    <Card>
      <Block>
        <TitleBox>
          <h2>{title}</h2>
          {description && <span>{description}</span>}
        </TitleBox>
        {links && <LinksBox>{renderLinks}</LinksBox>}
      </Block>
    </Card>
  );
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px 0;
  padding: 20px;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0 8px;

  h2 {
    font-size: 18px;
    font-weight: 600;
    color: ${themedPalette.text1};
  }

  span {
    font-size: 14px;
    color: ${themedPalette.text3};
  }
`;

const LinksBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0 8px;

  a {
    height: 32px;
  }
`;

export default LinksHeader;
