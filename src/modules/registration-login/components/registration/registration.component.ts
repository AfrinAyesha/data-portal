import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  cards = [
    {
      text: 'Agent Registration',
      url: './assets/svg/agent_register.svg',
      type: 'agent',
    },
    {
      text: 'Customer Registration',
      url: './assets/svg/customer_register.svg',
      type: 'customer',
    },
  ];

  isCardChosen = false;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.subscribe((data) => {
      if (data instanceof NavigationEnd) {
        if (data.url === '/auth/register') {
          this.isCardChosen = false;
        } else {
          this.isCardChosen = true;
        }
      }
    });
  }

  ngOnInit(): void {
    console.log('im here');
  }
  chooseType(type) {
    this.isCardChosen = true;
    this.router.navigate(['./', type], { relativeTo: this.activatedRoute });
    console.log('type', type);
  }
}
