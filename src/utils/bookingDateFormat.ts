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

export function formatPeriod(periodType: string, periodLength: number): string {
  switch (periodType) {
    case 'hours':
      return `${periodLength} ${periodLength === 1 ? 'hora' : 'horas'}`
    case 'days':
      return `${periodLength} ${periodLength === 1 ? 'día' : 'días'}`
    case 'weeks':
      return `${periodLength} ${periodLength === 1 ? 'semana' : 'semanas'}`
    case 'months':
      return `${periodLength} ${periodLength === 1 ? 'mes' : 'meses'}`
    case 'quarter':
      return `${periodLength} ${periodLength === 1 ? 'trimestre' : 'trimestres'}`
    case 'year':
      return `${periodLength} ${periodLength === 1 ? 'año' : 'años'}`
    case 'fixed':
      return 'Precio fijo'
    default:
      return 'Período desconocido'
  }
}

export function getEndDate(periodType: string, periodLength: number): string {
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
      return 'N/A'
    default:
      return 'Fecha desconocida'
  }

  return end.format('DD MMMM YYYY')
}
