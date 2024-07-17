'use client'
import React, { useEffect, useState } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/lib/card'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/lib/table'
import { Badge } from '@/components/lib/badge'
import { Input } from '../lib/input'
import { Avatar, AvatarFallback } from '@/components/lib/avatar'
import ClientsSheetDrawer from './ClientsSheetDrawer'
import ClientsBanDropdown from './ClientsBanDropdown'
import useDashboardState from '@/utils/useDashboardState'
import { fetchVisitors, handleDrawerOpen, handleDrawerClose } from '@/utils/DashboardHandlers'
import { Button } from '@/components/lib/button'
import { IconPencil, IconPlus } from '@tabler/icons-react'

export default function ClientsTable() {
  const { visitors, drawerOpenId } = useDashboardState()
  const [selectedVisitor, setSelectedVisitor] = useState<any>(null)

  useEffect(() => {
    fetchVisitors()
  }, [])

  const handleOpenDrawer = (visitor?: any) => {
    setSelectedVisitor(visitor)
    handleDrawerOpen(visitor)
  }

  const handleCloseDrawer = () => {
    setSelectedVisitor(null)
    handleDrawerClose()
  }

  return (
    <Card className="border border-white/15 p-8">
      <CardHeader className="h-1/4 flex flex-row justify-between w-full p-0 ">
        <div className="flex flex-col gap-1">
          <CardTitle className="text-3xl">Visitors</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Manage your visitors and view their details.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="h-3/4 p-0 mt-8 space-y-6">
        <div className="flex justify-between">
          <Input placeholder={`Buscar usuario...`} className="w-full md:max-w-sm" />
          <Button
            className="rounded-md"
            variant="outline"
            size="icon"
            onClick={() => handleOpenDrawer()}
          >
            <IconPlus className="w-5 h-5" />
          </Button>
        </div>
        <Table className="border border-border rounded-md">
          <TableHeader>
            <TableRow className="border-border">
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Avatar</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="hidden md:table-cell">Start Time</TableHead>
              <TableHead className="hidden md:table-cell">End Time</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visitors.map((visitor) => (
              <TableRow key={visitor.id} className="border-border">
                <TableCell className="hidden sm:table-cell">
                  <Avatar className="mx-auto">
                    <AvatarFallback>{visitor.first_name[0] + visitor.last_name[0]}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">{`${visitor.first_name} ${visitor.last_name}`}</TableCell>
                <TableCell>
                  <Badge variant="outline">{visitor.status}</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">{visitor.email}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {new Date(visitor.start_time * 1000).toLocaleString()}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {new Date(visitor.end_time * 1000).toLocaleString()}
                </TableCell>
                <TableCell className="flex gap-3">
                  <Button
                    className="rounded-md"
                    variant="outline"
                    size="icon"
                    onClick={() => handleOpenDrawer(visitor)}
                  >
                    <IconPencil className="w-5 h-5" />
                  </Button>
                  <ClientsBanDropdown visitorId={visitor.id!} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">Total visitors: {visitors.length}</div>
      </CardFooter>
      <ClientsSheetDrawer
        isOpen={drawerOpenId !== null}
        onOpenChange={(open) => {
          if (!open) handleCloseDrawer()
        }}
        visitor={selectedVisitor}
      />
    </Card>
  )
}
