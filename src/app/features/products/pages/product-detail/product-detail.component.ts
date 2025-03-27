import { ChangeDetectionStrategy, Component, inject, Input, input, OnInit, signal } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { ProductsService } from '../../services/products.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  imports: [ JsonPipe ],
  template: `
    <p>product-detail works!</p>
    <pre>
      {{ productDetail() | json }}
    </pre>
  `,
  styleUrl: './product-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent implements OnInit {
  
  @Input('id') productId!: string;
  productDetail = signal<Product | null>(null);
  
  productSvc = inject(ProductsService);
  
  
  ngOnInit(): void {
    this.productSvc.getProductById(this.productId).subscribe(
      res => {
        this.productDetail.set(res);
      }
    )
  }


}
