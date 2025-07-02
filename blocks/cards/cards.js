import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export async function applySeeMorePagination(ul, block, itemsPerRow = 3) {
  // const placeholders = await fetchPlaceholders();
  // const { buttontext } = placeholders;
  const listItems = Array.from(ul.querySelectorAll("li"));
  listItems.forEach((li, index) => {
    if (index >= itemsPerRow) {
      li.style.display = "none";
    }
  });
  const button = document.createElement("button");
  button.textContent = "Show more";
  button.className = "cards-show-more";
  let currentIndex = itemsPerRow;
  button.addEventListener("click", () => {
    const nextIndex = currentIndex + itemsPerRow;
    listItems.slice(currentIndex, nextIndex).forEach((li) => {
      li.style.display = "";
    });
    currentIndex = nextIndex;

    if (currentIndex >= listItems.length) {
      button.remove();
    }
  });
  block.append(button);
}
export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
  block.textContent = '';
  block.append(ul);
  applySeeMorePagination(ul, block, 3);
}
