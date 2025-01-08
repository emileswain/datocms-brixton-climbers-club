<script lang="ts">
  import { Head, querySubscription, StructuredText } from '@datocms/svelte';
  import {
    isBlock,
    isCode,
    isHeading,
    isInlineItem,
    isItemLink,
  } from 'datocms-structured-text-utils';
  import HeadingWithAnchorLink from '$lib/components/HeadingWithAnchorLink/index.svelte';
  import Block from '$lib/components/Block/index.svelte';
  import InlineItem from '$lib/components/InlineItem/index.svelte';
  import ItemLink from '$lib/components/ItemLink/index.svelte';
  import Code from '$lib/components/Code/index.svelte';
  import PageBloc from '$lib/components/PageBloc/index.svelte';
  import LayoutBloc from '$lib//components/LayoutBloc/index.svelte';
  import ContentBloc from '$lib/components/BlockLayout/ContentBloc/index.svelte';
  import BlockLayout from '$lib/components/BlockLayout/index.svelte';
  import type { PageData } from './$types';

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();
  let subscription = $derived(querySubscription(data.subscription));
  let page = $derived($subscription.data?.homepage);
</script>

{#if page}
  <PageBloc class="homepage">
    <LayoutBloc direction="column">
      {#each page.content as content, i}
        <BlockLayout data={content} />
      {/each}
    </LayoutBloc>
  </PageBloc>
{/if}

<style>
  :global(.container) {
    background: linear-gradient(#f8f6f6, rgba(0, 2, 26, 0.41));
    /*background: radial-gradient(circle at top left, white, rgb(176, 196, 185));*/
  }

  :global(.homepage figure) {
    margin: 0;
    padding: 0;
    margin-bottom: 1rem;
  }

  /*:global(.homepage figure > picture > img) {*/
  /*  margin: 0;*/
  /*  margin-left: auto;*/
  /*  margin-right: auto;*/
  /*  padding: 0;*/
  /*  max-height: 400px;*/
  /*}*/
  /* applied when over 500 */
  /*@media (min-width: 768px) {*/
  /*  :global(figure > picture > img) {*/
  /*    width: auto !important;*/
  /*  }*/
  /*}*/

  /*:global(.homepage figure) {*/
  /*  text-align: start;*/
  /*}*/

  /*:global(.homepage .container div:last-of-type > figure) {*/
  /*  text-align: center;*/
  /*}*/
</style>
