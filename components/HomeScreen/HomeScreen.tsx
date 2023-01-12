import React from "react"
import { trpc } from "../../utils/trpc"
import { ContactDetail } from "./ContactDetail"

type HomeScreenProps = {}

export const HomeScreen: React.FC<HomeScreenProps> = () => {
  const { data } = trpc.projects.useQuery()

  return (
    <div className="h-screen w-screen flex flex-col md:flex-row relative font-sans">
      <div className="flex-[0] md:flex-[1] py-8 md:py-0 items-center justify-center flex flex-col">
        <h1 className="text-7xl font-semibold">emily dong</h1>
        <p className="pt-4">• full stack dev building silly little apps •</p>
        <div className="flex mt-5 items-center">
          <ContactDetail type="github" />
          <ContactDetail type="linkedin" />
          <ContactDetail type="email" />
        </div>
      </div>
      <div className="flex flex-1 h-full md:overflow-scroll px-2.5 sm:px-8 py-0 md:px-8">
        <div
        // sx={{
        //   width: "100%",
        //   boxSizing: "border-box",
        //   display: "grid",
        //   gridTemplateColumns: [
        //     "repeat(2, 1fr)",
        //     "repeat(3, 1fr)",
        //     "repeat(4, 1fr)",
        //     "repeat(3, 1fr)",
        //     "repeat(4, 1fr)",
        //   ],
        //   columnGap: 10,
        //   rowGap: 10,
        // }}
        >
          {data?.map((project) => (
            <div key={project.id}>{project.name}</div>
          ))}
        </div>
      </div>
    </div>
  )
}
