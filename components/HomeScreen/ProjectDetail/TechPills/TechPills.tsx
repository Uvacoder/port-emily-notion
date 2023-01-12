import React from "react"
import { Flex } from "rebass"
import { Project } from "../../../../utils/trpc"

type TechPillsProps = {
  tech: Project["tech"]
  backgroundColor: string
}

export const TechPills: React.FC<TechPillsProps> = ({
  tech,
  backgroundColor,
}) => {
  return (
    <Flex sx={{ marginBottom: "2rem", flexWrap: "wrap" }}>
      {tech.map(({ name, id }) => (
        <Flex
          key={id}
          sx={{
            height: "2rem",
            borderRadius: "1rem",
            paddingX: "1rem",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "0.5rem",
            marginBottom: "0.5rem",
            color: backgroundColor,
            backgroundColor: "black",
          }}
        >
          {name}
        </Flex>
      ))}
    </Flex>
  )
}
