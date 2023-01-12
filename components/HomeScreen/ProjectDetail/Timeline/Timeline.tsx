import { DateTime } from "luxon"
import React from "react"
import { DescriptionText } from "../DescriptionText"

type TimelineProps = {
  dateCreated: string
  lastUpdatedAt: string
}

const formatDate = (isoDate: string) =>
  DateTime.fromISO(isoDate).toFormat("LLL dd yyyy")

export const Timeline: React.FC<TimelineProps> = ({
  dateCreated,
  lastUpdatedAt,
}) => {
  if (!dateCreated || !lastUpdatedAt) {
    return null
  }

  return (
    <DescriptionText title="Last updated" text={formatDate(lastUpdatedAt)} />
  )
}
