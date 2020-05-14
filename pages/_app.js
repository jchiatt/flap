import App from 'next/app';
import { ThemeProvider } from 'styled-components';
import { ProvideAuth } from '../firebase/useAuth';
import '../styles/vendor/normalize.css';
import '../styles/global.css';

const theme = {
  breakpoints: {
    xs: '320px',
    sm: '640px',
    md: '960px',
    lg: '1280px',
    xl: '1440px',
  },
  colors: {
    primary: '#3c40c6',
    secondary: '#ef5777',
    white: '#ffffff',
    black: '#1e272e',
    gray: '#d2dae2',
    darkGray: '#485460',
    warning: '#ffd32a',
    error: '#f53b57',
    success: '#0be881',
  },
};

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <ProvideAuth>
          <Component {...pageProps} />
        </ProvideAuth>
      </ThemeProvider>
    );
  }
}
