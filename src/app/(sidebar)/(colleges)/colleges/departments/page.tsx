"use client";
import TableDynamic from "@/components/table-dynamic";
import TableActions from "@/components/table-actions";
import TableSearchComposition from "@/components/table-search-action";
import TableCreateComposition from "@/components/table-create-action";

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
	];

	return (
		<div>
			<TableActions subtitle="Select a department to manage its courses, sections, and faculties.">
				<TableSearchComposition
					placeholder="Search department..."
					onSearch={() => { }} />
				<TableCreateComposition
					title='Department'
					namePlaceholder="e.g., Department of Computer Science"
					descPlaceholder="e.g., Focuses on complex research and algorithms."
					onCreate={() => { }} />
			</TableActions>

			<TableDynamic data={data} headers={headers} />
		</div>
	);
}


