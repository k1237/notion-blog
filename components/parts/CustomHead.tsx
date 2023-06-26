import Head from "next/head";

interface Props {
  title: string;
  description: string;
}

export default function CustomHead(props: Props) {
  const { title, description } = props;
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {/* <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={pageUrl} /> */}
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      {/* <meta name="twitter:site" content="@yourtwitterhandle" /> */}
      {/* <link rel="canonical" href="https://yourwebsite.com/current-page-url" /> */}
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
