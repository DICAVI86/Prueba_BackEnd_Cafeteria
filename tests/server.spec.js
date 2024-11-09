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
        id: 5,   // Cambié el id para evitar conflicto con los existentes
        nombre: "Latte"
      };
  
      const response = await request(app).post('/cafes').send(newCafe);
  
      // Verificar que el código de estado sea 201
      expect(response.status).toBe(201);
  
      // Verificar que el café agregado esté en la respuesta
      expect(response.body).toEqual(expect.arrayContaining([newCafe]));
    });
  
    it('debe devolver un status 400 si ya existe un café con el mismo id', async () => {
      const newCafe = {
        id: 1,  // Usamos un id que ya existe
        nombre: "Capuccino"
      };
  
      const response = await request(app).post('/cafes').send(newCafe);
  
      // Verificar que el código de estado sea 400
      expect(response.status).toBe(400);
  
      // Verificar que el mensaje de error es el esperado
      expect(response.body.message).toBe("Ya existe un cafe con ese id");
    });
  });
  
  



  
