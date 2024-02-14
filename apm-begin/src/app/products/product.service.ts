import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'api/products';

  // create product service using http client service in the service with dependency injection constructor based or use inject function 

  // constructor( private http : HttpClient ){}
  private http = inject(HttpClient)

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.productsUrl)
    .pipe(
      tap (()=> console.log('in http pipeline'))     
      )
  }

  getProduct(id :number): Observable<Product> {
    const productUrl = this.productsUrl + '/' + id;
    return this.http.get<Product>(productUrl)
    .pipe(
      tap(()=> console.log('In http by id pipeline'))
    )
  }

}
