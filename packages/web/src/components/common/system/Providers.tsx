'use client';

import { store } from '@/modules/store';
import { ThemeProvider } from 'next-themes';
import { Provider } from 'react-redux';

interface Props {
  children: React.ReactNode;
}

function Providers({ children }: Props) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class">{children}</ThemeProvider>
    </Provider>
  );
}

export default Providers;
