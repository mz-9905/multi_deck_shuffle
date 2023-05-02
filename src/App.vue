<template>
  <div id="app" class=".container">
    <PageHeader/>
    <router-view/>
    <PermitStorage/>
  </div>
</template>

<script>
import PermitStorage from '@/components/PermitStorage.vue';
import PageHeader from '@/components/PageHeader.vue';

export default{
    name: "App",
    components: { PageHeader, PermitStorage }
}
</script>
