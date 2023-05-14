import { useState } from 'react';

export default function useTrigger() {
  const [trigger, setTrigger] = useState();

  const triggerFunc = () => {
    setTrigger(!trigger);
  };

  return [trigger, triggerFunc];
}
