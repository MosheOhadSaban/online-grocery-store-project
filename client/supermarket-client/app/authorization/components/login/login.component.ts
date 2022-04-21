import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { DecodedUserToken } from 'src/app/core/models/DecodedUserToken';
import { UserLoginDetails } from 'src/app/core/models/UserLoginDetails';
import { HttpAuthService } from 'src/app/core/services/http/http-auth.service';
import { UiAccessStateService } from 'src/app/core/services/state/ui-access-state.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(
    private httpAuthService: HttpAuthService,
    private toastr: ToastrService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private uiAccessStateService: UiAccessStateService
  ) {
    router = this.router;
  }
  isAuthModalActive: boolean = false;

  private isAuthModalActiveSubscription: Subscription = new Subscription();

  loginForm: FormGroup | any;
  faUserIcon = faUser;

  ngOnInit(): void {
    this.isAuthModalActiveSubscription =
      this.uiAccessStateService.isModalActive$.subscribe((value) => {
        this.isAuthModalActive = value;
      });

    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  onLoginClick(): void {
    const userLoginDetails: UserLoginDetails = {
      email: this.email.value.toLowerCase(),
      password: this.password.value,
    };

    this.httpAuthService.login(userLoginDetails).subscribe(
      (response) => {
        let decoded: DecodedUserToken = jwt_decode(response.token!);
        this.tokenStorageService.saveToken(response.token!);
        this.tokenStorageService.saveUserType(decoded.userType);
        this.toastr.success(response.message, 'Message:', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'decreasing',
        });
        this.uiAccessStateService.setIsModalActive(false);
        this.uiAccessStateService.setIsUserLogin(true);
        this.tokenStorageService.notifyUserDetalis();
        if (this.tokenStorageService.isAdminLoggedIn() == true) {
          this.router.navigate([
            { outlets: { primary: ['admin-products-view'], modal: null } },
          ]);
          this.uiAccessStateService.setIsSidebarIsdisplayed(false);
        } else {
          this.router.navigate(['']);
        }
      },
      (serverErrorResponse) => {
        if (serverErrorResponse.error.message == undefined) {
          this.toastr.error(serverErrorResponse.message, 'Error Message:', {
            timeOut: 4000,
          });
        } else {
          this.toastr.error(
            serverErrorResponse.error.message,
            'Error Message:',
            {
              timeOut: 4000,
            }
          );
        }
      }
    );
  }
  onExitClick() {
    this.uiAccessStateService.setIsModalActive(false);
    this.router.navigate(['']);
  }
  ngOnDestroy(): void {
    this.isAuthModalActiveSubscription.unsubscribe();
  }
  onRegisterClick() {
    this.router.navigate([{ outlets: { modal: ['register'] } }]);
  }
}
