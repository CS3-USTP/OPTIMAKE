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
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { MoreVerticalIcon } from "lucide-react";
import { IconEditCircle, IconTablePlus } from "@tabler/icons-react";

import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation';
import { atom, useAtomValue, useSetAtom, Provider } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';

/* ------------------------------ Type Definitions ------------------------------ */
type CompositionType = 'Building' | 'Room' | 'College' | 'Department' | 'Course' | 'Facility';

type BaseType = {
    name: string;
};

type BuildingType = BaseType & {
    type: 'Building';
};

type CollegeType = BaseType & {
    type: 'College';
};

type RoomType = BaseType & {
    type: 'Room';
    facility: string;
};

type FacilityType = BaseType & {
    type: 'Facility';
};

type DepartmentType = BaseType & {
    type: 'Department';
    section: number;
};

type CourseType = BaseType & {
    type: 'Course';
    duration: number;
};

type InputDataType = BuildingType | CollegeType | RoomType | DepartmentType | CourseType | FacilityType;

type TableDataType = {
    id: string;
    [key: string]: string | number | null | undefined;
};

type TableHeaderType = {
    key: string;
    label: string;
};

/* ------------------------------ Atom Definitions ------------------------------ */
const compositionTypeAtom = atom<CompositionType>('Building');
const compositionCaptionAtom = atom<string>('');
const inputPlaceholderAtom = atom<InputDataType>({ name: '', type: 'Building' });
const inputValueAtom = atom<InputDataType>({ name: '', type: 'Building' });
const tableHeaderAtom = atom<TableHeaderType[]>([]);
const tableDataAtom = atom<TableDataType[]>([]);
const selectedItemAtom = atom<TableDataType | null>(null);
const isShowInputDialogAtom = atom<boolean>(false);
const isShowDeleteDialogAtom = atom<boolean>(false);

/* ------------------------------ Initial State Type ------------------------------ */
type InitialStateType = {
    compositionType: CompositionType;
    compositionCaption: string;
    tableHeader: TableHeaderType[];
    tableData: TableDataType[];
    inputPlaceholder: InputDataType;
};

/* ------------------------------ Main Component ------------------------------ */
export default function Composition({
    compositionType,
    compositionCaption,
    inputPlaceholder,
    tableHeader,
    tableData
}: InitialStateType) {
    return (
        <Provider>
            <Hydrator
                compositionType={compositionType}
                compositionCaption={compositionCaption}
                inputPlaceholder={inputPlaceholder}
                tableHeader={tableHeader}
                tableData={tableData}
            />
        </Provider>
    );
}

/* ------------------------------ Hydrator Component ------------------------------ */
function Hydrator({
    compositionType,
    compositionCaption,
    inputPlaceholder,
    tableHeader,
    tableData
}: InitialStateType) {
    useHydrateAtoms([
        [compositionTypeAtom, compositionType],
        [compositionCaptionAtom, compositionCaption],
        [tableHeaderAtom, tableHeader],
        [tableDataAtom, tableData],
        [inputPlaceholderAtom, inputPlaceholder],
        [inputValueAtom, { ...inputPlaceholder }] // Initialize with a copy of placeholder
    ] as const);

    return (
        <>
            <TableAction />
            <DynamicTable />
            <InputCompositionDialog />
            <DeleteCompositionDialog />
        </>
    );
}

/* ------------------------------ Table Action Component ------------------------------ */
function TableAction() {
    const compositionType = useAtomValue(compositionTypeAtom);
    const compositionCaption = useAtomValue(compositionCaptionAtom);
    const setSelectedItem = useSetAtom(selectedItemAtom);
    const setIsShowInputDialog = useSetAtom(isShowInputDialogAtom);
    const setInputValue = useSetAtom(inputValueAtom);

    const handleNewComposition = () => {
        setSelectedItem(null);  // reset selected item (not editing)

        // Create a proper empty state based on composition type
        const emptyState = {
            name: '',
            type: compositionType
        } as InputDataType;

        // Add any required type-specific properties with empty values
        if (compositionType === 'Room') {
            (emptyState as RoomType).facility = '';
        } else if (compositionType === 'Department') {
            (emptyState as DepartmentType).section = 0;
        } else if (compositionType === 'Course') {
            (emptyState as CourseType).duration = 0;
        }

        setInputValue(emptyState);  // Reset input value to empty state
        setIsShowInputDialog(true);  // Open input dialog
    };

    return (
        <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600 text-sm mr-4 hidden sm:block">
                {compositionCaption}
            </p>
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    className="cursor-pointer"
                    onClick={handleNewComposition}
                >
                    <IconTablePlus size={16} className="mr-2" />
                    New {compositionType}
                </Button>
            </div>
        </div>
    );
}

/* ------------------------------ Dynamic Table Component ------------------------------ */
function DynamicTable() {
    const setInputValue = useSetAtom(inputValueAtom);
    const setSelectedItem = useSetAtom(selectedItemAtom);
    const setIsShowDeleteDialog = useSetAtom(isShowDeleteDialogAtom);
    const setIsShowInputDialog = useSetAtom(isShowInputDialogAtom);
    const tableHeader = useAtomValue(tableHeaderAtom);
    const tableData = useAtomValue(tableDataAtom);
    const router = useRouter();
    const pathname = usePathname();

    const handleSelect = (e: React.MouseEvent<HTMLTableRowElement>, item: TableDataType) => {
        router.push(`${pathname}/${item.id}`);
    };

    const handleEdit = (e: React.MouseEvent<HTMLDivElement>, item: TableDataType) => {
        e.stopPropagation();  // prevents handleSelect trigger
        setSelectedItem(item);  // Set item to be edited

        // Convert the table item to InputDataType format
        const inputItem = {
            name: item.name?.toString() || '',
            ...Object.fromEntries(
                Object.entries(item)
                    .filter(([key]) => key !== 'id' && key !== 'name')
                    .map(([key, value]) => [key, value])
            )
        } as InputDataType;

        setInputValue(inputItem);  // Set input value to selected item
        setIsShowInputDialog(true);  // Open edit dialog
    };

    const handleDelete = (e: React.MouseEvent<HTMLDivElement>, item: TableDataType) => {
        e.stopPropagation();   // prevent row click
        setSelectedItem(item);   // Set item to be deleted
        setIsShowDeleteDialog(true);  // Open delete dialog
    };

    return (
        <div className="overflow-hidden rounded-lg border">
            <Table>
                <TableHeader className="bg-muted">
                    <TableRow>
                        <TableHead className="w-12 text-center"></TableHead>
                        {tableHeader.map((header) => (
                            <TableHead key={header.key}>
                                {header.label}
                            </TableHead>
                        ))}
                        <TableHead className="w-12 text-right" />
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {tableData.length > 0 ? (
                        tableData.map((item, rowIndex) => (
                            <TableRow
                                key={item.id}
                                className="hover:bg-muted cursor-pointer"
                                onClick={(e) => handleSelect(e, item)}
                            >
                                <TableCell className="text-center">
                                    <IconEditCircle size={17} color="lightgrey" className="mx-auto" />
                                </TableCell>

                                {tableHeader.map((header) => (
                                    <TableCell key={`${item.id}-${header.key}`}>
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
                                            <DropdownMenuItem
                                                className="cursor-pointer"
                                                onClick={(e) => handleEdit(e, item)}
                                            >
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                className="text-red-500 cursor-pointer"
                                                onClick={(e) => handleDelete(e, item)}
                                            >
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={tableHeader.length ? tableHeader.length + 2 : 3} className="text-center py-8">
                                No data available.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

/* ------------------------------ Input Composition Dialog ------------------------------ */
function InputCompositionDialog() {
    const compositionType = useAtomValue(compositionTypeAtom);
    const inputPlaceholder = useAtomValue(inputPlaceholderAtom);
    const selectedItem = useAtomValue(selectedItemAtom);
    const isShowInputDialog = useAtomValue(isShowInputDialogAtom);
    const inputValue = useAtomValue(inputValueAtom);
    const setInputValue = useSetAtom(inputValueAtom);
    const setIsShowInputDialog = useSetAtom(isShowInputDialogAtom);
    const tableData = useAtomValue(tableDataAtom);
    const setTableData = useSetAtom(tableDataAtom);

    // Handler for input changes
    const handleInputChange = (key: string, value: string | number) => {
        setInputValue((prev) => ({
            ...prev,
            [key]: value
        }));
    };

    const handleSubmit = () => {
        if (selectedItem) {
            // Edit existing item
            const updatedData = tableData.map(item =>
                item.id === selectedItem.id
                    ? { ...item, ...inputValue, id: selectedItem.id }
                    : item
            );
            setTableData(updatedData);
            console.log('Edited item:', { ...inputValue, id: selectedItem.id });
        } else {
            // Create new item
            const newId = `${compositionType.toLowerCase()}-${Date.now()}`;
            const newItem = { ...inputValue, id: newId };
            setTableData([...tableData, newItem]);
            console.log('Created new item:', newItem);
        }

        setIsShowInputDialog(false);
    };

    // Get the fields based on the composition type
    const renderDynamicFields = () => {
        switch (inputValue.type) {
            case 'Room':
                return (
                    <div className="grid gap-2 mt-4">
                        <Label htmlFor="facility">Facility</Label>
                        <Input
                            id="facility"
                            value={(inputValue as RoomType).facility || ''}
                            onChange={(e) => handleInputChange('facility', e.target.value)}
                            placeholder="Enter facility name"
                        />
                    </div>
                );
            case 'Department':
                return (
                    <div className="grid gap-2 mt-4">
                        <Label htmlFor="section">Section</Label>
                        <Input
                            id="section"
                            type="number"
                            value={(inputValue as DepartmentType).section || ''}
                            onChange={(e) => handleInputChange('section', parseInt(e.target.value) || 0)}
                            placeholder="Enter section number"
                        />
                    </div>
                );
            case 'Course':
                return (
                    <div className="grid gap-2 mt-4">
                        <Label htmlFor="duration">Duration (hours)</Label>
                        <Input
                            id="duration"
                            type="number"
                            value={(inputValue as CourseType).duration || ''}
                            onChange={(e) => handleInputChange('duration', parseInt(e.target.value) || 0)}
                            placeholder="Enter course duration"
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <Dialog open={isShowInputDialog} onOpenChange={setIsShowInputDialog}>
            <DialogContent className="p-7">
                <DialogHeader>
                    <DialogTitle>
                        {selectedItem ? `Edit ${compositionType}` : `Add a New ${compositionType}`}
                    </DialogTitle>
                    <DialogDescription>
                        {selectedItem
                            ? (<>Update the details of ID: <span className="font-bold italic">{selectedItem.id}</span></>)
                            : (`Enter the details for the new ${compositionType.toLowerCase()} below.`)}
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <div className="relative">
                        <Input
                            id="name"
                            maxLength={50}
                            placeholder={inputPlaceholder.name}
                            value={inputValue.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className="pr-14"
                        />
                        <span className={`absolute bottom-2.5 right-3 text-xs ${inputValue.name.length >= 45 ? 'text-destructive' : 'text-muted-foreground'
                            }`}>
                            {inputValue.name.length}/50
                        </span>
                    </div>
                </div>

                {/* Render dynamic fields based on composition type */}
                {renderDynamicFields()}

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => setIsShowInputDialog(false)}
                        className="cursor-pointer mr-2"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        onClick={handleSubmit}
                        className="cursor-pointer"
                        disabled={!inputValue.name.trim()}
                    >
                        {selectedItem ? 'Update' : 'Create'} {compositionType}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

/* ------------------------------ Delete Composition Dialog ------------------------------ */
function DeleteCompositionDialog() {
    const compositionType = useAtomValue(compositionTypeAtom);
    const selectedItem = useAtomValue(selectedItemAtom);
    const isShowDeleteDialog = useAtomValue(isShowDeleteDialogAtom);
    const setSelectedItem = useSetAtom(selectedItemAtom);
    const setIsShowDeleteDialog = useSetAtom(isShowDeleteDialogAtom);
    const tableData = useAtomValue(tableDataAtom);
    const setTableData = useSetAtom(tableDataAtom);

    const handleDeleteCancel = () => {
        setIsShowDeleteDialog(false);
    };

    const handleDeleteConfirm = () => {
        if (selectedItem) {
            // Filter out the selected item from tableData
            const updatedData = tableData.filter(item => item.id !== selectedItem.id);
            setTableData(updatedData);
            console.log('Deleted item:', selectedItem);
        }

        setSelectedItem(null);
        setIsShowDeleteDialog(false);
    };

    return (
        <Dialog open={isShowDeleteDialog} onOpenChange={setIsShowDeleteDialog}>
            <DialogContent className="p-6 max-w-sm">
                <DialogHeader>
                    <DialogTitle>Remove {compositionType}?</DialogTitle>
                    <DialogDescription>
                        This will permanently delete <span className="font-bold italic">{selectedItem?.name}</span>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={handleDeleteCancel}
                        className="cursor-pointer mr-2"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleDeleteConfirm}
                        className="cursor-pointer"
                    >
                        Confirm Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}