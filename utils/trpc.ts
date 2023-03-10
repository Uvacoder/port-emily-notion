import { httpBatchLink } from "@trpc/client"
import { createTRPCNext } from "@trpc/next"
import type { AppRouter } from "../server/routers/_app"
import type { inferRouterOutputs } from "@trpc/server"

function getBaseUrl() {
  if (typeof window !== "undefined")
    // browser should use relative path
    return ""
  // assume localhost
  return process.env.APP_URL || `http://localhost:${process.env.PORT ?? 3000}`
}

export const trpc = createTRPCNext<AppRouter>({
  config({ ctx }) {
    if (typeof window !== "undefined") {
      // during client requests
      return {
        links: [
          httpBatchLink({
            url: "/api/trpc",
          }),
        ],
      }
    }
    return {
      links: [
        httpBatchLink({
          // The server needs to know your app's full url
          url: `${getBaseUrl()}/api/trpc`,
          /**
           * Set custom request headers on every request from tRPC
           * @link https://trpc.io/docs/v10/header
           */
          headers() {
            if (ctx?.req) {
              // To use SSR properly, you need to forward the client's headers to the server
              // This is so you can pass through things like cookies when we're server-side rendering
              // If you're using Node 18, omit the "connection" header
              const { connection: _connection, ...headers } = ctx.req.headers
              return {
                ...headers,
                // Optional: inform server that it's an SSR request
                "x-ssr": "1",
              }
            }
            return {}
          },
        }),
      ],
    }
  },
  ssr: true,
})

export type RouterOutput = inferRouterOutputs<AppRouter>
export type Project = RouterOutput["projects"][0]
