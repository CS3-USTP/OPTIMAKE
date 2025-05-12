import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";


export default function TableSearchComposition({ placeholder, onSearch }: {
    placeholder: string;
    onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    return (
        <div className="flex items-center gap-2">
            <div className="relative w-72">
                <SearchIcon size={16} className="absolute left-2.5 top-2.5 text-gray-500" />
                <Input placeholder={placeholder} className="pl-8" onChange={onSearch} />
            </div>
        </div>
    )
}