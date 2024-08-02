import React from 'react'

type FetchDataFunction<T, P extends any[]> = (...args: P) => Promise<T>

type AsyncWrapperProps<T, P extends any[]> = {
  Component: React.ComponentType<{ data: T } & any>
  fetchData: FetchDataFunction<T, P>
  fetchParams: P
  [key: string]: any
}

export async function AsyncWrapper<T, P extends any[]>({
  Component,
  fetchData,
  fetchParams,
  ...props
}: AsyncWrapperProps<T, P>) {
  const data = await fetchData(...fetchParams)

  return <Component data={data} {...props} />
}
