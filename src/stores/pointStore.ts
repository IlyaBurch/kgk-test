import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { Point } from 'src/models/Point';

export const usePointsStore = defineStore('points', () => {

  const points = ref<Point[]>([]);
  const currentPoint = ref<Point | null>(null);
  const selectedPoints = ref<Set<number>>(new Set());
  const isEditMode = ref(false);
  const originalPoint = ref<Point | null>(null);


  const totalPoints = computed(() => points.value.length);
  const selectedPointsCount = computed(() => selectedPoints.value.size);


  function generatePoints(count: number): void {
    if (count <= 0) {
      throw new Error('Count must be a positive number');
    }

    const newPoints = [];
    for (let i = 1; i <= count; i++) {
      newPoints.push(
        new Point(
          i,
          `Точка №${i}`,
          `Код ${i}`,
          `ул. 5-е Пороховая, 15-409`,
          Math.random() * 180 - 90,
          Math.random() * 360 - 180,
          500,
          '06:00',
          '12:00',
          '10:40',
          '06:00',
          '12:00',
        ),
      );
    }
    points.value = newPoints;
    currentPoint.value = newPoints[0] || null;
  }

  function setCurrentPoint(point: Point): void {
    if (!point) {
      throw new Error('Invalid point provided');
    }
    originalPoint.value = point; 
    currentPoint.value = point;
  }

function createPoint(): void {
  const newPoint = new Point(
    points.value.length + 1, // ID нового элемента
    `Точка №${points.value.length + 1}`, // Название
    '', '', 0, 0, 0, '', '', '', '', '', // Остальные параметры
  );

  // Добавляем новый элемент в массив
  points.value.push(newPoint);

  // Устанавливаем новый элемент как текущий
  setCurrentPoint(newPoint);
}

  function updatePoint(updatedPoint: Point): void {
    const index = points.value.findIndex((p) => p.id === updatedPoint.id);
    if (index !== -1) {
      points.value[index] = updatedPoint;
    }
  }

function editPoint(): void {
  if (currentPoint.value) {
    // Сохраняем текущее состояние точки при входе в режим редактирования
    originalPoint.value = { ...currentPoint.value };
  }
  isEditMode.value = true;
}

  function saveEdit(updatedData: Point): void {
    if (!updatedData) {
      throw new Error('Invalid data provided');
    }

    const updatedPoint = new Point(
      updatedData.id,
      updatedData.name,
      updatedData.code,
      updatedData.address,
      updatedData.latitude,
      updatedData.longitude,
      updatedData.radius,
      updatedData.timeArrival,
      updatedData.timeDeparture,
      updatedData.loadingTime,
      updatedData.actualArrival,
      updatedData.actualDeparture,
    );

    updatePoint(updatedPoint);
    originalPoint.value = null; // Сбрасываем originalPoint после сохранения
    isEditMode.value = false;
    setCurrentPoint(updatedPoint); // Обновляем currentPoint
  }

function cancelEdit(): void {
  if (originalPoint.value) {
    // Возвращаем точку к состоянию на момент начала редактирования
    const index = points.value.findIndex((p) => p.id === originalPoint.value!.id);
    if (index !== -1) {
      points.value[index] = { ...originalPoint.value };
      currentPoint.value = { ...originalPoint.value };
    }
  }
  isEditMode.value = false;
}

  function setSelected(pointId: number): void {
    selectedPoints.value.add(pointId);
  }

  function unselectPoint(pointId: number): void {
    selectedPoints.value.delete(pointId);
  }

  return {
    points,
    currentPoint,
    selectedPoints,
    isEditMode,
    originalPoint,
    totalPoints,
    selectedPointsCount,
    generatePoints,
    setCurrentPoint,
    createPoint,
    updatePoint,
    editPoint,
    saveEdit,
    cancelEdit,
    setSelected,
    unselectPoint,
  };
});