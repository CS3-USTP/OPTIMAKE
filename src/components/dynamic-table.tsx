import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MoreVerticalIcon } from "lucide-react";
import { Button } from "./ui/button";
import { IconEditCircle } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge"

interface TableData {
  [key: string]: string | number | null | undefined;
}

interface HeaderConfig {
  key: string;
  label: string;
}

interface DynamicTableProps {
  headers: HeaderConfig[];
  data: TableData[];
}

export function DynamicTable({ headers, data }: DynamicTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader className="bg-muted">

          <TableRow>
            <TableHead className="p-1 pl-5"></TableHead>
            {headers.map((header) => (
              <TableHead key={header.key}>{header.label}</TableHead>
            ))}
            <TableHead />
          </TableRow>

        </TableHeader>


        <TableBody>
          {data.map((item, rowIndex) => (
            <TableRow key={rowIndex} className="hover:bg-muted cursor-pointer">

              <TableCell className="p-1 px-5"><IconEditCircle key="1" size={17} /></TableCell>

              {headers.map((header) => (
                <TableCell key={`${rowIndex}-${header.key}`}>
                  {typeof item[header.key] === "number" ? (
                    <Badge variant='secondary'>{item[header.key]}</Badge>
                  ) : (
                    item[header.key]?.toString() ?? ""
                  )}
                </TableCell>
              ))}

              <TableCell className="p-1 pr-5">
                <div className="flex justify-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="flex size-8 text-muted-foreground data-[state=open]:bg-muted cursor-pointer"
                        size="icon"
                      >
                        <MoreVerticalIcon />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-32">
                      <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-500 cursor-pointer">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>

      </Table>
    </div>
  );
}
