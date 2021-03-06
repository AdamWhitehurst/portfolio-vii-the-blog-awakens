import styled from 'styled-components'
import SVG from './signature.svg'

export default styled(SVG)`
  position: absolute;
  right: 0;
  top: 0;
  height: 70px;
  z-index: -99;
  /* animation: fade 12s linear infinite; */

  @keyframes fade {
    0% {
      opacity: 1;
    }

    85% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }

  & path {
    fill: none;
    stroke-width: 1;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 4;
    stroke: var(--accent);
    stroke-dasharray: 2575;
    stroke-dashoffset: 2575;
    animation: draw 12s linear forwards;
  }

  @keyframes draw {
    18% {
      stroke-dashoffset: 160;
    }
    19% {
      stroke-dashoffset: 105;
    }
    20.5% {
      stroke-dashoffset: 63;
    }
    24% {
      stroke-dashoffset: 0;
    }
    90% {
      stroke-dashoffset: 0;
    }
    100% {
      /* stroke-dashoffset: -2575; */
      stroke-dashoffset: 0;
    }
  }
`
