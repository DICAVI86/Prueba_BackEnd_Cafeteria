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


//02
describe('GET /cafes/:id', () => {
  it('debe devolver un status 200 y el café correspondiente cuando el id es válido', async () => {

    const response = await request(app).get('/cafes/1');

    expect(response.status).toBe(200);

    const cafe = response.body;
    expect(cafe).toHaveProperty('id');
    expect(cafe.id).toBe(1); 
    expect(cafe).toHaveProperty('nombre');
  });

  it('debe devolver un status 404 cuando el id no es válido', async () => {

    const response = await request(app).get('/cafes/999');

    expect(response.status).toBe(404);

    expect(response.body.message).toBe('No se encontró ningún cafe con ese id');
  });
});

//03



  
