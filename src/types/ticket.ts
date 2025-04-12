export interface Event {
  _id: string;
  name: string;
  date: string;
  time: string;
  venue: string;
  ticketPrice: number;
  totalTickets: number;
  createdAt: string;
}

export interface ApiResponse {
  message: string;
  count: number;
  events: Event[];
}