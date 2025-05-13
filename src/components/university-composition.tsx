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

import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation';
import { atom, useAtom, useAtomValue, useSetAtom, Provider } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';

/* ------------------------------ table action ------------------------------ */
const titleAtom = atom('');
const captionAtom = atom('');
const searchAtom = atom('');

/* ------------------------------ dynamic table ----------------------------- */
type TableDataType = {
    id: string; // required
    name: string; // required
    [key: string]: string | number | null | undefined; // any
}
type TableHeaderType = {
    key: string;
    label: string;
};

const headerAtom = atom<TableHeaderType[]>([]);
const dataAtom = atom<TableDataType[]>([]);

/* ------------------ create composition button with dialog ----------------- */
const inputAtom = atom('');
const selectAtom = atom<TableDataType | null>(null);
const inputDialogAtom = atom(false);
const deleteDialogAtom = atom(false);
const placeholderAtom = atom('');

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
    const setSelect = useSetAtom(selectAtom);
    const setSearch = useSetAtom(searchAtom);
    const setInputDialog = useSetAtom(inputDialogAtom);


    return (
        <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600 text-sm mr-4 hidden sm:block">
                {caption}
            </p>
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                    {/* <div className="relative w-72">
                        <SearchIcon size={16} className="absolute left-2.5 top-2.5 text-gray-500" />
                        <Input
                            placeholder={`Search ${title.toLowerCase()}...`}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-8" />
                    </div> */}
                    <Button variant="outline" className="cursor-pointer" onClick={() => {
                        // Open the input dialog for creating a new item
                        setSelect(null); // Clear any selected item
                        setInputDialog(true);
                    }}>
                        <IconTablePlus size={16} />
                        New {title}
                    </Button>
                </div>
                <ActionDialog />
            </div>
        </div>
    );
}

function DynamicTable() {

    const setInputDialog = useSetAtom(inputDialogAtom);
    const setSelect = useSetAtom(selectAtom);
    const setDeleteDialog = useSetAtom(deleteDialogAtom); // Add this at the top
    const header = useAtomValue(headerAtom);
    const data = useAtomValue(dataAtom);
    const router = useRouter();
    const pathname = usePathname();

    const handleSelect = (e: React.MouseEvent<HTMLDivElement>, item: TableDataType) => {
        router.push(`${pathname}/${item.id}`);
    }

    const handleEdit = (e: React.MouseEvent<HTMLDivElement>, item: TableDataType) => {
        e.stopPropagation();  // prevents handleSelect trigger
        setSelect(item);      // Set item to be edited (if null, create)
        setInputDialog(true); // Open input dialog
    }

    const handleDelete = (e: React.MouseEvent<HTMLDivElement>, item: TableDataType) => {
        e.stopPropagation();   // prevent row click
        setSelect(item);       // Set item to be deleted
        setDeleteDialog(true); // Open confirmation dialog
    };

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
                            <TableRow key={rowIndex} className="hover:bg-muted cursor-pointer" onClick={(e) => handleSelect(e, item)}>
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
                                            <DropdownMenuItem className="cursor-pointer" onClick={(e) => handleEdit(e, item)}>Edit</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-red-500 cursor-pointer" onClick={(e) => handleDelete(e, item)}>
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



export function ActionDialog() {
    const title = useAtomValue(titleAtom);
    const placeholder = useAtomValue(placeholderAtom);
    const dialog = useAtomValue(inputDialogAtom);
    const deleteDialog = useAtomValue(deleteDialogAtom);
    const input = useAtomValue(inputAtom);
    const select = useAtomValue(selectAtom);

    const setInputDialog = useSetAtom(inputDialogAtom);
    const setDeleteDialog = useSetAtom(deleteDialogAtom);
    const setInput = useSetAtom(inputAtom);
    const setSelect = useSetAtom(selectAtom);

    const isEditMode = Boolean(select);
    const nameValue = isEditMode ? select!.name : input;
    const nameLength = nameValue.length;

    const cleanup = () => {
        setInput('');
        setSelect(null);
        setInputDialog(false);
        setDeleteDialog(false);
    };

    const handleOpenChange = (isOpen: boolean) => {
        setInputDialog(isOpen);
        if (isOpen) cleanup();
    };

    const handleDeleteConfirm = () => {
        // Your deletion logic goes here (e.g., update dataAtom if needed)
        cleanup();
        setDeleteDialog(false);
        setInputDialog(false);
    };

    return (
        <>
            <Dialog open={dialog} onOpenChange={handleOpenChange}>
                <DialogContent className="p-7">
                    <DialogHeader>
                        {isEditMode ? (
                            <>
                                <DialogTitle>Edit {title}</DialogTitle>
                                <DialogDescription>
                                    Update the details of ID:
                                    <span className="font-bold italic">
                                        {select!.id.toLowerCase()}
                                    </span>
                                </DialogDescription>
                            </>
                        ) : (
                            <>
                                <DialogTitle>Add a New {title}</DialogTitle>
                                <DialogDescription>
                                    Enter the details for the new {title.toLowerCase()} below.
                                </DialogDescription>
                            </>
                        )}
                    </DialogHeader>

                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <div className="relative">
                            <Input
                                id="name"
                                maxLength={50}
                                placeholder={placeholder}
                                value={nameValue}
                                onChange={(e) => setInput(e.target.value)}
                                className="pr-14"
                            />
                            <span
                                className={`absolute bottom-2.5 right-3 text-xs ${nameLength >= 45
                                    ? 'text-destructive'
                                    : 'text-muted-foreground'
                                    }`}
                            >
                                {nameLength}/50
                            </span>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type="submit"
                            className="cursor-pointer"
                            onClick={() => setInputDialog(false)}
                        >
                            {isEditMode ? `Edit ${title}` : `Create ${title}`}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialog} onOpenChange={setDeleteDialog}>
                <DialogContent className="p-6 max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Remove {title}?</DialogTitle>
                        <DialogDescription>
                            This will permanently delete <span className="font-bold italic">{select?.name}</span>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteDialog(false)} className="cursor-pointer">
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteConfirm} className="bg-red-500 cursor-pointer">
                            Confirm Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
