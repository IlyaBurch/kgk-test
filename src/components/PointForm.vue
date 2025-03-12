<template>
  <q-form @submit="handleSubmit" class="q-pa-md">
    <h4 class="text-h4 q-mb-md">Редактирование точки</h4>
    <div class="row q-col-gutter-md">
      <div class="col-6">
        <h5 class="text-h5 q-mb-sm">Основное</h5>
        <q-input
          v-model="formData.name"
          label="Название"
          :readonly="!pointStore.isEditMode"
          outlined
          class="q-mb-sm"
        />
        <q-input
          v-model="formData.code"
          label="Адрес"
          :readonly="!pointStore.isEditMode"
          outlined
          class="q-mb-sm"
        />
        <q-input
          v-model.number="formData.latitude"
          type="number"
          label="Широта"
          :readonly="!pointStore.isEditMode"
          outlined
          class="q-mb-sm"
        />
        <q-input
          v-model.number="formData.longitude"
          type="number"
          label="Долгота"
          :readonly="!pointStore.isEditMode"
          outlined
          class="q-mb-sm"
        />
        <q-input
          v-model.number="formData.radius"
          type="number"
          label="Радиус"
          :readonly="!pointStore.isEditMode"
          outlined
          class="q-mb-sm"
        />
      </div>
      <div class="col-6">
        <h5 class="text-h5 q-mb-sm">Время</h5>
        <q-input
          v-model="formData.timeArrival"
          label="Время прибытия с"
          :readonly="!pointStore.isEditMode"
          outlined
          class="q-mb-sm"
        />
        <q-input
          v-model="formData.timeDeparture"
          label="Время прибытия по"
          :readonly="!pointStore.isEditMode"
          outlined
          class="q-mb-sm"
        />
        <q-input
          v-model="formData.loadingTime"
          label="Время загрузки"
          :readonly="!pointStore.isEditMode"
          outlined
          class="q-mb-sm"
        />
        <q-input
          v-model="formData.actualArrival"
          label="Время прибытия (факт)"
          :readonly="!pointStore.isEditMode"
          outlined
          class="q-mb-sm"
        />
        <q-input
          v-model="formData.actualDeparture"
          label="Время убытия (факт)"
          :readonly="!pointStore.isEditMode"
          outlined
          class="q-mb-sm"
        />
      </div>
    </div>
    <div v-if="pointStore.isEditMode" class="q-mt-md">
      <q-btn type="submit" color="primary" label="Сохранить" class="q-mr-sm" />
      <q-btn color="secondary" label="Отмена" @click="pointStore.cancelEdit" />
    </div>
    <div v-else class="q-mt-md">
      <q-btn color="primary" label="Редактировать" @click="pointStore.editPoint()" />
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
import { usePointsStore } from 'src/stores/pointStore';
import { Point } from 'src/models/Point';

const pointStore = usePointsStore();

const formData = reactive<Point>(new Point(0, false, '', '', '', 0, 0, 0, '', '', '', '', ''));

watch(
  () => pointStore.currentPoint,
  (newPoint) => {
    if (newPoint) {
      Object.assign(formData, newPoint);
    }
  },
  { immediate: true },
);

const handleSubmit = () => {
  if (pointStore.currentPoint) {
    pointStore.saveEdit(formData);
    pointStore.isEditMode = false;
  }
};
</script>

<style scoped>
</style>
