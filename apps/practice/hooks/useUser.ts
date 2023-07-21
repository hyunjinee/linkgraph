import { select } from 'd3';
import { User } from '@supabase/auth-helpers-nextjs';
import { Subscription, UserDetails } from '@/types';
import { createContext, useEffect, useState } from 'react';
import { useSessionContext, useUser as useSupaUser } from '@supabase/auth-helpers-react';

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  subscription: Subscription | null;
  isLoading: boolean;
};

export const UserContext = createContext<UserContextType | null>(null);
export interface Props {
  [propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
  const { session, isLoading: isLoadingUser, supabaseClient: supabase } = useSessionContext();
  const user = useSupaUser();
  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  const getUserDetails = () => supabase.from('user').select('*').single();
  const getSubscription = () =>
    supabase.from('subscriptions').select('*, prices(*, products(*))').in('status', ['trialing', 'active']).single();

  useEffect(() => {
    if (user && !isLoadingData && !userDetails && !subscription) {
      setIsLoadingData(true);
      Promise.allSettled([getUserDetails(), getSubscription()])
        .then(([userDetails, subscription]) => {
          if (userDetails.status === 'fulfilled') {
            setUserDetails(userDetails.value.data);
          }
          if (subscription.status === 'fulfilled') {
            setSubscription(subscription.value.data);
          }
          setIsLoadingData(false);
        })
        .catch((err) => {
          console.error(err);
          setIsLoadingData(false);
        });
    }
  }, []);
};
