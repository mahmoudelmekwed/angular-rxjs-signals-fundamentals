import { Component, OnDestroy, OnInit, inject } from '@angular/core';

import { NgIf, NgFor, NgClass } from '@angular/common';
import { Product } from '../product';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductService } from '../product.service';
import { EMPTY, Subscription, catchError, tap } from 'rxjs';

@Component({
    selector: 'pm-product-list',
    templateUrl: './product-list.component.html',
    standalone: true,
  imports: [NgIf, NgFor, NgClass, ProductDetailComponent]
})
export class ProductListComponent implements OnInit , OnDestroy {
  // Just enough here for the template to compile
  pageTitle = 'Products';
  errorMessage = '';
  sub! : Subscription;
  private productservice = inject(ProductService);

  // Products
  products: Product[] = [];

  // Selected product id to highlight the entry
  selectedProductId: number = 0;

  onSelected(productId: number): void {
    this.selectedProductId = productId;
  }

  ngOnInit(): void {
      this.sub = this.productservice.getProducts().pipe(
        tap(()=> console.log('In component pipline')),
        catchError(err => 
          {
          this.errorMessage = err
          return EMPTY
          })
      ).subscribe(products => 
        {
          this.products = products
          console.log(this.products)
        }
      )
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe()
  }
}
