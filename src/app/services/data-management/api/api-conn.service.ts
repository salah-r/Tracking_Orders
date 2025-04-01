import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiConnService {
  apiUrl = '';

  temp: string = '';

  apiurl = environment.APIURL;
  private errorMessage = 'Some thing wrong occured';
  Token: any;

  constructor(private http: HttpClient) {
    console.log(`starting Api`);
    this.temp = localStorage.getItem('auth_token')
    console.log(this.temp);

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
  addNewToken(endPoint: string, newData: any, newToken: any) {
    return this.http
      .post(
        `${this.apiurl}/${endPoint}`,
        newData,
        {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Accept: '*/*',
            Authorization: 'Bearer ' + newToken,
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


