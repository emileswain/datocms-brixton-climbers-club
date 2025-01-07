<script lang="ts">
  import ResponsiveImage from '$lib/components/ResponsiveImage/index.svelte';
  import { type FragmentOf, readFragment } from '$lib/datocms/graphql';
  import { ImageByTextBlockFragment } from './fragments';

  interface Props {
    data: FragmentOf<typeof ImageByTextBlockFragment>;
  }

  let { data }: Props = $props();

  let unmaskedData = $derived(readFragment(ImageByTextBlockFragment, data));
</script>

<div class="image-by-text {unmaskedData.isAlignedRight ? 'reverse' : ''}">
  <figure>
    <!-- Display responsive image -->
    <ResponsiveImage data={unmaskedData.asset.responsiveImage} />
    <!-- Display image title -->
    <!--  <figcaption>{unmaskedData.asset.title}</figcaption>-->
  </figure>
  <div class="text">
    <p>{unmaskedData.copy}</p>
  </div>
</div>

<style>
  .image-by-text {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0 0 64px 0;
    align-items: center;
  }
  .image-by-text.reverse {
    flex-direction: column;
  }

  .image-by-text .text p {
    text-align: center;
    font-size: xx-large;
    margin-right: 1rem;
    margin-left: 1rem;
    padding: 0;
  }

  :global(.image-by-text.reverse .text) {
    text-align: center !important;
  }

  :global(.image-by-text img) {
    border-radius: 12px;
  }

  :global(.image-by-text > figure > picture > img) {
    /*max-height: 300px;*/
    /*width: 100% !important;*/
    /*height: auto !important;*/
    max-height: unset;
  }

  @media (min-width: 768px) {
    .text {
      text-align: left !important;
      font-size: xx-large !important;
      margin-left: 0 !important;
      margin-right: 0 !important;
      padding-left: 20px;
      padding-right: 20px;
    }
    .text p {
      max-width: 600px;
    }

    .image-by-text {
      flex-direction: row;
    }

    .image-by-text.reverse {
      flex-direction: row-reverse;
    }

    :global(.image-by-text.reverse .text) {
      text-align: left !important;
    }

    :global(.image-by-text > figure) {
      margin: 0;
      padding: 0;
    }

    :global(.image-by-text > figure > picture > img) {
      /*width: 100% !important;*/
      /*height: auto !important;*/
      /*max-height: none;*/
      max-height: 300px;
    }
  }
</style>
