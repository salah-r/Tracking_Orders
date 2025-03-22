import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiConnService {
  apiUrl = 'https://strapi-126631-0.cloudclusters.net/api/';
  // temp: string = "2f704d2b57e42143483d12b7b58822b57770d64da3e8c06a41414c638489c1832b51cd5acfffa6d42dca8cd2fddff4dc2668ca8ae830bb209c605743990ad27cfc53bfc750b73a2db7701c7eb941b2990a8d2ec6f4a86cabfcea245a267e83f56573910922c9d9a6dbeb109dacf3c4e880aacd77d857ad3db09753af83511503"
  temp: string = environment.Token;

  apiurl = environment.APIURL;
  private errorMessage = 'Some thing wrong occured';
  Token: any;

  constructor(private http: HttpClient) {
    console.log(`starting Api`);
    //this.Token = environment.Token;
    // console.log(this.temp);
  }

  getData(endPoint: string): Observable<any> {
    return this.http
      .get<any>(
        `${this.apiurl}/${endPoint}`,
        {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Accept: '*/*',
            Authorization: 'Bearer ' + this.temp,
          },
        }
        // httpOptions
      )
      .pipe(
        retry(2),
        catchError((err) => {
          console.error(err);
          return throwError(() => new Error(this.errorMessage));
        })
      );
  }

  getDataById(endPoint: string, id: number) {
    return this.http
      .get(`${this.apiurl}/${endPoint}/${id}`, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Accept: '*/*',
          Authorization: 'Bearer ' + this.temp,
        },
      })
      .pipe(
        retry(2),
        catchError((err) => {
          console.error(err);
          return throwError(() => new Error(this.errorMessage));
        })
      );
  }

  getDataByIdPopulated(endPoint: string, id: number) {
    return this.http
      .get(`${this.apiurl}/${endPoint}/${id}` + '?populate=*', {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Accept: '*/*',
          Authorization: 'Bearer ' + this.temp,
        },
      })
      .pipe(
        retry(2),
        catchError((err) => {
          console.error(err);
          return throwError(() => new Error(this.errorMessage));
        })
      );
  }

  addData(endPoint: string, newData: any) {
    return this.http
      .post(
        // `${this.apiurl}/${endPoint}?consumer_key=${this.consumer_key}&consumer_secret=${this.consumer_secret}`,
        // JSON.stringify(newData)
        `${this.apiurl}/${endPoint}`,
        newData,
        {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Accept: '*/*',
            Authorization: 'Bearer ' + this.temp,
          },
        }
      )
      .pipe(
        // retry(2),
        catchError((err) => {
          console.error(err.error.code);
          //var code = err.error.code;
          return throwError(() => new Error(err.error.code));
        })
      );
  }

  updateData(endPoint: string, id: number, updatedData: any) {
    return this.http
      .put(`${this.apiurl}/${endPoint}/${id}`, updatedData, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Accept: '*/*',
          Authorization: 'Bearer ' + this.temp,
        },
      })
      .pipe(
        retry(2),
        catchError((err) => {
          console.error(err);
          return throwError(() => new Error(this.errorMessage));
        })
      );
  }

  deleteData(endPoint: string, id: number) {
    return this.http
      .delete(`${this.apiurl}/${endPoint}/${id}`, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Accept: '*/*',
          Authorization: 'Bearer ' + this.temp,
        },
      })
      .pipe(
        retry(2),
        catchError((err) => {
          console.error(err);
          return throwError(() => new Error(this.errorMessage));
        })
      );
  }

  getUserDetails(email: string): Observable<any> {
    return this.http
      .get<any>(
        `${this.apiurl}/customers?email=${email}&consumer_key={}&consumer_secret={}`
      )
      .pipe(
        retry(2),
        catchError((err) => {
          console.error('Error fetching user details:', err);
          return throwError(() => new Error(this.errorMessage));
        })
      );
  }

  LoginAddData(newData: any) {
    return this.http
      .post(
        // `${this.apiurl}/${endPoint}?consumer_key=${this.consumer_key}&consumer_secret=${this.consumer_secret}`,
        // JSON.stringify(newData)
        `{loginAPI}`,
        newData
      )
      .pipe(
        retry(2),
        catchError((err) => {
          console.error(err.error.code);
          //var code = err.error.code;
          return throwError(() => new Error(err.error.code));
        })
      );
  }

  updateUserData(endPoint: string, id: number, updatedData: object) {
    return this.http
      .put(
        `${this.apiurl}/${endPoint}/${id}/methods?consumer_key={}&consumer_secret={}`,
        JSON.stringify(updatedData)
      )
      .pipe(
        retry(2),
        catchError((err) => {
          console.error(err);
          return throwError(() => new Error(this.errorMessage));
        })
      );
  }

  uploadFile(endPoint: string, fileData: FormData): Observable<any> {
    return this.http
      .post(`${this.apiurl}/${endPoint}`, fileData, {
        headers: {
          Authorization: 'Bearer ' + this.temp,
        },
      })
      .pipe(
        catchError((err) => {
          console.error(err.error.message);
          return throwError(() => new Error(err.error.message));
        })
      );
  }
}
