import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environments';
import { AuthStatus, User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl : string = environment.baseUrl;
  private http = inject(HttpClient);

  // constructor(private http : HttpClient) { }

  private _currentUser = signal<User | null>(null)
  private _authStatus = signal<AuthStatus>(AuthStatus.checking)

  login(emai:string, password:string): Observable<boolean>{
    return of(true)
  }
}
