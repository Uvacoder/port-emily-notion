import React from "react"

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
    <a
      className="flex items-center cursor-pointer hover:scale-105 transition-all"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      <i className={`${iconClassName}`} />
      <p className="text-sm ml-1 mr-4">{type}</p>
    </a>
  )
}
