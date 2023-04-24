import {Component} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  name = "internshala training";
  husbandName = "Mark Zuckerberg";
  wifeName = "Priscilla Chan";

  people: any = [
    {
      'name': 'Mark Zuckerberg',
      'gender': 'male'
    },
    {
      'name': 'Priscilla Chan',
      'gender': 'female'
    }
  ]

  constructor() {
  }

}
