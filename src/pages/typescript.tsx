import React from 'react';

import { Inter } from 'next/font/google';

import styles from '../styles/Typescript.module.css';

const inter = Inter({ subsets: ['latin'] });

// Declaring type of props - see "Typing Component Props" for more examples
type AppProps = {
  message: string;
  exclamation?: string;
} & typeof defaultProps; /* use `interface` if exporting so that consumers can extend */

const defaultProps = {
  emoji: `⭐`,
};

// Easiest way to declare a Function Component; return type is inferred.
const AppWithInferredReturnType = ({
  message,
  emoji,
  exclamation,
}: AppProps) => (
  <div className={`${inter.className} ${styles.message}`}>
    {emoji} {message} {exclamation}
  </div>
);

AppWithInferredReturnType.defaultProps = defaultProps;

// you can choose annotate the return type so an error is raised if you accidentally return some other type
const AppDeclaredReturnType = ({
  message,
  emoji,
  exclamation,
}: AppProps): JSX.Element => (
  <div className={`${inter.className} ${styles.message}`}>
    {emoji} {message} {exclamation}
  </div>
);

AppDeclaredReturnType.defaultProps = defaultProps;

// Array return type - this will fail build
const AppArrayReturnType = ({
  message,
  emoji,
  exclamation,
}: AppProps): JSX.Element[] => [
  <div key={1} className={`${inter.className} ${styles.message}`}>
    {emoji} {message} {exclamation}
  </div>,
];

AppArrayReturnType.defaultProps = defaultProps;

const AppArrayCastToElementType = ({ message, emoji, exclamation }: AppProps) =>
  [
    <div key={1} className={`${inter.className} ${styles.message}`}>
      {emoji} {message} {exclamation}
    </div>,
  ] as any as JSX.Element;

AppArrayCastToElementType.defaultProps = defaultProps;

// you can also inline the type declaration; eliminates naming the prop types, but looks repetitive
const AppInlinedPropTypeDeclaration = ({
  message,
  emoji,
  exclamation,
}: {
  message: string;
  emoji: string;
  exclamation?: string;
}) => (
  <div className={`${inter.className} ${styles.message}`}>
    {emoji} {message} {exclamation}
  </div>
);

AppInlinedPropTypeDeclaration.defaultProps = defaultProps;

const Page = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <AppWithInferredReturnType
        message="Inferred return type"
        exclamation="!!"
      />
      <AppDeclaredReturnType message="Declared return type" exclamation="?!" />
      <AppArrayReturnType message="Array return type" exclamation="???" />
      <AppArrayCastToElementType message="Array cast to element" emoji={`🚀`} />
      <AppInlinedPropTypeDeclaration
        message="Inlined prop type declaration"
        emoji={`🪐`}
      />
    </div>
  );
};

export default Page;
