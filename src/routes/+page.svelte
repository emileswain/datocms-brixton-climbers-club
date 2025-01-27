<script lang="ts">
  import { querySubscription } from '@datocms/svelte';
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
  <div class="background">
    <PageBloc class="homepage">
      <LayoutBloc direction="column">
        {#each page.content as content, i}
          <BlockLayout data={content} />
        {/each}
      </LayoutBloc>
    </PageBloc>
  </div>
{/if}

<style>
  .background {
    background: linear-gradient(#f8f6f6, rgba(0, 2, 26, 0.41));
    /*background: radial-gradient(circle at top left, white, rgb(176, 196, 185));*/
  }
</style>
