const request = require('supertest');
const app = require('../src/app');

describe('API', () => {
  test('GET / returns service information', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.body.service).toBe('devops-cicd-node-api');
  });

  test('GET /health returns UP', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('UP');
  });
});
