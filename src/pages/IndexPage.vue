<!-- src/pages/IndexPage.vue -->
<template>
  <q-page padding>
    <div class="row">
      <div class="col-3 list">
        <PointList />
      </div>
      <div class="col-6 pl-2 gap">
        <h5>Редактирование точки</h5>
        <PointForm />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import PointList from 'src/components/PointList.vue';
import PointForm from 'src/components/PointForm.vue';
import { usePointsStore } from 'src/stores/pointStore';
import { onBeforeMount } from 'vue';

const store = usePointsStore();
onBeforeMount(() => {
  store.generatePoints(10000);
});
</script>

<style lang="scss">
.gap{
  margin-left: 20px;
}
</style>