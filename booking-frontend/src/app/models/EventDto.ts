export interface EventWithDetailDto {
  id: string;
  name: string;
  priceFrom: number;
  date: string;
  time: string;
  duration: string;
  thumbnail: string;
  status: string;
  categoryId: string;
  
  eventDetail: {
    id: string;
    eventId: string;
    description: string;
    location: string;
    speakerOrPerformer: string;
    contactInfo: string;
    gallery: string;
  };
  ticketTypes: {
    id: string;
    eventId: string;
    name: string;
    price: number;
    quantity: number;
    sold: number;
    tickets: any[];
  }[];
}
