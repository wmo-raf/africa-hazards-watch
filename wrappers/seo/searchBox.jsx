import Head from 'next/head';
import PropTypes from 'prop-types';

const SearchBoxSeo = ({ description }) => {
  const NAME = 'Hazards Watch';
  const IMAGE = 'https://www.hazardswatch.org/assets/card-2.png';
  const LOGO = 'https://www.hazardswatch.org/assets/ahw.png';
  const URL = 'https://www.hazardswatch.org/';
  const SEARCH_TARGET =
    'https://www.hazardswatch.org/search/?query={search_term_string}';

  const ADDRESS = {
    '@type': 'PostalAddress',
    streetAddress: 'Yared Street',
    addressLocality: 'Addis Ababa',
    addressCountry: 'Ethiopia',
  };

  const SCHEMA = {
    '@context': 'http://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: NAME,
        description,
        image: IMAGE,
        logo: LOGO,
        url: URL,
        telephone: '+12027297600',
        sameAs: [
          'https://twitter.com/wmo',
        ],
        address: ADDRESS,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        url: URL,
        potentialAction: {
          '@type': 'SearchAction',
          target: SEARCH_TARGET,
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
      />
    </Head>
  );
};

SearchBoxSeo.propTypes = {
  description: PropTypes.string,
};

export default SearchBoxSeo;
