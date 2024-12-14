import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone:true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
  FormsModule
  ],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  onSubmit(f: NgForm) {
    const { email, password } = f.value;
    console.log(email)
    //n3yto ll service
  }
}
