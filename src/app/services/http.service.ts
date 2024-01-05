import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient
  ) { }

   tokenX = localStorage.getItem('accessT');
  // console.log(tokenx)
 
  // key: 'fdcdb195-6553-4890-844c-ee576b7ea715',
 
  private getHeaderx(): HttpHeaders {

    const authToken = 'dfaae40b-6457-4c77-932c-6b0ac6733e8a';
    return new HttpHeaders({ "Access-Control-Allow-Origin" : "https://dropin.vpay.africa/dropin/v1/initialise.js",'key': `${authToken}` });
       
  }

  gext(serviceName: string, data: any){

    const headers = this.getHeaderx();
    const options = { headers : headers, withCredintials: false};
    const url = environment.endpointUrl + serviceName;

    return this.http.get(url, options)

  }


  post(serviceName: string, data: any){

    const headers = new HttpHeaders()
    const options = { headers : headers, withCredintials: false};
    const url = environment.apiUrl + serviceName;

    return this.http.post(url, JSON.stringify(data), options)

  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessT');
    //console.log(token)
     //const tokenx = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoidmVsdXgyMjQ1YThkYWIyOTA1ZTYwMTllMjllMGQxNDgxOGE4NyIsInRhZ05hbWUiOiJMb25lZSIsImFwcFRva2VuIjoidG9rZW43ZmMxMDE0NjA4YTlkNjE3NzgwZTA5Njg0NWRkOWE3MzVjZGI4NDMwYmVkNDE3YzA0OWIxNzRlMGRkMTcwNjhlN2JkZTQwZTE5MzVhOTg0ZjFkNTcxZDY5ZWFjNmZiODkxYTVhNjUzYWFmOGYyNmUwZDQ2ZjA2OWM2OTcyZTFmOWFkYzAwNzVjNmFkMmNlNjdjZGRiYTAxZTQzZTE2YTJiIn0.g5DylVYDkd2Q18wWR4x8l-jcMtm039-k-CVhhC41jJY"
    //return new HttpHeaders({ 'Authorization': JSON.parse(token) });
    return new HttpHeaders({ 'Authorization': `Bearer ${JSON.parse(token)}` });
    //return new HttpHeaders({ 'Authorization': tokenx });
    
    
  }

  postr(serviceName: string, data: any){

    const headers = this.getHeaders();
    const options = { headers : headers, withCredintials: false};
    const url = environment.apiUrl + serviceName;

    return this.http.post(url, JSON.stringify(data), options)

  }

  posti(serviceName: string, data: any){

    const headers = this.getHeaders();
    const options = { headers : headers, withCredintials: false};
    const url = environment.apiUrl + serviceName;

    return this.http.post(url, data, options)

  }

  postx(serviceName: string){

    const headers = this.getHeaders();
    console.log(headers)
    const options = { headers : headers, withCredintials: true};
    const url = environment.apiUrl + serviceName;

    return this.http.get(url, options)

  }
  getr(serviceName: string) {
    // Add the token to the header
     const token = localStorage.getItem('accessT');
   const headers = this.getHeaders();
    const options = { headers : headers, withCredintials: false};
    const url = environment.apiUrl + serviceName;
    const urli = environment.apiUrl + serviceName;
   // console.log(url);
    // Make the HTTP request to the backend 
   

    return this.http.get(urli, options)
  }

  get(serviceName: string, data: any) {
    // Add the token to the header

   const headers = this.getHeaders();
    const options = { headers : headers, withCredintials: true};
    const url = environment.apiUrl + serviceName;
    const urli = environment.apiUrl + serviceName;
    console.log(url);
    // Make the HTTP request to the backend 
   

    return this.http.get(urli, options)
  }
  


  // get(serviceName: string, data: any) {
  //   // Add the token to the header
  //  // const headers = { 'Authorization': `${this.tokenX}` };
  //   const headers = new HttpHeaders().set('Authorization', ` ${this.tokenX}`);
  
  //   const options = { headers : headers, withCredintials: true};
  //   const url = environment.apiUrl + serviceName;
    
  //   // Make the HTTP request to the backend 
  //   // return this.http.get('https://example.com/users', { headers });

  //   return this.http.get(url, options)
  // }
  

  getx(serviceName: string, data: any){

    const headers = new HttpHeaders();
    const options = { headers : headers, withCredintials: false};
    const url = environment.apiUrl + serviceName;

    return this.http.get(url, options)

  }
}
