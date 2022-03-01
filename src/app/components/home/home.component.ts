import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private service: ApiService) {}

  ngOnInit(): void {
    this.service.getAgent(2).subscribe((data) => {
      console.log('data', data);
    });
  }
}
