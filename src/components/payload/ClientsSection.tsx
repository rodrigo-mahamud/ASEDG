import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../lib/card'
import AddEditVisitor from './table/AddEditVisitor'
import { DeleteVisitor } from './table/DeleteVisitor'
import { Visitor } from '@/utils/dashboard/types'
import { TableVisitorsWrapper } from './table/TableVisitorsWrapper'
import { Suspense } from 'react'
import { SkeletonTable } from './table/SkeletonTable'
import { EditPinCode } from './table/EditPinCode'
import { ReportMail } from './table/ReportMail'
import { BanUser } from './table/BanUser'

export default function ClientsSection() {
  return (
    <Card className={'h-full relative border border-white/15'}>
      <CardHeader className="flex h-1/4 flex-col items-stretch space-y-0 border-b border-border p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-evenly px-6 py-5 sm:py-6">
          <CardTitle>Tabla de usuarios</CardTitle>
          <CardDescription className="text-base">
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6 h-3/4">
        <Suspense fallback={<SkeletonTable></SkeletonTable>}>
          <TableVisitorsWrapper />
        </Suspense>
        <AddEditVisitor />
        <DeleteVisitor />
        <EditPinCode />
        <ReportMail />
        <BanUser />
      </CardContent>
    </Card>
  )
}
