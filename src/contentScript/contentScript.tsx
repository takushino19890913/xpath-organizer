import { Card, CardContent, Typography } from '@mui/material'
import React, {useCallback, useEffect, useRef, useState} from 'react'
import ReactDOM from 'react-dom'
import useEventListener from '../hooks/useEventListener'

const App: React.FC<{}> = () => {
    const [isActive, setIsActive] = useState<boolean>(true)
    const [clickedElement, setClickedElement] = useState<HTMLElement>(null)
    const [shiftedElement, setShiftedElement] = useState<HTMLElement>(null)
    const [mousePosition, setMousePositon] = useState<{'x':number, 'y':number}>({x:0,y:0})
    useEffect(() => {
      document.addEventListener('contextmenu', (event) => {
        const target = event.target as HTMLElement
        setClickedElement(target)
      },true)
      document.addEventListener('mousemove', (event) => {
        const x = event.pageX;
        const y = event.pageY;

        setMousePositon({x:x,y:y});
      })
    },[])

    useEffect(() => {
      chrome.storage.local.set({
        clickedElement:clickedElement ? getXpath(clickedElement): ""
      })
    },[clickedElement])

    useEffect(() => {
      chrome.storage.local.set({
        currentSelectedElement:shiftedElement ? getXpath(shiftedElement): ""
      })
    },[shiftedElement])

    const handleKeydown = useCallback((event:KeyboardEvent) => {
      if(event.shiftKey){
        const target = document.elementFromPoint(mousePosition.x,mousePosition.y) as HTMLElement
        setShiftedElement(target)
      }
    }, [mousePosition])

    function getXpath(element:HTMLElement) {
      if(element && element.parentNode) {
        var xpath = getXpath(element.parentNode as HTMLElement) + '/' + element.tagName;
        var s = [];

        for(var i = 0; i < element.parentNode.childNodes.length; i++) {
          var e = element.parentNode.childNodes[i] as HTMLElement;
          if(e.tagName == element.tagName) {
            s.push(e);
          }
        }

        if(1 < s.length) {
          for(var i = 0; i < s.length; i++) {
            if(s[i] === element) {
              xpath += '[' + (i+1) + ']';
              break;
            }
          }
        }

        return xpath.toLowerCase();
      } else {
        return '';
      }
    }

    useEventListener('keydown', handleKeydown);

    return (
        <>
          {isActive && (
            <Card className="overlayCard">
            </Card>
          )}
        </>
      )
}



const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App/>, root)
