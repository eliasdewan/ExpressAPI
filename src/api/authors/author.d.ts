export type Author = {
  id?: string;
  name: string;
  country: string;
  language: string;
  died?: Date;
};

export type AuthorUpdatePayload = Partial<Omit<Author, 'id'>>;
