import { TestBed } from "@angular/core/testing";
import { UserDomain } from "../../auth/domain/userDomain.model";
import { ProductItem } from "../../buys/domain/BuyDomain.model";
import { UserService } from "./user.service";
import { provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('[User Feature] User Service', () => {

  let userService: UserService;
  let httpMock: HttpTestingController;

  const api_url = 'http://localhost:3000';

  const mockUser: UserDomain = {
    id: 'u1',
    name: 'user test',
    email: 'user@test.com',
    phoneNumber: '3008882222',
    dateOfBirth: '01/01/2000',
    password: '123456',
    role: 'CUSTOMER',
    address: 'address test',
    cart: []
  };

  const mockCart: ProductItem[] = [
    {
      id: 'p1',
      name: 'Item',
      price: 100,
      quantity: 2,
      sale: false,
      sale_price: 0,
      imageURL: 'img.jpg'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [ 
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });

    userService = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch current user if userId is in localStorage', () => {
    
    localStorage.setItem('userId', 'u1');

    userService.getCurrentUser().subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`${api_url}/users/u1`);
    expect(req.request.method).toBe('GET');
    
    req.flush(mockUser);
  });

  it('should throw error if userId is not in localStorage', () => {
    localStorage.removeItem('userId');
    expect(() => userService.getCurrentUser()).toThrowError('UserDomain is not logged!');
  });

  // updateProfile - success
  it('should update profile if email is unique', () => {
    const userData = { ...mockUser, email: 'unique@example.com' };

    userService.updateProfile('u1', userData).subscribe(res => {
      expect(res).toEqual(userData);
    });

    // Pretend there is no conflict with other users
    const getReq = httpMock.expectOne(`${api_url}/users?email=unique@example.com`);
    expect(getReq.request.method).toBe('GET');
    getReq.flush([]); // email free

    const putReq = httpMock.expectOne(`${api_url}/users/u1`);
    expect(putReq.request.method).toBe('PUT');
    expect(putReq.request.body).toEqual(userData);
    putReq.flush(userData);
  });

  // updateProfile - duplicate email error
  it('should return error if email already exists in another user', () => {
    const otherUser: UserDomain = { ...mockUser, id: '999' };

    userService.updateProfile('u1', mockUser).subscribe({
      next: () => fail('Expected error'),
      error: err => {
        expect(err).toBe('Email already exists');
      }
    });

    const getReq = httpMock.expectOne(`${api_url}/users?email=${mockUser.email}`);
    getReq.flush([otherUser]);
  });

  // getCart
  it('should fetch user cart', () => {
    userService.getCart('u1').subscribe(cart => {
      expect(cart).toEqual(mockCart);
    });

    const req = httpMock.expectOne(`${api_url}/users/u1/cart`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCart);
  });

  // updateCart
  it('should update user cart with patch', () => {
    userService.updateCart('u1', mockCart).subscribe(res => {
      expect(res).toBeNull();
    });

    const req = httpMock.expectOne(`${api_url}/users/u1`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ cart: mockCart });
    req.flush(null);
  });


});