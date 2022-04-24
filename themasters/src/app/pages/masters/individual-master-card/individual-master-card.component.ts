import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-individual-master-card',
  templateUrl: './individual-master-card.component.html',
  styleUrls: ['./individual-master-card.component.scss'],
})
export class IndividualMasterCardComponent implements OnInit {
  @Input() master;
  constructor(private router: Router) {}

  ngOnInit() {}
  capitalizeString(inputString) {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  }

  openMasterProfile(profile) {
    this.router.navigate(['tabs/details', { id: profile.id }]);
  }
}
