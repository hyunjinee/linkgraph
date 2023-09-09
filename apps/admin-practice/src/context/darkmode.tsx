import { PropsWithChildren, createContext, useReducer } from 'react';

const reducer = (
  state: {
    darkMode: boolean;
  },
  action: {
    type: 'LIGHT' | 'DARK' | 'TOGGLE';
  },
) => {
  switch (action.type) {
    case 'LIGHT': {
      return {
        darkMode: false,
      };
    }
    case 'DARK': {
      return {
        darkMode: true,
      };
    }
    case 'TOGGLE': {
      return {
        darkMode: !state.darkMode,
      };
    }
    default:
      return state;
  }
};

const INITIAL_STATE = {
  darkMode: false,
};

export const DarkModeContext = createContext<{
  darkMode: boolean;
  dispatch?: React.Dispatch<{
    type: 'LIGHT' | 'DARK' | 'TOGGLE';
  }>;
}>({
  darkMode: false,
});

export const DarkModeContextProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  return <DarkModeContext.Provider value={{ darkMode: state.darkMode, dispatch }}>{children}</DarkModeContext.Provider>;
};
