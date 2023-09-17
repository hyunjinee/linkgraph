import { PropsWithChildren, createContext, useRef, useState } from 'react';

/**
 *
 * @returns
 */

const AccordianContext = createContext(null);

const useAccordionContext = () => {};

type Props = {
  title?: React.ReactNode;
  contents?: React.ReactNode;
};

const Accordian = ({ children, title, contents }: PropsWithChildren<Props>) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);

  const [isCollapse, setIsCollapse] = useState(false);

  const handleButtonClick = () => {
    if (parentRef.current === null || childRef.current === null) {
      return;
    }

    if (parentRef.current.clientHeight > 0) {
      parentRef.current.style.height = '0px';
      parentRef.current.style.background = 'white';
    } else {
      parentRef.current.style.height = `${childRef.current.clientHeight}px`;
      parentRef.current.style.background = 'lightgray';
    }

    setIsCollapse((prev) => !prev);
  };

  const parentRefHeight = parentRef.current?.style.height ?? '0px';
  const buttonText = parentRefHeight === '0px' ? '열기' : '닫기';

  return (
    <div className="flex flex-col border-solid border-[1px] border-gray-500 rounded justify-center w-full">
      <div className="flex justify-between items-center cursor-pointer h-[32px] w-full px-3">
        {title}
        <button className="bg-transparent border-none cursor-pointer" onClick={handleButtonClick}>
          {buttonText}
        </button>
      </div>
      <div
        ref={parentRef}
        className="h-0 px-8 overflow-hidden"
        style={{
          transition: 'height 0.35s ease, background 0.35s ease',
        }}
      >
        <div ref={childRef} className="p-4">
          {contents}
        </div>
      </div>
    </div>
  );
};

export default Accordian;
