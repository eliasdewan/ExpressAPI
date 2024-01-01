import { v4 as uuidv4 } from 'uuid';
import data from './books.json';

const raw = JSON.parse(JSON.stringify(data)).books;

export default raw.map((b: any) => {
  //# Valid
  const { isbn, title, author, pages, language, country, published, publisher, description, website } = b;
  return { id: uuidv4(), isbn, title, author, pages, language, country, published, publisher, description, website };
});
