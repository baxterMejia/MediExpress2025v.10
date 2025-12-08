import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { LoadingSpinnerComponent } from '../shared/loading-spinner.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingSpinnerComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username = 'usuario';
  password = '1234';
  error = '';

  // Registro
  showRegister = false;
  registerData = {
    username: '',
    email: '',
    password: '',
  };
  registerError = '';
  registerSuccess = false;
  isLoading = false;

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
    this.isLoading = true;
    this.auth.login(this.username, this.password).subscribe((result) => {
      if (result) {
        this.isLoading = false;
        this.router.navigateByUrl('/perfil');
      } else {
        this.isLoading = false;
        this.error = 'Credenciales incorrectas';
      }
    });
  }

  openRegisterModal() {
    this.registerError = '';
    this.registerSuccess = false;
    this.showRegister = true;
  }

  closeRegisterModal() {
    this.showRegister = false;
  }

  onRegister() {
    this.isLoading = true;
    const { username, email, password } = this.registerData;
    this.auth.register(username, password, email).subscribe((result) => {
      if (result) {
        this.isLoading = false;
        this.registerSuccess = true;
        this.registerError = '';
        setTimeout(() => {
          this.closeRegisterModal();
        }, 1500);
      } else {
        this.isLoading = false;
        this.registerError = 'Error al registrar. Verifica los datos.';
      }
    });
  }
}
