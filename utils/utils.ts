export function getNumberOfDatesBetween(startDate: Date, endDate: Date) {
  // Convert the input strings to Date objects
  const start = new Date(startDate).getTime()
  const end = new Date(endDate).getTime()

  // Calculate the difference in milliseconds between the two dates
  const differenceInMs = end - start

  // Convert milliseconds to days
  const millisecondsPerDay = 24 * 60 * 60 * 1000
  const numberOfDays = Math.floor(differenceInMs / millisecondsPerDay)

  return numberOfDays
}
