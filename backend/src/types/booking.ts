export interface Booking {
  dusername: string;
  rusername: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  bookingDate: number;
  pax: number;
  message: string;
  isConfirmed: boolean;
  createdAt: number;
}
