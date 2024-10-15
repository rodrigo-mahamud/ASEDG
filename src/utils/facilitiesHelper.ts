export const getPriceRange = (bookingOptions: any[]): string => {
  if (!bookingOptions || bookingOptions.length === 0) {
    return 'No options available'
  }
  const prices = bookingOptions.map((option) => option.price)
  const minPrice = Math.min(...prices)
  return `${minPrice.toFixed(2)}€/dia`
}

export const getOpenHours = (schedules: any[]): string => {
  if (!schedules || schedules.length === 0) {
    return 'No schedule available'
  }
  const longestPeriod = schedules.reduce(
    (max, schedule) => (schedule.days.length > max.days.length ? schedule : max),
    schedules[0],
  )

  const opening = new Date(longestPeriod.open)
  const closing = new Date(longestPeriod.close)
  const difference = closing.getTime() - opening.getTime()
  const hours = difference / (1000 * 60 * 60)

  return `${Math.round(hours)}h/día`
}
