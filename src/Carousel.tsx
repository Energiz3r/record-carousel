import React, {useState, useRef} from 'react'

import { createUseStyles, useTheme } from 'react-jss'
import Tile from './Tile'
import { Album } from './Tile'

const useStyles = createUseStyles((theme)=>({
    carouselMain: {
        padding: '1rem',
        maxWidth: '80rem',
        margin: 'auto',
    },
    carouselMinor: {
        //backgroundColor: '#363636',
        background: 'radial-gradient(at 50% 20%, #787878, #636363, #363636)',

        mozBoxShadow:    "inset 5px -15px 25px #000000",
        webkitBoxShadow: "inset 5px -15px 25px #000000",
        boxShadow:         "inset 5px -15px 25px #000000",

        padding: '2rem',
        display: 'flex',
        flexDirection: 'row',
        overflowX: 'hidden',
        overflowY: 'hidden',
        gap: '1rem',

        userSelect: "none", /* supported by Chrome and Opera */
        webkitUserSelect: "none", /* Safari */
        khtmlUserSselect: "none", /* Konqueror HTML */
        mozUserSelect: "none", /* Firefox */
        msUserSelect: "none", /* Internet Explorer/Edge */
    },
    carouselGrabWheel: {
        margin: '1rem',
        height: '83px',
        backgroundImage: "radial-gradient(#212121 20%, rgb(184, 176, 144) 20%)",
        //backgroundImage: "radial-gradient(#212121 20%, #545454 20%)",
        backgroundPosition: "0 0",
        backgroundSize: "83px 83px",
        //width: "100%",
    }
}))

type CarouselProps = {
    albums: Array<Album>
}

const Carousel = ({ albums }: CarouselProps): JSX.Element => {
      const theme = useTheme();
      const classes = useStyles({ theme: Object });

      const carouselRef = useRef<HTMLDivElement>(null)

      const [mouseXPos, onMouseMove] = useState(0)
      const [mouseDown, onMouseDown] = useState(false)
      const [lastMousePos, setLastMousePos] = useState(0)

      const numTiles = albums.length

      return(
          <div className={classes.carouselMain}>
              
              <div className={classes.carouselMinor} ref={carouselRef}>
                {albums.map((album, i) => {
                    const rotation = -15 + i * 2
                    return <Tile key={i} {...album} /> 
                })}
              </div>
              <div className={classes.carouselGrabWheel}
                onMouseDown={(e) => {
                    onMouseDown(true)
                    setLastMousePos(mouseXPos)
                }}
                onMouseUp = {() => {
                    onMouseDown(false)
                    setLastMousePos(0)
                }}
                onMouseMove={(e) => {
                    onMouseMove(e.clientX)
                    if (carouselRef.current != null && mouseDown) { // && now - lastRun > 1
                        const maxDifference = 40
                        const difference = Math.min(Math.max(mouseXPos - lastMousePos, -maxDifference), maxDifference)
                        const curPos = carouselRef.current.scrollLeft
                        const newPos = curPos + -difference
                        console.log("Cur pos: " + curPos + " New pos: " + newPos)
                        carouselRef.current.scrollLeft = newPos
                    }
                }}
              >
                 {/* <p>MouseX: {mouseXPos} MouseDn: {mouseDown ? "yes" : "no"} Track width: {carouselRef.current?.clientWidth} Track position: {carouselRef.current?.scrollLeft} </p> */}
                 </div>          
          </div>
      )
  }
  export default Carousel