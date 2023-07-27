import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CaseService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost/law_clinic/api/' //When developing and testing
  //url = 'https://www.digitalplant.eu/law_clinic/api/' //When uploading on digitalplant
  //url = 'https://www.pk.uni-ruse.bg/law_clinic/api/' ???? // PROD


  createCase(payload: { email: string; description: string , title: string, names: string }) {
    const randomApiId = Math.random();
    const result = this.http.post(this.url + "cases/create_case_guest.php?apiId=" + randomApiId, payload);
    return result;
  }

  getAllCases() {
    const randomApiId = Math.random();
    const result = this.http.get(this.url + "cases/all.php?apiId=" + randomApiId);
    return result;
  }

  changeStatus(id: number, status: string, specialty?: string | number) {
    const randomApiId = Math.random();
    const result = this.http.post(this.url + "cases/changeStatus.php?apiId=" + randomApiId, {id, status, specialty});
    return result;
  }

  assignUsersToCase(caseId: number, userIds: string){
    console.log("Assigning users to case");
    const randomApiId = Math.random();
    const result = this.http.post(this.url + "cases/assignUsers.php?apiId=" + randomApiId, {caseId, userIds});
    return result;
  }

}
