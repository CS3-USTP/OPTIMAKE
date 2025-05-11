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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BuildingIcon, PlusIcon, SearchIcon, HomeIcon, SettingsIcon, WrenchIcon } from "lucide-react";
import { IconBuildingPlus, IconPick, IconTablePlus } from "@tabler/icons-react";

import TableActions from "@/components/table-actions";

export default function page() {
    const data = [
        {
            name: "Empire State Building",
            description: "A 102-story Art Deco skyscraper in New York City.",
            rooms: 102,
            floors: 102,
        },
        {
            name: "Burj Khalifa",
            description: "The tallest building in the world, located in Dubai.",
            rooms: 163,
            floors: 163,
        },
        {
            name: "Eiffel Tower",
            description: "A wrought-iron lattice tower in Paris, France.",
            rooms: 3,
            floors: 3,
        },
        {
            name: "Sydney Opera House",
            description: "A multi-venue performing arts center in Sydney, Australia.",
            rooms: 7,
            floors: 7,
        },
        {
            name: "Colosseum",
            description: "An ancient amphitheater in Rome, Italy.",
            rooms: 80,
            floors: 4,
        },
        {
            name: "Big Ben",
            description: "The nickname for the Great Bell of the clock at the Palace of Westminster in London.",
            rooms: 5,
            floors: 5,
        },
        {
            name: "Taj Mahal",
            description: "An ivory-white marble mausoleum in Agra, India.",
            rooms: 120,
            floors: 3,
        },
    ]

    const headers = [
        { key: "name", label: "Name" },
        { key: "description", label: "Description" },
        // { key: "rooms", label: "Rooms" },
        // { key: "floors", label: "Floors" },
    ];

    return (
        <div>
            <TableActions subtitle="Create and select a building to manage its rooms." placeholder="Search buildings..." onSearch={() => { }}>
                <h1>hi</h1>
            </TableActions>
            <TableDynamic data={data} headers={headers} />
        </div>
    );
}
