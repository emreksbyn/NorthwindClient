import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Product } from '../models/product';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl: string = "https://localhost:44303/api/Products/";

  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<ListResponseModel<Product>> {
    let newPath = this.apiUrl + "getall";
    return this.httpClient.get<ListResponseModel<Product>>(newPath);
  }

  getProductsByCategory(categoryId: number): Observable<ListResponseModel<Product>> {
    let newPath = this.apiUrl + "getlistbycategoryid?categoryId=" + categoryId;
    return this.httpClient.get<ListResponseModel<Product>>(newPath);
  }

  add(product: Product):Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "add", product);
  }
}
// ng g service product --skip-tests  --> terminalden testler olmadan servis olusturma