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
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from '@/components/lib/dropdown-menu'
import { Button } from '@/components/lib/button'
import { IconDots } from '@tabler/icons-react'
import { Input } from '../lib/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/lib/avatar'
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
                <Avatar>
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </TableCell>

              <TableCell className="hidden sm:table-cell"></TableCell>
              <TableCell className="font-medium">Laser Lemonade Machine</TableCell>
              <TableCell>
                <Badge variant="outline">Draft</Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">$499.99</TableCell>
              <TableCell className="hidden md:table-cell">25</TableCell>
              <TableCell className="hidden md:table-cell">2023-07-12 10:42 AM</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <IconDots className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>32</strong> products
        </div>
      </CardFooter>
    </Card>
  )
}
