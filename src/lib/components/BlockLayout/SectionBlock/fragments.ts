import { graphql } from '$lib/datocms/graphql';
import { ContentBlocFragment } from '../ContentBloc/fragments';

/**
 * Let's define the GraphQL fragment needed for the component to function.
 *
 * GraphQL fragment colocation keeps queries near the components using them,
 * improving maintainability and encapsulation. Fragment composition enables
 * building complex queries from reusable parts, promoting code reuse and
 * efficiency. Together, these practices lead to more modular, maintainable, and
 * performant GraphQL implementations by allowing precise data fetching and
 * easier code management.
 *
 * Learn more: https://gql-tada.0no.co/guides/fragment-colocation
 */

export const SectionBlocFragment = graphql(
  /* GraphQL */ `
    fragment SectionBlocFragment on SectionBlockRecord {
      ... on RecordInterface {
        id
        __typename
      }

      header
      blocs {
        ... on RecordInterface {
          id
          __typename
        }
        ... on ContentBlocRecord {
          ...ContentBlocFragment
        }
      }
    }
  `,
  [ContentBlocFragment],
);