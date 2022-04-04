import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {
  constructor(private readonly httpClient: HttpClient) {}

  get(
    path: string,
    params?: Record<string, string | string[]>,
    options = new ApiOptions()
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get(options.url + path, {
          headers: options.headers,
          params: new HttpParams({ fromObject: params }),
        })
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err: HttpErrorResponse) => {
            console.log(err.error);
            reject(err);
          }
        );
    });
  }

  post(path: string, body: any, options = new ApiOptions()): Promise<any> {
    console.log(path);
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(options.url + path, body, { headers: options.headers })
        .subscribe(
          (res) => {
            console.log('resolved');
            resolve(res);
          },
          (err: HttpErrorResponse) => {
            console.log(err.error);
            reject(err);
          }
        );
    });
  }

  queryString(params?: object): string {
    let result = '';

    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value || value === false) {
          result += `${key}=${value}&`;
        }
      }
    }
    result = result.slice(0, -1);

    return result ? '?' + result : '';
  }
}

export class ApiOptions {
  public readonly url = 'http://localhost:3000';

  public readonly headers = new HttpHeaders({});
}
