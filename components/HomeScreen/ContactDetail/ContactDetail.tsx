import React from "react"
import { Link, Text } from "rebass"

type ContactDetailProps = {
  type: "github" | "linkedin" | "email"
}

export const ContactDetail: React.FC<ContactDetailProps> = ({ type }) => {
  const contactTypeToDetails: {
    [type in ContactDetailProps["type"]]: {
      iconClassName: string
      href: string
    }
  } = {
    email: {
      iconClassName: "ri-mail-line",
      href: "mailto:emilyhfdong@gmail.com",
    },
    github: {
      iconClassName: "ri-github-fill",
      href: "https://github.com/emilyhfdong",
    },
    linkedin: {
      iconClassName: "ri-linkedin-box-fill",
      href: "https://www.linkedin.com/in/emily-dong-b13515134/",
    },
  }
  const { iconClassName, href } = contactTypeToDetails[type]
  return (
    <Link
      sx={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        ":hover": { transform: "scale(1.05)" },
        transition: "all 0.3s",
        color: "black",
        textDecoration: "none",
      }}
      href={href}
      target="_blank"
    >
      <i className={`${iconClassName}`} />
      <Text sx={{ fontSize: 14, marginRight: "1rem", marginLeft: "0.25rem" }}>
        {type}
      </Text>
    </Link>
  )
}
