import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DynamicServiceService } from '../_services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-details',
  templateUrl: './form-details.component.html',
  styleUrls: ['./form-details.component.css'],
})
export class FormDetailsComponent implements OnInit {
  formName = this.route.snapshot.params['formName'];

  moyennes: any[] = [];
  formId: number = 0;

  constructor(
    private moyenneService: DynamicServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const formName = this.route.snapshot.params['formName'];
    this.loadMoyennes();
  }
  onSendEmailsButtonClick() {
    const formName = this.route.snapshot.params['formName'];
    this.getFormIdAndSendEmails(formName);
  }

  getFormIdAndSendEmails(formName: string) {
    this.moyenneService.getFormIdByName(formName).subscribe(
      (formIdn) => {
        this.formId = formIdn;
        console.log('Form ID:', formIdn);

        // Now that we have the formId, we can call sendEmails
        this.sendEmails(this.formId);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  sendEmails(formId: number) {
    this.moyenneService.sendEmails(formId).subscribe(
      () => {
        console.log('sending');
        // Email sent successfully, show a success message
      },
      (error) => {
        // Handle any errors from the API call here
        console.error('Error sending emails', error);
      }
    );
  }
  loadMoyennes1() {
    this.moyenneService.getAllMoyennesWithUserAndForm().subscribe(
      (data) => {
        // Populate the moyennes array
        this.moyennes = data;

        // Sort the moyennes array by moyenne in descending order
        this.moyennes.sort((a, b) => b.moyenne - a.moyenne);
      },
      (error) => {
        console.error('Error fetching moyennes:', error);
      }
    );
  } //getMoyennesByFormName
  loadMoyennes() {
    const formName = this.route.snapshot.params['formName'];

    this.moyenneService.getMoyennesByFormName(formName).subscribe(
      (data) => {
        // Populate the moyennes array
        this.moyennes = data;

        // Sort the moyennes array by moyenne in descending order
        this.moyennes.sort((a, b) => b.moyenne - a.moyenne);
      },
      (error) => {
        console.error('Error fetching moyennes:', error);
      }
    );
  } //
}
