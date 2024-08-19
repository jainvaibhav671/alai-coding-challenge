import { createShapeId, type Editor, Tldraw } from "tldraw";
import CreateTimeline from "./CreateTimeline";
import "tldraw/tldraw.css";
import { useEffect, useState } from "react";

export type TlDrawElement = Parameters<Editor["createShape"]>[0] & {
  props: {
    name: string;
    description: string;
  }
};


export default function TldrawComponent() {

  const [elements, setElements] = useState<TlDrawElement[]>([
    {
      id: createShapeId(),
      type: "text",
      x: 0,
      y: 0,
      props: {
        text: "sdfs"
      }
    }
  ])
  const addElement = (element: TlDrawElement) => setElements([...elements, element])

  const onMount = (editor: Editor) => {
    editor.createShapes(elements)
  }

  useEffect(() => {
    console.log("Elements: ", elements)
  }, [elements])

	return (
			<div className="border-4 border-dashed border-background mt-24 fixed h-1/2 w-1/2 flex gap-4">
				<Tldraw hideUi={true} onMount={onMount} />
				<div>
					<CreateTimeline elements={elements} addElement={addElement} />
				</div>
			</div>
	);
}
