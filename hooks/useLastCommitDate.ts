import axios from "axios"
import { useEffect, useState } from "react"

export const useLastCommitDate = (githubUrl: string) => {
  const [date, setDate] = useState("")

  useEffect(() => {
    const initialize = async () => {
      const userAndRepo = githubUrl.split("/").slice(-2).join("/")
      try {
        const response = await axios.get(
          `https://api.github.com/repos/${userAndRepo}/commits/main`,
          {
            headers: {
              Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
            },
          }
        )
        setDate(response.data.commit.author.date)
      } catch (e: any) {
        if (e.code === "ERR_BAD_REQUEST") {
          const response = await axios.get(
            `https://api.github.com/repos/${userAndRepo}/commits/master`,
            {
              headers: {
                Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
              },
            }
          )
          setDate(response.data.commit.author.date)
        }
      }
    }
    initialize()
  }, [githubUrl])

  return date
}
