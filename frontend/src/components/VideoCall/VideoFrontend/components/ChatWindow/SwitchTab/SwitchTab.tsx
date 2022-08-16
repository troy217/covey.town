import { TabList, Tabs } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { MessageTarget } from '../../../../../../classes/TextConversation';
import useChatConnectorContext from '../../../hooks/useChatConnectorContext/useChatConnectorContext';
import useChatContext from '../../../hooks/useChatContext/useChatContext';
import RoomTab from './RoomTab';

export default function SwitchTab() {
  const { messageTarget, setMessageTarget } = useChatConnectorContext();
  const [messageRooms, setMessageRooms] = useState<MessageTarget[]>([messageTarget]);
  const [tabIndex, setTabIndex] = useState<number>(0);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
    setMessageTarget(messageRooms[index]);
  };

  function onUpdateMessageTarget() {
    const newTabIndex = messageRooms.findIndex(
      room => room.type === messageTarget.type && room.name === messageTarget.name,
    );
    if (newTabIndex == -1) {
      setMessageRooms([...messageRooms, messageTarget]);
      handleTabsChange(0);
    } else {
      setTabIndex(newTabIndex);
    }
  }

  useEffect(() => {
    onUpdateMessageTarget();
  }, [messageTarget]);

  function onCloseTab(messageRoom: MessageTarget) {
    setMessageRooms(messageRooms.filter(room => room.name !== messageRoom.name));
    setMessageTarget(messageRooms[0]);
    setTabIndex(0);
  }

  return (
    <Tabs index={tabIndex} onChange={handleTabsChange}>
      <TabList overflowX='auto' overflowY='hidden'>
        {messageRooms.map((messageRoom, index) => (
          <RoomTab key={index} room={messageRoom} onCloseTab={onCloseTab} />
        ))}
      </TabList>
    </Tabs>
  );
}
