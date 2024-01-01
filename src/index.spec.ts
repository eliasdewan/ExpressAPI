/**
 * Testing apis
 */
import request from 'supertest';
import app from './index'; // Import your app instance

describe('Api test', () => {
  test('should return books', async () => {
    const response = await request(app).get('books');
    console.log(response);
    expect(2).toEqual(2);
  });
});
