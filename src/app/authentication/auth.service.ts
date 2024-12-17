import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http :HttpClient) { }
  url="http://localhost:8000"
  async login(username:string,password:string){
    let res = await fetch(this.url+"/",{method:"POST",body:JSON.stringify({username,password})})
    return res.status==200
  }
  async signup(username:string,password:string){
    let res = await fetch(this.url+"/create",{method:"POST",body:JSON.stringify({username,password})})
    return res.status==200
  }
}
