import { HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { AuthService } from './auth.service';

describe('(3) Prueba a "AuthService"', () => {
  let service: AuthService;
  let httpClientSpy: { post: jasmine.Spy; get: jasmine.Spy }; // Objeto que espia el metodos post

  beforeEach(() => {
    // se ejecuta Antes de cada it (prueba)
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get']); //Crea un objeto espia para el modulo HttpClient el metodo post
    service = new AuthService(httpClientSpy as any);
  });

  it('Debe de crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('Deberia retornar objecto usuario (Login Correcto)', (done: DoneFn) => {
    const mockUserCredentials = {
      email: 'leoneider33@gmail.com',
      password: '123456',
    };

    const mockResultLogin = {
      data: {
        id: 2,
        user: 'leoneider',
      },
    };

    httpClientSpy.post.and.returnValue(of(mockResultLogin));
    const { email, password } = mockUserCredentials;

    service.login(email, password).subscribe((resultado: any) => {
      expect(resultado).toEqual(mockResultLogin);
      done();
    });
  });

  it(`Deberia retornar error 409`, (done: DoneFn) => {
    const mockUserCredentials = {
      email: 'leoneider33@gmail.com',
      password: '',
    };

    const error409 = new HttpErrorResponse({
      error: 'Invalid user',
      status: 409,
      statusText: 'Not Found',
    });

    httpClientSpy.post.and.returnValue(throwError(error409));

    const { email, password } = mockUserCredentials;
    service.login(email, password).subscribe(
      (res) => {},
      (error) => {
        expect(error.status).toEqual(409);
        done();
      }
    );
  });
});
