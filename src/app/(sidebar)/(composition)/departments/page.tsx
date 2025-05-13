
import UniversityComposition from "@/components/university-composition";

const data = [
	{
		id: "1a2b3c4d5e6f7g8h9i0j",
		name: "College of Information Technology and Computing",
		description: "Focuses on IT and computing courses and research.",
		departments: 5,
		courses: 20,
		sections: 10,
		faculties: 3,
	},
	{
		id: "2b3c4d5e6f7g8h9i0j1a",
		name: "College of Engineering",
		description: "Offers engineering programs and technical training.",
		departments: 8,
		courses: 30,
		sections: 15,
		faculties: 5,
	},
	{
		id: "3c4d5e6f7g8h9i0j1a2b",
		name: "College of Business Administration",
		description: "Specializes in business, management, and finance studies.",
		departments: 4,
		courses: 15,
		sections: 8,
		faculties: 2,
	},
	{
		id: "4d5e6f7g8h9i0j1a2b3c",
		name: "College of Arts and Humanities",
		description: "Dedicated to arts, literature, and cultural studies.",
		departments: 6,
		courses: 25,
		sections: 12,
		faculties: 4,
	},
	{
		id: "5e6f7g8h9i0j1a2b3c4d",
		name: "College of Science",
		description: "Focuses on natural sciences and research.",
		departments: 7,
		courses: 18,
		sections: 9,
		faculties: 3,
	},
	{
		id: "6f7g8h9i0j1a2b3c4d5e",
		name: "College of Medicine",
		description: "Provides medical education and healthcare training.",
		departments: 10,
		courses: 40,
		sections: 20,
		faculties: 6,
	},
];

const header = [
	{ key: "name", label: "Name" },
];

export default function Page() {

	return (
		<UniversityComposition
			title="Department"
			caption="Select a department to manage its courses, sections, and faculties."
			header={header}
			data={data}
			placeholder="e.g., Department of Computer Science"
		/>
	);
}



