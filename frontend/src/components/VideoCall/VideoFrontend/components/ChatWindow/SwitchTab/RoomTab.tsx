import { Tab } from '@chakra-ui/react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { MessageTarget, MessageType } from '../../../../../../classes/TextConversation';
import CloseIcon from '../../../icons/CloseIcon';

interface RoomTabProps {
  room: MessageTarget;
  onCloseTab: (messageRoom: MessageTarget) => void;
}

const useStyles = makeStyles(() =>
  createStyles({
    closeRoomTab: {
      cursor: 'pointer',
      display: 'flex',
      background: 'transparent',
      border: '1',
      width: '15px',
    },
  }),
);

export default function RoomTab({ room, onCloseTab }: RoomTabProps) {
  const classes = useStyles();
  return (
    <Tab>
      <span>{room.name}&nbsp;</span>
      {room.type === MessageType.global ? (
        <p></p>
      ) : (
        <div className={classes.closeRoomTab} onClick={() => onCloseTab(room)}>
          <CloseIcon />
        </div>
      )}
    </Tab>
  );
}
