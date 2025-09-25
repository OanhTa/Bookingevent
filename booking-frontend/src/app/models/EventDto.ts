export interface EventWithDetailDto {
  // Event fields
  name: string;
  priceFrom: number;
  startDate: string;
  endDate: string;
  thumbnail?: string;
  status?: string;
  categoryId?: string;

  // EventDetail fields
  description: string;
  location?: string;
  speakerOrPerformer?: string;
  ticketQuantity?: number;
  contactInfo?: string;
  gallery?: string;
}

export enum EventType {
  Online = 0,
  Offline = 1,
  Hybrid = 2
}
