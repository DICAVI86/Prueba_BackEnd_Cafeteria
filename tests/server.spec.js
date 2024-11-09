const request = require('supertest'); 
const app = require('../index');  

//01
describe('GET /cafes', () => {
  it('debe devolver un status 200 y un arreglo de cafés', async () => {
    const response = await request(app).get('/cafes');

    expect(response.status).toBe(200);

    expect(Array.isArray(response.body)).toBe(true);

    if (response.body.length > 0) {
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('nombre');
    }
  });
});

//02
describe('DELETE /cafes/:id', () => {
  it('debe devolver un status 404 si el café no existe', async () => {
    const response = await request(app)
      .delete('/cafes/999')  
      .set('Authorization', 'Bearer valid-token'); 

    expect(response.status).toBe(404);

    expect(response.body.message).toBe('No se encontró ningún cafe con ese id');
  });
});

//03
describe('POST /cafes', () => {
  it('debe agregar un café correctamente y devolver un status 201', async () => {
    const newCafe = {
      id: 5,  
      nombre: "Latte"
    };

    const response = await request(app).post('/cafes').send(newCafe);

    expect(response.status).toBe(201);

    expect(response.body).toEqual(expect.arrayContaining([newCafe]));
  });
});

//04
describe('PUT /cafes/:id', () => {
  it('debe devolver un status 400 si el id en los parámetros no coincide con el id del cuerpo', async () => {
    const updatedCafe = {
      id: 2, 
      nombre: "Mocha"
    };

    const response = await request(app).put('/cafes/3').send(updatedCafe); 

    expect(response.status).toBe(400);

    expect(response.body.message).toBe("El id del parámetro no coincide con el id del café recibido");
  });
});

