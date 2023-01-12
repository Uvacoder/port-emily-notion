import Head from "next/head"
import React, { useEffect, useState } from "react"
import { Box, Flex, Text } from "rebass"
import { Project, trpc } from "../../utils/trpc"
import { ContactDetail } from "./ContactDetail"
import { ProjectCard } from "./ProjectCard"
import { ProjectDetail } from "./ProjectDetail"

const EXPAND_ANIMATION_S = 0.3

export const HomeScreen: React.FC = () => {
  const { data } = trpc.projects.useQuery()
  const [activeProject, setActiveProject] = useState<
    (Project & { width: number; y: number; x: number }) | null
  >(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setTimeout(() => setIsOpen(Boolean(activeProject)), 50)
  }, [activeProject])

  return (
    <>
      <Head>
        <title>emily dong</title>
      </Head>
      <Flex
        sx={{
          height: "100vh",
          width: "100vw",
          flexDirection: ["column", "column", "column", "row", "row"],
          position: "relative",
        }}
      >
        {activeProject && (
          <Flex
            sx={{
              clipPath: isOpen
                ? `circle(200vh at ${
                    activeProject.x + activeProject.width / 2
                  }px ${activeProject.y + activeProject.width / 2}px)`
                : `circle(0px at ${
                    activeProject.x + activeProject.width / 2
                  }px ${activeProject.y + activeProject.width / 2}px)`,
              position: "fixed",
              width: "100vw",
              height: "100vh",
              backgroundColor: activeProject.backgroundColor,
              left: 0,
              top: 0,
              transition: `clip-path ${EXPAND_ANIMATION_S}s`,
              overflow: "scroll",
              zIndex: 2,
            }}
          >
            {data && (
              <ProjectDetail
                close={() => {
                  setIsOpen(false)
                  setTimeout(
                    () => setActiveProject(null),
                    EXPAND_ANIMATION_S * 1000
                  )
                }}
                project={activeProject}
              />
            )}
          </Flex>
        )}
        <Flex
          sx={{
            flex: [0, 0, 0, 1],
            paddingY: ["3rem", "3rem", "3rem", 0],
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Text
            sx={{
              fontSize: [60, 70, 70, 70, 80],
              fontWeight: "600",
            }}
          >
            emily dong
          </Text>
          <Text sx={{ fontSize: 16, marginTop: "1rem" }}>
            • full stack dev building silly little apps •
          </Text>
          <Flex sx={{ marginTop: "2rem", alignItems: "center" }}>
            <ContactDetail type="github" />
            <ContactDetail type="linkedin" />
            <ContactDetail type="email" />
          </Flex>
        </Flex>
        <Flex
          sx={{
            flex: 1,
            height: "100%",
            overflow: ["none", "none", "none", "scroll"],
            paddingX: [10, "2rem"],
            paddingY: [0, 0, 0, "2rem"],
          }}
        >
          <Box
            sx={{
              width: "100%",
              boxSizing: "border-box",
              display: "grid",
              gridTemplateColumns: [
                "repeat(2, 1fr)",
                "repeat(3, 1fr)",
                "repeat(4, 1fr)",
                "repeat(3, 1fr)",
                "repeat(4, 1fr)",
              ],
              columnGap: 10,
              rowGap: 10,
            }}
          >
            {data?.map((project, idx) => (
              <ProjectCard
                setActiveProject={setActiveProject}
                key={idx}
                project={project}
              />
            ))}
          </Box>
        </Flex>
      </Flex>
    </>
  )
}
