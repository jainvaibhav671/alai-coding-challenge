import { useState } from "react";
import type { Editor } from "tldraw";

type TlDrawElement = Parameters<Editor["createShape"]>[0] & {
	props: {
		name: string;
		description: string;
	}
};

export function useElements() {
	const [ elements, setElements ] = useState<TlDrawElement[]>([])
	return {
		elements,
		getElements: () => elements,
		addElement: (element: TlDrawElement) => setElements([...elements, element])
	}
}
