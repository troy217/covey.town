import {
  Box,
  Button,
  Heading,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  OrderedList,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';
import Player, { ServerPlayer } from '../../classes/Player';
import Video from '../../classes/Video/Video';
import useCoveyAppState from '../../hooks/useCoveyAppState';
import useMaybeVideo from '../../hooks/useMaybeVideo';
import usePlayersInTown from '../../hooks/usePlayersInTown';
import PlayerName from './PlayerName';

/**
 * Lists the current players in the town, along with the current town's name and ID
 *
 * See relevant hooks: `usePlayersInTown` and `useCoveyAppState`
 *
 */
/** 
type PlayersListProp = {
  onUpdateContacts: OnUpdateContacts;
};
*/
export default function PlayersInTownList(): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const video = useMaybeVideo();
  const players = usePlayersInTown();
  const { myPlayerID } = useCoveyAppState();
  const { currentTownFriendlyName, currentTownID } = useCoveyAppState();
  const sorted = players.concat([]);
  sorted.sort((p1, p2) =>
    p1.userName.localeCompare(p2.userName, undefined, { numeric: true, sensitivity: 'base' }),
  );
  const openSettings = useCallback(() => {
    onOpen();
    video?.pauseGame();
  }, [onOpen, video]);

  const closeSettings = useCallback(() => {
    onClose();
    video?.unPauseGame();
  }, [onClose, video]);

  let currentPlayer: Player;
  players.forEach(user => {
    if (user.id === myPlayerID) {
      currentPlayer = user;
    }
  });

  const processUpdates = (player: Player, action: string) => {
    sorted.forEach(user => {
      if (user.id === myPlayerID) {
        if (action === 'follow'){
          user.contacts.push(player);
        } else {
          user.contacts = user.contacts.filter(contact => contact !== player);
        }      
      }
    });

    closeSettings();
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
                {!currentPlayer.contacts.includes(player) ? (
                  <ListItem key={player.id} onClick={openSettings}>
                    <PlayerName player={player} />
                    <Modal isOpen={isOpen} onClose={closeSettings}>
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>{player.userName}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                          <Button
                            data-testid='followbutton'
                            colorScheme='blue'
                            mr={3}
                            value='follow'
                            name='action1'
                            onClick={() => processUpdates(player, 'follow')}>
                            Follow
                          </Button>
                          <Button onClick={closeSettings}>Cancel</Button>
                        </ModalBody>
                      </ModalContent>
                    </Modal>
                  </ListItem>
                ) : (
                  <>
                  {!player.contacts.includes(currentPlayer) ? (
                    <ListItem key={player.id} onClick={openSettings}>
                    <p>
                      <PlayerName player={player} />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Followed
                    </p>
                    <Modal isOpen={isOpen} onClose={closeSettings}>
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>{player.userName}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                          <Button
                            data-testid='unfollowbutton'
                            colorScheme='red'
                            mr={3}
                            value='unfollow'
                            name='action2'
                            onClick={() => processUpdates(player, 'unfollow')}>
                            Unfollow
                          </Button>
                          <Button onClick={closeSettings}>Cancel</Button>
                        </ModalBody>
                      </ModalContent>
                    </Modal>
                  </ListItem>
                  ):(
                    <ListItem key={player.id} onClick={openSettings}>
                    <p>
                      <PlayerName player={player} />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Followed
                    </p>
                    <Modal isOpen={isOpen} onClose={closeSettings}>
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>{player.userName}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                          <Button
                            data-testid='chatbutton'
                            colorScheme='blue'
                            mr={3}
                            value='chat'
                            name='action3'
                            // onClick={() => processUpdates(player, 'unfollow')}
                            >
                            Chat
                          </Button>
                          <Button
                            data-testid='unfollowbutton'
                            colorScheme='red'
                            mr={3}
                            value='unfollow'
                            name='action2'
                            onClick={() => processUpdates(player, 'unfollow')}>
                            Unfollow
                          </Button>
                          <Button onClick={closeSettings}>Cancel</Button>
                        </ModalBody>
                      </ModalContent>
                    </Modal>
                  </ListItem>
                  )}
                  </>
                  
                )}
              </>
            ) : (
              <ListItem key={player.id}>
                <p>
                  <PlayerName player={player} />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;You
                </p>
              </ListItem>
            )}
          </>
        ))}
      </OrderedList>
    </Box>
  );
}
