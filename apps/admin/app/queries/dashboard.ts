import { useQuery } from '@tanstack/react-query';

export const useDashboard = () =>
  useQuery(['dashboard'], async () => {
    const res = await fetch('/api/dashboard');
    const data = await res.json();
    return data;
  });
