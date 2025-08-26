import { Component, OnInit } from '@angular/core';
import { FormfieldService } from '../_services/formfield.service';
import { FormFieldDTO } from '../interfaces/FormFieldDTO';

@Component({
  selector: 'app-form-field-manager',
  templateUrl: './form-field-manager.component.html'
})
export class FormFieldManagerComponent implements OnInit {

  formId: number = 1; // you can pass this dynamically from route/parent component

  newField: FormFieldDTO = {
    formId: this.formId,
    fieldName: '',
    fieldLabel: '',
    fieldType: 'text',
    configuration: '',
    coefficient: 0
  };

  fieldTypes = ['text', 'number', 'date', 'select', 'radio'];

  fields: FormFieldDTO[] = [];

  constructor(private formFieldService: FormfieldService) {}

  ngOnInit(): void {
    this.loadFields();
  }

  loadFields() {
    this.formFieldService.getFieldsByForm(this.formId).subscribe(data => {
      this.fields = data;
    });
  }

  addField() {
    this.formFieldService.createFormField(this.newField).subscribe(res => {
      this.fields.push(res);
      this.resetForm();
    });
  }

  deleteField(fieldId?: number) {
    if (!fieldId) return;
    this.formFieldService.deleteFormField(fieldId).subscribe(() => {
      this.fields = this.fields.filter(f => f.fieldId !== fieldId);
    });
  }

  resetForm() {
    this.newField = {
      formId: this.formId,
      fieldName: '',
      fieldLabel: '',
      fieldType: 'text',
      configuration: '',
      coefficient: 0
    };
  }
}
