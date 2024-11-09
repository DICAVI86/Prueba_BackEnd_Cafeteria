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
  
    it('debe devolver un status 400 si ya existe un café con el mismo id', async () => {
      const newCafe = {
        id: 1, 
        nombre: "Capuccino"
      };
  
      const response = await request(app).post('/cafes').send(newCafe);
  
      expect(response.status).toBe(400);
  
      expect(response.body.message).toBe("Ya existe un cafe con ese id");
    });
  });

//04
describe('PUT /cafes/:id', () => {
    it('debe actualizar un café correctamente y devolver un status 200', async () => {
      const updatedCafe = {
        id: 2,  
        nombre: "Latte Macchiato"
      };
  
      const response = await request(app).put('/cafes/2').send(updatedCafe);
  
      expect(response.status).toBe(200);
  
      expect(response.body).toEqual(expect.arrayContaining([updatedCafe]));
    });
  
    it('debe devolver un status 400 si el id en los parámetros no coincide con el id del cuerpo', async () => {
      const updatedCafe = {
        id: 2, 
        nombre: "Mocha"
      };
  
      const response = await request(app).put('/cafes/3').send(updatedCafe);
  
      expect(response.status).toBe(400);
  
      expect(response.body.message).toBe("El id del parámetro no coincide con el id del café recibido");
    });
  
    it('debe devolver un status 404 si el café no existe', async () => {
      const updatedCafe = {
        id: 999,  
        nombre: "Flat White"
      };
  
      const response = await request(app).put('/cafes/999').send(updatedCafe);
  
      expect(response.status).toBe(404);
  
      expect(response.body.message).toBe("No se encontró ningún café con ese id");
    });
  });
  
  
  



  
