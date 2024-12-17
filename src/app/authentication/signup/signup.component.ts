import { Component } from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone:true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [
  FormsModule
  ],
})
export class SignupComponent {
email: string = '';
  password: string = '';
  errorMessage: string='';
  constructor(private service:AuthService,private router: Router){}
  async onSubmit(f: NgForm) {
    const { email, password,cpassword} = f.value;
    if(f.valid){
      if(password==cpassword){
      let signup = await this.service.signup(email,password)
      if(signup){
        this.router.navigateByUrl('/Chess')
      }
    }
    else{
       this.errorMessage='try again'
    }
    }else{
      this.errorMessage='Please fill in all the fields'
   }
    
  }
}
