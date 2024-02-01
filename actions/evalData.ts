"use server"

import { differenceInMinutes } from "date-fns"

export const evalData = async () => {
  const last_scraped = '2024-02-01T22:49:10.278+00:00'

  const diff = differenceInMinutes(
    new Date(),
    new Date(last_scraped)
  )

  // If last scraped data is older then 60 minutes, scrape again and update db
  if (diff > 60)
    console.log('scrape', diff,last_scraped, new Date())
  else return
}

