const request = require('supertest');
const app = require('./app');

describe('PerkPoint API Tests', () => {
  test('GET / should return welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('Welcome to PerkPoint');
  });

  test('GET /api/menu should return menu items', async () => {
    const response = await request(app).get('/api/menu');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});