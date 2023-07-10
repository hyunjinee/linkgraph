import { useState } from 'react';

export const useColor = () => {
  const [color, setColor] = useState('');

  const openPalette = () => {
    return new Promise<string | null>((resolve, reject) => {
      const input = document.createElement('input');
      input.accept = 'color/*';
      input.type = 'color';

      const timeout = setTimeout(reject, 1000 * 60 * 3);
      input.onchange = () => {
        clearTimeout(timeout);

        if (!input.value) {
          return reject();
        }

        const color = input.value;
        setColor(color);
        resolve(color);
      };

      input.click();
    });
  };

  return [color, openPalette] as [typeof color, typeof openPalette];
};
