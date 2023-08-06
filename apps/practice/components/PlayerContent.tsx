'use client';
import { BsPauseFill, BsPlayFill } from 'react-icons/bs';
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai';

import { Song } from '@/types';
import MediaItem from './MediaItem';
import LikeButton from './LikeButton';
import { HiSpeakerXMark, HiSpeakerWave } from 'react-icons/hi2';
import Slider from './Slider';
import usePlayer from '@/hooks/usePlayer';
import { useEffect, useState } from 'react';
import useSound from 'use-sound';

type PlayerContentProps = { song: Song; songUrl: string };

const PlayerContent = ({ song, songUrl }: PlayerContentProps) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume ? HiSpeakerXMark : HiSpeakerWave;
  const [play, { pause, sound }] = useSound(songUrl, {
    volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      onNextPlay();
    },
    onpause: () => setIsPlaying(false),
    format: ['mp3'],
  });

  const onNextPlay = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];
    if (!nextSong) {
      return player.setId(player.ids[0]);
    }
    player.setId(nextSong);
  };
  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousSong = player.ids[currentIndex - 1];
    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }
    player.setId(previousSong);
  };

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };

  return (
    <div className="grid h-full grid-cols-2 md:grid-cols-3">
      <div className="flex justify-start w-full">
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>

      <div className="flex items-center justify-end w-full col-auto md:hidden">
        <div
          onClick={handlePlay}
          className="flex items-center justify-center w-10 h-10 p-1 bg-white rounded-full cursor-pointer"
        >
          <Icon size={30} className="text-black" />
        </div>
      </div>

      <div className="items-center justify-center hidden h-full md:flex w-full max-w-[722px] gap-x-6 ">
        <AiFillStepBackward
          onClick={onPlayPrevious}
          size={30}
          className="transition cursor-pointer text-neutral-400 hover:text-white"
        />
        <div
          onClick={handlePlay}
          className="flex items-center justify-center w-10 h-10 p-1 bg-white rounded-full cursor-pointer"
        >
          <Icon size={30} className="text-black" />
        </div>
        <AiFillStepForward
          onClick={onNextPlay}
          size={30}
          className="transition cursor-pointer text-neutral-400 hover:text-white"
        />
      </div>

      <div className="justify-end hidden w-full pr-2 md:flex">
        <div className="flex items-center w-[120px] gap-x-2 ">
          <VolumeIcon size={34} className="cursor-pointer" onClick={toggleMute} />
          <Slider
            value={volume}
            onChange={(value) => {
              setVolume(value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
