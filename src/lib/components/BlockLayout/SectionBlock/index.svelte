<script lang="ts">
  import { onMount } from 'svelte';
  import ContentBloc from '$lib/components/BlockLayout/ContentBloc/index.svelte';

  interface Props {
    id?: string;
    flush?: boolean;
    title?: string;
    active?: boolean;
    showHeader?: boolean;
    children?: import('svelte').Snippet;
  }

  let {
    id,
    flush = false,
    showHeader = true,
    title = '',
    active = true,
    children,
  }: Props = $props();

  let loaded = $state(false);
  onMount(() => (loaded = true));
</script>

<div {id} class="section-bloc" class:inactive={!active}>
  {#if showHeader}
    {#if title}
      <ContentBloc>
        <h1>{title}</h1>
      </ContentBloc>
    {/if}
  {/if}
  {@render children?.()}
</div>

<style>
  /* set default margins of content.*/
  .section-bloc {
    display: flex;
    flex-direction: column;
    flex: 1 1 0;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }

  .inactive {
    display: none;
  }
</style>
