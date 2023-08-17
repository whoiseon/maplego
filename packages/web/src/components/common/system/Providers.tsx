"use client";

import { store } from "@/modules/store";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import GlobalStyle from "@/styles/GlobalStyle";
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface Props {
  children: React.ReactNode;
}

function Providers({ children }: Props) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ReactQueryDevtools />
        <GlobalStyle />
        <ThemeProvider attribute="class">{children}</ThemeProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default Providers;
