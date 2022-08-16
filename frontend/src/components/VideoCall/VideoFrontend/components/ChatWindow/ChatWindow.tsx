import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';
import { ChatMessage, MessageType } from '../../../../../classes/TextConversation';
import useCoveyAppState from '../../../../../hooks/useCoveyAppState';
import useChatConnectorContext from '../../hooks/useChatConnectorContext/useChatConnectorContext';
import useChatContext from '../../hooks/useChatContext/useChatContext';
import ChatInput from './ChatInput/ChatInput';
import ChatWindowHeader from './ChatWindowHeader/ChatWindowHeader';
import MessageList from './MessageList/MessageList';
import SwitchTab from './SwitchTab/SwitchTab';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chatWindowContainer: {
      'background': '#FFFFFF',
      'zIndex': 1000,
      'display': 'flex',
      'flexDirection': 'column',
      'borderLeft': '1px solid #E4E7E9',
      [theme.breakpoints.down('sm')]: {
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 100,
      },
      'position': 'fixed',
      'bottom': 0,
      'left': 0,
      'top': 0,
      'max-width': '250px',
    },
    hide: {
      display: 'none',
    },
  }),
);

// In this component, we are toggling the visibility of the ChatWindow with CSS instead of
// conditionally rendering the component in the DOM. This is done so that the ChatWindow is
// not unmounted while a file upload is in progress.

export default function ChatWindow() {
  const classes = useStyles();
  const { messages, conversation } = useChatContext();
  const { messageTarget , isChatWindowOpen} = useChatConnectorContext();
  const { userName } = useCoveyAppState();
  const myName = userName;

  function filterMessage(messages: ChatMessage[]) {
    if (messageTarget.type === MessageType.global) {
      return messages.filter(message => message.target.type === MessageType.global);
    } else {
      return messages.filter(
        message =>
          message.target.type === MessageType.private &&
          ((message.target.name === messageTarget.name && message.author == myName) ||
            (message.target.name === myName && message.author == messageTarget.name)),
      );
    }
  }

  const messagesToShow = filterMessage(messages);

  return (
    <aside className={clsx(classes.chatWindowContainer, { [classes.hide]: !isChatWindowOpen })}>
      <SwitchTab />
      <ChatWindowHeader />
      <MessageList messages={messagesToShow} />
      <ChatInput conversation={conversation!} isChatWindowOpen={isChatWindowOpen} />
    </aside>
  );
}
