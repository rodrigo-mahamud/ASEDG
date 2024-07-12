import dayjs from 'dayjs'

export function calculateTotalDays(periodType: string, periodLength: number): number {
  const start = dayjs()
  let end: dayjs.Dayjs

  switch (periodType) {
    case 'hours':
      end = start.add(periodLength, 'hour')
      break
    case 'days':
      end = start.add(periodLength, 'day')
      break
    case 'weeks':
      end = start.add(periodLength, 'week')
      break
    case 'months':
      end = start.add(periodLength, 'month')
      break
    case 'quarter':
      end = start.add(periodLength * 3, 'month')
      break
    case 'year':
      end = start.add(periodLength, 'year')
      break
    case 'fixed':
      return 1 // Para precio fijo, consideramos como 1 día para cálculos
    default:
      return 0 // O lanza un error si prefieres
  }

  // Calculamos la diferencia en días
  return end.diff(start, 'day')
}

export function formatPeriod(daysAmount: number): string {
  if (daysAmount === 1) {
    return '1 día'
  } else if (daysAmount < 7) {
    return `${daysAmount} días`
  } else if (daysAmount === 7) {
    return '1 semana'
  } else if (daysAmount < 30) {
    const weeks = Math.floor(daysAmount / 7)
    return `${weeks} ${weeks === 1 ? 'semana' : 'semanas'}`
  } else if (daysAmount >= 30 && daysAmount < 365) {
    const months = Math.floor(daysAmount / 30)
    return `${months} ${months === 1 ? 'mes' : 'meses'}`
  } else {
    const years = Math.floor(daysAmount / 365)
    return `${years} ${years === 1 ? 'año' : 'años'}`
  }
}

export function getEndDate(daysAmount: number): string {
  return dayjs().add(daysAmount, 'day').format('DD MMMM YYYY')
}
