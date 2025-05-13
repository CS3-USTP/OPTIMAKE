// components/TabbedLayout.tsx
"use client";

import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ReactNode, ElementType } from "react";

interface Tab {
    label: string;
    path: string;
    icon: ElementType;
}

interface TabbedLayoutProps {
    children: ReactNode;
    tabs: Tab[];
}

export default function TabbedLayout({ children, tabs }: TabbedLayoutProps) {
    const router = useRouter();
    const pathname = usePathname();

    const active = "shadow-none rounded-none bg-white border-b-3 border-black hover:bg-white";
    const inactive = "shadow-none rounded-none bg-white hover:bg-white";

    return (
        <div className="flex flex-col gap-6">
            <div className="border-b flex gap-2">
                {tabs.map(({ label, path, icon: Icon }) => {
                    const isActive = pathname.startsWith(path);
                    return (
                        <Button
                            key={path}
                            onClick={() => router.push(path)}
                            className={`cursor-pointer text-grey ${isActive ? active : inactive}`}
                        >
                            <Icon size={16} />
                            {label}
                        </Button>
                    );
                })}
            </div>
            {children}
        </div>
    );
}
