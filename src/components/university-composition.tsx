"use client";

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

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { MoreVerticalIcon, SearchIcon } from "lucide-react";
import { IconEditCircle, IconTablePlus } from "@tabler/icons-react";

import { atom, useAtom, useAtomValue, useSetAtom, Provider } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';

/* ------------------------------ table action ------------------------------ */
const titleAtom = atom<string>('');
const captionAtom = atom<string>('');
const searchAtom = atom<string>('');

/* ------------------------------ dynamic table ----------------------------- */
type TableDataType = {
    id: string; // required
    [key: string]: string | number | null | undefined; // any
}
type TableHeaderType = {
    key: string;
    label: string;
};

const headerAtom = atom<TableHeaderType[]>([]);
const dataAtom = atom<TableDataType[]>([]);

/* ------------------ create composition button with dialog ----------------- */
const inputAtom = atom<string>('');
const dialogAtom = atom<boolean>(false);
const placeholderAtom = atom<string>('');

/* ------------------------- dynamic initial states ------------------------- */
type InitialStateType = {
    title: string;
    caption: string;
    header: TableHeaderType[],
    data: TableDataType[],
    placeholder: string
}

export default function UniversityComposition({
    title,
    caption,
    placeholder,
    header,
    data
}: InitialStateType) {
    return (
        <Provider>
            <Hydrator
                title={title}
                caption={caption}
                placeholder={placeholder}
                header={header}
                data={data} />
        </Provider>
    );
}

function Hydrator({
    title,
    caption,
    header,
    data,
    placeholder
}: InitialStateType) {

    useHydrateAtoms([
        [titleAtom, title],
        [captionAtom, caption],
        [headerAtom, header],
        [dataAtom, data],
        [placeholderAtom, placeholder]
    ]);

    return (
        <>
            <TableAction />
            <DynamicTable />
        </>
    );
}

function TableAction() {
    const title = useAtomValue(titleAtom);
    const caption = useAtomValue(captionAtom);
    const setSearch = useSetAtom(searchAtom);

    return (
        <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600 text-sm mr-4 hidden sm:block">
                {caption}
            </p>
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                    <div className="relative w-72">
                        <SearchIcon size={16} className="absolute left-2.5 top-2.5 text-gray-500" />
                        <Input
                            placeholder={`Search ${title.toLowerCase()}...`}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-8" />
                    </div>
                </div>
                <CreateButton />
            </div>
        </div>
    );
}

function DynamicTable() {

    const header = useAtomValue(headerAtom);
    const data = useAtomValue(dataAtom);

    return (
        <div className="overflow-hidden rounded-lg border">
            <Table>
                <TableHeader className="bg-muted">
                    <TableRow>
                        <TableHead className="w-12 text-center"></TableHead>
                        {header.map((header) => (
                            <TableHead key={header.key}>
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

                                {header.map((header) => (
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
                            <TableCell colSpan={header.length + 2} className="text-center py-8">
                                no data.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

function CreateButton() {

    const title = useAtomValue(titleAtom);
    const placeholder = useAtomValue(placeholderAtom);
    const dialog = useAtomValue(dialogAtom);
    const input = useAtomValue(inputAtom);
    const setDialog = useSetAtom(dialogAtom);
    const setInput = useSetAtom(inputAtom);

    // Reset fields when dialog opens
    const handleOpenChange = (isOpen: boolean) => {
        setDialog(isOpen);
        if (isOpen) {
            setInput("");
        }
    }

    return (
        <Dialog open={dialog} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline" className="cursor-pointer">
                    <IconTablePlus size={16} />
                    New {title}
                </Button>
            </DialogTrigger>
            <DialogContent className="p-7">
                <DialogHeader>
                    <DialogTitle>Add a New {title}</DialogTitle>
                    <DialogDescription>
                        Enter the details for the new {title.toLowerCase()} below.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <div className="relative">
                        <Input
                            id="name"
                            maxLength={50}
                            placeholder={placeholder}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="pr-14"
                        />
                        <span
                            className={
                                `absolute bottom-2.5 right-3 text-xs ${input.length >= 45
                                    ? "text-destructive"
                                    : "text-muted-foreground"
                                }`}>
                            {input.length}/50
                        </span>
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        type="submit"
                        className="cursor-pointer"
                        onClick={() => {
                            setDialog(false);
                        }}
                    >
                        Create {title}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

