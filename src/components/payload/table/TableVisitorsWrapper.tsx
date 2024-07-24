import { getVisitors } from '@/utils/dashboard/data'
import { Visitor } from '@/utils/dashboard/types'
import { TableVisitors } from './TableVisitors'
import { columns } from './Columns'

export async function TableVisitorsWrapper() {
  const data: Visitor[] = await getVisitors()
  return (
    <div>
      <TableVisitors columns={columns} data={data} />
    </div>
  )
}
