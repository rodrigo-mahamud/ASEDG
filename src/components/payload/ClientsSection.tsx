import { getVisitors } from '@/utils/dashboard/data'
import { DataTable } from './table/DataTable'
import { columns } from './table/Columns'

async function ClientsSection() {
  const data = await getVisitors()

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Clients</h1>

      <DataTable columns={columns} data={data} />
    </div>
  )
}

export default ClientsSection
