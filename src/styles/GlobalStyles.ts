import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
 

  

  html, body, #root {
    height:100%;
  }

  body{ 
    -webkit-font-smoothing: antialiased !important;
    background-color: black
  }


  body, input, button {
    font-size: 14px;
    font-family: 'Arial', Helvetica, sans-serif;
  }


  a {
    text-decoration:none;
  }

  @keyframes loadAnimation {
    0% {
      opacity: 0;
    }

    100% {
      opacity:1
    }
  }

`;
