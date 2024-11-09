const request = require('supertest'); 
const app = require('../index');  


//01
describe('GET /cafes', () => {
    it('debe devolver un status 200 y un array de cafés', async () => {
      const response = await request(app).get('/cafes');
  
      expect(response.status).toBe(200);

      expect(Array.isArray(response.body)).toBe(true);

      if (response.body.length > 0) {
        const cafe = response.body[0];
        expect(cafe).toHaveProperty('id');
        expect(cafe).toHaveProperty('nombre');

      }
    });
  });


  
