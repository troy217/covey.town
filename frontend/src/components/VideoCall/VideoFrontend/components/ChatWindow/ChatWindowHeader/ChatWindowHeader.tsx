import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import useChatContext from '../../../hooks/useChatContext/useChatContext';
import CloseIcon from '../../../icons/CloseIcon';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      height: '56px',
      background: '#F4F4F6',
      borderBottom: '1px solid #E4E7E9',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 1em',
    },
    text: {
      fontWeight: 'bold',
    },
    closeChatWindow: {
      cursor: 'pointer',
      display: 'flex',
      background: 'transparent',
      border: '0',
      padding: '0.4em',
    },
  }),
);

export default function ChatWindowHeader() {
  const classes = useStyles();
  const { setIsChatWindowOpen } = useChatContext();
  const { messageTarget } = useChatContext();
  const chatRoomName = messageTarget.name;

  return (
    <div className={classes.container}>
      <div className={classes.text}>{chatRoomName}</div>
      <button className={classes.closeChatWindow} onClick={() => setIsChatWindowOpen(false)}>
        <CloseIcon />
      </button>
    </div>
  );
}
