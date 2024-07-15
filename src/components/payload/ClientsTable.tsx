import React from 'react'
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

export default function ClientsTable() {
  return (
    <Card>
      <CardHeader className="h-1/4 border-b border-border flex flex-row justify-between w-full">
        <div className=" justify-evenly flex flex-col">
          <CardTitle>Products</CardTitle>
          <CardDescription>Manage your products and view their sales performance.</CardDescription>
        </div>
        <Input placeholder={`Search ...`} className="w-full md:max-w-sm" />
      </CardHeader>
      <CardContent className="h-3/4 p-6">
        <Table className="border border-border rounded-md">
          <TableHeader>
            <TableRow className="border-border">
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Price</TableHead>
              <TableHead className="hidden md:table-cell">Total Sales</TableHead>
              <TableHead className="hidden md:table-cell">Created at</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="hidden sm:table-cell">
                <Avatar className="mx-auto">
                  <AvatarFallback>LL</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">Laser Lemonade Machine</TableCell>
              <TableCell>
                <Badge variant="outline">Draft</Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">$499.99</TableCell>
              <TableCell className="hidden md:table-cell">25</TableCell>
              <TableCell className="hidden md:table-cell">2023-07-12 10:42 AM</TableCell>
              <TableCell className="flex gap-3">
                <ClientsSheetDrawer />
                <ClientsBanDropdown></ClientsBanDropdown>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">todos cargados</div>
      </CardFooter>
    </Card>
  )
}
