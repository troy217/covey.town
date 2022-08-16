import React, { createContext, useEffect, useRef, useState } from 'react';
import useCoveyAppState from '../../../../../hooks/useCoveyAppState';

type ChatConnectorContextType = {
  isChatWindowOpenConnector: boolean;
  setIsChatWindowOpenConnector: (isChatWindowOpen: boolean) => void;
  messageTarget: MessageTarget;
  setMessageTarget: (newMessageTarget: MessageTarget) => void;
};

enum MessageType {
  global,
  private,
}
type MessageTarget = {
  type: MessageType;
  name: string;
};

export const ChatConnectorContext = createContext<ChatConnectorContextType>(null!);

export const ChatConnector: React.FC = ({ children }) => {
  const [isChatWindowOpenConnector, setIsChatWindowOpenConnector] = useState(false);

  const [messageTarget, setMessageTarget] = useState<MessageTarget>({ type: MessageType.global, name: 'Town' });

  

  return (
    <ChatConnectorContext.Provider
      value={{
        isChatWindowOpenConnector,
        setIsChatWindowOpenConnector,
        messageTarget,
        setMessageTarget,
      }}>
      {children}
    </ChatConnectorContext.Provider>
  );
};
