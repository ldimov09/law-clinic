import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) { }

   // url = 'http://localhost/law_clinic/api/' //When developing and testing
    url = 'https://www.digitalplant.eu/law_clinic/api/' //When uploading on digitalplant
    //url = 'https://www.pk.uni-ruse.bg/law_clinic/api/' // PROD

    get user() { //Getter for easy acces to the user (the decoded token)
        let token = localStorage.getItem('token');
        if (!token) return null;
        const helper = new JwtHelperService();
        const user = helper.decodeToken(token);

        return user.data;
    }

    isLoggedIn() {
        let token = localStorage.getItem('token');

        return !!token; // Return true if there is a token and false otherwise with this cool !! operator
    }
    logout() {
        localStorage.clear();
    }

    loginUser(payload: { email: string; password: string }) {
        const randomApiId = Math.random(); //Generates a random number and puts it at the end of the url to make every request unique and prevent cashing
        const result = this.http.post(this.url + "auth/login.php?apiId=" + randomApiId, payload);
        return result;
    }

    createUser(payload: { email: string; password: string, fak_no: number, specialty: string, names: string }) {
        const randomApiId = Math.random();
        const result = this.http.post(this.url + "auth/register.php?apiId=" + randomApiId, payload);
        return result;
    }

    getAllUsers() {
        const randomApiId = Math.random();
        const result = this.http.get(this.url + "auth/all.php?apiId=" + randomApiId);
        return result;
    }

    changeStatus(id: number, status: number) {
        const randomApiId = Math.random();
        const result = this.http.post(this.url + "auth/approve.php?apiId=" + randomApiId, { id: id, approved: status });
        return result;
    }

    getOccupiedUsers() {
        const randomApiId = Math.random();
        const result = this.http.get(this.url + "auth/getnumberfreestudnts.php?apiId=" + randomApiId);
        return result;
    }

}
