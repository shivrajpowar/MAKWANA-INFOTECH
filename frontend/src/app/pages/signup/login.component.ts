import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';


type UserRole = 'Admin' | 'User' | 'Subuser';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('dropdown') dropdownRef!: ElementRef;
  @ViewChild('loginAnchor') loginAnchorRef!: ElementRef;

  showLoginDropdown = false;
  showSignup = false;

  selectedRole: UserRole = 'User';

  loginForm!: FormGroup;
  signupForm!: FormGroup;

  isLoggedIn = false;
  loggedRole: string | null = null;
  loggedName: string | null = null;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService
  ) {
    this.buildForms();
  }

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      const user = this.auth.getUser();
      this.isLoggedIn = true;
      this.loggedRole = user.role;
      this.loggedName = user.name;
    }
  }

  private buildForms(): void {
    this.loginForm = this.fb.group({
      webId: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  toggleLoginDropdown(event: MouseEvent): void {
    event.stopPropagation();
    this.showLoginDropdown = !this.showLoginDropdown;
    this.showSignup = false;
  }

  selectRole(role: UserRole): void {
    this.selectedRole = role;
  }

  openSignup(): void {
    this.showSignup = true;
  }

  backToLogin(): void {
    this.showSignup = false;
  }

  /* ================= REAL LOGIN ================= */
  submitLogin(): void {
    if (this.loginForm.invalid) return;

    const payload = {
      email: this.loginForm.value.webId,
      password: this.loginForm.value.password
    };

    this.auth.signin(payload).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.user.role);
        localStorage.setItem('name', res.user.name);

        this.isLoggedIn = true;
        this.loggedRole = res.user.role;
        this.loggedName = res.user.name;

        this.showLoginDropdown = false;
        this.loginForm.reset();
      },
      error: err => alert(err.error.message || 'Login failed')
    });
  }

  /* ================= REAL SIGNUP ================= */
  submitSignup(): void {
    if (this.signupForm.invalid) return;

    const payload = {
      ...this.signupForm.value,
      role: this.selectedRole.toLowerCase()
    };

    this.auth.signup(payload).subscribe({
      next: () => {
        alert('Signup successful. Please login.');
        this.signupForm.reset();
        this.showSignup = false;
      },
      error: err => alert(err.error.message || 'Signup failed')
    });
  }

  logout(): void {
    this.auth.logout();
    this.isLoggedIn = false;
    this.loggedRole = null;
    this.loggedName = null;
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: MouseEvent): void {
    if (!this.showLoginDropdown) return;

    const target = event.target as HTMLElement;

    if (this.dropdownRef?.nativeElement.contains(target)) return;
    if (this.loginAnchorRef?.nativeElement.contains(target)) return;

    this.showLoginDropdown = false;
  }
}
