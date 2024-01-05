import * as jwt from 'jsonwebtoken';
import { RegisterUserRequest } from './data/register-user.request';
import { User, UserDocument } from '../../database/models/user.schema';
import { LoginRequest } from './data/login';

class AuthService {
  constructor() {
    //
  }

  async register(payload: RegisterUserRequest) {
    try {
      const user: UserDocument = await User.create(payload);
      return { success: true, result: user.profile };
    } catch (error) {
      console.log(error);
      return { success: true, error: 'user registration failed' };
    }
  }

  async signin(payload: LoginRequest) {
    const { JWT_EXPIRY, JWT_SECRET } = process.env;
    try {
      const user: UserDocument = await User.userExist(payload.username);
      if (!user) {
        return { success: false, status: 401, message: `user ${payload.username} is not recognised` };
      }
      const passwordMatched = await User.comparePasswords(payload.password, user.authentication.password);
      if (!passwordMatched) {
        return { success: false, status: 401, message: `sign in failed please try again` };
      }
      const tokenPayload = {
        id: user._id,
        email: user.email,
        ...user.profile
      };

      // @ts-ignore
      const token = jwt.sign(tokenPayload, JWT_SECRET, {
        expiresIn: JWT_EXPIRY
      });
      return { success: true, token };
    } catch (error) {
      console.log(error);
      return { success: true, error: '' };
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
