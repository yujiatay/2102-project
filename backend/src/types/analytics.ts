export interface DatePopularity {
  date: string;
  bookings: number;
  confirmedBookings: number;
  totalPax: number;
  totalConfirmedPax: number;
  meanPax: number;
  meanConfirmedPax: number;
}

export interface TimeslotPopularity {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  bookings: number;
  confirmedBookings: number;
  totalPax: number;
  totalConfirmedPax: number;
  meanPax: number;
  meanConfirmedPax: number;
}
