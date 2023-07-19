'use client';
import React from 'react';
import { TbPlaylist } from 'react-icons/tb';
import { AiOutlinePlus } from 'react-icons/ai';

export default function Library() {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist size={26} className="text-neutral-400" />
          <p className="font-medium text-neutral-400 text-md">Your Library</p>
        </div>
        <AiOutlinePlus
          onClick={() => {}}
          size={20}
          className="transition cursor-pointer text-neutral-400 hover:text-white"
        />
      </div>
    </div>
  );
}
