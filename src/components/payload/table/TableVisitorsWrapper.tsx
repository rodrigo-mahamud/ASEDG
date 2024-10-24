import { getVisitors } from '@/utils/dashboard/actions'
import { Visitor } from '@/utils/dashboard/types'
import { TableVisitors } from './TableVisitors'
import { columns } from './Columns'

export async function TableVisitorsWrapper() {
  const visitors: Visitor = await getVisitors()
  return (
    <div>
      <TableVisitors columns={columns} data={visitors.data} />
    </div>
  )
}
