import { RegisterUserRequest } from './data/register-user.request';
import { IUser, UserModel } from '../../database/models/user.schema';

class AuthService {
  constructor() {
    //
  }

  async register(payload: RegisterUserRequest) {
    try {
      const user: IUser = await UserModel.create(payload);
      return { success: true, result: user.profile };
    } catch (error) {
      console.log(error);
      return { success: true, error: 'user registration failed' };
    }
  }
}

// getBook(id: string): ApiResponse < Book > {
//   const book = this.books.find((book) => book.id === id);
//   return { success: true, result: book ? book : null };
// }

// addBook(data: Book): ApiResponse < Book > {
//   const book: Book = { id: uuidv4(), ...data };
//   this.books.push(book);
//   return {
//     success: true,
//     message: 'Book added sucessfully',
//     result: book
//   };
// }

// updateBook(id: string, payload: BookUpdatePayload): ApiResponse < Book > {
//   const book = this.books.find((book) => book.id === id);
//   if(!book) {
//     return {
//       success: false,
//       message: `Book with ${id} not found`,
//       result: null
//     };
//   }
//     const index: number = this.books.findIndex((b) => b.id === id);
//   this.books[index] = { ...this.books[index], ...payload };
//   return {
//     success: true,
//     message: `Book with ${id} updated sucessfully`,
//     result: this.books[index]
//   };
// }

// removeBook(id: string): ApiResponse < string > {
//   const book = this.books.find((book) => book.id === id);
//   if(!book) {
//     return {
//       success: false,
//       message: `Book with ${id} not found`,
//       result: null
//     };
//   }
//     this.books = this.books.filter((b) => b.id !== id);
//   return {
//     success: true,
//     message: `Book with ${id} removed sucessfully`,
//     result: id
//   };
// }
//}

export const authService = new AuthService();
