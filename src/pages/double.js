import React, { useState, useRef } from "react";
// import useSiteMetadata from "../hooks/SiteMetadata"
import ReactPlayer from "react-player/lazy";
// import { ImPlay } from "react-icons/im"
// import { StaticImage } from "gatsby-plugin-image"
import Controls from "../components/Controls";
// import {Link} from "gatsby"
import styled from "styled-components"
import Layout from "../components/siteLayout"
const CustomBox = styled.div`

.scroll-container,
.scroll-area {
  max-width: 100vw;
  height: 100vh;
  font-size: 60px;
}

.scroll-container {
  overflow: auto;
  -webkit-scroll-snap-type: y mandatory;
      -ms-scroll-snap-type: y mandatory;
          scroll-snap-type: y mandatory;
}

.scroll-area {
  scroll-snap-align: center;
}

.scroll-container,
.scroll-area {
  margin: 0 auto;
}

.scroll-area {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.scroll-area:nth-of-type(1) {
  background: #49b293;
}

.scroll-area:nth-of-type(2) {
  background: #c94e4b;
}

.scroll-area:nth-of-type(3) {
  background: #4cc1be;
}

.scroll-area:nth-of-type(4) {
  background: #8360A6;
}


`

function Double() {

  
  const [state, setState] = useState({
    playing: true,
    controls: true,
    light: false,
    muted: true,
    loop: true,
  });

  const playerRef = useRef(null);
  const controlsRef = useRef(null);

  const {
    playing,
    controls,
    light,
    muted,
    loop,
    played,
  } = state;

  const handlePlayPause = () => {
    setState({ ...state, playing: !state.playing });
  };

  const hanldeMute = () => {
    setState({ ...state, muted: !state.muted });
  };



  return (

    <CustomBox>
<Layout>


<div className="scroll-container" style={{}}>
  <div className="scroll-area" style={{background:''}}>1</div>
  <div className="scroll-area" style={{background:''}}>2</div>
  <div className="scroll-area" style={{background:''}}>3</div>
  <div className="scroll-area" style={{background:''}}>4</div>
</div>






{/* <iframe loading="lazy" id="" style={{width:'80%', height:'80vh', margin:'0 auto', border:'2px solid red'}} title="iFrame" className="iframe boom" width="980" height="550" src="https://chat.openai.com/chat" frameBorder="0" allowFullScreen></iframe> */}

      {/* <Controls
            ref={controlsRef}
            onPlayPause={handlePlayPause}
            playing={playing}
            played={played}
            onMute={hanldeMute}
            muted={muted}
          />
      <ReactPlayer
            ref={playerRef}
            style={{position:'', zIndex:'0'}}
            width="100%"
            height="100vh"
            // url={iframeUrl}
            url="https://youtu.be/lZzai6at_xA"
            playing={playing}
            controls={controls}
            light={light}
            loop={loop}
            muted={muted}
            playsinline
            config={{
              file: {
                attributes: {
                  crossOrigin: "anonymous",
                },
              },
              youtube: {
                playerVars: { showinfo:0, autoplay:1, controls:0, start:0, end:5000, mute:1  }
              },
            }}
          /> */}

</Layout>



      </CustomBox>
  );
}

export default Double;


// https://youtu.be/NmzuHjWmXOc