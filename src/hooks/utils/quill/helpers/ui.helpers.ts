export async function configureReadOnlyQuill(value: string) {
  if (!value) return "";

  const parser = new DOMParser();
  const doc = parser.parseFromString(value, "text/html");
  await appendCopyButtonToCodeBlocks(doc);
  // await appendExtraImagesBoxToImgBlock(doc);

  return doc.body.innerHTML;
}

export function appendIdsToHeaders(doc: Document) {
  const headings = doc.querySelectorAll("h1, h2, h3, h4, h5, h6");

  if (Array.from(headings).length <= 0) return;

  slugifyHeadings(headings);
}

export function configureAnchors(doc: Document) {
  const anchors = doc.querySelectorAll<HTMLAnchorElement>("a");

  if (Array.from(anchors).length <= 0) return;

  anchors.forEach((anchor) => {
    const href = anchor.getAttribute("href");

    if (href.startsWith("#")) {
      anchor.removeAttribute("target");
      anchor.removeAttribute("rel");
    }
  });
}

////////////
// UTILS //
//////////

// Anchors & Headings //
function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function slugifyHeadings(headings: NodeListOf<Element>) {
  headings.forEach((heading) => {
    if (!heading.id) heading.id = slugify(heading.textContent);
  });
}

// Images //
// async function appendExtraImagesBoxToImgBlock(doc: Document) {
//   const paragraphsWithImages = doc.querySelectorAll("p:has(img)");

//   if (!paragraphsWithImages.length) return;

//   paragraphsWithImages.forEach((paragraph) => {
//     const images = Array.from(paragraph.querySelectorAll("img"));
//     paragraph.setAttribute("class", "img-block");

//     if (images.length <= 6) return;

//     const extraImagesEl = createExtraImagesElement(images.length - 6);
//     paragraph.insertBefore(extraImagesEl, paragraph.firstChild);
//   });
// }

// function createExtraImagesElement(extraCount: number) {
//   const extraElement = document.createElement("div");
//   extraElement.setAttribute("class", "extra-imgs");

//   const extraElementChildMarkup = `
//     <span>+${extraCount}</span>
//     <span>Images</span>
//   `;

//   extraElement.insertAdjacentHTML("afterbegin", extraElementChildMarkup);

//   return extraElement;
// }

// Code-Blocks //
async function appendCopyButtonToCodeBlocks(doc: Document) {
  const codeBlocks = doc.querySelectorAll("pre");

  if (!Array.from(codeBlocks).length) return;

  codeBlocks.forEach((block) => wrapCodeBlock(block));
}

const copyButtonIconStr = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path fill="currentColor" d="M16 1H4a2 2 0 0 0-2 2v14h2V3h12V1zm4 4H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 18H8V7h12v16z"/>
  </svg>`;

function wrapCodeBlock(block: HTMLPreElement) {
  const wrapper = createCodeBlockWrapper();
  const copyButton = createCopyButton();

  block.parentNode.insertBefore(wrapper, block);
  wrapper.appendChild(copyButton);
  wrapper.appendChild(block);
}

function createCodeBlockWrapper(): HTMLDivElement {
  const wrapper = document.createElement("div");
  wrapper.setAttribute("class", "code-block-wrapper");
  wrapper.style.position = "relative";

  return wrapper;
}

function createCopyButton(): HTMLButtonElement {
  const button = document.createElement("button");
  button.setAttribute("class", "copy-btn");
  button.innerHTML = copyButtonIconStr;

  return button;
}
