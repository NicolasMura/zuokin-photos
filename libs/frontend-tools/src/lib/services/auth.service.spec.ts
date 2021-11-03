import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';
import { ErrorHandlingService } from './error-handling.service';


let authUrl: string;

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers:[
        { provide: NotificationService, useValue: {} },
        { provide: ErrorHandlingService, useValue: {} }
      ]
    }).compileComponents();
    authService = TestBed.inject(AuthService);

    authUrl = `${authService.baseUrlAuth}/campaigns`;

    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  // it('should store the token in localStorage when session starts',
  //   () => {
  //     service.startSession('sometoken');
  //     expect(localStorage.getItem('tokenLocalStorage')).toEqual('sometoken');
  // });

  // xit('should return stored token from localStorage',
  //   () => {
  //     localStorage.setItem('id_token', 'anothertoken');
  //     expect(service.getAccessToken()).toEqual('anothertoken');
  // });
});
