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
    descInitialValue = "",
    namePlaceholder = "",
    descPlaceholder = "",
    onCreate
}: {
    title: string;
    nameInitialValue?: string;
    descInitialValue?: string;
    namePlaceholder?: string;
    descPlaceholder?: string;
    onCreate: (name: string, desc: string) => void;
}) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState(nameInitialValue);
    const [desc, setDesc] = useState(descInitialValue);

    // Reset fields when dialog opens
    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen);
        if (isOpen) {
            setName(nameInitialValue);
            setDesc(descInitialValue);
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
                        Provide the {title.toLowerCase()}'s name and a brief description.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            maxLength={50}
                            placeholder={namePlaceholder}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Input
                            id="description"
                            maxLength={50}
                            placeholder={descPlaceholder}
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        type="submit"
                        className="cursor-pointer"
                        onClick={() => {
                            onCreate(name, desc);
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
