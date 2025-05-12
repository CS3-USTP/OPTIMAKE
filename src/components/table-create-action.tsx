import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { IconTablePlus } from "@tabler/icons-react";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TableCreateComposition({
    title,
    nameInitialValue = "",
    namePlaceholder = "",
    onCreate
}: {
    title: string;
    nameInitialValue?: string;
    namePlaceholder?: string;
    descPlaceholder?: string;
    onCreate: (name: string) => void;
}) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState(nameInitialValue);

    // Reset fields when dialog opens
    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen);
        if (isOpen) {
            setName(nameInitialValue);
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline" className="cursor-pointer">
                    <IconTablePlus size={16} />
                    New {title}
                </Button>
            </DialogTrigger>
            <DialogContent className="p-7">
                <DialogHeader>
                    <DialogTitle>Add a New {title}</DialogTitle>
                    <DialogDescription>
                        Enter the details for the new {title.toLowerCase()} below.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <div className="relative">
                        <Input
                            id="name"
                            maxLength={50}
                            placeholder={namePlaceholder}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="pr-14"
                        />
                        <span
                            className={
                                `absolute bottom-2.5 right-3 text-xs ${name.length >= 45
                                    ? "text-destructive"
                                    : "text-muted-foreground"
                                }`}>
                            {name.length}/50
                        </span>
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        type="submit"
                        className="cursor-pointer"
                        onClick={() => {
                            onCreate(name);
                            setOpen(false);
                        }}
                    >
                        Create {title}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
