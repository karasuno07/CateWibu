export function render(elementsToRender, rootElement) {
	elementsToRender.forEach((element) => rootElement.appendChild(element));
}
