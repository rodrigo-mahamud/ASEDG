import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function SkeletonTable() {
  return (
    <Card className={'h-full relative border border-white/15'}>
      <CardHeader className="flex h-1/4 flex-col items-stretch space-y-0 border-b border-border p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-evenly gap-3 px-6 py-5 sm:py-6">
          <CardTitle>
            <Skeleton className="h-6 w-56" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-6 w-80" />
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6 h-3/4">
        <div className="flex w-full justify-between pb-6">
          <Skeleton className="h-6 w-72" />
          <Skeleton className="h-6 w-36" />
        </div>
        <div className="rounded-md border border-border">
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="flex gap-8 w-full h-auto p-0">
                  <TableCell className="w-full">
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="flex gap-8 items-center">
                <TableCell className="flex items-center gap-4 w-fit">
                  <Skeleton className="h-16 w-16 rounded-full" />
                  <Skeleton className="h-6 w-44" />
                </TableCell>
                <TableCell className="w-full">
                  <Skeleton className="h-6 w-full" />
                </TableCell>
                <TableCell className="w-full">
                  <Skeleton className="h-6 w-full" />
                </TableCell>
                <TableCell className="w-full">
                  <Skeleton className="h-6 w-full" />
                </TableCell>
                <TableCell className="w-full">
                  <Skeleton className="h-6 w-full" />
                </TableCell>
                <TableCell className="w-full">
                  <Skeleton className="h-6 w-full" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
