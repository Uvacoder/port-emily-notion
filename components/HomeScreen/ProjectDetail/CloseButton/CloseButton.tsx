import React from "react"
import { Box, Flex } from "rebass"

type CloseButtonProps = {
  close: () => void
  backgroundColor: string
}

export const CloseButton: React.FC<CloseButtonProps> = ({
  close,
  backgroundColor,
}) => {
  return (
    <Flex
      onClick={() => close()}
      sx={{
        top: ["2px", "1rem"],
        right: ["2px", "1rem"],
        position: "absolute",
        padding: "1rem",
        borderRadius: "50%",
        cursor: "pointer",
        backgroundColor,
        ":hover": {
          filter: "brightness(95%)",
        },
        transition: "filter 0.3s",
        height: "3rem",
        width: "3rem",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box as="i" className="ri-close-line" />
    </Flex>
  )
}
