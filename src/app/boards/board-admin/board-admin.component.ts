import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { DynamicServiceService } from '../../_services/api.service';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';


@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  formDataList$!: Observable<any[]>;  
  formId!: number;
  groupedData: any = {}; // Initialize groupedData as an empty object
  formPlacesDisp: { [formName: string]: number } = {}; // Initialize formPlacesDisp object
  forms: any[] = [];
  content?: string;

  constructor(private userService: UserService, private formDataService: DynamicServiceService,private router: Router) { }

  ngOnInit(): void {
    this.formDataService.getForm().subscribe((data) => {
      this.forms = data.filter((form: any) => new Date(form.datelimite) > new Date());
    });
    this.userService.forAdmin().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {console.log(err)
        if (err.error) {
          this.content = JSON.parse(err.error).message;
        } else {
          this.content = "Error with status: " + err.status;
        }
      }
    });
    this.formDataService.getAllFormDataPipe().subscribe((response) => {
      const formId = response;
      if (formId !== undefined) {
        console.log('Form ID:', formId);
      } else {
        console.log('Form ID is undefined');
      }
    });
    this.formDataList$ = this.formDataService.getAllFormData();

    this.formDataList$.subscribe((formDataList: any[]) => {
      // Group form data by form name and then by user email
      this.groupedData = {}; // Clear and update groupedData
      console.log(formDataList);


      formDataList.forEach((formData) => {
        const formName = formData.field.form.formName;
        const userEmail = formData.user.email;
        this.calculateAvailablePlaces(formDataList);


        if (!this.groupedData[formName]) {
          this.groupedData[formName] = {};
        }

        if (!this.groupedData[formName][userEmail]) {
          this.groupedData[formName][userEmail] = [];
        }

        this.groupedData[formName][userEmail].push(formData);
      });
    });
  }
  calculateAvailablePlaces(formDataList: any[]): void {
    formDataList.forEach((formData) => {
      const formName = formData.field.form.formName;
      const placesDisp = formData.field.form.placesDisp;
      const formId = formData.field.form.formId;
      

      if (typeof placesDisp === 'number') {
        // Initialize or update the 'formPlacesDisp' object with placesDisp value for each form
        this.formPlacesDisp[formName] = placesDisp;
      }
    });
  }

  // Define a getter method to get keys of an object
  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
    
  // redirectToFormDetails(formName: any): void {
  //   // Redirect to the dynamic form page with the form ID as a parameter
  //   this.router.navigate(['/form-details', formName]);
  // }  

}
