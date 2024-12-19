import { appendIdsToHeaders, configureAnchors } from "./helpers/ui.helpers";

export default function useQuillFitValueUntilSave() {
  function fit(value: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(value, "text/html");

    appendIdsToHeaders(doc);
    configureAnchors(doc);

    const updatedContent = doc.body.innerHTML;

    return updatedContent;
  }

  return { fit };
}
