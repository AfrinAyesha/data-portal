import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
    this.baseURL = options.baseURL;
    this.refreshPath = options.refreshPath;
  }

  public refreshToken() {
    return this.httpClient.get(`${this.baseURL}/${this.refreshPath}`);
  }
}
