"use client";

export default function TableActions({ subtitle, children }: {
    subtitle: string;
    children: React.ReactNode;
}) {
    return (
        <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600 text-sm mr-4 hidden sm:block">
                {subtitle}
            </p>
            <div className="flex items-center gap-2">
                {children}
            </div>
        </div>
    )
}
