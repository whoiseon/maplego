import LinksHeader from '@/components/desktop/system/LinksHeader';
import TalkBoard from '@/components/desktop/talk/TalkBoard';

export interface TalkSlug {
  board: string;
  category?: string;
}

function getCurrentPath(slug: string[]): TalkSlug {
  return {
    board: slug[0],
    category: slug[1] || '',
  };
}

function TalkSlugPage({ params }: { params: { talkSlug: string[] } }) {
  const slug = getCurrentPath(params.talkSlug);
  return <TalkBoard slug={slug} />;
}

export default TalkSlugPage;
