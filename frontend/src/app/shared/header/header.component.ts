
import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @ViewChild('dropdown') dropdownRef!: ElementRef;
  @ViewChild('loginAnchor') loginAnchorRef!: ElementRef;

  //  ADDED OUTPUT EVENT EMITTER
  @Output() pageChange = new EventEmitter<string>();

  // UI state
  showLoginDropdown = false;
  selectedRole: 'Admin' | 'User' | 'Subuser' = 'Admin';

  // login form
  loginForm!: FormGroup;

  // logged-in info
  isLoggedIn = false;
  loggedRole: string | null = null;
  loggedName: string | null = null;

  constructor(private fb: FormBuilder, private host: ElementRef) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      webId: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // Toggle login dropdown
  toggleLoginDropdown(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.showLoginDropdown = !this.showLoginDropdown;

    if (this.showLoginDropdown) {
      this.loginForm.reset();
      this.selectedRole = 'Admin';
    }
  }

  selectRole(role: 'Admin' | 'User' | 'Subuser') {
    this.selectedRole = role;
    this.loginForm.patchValue({ password: '' });
  }

  submitLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const webId = this.loginForm.value.webId;
    const password = this.loginForm.value.password;

    if (webId && password) {
      this.isLoggedIn = true;
      this.loggedRole = this.selectedRole;
      this.loggedName = webId;
      this.showLoginDropdown = false;
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  logout() {
    this.isLoggedIn = false;
    this.loggedRole = null;
    this.loggedName = null;
  }

  //  NEW — Sends pages to AppComponent
  openBusyApp(event: Event) {
    event.preventDefault();
    this.pageChange.emit('busy-mobile');
  }

  // Existing goTo method
  goTo(page: string, event: Event) {
    event.preventDefault();
    this.pageChange.emit(page); // now this is correct
  }

  // Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (!this.showLoginDropdown) return;

    const dropdownEl = this.dropdownRef?.nativeElement;
    const anchorEl = this.loginAnchorRef?.nativeElement;

    if (dropdownEl && dropdownEl.contains(target)) return;
    if (anchorEl && anchorEl.contains(target)) return;

    this.showLoginDropdown = false;
  }
}
