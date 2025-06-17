import { TestBed } from '@angular/core/testing';

import { IAuthAPIService } from "../infrastructure/authAPI.interface"
import { AuthUseCaseService } from "./auth-usecase.service";
import { UserDomain } from '../domain/userDomain.model';
import { HTTP_AUTH_SERVICE } from '../infrastructure/providers/authAPI.provider';
import { of, throwError } from 'rxjs';

describe('[Auth Feature] auth-usecase', () => {

  let authService: AuthUseCaseService;

  let mockAuthAPIService: jasmine.SpyObj<IAuthAPIService>;

  const mockUser: UserDomain = {
    id: "23e8",
    name: "Test user name",
    email: "user@test.com",
    phoneNumber: "3002221111",
    dateOfBirth: "2003-09-22T12:00:00.000Z",
    address: "test address",
    password: "123456",
    role: "CUSTOMER",
    cart: []
  }

  beforeEach(() => {

    mockAuthAPIService = jasmine.createSpyObj<IAuthAPIService>(
      'IAuthAPIService', 
      ['signup','login','logout','isLoggedIn']
    );

    TestBed.configureTestingModule({
      providers: [ 
        AuthUseCaseService,
        {
          provide: HTTP_AUTH_SERVICE,
          useValue: mockAuthAPIService
        } 
      ],
    });

    authService = TestBed.inject(AuthUseCaseService);
  })

  it('should return a user when login is successful', (done) => {

    mockAuthAPIService.login.and.returnValue(of(mockUser));

    authService.login('user@test.com', '123456').subscribe({
      next: (res) => {
        expect(res).toEqual(mockUser);
        expect(mockAuthAPIService.login).toHaveBeenCalledWith('user@test.com', '123456');
        done();
      },
      error: () => {
        fail('User or password invalid');
        done();
      }
    });
  });

  it('should return an error when login fails', (done) => {
    const mockError = new Error('User or password invalid');
    mockAuthAPIService.login.and.returnValue(throwError(()=> mockError));

    authService.login('user@test.com', 'wrongPassword').subscribe({
      next: () => {
        fail('Expected an error, but got a user');
        done();
      },
      error: (err) => {
        expect(err).toEqual(mockError);
        expect(mockAuthAPIService.login).toHaveBeenCalledWith('user@test.com', 'wrongPassword');
        done();
      }
    });
  });

  it('should return a user when signup is successful', (done) => {
    mockAuthAPIService.signup.and.returnValue(of(mockUser));

    authService.signup(mockUser).subscribe({
      next: (result) => {
        expect(result).toEqual(mockUser);
        expect(mockAuthAPIService.signup).toHaveBeenCalledWith(mockUser);
        done();
      },
      error: () => {
        fail('Expected a user, but got an error');
        done();
      }
    });
  });

  it('should return an error when signup fails', (done) => {
    const mockError = new Error('User already exists');
    mockAuthAPIService.signup.and.returnValue(throwError(() => mockError));

    authService.signup(mockUser).subscribe({
      next: () => {
        fail('Expected an error, but got a user');
        done();
      },
      error: (error) => {
        expect(error).toEqual(mockError);
        expect(mockAuthAPIService.signup).toHaveBeenCalledWith(mockUser);
        done();
      }
    });
  });

  it('should call logout from authAPIService', () => {
    mockAuthAPIService.logout.and.stub(); // is void
    authService.logout();
    expect(mockAuthAPIService.logout).toHaveBeenCalled();
  });

  it('should return true when user is logged in', () => {
    mockAuthAPIService.isLoggedIn.and.returnValue(true);

    const result = authService.isLoggedIn();

    expect(result).toBeTrue();
    expect(mockAuthAPIService.isLoggedIn).toHaveBeenCalled();
  });

  it('should return false when user is not logged in', () => {
    mockAuthAPIService.isLoggedIn.and.returnValue(false);

    const result = authService.isLoggedIn();

    expect(result).toBeFalse();
    expect(mockAuthAPIService.isLoggedIn).toHaveBeenCalled();
  });

})