import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone:true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
  FormsModule,
  ],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string='';

  constructor(private service:AuthService,private router: Router){}
  async onSubmit(f: NgForm) {
    const { email, password } = f.value;
    console.log(email)
    if(f.valid){
      let login = await this.service.login(email,password)
      if(login){
        this.router.navigateByUrl('/Chess')
      }
    }else{
      this.errorMessage='Please fill in all the fields'
   }
  }
}
