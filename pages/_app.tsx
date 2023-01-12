import type { AppType } from "next/app"
import { trpc } from "../utils/trpc"
import "../styles/globals.css"
import { ThemeProvider } from "emotion-theming"
import { theme } from "../styles/theme"

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />{" "}
    </ThemeProvider>
  )
}

export default trpc.withTRPC(MyApp)
