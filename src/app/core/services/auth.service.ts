import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   BASE_URL = 'https://wotiriyeapis.onrender.com/api/v1';

  #http = inject(HttpClient);


  login(email : string, password : string){

  }


  signup(){}


  profile(){}

}
