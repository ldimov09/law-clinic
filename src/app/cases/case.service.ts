import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CaseService {

  constructor(private http: HttpClient) { }

  //url = 'http://localhost/law_clinic/api/' //When developing and testing
  //url = 'https://www.digitalplant.eu/law_clinic/api/' //When uploading on digitalplant
  url = 'https://pk.uni-ruse.bg/backend/law_clinic/api/' // PROD


  createCase(payload: FormData) {
    const randomApiId = Math.random();
    return this.http.post<any>(this.url + "cases/create_case_guest.php?apiId=" + randomApiId, payload);
  }

  getAllCases() {
    const randomApiId = Math.random();
    const result = this.http.get(this.url + "cases/all.php?apiId=" + randomApiId);
    return result;
  }

  changeStatus(id: number, status: string, specialty?: string | number) {
    const randomApiId = Math.random();
    const result = this.http.post(this.url + "cases/changeStatus.php?apiId=" + randomApiId, { id, status, specialty });
    return result;
  }

  assignUsersToCase(caseId: number, userIds: string) {
    const randomApiId = Math.random();
    const result = this.http.post(this.url + "cases/assignUsers.php?apiId=" + randomApiId, { caseId, userIds });
    return result;
  }

  getOneCase(id: string) {
    const randomApiId = Math.random();
    const result = this.http.get<any>(this.url + 'cases/getone.php?id=' + id + '&apiId=' + randomApiId);
    return result;
  }

  getCasesAssignedToUser(userId: string) {
    const randomApiId = Math.random();
    const result = this.http.get(this.url + 'cases/getcasesuser.php?id=' + userId + '&apiId=' + randomApiId, { responseType: 'text' });
    return result;
  }

}
