import React, { useEffect, useState } from 'react';
import Picker from 'emoji-picker-react';

export default function Emoji({ addEmoji }) {
  // const [chosenEmoji, setChosenEmoji] = useState('');

  const onEmojiClick = (event, emojiObject) => {
    // setChosenEmoji(emojiObject);
    addEmoji(emojiObject.emoji);
  };

  return (
    <div>
      <Picker
        onEmojiClick={onEmojiClick}
        pickerStyle={{ width: '100%' }}
        searchPlaceholder={'Search emoji'}
      />
    </div>
  );
}
