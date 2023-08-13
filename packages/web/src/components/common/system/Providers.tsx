"use client";

import { store } from "@/modules/store";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import GlobalStyle from "@/styles/GlobalStyle";
import React from "react";

interface Props {
  children: React.ReactNode;
}

function Providers({ children }: Props) {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <ThemeProvider attribute="class">{children}</ThemeProvider>
    </Provider>
  );
}

export default Providers;
