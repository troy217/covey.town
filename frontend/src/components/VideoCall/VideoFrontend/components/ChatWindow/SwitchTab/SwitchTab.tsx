import { TabList, Tabs } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { MessageTarget } from '../../../../../../classes/TextConversation';
import useChatContext from '../../../hooks/useChatContext/useChatContext';
import RoomTab from './RoomTab';

export default function SwitchTab() {
  const { messageTarget, setMessageTarget } = useChatContext();
  const [messageRooms, setMessageRooms] = useState<MessageTarget[]>([messageTarget]);

  function onUpdateMessageTarget() {
    // If the target is new, create a new tab.
    if (!messageRooms.find(room => room === messageTarget)) {
      setMessageRooms([...messageRooms, messageTarget]);
    }
  }

  useEffect(() => {
    onUpdateMessageTarget();
  }, [messageTarget]);

  function onSelectTab(messageRoom: MessageTarget) {
    setMessageTarget(messageRoom);
  }

  return (
    <Tabs>
      <TabList>
        {messageRooms.map((messageRoom, index) => (
          <RoomTab key={index} room={messageRoom} onSelectTab={onSelectTab} />
        ))}
      </TabList>
    </Tabs>
  );
}
