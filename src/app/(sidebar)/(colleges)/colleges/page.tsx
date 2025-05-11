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
import { BuildingIcon, PlusIcon, SearchIcon, HomeIcon, SettingsIcon, WrenchIcon, Table } from "lucide-react";
import { IconBuildingPlus, IconPick, IconTablePlus } from "@tabler/icons-react";

import TableActions from "@/components/table-actions";



export default function page() {
	const data = [
		{
			name: "College of Information Technology and Computing",
			description: "Focuses on IT and computing courses and research.",
			departments: 5,
			courses: 20,
			sections: 10,
			faculties: 3,
		},
		{
			name: "College of Engineering",
			description: "Offers engineering programs and technical training.",
			departments: 8,
			courses: 30,
			sections: 15,
			faculties: 5,
		},
		{
			name: "College of Business Administration",
			description: "Specializes in business, management, and finance studies.",
			departments: 4,
			courses: 15,
			sections: 8,
			faculties: 2,
		},
		{
			name: "College of Arts and Humanities",
			description: "Dedicated to arts, literature, and cultural studies.",
			departments: 6,
			courses: 25,
			sections: 12,
			faculties: 4,
		},
		{
			name: "College of Science",
			description: "Focuses on natural sciences and research.",
			departments: 7,
			courses: 18,
			sections: 9,
			faculties: 3,
		},
		{
			name: "College of Medicine",
			description: "Provides medical education and healthcare training.",
			departments: 10,
			courses: 40,
			sections: 20,
			faculties: 6,
		},
	]

	const headers = [
		{ key: "name", label: "Name" },
		{ key: "description", label: "Description" },
		// { key: "departments", label: "Departments" },
		// { key: "courses", label: "Courses" },
		// { key: "sections", label: "Sections" },
		// { key: "faculties", label: "Faculties" },
	];

	return (
		<div>
			<TableActions subtitle="Create and select a college to manage its departments." placeholder="Search colleges..." onSearch={() => { }}>
				<AddCollegeDialog />
			</TableActions>
			<TableDynamic headers={headers} data={data} />
		</div>
	);
}


function AddCollegeDialog() {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" className="cursor-pointer">
					<IconTablePlus size={16} />
					New College
				</Button>
			</DialogTrigger>
			<DialogContent className="p-10">
				<DialogHeader>
					<DialogTitle>Add a New College</DialogTitle>
					<DialogDescription>
						Provide the college's name and a brief description.
					</DialogDescription>
				</DialogHeader>

				<div className="grid gap-4 py-4">
					<div className="grid gap-2">
						<Label htmlFor="college-name">College Name</Label>
						<Input id="college-name" placeholder="e.g., College of Fine Arts" />
					</div>

					<div className="grid gap-2">
						<Label htmlFor="college-description">Description</Label>
						<Input
							id="college-description"
							placeholder="e.g., Focuses on visual and performing arts"
						/>
					</div>
				</div>

				<DialogFooter>
					<Button type="submit" className="cursor-pointer w-full">Create College</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

