import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Product } from './product';
import { ProductData } from './product-data';
import { HttpErrorService } from '../utilities/http-error.service';
import { ReviewService } from '../reviews/review.service';
import { Review } from '../reviews/review';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'api/products';

  // create product service using http client service in the service with dependency injection constructor based or use inject function 

  // constructor( private http : HttpClient ){}
  private http = inject(HttpClient);
  private errorservice = inject(HttpErrorService)
  private reviewervice = inject(ReviewService)

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.productsUrl)
    .pipe(
      tap (()=> console.log('in http pipeline')),
      catchError(err => this.handleError(err))     
      )
  }

  getProduct(id :number): Observable<Product> {
    const productUrl = this.productsUrl + '/' + id;
    return this.http.get<Product>(productUrl)
    .pipe(
      tap(()=> console.log('In http by id pipeline')),
      catchError(err => this.handleError(err)) 
    )
  }

  getProductWithReviews(product:Product): Observable<Product>{
    if (product.hasReviews){
      return this.http.get<Review[]>(this.reviewervice.getReviewUrl(product.id)).pipe(
        map(reviews => ({...product , reviews} as Product))
      )
    }else{
      return of(product);
    }
  }

  private handleError(err : HttpErrorResponse): Observable<never>{
    const formattedMessage = this.errorservice.formatError(err);
    throw formattedMessage;
  }
}
