"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { trpc } from "../../../utils/trpc";
import { httpBatchLink } from "@trpc/client";

const queryClient = new QueryClient();
const TRPCProvider = ({ children }: { children: React.ReactNode }) => {
  const trpcclient = trpc.createClient({
    links: [
      httpBatchLink({
        url: "http://localhost:3000/trpc",
      }),
    ],
  });
  return (
    <trpc.Provider client={trpcclient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};

export default TRPCProvider;
