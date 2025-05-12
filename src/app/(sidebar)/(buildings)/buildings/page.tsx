"use client";
import TableDynamic from "@/components/table-dynamic";
import TableActions from "@/components/table-actions";
import TableCreateComposition from "@/components/table-create-action";
import TableSearchComposition from "@/components/table-search-action";

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
    ];

    return (
        <div>
            <TableActions subtitle="Select a building to manage its rooms.">
                <TableSearchComposition
                    placeholder="Search for a building..."
                    onSearch={() => { }} />
                <TableCreateComposition
                    title="Building"
                    namePlaceholder="e.g., Information Technology Building"
                    onCreate={(name) => { }} />
            </TableActions>
            <TableDynamic data={data} headers={headers} />
        </div>
    );
}
