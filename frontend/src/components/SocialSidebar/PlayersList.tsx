import { Box, Button, Heading, ListItem, OrderedList, Tooltip } from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import React, { useReducer } from 'react';
import Player from '../../classes/Player';
import { MessageType } from '../../classes/TextConversation';
import useCoveyAppState from '../../hooks/useCoveyAppState';
import usePlayersInTown from '../../hooks/usePlayersInTown';
import useChatContext from '../VideoCall/VideoFrontend/hooks/useChatContext/useChatContext';
import PlayerName from './PlayerName';

/**
 * Lists the current players in the town, along with the current town's name and ID
 *
 * See relevant hooks: `usePlayersInTown` and `useCoveyAppState`
 *
 */
export default function PlayersInTownList(): JSX.Element {
  const players = usePlayersInTown();
  const { myPlayerID, currentTownFriendlyName, currentTownID } = useCoveyAppState();
  const { setMessageTarget, setIsChatWindowOpen } = useChatContext();
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const sorted = players.concat([]);
  sorted.sort((p1, p2) =>
    p1.userName.localeCompare(p2.userName, undefined, { numeric: true, sensitivity: 'base' }),
  );

  let currentPlayer: Player = new Player(
    nanoid(),
    nanoid(),
    { moving: true, rotation: 'front', x: 0, y: 0 },
    [],
  );
  players.forEach(user => {
    if (user.id === myPlayerID) {
      currentPlayer = user;
    }
  });

  const processUpdates = (player: Player, action: string) => {
    sorted.forEach(user => {
      if (user.id === myPlayerID) {
        if (action === 'follow') {
          user.contacts.push(player);
        } else if (action === 'unfollow') {
          user.contacts = user.contacts.filter(contact => contact !== player);
        } else {
          setMessageTarget({ type: MessageType.private, name: player.userName });
          setIsChatWindowOpen(true);
        }
      }
    });
    forceUpdate();
  };

  return (
    <Box>
      <Tooltip label={`Town ID: ${currentTownID}`}>
        <Heading as='h2' fontSize='l'>
          Current town: {currentTownFriendlyName}
        </Heading>
      </Tooltip>
      <OrderedList>
        {sorted.map(player => (
          <>
            {myPlayerID !== player.id ? (
              <>
                {!currentPlayer.contacts?.includes(player) ? (
                  <ListItem key={player.id}>
                    <PlayerName player={player} />
                    <Button
                      data-testid='followbutton'
                      colorScheme='blue'
                      mr={3}
                      size='xs'
                      value='follow'
                      name='action1'
                      onClick={() => processUpdates(player, 'follow')}>
                      Follow
                    </Button>
                  </ListItem>
                ) : (
                  <ListItem key={player.id}>
                    <PlayerName player={player} />
                    <Button
                      data-testid='chatbutton'
                      colorScheme='blue'
                      mr={3}
                      size='xs'
                      value='chat'
                      name='action3'
                      onClick={() => processUpdates(player, 'chat')}>
                      Chat
                    </Button>
                    <Button
                      data-testid='unfollowbutton'
                      colorScheme='red'
                      mr={3}
                      size='xs'
                      value='unfollow'
                      name='action2'
                      onClick={() => processUpdates(player, 'unfollow')}>
                      Unfollow
                    </Button>
                  </ListItem>
                )}
              </>
            ) : (
              <ListItem key={player.id}>
                <PlayerName player={player} />
              </ListItem>
            )}
          </>
        ))}
      </OrderedList>
    </Box>
  );
}
