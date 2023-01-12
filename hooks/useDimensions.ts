import { useEffect, useState } from "react"

export const useDimensions = (ref: React.RefObject<HTMLElement>) => {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  })

  useEffect(() => {
    const updateDimensions = () => {
      if (ref.current) {
        const boundingClient = ref.current.getBoundingClientRect()
        setDimensions({
          width: boundingClient.width,
          height: boundingClient.height,
          y: boundingClient.y,
          x: boundingClient.x,
        })
      }
    }
    updateDimensions()
    setTimeout(() => updateDimensions(), 1000)

    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [ref])

  return dimensions
}
