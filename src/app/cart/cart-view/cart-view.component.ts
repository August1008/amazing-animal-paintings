import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from 'src/app/models/Product';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit {

  public cartItems: Product[] = [];
  public total: number = 0;
  constructor(private cartService: CartService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(data => {
      this.cartItems = data;
      this.getTotal();
    })
  }

  getTotal() {
    this.total = this.cartItems.reduce((calculator, item) => calculator + item.price, 0);
  }

  clearCart() {
    this.cartService.clearCart().subscribe(() => {
      this.snackBar.open('Your cart is cleared', 'Close', {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: 'custom-snackbar',
      });
    });
  }

  checkOut() {
    this.cartService.checkOut(this.cartItems).subscribe(() => {
      this.snackBar.open('Your order is placed successfully', 'Close', {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: 'custom-snackbar',
      });
    });
  }

}
