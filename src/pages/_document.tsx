import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  
  return (
    <Html lang="en">
      <Head title="Neotron"/>
      <body className="lighttheme darktheme" id="root">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
