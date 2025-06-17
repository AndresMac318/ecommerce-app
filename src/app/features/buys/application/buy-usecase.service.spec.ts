import { TestBed } from "@angular/core/testing";
import { IBuyAPIService } from "../infrastructure/buysAPI.interface";
import { BuyUsecaseService } from "./buy-usecase.service";
import { HTTP_BUY_SERVICE } from "../infrastructure/providers/buyAPI.provider";
import { of, throwError } from "rxjs";
import { BuyDomain } from "../domain/BuyDomain.model";

describe('[Buy Feature] buy-usecase', () => {
  
  let buyService: BuyUsecaseService;
  let mockBuyAPIService: jasmine.SpyObj<IBuyAPIService>;

  const mockSale: BuyDomain = {
    id: "1s",
    salesProducts: [
      {
        id: "1p",
        price: 100,
        name: "product name test",
        imageURL: "productImageUrl",
        quantity: 2,
        sale: true,
        sale_price: 90
      }
    ],
    idUser: "1c",
    VAT19: 17.1,
    subtotalSale: 72.9,
    amountSale: 90,
    paidType: "TRANSFER",
    dateSale: "dateSaleTest",
    state: "SUCCESS"
  }

  beforeEach(() => {
    mockBuyAPIService = jasmine.createSpyObj<IBuyAPIService>(
      'IBuyAPIService', 
      ['getBuysByClient', 'getBuyById', 'registerBuy']
    );

    TestBed.configureTestingModule({
      providers: [ 
        BuyUsecaseService,
        {
          provide: HTTP_BUY_SERVICE,
          useValue: mockBuyAPIService
        } 
      ],
    });

    buyService = TestBed.inject(BuyUsecaseService);
  });

  it("should return sales when getBuysByClient is successful", (done) => {
  
    const clientId = '1c';
    
    mockBuyAPIService.getBuysByClient.and.returnValue(of([mockSale]));

    buyService.getBuysByClient(clientId).subscribe({
      next: (res) => {
        expect(res.length).toBe(1);
        expect(res[0]).toEqual(mockSale);
        expect(mockBuyAPIService.getBuysByClient).toHaveBeenCalledWith(clientId);
        done();
      },
      error: () => {
        fail('Expected sales, but go an error');
        done();
      }
    });
  });

  it('should return error when getBuysByClient fails', (done) => {
    const error = new Error('Client not found');
    mockBuyAPIService.getBuysByClient.and.returnValue(throwError(() => error));

    buyService.getBuysByClient('invalid_id').subscribe({
      next: () => {
        fail('Expected error, but got sales');
        done();
      },
      error: (err) => {
        expect(err).toEqual(error);
        expect(mockBuyAPIService.getBuysByClient).toHaveBeenCalledWith('invalid_id');
        done();
      }
    });
  });

  it('should return a sale when getBuyById is successful', (done) => {
    const saleId = '1s';
    mockBuyAPIService.getBuyById.and.returnValue(of(mockSale));

    buyService.getBuyById(saleId).subscribe({
      next: (res) => {
        expect(res).toEqual(mockSale);
        expect(mockBuyAPIService.getBuyById).toHaveBeenCalledWith(saleId);
        done();
      },
      error: () => {
        fail('Expected sale, but got error');
        done();
      }
    });
  });

  it('should return error when getBuyById fails', (done) => {
    const error = new Error('Sale not found');
    mockBuyAPIService.getBuyById.and.returnValue(throwError(() => error));

    buyService.getBuyById('non-existent-id').subscribe({
      next: () => {
        fail('Expected error, but got sale');
        done();
      },
      error: (err) => {
        expect(err).toEqual(error);
        expect(mockBuyAPIService.getBuyById).toHaveBeenCalledWith('non-existent-id');
        done();
      }
    });
  });

  it('should return a sale when registerBuy is successful', (done) => {
    mockBuyAPIService.registerBuy.and.returnValue(of(mockSale));

    buyService.registerBuy(mockSale).subscribe({
      next: (res) => {
        expect(res).toEqual(mockSale);
        expect(mockBuyAPIService.registerBuy).toHaveBeenCalledWith(mockSale);
        done();
      },
      error: () => {
        fail('Expected sale, but got error');
        done();
      }
    });
  });

  it('should return error when registerBuy fails', (done) => {
    const error = new Error('Registration failed');
    mockBuyAPIService.registerBuy.and.returnValue(throwError(() => error));

    buyService.registerBuy(mockSale).subscribe({
      next: () => {
        fail('Expected error, but got sale');
        done();
      },
      error: (err) => {
        expect(err).toEqual(error);
        expect(mockBuyAPIService.registerBuy).toHaveBeenCalledWith(mockSale);
        done();
      }
    });
  });

});