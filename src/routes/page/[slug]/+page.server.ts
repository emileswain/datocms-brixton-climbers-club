import { BlockFragment } from '$lib/components/Block/fragments';
import { InlineItemFragment } from '$lib/components/InlineItem/fragments';
import { ItemLinkFragment } from '$lib/components/ItemLink/fragments';
import { TagFragment } from '$lib/datocms/commonFragments';
import { graphql } from '$lib/datocms/graphql';
import { generateRealtimeSubscription } from '$lib/datocms/queries';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

/**
 * The GraphQL query that will be executed for this route to generate the page
 * content and metadata.
 *
 * Thanks to gql.tada, the result will be fully typed!
 */
const query = graphql(
  /* GraphQL */ `
    query PageQuery($slug: String!) {
      page(filter: { slug: { eq: $slug } })  {
        _seoMetaTags {
          ...TagFragment
        }
        title
        _firstPublishedAt
        structuredText {
          value
          blocks {
            ... on RecordInterface {
              id
              __typename
            }
            ...BlockFragment
          }
          links {
            ... on RecordInterface {
              id
              __typename
            }
            ...ItemLinkFragment
            ...InlineItemFragment
          }
        }
      }
    }
  `,
  [TagFragment, BlockFragment, ItemLinkFragment, InlineItemFragment],
);

/**
 * Executes the query, and returns the result as initialData for potential
 * subscription to the Real-time Updates API (only if the visitor has Draft Mode
 * active)
 */
export const load: PageServerLoad = async (event) => {
  console.log(`PageServerLoad (event.slug ) ${event.slug}`)
  const subscription = await generateRealtimeSubscription(event, query, {slug:"merch"});
  // console.log(`Load: ${subscription.initialData?.homepage?.title}}`)
  if (!subscription.initialData?.page) {
    error(404, 'Page not found');
  }

  return { subscription };
};