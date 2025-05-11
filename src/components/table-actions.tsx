"use client";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";


export default function TableActions({ subtitle, placeholder, children, onSearch }: {
    subtitle: string;
    placeholder: string;
    children: React.ReactNode;
    onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    return (
        <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600 text-sm mr-4 hidden sm:block">
                {subtitle}
            </p>
            <div className="flex items-center gap-2">
                <div className="relative w-72">
                    <SearchIcon size={16} className="absolute left-2.5 top-2.5 text-gray-500" />
                    <Input placeholder={placeholder} className="pl-8" onChange={onSearch} />
                </div>
                {children}
            </div>
        </div>
    )
}
