import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { DynamicServiceService } from '../_services/api.service';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../_services/storage.service';
import { switchMap } from 'rxjs/operators';
import { FormDataDTO } from '../FormDataDTO';


@Component({
  selector: 'app-dynamicform',
  templateUrl: './dynamicform.component.html',
  styleUrls: ['./dynamicform.component.css']
})
export class DynamicformComponent implements OnInit{ 
  form: FormGroup;
  formFields: any[]=[];
  currentUser: any;
  
  

constructor(private formBuilder: FormBuilder, private formModelService: DynamicServiceService,  private route: ActivatedRoute, private storageService: StorageService ) {
  this.form = this.formBuilder.group({});
}

ngOnInit() {
  this.currentUser = this.storageService.getUser();

  const formId = this.route.snapshot.params['formId'];
 
  
  this.formModelService.getFormFieldsByFormId(formId).subscribe((formModel) => {
    if (formModel ) {
  
      this.formFields = formModel;
      this.form = this.formBuilder.group({});
      this.formFields.forEach((field) => {
        this.form.addControl(field.fieldName, new FormControl(''));
        console.log(field.FieldName);
      });
      
      
    }
   
  });

this.getForms();
}

onSubmit() {
  this.currentUser = this.storageService.getUser();
  const formIdString = this.route.snapshot.params['formId'];
const formId = parseInt(formIdString, 10);
  console.log(this.currentUser.id);

  if (this.form.valid) {
    this.formModelService.getFormFieldsByFormId(formId).pipe(
      switchMap((formModel) => {
        this.formFields = formModel;
        const formData: FormDataDTO[] = [];

        // Iterate over form fields to populate formData
        this.formFields.forEach((field) => {
          const formControlValue = this.form.get(field.fieldName)?.value;

          const formDataItem: FormDataDTO = {
            //formId: formId,
            userId: this.currentUser.id,
            formFieldId: field.fieldId,
            value: formControlValue,
            
          };

          formData.push(formDataItem);
        });

        return this.formModelService.addFormData(formData);
      })
    ).subscribe(
      (response) => {
        // Handle success response from the API, e.g., show a success message.
        console.log('Form data added successfully:', response);
      },
      (error) => {
        // Handle error response from the API, e.g., display an error message.
        console.error('Error adding form data:', error);
      }
    );
  }
}
getForms(){
this.formModelService.getForm().subscribe((forms)=>{
  console.log(forms);
  
});}
}
