import React, { createContext, useEffect, useRef, useState } from 'react';
import TextConversation, {
  ChatMessage,
  MessageTarget,
  MessageType,
} from '../../../../../classes/TextConversation';
import useCoveyAppState from '../../../../../hooks/useCoveyAppState';

type ChatContextType = {
  isChatWindowOpen: boolean;
  setIsChatWindowOpen: (isChatWindowOpen: boolean) => void;
  hasUnreadMessages: boolean;
  messages: ChatMessage[];
  conversation: TextConversation | null;
  messageTarget: MessageTarget;
  setMessageTarget: (newMessageTarget: MessageTarget) => void;
};

export const ChatContext = createContext<ChatContextType>(null!);

export const ChatProvider: React.FC = ({ children }) => {
  const { socket, userName } = useCoveyAppState();
  const isChatWindowOpenRef = useRef(false);
  const [isChatWindowOpen, setIsChatWindowOpen] = useState(false);
  const [conversation, setConversation] = useState<TextConversation | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);

  const [messageTarget, setMessageTarget] = useState<MessageTarget>({ type: MessageType.global, name: 'Town' });

  useEffect(() => {
    if (conversation) {
      const handleMessageAdded = (message: ChatMessage) =>
        setMessages(oldMessages => [...oldMessages, message]);
      //TODO - store entire message queue on server?
      // conversation.getMessages().then(newMessages => setMessages(newMessages.items));
      conversation.onMessageAdded(handleMessageAdded);
      return () => {
        conversation.offMessageAdded(handleMessageAdded);
      };
    }
  }, [conversation]);

  useEffect(() => {
    // If the chat window is closed and there are new messages, set hasUnreadMessages to true
    if (!isChatWindowOpenRef.current && messages.length) {
      setHasUnreadMessages(true);
    }
  }, [messages]);

  useEffect(() => {
    isChatWindowOpenRef.current = isChatWindowOpen;
    if (isChatWindowOpen) setHasUnreadMessages(false);
  }, [isChatWindowOpen]);

  useEffect(() => {
    if (socket) {
      const conv = new TextConversation(socket, userName);
      setConversation(conv);
      return () => {
        conv.close();
      };
    }
  }, [socket, userName, setConversation]);

  return (
    <ChatContext.Provider
      value={{
        isChatWindowOpen,
        setIsChatWindowOpen,
        hasUnreadMessages,
        messages,
        conversation,
        messageTarget,
        setMessageTarget,
      }}>
      {children}
    </ChatContext.Provider>
  );
};
