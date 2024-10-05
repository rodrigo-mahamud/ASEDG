import React from 'react'
import { Button } from './lib/button'
import Link from 'next/link'

export default function VariableButton({ data }: any) {
  const renderButon = () => {
    switch (data.linkStyle) {
      case 'basic':
        return (
          <>
            {data.internal && (
              <Button asChild variant="default">
                <Link href={data.internal.slug}>{data.linkText}</Link>
              </Button>
            )}
            {data.external && (
              <Button asChild variant="default">
                <Link href={data.external.slug}>{data.linkText}</Link>
              </Button>
            )}
            {data.mail && (
              <Button asChild variant="default">
                <Link href={data.mail}>{data.linkText}</Link>
              </Button>
            )}
            {data.location && (
              <Button asChild variant="default">
                <Link href={data.location}>{data.linkText}</Link>
              </Button>
            )}
            {data.tel && (
              <Button asChild variant="default">
                <Link href={data.tel}>{data.linkText}</Link>
              </Button>
            )}
          </>
        )
      case 'secondary':
        return (
          <Button asChild variant={'ghost'}>
            <Link href={data.internal.slug}>{data.linkText}</Link>
          </Button>
        )
      case 'highlighted':
        return (
          <Button asChild variant={'default'}>
            <Link href={data.internal.slug}>{data.linkText}</Link>
          </Button>
        )
      case 'withicon':
        return (
          <Button asChild variant={'expandIcon'}>
            <Link href={data.internal.slug}>{data.linkText}</Link>
          </Button>
        )
      case 'underline':
        return (
          <Button asChild variant={'linkHover1'}>
            <Link href={data.internal.slug}>{data.linkText}</Link>
          </Button>
        )

      default:
        return 'default'
    }
  }
  return <>{renderButon()}</>
}
