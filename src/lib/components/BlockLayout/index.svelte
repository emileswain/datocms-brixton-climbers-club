<script lang="ts">
  import { readFragment, type FragmentOf } from '$lib/datocms/graphql';
  import { BlockLayoutFragment } from './fragments';
  import ContentBloc from './ContentBloc/index.svelte';
  import SectionBlock from './SectionBlock/index.svelte';
  import { StructuredText } from '@datocms/svelte';
  import {
    isBlock,
    isCode,
    isHeading,
    isInlineItem,
    isItemLink,
  } from 'datocms-structured-text-utils';
  import Code from '$lib/components/Code/index.svelte';
  import HeadingWithAnchorLink from '$lib/components/HeadingWithAnchorLink/index.svelte';
  import Block from '$lib/components/Block/index.svelte';
  import InlineItem from '$lib/components/InlineItem/index.svelte';
  import ItemLink from '$lib/components/ItemLink/index.svelte';

  interface Props {
    data: FragmentOf<typeof BlockLayoutFragment>;
    numberWang: number;
  }

  let { data, CustomContent, numberWang }: Props = $props();
  let unmaskedBlock = $derived(readFragment(BlockLayoutFragment, data));
</script>

{#snippet StructuredTextBloc(content)}
  {#if CustomContent}
    {@render CustomContent(content)}
  {:else}
    <h2>{content.header}</h2>
    <StructuredText
      data={content.structuredText}
      components={[
        [isCode, Code],
        [isHeading, HeadingWithAnchorLink],
        [isBlock, Block],
        [isInlineItem, InlineItem],
        [isItemLink, ItemLink],
      ]}
    />
  {/if}
{/snippet}

{#if unmaskedBlock.__typename === 'SectionBlockRecord'}
  <SectionBlock data={unmaskedBlock} title={unmaskedBlock.header} showHeader="true">
    {#each unmaskedBlock.blocs as blocContent, i}
      <ContentBloc data={blocContent} numberWang={i + 1}>
        {@render StructuredTextBloc(blocContent)}
      </ContentBloc>
    {/each}
  </SectionBlock>
{:else if unmaskedBlock.__typename === 'ContentBlocRecord'}
  <ContentBloc data={unmaskedBlock} {numberWang}>
    {@render StructuredTextBloc(unmaskedBlock)}
  </ContentBloc>
{/if}
