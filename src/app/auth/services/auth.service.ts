import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { AuthStatus, LoginResponse, User } from '../interfaces';
import { CheckTokenResponse } from '../interfaces/checkToken.response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl : string = environment.baseUrl;
  private http = inject(HttpClient);

  // constructor(private http : HttpClient) { }

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  //! Al mundo exterior -----------------------------------------------

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  private setAuthentication(user: User, token: string) {
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('token', token);
    console.log({user, token});

    return true;
  };


  public login(email:string, password:string): Observable<boolean>{
    const url = `${this.baseUrl}/auth/loging`;
    const body = {email, password}

    return this.http.post<LoginResponse>(url, body)
    .pipe(
      map(({user, token}) => this.setAuthentication(user, token)),
      catchError(err => throwError(() => err.error.message))
      );
  }


  public checkAuthStatus() : Observable<boolean>{
    const url = `${this.baseUrl}/auth/check-token`;
    const token = localStorage.getItem('token');

    if(!token){
      return of(false)
    };

    const headers = new HttpHeaders().set('Authorization', `Bearer ${ token }`);

    return this.http.get<CheckTokenResponse>(url, {headers})
    .pipe(
      map( ({user, token})  => this.setAuthentication( user, token )),
      catchError(() => {this._authStatus.set(AuthStatus.notAuthenticated);
      return of(false);
      })
    );
  }

}
