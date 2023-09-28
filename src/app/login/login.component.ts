import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  constructor(private storageService:StorageService, private userService: UserService, private userAuthService :UserAuthService,private router: Router,private http: HttpClient){
    
  }
  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
  }
  login(loginForm: NgForm): void{
    if (true){
    this.userService.login(loginForm.value).subscribe(
      (response:any)=>{
         
        this.storageService.saveUser(response);
        this.userAuthService.setRoles(response.roles);
        console.log(response);  
        this.userAuthService.setToken(response.token);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
          this.reloadPage();
        const role = response.roles[0];
        console.log(role);
        //const role = response.user.role[0].roleName;
        this.router.navigate(['/home']);
        // if (role === 'ADMIN') {
        //   this.router.navigate(['/admin']);
        // } else {
        //   this.router.navigate(['/user']);
        // }
      },
      (error)=>{
        console.log(error);
      }
    );}
    else alert('Please complete the reCAPTCHA');
  }
  reloadPage(): void {
    window.location.reload();
  }

}
