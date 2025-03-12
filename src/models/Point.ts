export class Point {
  id: number;
  name: string;
  code: string;
  address: string;
  latitude: number;
  longitude: number;
  radius: number;
  timeArrival: string;
  timeDeparture: string;
  loadingTime: string;
  actualArrival: string;
  actualDeparture: string;

  constructor(
    id: number,
    name: string,
    code: string,
    address: string,
    latitude: number,
    longitude: number,
    radius: number,
    timeArrival: string,
    timeDeparture: string,
    loadingTime: string,
    actualArrival: string,
    actualDeparture: string,
  ) {
    this.id = id;
    this.name = name;
    this.code = code;
    this.address = address;
    this.latitude = latitude;
    this.longitude = longitude;
    this.radius = radius;
    this.timeArrival = timeArrival;
    this.timeDeparture = timeDeparture;
    this.loadingTime = loadingTime;
    this.actualArrival = actualArrival;
    this.actualDeparture = actualDeparture;
  }

  // Метод для обновления данных точки
  update(point: Point): void {
    this.name = point.name;
    this.code = point.code;
    this.address = point.address;
    this.latitude = point.latitude;
    this.longitude = point.longitude;
    this.radius = point.radius;
    this.timeArrival = point.timeArrival;
    this.timeDeparture = point.timeDeparture;
    this.loadingTime = point.loadingTime;
    this.actualArrival = point.actualArrival;
    this.actualDeparture = point.actualDeparture;
  }

  // Статический метод для создания новой точки
  static create(
    id: number,
    name: string,
    code: string,
    address: string,
    latitude: number,
    longitude: number,
    radius: number,
    timeArrival: string,
    timeDeparture: string,
    loadingTime: string,
    actualArrival: string,
    actualDeparture: string,
  ): Point {
    return new Point(
      id,
      name,
      code,
      address,
      latitude,
      longitude,
      radius,
      timeArrival,
      timeDeparture,
      loadingTime,
      actualArrival,
      actualDeparture,
    );
  }
}
