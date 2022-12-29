import { HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import * as dotenv from 'dotenv';

dotenv.config();

const app = `http://localhost:${process.env.PORT}`;

describe('Classification', () => {
  it('should return status 200', () => {
    jest.setTimeout(10000);
    return request(app)
      .get('/classification/classify')
      .set('accept', 'application/json')
      .query({
        address: '0x83A86adf1a7c56e77d36d585B808052e0a2aAD0e',
        network: 'mainnet',
      })
      .expect(HttpStatus.OK);
  });
  it('should return status 400', () => {
    jest.setTimeout(10000);
    return request(app)
      .get('/classification/classify')
      .set('accept', 'application/json')
      .query({ address: '0x0' })
      .expect(HttpStatus.BAD_REQUEST);
  });
});
