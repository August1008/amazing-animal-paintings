import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = environment.apiUrl + "/products";

  constructor(private http: HttpClient,) {

  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }

}
