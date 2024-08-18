import { Card, CardContent, CardHeader, CardTitle } from '@/components/lib/card'
import { getVisitors } from '@/utils/dashboard/data'
import { IconEyeDollar } from '@tabler/icons-react'

export default async function SDCRevenue({ className }: any) {
  const visitors = await getVisitors()

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium mb-1">Usuarios Activos</CardTitle>
        <IconEyeDollar className="size-6 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold"> {visitors.totalActive}</div>
        <p className="text-muted-foreground useTw ">Usuarios activos registrados</p>
      </CardContent>
    </Card>
  )
}
