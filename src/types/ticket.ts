// export interface Event {
//   _id: string;
//   name: string;
//   date: string;
//   time: string;
//   venue: string;
//   ticketPrice: number;
//   totalTickets: number;
//   availableTickets:number;
//   createdAt: string;
// }

export interface Event {
  _id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  venue: string;
  ticketPrice: number;
  totalTickets: number;
  availableTickets: number;
  homeLogoUrl?: string;
  opponentLogoUrl?: string;
  imageUrl?: string; 
  createdAt: string;
}

export interface ApiResponse {
  message: string;
  count: number;
  events: Event[];
}