<template>
  <q-form @submit="handleSubmit">
    <div class="row q-col-gutter-md">
      <div class="col-6">
        <h5>Основное</h5>
        <q-input v-model="formData.name" label="Название" :readonly="!pointStore.isEditMode" />
        <q-input v-model="formData.code" label="Код" :readonly="!pointStore.isEditMode" />
        <q-input v-model="formData.address" label="Адрес" :readonly="!pointStore.isEditMode" />
        <q-input
          v-model.number="formData.radius"
          type="number"
          label="Радиус"
          :readonly="!pointStore.isEditMode"
        />
      </div>
      <div class="col-6">
        <h5>Время</h5>
        <q-input
          v-model="formData.timeArrival"
          label="Время прибытия с"
          :readonly="!pointStore.isEditMode"
        />
        <q-input
          v-model="formData.timeDeparture"
          label="Время прибытия по"
          :readonly="!pointStore.isEditMode"
        />
        <q-input
          v-model="formData.loadingTime"
          label="Время загрузки"
          :readonly="!pointStore.isEditMode"
        />
        <q-input
          v-model="formData.actualArrival"
          label="Время прибытия (факт)"
          :readonly="!pointStore.isEditMode"
        />
        <q-input
          v-model="formData.actualDeparture"
          label="Время убытия (факт)"
          :readonly="!pointStore.isEditMode"
        />
      </div>
    </div>
    <div v-if="pointStore.isEditMode">
      <q-btn type="submit" color="primary" label="Сохранить" />
      <q-btn color="secondary" label="Отмена" @click="pointStore.cancelEdit" />
    </div>
    <div v-else>
      <q-btn color="primary" label="Редактировать" @click="pointStore.editPoint()" />
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
import { usePointsStore } from 'src/stores/pointStore';
import { Point } from 'src/models/Point';

const pointStore = usePointsStore();

// Инициализация formData с использованием класса Point
const formData = reactive<Point>(new Point(0, '', '', '', 0, 0, 0, '', '', '', '', ''));

// Наблюдение за изменением currentPoint
watch(
  () => pointStore.currentPoint,
  (newPoint) => {
    if (newPoint && !pointStore.isEditMode) {
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
