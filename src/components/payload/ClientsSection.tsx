import { getVisitors } from '@/utils/dashboard/data'
import { DataTable } from './table/DataTable'
import { columns } from './table/Columns'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../lib/card'
import { AddEdit } from './table/AddEdit'
import { DeleteVisitor } from './table/DeleteVisitor'
import { Visitor } from '@/utils/dashboard/types'

async function ClientsSection() {
  const data: Visitor[] = await getVisitors()

  return (
    <Card className={'h-full relative border border-white/15'}>
      <CardHeader className="flex h-1/4 flex-col items-stretch space-y-0 border-b border-border p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-evenly px-6 py-5 sm:py-6">
          <CardTitle>Line Chart - Interactive</CardTitle>
          <CardDescription>Showing total visitors for the last 3 months</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6 h-3/4">
        <DataTable columns={columns} data={data} />
        <AddEdit />
        <DeleteVisitor />
      </CardContent>
    </Card>
  )
}

export default ClientsSection
