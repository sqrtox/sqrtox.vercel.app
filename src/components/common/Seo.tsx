import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { type FC } from 'react';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME;

type SeoProps = Readonly<Partial<{
  description: string,
  title: string
}>>;

const Seo: FC<SeoProps> = ({
  title,
  description
}) => {
  const { asPath } = useRouter();

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        twitter={{ cardType: 'summary_large_image' }}
        openGraph={{
          description,
          images: [
            {
              alt: '',
              height: 630,
              type: 'image/png',
              url: `${BASE_URL}/images/ogp-image-1200x630.png`,
              width: 1200
            }
          ],
          site_name: SITE_NAME,
          title: typeof title === 'undefined' ? undefined : `${title} | ${SITE_NAME}`,
          type: asPath === '/' ? 'website' : 'article',
          url: `${BASE_URL}${asPath}`
        }}
      />
    </>
  );
};

export default Seo;
export { type SeoProps };
