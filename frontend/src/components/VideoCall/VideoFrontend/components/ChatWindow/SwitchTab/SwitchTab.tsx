import { TabList, Tabs } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { MessageTarget } from '../../../../../../classes/TextConversation';
import useChatContext from '../../../hooks/useChatContext/useChatContext';
import RoomTab from './RoomTab';

export default function SwitchTab() {
  const { messageTarget, setMessageTarget } = useChatContext();
  const [messageRooms, setMessageRooms] = useState<MessageTarget[]>([messageTarget]);
  const [tabIndex, setTabIndex] = useState<number>(0);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  function onUpdateMessageTarget() {
    const newTabIndex = messageRooms.findIndex(
      room => room.type === messageTarget.type && room.name === messageTarget.name,
    );

    // If the target is new create a new tab, else go to this tab.
    if (newTabIndex == -1) {
      setMessageRooms([...messageRooms, messageTarget]);
      setTabIndex(messageRooms.length - 1);
      handleTabsChange(messageRooms.length - 1);
    } else {
      setTabIndex(newTabIndex);
    }
  }

  useEffect(() => {
    onUpdateMessageTarget();
  }, [messageTarget]);

  function onSelectTab(messageRoom: MessageTarget) {
    setMessageTarget(messageRoom);
  }

  return (
    <Tabs index={tabIndex} onChange={handleTabsChange}>
      <TabList>
        {messageRooms.map((messageRoom, index) => (
          <RoomTab key={index} room={messageRoom} onSelectTab={onSelectTab} />
        ))}
      </TabList>
    </Tabs>
  );
}
