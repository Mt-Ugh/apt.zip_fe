<template>
  <div id="app" class="home-page">
    <BannerSlider />
    <NewsSection />
    <TwoSection />
    <FourSection />
  </div>
</template>

<script setup>
import BannerSlider from '@/views/Home/components/BannerSlider.vue'
import NewsSection from '@/views/Home/components/NewSection.vue'
import TwoSection from '@/views/Home/components/TwoSection.vue'
import FourSection from '@/views/Home/components/FourComponent.vue'
</script>
<style>
.home-page .image.fit img {
  width: 100%;
  height: auto;
}

.home-page ol,
.home-page ul {
  list-style: none;
}

.home-page blockquote:before,
.home-page blockquote:after,
.home-page q:before,
.home-page q:after {
  content: '';
  content: none;
}

.home-page body {
  -webkit-text-size-adjust: none;
}

/* Box Model */

*,
*:before,
*:after {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

/* Containers */

.home-page .container {
  margin-left: auto;
  margin-right: auto;
}

.home-page .container.\31 25\25 {
  width: 100%;
  max-width: 100rem;
  min-width: 80rem;
}

.home-page .container.\37 5\25 {
  width: 60rem;
}

.home-page .container.\35 0\25 {
  width: 40rem;
}

.home-page .container.\32 5\25 {
  width: 20rem;
}

.home-page .container {
  width: 80rem;
}

@media screen and (max-width: 1680px) {
  .home-page .container.\31 25\25 {
    width: 100%;
    max-width: 100rem;
    min-width: 80rem;
  }

  .home-page .container.\37 5\25 {
    width: 60rem;
  }

  .home-page .container.\35 0\25 {
    width: 40rem;
  }

  .home-page .container.\32 5\25 {
    width: 20rem;
  }

  .home-page .container {
    width: 80rem;
  }
}

@media screen and (max-width: 1280px) {
  .home-page .container.\31 25\25 {
    width: 100%;
    max-width: 81.25rem;
    min-width: 65rem;
  }

  .home-page .container.\37 5\25 {
    width: 48.75rem;
  }

  .home-page .container.\35 0\25 {
    width: 32.5rem;
  }

  .home-page .container.\32 5\25 {
    width: 16.25rem;
  }

  .home-page .container {
    width: 65rem;
  }
}

@media screen and (max-width: 980px) {
  .home-page .container.\31 25\25 {
    width: 100%;
    max-width: 112.5%;
    min-width: 90%;
  }

  .home-page .container.\37 5\25 {
    width: 67.5%;
  }

  .home-page .container.\35 0\25 {
    width: 45%;
  }

  .home-page .container.\32 5\25 {
    width: 22.5%;
  }

  .home-page .container {
    width: 90%;
  }
}

@media screen and (max-width: 736px) {
  .home-page .container.\31 25\25 {
    width: 100%;
    max-width: 112.5%;
    min-width: 90%;
  }

  .home-page .container.\37 5\25 {
    width: 67.5%;
  }

  .home-page .container.\35 0\25 {
    width: 45%;
  }

  .home-page .container.\32 5\25 {
    width: 22.5%;
  }

  .home-page .container {
    width: 90% !important;
  }
}

@media screen and (max-width: 480px) {
  .home-page .container.\31 25\25 {
    width: 100%;
    max-width: 112.5%;
    min-width: 90%;
  }

  .home-page .container.\37 5\25 {
    width: 67.5%;
  }

  .home-page .container.\35 0\25 {
    width: 45%;
  }

  .home-page .container.\32 5\25 {
    width: 22.5%;
  }

  .home-page .container {
    width: 90% !important;
  }
}

/* Grid */

.home-page .row {
  border-bottom: solid 1px transparent;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.home-page .row > * {
  float: left;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.home-page .row:after,
.home-page .row:before {
  content: '';
  display: block;
  clear: both;
  height: 0;
}

.home-page .row.uniform > * > :first-child {
  margin-top: 0;
}

.home-page .row.uniform > * > :last-child {
  margin-bottom: 0;
}

.home-page .row.\30 \25 > * {
  padding: 0 0 0 0rem;
}

.home-page .row.\30 \25 {
  margin: 0 0 -1px 0rem;
}

.home-page .row.uniform.\30 \25 > * {
  padding: 0rem 0 0 0rem;
}

.home-page .row.uniform.\30 \25 {
  margin: 0rem 0 -1px 0rem;
}

.home-page .row > * {
  padding: 0 0 0 2rem;
}

.home-page .row {
  margin: 0 0 -1px -2rem;
}

.home-page .row.uniform > * {
  padding: 2rem 0 0 2rem;
}

.home-page .row.uniform {
  margin: -2rem 0 -1px -2rem;
}

.home-page .row.\32 00\25 > * {
  padding: 0 0 0 4rem;
}

.home-page .row.\32 00\25 {
  margin: 0 0 -1px -4rem;
}

.home-page .row.uniform.\32 00\25 > * {
  padding: 4rem 0 0 4rem;
}

.home-page .row.uniform.\32 00\25 {
  margin: -4rem 0 -1px -4rem;
}

.home-page .row.\31 50\25 > * {
  padding: 0 0 0 3rem;
}

.home-page .row.\31 50\25 {
  margin: 0 0 -1px -3rem;
}

.home-page .row.uniform.\31 50\25 > * {
  padding: 3rem 0 0 3rem;
}

.home-page .row.uniform.\31 50\25 {
  margin: -3rem 0 -1px -3rem;
}

.home-page .row.\35 0\25 > * {
  padding: 0 0 0 1rem;
}

.home-page .row.\35 0\25 {
  margin: 0 0 -1px -1rem;
}

.home-page .row.uniform.\35 0\25 > * {
  padding: 1rem 0 0 1rem;
}

.home-page .row.uniform.\35 0\25 {
  margin: -1rem 0 -1px -1rem;
}

.home-page .row.\32 5\25 > * {
  padding: 0 0 0 0.5rem;
}

.home-page .row.\32 5\25 {
  margin: 0 0 -1px -0.5rem;
}

.home-page .row.uniform.\32 5\25 > * {
  padding: 0.5rem 0 0 0.5rem;
}

.home-page .row.uniform.\32 5\25 {
  margin: -0.5rem 0 -1px -0.5rem;
}

.home-page .\31 2u,
.home-page .\31 2u\24 {
  width: 100%;
  clear: none;
  margin-left: 0;
}

.home-page .\31 1u,
.home-page .\31 1u\24 {
  width: 91.6666666667%;
  clear: none;
  margin-left: 0;
}

.home-page .\31 0u,
.home-page .\31 0u\24 {
  width: 83.3333333333%;
  clear: none;
  margin-left: 0;
}

.home-page .\39 u,
.home-page .\39 u\24 {
  width: 75%;
  clear: none;
  margin-left: 0;
}

.home-page .\38 u,
.home-page .\38 u\24 {
  width: 66.6666666667%;
  clear: none;
  margin-left: 0;
}

.home-page .\37 u,
.home-page .\37 u\24 {
  width: 58.3333333333%;
  clear: none;
  margin-left: 0;
}

.home-page .\36 u,
.home-page .\36 u\24 {
  width: 50%;
  clear: none;
  margin-left: 0;
}

.home-page .\35 u,
.home-page .\35 u\24 {
  width: 41.6666666667%;
  clear: none;
  margin-left: 0;
}

.home-page .\34 u,
.home-page .\34 u\24 {
  width: 33.3333333333%;
  clear: none;
  margin-left: 0;
}

.home-page .\33 u,
.home-page .\33 u\24 {
  width: 25%;
  clear: none;
  margin-left: 0;
}

.home-page .\32 u,
.home-page .\32 u\24 {
  width: 16.6666666667%;
  clear: none;
  margin-left: 0;
}

.home-page .\31 u,
.home-page .\31 u\24 {
  width: 8.3333333333%;
  clear: none;
  margin-left: 0;
}

.home-page .\31 2u\24 + *,
.home-page .\31 1u\24 + *,
.home-page .\31 0u\24 + *,
.home-page .\39 u\24 + *,
.home-page .\38 u\24 + *,
.home-page .\37 u\24 + *,
.home-page .\36 u\24 + *,
.home-page .\35 u\24 + *,
.home-page .\34 u\24 + *,
.home-page .\33 u\24 + *,
.home-page .\32 u\24 + *,
.home-page .\31 u\24 + * {
  clear: left;
}

.home-page .\-11u {
  margin-left: 91.66667%;
}

.home-page .\-10u {
  margin-left: 83.33333%;
}

.home-page .\-9u {
  margin-left: 75%;
}

.home-page .\-8u {
  margin-left: 66.66667%;
}

.home-page .\-7u {
  margin-left: 58.33333%;
}

.home-page .\-6u {
  margin-left: 50%;
}

.home-page .\-5u {
  margin-left: 41.66667%;
}

.home-page .\-4u {
  margin-left: 33.33333%;
}

.home-page .\-3u {
  margin-left: 25%;
}

.home-page .\-2u {
  margin-left: 16.66667%;
}

.home-page .\-1u {
  margin-left: 8.33333%;
}

@media screen and (max-width: 1680px) {
  .home-page .row > * {
    padding: 0 0 0 2rem;
  }

  .home-page .row {
    margin: 0 0 -1px -2rem;
  }

  .home-page .row.uniform > * {
    padding: 2rem 0 0 2rem;
  }

  .home-page .row.uniform {
    margin: -2rem 0 -1px -2rem;
  }

  .home-page .row.\32 00\25 > * {
    padding: 0 0 0 4rem;
  }

  .home-page .row.\32 00\25 {
    margin: 0 0 -1px -4rem;
  }

  .home-page .row.uniform.\32 00\25 > * {
    padding: 4rem 0 0 4rem;
  }

  .home-page .row.uniform.\32 00\25 {
    margin: -4rem 0 -1px -4rem;
  }

  .home-page .row.\31 50\25 > * {
    padding: 0 0 0 3rem;
  }

  .home-page .row.\31 50\25 {
    margin: 0 0 -1px -3rem;
  }

  .home-page .row.uniform.\31 50\25 > * {
    padding: 3rem 0 0 3rem;
  }

  .home-page .row.uniform.\31 50\25 {
    margin: -3rem 0 -1px -3rem;
  }

  .home-page .row.\35 0\25 > * {
    padding: 0 0 0 1rem;
  }

  .home-page .row.\35 0\25 {
    margin: 0 0 -1px -1rem;
  }

  .home-page .row.uniform.\35 0\25 > * {
    padding: 1rem 0 0 1rem;
  }

  .home-page .row.uniform.\35 0\25 {
    margin: -1rem 0 -1px -1rem;
  }

  .home-page .row.\32 5\25 > * {
    padding: 0 0 0 0.5rem;
  }

  .home-page .row.\32 5\25 {
    margin: 0 0 -1px -0.5rem;
  }

  .home-page .row.uniform.\32 5\25 > * {
    padding: 0.5rem 0 0 0.5rem;
  }

  .home-page .row.uniform.\32 5\25 {
    margin: -0.5rem 0 -1px -0.5rem;
  }

  .home-page .\31 2u\28xlarge\29,
  .home-page .\31 2u\24\28xlarge\29 {
    width: 100%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\31 1u\28xlarge\29,
  .home-page .\31 1u\24\28xlarge\29 {
    width: 91.6666666667%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\31 0u\28xlarge\29,
  .home-page .\31 0u\24\28xlarge\29 {
    width: 83.3333333333%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\39 u\28xlarge\29,
  .home-page .\39 u\24\28xlarge\29 {
    width: 75%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\38 u\28xlarge\29,
  .home-page .\38 u\24\28xlarge\29 {
    width: 66.6666666667%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\37 u\28xlarge\29,
  .home-page .\37 u\24\28xlarge\29 {
    width: 58.3333333333%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\36 u\28xlarge\29,
  .home-page .\36 u\24\28xlarge\29 {
    width: 50%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\35 u\28xlarge\29,
  .home-page .\35 u\24\28xlarge\29 {
    width: 41.6666666667%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\34 u\28xlarge\29,
  .home-page .\34 u\24\28xlarge\29 {
    width: 33.3333333333%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\33 u\28xlarge\29,
  .home-page .\33 u\24\28xlarge\29 {
    width: 25%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\32 u\28xlarge\29,
  .home-page .\32 u\24\28xlarge\29 {
    width: 16.6666666667%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\31 u\28xlarge\29,
  .home-page .\31 u\24\28xlarge\29 {
    width: 8.3333333333%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\31 2u\24\28xlarge\29 + *,
  .home-page .\31 1u\24\28xlarge\29 + *,
  .home-page .\31 0u\24\28xlarge\29 + *,
  .home-page .\39 u\24\28xlarge\29 + *,
  .home-page .\38 u\24\28xlarge\29 + *,
  .home-page .\37 u\24\28xlarge\29 + *,
  .home-page .\36 u\24\28xlarge\29 + *,
  .home-page .\35 u\24\28xlarge\29 + *,
  .home-page .\34 u\24\28xlarge\29 + *,
  .home-page .\33 u\24\28xlarge\29 + *,
  .home-page .\32 u\24\28xlarge\29 + *,
  .home-page .\31 u\24\28xlarge\29 + * {
    clear: left;
  }

  .home-page .\-11u\28xlarge\29 {
    margin-left: 91.66667%;
  }

  .home-page .\-10u\28xlarge\29 {
    margin-left: 83.33333%;
  }

  .home-page .\-9u\28xlarge\29 {
    margin-left: 75%;
  }

  .home-page .\-8u\28xlarge\29 {
    margin-left: 66.66667%;
  }

  .home-page .\-7u\28xlarge\29 {
    margin-left: 58.33333%;
  }

  .home-page .\-6u\28xlarge\29 {
    margin-left: 50%;
  }

  .home-page .\-5u\28xlarge\29 {
    margin-left: 41.66667%;
  }

  .home-page .\-4u\28xlarge\29 {
    margin-left: 33.33333%;
  }

  .home-page .\-3u\28xlarge\29 {
    margin-left: 25%;
  }

  .home-page .\-2u\28xlarge\29 {
    margin-left: 16.66667%;
  }

  .home-page .\-1u\28xlarge\29 {
    margin-left: 8.33333%;
  }
}

@media screen and (max-width: 1280px) {
  .home-page .row > * {
    padding: 0 0 0 1.5rem;
  }

  .home-page .row {
    margin: 0 0 -1px -1.5rem;
  }

  .home-page .row.uniform > * {
    padding: 1.5rem 0 0 1.5rem;
  }

  .home-page .row.uniform {
    margin: -1.5rem 0 -1px -1.5rem;
  }

  .home-page .row.\32 00\25 > * {
    padding: 0 0 0 3rem;
  }

  .home-page .row.\32 00\25 {
    margin: 0 0 -1px -3rem;
  }

  .home-page .row.uniform.\32 00\25 > * {
    padding: 3rem 0 0 3rem;
  }

  .home-page .row.uniform.\32 00\25 {
    margin: -3rem 0 -1px -3rem;
  }

  .home-page .row.\31 50\25 > * {
    padding: 0 0 0 2.25rem;
  }

  .home-page .row.\31 50\25 {
    margin: 0 0 -1px -2.25rem;
  }

  .home-page .row.uniform.\31 50\25 > * {
    padding: 2.25rem 0 0 2.25rem;
  }

  .home-page .row.uniform.\31 50\25 {
    margin: -2.25rem 0 -1px -2.25rem;
  }

  .home-page .row.\35 0\25 > * {
    padding: 0 0 0 0.75rem;
  }

  .home-page .row.\35 0\25 {
    margin: 0 0 -1px -0.75rem;
  }

  .home-page .row.uniform.\35 0\25 > * {
    padding: 0.75rem 0 0 0.75rem;
  }

  .home-page .row.uniform.\35 0\25 {
    margin: -0.75rem 0 -1px -0.75rem;
  }

  .home-page .row.\32 5\25 > * {
    padding: 0 0 0 0.375rem;
  }

  .home-page .row.\32 5\25 {
    margin: 0 0 -1px -0.375rem;
  }

  .home-page .row.uniform.\32 5\25 > * {
    padding: 0.375rem 0 0 0.375rem;
  }

  .home-page .row.uniform.\32 5\25 {
    margin: -0.375rem 0 -1px -0.375rem;
  }

  .home-page .\31 2u\28large\29,
  .home-page .\31 2u\24\28large\29 {
    width: 100%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\31 1u\28large\29,
  .home-page .\31 1u\24\28large\29 {
    width: 91.6666666667%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\31 0u\28large\29,
  .home-page .\31 0u\24\28large\29 {
    width: 83.3333333333%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\39 u\28large\29,
  .home-page .\39 u\24\28large\29 {
    width: 75%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\38 u\28large\29,
  .home-page .\38 u\24\28large\29 {
    width: 66.6666666667%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\37 u\28large\29,
  .home-page .\37 u\24\28large\29 {
    width: 58.3333333333%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\36 u\28large\29,
  .home-page .\36 u\24\28large\29 {
    width: 50%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\35 u\28large\29,
  .home-page .\35 u\24\28large\29 {
    width: 41.6666666667%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\34 u\28large\29,
  .home-page .\34 u\24\28large\29 {
    width: 33.3333333333%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\33 u\28large\29,
  .home-page .\33 u\24\28large\29 {
    width: 25%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\32 u\28large\29,
  .home-page .\32 u\24\28large\29 {
    width: 16.6666666667%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\31 u\28large\29,
  .home-page .\31 u\24\28large\29 {
    width: 8.3333333333%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\31 2u\24\28large\29 + *,
  .home-page .\31 1u\24\28large\29 + *,
  .home-page .\31 0u\24\28large\29 + *,
  .home-page .\39 u\24\28large\29 + *,
  .home-page .\38 u\24\28large\29 + *,
  .home-page .\37 u\24\28large\29 + *,
  .home-page .\36 u\24\28large\29 + *,
  .home-page .\35 u\24\28large\29 + *,
  .home-page .\34 u\24\28large\29 + *,
  .home-page .\33 u\24\28large\29 + *,
  .home-page .\32 u\24\28large\29 + *,
  .home-page .\31 u\24\28large\29 + * {
    clear: left;
  }

  .home-page .\-11u\28large\29 {
    margin-left: 91.66667%;
  }

  .home-page .\-10u\28large\29 {
    margin-left: 83.33333%;
  }

  .home-page .\-9u\28large\29 {
    margin-left: 75%;
  }

  .home-page .\-8u\28large\29 {
    margin-left: 66.66667%;
  }

  .home-page .\-7u\28large\29 {
    margin-left: 58.33333%;
  }

  .home-page .\-6u\28large\29 {
    margin-left: 50%;
  }

  .home-page .\-5u\28large\29 {
    margin-left: 41.66667%;
  }

  .home-page .\-4u\28large\29 {
    margin-left: 33.33333%;
  }

  .home-page .\-3u\28large\29 {
    margin-left: 25%;
  }

  .home-page .\-2u\28large\29 {
    margin-left: 16.66667%;
  }

  .home-page .\-1u\28large\29 {
    margin-left: 8.33333%;
  }
}

@media screen and (max-width: 980px) {
  .home-page .row > * {
    padding: 0 0 0 1.5rem;
  }

  .home-page .row {
    margin: 0 0 -1px -1.5rem;
  }

  .home-page .row.uniform > * {
    padding: 1.5rem 0 0 1.5rem;
  }

  .home-page .row.uniform {
    margin: -1.5rem 0 -1px -1.5rem;
  }

  .home-page .row.\32 00\25 > * {
    padding: 0 0 0 3rem;
  }

  .home-page .row.\32 00\25 {
    margin: 0 0 -1px -3rem;
  }

  .home-page .row.uniform.\32 00\25 > * {
    padding: 3rem 0 0 3rem;
  }

  .home-page .row.uniform.\32 00\25 {
    margin: -3rem 0 -1px -3rem;
  }

  .home-page .row.\31 50\25 > * {
    padding: 0 0 0 2.25rem;
  }

  .home-page .row.\31 50\25 {
    margin: 0 0 -1px -2.25rem;
  }

  .home-page .row.uniform.\31 50\25 > * {
    padding: 2.25rem 0 0 2.25rem;
  }

  .home-page .row.uniform.\31 50\25 {
    margin: -2.25rem 0 -1px -2.25rem;
  }

  .home-page .row.\35 0\25 > * {
    padding: 0 0 0 0.75rem;
  }

  .home-page .row.\35 0\25 {
    margin: 0 0 -1px -0.75rem;
  }

  .home-page .row.uniform.\35 0\25 > * {
    padding: 0.75rem 0 0 0.75rem;
  }

  .home-page .row.uniform.\35 0\25 {
    margin: -0.75rem 0 -1px -0.75rem;
  }

  .home-page .row.\32 5\25 > * {
    padding: 0 0 0 0.375rem;
  }

  .home-page .row.\32 5\25 {
    margin: 0 0 -1px -0.375rem;
  }

  .home-page .row.uniform.\32 5\25 > * {
    padding: 0.375rem 0 0 0.375rem;
  }

  .home-page .row.uniform.\32 5\25 {
    margin: -0.375rem 0 -1px -0.375rem;
  }

  .home-page .\31 2u\28medium\29,
  .home-page .\31 2u\24\28medium\29 {
    width: 100%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\31 1u\28medium\29,
  .home-page .\31 1u\24\28medium\29 {
    width: 91.6666666667%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\31 0u\28medium\29,
  .home-page .\31 0u\24\28medium\29 {
    width: 83.3333333333%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\39 u\28medium\29,
  .home-page .\39 u\24\28medium\29 {
    width: 75%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\38 u\28medium\29,
  .home-page .\38 u\24\28medium\29 {
    width: 66.6666666667%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\37 u\28medium\29,
  .home-page .\37 u\24\28medium\29 {
    width: 58.3333333333%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\36 u\28medium\29,
  .home-page .\36 u\24\28medium\29 {
    width: 50%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\35 u\28medium\29,
  .home-page .\35 u\24\28medium\29 {
    width: 41.6666666667%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\34 u\28medium\29,
  .home-page .\34 u\24\28medium\29 {
    width: 33.3333333333%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\33 u\28medium\29,
  .home-page .\33 u\24\28medium\29 {
    width: 25%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\32 u\28medium\29,
  .home-page .\32 u\24\28medium\29 {
    width: 16.6666666667%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\31 u\28medium\29,
  .home-page .\31 u\24\28medium\29 {
    width: 8.3333333333%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\31 2u\24\28medium\29 + *,
  .home-page .\31 1u\24\28medium\29 + *,
  .home-page .\31 0u\24\28medium\29 + *,
  .home-page .\39 u\24\28medium\29 + *,
  .home-page .\38 u\24\28medium\29 + *,
  .home-page .\37 u\24\28medium\29 + *,
  .home-page .\36 u\24\28medium\29 + *,
  .home-page .\35 u\24\28medium\29 + *,
  .home-page .\34 u\24\28medium\29 + *,
  .home-page .\33 u\24\28medium\29 + *,
  .home-page .\32 u\24\28medium\29 + *,
  .home-page .\31 u\24\28medium\29 + * {
    clear: left;
  }

  .home-page .\-11u\28medium\29 {
    margin-left: 91.66667%;
  }

  .home-page .\-10u\28medium\29 {
    margin-left: 83.33333%;
  }

  .home-page .\-9u\28medium\29 {
    margin-left: 75%;
  }

  .home-page .\-8u\28medium\29 {
    margin-left: 66.66667%;
  }

  .home-page .\-7u\28medium\29 {
    margin-left: 58.33333%;
  }

  .home-page .\-6u\28medium\29 {
    margin-left: 50%;
  }

  .home-page .\-5u\28medium\29 {
    margin-left: 41.66667%;
  }

  .home-page .\-4u\28medium\29 {
    margin-left: 33.33333%;
  }

  .home-page .\-3u\28medium\29 {
    margin-left: 25%;
  }

  .home-page .\-2u\28medium\29 {
    margin-left: 16.66667%;
  }

  .home-page .\-1u\28medium\29 {
    margin-left: 8.33333%;
  }
}

@media screen and (max-width: 736px) {
  .home-page .row > * {
    padding: 0 0 0 1.25rem;
  }

  .home-page .row {
    margin: 0 0 -1px -1.25rem;
  }

  .home-page .row.uniform > * {
    padding: 1.25rem 0 0 1.25rem;
  }

  .home-page .row.uniform {
    margin: -1.25rem 0 -1px -1.25rem;
  }

  .home-page .row.\32 00\25 > * {
    padding: 0 0 0 2.5rem;
  }

  .home-page .row.\32 00\25 {
    margin: 0 0 -1px -2.5rem;
  }

  .home-page .row.uniform.\32 00\25 > * {
    padding: 2.5rem 0 0 2.5rem;
  }

  .home-page .row.uniform.\32 00\25 {
    margin: -2.5rem 0 -1px -2.5rem;
  }

  .home-page .row.\31 50\25 > * {
    padding: 0 0 0 1.875rem;
  }

  .home-page .row.\31 50\25 {
    margin: 0 0 -1px -1.875rem;
  }

  .home-page .row.uniform.\31 50\25 > * {
    padding: 1.875rem 0 0 1.875rem;
  }

  .home-page .row.uniform.\31 50\25 {
    margin: -1.875rem 0 -1px -1.875rem;
  }

  .home-page .row.\35 0\25 > * {
    padding: 0 0 0 0.625rem;
  }

  .home-page .row.\35 0\25 {
    margin: 0 0 -1px -0.625rem;
  }

  .home-page .row.uniform.\35 0\25 > * {
    padding: 0.625rem 0 0 0.625rem;
  }

  .home-page .row.uniform.\35 0\25 {
    margin: -0.625rem 0 -1px -0.625rem;
  }

  .home-page .row.\32 5\25 > * {
    padding: 0 0 0 0.3125rem;
  }

  .home-page .row.\32 5\25 {
    margin: 0 0 -1px -0.3125rem;
  }

  .home-page .row.uniform.\32 5\25 > * {
    padding: 0.3125rem 0 0 0.3125rem;
  }

  .home-page .row.uniform.\32 5\25 {
    margin: -0.3125rem 0 -1px -0.3125rem;
  }

  .home-page .\31 2u\28small\29,
  .home-page .\31 2u\24\28small\29 {
    width: 100%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\31 1u\28small\29,
  .home-page .\31 1u\24\28small\29 {
    width: 91.6666666667%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\31 0u\28small\29,
  .home-page .\31 0u\24\28small\29 {
    width: 83.3333333333%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\39 u\28small\29,
  .home-page .\39 u\24\28small\29 {
    width: 75%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\38 u\28small\29,
  .home-page .\38 u\24\28small\29 {
    width: 66.6666666667%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\37 u\28small\29,
  .home-page .\37 u\24\28small\29 {
    width: 58.3333333333%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\36 u\28small\29,
  .home-page .\36 u\24\28small\29 {
    width: 50%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\35 u\28small\29,
  .home-page .\35 u\24\28small\29 {
    width: 41.6666666667%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\34 u\28small\29,
  .home-page .\34 u\24\28small\29 {
    width: 33.3333333333%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\33 u\28small\29,
  .home-page .\33 u\24\28small\29 {
    width: 25%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\32 u\28small\29,
  .home-page .\32 u\24\28small\29 {
    width: 16.6666666667%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\31 u\28small\29,
  .home-page .\31 u\24\28small\29 {
    width: 8.3333333333%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\31 2u\24\28small\29 + *,
  .home-page .\31 1u\24\28small\29 + *,
  .home-page .\31 0u\24\28small\29 + *,
  .home-page .\39 u\24\28small\29 + *,
  .home-page .\38 u\24\28small\29 + *,
  .home-page .\37 u\24\28small\29 + *,
  .home-page .\36 u\24\28small\29 + *,
  .home-page .\35 u\24\28small\29 + *,
  .home-page .\34 u\24\28small\29 + *,
  .home-page .\33 u\24\28small\29 + *,
  .home-page .\32 u\24\28small\29 + *,
  .home-page .\31 u\24\28small\29 + * {
    clear: left;
  }

  .home-page .\-11u\28small\29 {
    margin-left: 91.66667%;
  }

  .home-page .\-10u\28small\29 {
    margin-left: 83.33333%;
  }

  .home-page .\-9u\28small\29 {
    margin-left: 75%;
  }

  .home-page .\-8u\28small\29 {
    margin-left: 66.66667%;
  }

  .home-page .\-7u\28small\29 {
    margin-left: 58.33333%;
  }

  .home-page .\-6u\28small\29 {
    margin-left: 50%;
  }

  .home-page .\-5u\28small\29 {
    margin-left: 41.66667%;
  }

  .home-page .\-4u\28small\29 {
    margin-left: 33.33333%;
  }

  .home-page .\-3u\28small\29 {
    margin-left: 25%;
  }

  .home-page .\-2u\28small\29 {
    margin-left: 16.66667%;
  }

  .home-page .\-1u\28small\29 {
    margin-left: 8.33333%;
  }
}

@media screen and (max-width: 480px) {
  .home-page .row > * {
    padding: 0 0 0 1.25rem;
  }

  .home-page .row {
    margin: 0 0 -1px -1.25rem;
  }

  .home-page .row.uniform > * {
    padding: 1.25rem 0 0 1.25rem;
  }

  .home-page .row.uniform {
    margin: -1.25rem 0 -1px -1.25rem;
  }

  .home-page .row.\32 00\25 > * {
    padding: 0 0 0 2.5rem;
  }

  .home-page .row.\32 00\25 {
    margin: 0 0 -1px -2.5rem;
  }

  .home-page .row.uniform.\32 00\25 > * {
    padding: 2.5rem 0 0 2.5rem;
  }

  .home-page .row.uniform.\32 00\25 {
    margin: -2.5rem 0 -1px -2.5rem;
  }

  .home-page .row.\31 50\25 > * {
    padding: 0 0 0 1.875rem;
  }

  .home-page .row.\31 50\25 {
    margin: 0 0 -1px -1.875rem;
  }

  .home-page .row.uniform.\31 50\25 > * {
    padding: 1.875rem 0 0 1.875rem;
  }

  .home-page .row.uniform.\31 50\25 {
    margin: -1.875rem 0 -1px -1.875rem;
  }

  .home-page .row.\35 0\25 > * {
    padding: 0 0 0 0.625rem;
  }

  .home-page .row.\35 0\25 {
    margin: 0 0 -1px -0.625rem;
  }

  .home-page .row.uniform.\35 0\25 > * {
    padding: 0.625rem 0 0 0.625rem;
  }

  .home-page .row.uniform.\35 0\25 {
    margin: -0.625rem 0 -1px -0.625rem;
  }

  .home-page .row.\32 5\25 > * {
    padding: 0 0 0 0.3125rem;
  }

  .home-page .row.\32 5\25 {
    margin: 0 0 -1px -0.3125rem;
  }

  .home-page .row.uniform.\32 5\25 > * {
    padding: 0.3125rem 0 0 0.3125rem;
  }

  .home-page .row.uniform.\32 5\25 {
    margin: -0.3125rem 0 -1px -0.3125rem;
  }

  .home-page .\31 2u\28xsmall\29,
  .home-page .\31 2u\24\28xsmall\29 {
    width: 100%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\31 1u\28xsmall\29,
  .home-page .\31 1u\24\28xsmall\29 {
    width: 91.6666666667%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\31 0u\28xsmall\29,
  .home-page .\31 0u\24\28xsmall\29 {
    width: 83.3333333333%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\39 u\28xsmall\29,
  .home-page .\39 u\24\28xsmall\29 {
    width: 75%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\38 u\28xsmall\29,
  .home-page .\38 u\24\28xsmall\29 {
    width: 66.6666666667%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\37 u\28xsmall\29,
  .home-page .\37 u\24\28xsmall\29 {
    width: 58.3333333333%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\36 u\28xsmall\29,
  .home-page .\36 u\24\28xsmall\29 {
    width: 50%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\35 u\28xsmall\29,
  .home-page .\35 u\24\28xsmall\29 {
    width: 41.6666666667%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\34 u\28xsmall\29,
  .home-page .\34 u\24\28xsmall\29 {
    width: 33.3333333333%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\33 u\28xsmall\29,
  .home-page .\33 u\24\28xsmall\29 {
    width: 25%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\32 u\28xsmall\29,
  .home-page .\32 u\24\28xsmall\29 {
    width: 16.6666666667%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\31 u\28xsmall\29,
  .home-page .\31 u\24\28xsmall\29 {
    width: 8.3333333333%;
    clear: none;
    margin-left: 0;
  }

  .home-page .\31 2u\24\28xsmall\29 + *,
  .home-page .\31 1u\24\28xsmall\29 + *,
  .home-page .\31 0u\24\28xsmall\29 + *,
  .home-page .\39 u\24\28xsmall\29 + *,
  .home-page .\38 u\24\28xsmall\29 + *,
  .home-page .\37 u\24\28xsmall\29 + *,
  .home-page .\36 u\24\28xsmall\29 + *,
  .home-page .\35 u\24\28xsmall\29 + *,
  .home-page .\34 u\24\28xsmall\29 + *,
  .home-page .\33 u\24\28xsmall\29 + *,
  .home-page .\32 u\24\28xsmall\29 + *,
  .home-page .\31 u\24\28xsmall\29 + * {
    clear: left;
  }

  .home-page .\-11u\28xsmall\29 {
    margin-left: 91.66667%;
  }

  .home-page .\-10u\28xsmall\29 {
    margin-left: 83.33333%;
  }

  .home-page .\-9u\28xsmall\29 {
    margin-left: 75%;
  }

  .home-page .\-8u\28xsmall\29 {
    margin-left: 66.66667%;
  }

  .home-page .\-7u\28xsmall\29 {
    margin-left: 58.33333%;
  }

  .home-page .\-6u\28xsmall\29 {
    margin-left: 50%;
  }

  .home-page .\-5u\28xsmall\29 {
    margin-left: 41.66667%;
  }

  .home-page .\-4u\28xsmall\29 {
    margin-left: 33.33333%;
  }

  .home-page .\-3u\28xsmall\29 {
    margin-left: 25%;
  }

  .home-page .\-2u\28xsmall\29 {
    margin-left: 16.66667%;
  }

  .home-page .\-1u\28xsmall\29 {
    margin-left: 8.33333%;
  }
}

.home-page /* Basic */

@-ms-viewport {
  width: device-width;
}

@media screen and (max-width: 480px) {
  .home-page html,
  .home-page template,
  .home-page body {
    min-width: 320px;
  }
}

.home-page body {
  background: #fff;
}

.home-page body.is-loading *,
.home-page body.is-loading *:before,
.home-page body.is-loading *:after {
  -moz-animation: none !important;
  -webkit-animation: none !important;
  -ms-animation: none !important;
  animation: none !important;
  -moz-transition: none !important;
  -webkit-transition: none !important;
  -ms-transition: none !important;
  transition: none !important;
}

/* Type */

.home-page html,
.home-page template {
  font-size: 13pt;
}

@media screen and (max-width: 1680px) {
  .home-page html,
  .home-page template {
    font-size: 11pt;
  }
}

@media screen and (max-width: 1280px) {
  .home-page html,
  .home-page template {
    font-size: 11pt;
  }
}

@media screen and (max-width: 980px) {
  .home-page html,
  .home-page template {
    font-size: 12pt;
  }
}

@media screen and (max-width: 736px) {
  .home-page html,
  .home-page template {
    font-size: 12pt;
  }
}

@media screen and (max-width: 480px) {
  .home-page html,
  .home-page template {
    font-size: 12pt;
  }
}

.home-page body {
  background-color: #fff;
  color: #444;
}

.home-page body,
.home-page input,
.home-page select,
.home-page textarea {
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
  font-size: 1rem;
  line-height: 1.65;
}

.home-page a {
  text-decoration: underline;
  color: #8a4680;
}

.home-page a:hover {
  text-decoration: none;
}

.home-page strong,
.home-page b {
  font-weight: 600;
  color: #555;
}

.home-page em,
.home-page i {
  font-style: italic;
}

.home-page p {
  margin: 0 0 2rem 0;
}

.home-page p.special {
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: 300;
  margin: 0 0 0.5rem 0;
  padding: 0 0 1rem 0;
  letter-spacing: 0.25rem;
  position: relative;
}

.home-page p.special:after {
  content: '';
  position: absolute;
  margin: auto;
  right: 0;
  bottom: 0;
  left: 0;
  width: 50%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.125);
}

.home-page h1,
.home-page h2,
.home-page h3,
.home-page h4,
.home-page h5,
.home-page h6 {
  font-weight: 300;
  line-height: 1.5;
  margin: 0 0 1rem 0;
  color: #555;
}

.home-page h1 a,
.home-page h2 a,
.home-page h3 a,
.home-page h4 a,
.home-page h5 a,
.home-page h6 a {
  color: inherit;
  text-decoration: none;
}

.home-page h2 {
  font-size: 1.75rem;
}

.home-page h3 {
  font-size: 1.35rem;
}

.home-page h4 {
  font-size: 1.1rem;
}

.home-page h5 {
  font-size: 0.9rem;
}

.home-page h6 {
  font-size: 0.7rem;
}

.home-page sub {
  font-size: 0.8rem;
  position: relative;
  top: 0.5rem;
}

.home-page sup {
  font-size: 0.8rem;
  position: relative;
  top: -0.5rem;
}

.home-page blockquote {
  border-left: solid 4px rgba(144, 144, 144, 0.25);
  font-style: italic;
  margin: 0 0 2rem 0;
  padding: 0.5rem 0 0.5rem 2rem;
}

.home-page code {
  border-radius: 2px;
  border: solid 1px rgba(144, 144, 144, 0.25);
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  margin: 0 0.25rem;
  padding: 0.25rem 0.65rem;
  background: rgba(144, 144, 144, 0.075);
}

.home-page pre {
  -webkit-overflow-scrolling: touch;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  margin: 0 0 2rem 0;
}

.home-page pre code {
  display: block;
  line-height: 1.75;
  padding: 1rem 1.5rem;
  overflow-x: auto;
}

.home-page hr {
  border: 0;
  border-bottom: solid 1px rgba(144, 144, 144, 0.25);
  margin: 2rem 0;
}

.home-page hr.major {
  margin: 3rem 0;
}

.home-page .align-left {
  text-align: left;
}

.home-page .align-center {
  text-align: center;
}

.home-page .align-right {
  text-align: right;
}

.home-page input,
.home-page select,
.home-page textarea {
  color: #555;
}

/* Box */

.home-page .box {
  margin-bottom: 2rem;
  background: #fff;
  height: 1000px;
  border-color: rgba(144, 144, 144, 0.25);
}

.home-page .box .image.fit {
  margin: 0;
  border-radius: 0;
}

.home-page .box .image.fit img {
  border-radius: 0;
}

.home-page .box header h2 {
  margin-bottom: 2rem;
}

.home-page .box header p {
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: 300;
  margin: 0 0 0.25rem 0;
  padding: 0 0 0.75rem 0;
  letter-spacing: 0.25rem;
  position: relative;
}

.home-page .box header p:after {
  content: '';
  position: absolute;
  margin: auto;
  right: 0;
  bottom: 0;
  left: 0;
  width: 50%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.125);
}

.home-page .box .content {
  padding: 3rem;
}

.home-page .box > :last-child,
.home-page .box > :last-child > :last-child,
.home-page .box > :last-child > :last-child > :last-child {
  margin-bottom: 0;
}

.home-page .box.alt {
  border: 0;
  border-radius: 0;
  padding: 0;
}

@media screen and (max-width: 1539px) {
  .home-page .box {
    max-height: 790px;
  }
}

@media screen and (max-width: 736px) {
  .home-page .box .content {
    padding: 2rem;
  }
}

.home-page .box img {
  max-height: 30rem;
}

/* Button */

.home-page input[type='submit'],
.home-page input[type='reset'],
.home-page input[type='button'],
.home-page button,
.home-page .button {
  -moz-appearance: none;
  -webkit-appearance: none;
  -ms-appearance: none;
  appearance: none;
  -moz-transition:
    background-color 0.2s ease-in-out,
    color 0.2s ease-in-out;
  -webkit-transition:
    background-color 0.2s ease-in-out,
    color 0.2s ease-in-out;
  -ms-transition:
    background-color 0.2s ease-in-out,
    color 0.2s ease-in-out;
  transition:
    background-color 0.2s ease-in-out,
    color 0.2s ease-in-out;
  border-radius: 2px;
  border: 0;
  cursor: pointer;
  display: inline-block;
  font-weight: 300;
  height: 2.85rem;
  line-height: 2.95rem;
  padding: 0 1.5rem;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  white-space: nowrap;
}

.home-page input[type='submit'].icon,
.home-page input[type='reset'].icon,
.home-page input[type='button'].icon,
.home-page button.icon,
.home-page .button.icon {
  padding-left: 1.35rem;
}

.home-page input[type='submit'].icon:before,
.home-page input[type='reset'].icon:before,
.home-page input[type='button'].icon:before,
.home-page button.icon:before,
.home-page .button.icon:before {
  margin-right: 0.5rem;
}

.home-page input[type='submit'].fit,
.home-page input[type='reset'].fit,
.home-page input[type='button'].fit,
.home-page button.fit,
.home-page .button.fit {
  display: block;
  margin: 0 0 1rem 0;
  width: 100%;
}

.home-page input[type='submit'].small,
.home-page input[type='reset'].small,
.home-page input[type='button'].small,
.home-page button.small,
.home-page .button.small {
  font-size: 0.8rem;
}

.home-page input[type='submit'].big,
.home-page input[type='reset'].big,
.home-page input[type='button'].big,
.home-page button.big,
.home-page .button.big {
  font-size: 1.35rem;
}

.home-page input[type='submit'].disabled,
.home-page input[type='submit']:disabled,
.home-page input[type='reset'].disabled,
.home-page input[type='reset']:disabled,
.home-page input[type='button'].disabled,
.home-page input[type='button']:disabled,
.home-page button.disabled,
.home-page button:disabled,
.home-page .button.disabled,
.home-page .button:disabled {
  -moz-pointer-events: none;
  -webkit-pointer-events: none;
  -ms-pointer-events: none;
  pointer-events: none;
  opacity: 0.25;
}

@media screen and (max-width: 480px) {
  .home-page input[type='submit'],
  .home-page input[type='reset'],
  .home-page input[type='button'],
  .home-page button,
  .home-page .button {
    padding: 0;
    width: 100%;
  }
}

.home-page label {
  display: block;
  font-size: 0.9rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  color: #555;
}

.home-page .select-wrapper {
  text-decoration: none;
  display: block;
  position: relative;
}

.home-page .select-wrapper:before {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: FontAwesome;
  font-style: normal;
  font-weight: normal;
  text-transform: none !important;
  content: '\f078';
  display: block;
  height: 2.75rem;
  line-height: 2.75rem;
  pointer-events: none;
  position: absolute;
  right: 0;
  text-align: center;
  top: 0;
  width: 2.75rem;
  color: rgba(144, 144, 144, 0.25);
}

.home-page .select-wrapper select::-ms-expand {
  display: none;
}

.home-page input[type='text'],
.home-page input[type='password'],
.home-page input[type='email'],
.home-page select,
.home-page textarea {
  height: 2.75rem;
  background: rgba(144, 144, 144, 0.075);
  border-color: rgba(144, 144, 144, 0.25);
  font-family: inherit;
  font-size: inherit;
}

.home-page input[type='text']:focus,
.home-page input[type='password']:focus,
.home-page input[type='email']:focus,
.home-page select:focus,
.home-page textarea:focus {
  border-color: #8a4680;
  box-shadow: 0 0 0 1px #8a4680;
}

.home-page textarea {
  padding: 0.75rem 1rem;
}

.home-page input[type='checkbox'],
.home-page input[type='radio'] {
  -moz-appearance: none;
  -webkit-appearance: none;
  -ms-appearance: none;
  appearance: none;
  display: block;
  float: left;
  margin-right: -2rem;
  opacity: 0;
  width: 1rem;
  z-index: -1;
}

.home-page input[type='checkbox'] + label,
.home-page input[type='radio'] + label {
  text-decoration: none;
  cursor: pointer;
  display: inline-block;
  font-size: 1rem;
  font-weight: 400;
  padding-left: 2.4rem;
  padding-right: 0.75rem;
  position: relative;
  color: #444;
}

.home-page input[type='checkbox'] + label:before,
.home-page input[type='radio'] + label:before {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: FontAwesome;
  font-style: normal;
  font-weight: normal;
  text-transform: none !important;
  border-radius: 2px;
  border: solid 1px;
  content: '';
  display: inline-block;
  height: 1.65rem;
  left: 0;
  line-height: 1.58125rem;
  position: absolute;
  text-align: center;
  top: 0;
  width: 1.65rem;
  background: rgba(144, 144, 144, 0.075);
  border-color: rgba(144, 144, 144, 0.25);
}

.home-page input[type='radio'] + label:before {
  border-radius: 100%;
}

.home-page input[type='checkbox']:checked + label:before,
.home-page input[type='radio']:checked + label:before {
  content: '\f00c';
  background-color: #8a4680;
  border-color: #8a4680;
  color: #ffffff;
}

.home-page input[type='checkbox']:focus + label:before,
.home-page input[type='radio']:focus + label:before {
  border-color: #8a4680;
  box-shadow: 0 0 0 1px #8a4680;
}

.home-page ::-webkit-input-placeholder {
  color: #bbb !important;
  opacity: 1;
}

.home-page :-moz-placeholder {
  color: #bbb !important;
  opacity: 1;
}

.home-page ::-moz-placeholder {
  color: #bbb !important;
  opacity: 1;
}

.home-page :-ms-input-placeholder {
  color: #bbb !important;
  opacity: 1;
}

.home-page .formerize-placeholder {
  color: #bbb !important;
  opacity: 1;
}

/* Icon */

.home-page .icon {
  text-decoration: none;
  border-bottom: none;
  position: relative;
}

.home-page .icon:before {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: FontAwesome;
  font-style: normal;
  font-weight: normal;
  text-transform: none !important;
}

.home-page .icon > .label {
  display: none;
}

.home-page .image {
  border-radius: 2px;
  border: 0;
  display: inline-block;
  position: relative;
}

.home-page .image img {
  border-radius: 2px;
  display: block;
}

.home-page .image.left,
.home-page .image.right {
  max-width: 40%;
}

.home-page .image.left img,
.home-page .image.right img {
  width: 100%;
}

.home-page .image.left {
  float: left;
  margin: 0 1.5rem 1rem 0;
  top: 0.25rem;
}

.home-page .image.right {
  float: right;
  margin: 0 0 1rem 1.5rem;
  top: 0.25rem;
}

.home-page .image.fit {
  display: block;
  margin: 0 0 2rem 0;
  width: 100%;
}

.home-page .image.fit img {
  width: 100%;
}

.home-page .image.main {
  display: block;
  margin: 0 0 3rem 0;
  width: 100%;
}

.home-page .image.main img {
  width: 100%;
}

.home-page ol {
  list-style: decimal;
  margin: 0 0 2rem 0;
  padding-left: 1.25rem;
}

.home-page ol li {
  padding-left: 0.25rem;
}

.home-page ul {
  list-style: disc;
  margin: 0 0 2rem 0;
  padding-left: 1rem;
}

.home-page ul li {
  padding-left: 0.5rem;
}

.home-page ul.alt {
  list-style: none;
  padding-left: 0;
}

.home-page ul.alt li {
  border-top: solid 1px;
  padding: 0.5rem 0;
}

.home-page ul.alt li:first-child {
  border-top: 0;
  padding-top: 0;
}

.home-page ul.icons {
  cursor: default;
  list-style: none;
  padding-left: 0;
}

.home-page ul.icons li {
  display: inline-block;
  padding: 0 1rem 0 0;
}

.home-page ul.icons li:last-child {
  padding-right: 0;
}

.home-page ul.icons li .icon:before {
  font-size: 2rem;
}

.home-page ul.actions {
  cursor: default;
  list-style: none;
  padding-left: 0;
}

.home-page ul.actions li {
  display: inline-block;
  padding: 0 1rem 0 0;
  vertical-align: middle;
}

.home-page ul.actions li:last-child {
  padding-right: 0;
}

.home-page ul.actions.small li {
  padding: 0 0.5rem 0 0;
}

.home-page ul.actions.vertical li {
  display: block;
  padding: 1rem 0 0 0;
}

.home-page ul.actions.vertical li:first-child {
  padding-top: 0;
}

.home-page ul.actions.vertical li > * {
  margin-bottom: 0;
}

.home-page ul.actions.vertical.small li {
  padding: 0.5rem 0 0 0;
}

.home-page ul.actions.vertical.small li:first-child {
  padding-top: 0;
}

.home-page ul.actions.fit {
  display: table;
  margin-left: -1rem;
  padding: 0;
  table-layout: fixed;
  width: calc(100% + 1rem);
}

.home-page ul.actions.fit li {
  display: table-cell;
  padding: 0 0 0 1rem;
}

.home-page ul.actions.fit li > * {
  margin-bottom: 0;
}

.home-page ul.actions.fit.small {
  margin-left: -0.5rem;
  width: calc(100% + 0.5rem);
}

.home-page ul.actions.fit.small li {
  padding: 0 0 0 0.5rem;
}

@media screen and (max-width: 480px) {
  .home-page ul.actions {
    margin: 0 0 2rem 0;
  }

  .home-page ul.actions li {
    padding: 1rem 0 0 0;
    display: block;
    text-align: center;
    width: 100%;
  }

  .home-page ul.actions li:first-child {
    padding-top: 0;
  }

  .home-page ul.actions li > * {
    width: 100%;
    margin: 0 !important;
  }

  .home-page ul.actions li > *.icon:before {
    margin-left: -2rem;
  }

  .home-page ul.actions.small li {
    padding: 0.5rem 0 0 0;
  }

  .home-page ul.actions.small li:first-child {
    padding-top: 0;
  }
}

.home-page dl {
  margin: 0 0 2rem 0;
}

.home-page dl dt {
  display: block;
  font-weight: 700;
  margin: 0 0 1rem 0;
}

.home-page dl dd {
  margin-left: 2rem;
}

.home-page ul.alt li {
  border-top-color: rgba(144, 144, 144, 0.25);
}

/* Section/Article */

.home-page section.special,
.home-page article.special {
  text-align: center;
}

.home-page header p {
  position: relative;
  margin: 0 0 1.5rem 0;
}

.home-page header h2 + p {
  font-size: 1.25rem;
  margin-top: -1rem;
}

.home-page header h3 + p {
  font-size: 1.1rem;
  margin-top: -0.8rem;
}

.home-page header h4 + p,
.home-page header h5 + p,
.home-page header h6 + p {
  font-size: 0.9rem;
  margin-top: -0.6rem;
}

.home-page header p {
  color: #bbb;
}

/* Table */

.home-page .table-wrapper {
  -webkit-overflow-scrolling: touch;
  overflow-x: auto;
}

.home-page table {
  margin: 0 0 2rem 0;
  width: 100%;
}

.home-page table tbody tr {
  border: solid 1px;
  border-left: 0;
  border-right: 0;
}

.home-page table td {
  padding: 0.75rem 0.75rem;
}

.home-page table th {
  font-size: 0.9rem;
  font-weight: 700;
  padding: 0 0.75rem 0.75rem 0.75rem;
  text-align: left;
}

.home-page table thead {
  border-bottom: solid 2px;
}

.home-page table tfoot {
  border-top: solid 2px;
}

.home-page table.alt {
  border-collapse: separate;
}

.home-page table.alt tbody tr td {
  border: solid 1px;
  border-left-width: 0;
  border-top-width: 0;
}

.home-page table.alt tbody tr td:first-child {
  border-left-width: 1px;
}

.home-page table.alt tbody tr:first-child td {
  border-top-width: 1px;
}

.home-page table.alt thead {
  border-bottom: 0;
}

.home-page table.alt tfoot {
  border-top: 0;
}

.home-page table tbody tr {
  border-color: rgba(144, 144, 144, 0.25);
}

.home-page table tbody tr:nth-child(2n + 1) {
  background-color: rgba(144, 144, 144, 0.075);
}

.home-page table th {
  color: #555;
}

.home-page table thead {
  border-bottom-color: rgba(144, 144, 144, 0.25);
}

.home-page table tfoot {
  border-top-color: rgba(144, 144, 144, 0.25);
}

.home-page table.alt tbody tr td {
  border-color: rgba(144, 144, 144, 0.25);
}

/* Wrapper */

.wrapper {
  padding: 6rem 0 4rem 0;
  position: relative;
  margin: 0;
}

.wrapper > .inner {
  margin: 0 auto;
  width: 80rem;
}

.wrapper.style1 {
  background-color: #8a4680;
  color: #e2d1df;
}

.wrapper.style1 input,
.wrapper.style1 select,
.wrapper.style1 textarea {
  color: #ffffff;
}

.wrapper.style1 a {
  color: #ffffff;
}

.wrapper.style1 strong,
.wrapper.style1 b {
  color: #ffffff;
}

.wrapper.style1 h1,
.wrapper.style1 h2,
.wrapper.style1 h3,
.wrapper.style1 h4,
.wrapper.style1 h5,
.wrapper.style1 h6 {
  color: #ffffff;
}

.wrapper.style1 blockquote {
  border-left-color: rgba(255, 255, 255, 0.25);
}

.wrapper.style1 code {
  background: rgba(255, 255, 255, 0.075);
  border-color: rgba(255, 255, 255, 0.25);
}

.wrapper.style1 hr {
  border-bottom-color: rgba(255, 255, 255, 0.25);
}

.wrapper.style1 .box {
  border-color: rgba(255, 255, 255, 0.25);
}

.wrapper.style1 input[type='submit'],
.wrapper.style1 input[type='reset'],
.wrapper.style1 input[type='button'],
.wrapper.style1 button,
.wrapper.style1 .button {
  background-color: #f2f2f2;
  color: #000 !important;
}

.wrapper.style1 input[type='submit']:hover,
.wrapper.style1 input[type='reset']:hover,
.wrapper.style1 input[type='button']:hover,
.wrapper.style1 button:hover,
.wrapper.style1 .button:hover {
  background-color: white;
}

.wrapper.style1 input[type='submit']:active,
.wrapper.style1 input[type='reset']:active,
.wrapper.style1 input[type='button']:active,
.wrapper.style1 button:active,
.wrapper.style1 .button:active {
  background-color: #e5e5e5;
}

.wrapper.style1 input[type='submit'].alt,
.wrapper.style1 input[type='reset'].alt,
.wrapper.style1 input[type='button'].alt,
.wrapper.style1 button.alt,
.wrapper.style1 .button.alt {
  background-color: transparent;
  box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.25);
  color: #ffffff !important;
}

.wrapper.style1 input[type='submit'].alt:hover,
.wrapper.style1 input[type='reset'].alt:hover,
.wrapper.style1 input[type='button'].alt:hover,
.wrapper.style1 button.alt:hover,
.wrapper.style1 .button.alt:hover {
  background-color: rgba(255, 255, 255, 0.075);
}

.wrapper.style1 input[type='submit'].alt:active,
.wrapper.style1 input[type='reset'].alt:active,
.wrapper.style1 input[type='button'].alt:active,
.wrapper.style1 button.alt:active,
.wrapper.style1 .button.alt:active {
  background-color: rgba(255, 255, 255, 0.2);
}

.wrapper.style1 input[type='submit'].alt.icon:before,
.wrapper.style1 input[type='reset'].alt.icon:before,
.wrapper.style1 input[type='button'].alt.icon:before,
.wrapper.style1 button.alt.icon:before,
.wrapper.style1 .button.alt.icon:before {
  color: #d0b5cc;
}

.wrapper.style1 input[type='submit'].special,
.wrapper.style1 input[type='reset'].special,
.wrapper.style1 input[type='button'].special,
.wrapper.style1 button.special,
.wrapper.style1 .button.special {
  background-color: #ffffff;
  color: #8a4680 !important;
}

.wrapper.style1 label {
  color: #ffffff;
}

.wrapper.style1 input[type='text'],
.wrapper.style1 input[type='password'],
.wrapper.style1 input[type='email'],
.wrapper.style1 select,
.wrapper.style1 textarea {
  background: rgba(255, 255, 255, 0.075);
  border-color: rgba(255, 255, 255, 0.25);
}

.wrapper.style1 input[type='text']:focus,
.wrapper.style1 input[type='password']:focus,
.wrapper.style1 input[type='email']:focus,
.wrapper.style1 select:focus,
.wrapper.style1 textarea:focus {
  border-color: #ffffff;
  box-shadow: 0 0 0 1px #ffffff;
}

.wrapper.style1 .select-wrapper:before {
  color: rgba(255, 255, 255, 0.25);
}

.wrapper.style1 input[type='checkbox'] + label,
.wrapper.style1 input[type='radio'] + label {
  color: #e2d1df;
}

.wrapper.style1 input[type='checkbox'] + label:before,
.wrapper.style1 input[type='radio'] + label:before {
  background: rgba(255, 255, 255, 0.075);
  border-color: rgba(255, 255, 255, 0.25);
}

.wrapper.style1 input[type='checkbox']:checked + label:before,
.wrapper.style1 input[type='radio']:checked + label:before {
  background-color: #ffffff;
  border-color: #ffffff;
  color: #8a4680;
}

.wrapper.style1 input[type='checkbox']:focus + label:before,
.wrapper.style1 input[type='radio']:focus + label:before {
  border-color: #ffffff;
  box-shadow: 0 0 0 1px #ffffff;
}

.wrapper.style1 ::-webkit-input-placeholder {
  color: #d0b5cc !important;
}

.wrapper.style1 :-moz-placeholder {
  color: #d0b5cc !important;
}

.wrapper.style1 ::-moz-placeholder {
  color: #d0b5cc !important;
}

.wrapper.style1 :-ms-input-placeholder {
  color: #d0b5cc !important;
}

.wrapper.style1 .formerize-placeholder {
  color: #d0b5cc !important;
}

.wrapper.style1 ul.alt li {
  border-top-color: rgba(255, 255, 255, 0.25);
}

.wrapper.style1 header p {
  color: #d0b5cc;
}

.wrapper.style1 table tbody tr {
  border-color: rgba(255, 255, 255, 0.25);
}

.wrapper.style1 table tbody tr:nth-child(2n + 1) {
  background-color: rgba(255, 255, 255, 0.075);
}

.wrapper.style1 table th {
  color: #ffffff;
}

.wrapper.style1 table thead {
  border-bottom-color: rgba(255, 255, 255, 0.25);
}

.wrapper.style1 table tfoot {
  border-top-color: rgba(255, 255, 255, 0.25);
}

.wrapper.style1 table.alt tbody tr td {
  border-color: rgba(255, 255, 255, 0.25);
}

.wrapper.style2 {
  background-color: #f2f2f2;
  color: #a6a6a6;
}

.wrapper.style2 .inner header {
  font-size: 40px;
}

.wrapper.style2 input,
.wrapper.style2 select,
.wrapper.style2 textarea {
  color: #000;
}

.wrapper.style2 a {
  color: #8a4680;
}

.wrapper.style2 strong,
.wrapper.style2 b {
  color: #000;
}

.wrapper.style2 h1,
.wrapper.style2 h2,
.wrapper.style2 h3,
.wrapper.style2 h4,
.wrapper.style2 h5,
.wrapper.style2 h6 {
  color: #000;
}

.wrapper.style2 blockquote {
  border-left-color: rgba(0, 0, 0, 0.15);
}

.wrapper.style2 code {
  background: rgba(0, 0, 0, 0.075);
  border-color: rgba(0, 0, 0, 0.15);
}

.wrapper.style2 hr {
  border-bottom-color: rgba(0, 0, 0, 0.15);
}

.wrapper.style2 .box {
  border-color: rgba(0, 0, 0, 0.15);
}

.wrapper.style2 input[type='submit'],
.wrapper.style2 input[type='reset'],
.wrapper.style2 input[type='button'],
.wrapper.style2 button,
.wrapper.style2 .button {
  background-color: #000;
  color: #f2f2f2 !important;
}

.wrapper.style2 input[type='submit'].alt,
.wrapper.style2 input[type='reset'].alt,
.wrapper.style2 input[type='button'].alt,
.wrapper.style2 button.alt,
.wrapper.style2 .button.alt {
  background-color: transparent;
  box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.15);
  color: #000 !important;
}

.wrapper.style2 input[type='submit'].alt:hover,
.wrapper.style2 input[type='reset'].alt:hover,
.wrapper.style2 input[type='button'].alt:hover,
.wrapper.style2 button.alt:hover,
.wrapper.style2 .button.alt:hover {
  background-color: rgba(0, 0, 0, 0.075);
}

.wrapper.style2 input[type='submit'].alt:active,
.wrapper.style2 input[type='reset'].alt:active,
.wrapper.style2 input[type='button'].alt:active,
.wrapper.style2 button.alt:active,
.wrapper.style2 .button.alt:active {
  background-color: rgba(0, 0, 0, 0.2);
}

.wrapper.style2 input[type='submit'].alt.icon:before,
.wrapper.style2 input[type='reset'].alt.icon:before,
.wrapper.style2 input[type='button'].alt.icon:before,
.wrapper.style2 button.alt.icon:before,
.wrapper.style2 .button.alt.icon:before {
  color: #999999;
}

.wrapper.style2 input[type='submit'].special,
.wrapper.style2 input[type='reset'].special,
.wrapper.style2 input[type='button'].special,
.wrapper.style2 button.special,
.wrapper.style2 .button.special {
  background-color: #8a4680;
  color: #ffffff !important;
}

.wrapper.style2 input[type='submit'].special:hover,
.wrapper.style2 input[type='reset'].special:hover,
.wrapper.style2 input[type='button'].special:hover,
.wrapper.style2 button.special:hover,
.wrapper.style2 .button.special:hover {
  background-color: #9b4f90;
}

.wrapper.style2 input[type='submit'].special:active,
.wrapper.style2 input[type='reset'].special:active,
.wrapper.style2 input[type='button'].special:active,
.wrapper.style2 button.special:active,
.wrapper.style2 .button.special:active {
  background-color: #793d70;
}

.wrapper.style2 label {
  color: #000;
}

.wrapper.style2 input[type='text'],
.wrapper.style2 input[type='password'],
.wrapper.style2 input[type='email'],
.wrapper.style2 select,
.wrapper.style2 textarea {
  background: rgba(0, 0, 0, 0.075);
  border-color: rgba(0, 0, 0, 0.15);
}

.wrapper.style2 input[type='text']:focus,
.wrapper.style2 input[type='password']:focus,
.wrapper.style2 input[type='email']:focus,
.wrapper.style2 select:focus,
.wrapper.style2 textarea:focus {
  border-color: #8a4680;
  box-shadow: 0 0 0 1px #8a4680;
}

.wrapper.style2 .select-wrapper:before {
  color: rgba(0, 0, 0, 0.15);
}

.wrapper.style2 input[type='checkbox'] + label,
.wrapper.style2 input[type='radio'] + label {
  color: #a6a6a6;
}

.wrapper.style2 input[type='checkbox'] + label:before,
.wrapper.style2 input[type='radio'] + label:before {
  background: rgba(0, 0, 0, 0.075);
  border-color: rgba(0, 0, 0, 0.15);
}

.wrapper.style2 input[type='checkbox']:checked + label:before,
.wrapper.style2 input[type='radio']:checked + label:before {
  background-color: #8a4680;
  border-color: #8a4680;
  color: #ffffff;
}

.wrapper.style2 input[type='checkbox']:focus + label:before,
.wrapper.style2 input[type='radio']:focus + label:before {
  border-color: #8a4680;
  box-shadow: 0 0 0 1px #8a4680;
}

.wrapper.style2 ::-webkit-input-placeholder {
  color: #999999 !important;
}

.wrapper.style2 :-moz-placeholder {
  color: #999999 !important;
}

.wrapper.style2 ::-moz-placeholder {
  color: #999999 !important;
}

.wrapper.style2 :-ms-input-placeholder {
  color: #999999 !important;
}

.wrapper.style2 .formerize-placeholder {
  color: #999999 !important;
}

.wrapper.style2 ul.alt li {
  border-top-color: rgba(0, 0, 0, 0.15);
}

.wrapper.style2 header p {
  color: #999999;
}

.wrapper.style2 table tbody tr {
  border-color: rgba(0, 0, 0, 0.15);
}

.wrapper.style2 table tbody tr:nth-child(2n + 1) {
  background-color: rgba(0, 0, 0, 0.075);
}

.wrapper.style2 table th {
  color: #000;
}

.wrapper.style2 table thead {
  border-bottom-color: rgba(0, 0, 0, 0.15);
}

.wrapper.style2 table tfoot {
  border-top-color: rgba(0, 0, 0, 0.15);
}

.wrapper.style2 table.alt tbody tr td {
  border-color: rgba(0, 0, 0, 0.15);
}
.wrapper.style2 .prev {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  z-index: 3;
  font-size: 2rem;
  color: transparent;
  background-image: url('@/assets/images/Home/Style2ButtonL.png');
  background-size: contain;
  background-repeat: no-repeat;
  width: 50px;
  height: 50px;
}

.wrapper.style2 .next {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  z-index: 3;
  font-size: 2rem;
  color: transparent;
  background-image: url('@/assets/images/Home/Style2ButtonR.png');
  background-size: contain;
  background-repeat: no-repeat;
  width: 50px;
  height: 50px;
}

.wrapper.style3 {
  background-color: #000;
  color: #bfbfbf;
  background-image: url(@/assets/images/Home/BackgroundStyle3.jpg);
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  position: relative;
}

.wrapper.style3 input,
.wrapper.style3 select,
.wrapper.style3 textarea {
  color: #ffffff;
}

.wrapper.style3 a {
  color: #8a4680;
}

.wrapper.style3 strong,
.wrapper.style3 b {
  color: #ffffff;
}

.wrapper.style3 h1,
.wrapper.style3 h2,
.wrapper.style3 h3,
.wrapper.style3 h4,
.wrapper.style3 h5,
.wrapper.style3 h6 {
  color: #ffffff;
}

.wrapper.style3 blockquote {
  border-left-color: rgba(255, 255, 255, 0.25);
}

.wrapper.style3 code {
  background: rgba(255, 255, 255, 0.075);
  border-color: rgba(255, 255, 255, 0.25);
}

.wrapper.style3 hr {
  border-bottom-color: rgba(255, 255, 255, 0.25);
}

.wrapper.style3 .box {
  border-color: rgba(255, 255, 255, 0.25);
}

.wrapper.style3 input[type='submit'],
.wrapper.style3 input[type='reset'],
.wrapper.style3 input[type='button'],
.wrapper.style3 button,
.wrapper.style3 .button {
  background-color: #f2f2f2;
  color: #000 !important;
}

.wrapper.style3 input[type='submit']:hover,
.wrapper.style3 input[type='reset']:hover,
.wrapper.style3 input[type='button']:hover,
.wrapper.style3 button:hover,
.wrapper.style3 .button:hover {
  background-color: white;
}

.wrapper.style3 input[type='submit']:active,
.wrapper.style3 input[type='reset']:active,
.wrapper.style3 input[type='button']:active,
.wrapper.style3 button:active,
.wrapper.style3 .button:active {
  background-color: #e5e5e5;
}

.wrapper.style3 input[type='submit'].alt,
.wrapper.style3 input[type='reset'].alt,
.wrapper.style3 input[type='button'].alt,
.wrapper.style3 button.alt,
.wrapper.style3 .button.alt {
  background-color: transparent;
  box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.25);
  color: #ffffff !important;
}

.wrapper.style3 input[type='submit'].alt:hover,
.wrapper.style3 input[type='reset'].alt:hover,
.wrapper.style3 input[type='button'].alt:hover,
.wrapper.style3 button.alt:hover,
.wrapper.style3 .button.alt:hover {
  background-color: rgba(255, 255, 255, 0.075);
}

.wrapper.style3 input[type='submit'].alt:active,
.wrapper.style3 input[type='reset'].alt:active,
.wrapper.style3 input[type='button'].alt:active,
.wrapper.style3 button.alt:active,
.wrapper.style3 .button.alt:active {
  background-color: rgba(255, 255, 255, 0.2);
}

.wrapper.style3 input[type='submit'].alt.icon:before,
.wrapper.style3 input[type='reset'].alt.icon:before,
.wrapper.style3 input[type='button'].alt.icon:before,
.wrapper.style3 button.alt.icon:before,
.wrapper.style3 .button.alt.icon:before {
  color: #999999;
}

.wrapper.style3 input[type='submit'].special,
.wrapper.style3 input[type='reset'].special,
.wrapper.style3 input[type='button'].special,
.wrapper.style3 button.special,
.wrapper.style3 .button.special {
  background-color: #8a4680;
  color: #ffffff !important;
}

.wrapper.style3 input[type='submit'].special:hover,
.wrapper.style3 input[type='reset'].special:hover,
.wrapper.style3 input[type='button'].special:hover,
.wrapper.style3 button.special:hover,
.wrapper.style3 .button.special:hover {
  background-color: #9b4f90;
}

.wrapper.style3 input[type='submit'].special:active,
.wrapper.style3 input[type='reset'].special:active,
.wrapper.style3 input[type='button'].special:active,
.wrapper.style3 button.special:active,
.wrapper.style3 .button.special:active {
  background-color: #793d70;
}

.wrapper.style3 label {
  color: #ffffff;
}

.wrapper.style3 input[type='text'],
.wrapper.style3 input[type='password'],
.wrapper.style3 input[type='email'],
.wrapper.style3 select,
.wrapper.style3 textarea {
  background: rgba(255, 255, 255, 0.075);
  border-color: rgba(255, 255, 255, 0.25);
}

.wrapper.style3 input[type='text']:focus,
.wrapper.style3 input[type='password']:focus,
.wrapper.style3 input[type='email']:focus,
.wrapper.style3 select:focus,
.wrapper.style3 textarea:focus {
  border-color: #8a4680;
  box-shadow: 0 0 0 1px #8a4680;
}

.wrapper.style3 .select-wrapper:before {
  color: rgba(255, 255, 255, 0.25);
}

.wrapper.style3 input[type='checkbox'] + label,
.wrapper.style3 input[type='radio'] + label {
  color: #bfbfbf;
}

.wrapper.style3 input[type='checkbox'] + label:before,
.wrapper.style3 input[type='radio'] + label:before {
  background: rgba(255, 255, 255, 0.075);
  border-color: rgba(255, 255, 255, 0.25);
}

.wrapper.style3 input[type='checkbox']:checked + label:before,
.wrapper.style3 input[type='radio']:checked + label:before {
  background-color: #8a4680;
  border-color: #8a4680;
  color: #ffffff;
}

.wrapper.style3 input[type='checkbox']:focus + label:before,
.wrapper.style3 input[type='radio']:focus + label:before {
  border-color: #8a4680;
  box-shadow: 0 0 0 1px #8a4680;
}

.wrapper.style3 ::-webkit-input-placeholder {
  color: #999999 !important;
}

.wrapper.style3 :-moz-placeholder {
  color: #999999 !important;
}

.wrapper.style3 ::-moz-placeholder {
  color: #999999 !important;
}

.wrapper.style3 :-ms-input-placeholder {
  color: #999999 !important;
}

.wrapper.style3 .formerize-placeholder {
  color: #999999 !important;
}

.wrapper.style3 ul.alt li {
  border-top-color: rgba(255, 255, 255, 0.25);
}

.wrapper.style3 header p {
  color: #999999;
}

.wrapper.style3 table tbody tr {
  border-color: rgba(255, 255, 255, 0.25);
}

.wrapper.style3 table tbody tr:nth-child(2n + 1) {
  background-color: rgba(255, 255, 255, 0.075);
}

.wrapper.style3 table th {
  color: #ffffff;
}

.wrapper.style3 table thead {
  border-bottom-color: rgba(255, 255, 255, 0.25);
}

.wrapper.style3 table tfoot {
  border-top-color: rgba(255, 255, 255, 0.25);
}

.wrapper.style3 table.alt tbody tr td {
  border-color: rgba(255, 255, 255, 0.25);
}

.wrapper.style3 .inner {
  position: relative;
  z-index: 2;
}

.wrapper.style3 p {
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: 300;
  margin: 0 0 0.5rem 0;
  padding: 0 0 1rem 0;
  letter-spacing: 0.25rem;
}

.wrapper.style3 p:after {
  content: '';
  position: absolute;
  margin: auto;
  right: 0;
  bottom: 0;
  left: 0;
  width: 50%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.5);
}

.wrapper.style3:before {
  -moz-transition: opacity 3s ease;
  -webkit-transition: opacity 3s ease;
  -ms-transition: opacity 3s ease;
  transition: opacity 3s ease;
  -moz-transition-delay: 1.25s;
  -webkit-transition-delay: 1.25s;
  -ms-transition-delay: 1.25s;
  transition-delay: 1.25s;
  content: '';
  display: block;
  background-color: rgba(0, 0, 0, 0.95);
  height: 100%;
  left: 0;
  opacity: 0.75;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;
}

@media screen and (max-width: 1280px) {
  .wrapper > .inner {
    width: 75rem;
  }
}

@media screen and (max-width: 980px) {
  .wrapper > .inner {
    width: 90%;
  }

  .wrapper.style3 {
    background-attachment: scroll;
  }
}

@media screen and (max-width: 736px) {
  .wrapper {
    padding: 3rem 0 1rem 0;
  }
}

/* Flexgrid */

.home-page .grid-style {
  width: 100%;
  margin: 0 0 2.5rem 0;
  display: -moz-flex;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  -moz-flex-wrap: wrap;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -moz-align-items: stretch;
  -webkit-align-items: stretch;
  -ms-align-items: stretch;
  align-items: stretch;
}

.home-page .grid-style > * {
  -moz-flex-shrink: 1;
  -webkit-flex-shrink: 1;
  -ms-flex-shrink: 1;
  flex-shrink: 1;
  -moz-flex-grow: 0;
  -webkit-flex-grow: 0;
  -ms-flex-grow: 0;
  flex-grow: 0;
}

.home-page .grid-style > * {
  width: 50%;
}

.home-page .grid-style > * {
  padding: 2rem;
  width: calc(50% + 2rem);
}

.home-page .grid-style > :nth-child(-n + 2) {
  padding-top: 0;
}

.home-page .grid-style > :nth-last-child(-n + 2) {
  padding-bottom: 0;
}

.home-page .grid-style > :nth-child(2n + 1) {
  padding-left: 0;
}

.home-page .grid-style > :nth-child(2n) {
  padding-right: 0;
}

.home-page .grid-style > :nth-child(2n + 1),
.home-page .grid-style > :nth-child(2n) {
  width: calc(50% + 0rem);
}

.home-page .grid-style .box {
  margin: 0;
}

@media screen and (max-width: 980px) {
  .home-page .grid-style > * {
    width: 100%;
  }

  .home-page .grid-style > * {
    padding: 1rem;
    width: calc(50% + 1rem);
  }

  .home-page .grid-style > :nth-child(-n + 2) {
    padding-top: 1rem;
  }

  .home-page .grid-style > :nth-last-child(-n + 2) {
    padding-bottom: 1rem;
  }

  .home-page .grid-style > :nth-child(2n + 1) {
    padding-left: 1rem;
  }

  .home-page .grid-style > :nth-child(2n) {
    padding-right: 1rem;
  }

  .home-page .grid-style > :nth-child(2n + 1),
  .home-page .grid-style > :nth-child(2n) {
    padding: 1rem;
    width: calc(100% + 2rem);
  }

  .home-page .grid-style > * {
    padding: 1rem;
    width: calc(100% + 2rem);
  }

  .home-page .grid-style > :nth-child(-n + 1) {
    padding-top: 0;
  }

  .home-page .grid-style > :nth-last-child(-n + 1) {
    padding-bottom: 0;
  }

  .home-page .grid-style > :nth-child(1n + 1) {
    padding-left: 0;
  }

  .home-page .grid-style > :nth-child(1n) {
    padding-right: 0;
  }

  .home-page .grid-style > :nth-child(1n + 1),
  .home-page .grid-style > :nth-child(1n) {
    width: calc(100% + 1rem);
  }
}

.home-page .gallery {
  width: 100%;
  margin: 2.5rem 0 2.5rem 0;
  display: -moz-flex;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  -moz-flex-wrap: wrap;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -moz-align-items: stretch;
  -webkit-align-items: stretch;
  -ms-align-items: stretch;
  align-items: stretch;
}

.home-page .gallery > * {
  -moz-flex-shrink: 1;
  -webkit-flex-shrink: 1;
  -ms-flex-shrink: 1;
  flex-shrink: 1;
  -moz-flex-grow: 0;
  -webkit-flex-grow: 0;
  -ms-flex-grow: 0;
  flex-grow: 0;
}

.home-page .gallery > * {
  width: 50%;
}

.home-page .gallery > * {
  padding: 2rem;
  width: calc(50% + 2rem);
}

.home-page .gallery > :nth-child(-n + 2) {
  padding-top: 0;
}

.home-page .gallery > :nth-last-child(-n + 2) {
  padding-bottom: 0;
}

.home-page .gallery > :nth-child(2n + 1) {
  padding-left: 0;
}

.home-page .gallery > :nth-child(2n) {
  padding-right: 0;
}

.home-page .gallery > :nth-child(2n + 1),
.home-page .gallery > :nth-child(2n) {
  width: calc(50% + 0rem);
}

.home-page .gallery .image {
  background: #fff;
  padding: 1rem;
}

.home-page .gallery .image.fit {
  margin: 0;
}

@media screen and (max-width: 980px) {
  .home-page .gallery > * {
    width: 100%;
  }

  .home-page .gallery > * {
    padding: 1rem;
    width: calc(50% + 1rem);
  }

  .home-page .gallery > :nth-child(-n + 2) {
    padding-top: 1rem;
  }

  .home-page .gallery > :nth-last-child(-n + 2) {
    padding-bottom: 1rem;
  }

  .home-page .gallery > :nth-child(2n + 1) {
    padding-left: 1rem;
  }

  .home-page .gallery > :nth-child(2n) {
    padding-right: 1rem;
  }

  .home-page .gallery > :nth-child(2n + 1),
  .home-page .gallery > :nth-child(2n) {
    padding: 1rem;
    width: calc(100% + 2rem);
  }

  .home-page .gallery > * {
    padding: 1rem;
    width: calc(100% + 2rem);
  }

  .home-page .gallery > :nth-child(-n + 1) {
    padding-top: 0;
  }

  .home-page .gallery > :nth-last-child(-n + 1) {
    padding-bottom: 0;
  }

  .home-page .gallery > :nth-child(1n + 1) {
    padding-left: 0;
  }

  .home-page .gallery > :nth-child(1n) {
    padding-right: 0;
  }

  .home-page .gallery > :nth-child(1n + 1),
  .home-page .gallery > :nth-child(1n) {
    width: calc(100% + 1rem);
  }
}

/* Banner */

.home-page .banner {
  background-color: #bbb7ac;
  color: #e2d1df;
  padding: 8em 0;
  position: relative;
}

.home-page .banner input,
.home-page .banner select,
.home-page .banner textarea {
  color: #ffffff;
}

.home-page .banner a {
  color: #ffffff;
}

.home-page .banner strong,
.home-page .banner b {
  color: #ffffff;
}

.home-page .banner h1,
.home-page .banner h2,
.home-page .banner h3,
.home-page .banner h4,
.home-page .banner h5,
.home-page .banner h6 {
  color: #ffffff;
}

.home-page .banner blockquote {
  border-left-color: rgba(255, 255, 255, 0.25);
}

.home-page .banner code {
  background: rgba(255, 255, 255, 0.075);
  border-color: rgba(255, 255, 255, 0.25);
}

.home-page .banner hr {
  border-bottom-color: rgba(255, 255, 255, 0.25);
}

.home-page .banner.full {
  padding: 0;
  min-height: 100vh;
  height: 100vh !important;
}

.home-page .banner > article {
  transition:
    opacity 1.5s ease,
    visibility 1.5s;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  left: 0;
  opacity: 0;
  position: absolute;
  text-align: center;
  top: 0;
  visibility: hidden;
  width: 100%;
  z-index: 0;
}

.home-page .banner > article:before {
  content: '';
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}

.home-page .banner > article:after {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: #000;
  opacity: 0.35;
}

.home-page .banner > article .inner {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  z-index: 1;
}

.home-page .banner > article h2 {
  font-size: 7rem;
  margin-bottom: 0;
  color: #fff;
  font-weight: 300;
}

.home-page .banner > article p {
  color: rgba(255, 255, 255, 0.65);
  text-transform: uppercase;
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0;
  padding-bottom: 1.75rem;
  letter-spacing: 0.25rem;
}

.home-page .banner > article a {
  color: #fff;
  text-decoration: none;
}

.home-page .banner > article img {
  display: none;
}

.home-page .banner > article.visible {
  opacity: 1;
  visibility: visible;
}

.home-page .banner > article.top {
  z-index: 1;
}

.home-page .banner .indicators {
  bottom: 1.5em;
  left: 0;
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  text-align: center;
  width: 100%;
  z-index: 2;
}

.home-page .banner .indicators li {
  cursor: pointer;
  display: inline-block;
  height: 2em;
  overflow: hidden;
  padding: 0;
  position: relative;
  text-indent: 2em;
  width: 2em;
}

.home-page .banner .indicators li:before {
  background: rgba(255, 255, 255, 0.35);
  border-radius: 100%;
  content: '';
  display: inline-block;
  height: 0.8em;
  left: 50%;
  margin: -0.4em 0 0 -0.4em;
  position: absolute;
  text-indent: 0;
  top: 50%;
  width: 0.8em;
}

.home-page .banner .indicators li.visible:before {
  background: #fff;
}

@media screen and (max-width: 1280px) {
  .home-page .banner.full {
    padding: 0;
    min-height: 75vh;
    height: 75vh !important;
  }
}

@media screen and (max-width: 980px) {
  .home-page .banner.full {
    padding: 0;
    min-height: 50vh;
    height: 75vh !important;
  }

  .home-page .banner > article {
    background-attachment: scroll;
  }
}

@media screen and (max-width: 736px) {
  .home-page .banner > article .inner {
    width: 90%;
  }

  .home-page .banner > article p {
    margin-bottom: 1rem;
  }

  .home-page .banner > article h2 {
    font-size: 4em;
  }
}

body.is-mobile .home-page .banner > article {
  background-attachment: scroll;
}

.home-page .banner .prev,
.home-page .banner .next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  z-index: 2;
  transition: transform 0.3s ease;
}

.home-page .banner .prev {
  left: 10px;
}

.home-page .banner .next {
  right: 10px;
}

.home-page .banner .prev img,
.home-page .banner .next img {
  max-width: 300px;
  max-height: 300px;
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.home-page .banner .prev img:hover,
.home-page .banner .next img:hover {
  transform: scale(1.4);
}
</style>
