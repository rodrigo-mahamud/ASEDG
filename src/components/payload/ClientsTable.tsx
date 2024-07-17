'use client'
import React, { useEffect } from 'react'
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
import { fetchVisitors, handleDrawerOpen } from '@/utils/DashboardHandlers'

export default function ClientsTable() {
  const { visitors } = useDashboardState()

  useEffect(() => {
    fetchVisitors()
  }, [])

  return (
    <Card className="border border-white/15">
      <CardHeader className="h-1/4 border-b border-border flex flex-row justify-between w-full">
        <div className="justify-evenly flex flex-col gap-2">
          <CardTitle>Visitors</CardTitle>
          <CardDescription>Manage your visitors and view their details.</CardDescription>
        </div>
        <Input placeholder={`Search ...`} className="w-full md:max-w-sm" />
      </CardHeader>
      <CardContent className="h-3/4 p-6">
        <div className="mb-4">
          <ClientsSheetDrawer />
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
                  <ClientsSheetDrawer visitor={visitor} />
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
    </Card>
  )
}
