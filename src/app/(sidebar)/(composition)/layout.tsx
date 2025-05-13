
"use client";

import TabbedLayout from "@/components/tabbed-layout";
import { BuildingIcon, WrenchIcon } from "lucide-react";
import { usePathname } from "next/navigation";

export default function layout({ children }: Readonly<{ children: React.ReactNode; }>) {

    const pathname = usePathname();

    let tabs: Array<{
        label: string;
        path: string;
        icon: React.ComponentType<React.ComponentProps<"svg">>;
    }> = [];

    if (pathname.startsWith("/colleges") || pathname.startsWith("/departments")) {
        tabs = [
            {
                label: "Colleges",
                path: "/colleges",
                icon: BuildingIcon,
            },
            {
                label: "Departments",
                path: "/departments",
                icon: WrenchIcon,
            },
        ];
    }
    else if (pathname.startsWith("/buildings") || pathname.startsWith("/facilities")) {
        tabs = [
            {
                label: "Buildings",
                path: "/buildings",
                icon: BuildingIcon,
            },
            {
                label: "Facilities",
                path: "/facilities",
                icon: WrenchIcon,
            },
        ];
    }

    return (
        <TabbedLayout tabs={tabs}>
            {children}
        </TabbedLayout>
    );
}
