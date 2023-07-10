import { useContext } from 'react';
import { AuthContext } from '~/components/Core';

export const useAuth = () => {
  return useContext(AuthContext);
};
