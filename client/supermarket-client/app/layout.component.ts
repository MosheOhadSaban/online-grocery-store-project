import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiAccessStateService } from 'src/app/core/services/state/ui-access-state.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-layout-root',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit, OnDestroy {
  constructor(
    private uiAccessStateService: UiAccessStateService,
    private tokenStorageService: TokenStorageService
  ) {}

  isCartIsdisplayed: boolean = true;

  private isCartIsdisplayedSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.uiAccessStateService.setUserStatusAfterReload();
    this.tokenStorageService.notifyUserDetalis();

    this.isCartIsdisplayedSubscription =
      this.uiAccessStateService.isSidebarIsdisplayed$.subscribe((value) => {
        this.isCartIsdisplayed = value;
      });
  }
  ngOnDestroy(): void {
    this.isCartIsdisplayedSubscription.unsubscribe();
  }
}
