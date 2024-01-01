import { v4 as uuidv4 } from 'uuid';
import data from './authors.json';

const raw = JSON.parse(JSON.stringify(data)).authors;

export default raw.map((author: any) => {
  const { first_name, last_name, country, language, died = undefined } = author;
  return { id: uuidv4(), name: first_name + last_name, country, language, died: died };
});
