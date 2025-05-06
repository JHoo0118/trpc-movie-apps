"use client";

import { useQuery } from "@tanstack/react-query";
import { trpc } from "./utils/trpcClient";

export const Hello = () => {
  const { data } = useQuery(trpc.hello.queryOptions());
  return <div>{data}</div>;
};
