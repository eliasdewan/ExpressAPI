import { v4 as uuidv4 } from 'uuid';
import { Book, BookUpdatePayload } from './book';
import { ApiResponse } from '../../types/api-response';
import books from '../../data/books-loader';

class BooksService {
  books: Book[];

  constructor(list: Book[]) {
    this.books = list;
  }

  getBooks(): ApiResponse<Book> {
    return { success: true, result: this.books };
  }

  getBook(id: string): ApiResponse<Book> {
    const book = this.books.find((book) => book.id === id);
    return { success: true, result: book ? book : null };
  }

  addBook(data: Book): ApiResponse<Book> {
    const book: Book = { id: uuidv4(), ...data };
    this.books.push(book);
    return {
      success: true,
      message: 'Book added sucessfully',
      result: book
    };
  }

  updateBook(id: string, payload: BookUpdatePayload): ApiResponse<Book> {
    const book = this.books.find((book) => book.id === id);
    if (!book) {
      return {
        success: false,
        message: `Book with ${id} not found`,
        result: null
      };
    }
    const index: number = this.books.findIndex((b) => b.id === id);
    this.books[index] = { ...this.books[index], ...payload };
    return {
      success: true,
      message: `Book with ${id} updated sucessfully`,
      result: this.books[index]
    };
  }

  removeBook(id: string): ApiResponse<string> {
    const book = this.books.find((book) => book.id === id);
    if (!book) {
      return {
        success: false,
        message: `Book with ${id} not found`,
        result: null
      };
    }
    this.books = this.books.filter((b) => b.id !== id);
    return {
      success: true,
      message: `Book with ${id} removed sucessfully`,
      result: id
    };
  }
}

export const booksService = new BooksService(books);
