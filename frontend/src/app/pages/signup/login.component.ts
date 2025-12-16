import {
  Component,
  ElementRef,
  HostListener,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

type UserRole = 'Admin' | 'User' | 'Subuser';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  /* ================= VIEW REFERENCES ================= */
  @ViewChild('dropdown') dropdownRef!: ElementRef;
  @ViewChild('loginAnchor') loginAnchorRef!: ElementRef;

  /* ================= UI STATE ================= */
  showLoginDropdown = false;
  showSignup = false;

  selectedRole: UserRole = 'Admin';

  /* ================= FORMS ================= */
  loginForm!: FormGroup;
  signupForm!: FormGroup;

  /* ================= AUTH STATE ================= */
  isLoggedIn = false;
  loggedRole: UserRole | null = null;
  loggedName: string | null = null;

  constructor(private fb: FormBuilder) {
    this.buildForms();
  }

  /* ================= FORM BUILDERS ================= */
  private buildForms(): void {
    this.loginForm = this.fb.group({
      webId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  /* ================= UI ACTIONS ================= */
  toggleLoginDropdown(event: MouseEvent): void {
    event.preventDefault();
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

  /* ================= LOGIN ================= */
  submitLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { webId } = this.loginForm.value;

    this.isLoggedIn = true;
    this.loggedRole = this.selectedRole;
    this.loggedName = webId;

    this.showLoginDropdown = false;
    this.loginForm.reset();
  }

  /* ================= SIGNUP ================= */
  submitSignup(): void {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    alert('Signup Successful!');
    this.signupForm.reset();
    this.showSignup = false;
  }

  /* ================= LOGOUT ================= */
  logout(): void {
    this.isLoggedIn = false;
    this.loggedRole = null;
    this.loggedName = null;
  }

  /* ================= CLOSE DROPDOWN ON OUTSIDE CLICK ================= */
  @HostListener('document:click', ['$event'])
  closeDropdown(event: MouseEvent): void {
    if (!this.showLoginDropdown) return;

    const target = event.target as HTMLElement;

    if (this.dropdownRef?.nativeElement.contains(target)) return;
    if (this.loginAnchorRef?.nativeElement.contains(target)) return;

    this.showLoginDropdown = false;
  }
}
