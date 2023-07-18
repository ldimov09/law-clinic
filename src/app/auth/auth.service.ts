import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost/law_clinic/api/' //When developing and testing
  //url = 'https://www.digitalplant.eu/law_clinic/api/' //When uploading on digitalplant
  //url = 'https://www.pk.uni-ruse.bg/law_clinic/api/' // PROD

  get user() {
    
    let token = localStorage.getItem('token');
    if (!token) return null;

    const helper = new JwtHelperService();
    const user = helper.decodeToken(token);


    return user.data;
  }

  loginUser(payload: { email: string; password: string }) {
    const result = this.http.post(this.url + "auth/login.php", payload);
    console.log(result);
    return result;
  }

}