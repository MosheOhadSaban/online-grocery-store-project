import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { matchValidator } from 'src/app/authorization/providers/form-validators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {
  faUserPlus,
  faArrowCircleRight,
} from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { UserRegisterDetails } from 'src/app/core/models/UserRegisterDetails';
import { HttpAuthService } from 'src/app/core/services/http/http-auth.service';
import { UiAccessStateService } from 'src/app/core/services/state/ui-access-state.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  constructor(
    private httpAuthService: HttpAuthService,
    private toastr: ToastrService,
    private router: Router,
    private uiAccessStateService: UiAccessStateService
  ) {
    router = this.router;
  }
  faUserPlusIcon = faUserPlus;
  faArrowCircleRightIcon = faArrowCircleRight;
  isRegisterProcessStep1: boolean = true;
  registerFormStep1: FormGroup | any;
  registerFormStep2: FormGroup | any;
  citiesArray: Array<string> = [
    'Tel-Aviv',
    'Haifa',
    'Jerusalem',
    'Eilat',
    'Beersheba',
    'Ashdod',
    'Rishon LeZion',
    'Holon',
  ];

  isAuthModalActive: boolean = false;
  private isAuthModalActiveSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.isAuthModalActiveSubscription =
      this.uiAccessStateService.isModalActive$.subscribe((value) => {
        this.isAuthModalActive = value;
      });

    this.isRegisterProcessStep1 = true;
    this.registerFormStep1 = new FormGroup({
      id: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(9),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        matchValidator('password'),
      ]),
    });

    this.registerFormStep2 = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      city: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
    });
  }

  get id() {
    return this.registerFormStep1.get('id');
  }
  get email() {
    return this.registerFormStep1.get('email');
  }
  get password() {
    return this.registerFormStep1.get('password');
  }
  get confirmPassword() {
    return this.registerFormStep1.get('confirmPassword');
  }
  get firstName() {
    return this.registerFormStep2.get('firstName');
  }
  get lastName() {
    return this.registerFormStep2.get('lastName');
  }
  get city() {
    return this.registerFormStep2.get('city');
  }
  get street() {
    return this.registerFormStep2.get('street');
  }

  onRegister(): void {
    const userRegisterDetails: UserRegisterDetails = {
      id: parseInt(this.id.value),
      email: this.email.value.toLowerCase(),
      password: this.password.value,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      city: this.city.value,
      street: this.street.value,
    };

    this.httpAuthService.register(userRegisterDetails).subscribe(
      (response) => {
        this.toastr.success(response, 'Message:', {
          timeOut: 3000,
        });
        this.router.navigate([{ outlets: { modal: ['login'] } }]);
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
  onNextStepCilck(): void {
    this.httpAuthService
      .isUserAlreadyExists({
        email: this.email.value,
        id: parseInt(this.id.value),
      })
      .subscribe(
        (response: string) => {
          this.toastr.success(response, 'Message:', {
            timeOut: 3000,
          });
          this.isRegisterProcessStep1 = false;
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
  onBackStepClick() {
    this.isRegisterProcessStep1 = true;
  }
  onExitClick() {
    this.uiAccessStateService.setIsModalActive(false);
    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    this.isAuthModalActiveSubscription.unsubscribe();
  }
}
