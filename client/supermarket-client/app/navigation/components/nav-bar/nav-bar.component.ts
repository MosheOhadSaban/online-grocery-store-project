import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  faUser,
  faUserPlus,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDetails } from 'src/app/core/models/UserDetails';
import { UiAccessStateService } from 'src/app/core/services/state/ui-access-state.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  isModalActive: boolean = false;
  isUserLogin: boolean = false;
  isUserOnShoppingMode: boolean = false;
  isUserOnOrderMode: boolean = false;
  faUserIcon = faUser;
  faUserPlusIcon = faUserPlus;
  faArrowRightIcon = faArrowRight;
  userDetails: UserDetails = {
    id: 0,
    userType: '',
    email: '',
    firstName: '',
    lastName: '',
  };

  private userDetailsSubscription: Subscription = new Subscription();
  private isActiveSubscription: Subscription = new Subscription();
  private isUserLoginSubscription: Subscription = new Subscription();

  constructor(
    private uiAccessStateService: UiAccessStateService,
    public router: Router,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit() {
    this.isActiveSubscription =
      this.uiAccessStateService.isModalActive$.subscribe((value) => {
        this.isModalActive = value;
      });
    this.isUserLoginSubscription =
      this.uiAccessStateService.isUserLogin$.subscribe((value) => {
        this.isUserLogin = value;
      });
    this.userDetailsSubscription =
      this.tokenStorageService.userDetails$.subscribe((value) => {
        this.userDetails = value;
      });


  }
  ngOnDestroy(): void {
    this.isActiveSubscription.unsubscribe();
    this.isUserLoginSubscription.unsubscribe();
    this.userDetailsSubscription.unsubscribe();

  }

  onRegisterClick(): void {
    this.toggleModalOn();
    this.router.navigate([{ outlets: { modal: ['register'] } }]);
  }

  onLoginClick(): void {
    this.toggleModalOn();
    this.router.navigate([{ outlets: { modal: ['login'] } }]);
  }

  onLogoutClick() {
    this.router.navigate(['']);
    this.tokenStorageService.logout();
    this.uiAccessStateService.setIsUserLogin(false);
    this.uiAccessStateService.setIsSidebarIsdisplayed(true)
  }

  toggleModalOn() {
    this.uiAccessStateService.setIsModalActive(true);
  }
}
