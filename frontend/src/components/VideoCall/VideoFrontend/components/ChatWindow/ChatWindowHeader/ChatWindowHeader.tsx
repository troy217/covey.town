import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import useChatConnectorContext from '../../../hooks/useChatConnectorContext/useChatConnectorContext';
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
  const { setIsChatWindowOpenConnector } = useChatConnectorContext();
  const {setIsChatWindowOpen} = useChatContext();
  const { messageTarget } = useChatConnectorContext();
  const chatRoomName = messageTarget.name;
  
  function onCloseWindow(isWindowClosed:boolean) {
    setIsChatWindowOpenConnector(isWindowClosed);
    setIsChatWindowOpen(isWindowClosed);
  }

  return (
    <div className={classes.container}>
      <div className={classes.text}>{chatRoomName}</div>
      <button className={classes.closeChatWindow} onClick={() => onCloseWindow(false)}>
        <CloseIcon />
      </button>
    </div>
  );
}
