import int from './lib/int';
import replace from './lib/replace';

export default function createMenu() {
  const links = document.querySelectorAll('.menu-link');

  let linkHoverInterval;
  let linkOutInterval;

  Array.from(links).forEach((link) => {
    const self = link;

    self.style.left = int(0, window.innerWidth - link.offsetWidth) + 'px';
    self.style.top = int(0, window.innerHeight - link.offsetHeight) + 'px';

    Draggable.create(self, {
      bounds: document.body,
      dragClickables: true,
      edgeResistance: 1,
      type: 'x, y'
    });

    link.addEventListener('mouseover', () => {
      linkHoverInterval = setInterval(() => {
        const value = self.innerHTML.trim();
        const index = int(0, value.length - 1);
        const char = String.fromCharCode(int(65, 122));

        self.innerHTML = replace(value, index, char);
      }, 1);
    });

    link.addEventListener('mouseout', () => {
      let index = 0;
      const text = link.getAttribute('data-text');

      clearInterval(linkHoverInterval);

      linkOutInterval = setInterval(() => {
        if (index < text.length) {
          let value = self.innerHTML.trim();

          self.innerHTML = replace(value, index, text[index]);
        } else {
          clearInterval(linkOutInterval);
        }

        index++;
      }, 1);
    });
  });
}
