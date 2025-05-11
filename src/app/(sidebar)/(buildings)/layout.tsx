
"use client";
import TabbedLayout from "@/components/tabbed-layout";
import { BuildingIcon, WrenchIcon } from "lucide-react";

export default function layout({ children }: Readonly<{ children: React.ReactNode; }>) {
    const tabs = [
        {
            label: "Buildings",
            path: "/buildings",
            icon: BuildingIcon,
        },
        {
            label: "Facilities",
            path: "/buildings/facilities",
            icon: WrenchIcon,
        },
    ];

    return (
        <TabbedLayout tabs={tabs}>
            {children}
        </TabbedLayout>
    );
}
