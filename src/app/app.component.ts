import { Component } from '@angular/core';
import { DelmeService } from './delme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'law-clinic';

  constructor(private service: DelmeService) { 
    this.service = service;
  }


}
