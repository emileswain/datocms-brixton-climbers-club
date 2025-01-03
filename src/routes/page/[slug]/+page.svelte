<!--<script lang="ts">-->
<!--  import { Head, querySubscription, StructuredText } from '@datocms/svelte';-->
<!--  import {-->
<!--    isBlock,-->
<!--    isCode,-->
<!--    isHeading,-->
<!--    isInlineItem,-->
<!--    isItemLink,-->
<!--  } from 'datocms-structured-text-utils';-->
<!--  import HeadingWithAnchorLink from '$lib/components/HeadingWithAnchorLink/index.svelte';-->
<!--  import Block from '$lib/components/Block/index.svelte';-->
<!--  import InlineItem from '$lib/components/InlineItem/index.svelte';-->
<!--  import ItemLink from '$lib/components/ItemLink/index.svelte';-->
<!--  import Code from '$lib/components/Code/index.svelte';-->
<!--  import type { PageData } from './$types';-->

<!--  interface Props {-->
<!--    data: PageData;-->
<!--  }-->

<!--  let { data }: Props = $props();-->
<!--  let subscription = $derived(querySubscription(data.subscription));-->
<!--  let page = $derived($subscription.data?.page);-->
<!--</script>-->

<!--{#if page}-->
<!--  &lt;!&ndash;-->
<!--    The <Head> component provided by @datocms/svelte automates the creation of-->
<!--    meta tags based on the `_seoMetaTags` present in a DatoCMS GraphQL query.-->
<!--  &ndash;&gt;-->
<!--  <Head data={page._seoMetaTags} />-->

<!--  &lt;!&ndash;  <h1>{page.title}</h1>&ndash;&gt;-->

<!--  &lt;!&ndash;-->
<!--    Structured Text is a JSON format similar to HTML, but with the advantage-->
<!--    of a significantly reduced and tailored set of possible tags-->
<!--    for editorial content, along with the capability to create hyperlinks-->
<!--    to other DatoCMS records and embed custom DatoCMS blocks.-->
<!--  &ndash;&gt;-->
<!--  <StructuredText-->
<!--    data={page.structuredText}-->
<!--    components={[-->
<!--      // Although the component knows how to convert all "standard" elements-->
<!--      // (headings, bullet lists, etc.) into HTML, it's possible to customize-->
<!--      // the rendering of each node:-->
<!--      [isCode, Code],-->
<!--      [isHeading, HeadingWithAnchorLink],-->
<!--      [isBlock, Block],-->
<!--      [isInlineItem, InlineItem],-->
<!--      [isItemLink, ItemLink],-->
<!--    ]}-->
<!--  />-->

<!--  <footer>Published at {page._firstPublishedAt}</footer>-->
<!--{/if}-->
<script lang="ts">
  import { Head, querySubscription } from '@datocms/svelte';

  import type { PageData } from './$types';
  import LayoutBloc from '../../../lib/components/LayoutBloc/index.svelte';
  import ContentBloc from '../../../lib/components/BlockLayout/ContentBloc/index.svelte';
  import PageBloc from '../../../lib/components/PageBloc/index.svelte';
  import TopNav from '../../../lib/components/TopNav/index.svelte';
  import Icon from '../../../lib/components/Icon/index.svelte';
  import BlockLayout from '../../../lib/components/BlockLayout/index.svelte';

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();
  let subscription = $derived(querySubscription(data.subscription));
  let page = $derived($subscription.data?.page);
</script>

{#if page}
  <!--
      The <Head> component provided by @datocms/svelte automates the creation of
      meta tags based on the `_seoMetaTags` present in a DatoCMS GraphQL query.
    -->
  <!--    <Head data={page._seoMetaTags}>-->
  <!--        <title></title>-->
  <!--    </Head>-->

  <PageBloc class="article-page">
    <TopNav>
      <a href="/" rel="no-prefetch" aria-label="home">
        <Icon type="home" />
      </a>
    </TopNav>
    <LayoutBloc>
      <ContentBloc>
        <h1>{page.title}</h1>
        <p>{page.shortDescription}</p>
      </ContentBloc>
      <LayoutBloc direction="column">
        {#each page.content as content, i}
          <BlockLayout data={content}/>
        {/each}
      </LayoutBloc>
    </LayoutBloc>
  </PageBloc>
{/if}

<style lang="css">
</style>
