import { v4 as uuidv4 } from 'uuid';
import { Author, AuthorUpdatePayload } from './author';
import { ApiResponse } from 'src/types/api-response';
import authors from '../../data/authors-loader';

class AthorsService {
  authors: Author[];

  constructor(list: Author[]) {
    this.authors = list;
  }

  getAuthors(): ApiResponse<Author> {
    return { success: true, result: this.authors };
  }

  getAuthor(id: string): ApiResponse<Author> {
    const author = this.authors.find((author) => author.id === id);
    return { success: true, result: author ? author : null };
  }

  addAuthor(data: Author): ApiResponse<Author> {
    const author: Author = { id: uuidv4(), ...data };
    this.authors.push(author);
    return {
      success: true,
      message: 'Author added sucessfully',
      result: author
    };
  }

  updateAuthor(id: string, payload: AuthorUpdatePayload): ApiResponse<Author> {
    const author = this.authors.find((author) => author.id === id);
    if (!author) {
      return {
        success: false,
        message: `Author with ${id} not found`,
        result: null
      };
    }
    const index: number = this.authors.findIndex((b) => b.id === id);
    this.authors[index] = { ...this.authors[index], ...payload };
    return {
      success: true,
      message: `Author with ${id} updated sucessfully`,
      result: this.authors[index]
    };
  }

  removeAuthor(id: string): ApiResponse<string> {
    const author = this.authors.find((author) => author.id === id);
    if (!author) {
      return {
        success: false,
        message: `Author with ${id} not found`,
        result: null
      };
    }
    this.authors = this.authors.filter((b) => b.id !== id);
    return {
      success: true,
      message: `Author with ${id} removed sucessfully`,
      result: id
    };
  }
}

export const authorsService = new AthorsService(authors);
