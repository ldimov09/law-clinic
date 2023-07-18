import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DelmeService {

  constructor(private http: HttpClient) { }

  //url = 'http://loclahost/law_clinic/' //When developing and testing
  url = 'https://www.digitalplant.eu/law_clinic/api/' //When uploading on digitalplant
  //url = 'https://www.pk.uni-ruse.bg/law_clinic/api/' // PROD


  maketestreq() {
    console.log('OK till here');
    return this.http.get<any>(this.url + 'test/test.php');
  }
}
