import { useSafeContext } from '@hyunjin/hooks';
import { createContext } from 'react';

const ACCORDION_NAME = 'Accordion';

const AccordianContext = createContext(null);
AccordianContext.displayName = ACCORDION_NAME;

export const useAccordionContext = () => {
  return useSafeContext(AccordianContext);
};

const Accordian = () => {
  return null;
};

export default Accordian;
