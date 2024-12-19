export default function useQuillValue(
  quillValue: string,
  maxSymbolsCount = [120, 350]
) {
  const container = document.createElement("div");
  container.innerHTML = quillValue || "";

  const textElements = container.querySelectorAll("p");
  const thumbnail =
    Array.from(container.querySelectorAll("img"))?.[0]
      ?.getAttribute("src")
      ?.replace(/"/g, "")
      ?.replace(/\\/g, "") || "";

  const description =
    textElements.length > 0
      ? Array.from(textElements)
          .filter((element) => element.textContent !== "")
          .map((element) => element.textContent)
          .join("\n")
          .slice(0, thumbnail ? maxSymbolsCount[0] : maxSymbolsCount[1])
      : "";

  return { description, thumbnail };
}
