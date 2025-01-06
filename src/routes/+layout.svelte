<script lang="ts">
  import 'sanitize.css';
  import {Head, querySubscription} from '@datocms/svelte';
  import type {LayoutData} from './$types';

  // import DraftModeToggler from '$lib/components/DraftModeToggler/index.svelte';

  interface Props {
    data: LayoutData;
    children?: import('svelte').Snippet;
  }

  let {data, children}: Props = $props();
  let subscription = $derived(querySubscription(data.subscription));
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,100..400&display=swap"
          rel="stylesheet"
  />

  <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/default.min.css"
  />
</svelte:head>

<!--
  The <Head> component provided by @datocms/svelte automates the creation of
  meta tags based on the `_seoMetaTags` present in a DatoCMS GraphQL query.
-->
<Head data={$subscription.data?._site.faviconMetaTags}/>

<!--<header>-->
<!--    &lt;!&ndash;  <h1>DatoCMS + SvelteKit Starter Kit</h1>&ndash;&gt;-->
<!--    <nav>-->
<!--        hello-->
<!--        &lt;!&ndash;    <DraftModeToggler />&ndash;&gt;-->
<!--    </nav>-->
<!--</header>-->

<div class="container">
  {@render children?.()}
</div>

<style>
  /* ########################################################################################### */
  /* CSS Reset */
  /* global styling further down */
  /* ########################################################################################### */

  :global(*, *::before, *::after) {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :global(html, body) {
    /*height: auto;*/
    /*width: auto;*/
    font-family: 'Roboto Flex', Helvetica, Arial, serif;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    padding: 0;
    overscroll-behavior: none;
    /*scrollbar-gutter: stable;*/
  }

  :global(h1, h2, h3, h4, h5, h6, h7) {
    margin-bottom: 12px;
  }

  :global(img, picture, video, canvas, svg) {
    display: block;
  }

  :global(button, input, select, textarea) {
    font-family: inherit;
  }

  /* Remove default padding */
  :global(ul, ol) {
    padding: 0;
  }

  /*  */
  :global(img) {
    display: block;
  }

  /* Inherit fonts for inputs and buttons */
  :global(input, button, textarea, select) {
    font: inherit;
  }

  /* Remove all animations and transitions for people that prefer not to see them */
  @media (prefers-reduced-motion: reduce) {
    :global(*, *::before, *::after) {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  /* Why the marker sits outside disrespecting everyone's layout i dont know. what nasty will this do. */
  :global(li) {
    list-style-position: inside;
  }

  /* ########################################################################################### */
  /*  Global element styles */
  /* ########################################################################################### */

  :global(body) {
    --text-color: #000000;
    --bg-fill: #ffffff;
    --border-fill: #333333;

    /*--text-color: #FFFFFF;*/
    /*--bg-fill: #000000;*/
    /*--border-fill: #333333;*/

    /* colour is stroke colour */
    --icon-color: #000000;
    --icon-fill: #000000;

    /* Layout parameters */
    --page-max-content-width: 300px;
    --page-margin: 18px;
    --bloc-margin-bottom: 18px;
    --page-border-thickness: 15px; /* used on project page.*/
    --page-gap: 8px;

    /* Flat Button styling parameters
                     */
    --btn-color-fill: rgba(108, 138, 121, 0.82);
    --btn-color-fill--hover: #cfe5d9;
    --btn-color-stroke: #fff;
    --btn-color-stroke--hover: #fff;

    /* Button styling parameters
                 */
    --txt-btn-color-fill: rgba(38, 49, 43, 0.82);
    --txt-btn-color-fill--hover: #444d49;
    --txt-btn-color-stroke: #312626;
    --txt-btn-color-stroke--hover: #493b3b;
  }

  /* applied when over 500 */
  @media (min-width: 500px) {
    :global(body) {
      --page-max-content-width: 460px;
      --page-margin: 32px;
      --bloc-margin-bottom: 32px;
      --page-border-thickness: 20px; /* used on project page.*/
    }
  }

  /* applied when over 700 */
  @media (min-width: 700px) {
    :global(body) {
      --page-margin: 32px;
      --bloc-margin-bottom: 32px;
      --page-border-thickness: 20px; /* used on project page.*/
    }
  }

  /*
      .container
      Child of <body> wraps all pages that use this layout.
      <body>
          <div style=".container">
              <div class="homepage|projectpage|blogpage|etc" />
  */
  .container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    margin-right: auto;
    margin-left: auto;
    /* 100lvh required to fill are with little content.
         Disable formatting required due to old version of intellij.*/
    /*@formatter:off*/
    /*noinspection CssInvalidPropertyValue*/
    min-height: 100lvh;
    /*@formatter:on*/
  }

  /*
      h1
      use variables to style colour, font size, etc
  */
  :global(h1) {
    color: var(--text-color);
    text-decoration: none;
    font-family: 'Roboto Flex';
    font-weight: 100;
    margin-bottom: 1rem;
  }

  /*
      a links
      use variables to style colour, font size, etc
  */
  :global(a) {
    color: var(--text-color);
    text-decoration: none;
    font-weight: lighter;
    margin-bottom: 1rem;
  }

  :global(p a) {
    text-decoration: underline;
  }

  /*:global(h4 a:after)*/
  /*{*/
  /*    content: "🔗";*/
  /*}*/


  :global(p) {
    color: var(--text-color);
    /*margin-bottom: 16px;*/
    margin-bottom: 1rem;
    letter-spacing: 1px;
    font-weight: 100;
    font-size: large;
  }

  :global(nav) {
    background-color: #333;
    color: #fff;
  }

  :global(nav a) {
    color: #fff;
    text-decoration: none;
  }

  :global(nav a:hover) {
    background-color: #575757;
  }

</style>
