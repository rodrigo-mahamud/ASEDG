import { FormDataTypes } from './validateForm'

export default function normaliceFormKeys(obj: any) {
  const normalizeKey = (key: any) => {
    return key
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .trim()
  }

  return Object.fromEntries(Object.entries(obj).map(([key, value]) => [normalizeKey(key), value]))
}
