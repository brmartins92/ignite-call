// _app.tsx

import { AppProps } from 'next/app';
import { globalStyles } from '../styles/global';

globalStyles()

function App({ Component, pageProps }: AppProps) {
  // Você pode adicionar quaisquer lógicas ou configurações globais aqui

  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default App;
