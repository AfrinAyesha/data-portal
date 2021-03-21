import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class ModuleConfig {
  public baseURL: string;
  public spaURL: string;
}

@Injectable()
export class ApiService {
  baseURL: string;
  constructor(private httpClient: HttpClient, options: ModuleConfig) {
    this.baseURL = options.baseURL;
  }

  // tslint:disable-next-line: typedef
  public registerAgent(data) {
    return this.httpClient.post(`${this.baseURL}/register/agent`, data);
  }
}
