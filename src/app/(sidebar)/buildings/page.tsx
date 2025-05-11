"use client";
import { useState } from "react";
import { DynamicTable } from "@/components/dynamic-table";
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
import { IconBuildingPlus, IconPick } from "@tabler/icons-react";



export default function page() {

	return (
		<div className="flex flex-col gap-6">
			<Tabs defaultValue="buildings" className="w-full">
				<div className="flex items-center justify-between">
					<TabsList className="mb-0 py-5">
						<TabsTrigger value="buildings" className="py-4 px-4 cursor-pointer">
							<BuildingIcon size={16} />
							Buildings
						</TabsTrigger>
						<TabsTrigger value="facility" className="py-4 px-4 cursor-pointer">
							<WrenchIcon size={16} />
							Facilities
						</TabsTrigger>
					</TabsList>
				</div>

				<BuildingTab />
				<FacilityTab />

			</Tabs>
		</div>
	);
}

function BuildingTab() {
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
		{ key: "rooms", label: "Rooms" },
		{ key: "floors", label: "Floors" },
	];

	const [newBuildingOpen, setNewBuildingOpen] = useState(false);

	return (
		<TabsContent value="buildings" className="mt-6">
			<div className="flex justify-between items-center mb-6">
				<p className="text-gray-600 text-sm mr-4 hidden sm:block">
					Create and select a building to manage its assigned facilities.
				</p>
				<div className="flex items-center gap-2">
					<div className="relative w-72">
						<SearchIcon size={16} className="absolute left-2.5 top-2.5 text-gray-500" />
						<Input placeholder="Search buildings..." className="pl-8" />
					</div>

					<Dialog open={newBuildingOpen} onOpenChange={setNewBuildingOpen}>
						<DialogTrigger asChild>
							<Button className="cursor-pointer">
								<IconBuildingPlus size={16} />
								Create Building
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Add New Building</DialogTitle>
								<DialogDescription>Enter the details for the new building</DialogDescription>
							</DialogHeader>
							<div className="grid gap-4 py-4">
								<div className="grid gap-2">
									<Label htmlFor="name">Building Name</Label>
									<Input id="name" placeholder="Enter building name" />
								</div>
								<div className="grid gap-2">
									<Label htmlFor="address">Address</Label>
									<Input id="address" placeholder="Enter address" />
								</div>
								<div className="grid grid-cols-2 gap-4">
									<div className="grid gap-2">
										<Label htmlFor="floors">Floors</Label>
										<Input id="floors" type="number" min="1" placeholder="0" />
									</div>
									<div className="grid gap-2">
										<Label htmlFor="rooms">Total Rooms</Label>
										<Input id="rooms" type="number" min="1" placeholder="0" />
									</div>
								</div>
							</div>
							<DialogFooter>
								<Button variant="outline" onClick={() => setNewBuildingOpen(false)}>
									Cancel
								</Button>
								<Button onClick={() => setNewBuildingOpen(false)}>Save Building</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>
			</div>
			<DynamicTable data={data} headers={headers} />
		</TabsContent>
	);
}

function FacilityTab() {

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
		{ key: "buildings", label: "Buildings" },
		{ key: "rooms", label: "Rooms" },
		{ key: "courses", label: "Courses" },
		{ key: "sections", label: "Sections" },
	];
	const [newFacilityOpen, setNewFacilityOpen] = useState(false);

	return (
		<TabsContent value="facility" className="mt-6">
			<div className="flex justify-between items-center mb-6">
				<p className="text-gray-600 text-sm mr-4 hidden sm:block">
					Define facility types that are required for a building's room.
				</p>

				<div className="flex items-center gap-2">
					<div className="relative w-72">
						<SearchIcon size={16} className="absolute left-2.5 top-2.5 text-gray-500" />
						<Input placeholder="Search facilities..." className="pl-8" />
					</div>

					<Dialog open={newFacilityOpen} onOpenChange={setNewFacilityOpen}>
						<DialogTrigger asChild>
							<Button className="cursor-pointer">
								<IconPick size={16} />
								Create Facility
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Add New Facility Type</DialogTitle>
								<DialogDescription>
									Define a new facility type that can be assigned to rooms
								</DialogDescription>
							</DialogHeader>
							<div className="grid gap-4 py-4">
								<div className="grid gap-2">
									<Label htmlFor="facilityName">Facility Name</Label>
									<Input id="facilityName" placeholder="Enter facility name" />
								</div>
								<div className="grid gap-2">
									<Label htmlFor="category">Category</Label>
									<Input id="category" placeholder="Enter category" />
								</div>
							</div>
							<DialogFooter>
								<Button variant="outline" onClick={() => setNewFacilityOpen(false)}>
									Cancel
								</Button>
								<Button onClick={() => setNewFacilityOpen(false)}>Save Facility</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>
			</div>
			<DynamicTable data={data} headers={headers} />
		</TabsContent>
	);
}