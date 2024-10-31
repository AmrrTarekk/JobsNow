import { ReactNode } from "react";
import { Helmet } from "react-helmet";

type HelmetProps = {
  description?: string;
  children: ReactNode;
  title?: string;
  seo?: {
    title?: string;
    type?: string;
    description?: string;
    site_name?: string;
    url?: string;
    image_url?: string;
    image_alt?: string;
  };
  keywords?: string;
  link?: {
    rel?: string;
    href?: string;
  };
};

export default function HelmetContainer({
  children,
  title = "",
  description = "",
  seo,
  keywords = "",
  link = {
    rel: "icon",
    href: "",
  },
}: HelmetProps) {
  return (
    <>
      <Helmet>
        <title>{title === `JobsNow` ? `${title}` : `JobsNow: ${title}`}</title>
        <meta name="title" content={seo?.title} />
        <meta name="description" content={description} />
        <meta property="og:type" content={seo?.type} />
        <meta property="og:url" content={seo?.url} />
        <meta property="og:title" content={seo?.title} />
        <meta property="og:description" content={seo?.description} />
        <meta property="og:image" content={seo?.image_url} />
        {/* <meta property="twitter:card" content="summary_large_image" /> */}
        <meta property="twitter:card" content={seo?.image_url} />
        <meta property="twitter:url" content={seo?.url} />
        <meta property="twitter:title" content={seo?.title} />
        <meta property="twitter:description" content={seo?.description} />
        <meta property="twitter:image" content={seo?.image_url} />
        <meta property="twitter:image:alt" content={seo?.image_alt} />
        <meta property="keywords" content={keywords || ""} />
        <link rel={link.rel} href={link.href} />
        {/* {seo?.site_name && (
      <meta property="og:site_name" content={seo.site_name} />
    )} */}
        <meta property="twitter:domain" content={`${window.location.origin}`} />
        <meta
          name="google-site-verification"
          content="cYRqHMP8toPUW0DIEOhyaZwyKN3HBtb9cnEMTp3Z-_A"
        />
        <meta property="og:image:width" content="240" />
        <meta property="og:image:height" content="240" />
      </Helmet>
      <>{children}</>
    </>
  );
}
