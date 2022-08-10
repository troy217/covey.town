import { Box, Heading, ListItem, OrderedList } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Player, { ContactsListener } from '../../classes/Player';
import PlayerName from './PlayerName';

/**
 * Lists the current contacts of the player
 *
 * See relevant hooks: `usePlayersInTown` and `useCoveyAppState`
 *
 */
type ContactsListProp = {
  player: Player;
  newContacts: Player[];
};

export default function ContactsList({ player, newContacts }: ContactsListProp): JSX.Element {
  const [contacts, setContacts] = useState(newContacts);
  useEffect(() => {
    const onContactsChange = (newContactsList: Player[]) => {
      setContacts(newContactsList);
    }
    onContactsChange(newContacts);
    
  },[newContacts]);
  return (
    <Box>
      <Heading as='h2' fontSize='l'>
        Current contacts:
      </Heading>
      <OrderedList>
        {contacts.map(contact => (
          <ListItem key={contact.id}>
            <PlayerName player={contact} />
          </ListItem>
        ))}
      </OrderedList>
    </Box>
  );
}
