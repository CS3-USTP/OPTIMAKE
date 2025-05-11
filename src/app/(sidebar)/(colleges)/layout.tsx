
"use client";
import TabbedLayout from "@/components/tabbed-layout";
import { BuildingIcon, WrenchIcon } from "lucide-react";

export default function layout({ children }: Readonly<{ children: React.ReactNode; }>) {
    const tabs = [
        {
            label: "Colleges",
            path: "/colleges",
            icon: BuildingIcon,
        },
        {
            label: "Departments",
            path: "/colleges/departments",
            icon: WrenchIcon,
        },
    ];

    return (
        <TabbedLayout tabs={tabs}>
            {children}
        </TabbedLayout>
    );
}
