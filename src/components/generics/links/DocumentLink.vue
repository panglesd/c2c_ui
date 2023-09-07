<template>
  <router-link
    :to="{ name: documentType, params: { id: document.document_id, lang: lang }, query: document.search_query?.query }"
    :target="target"
    :title="$documentUtils.getDocumentTitle(document, $route.params.lang)"
  >
    <slot>
      <document-title :document="document" :uppercase-first-letter="uppercaseFirstLetter" />
    </slot>
  </router-link>
</template>

<script>
import { requireDocumentProperty } from '@/js/properties-mixins';

export default {
  mixins: [requireDocumentProperty],

  props: {
    lang: {
      type: String,
      default: null,
    },

    uppercaseFirstLetter: {
      type: Boolean,
      default: false,
    },

    target: {
      type: String,
      default: undefined,
    },
  },

  computed: {
    // query() {
    //   if (this.document.search_query) {
    //     let query = this.document.search_query.query;
    //     query.index = this.document.search_query.index;
    //     return query;
    //   }
    //   return {};
    // },
  },
};
</script>
