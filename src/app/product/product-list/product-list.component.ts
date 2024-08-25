import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from 'src/app/models/Product';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from 'src/app/cart/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

  public products: Product[] = [];
  public filteredProducts: Product[] = [];
  public sortValue: string = '';

  constructor(private productService: ProductService,
    private cartService: CartService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(value => {
      this.products = value;
      this.filteredProducts = value;
    });
  }

  addToCart(product: Product): void{
    this.cartService.addToCart(product).subscribe(() => {
      this.snackBar.open('Product added to cart', 'Close', {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: 'custom-snackbar',
      });
    });

  }


  applyFilter(event: Event): void {
    let searchTerm = (event.target as HTMLInputElement).value;
    searchTerm = searchTerm.toLowerCase();
    this.filteredProducts = this.products.filter((product) => product.name.toLowerCase().includes(searchTerm));

    this.sortProducts(this.sortValue);
  }

  sortProducts(option: string): void{
    this.sortValue = option;

    if (this.sortValue === 'priceLowToHigh') {
      this.filteredProducts.sort((a, b) => a.price - b.price);
    }
    else if (this.sortValue === 'priceHighToLow'){
      this.filteredProducts.sort((a, b) => b.price - a.price);
    }

  }

}
