import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export class ModuleConfig {
  public baseURL: string;
  public spaURL: string;
  public refreshPath: string;
}

@Injectable()
export class ApiService {
  baseURL: string;
  refreshPath: string;
  constructor(private httpClient: HttpClient, private options: ModuleConfig) {
    console.log('options', this.options);
    this.baseURL = this.options.baseURL;
    this.refreshPath = this.options.refreshPath;
  }

  public refreshToken() {
    window.sessionStorage.removeItem('access_token');
    console.log('refresh', `${environment.baseURL}${environment.refreshPath}`);
    return this.httpClient.get(`${environment.baseURL}${environment.refreshPath}`);
  }
}
