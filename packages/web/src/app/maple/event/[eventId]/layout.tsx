import { ReactNode } from 'react';
import EventViewLayout from '@/components/desktop/maple/event/EventViewLayout';

function EventViewPageLayout({ children }: { children: ReactNode }) {
  return <EventViewLayout>{children}</EventViewLayout>;
}

export default EventViewPageLayout;
