import React, { useRef } from "react"
import { Flex, Image, Link, Text } from "rebass"
import { TechPills } from "./TechPills"
import { DescriptionText } from "./DescriptionText"
import { CloseButton } from "./CloseButton"
import { Timeline } from "./Timeline"
import { Project } from "../../../utils/trpc"
import { useDimensions } from "../../../hooks/useDimensions"
import { useLastCommitDate } from "../../../hooks/useLastCommitDate"

type ProjectDetailProps = {
  project: Project
  close: () => void
}

const WIDTH = ["90%", "80%"]

export const ProjectDetail: React.FC<ProjectDetailProps> = ({
  project: {
    emoji,
    name,
    screenshots,
    dateCreated,
    tech,
    url,
    summary,
    backgroundColor,
    github,
    motivation,
  },
  close,
}) => {
  const imageRef = useRef<HTMLImageElement>(null)
  const lastUpdatedAt = useLastCommitDate(github)

  const { width, height } = useDimensions(imageRef)
  const imageFormat = width < height ? "portait" : "landscape"

  return (
    <Flex
      sx={{
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        position: "fixed",
        height: "100%",
        zIndex: 1,
        overflow: "scroll",
        top: 0,
        left: 0,
      }}
    >
      <CloseButton close={close} backgroundColor={backgroundColor} />
      <Text
        sx={{
          paddingTop: "2rem",
          fontSize: [30, 60],
          fontWeight: "600",
          textAlign: "center",
          width: WIDTH,
        }}
      >
        {emoji} {name}
      </Text>

      <Flex>
        {url && (
          <Link
            target="_blank"
            sx={{ color: "black", textDecoration: "underline" }}
            href={url}
          >
            deployed site
          </Link>
        )}
        {github && (
          <Link
            target="_blank"
            sx={{
              color: "black",
              marginLeft: "1rem",
              textDecoration: "underline",
            }}
            href={github}
          >
            github
          </Link>
        )}
      </Flex>

      <Flex
        sx={{
          marginTop: "2rem",
          width: WIDTH,
          flexDirection: ["column", "column", "column", "row"],
        }}
      >
        <Flex
          sx={{
            flex: 1,
            flexDirection: imageFormat === "landscape" ? "column" : "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {screenshots.map((url, idx) => (
            <Image
              alt="screenshot"
              key={idx}
              ref={idx === 0 ? imageRef : undefined}
              sx={{
                borderRadius: 10,
                border: "3px solid black",
                marginBottom: "1rem",
                opacity: width ? 1 : 0,
                transition: "opacity 0.3s",
                width: imageFormat === "landscape" ? "100%" : "48%",
              }}
              src={url}
            />
          ))}
        </Flex>
        <Flex
          sx={{
            flex: 1,
            marginLeft: [0, 0, 0, "2rem"],
            marginTop: ["1rem", "1rem", "1rem", 0],
            flexDirection: "column",
          }}
        >
          <TechPills tech={tech} backgroundColor={backgroundColor} />
          <DescriptionText title="What is it?" text={summary} />
          <DescriptionText title="Why?" text={motivation} />
          <Timeline lastUpdatedAt={lastUpdatedAt} dateCreated={dateCreated} />
        </Flex>
      </Flex>
    </Flex>
  )
}
