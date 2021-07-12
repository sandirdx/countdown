import { Component, NgModule, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],
})
export class InputComponent implements OnInit {
  public launchDate: any;
  public name: any;
  reactiveForm: any;
  constructor(private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      launchName: new FormControl(),
      launchDate: new FormControl()
    });
  }

  launch() {
    localStorage.setItem("launchDetails", JSON.stringify(this.reactiveForm.value));
    this.router.navigate(['/home'], { relativeTo: this.route });  
  }
}
