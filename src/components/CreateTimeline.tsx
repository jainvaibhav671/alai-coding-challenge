import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { createShapeId } from "tldraw";
import type { TlDrawElement } from "./TldrawComponent";

type TimelineItem = {
	name: string;
	description?: string;
};

export default function CreateTimeline({
	elements,
	addElement,
}: {
	elements: TlDrawElement[];
	addElement: (element: TlDrawElement) => void;
}) {
	const [open, setOpen] = useState(false);

	return (
		<div className="flex flex-col gap-4">
			<div className="flex gap-3 items-center">
				<h3 className="text-nowrap font-semibold text-md">Timeline Items</h3>
				<AddItemDialog
					open={open}
					toggleOpen={() => setOpen(!open)}
					addElement={addElement}
				/>
			</div>
			{elements.length > 0 && (
				<ul className="flex flex-col gap-2 h-[200px] overflow-y-auto py-2 px-3">
					<ScrollArea>
						{elements.map((item) => (
							<li className="my-2 first:mt-2 last:mb-0" key={item.id}>
								<TimelineItemComponent
									name={item.props.name}
									description={item.props.description}
								/>
							</li>
						))}
					</ScrollArea>
				</ul>
			)}
			<Button type="submit">Create Timeline</Button>
		</div>
	);
}

function TimelineItemComponent({ name, description }: TimelineItem) {
	return (
		<div className="border px-4 py-2 rounded-md">
			<h4 className="text-lg">{name}</h4>
			{typeof description !== "undefined" && (
				<p className="text-muted-foreground text-md">{description}</p>
			)}
		</div>
	);
}

function AddItemDialog({
	toggleOpen,
	open,
	addElement,
}: {
	addElement: (element: TlDrawElement) => void;
	open: boolean;
	toggleOpen: () => void;
}) {
	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const timelineName = formData.get("timeline-name") as string;
		const timelineDesc = formData.get("timeline-description") as string;

		console.log({ timelineDesc, timelineName });
		if (!timelineName) return;

		addElement({
			id: createShapeId(),
			type: "text",
			x: 0,
			y: 0,
			props: {
				name: timelineName,
				description: timelineDesc,
			},
		});
		toggleOpen();
	};

	return (
		<Dialog open={open} onOpenChange={toggleOpen}>
			<DialogTrigger asChild>
				<Button variant={"outline"}>+ Add Item</Button>
			</DialogTrigger>
			<DialogContent className="flex flex-col gap-6">
				<DialogHeader>
					<DialogTitle>Add Timeline Item</DialogTitle>
					<DialogDescription>Add a timeline item</DialogDescription>
				</DialogHeader>
				<form onSubmit={onSubmit} className="flex flex-col gap-3">
					<div className="flex flex-col gap-2">
						<Label>Timeline name</Label>
						<Input type="text" required name="timeline-name" />
					</div>
					<div className="flex flex-col gap-2">
						<Label>Timeline Description</Label>
						<Textarea
							className="resize-none"
							rows={2}
							name="timeline-description"
						/>
					</div>
					<Button type="submit">Add Item</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}
