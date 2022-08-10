import { Tab } from '@chakra-ui/react';
import React from 'react';
import { MessageTarget, MessageType } from '../../../../../../classes/TextConversation';

interface RoomTabProps {
  room: MessageTarget;
  onSelectTab: (messageRoom:MessageTarget) => void;
}

export default function RoomTab({ room, onSelectTab }: RoomTabProps) {
  return <Tab onClick={() => onSelectTab(room)}>{room.name}</Tab>;
}
