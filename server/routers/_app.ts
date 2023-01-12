import { z } from "zod"
import { procedure, router } from "../trpc"
import { Client } from "@notionhq/client"
import { NotionProject } from "../types"

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

export const appRouter = router({
  projects: procedure.query(async () => {
    const database = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID || "",
    })
    const notionProjects = database.results as NotionProject[]

    const projects = notionProjects
      .filter(
        (p) =>
          p.properties["background colour"].rich_text.length &&
          !p.properties.hide.checkbox
      )
      .sort(
        (a, b) =>
          new Date(b.properties.date.date.start).getTime() -
          new Date(a.properties.date.date.start).getTime()
      )
      .map((p) => ({
        id: p.id,
        emoji: p.icon.emoji,
        backgroundColor:
          p.properties["background colour"].rich_text[0].plain_text,
        name: p.properties.name.title[0].plain_text,
        tech: p.properties.tech.multi_select,
        url: p.properties.url.url,
        dateCreated: p.properties.date.date.start,
        screenshots: p.properties.screenshot.files.map((file) => file.file.url),
        github: p.properties["github link"].url,
        summary: p.properties.summary.rich_text[0]?.plain_text,
        motivation: p.properties.motivation.rich_text[0]?.plain_text,
      }))

    return projects
  }),
})

export type AppRouter = typeof appRouter
