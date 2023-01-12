import React from "react"
import { Flex, SxStyleProp, Text } from "rebass"

type DescriptionTextProps = {
  title: string
  text: string
  sx?: SxStyleProp
}

export const DescriptionText: React.FC<DescriptionTextProps> = ({
  title,
  text,
  sx,
}) => {
  return (
    <Flex sx={{ marginBottom: "2rem", flexDirection: "column", ...sx }}>
      <Text
        sx={{
          marginBottom: "0.5rem",
          fontSize: 20,
          fontWeight: "600",
        }}
      >
        {title}
      </Text>
      <Text
        sx={{
          fontSize: 18,
          lineHeight: "24px",
          whiteSpace: "pre-line",
        }}
      >
        {text}
      </Text>
    </Flex>
  )
}
