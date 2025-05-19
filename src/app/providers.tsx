"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { store } from "@store/index";
import { Provider } from "react-redux";
import { ThemeProvider } from 'next-themes';
import '@services/axios.global'

const Providers = ({children}: {children: React.ReactNode}) => {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute='class' defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  )
}

export default Providers;
