
import Composition from "@/app/(sidebar)/(composition)/composition";


const data = [
    {
        id: "12345678901234567890",
        name: "Empire State Building",
        description: "A 102-story Art Deco skyscraper in New York City.",
        rooms: 102,
        floors: 102,
    },
    {
        id: "22345678901234567890",
        name: "Burj Khalifa",
        description: "The tallest building in the world, located in Dubai.",
        rooms: 163,
        floors: 163,
    },
    {
        id: "32345678901234567890",
        name: "Eiffel Tower",
        description: "A wrought-iron lattice tower in Paris, France.",
        rooms: 3,
        floors: 3,
    },
    {
        id: "42345678901234567890",
        name: "Sydney Opera House",
        description: "A multi-venue performing arts center in Sydney, Australia.",
        rooms: 7,
        floors: 7,
    },
    {
        id: "52345678901234567890",
        name: "Colosseum",
        description: "An ancient amphitheater in Rome, Italy.",
        rooms: 80,
        floors: 4,
    },
    {
        id: "62345678901234567890",
        name: "Big Ben",
        description: "The nickname for the Great Bell of the clock at the Palace of Westminster in London.",
        rooms: 5,
        floors: 5,
    },
    {
        id: "72345678901234567890",
        name: "Taj Mahal",
        description: "An ivory-white marble mausoleum in Agra, India.",
        rooms: 120,
        floors: 3,
    },
];

const header = [
    { key: "name", label: "Name" },
];


export default function Page() {

    return (
        <Composition
            compositionType="Building"
            compositionCaption="Select a building to manage its rooms."
            tableHeader={header}
            tableData={data}
            inputPlaceholder={{
                type: "Building",
                name: "e.g., Empire State Building",
            }}
        />
    );
}