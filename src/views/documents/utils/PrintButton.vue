<template>
  <router-link :to="path" tag="button" class="button is-primary is-size-7-mobile" @click="exportCsv">
    Print
  </router-link>
</template>

<script>
export default {
    computed: {
	path() {
	    return '/print'+this.$route.fullPath;
	}
    },
};
</script>
