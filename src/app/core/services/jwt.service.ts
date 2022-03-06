import { Injectable } from '@angular/core';


const JWT_TOKEN_KEY: string = "jwt_token";

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  getToken(): string | null {
    return window.localStorage.getItem(JWT_TOKEN_KEY);
  }

  saveToken(token: String) {
    window.localStorage['jwtToken'] = token;
  }

  destroyToken() {
    window.localStorage.removeItem('jwtToken');
  }
}
