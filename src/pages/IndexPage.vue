<!-- src/pages/IndexPage.vue -->
<template>
  <q-page padding>
    <div class="row">
      <div class="col-3">
        <h5>Точки</h5>
        <PointList />
      </div>
      <div class="col-6">
        <h5>Редактирование точки</h5>
        <PointForm />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import PointList from 'src/components/PointList.vue';
import PointForm from 'src/components/PointForm.vue';
</script>
