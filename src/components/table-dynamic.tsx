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

interface TableDynamicProps {
  headers: HeaderConfig[];
  data: TableData[];
}

export default function TableDynamic({ headers, data }: TableDynamicProps) {
  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader className="bg-muted">
          <TableRow>
            <TableHead className="w-12 text-center"></TableHead>
            {headers.map((header) => (
              <TableHead key={header.key} className="font-medium">
                {header.label}
              </TableHead>
            ))}
            <TableHead className="w-12 text-right" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length > 0 ? (
            data.map((item, rowIndex) => (
              <TableRow key={rowIndex} className="hover:bg-muted cursor-pointer">
                <TableCell className="text-center">
                  <IconEditCircle size={17} color="lightgrey" className="mx-auto" />
                </TableCell>

                {headers.map((header) => (
                  <TableCell key={`${rowIndex}-${header.key}`}>
                    {typeof item[header.key] === "number" ? (
                      <Badge variant="secondary">{item[header.key]}</Badge>
                    ) : (
                      item[header.key]?.toString() ?? ""
                    )}
                  </TableCell>
                ))}

                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-8 w-8 p-0 text-muted-foreground data-[state=open]:bg-muted cursor-pointer"
                        size="icon"
                      >
                        <MoreVerticalIcon className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-32">
                      <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-500 cursor-pointer">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={headers.length + 2} className="text-center py-8">
                no data.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}