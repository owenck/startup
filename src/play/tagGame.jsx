import React, {useState} from 'react';

import { GameEvent, GameNotifier } from './gameNotifier';

export function TagGame({userName}) {
  
    const [events, setEvent] = React.useState([]);
    const [showMessage, setShowMessage] = useState(false);
  
    React.useEffect(() => {
      GameNotifier.addHandler(handleGameEvent);
  
      return () => {
        GameNotifier.removeHandler(handleGameEvent);
      };
    });
  
    function handleGameEvent(event) {
      setEvent([...events, event]);
    }
  
    function createMessageArray() {
      const messageArray = [];
      for (const [i, event] of events.entries()) {
        let message = 'unknown';
        if (event.type === GameEvent.End) {
          message = `scored ${event.value.score}`;
        } else if (event.type === GameEvent.Start) {
          message = `started a new game`;
        } else if (event.type === GameEvent.System) {
          message = event.value.msg;
        }
  
        messageArray.push(
          <div key={i} className='event'>
            <span className={'player-event'}>{event.from.split('@')[0]}</span>
            {message}
          </div>
        );
        setShowMessage(true);

        setTimeout(() => setShowMessage(false), 2000);
      }
      return messageArray;
    }
  
    return (
      <div className='players'>
        <div id='player-messages'>{createMessageArray()}</div>
        {showMessage && (
                    <div className="message-popup">
                        Friend added successfully!
                    </div>
                )}
      </div>
    );
  }
  