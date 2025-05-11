"use client";
import { useState } from "react";
import { TableDynamic } from "@/components/table-dynamic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { BuildingIcon, PlusIcon, SearchIcon, HomeIcon, SettingsIcon, WrenchIcon } from "lucide-react";
import { IconBuildingPlus, IconPick, IconTablePlus } from "@tabler/icons-react";
import TableActions from "@/components/table-actions";

export default function page() {

    const data = [
        {
            id: "1",
            name: "Computer Lab",
            description: "A room equipped with computers for educational or work purposes.",
            courses: 10,
            sections: 5,
            buildings: 3, // Count of buildings with this facility
            rooms: 15, // Count of rooms with this facility
        },
        {
            id: "2",
            name: "Audio-Visual Room",
            description: "A facility designed for multimedia presentations and screenings.",
            courses: 5,
            sections: 3,
            buildings: 2, // Count of buildings with this facility
            rooms: 8, // Count of rooms with this facility
        },
        {
            id: "3",
            name: "Mechanic Workshop",
            description: "A workshop equipped for mechanical repairs and training.",
            courses: 8,
            sections: 4,
            buildings: 4, // Count of buildings with this facility
            rooms: 12, // Count of rooms with this facility
        },
        {
            id: "4",
            name: "Library",
            description: "A quiet space with a collection of books and resources for study.",
            courses: 12,
            sections: 6,
            buildings: 5, // Count of buildings with this facility
            rooms: 20, // Count of rooms with this facility
        },
        {
            id: "5",
            name: "Science Lab",
            description: "A laboratory for conducting scientific experiments and research.",
            courses: 7,
            sections: 4,
            buildings: 3, // Count of buildings with this facility
            rooms: 10, // Count of rooms with this facility
        },
        {
            id: "6",
            name: "Conference Room",
            description: "A room for meetings and discussions equipped with presentation tools.",
            courses: 3,
            sections: 2,
            buildings: 2, // Count of buildings with this facility
            rooms: 5, // Count of rooms with this facility
        },
        {
            id: "7",
            name: "Gymnasium",
            description: "A facility for physical exercise and sports activities.",
            courses: 6,
            sections: 3,
            buildings: 4, // Count of buildings with this facility
            rooms: 18, // Count of rooms with this facility
        },
    ]
    const headers = [
        { key: "name", label: "Name" },
        { key: "description", label: "Description" },
        // { key: "buildings", label: "Buildings" },
        // { key: "rooms", label: "Rooms" },
        // { key: "courses", label: "Courses" },
        // { key: "sections", label: "Sections" },
    ];

    return (
        <div>
            <TableActions subtitle="Create and select a facility to manage its rooms." placeholder="Search facilities..." onSearch={() => { }}>
                <h1>hi</h1>
            </TableActions>
            <TableDynamic data={data} headers={headers} />
        </div>
    );
}