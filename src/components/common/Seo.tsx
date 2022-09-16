import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { type FC } from 'react';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME;

type SeoProps = Readonly<Partial<{
  title: string,
  description: string,
  noIndex: boolean
}>>;

const Seo: FC<SeoProps> = ({
  title,
  description,
  noIndex
}) => {
  const { asPath } = useRouter();

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        noindex={noIndex}
        twitter={{ cardType: 'summary_large_image' }}
        openGraph={{
          url: `${BASE_URL}${asPath}`,
          title: typeof title === 'undefined' ? undefined : `${title} | ${SITE_NAME}`,
          description,
          site_name: SITE_NAME,
          type: asPath === '/' ? 'website' : 'article',
          images: [
            {
              url: `${BASE_URL}/images/ogp-image-1200x630.png`,
              type: 'image/png',
              alt: '',
              width: 1200,
              height: 630
            }
          ]
        }}
      />
    </>
  );
};

export default Seo;
export { type SeoProps };
