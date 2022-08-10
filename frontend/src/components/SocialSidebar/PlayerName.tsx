import React from 'react';
import Player from '../../classes/Player';
import { MessageType } from '../../classes/TextConversation';
import useChatContext from '../VideoCall/VideoFrontend/hooks/useChatContext/useChatContext';

type PlayerNameProps = {
  player: Player;
};
export default function PlayerName({ player }: PlayerNameProps): JSX.Element {
  const { setMessageTarget } = useChatContext();
  return (
    <div>
      <button type="button" onClick={() => setMessageTarget({type:MessageType.private,name:player.userName})}>-chat- </button>
      {player.userName}
    </div>
  );
};
