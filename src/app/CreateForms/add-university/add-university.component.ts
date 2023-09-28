import { Component, OnInit } from '@angular/core';
import { DynamicServiceService } from 'src/app/_services/api.service';

@Component({
  selector: 'app-add-university',
  templateUrl: './add-university.component.html',
  styleUrls: ['./add-university.component.css']
})
export class AddUniversityComponent implements OnInit {
  universities: any[] = [];
  university = {
    name: '',
    location: ''
  };

  constructor(private universityService: DynamicServiceService){

  }
  ngOnInit(): void {
    this.getUniversityList();
  }
  getUniversityList() {
    this.universityService.getUniversities().subscribe(
      (response) => {
        this.universities = response;
        // Handle success here
      },
      (error) => {
        console.error('Error fetching universities:', error);
        // Handle error here
      }
    );
    
  }
  addUniversity(university: any) {
    this.universityService.addUniversity(university).subscribe(
      (response) => {
        console.log('University added successfully:', response);
        // Handle success here
      },
      (error) => {
        console.error('Error adding university:', error);
        // Handle error here
      }
    );
  }
  onSubmit() {
    this.universityService.addUniversity(this.university).subscribe(
      (response) => {
        console.log('University created successfully:', response);
        // Reset the form after successful submission
        this.university = { name: '', location: '' };
      },
      (error) => {
        console.error('Error creating university:', error);
      }
    );
  }

}
