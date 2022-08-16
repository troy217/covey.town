import { useContext } from 'react';
import { ChatConnectorContext } from '../../components/ChatConnector';

export default function useChatConnectorContext() {
  const context = useContext(ChatConnectorContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
}