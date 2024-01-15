import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Patua+One&display=swap"
          rel="stylesheet"
        />
        <meta
          name="description"
          content="Battleship - A simplified implementation of the classic Battleship game. Play against a computer opponent and strategize your way to victory. Developed by Anthony Mazzie, 2024."
        />
        <meta
          name="keywords"
          content="Battleship, Strategy Game, Board Game, Anthony Mazzie, React, Next.js, Node.js, TypeScript"
        />
        <meta name="author" content="Anthony Mazzie" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
