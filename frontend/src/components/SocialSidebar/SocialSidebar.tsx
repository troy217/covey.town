import { Heading, StackDivider, VStack } from '@chakra-ui/react';
import React from 'react';
import ConversationAreasList from './ConversationAreasList';
import PlayersList from './PlayersList';

export default function SocialSidebar(): JSX.Element {
  /**
  const players = usePlayersInTown();
  const [userName] = useState<string>(Video.instance()?.userName || '');
  
  let currentPlayer = new Player(nanoid(), nanoid(), {x: 1, y:1, rotation:'front', moving: true});
  players.forEach(user => {
    if (user.userName === userName) {
      currentPlayer = user;
    }
  });
   
  const [contacts, setContacts] = useState(currentPlayer.contacts);
  const onUpdateContacts = (newContacts: Player[]) => {
    setContacts(newContacts);
  }
  */
    return (
      <VStack align="left"
        spacing={2}
        border='2px'
        padding={2}
        marginLeft={2}
        borderColor='gray.500'
        height='100%'
        divider={<StackDivider borderColor='gray.200' />}
        borderRadius='4px'>
          <Heading fontSize='xl' as='h1'>Players In This Town</Heading>
        <PlayersList />
        <ConversationAreasList />
       
      </VStack>
    );
  }
