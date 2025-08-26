import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-page-admin',
  templateUrl: './side-page-admin.component.html',
  styleUrls: ['./side-page-admin.component.css']
})
export class SidePageAdminComponent implements OnInit {
  showAdminItems = false;

  ngOnInit(): void {
    const userStr = localStorage.getItem('User');
    if (userStr) {
      const user = JSON.parse(userStr);
      const roles: string[] = user.roles || [];
      this.showAdminItems = roles.includes('SUPER_ADMIN') || roles.includes('UNIVERSITY');
    }
  }
}
