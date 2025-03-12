import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { Point } from 'src/models/Point';

export const usePointsStore = defineStore('points', () => {
  const points = ref<Point[]>([]);
  const pointsBackup = ref<Point[]>([]);
  const currentPoint = ref<Point | null>(null);
  const isEditMode = ref(false);
  const originalPoint = ref<Point | null>(null);
  const searchQuery = ref('');

  // Вычисляемые свойства
  const totalPoints = computed(() => points.value.length);

  // Генерация точек
  function generatePoints(count: number): void {
    if (count <= 0) {
      throw new Error('Count must be a positive number');
    }

    const newPoints = [];
    for (let i = 1; i <= count; i++) {
      newPoints.push(
        new Point(
          i,
          false, 
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
          '12:00'
        )
      );
    }
    pointsBackup.value = newPoints;
    applySearch();
  }

  function setFirstCurrent(){
    if (points.value[0]){
      setCurrentPoint(points.value[0])
    }
  }

  // Установка текущей точки
  function setCurrentPoint(point: Point): void {
    if (!point) {
      throw new Error('Invalid point provided');
    }
    originalPoint.value = point;
    currentPoint.value = point;
    cancelEdit();
  }

  // Создание новой точки
  function createPoint(): void {
    const newPoint = new Point(
      pointsBackup.value.length + 1,
      false, // checked
      `Точка №${pointsBackup.value.length + 1}`, 
      '', '', 0, 0, 0, '', '', '', '', '' 
    );

    pointsBackup.value.push(newPoint);

    if (searchQuery.value) {
      if (newPoint.name.toLowerCase().includes(searchQuery.value.toLowerCase())) {
        points.value.push(newPoint);
      }
    } else {
      points.value = [...pointsBackup.value];
    }

    console.log(newPoint)
    setCurrentPoint(newPoint);
    isEditMode.value = true;
  }

  // Обновление точки
  function updatePoint(updatedPoint: Point): void {
    const index = pointsBackup.value.findIndex((p) => p.id === updatedPoint.id);
    if (index !== -1) {
      pointsBackup.value[index] = updatedPoint;
    }

    if (searchQuery.value) {
      applySearch();
    } else {
      points.value = [...pointsBackup.value];
    }
  }

  // Редактирование точки
  function editPoint(): void {
    if (currentPoint.value) {
      originalPoint.value = { ...currentPoint.value };
    }
    isEditMode.value = true;
  }

  // Сохранение изменений
  function saveEdit(updatedData: Point): void {
    if (!updatedData) {
      throw new Error('Invalid data provided');
    }

    const updatedPoint = new Point(
      updatedData.id,
      updatedData.checked,
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
      updatedData.actualDeparture
    );

    updatePoint(updatedPoint);
    originalPoint.value = null;
    isEditMode.value = false;
    setCurrentPoint(updatedPoint);
  }

  // Отмена редактирования
  function cancelEdit(): void {
    if (originalPoint.value) {
      const index = pointsBackup.value.findIndex((p) => p.id === originalPoint.value!.id);
      if (index !== -1) {
        pointsBackup.value[index] = { ...originalPoint.value };
        currentPoint.value = { ...originalPoint.value };
      }
    }
    isEditMode.value = false;
  }

  // Поиск точек
  function search(input: string): void {
    searchQuery.value = input;
    applySearch();
  }

  // Применение поиска (фильтрация списка)
  function applySearch(): void {
    if (!searchQuery.value) {
      points.value = [...pointsBackup.value];
      return;
    }

    points.value = pointsBackup.value.filter((point) =>
      point.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  const isSelected = ref(false)

  // Выбор всех точек
  function selectAll(): void {
    points.value.forEach((point) => (point.checked = true));
    isSelected.value = true;
  }

  // Снятие выбора со всех точек
  function unselectAll(): void {
    points.value.forEach((point) => (point.checked = false));
    isSelected.value = false;
  }

  return {
    points,
    currentPoint,
    isEditMode,
    originalPoint,
    totalPoints,
    isSelected,
    generatePoints,
    setCurrentPoint,
    setFirstCurrent,
    createPoint,
    updatePoint,
    editPoint,
    saveEdit,
    cancelEdit,
    search,
    selectAll,
    unselectAll,
  };
});