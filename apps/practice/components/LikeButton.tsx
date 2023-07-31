'use client';

import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

interface LikeButtonProps {
  songId: string;
}

const LikeButton = ({ songId }: LikeButtonProps) => {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();
  const authModal = useAuthModal();
  const { user } = useUser();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!user) {
      return;
    }

    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from('liked_songs')
        .select('*')
        .eq('song_id', songId)
        .eq('user_id', user.id)
        .single();

      if (!error && data) {
        setIsLiked(true);
      }
    };

    fetchData();
  }, [songId, supabaseClient, user]);

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  const handleLike = async () => {
    if (!user) {
      authModal.onOpen();
      return;
    }

    if (isLiked) {
      const { error } = await supabaseClient.from('liked_songs').delete().eq('song_id', songId).eq('user_id', user.id);
      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(false);
      }
    } else {
      const { error } = await supabaseClient.from('liked_songs').insert({ song_id: songId, user_id: user.id });
      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(true);
        toast.success('Liked!');
      }
    }

    router.refresh();
  };

  return (
    <button onClick={handleLike} className="transition hover:opacity-75">
      <Icon color={isLiked ? '#22c55e' : 'white'} size={25} />
    </button>
  );
};

export default LikeButton;
