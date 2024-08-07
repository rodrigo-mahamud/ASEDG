import React, { ReactNode } from 'react'

type FetchDataFunction<T, P extends any[]> = (...args: P) => Promise<T>

type AsyncWrapperProps<T, P extends any[]> = {
  children: (data: T) => ReactNode
  fetchData: FetchDataFunction<T, P>
  fetchParams: P
}

export async function AsyncWrapper<T, P extends any[]>({
  children,
  fetchData,
  fetchParams,
}: AsyncWrapperProps<T, P>) {
  const data = await fetchData(...fetchParams)
  return <>{children(data)}</>
}
