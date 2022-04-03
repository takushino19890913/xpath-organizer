import { EventHandler, useEffect, useRef } from "react";

/**
 *
 * @param eventName - event name,
 * @param handler  - passing event handler.
 * @param element - by default, it is set to window, but you can customize the event by use specific element
 */

export default function useEventListener(eventName, handler, element = window) {
    const savedHandler = useRef<any>();

    useEffect(() => {
      savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
      const isSupported = element && element.addEventListener;
      if(!isSupported) return;
      if(savedHandler != undefined){
        const eventListener = (event) => savedHandler.current(event);

        element.addEventListener(eventName, eventListener);

        return () => {
          element.removeEventListener(eventName, eventListener);
        }
      }
    }, [eventName, element])
  }
