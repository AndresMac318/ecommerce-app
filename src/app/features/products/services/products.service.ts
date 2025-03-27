import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { OptionItem } from '../../../core/interfaces/optionItem.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private http = inject(HttpClient);
  private api_url = environment.API_URL_BASE;

  constructor() { }

  getProducts(): Observable<OptionItem[]>{
    return this.http.get<Product[]>(`${this.api_url}/products`).pipe(
      map(product => product.map(product => ({id: product.id, name: product.name}))),
      catchError(error => {
        return throwError(()=> new Error('Error loading products', error));
      })
    )
  }

  getProductById(idUser: string){
    return this.http.get<Product>(`${this.api_url}/products/${idUser}`);
  }
}
