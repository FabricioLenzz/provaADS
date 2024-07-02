const UsuarioApi = require('../api/usuario');
const UsuarioController = require('../controllers/usuario');
 
jest.mock('../controllers/usuario', () => ({
  createUser: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  find: jest.fn(),
  login: jest.fn(),
  validateToken: jest.fn(),
}));
 
describe('UsuarioApi', () => {
  let req, res, next;
 
  beforeEach(() => {
    req = {
      body: {},
      params: {},
      cookies: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      cookie: jest.fn(),
    };
    next = jest.fn();
  });
 
  describe('createUsuario', () => {
    it('deve criar um novo usuário', async () => {
      req.body = {
        nome: 'Fabricio Lenzz',
        email: 'Lenzz@gmail.com',
        senha: 'password',
        datanasc: '26/02/2005',
      };
 
      UsuarioController.createUsuario.mockResolvedValue({ id: 1, nome: 'Fabricio Lenzz', email: 'Lenzz@gmail.com', datanasc:'26/02/2005' });
 
      await UsuarioApi.createUsuario(req, res);
 
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({ id: 1, nome: 'Fabricio Lenzz', email: 'Lenzz@gmail.com', datanasc:'26/02/2005' });
    });
 
    it('deve lidar com erros durante a criação do usuário', async () => {
      req.body = {
        nome: 'Lenzz',
        email: 'Fabricio@gmail.com',
        senha: 'password',
        datanasc: '26/02/2005'
      };
 
      UsuarioController.createUsuario.mockRejectedValue(new Error('Database connection error'));
 
      await UserApi.createUsuario(req, res);
 
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ error: 'Erro ao criar usuário Database erro de conexão' });
    });
  });
 
  describe('updateUsuario', () => {
    it('deve atualizar um usuário existente', async () => {
      req.params.id = '1';
      req.body = {
        nome: 'Helo',
        email: 'Helovvit@egmail.com',
        senha: 'novasenha',
        datanasc: '26/02/2005'
      };
 
      UsuarioController.update.mockResolvedValue({ id: 1, nome: 'Helo', email: 'Helovvit@gmail.com', datanasc: '26/02/2005' });
 
      await UsuarioApi.updateUsuario(req, res);
 
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ id: 1, nome: 'Helo', email: 'Helovvit@gmail.com', datanasc: '26/02/2005' });
    });
 
    it('deve lidar com erros durante a atualização do usuário', async () => {
      req.params.id = '1';
      req.body = {
        nome: 'Helo',
        email: 'Helo@gmail.com',
        senha: 'newpassword',
        datanasc: '08/10/2006'
      };
 
      UsuarioController.update.mockRejectedValue(new Error('Usuário não encontrado'));
 
      await UsuarioApi.updateUsuario(req, res);
 
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ error: 'Erro ao alterar usuário Usuário não encontrado' });
    });
  });
 
 
 
});