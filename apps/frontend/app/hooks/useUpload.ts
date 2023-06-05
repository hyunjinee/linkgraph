import { useState } from 'react';

export const useUpload = () => {
  const upload = () => {
    const promise = new Promise<File | null>((resolve, reject) => {
      const input = document.createElement('input');
      input.accept = 'image/*';

      const timeout = setTimeout(reject, 1000 * 60 * 3);
      input.type = 'file';
      input.onchange = () => {
        clearTimeout(timeout);

        if (!input.files) {
          return reject();
        }

        const file = input.files[0];
        resolve(file);
      };
      input.click();
    });
    return promise;
  };
  return upload;
};
