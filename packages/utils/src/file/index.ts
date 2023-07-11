export const upload = () => {
  return new Promise<File | null>((resolve, reject) => {
    const input = document.createElement('input');
    input.accept = 'image/*';
    input.type = 'file';

    const timeout = setTimeout(reject, 1000 * 60 * 3);

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
};

// export const calculateFileSizeToMB = (file: File) => {
//   const mb = file.size / 1024 / 1024;

//   return mb;
// };
