import { useElements } from "@/store/elementStore"
import { useEditor } from "tldraw"

export default function MainArea() {
	const editor = useEditor()
	const elements = useElements()

	editor.createShapes(elements || [])

	return <></>
}
