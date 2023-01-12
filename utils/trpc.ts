import { httpBatchLink } from "@trpc/client"
import { createTRPCNext } from "@trpc/next"
import type { AppRouter } from "../server/routers/_app"
import type { inferRouterOutputs } from "@trpc/server"

function getBaseUrl() {
  if (typeof window !== "undefined")
    // browser should use relative path
    return ""
  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export const trpc = createTRPCNext<AppRouter>({
  config({ ctx }) {
    return {
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
      queryClientConfig: {
        defaultOptions: {
          queries: { staleTime: Infinity, refetchOnWindowFocus: false },
        },
      },
    }
  },
  ssr: true,
})

export type RouterOutput = inferRouterOutputs<AppRouter>
export type Project = RouterOutput["projects"][0]
