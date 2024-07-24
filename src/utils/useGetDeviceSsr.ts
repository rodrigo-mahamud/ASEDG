import { headers } from 'next/headers'

type DeviceType = 'mobile' | 'desktop'

export function useGetDeviceSsr(): DeviceType {
  const headersList = headers()
  const userAgent = headersList.get('user-agent') || ''
  const isMobile = (): boolean => {
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
    return mobileRegex.test(userAgent)
  }

  return isMobile() ? 'mobile' : 'desktop'
}
