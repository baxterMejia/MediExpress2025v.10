// core/auth.service.ts
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, catchError, delay } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from '../../enviroments/environment';
import { ThemeService } from './theme.service';

// Mock de usuarios válidos con roles y temas
const MOCK_USERS = [
  { username: 'usuario', password: '1234', email: 'usuario@mediexpress.com', role: 'usuario', theme: 'green', token: 'mock-token-usuario-12345' },
  { username: 'operador', password: '1234', email: 'operador@mediexpress.com', role: 'operador', theme: 'slate', token: 'mock-token-operador-67890' },
  { username: 'eps', password: '1234', email: 'eps@mediexpress.com', role: 'eps', theme: 'red', token: 'mock-token-eps-54321' }
];

// Mock de usuarios registrados (se van agregando)
const REGISTERED_USERS = [...MOCK_USERS];

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'token';
  private apiUrl = environment.apiBaseUrl + '/auth';
  private useMock = true; // Cambiar a false para usar el backend real

  isLoggedIn = signal(!!localStorage.getItem(this.tokenKey));

  constructor(private http: HttpClient, private router: Router, private themeService: ThemeService) {}

  login(username: string, password: string) {
    // Modo mock
    if (this.useMock) {
      const user = REGISTERED_USERS.find(
        u => u.username === username && u.password === password
      );

      if (user) {
        return of({ 
          token: user.token,
          user: {
            username: user.username,
            email: user.email,
            role: user.role
          }
        }).pipe(
          delay(500), // Simular delay de red
          tap(response => {
            localStorage.setItem(this.tokenKey, response.token);
            localStorage.setItem('userRole', user.role);
            this.themeService.setTheme(user.theme as any);
            this.isLoggedIn.set(true);
          })
        );
      } else {
        return of(null).pipe(delay(500));
      }
    }

    // Modo real
    const body = { username, password };
    return this.http.post<{ token: string; user?: any }>(this.apiUrl + '/login', body).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem(this.tokenKey, response.token);
          this.isLoggedIn.set(true);
        }
      }),
      catchError(error => {
        console.error('Error en login', error);
        return of(null);
      })
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('userRole');
    this.isLoggedIn.set(false);
    this.router.navigateByUrl('/login');
  }

  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  register(username: string, password: string, email: string) {
    // Modo mock
    if (this.useMock) {
      const userExists = REGISTERED_USERS.find(u => u.username === username || u.email === email);

      if (userExists) {
        return of(null).pipe(delay(500));
      } else {
        const newUser = {
          username,
          password,
          email,
          role: 'usuario',
          theme: 'green',
          token: `mock-token-${username}-${Date.now()}`
        };
        REGISTERED_USERS.push(newUser);

        return of({ 
          message: 'Usuario registrado exitosamente',
          user: {
            username: newUser.username,
            email: newUser.email
          }
        }).pipe(
          delay(500),
          tap(response => {
            console.log('Registro exitoso:', response);
          })
        );
      }
    }

    // Modo real
    const body = { username, password, email };
    return this.http.post<{ message: string; user?: any }>(this.apiUrl + '/register', body).pipe(
      tap(response => {
        if (response && response.message) {
          console.log('Registro exitoso:', response);
        }
      }),
      catchError(error => {
        console.error('Error en el registro:', error);
        return of(null);
      })
    );
  }
}
