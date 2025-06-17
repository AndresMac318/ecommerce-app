import { TestBed } from "@angular/core/testing";
import { ProductDomain } from "../domain/productDomain.model";
import { IProductAPIService } from "../infrastructure/productsAPI.interface";
import { ProductUseCaseService } from "./product-usecase.service";
import { HTTP_PRODUCT_SERVICE } from "../infrastructure/providers/productAPI.provider";
import { of, throwError } from "rxjs";
import { ProductFilters } from "../+state/product.state";

describe('[Product Feature] product-usecase', () => {
  let productService: ProductUseCaseService;
  let mockProductAPIService: jasmine.SpyObj<IProductAPIService>;

  const mockProduct: ProductDomain = {
    id: '1',
    name: 'Test Product',
    price: 100,
    description: 'Description test',
    imageURL: 'test.jpg',
    category: 'Electronics',
    stock: 10,
    sale: false,
    sale_price: 0,
  };

  beforeEach(() => {
    mockProductAPIService = jasmine.createSpyObj<IProductAPIService>(
      'IProductAPIService', 
      ['getAllProducts', "getProductById", "getProductsPaginated"]
    );

    TestBed.configureTestingModule({
      providers: [
        ProductUseCaseService,
        { provide: HTTP_PRODUCT_SERVICE, useValue: mockProductAPIService }
      ]
    });

    productService = TestBed.inject(ProductUseCaseService);

  });

  it('should return all products when getProducts is successful', (done) => {
    mockProductAPIService.getAllProducts.and.returnValue(of([mockProduct]));

    productService.getProducts().subscribe({
      next: (products) => {
        expect(products).toEqual([mockProduct]);
        expect(mockProductAPIService.getAllProducts).toHaveBeenCalled();
        done();
      },
      error: () => {
        fail('Expected products but got error');
        done();
      }
    });
  });

  it('should handle error when getProducts fails', (done) => {
    const error = new Error('Fetch failed');
    mockProductAPIService.getAllProducts.and.returnValue(throwError(() => error));

    productService.getProducts().subscribe({
      next: () => {
        fail('Expected error');
        done();
      },
      error: (err) => {
        expect(err).toEqual(error);
        expect(mockProductAPIService.getAllProducts).toHaveBeenCalled();
        done();
      }
    });
  });

  it('should return paginated products correctly', (done) => {
    const mockResponse = {
      products: [mockProduct],
      totalItems: 1,
      cacheKey: 'page-1'
    };

    mockProductAPIService.getProductsPaginated.and.returnValue(of(mockResponse));

    const filters: ProductFilters = { category: 'Electronics', priceRange: [10, 200] };

    productService.getProductsPaginated(1, 10, filters).subscribe({
      next: (res) => {
        expect(res).toEqual(mockResponse);
        expect(mockProductAPIService.getProductsPaginated).toHaveBeenCalledWith(1, 10, filters);
        done();
      },
      error: () => {
        fail('Expected paginated response');
        done();
      }
    });
  });

  it('should return product by ID', (done) => {
    mockProductAPIService.getProductById.and.returnValue(of(mockProduct));

    productService.getProductById('1').subscribe({
      next: (res) => {
        expect(res).toEqual(mockProduct);
        expect(mockProductAPIService.getProductById).toHaveBeenCalledWith('1');
        done();
      },
      error: () => {
        fail('Expected product');
        done();
      }
    });
  });

  it('should handle error when getProductById fails', (done) => {
    const error = new Error('Product not found');
    mockProductAPIService.getProductById.and.returnValue(throwError(() => error));

    productService.getProductById('bad_id').subscribe({
      next: () => {
        fail('Expected error');
        done();
      },
      error: (err) => {
        expect(err).toEqual(error);
        expect(mockProductAPIService.getProductById).toHaveBeenCalledWith('bad_id');
        done();
      }
    });
  });

})