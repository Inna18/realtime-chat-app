import React from 'react';
import Chatting from '@/components/Chatting';
import NavLink from '@/components/NavLink';
import { fetchRoom } from '@/service/room';
import { Room } from '@/types';
import Participants from '@/components/Participants';

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const currentRoom: Room = await fetchRoom(id);

  return (
    <>
      {currentRoom && (
        <div className="w-full h-[calc(100vh-68px)] bg-[#fff] py-[32px] px-[60px]">
          <div className="flex justify-end">
            <NavLink
              style={
                'text-[#7836FF] dark:text-[#e0e0e0] text-[16px] font-[500]'
              }
              label={'Back to List'}
              url={'/rooms/list'}
            />
          </div>
          <div
            className={
              'min-w-[400px] p-[20px] m-[20px] rounded-[20px] shadow-[0_10px_35px_rgba(0,0,0,0.1)]'
            }
          >
            <div className="flex">
              <div className="w-[70%] p-[10px] bg-[#f3ebf5] rounded-[20px]">
                <h3 className="py-[10px] border-b border-[#a8a8a8]">
                  {currentRoom.name}
                </h3>
                {currentRoom.id && (
                  <Chatting
                    roomId={currentRoom.id}
                    chatMessages={currentRoom.messages ?? []}
                  />
                )}
              </div>
              <Participants />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default page;
