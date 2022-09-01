import { createGlobalStyle } from 'styled-components/macro';
import 'modern-normalize';

// In this component we store the global css rules and modern-normalize.
// Resets and other stuff that might be used globally - put it all here.

export const GlobalStyle = createGlobalStyle`

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  h1,h2,h3,h4,h5,h6,p {
    margin: 0;
  }

 
  img {
    display: block;
    max-width: 100%;
    height: auto;
  }
`;
