import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { UiAccessStateService } from 'src/app/core/services/state/ui-access-state.service';

@Component({
  selector: 'app-cart-display-btn',
  templateUrl: './cart-display-btn.component.html',
  styleUrls: ['./cart-display-btn.component.css'],
})
export class CartDisplayBtnComponent implements OnInit, OnDestroy {
  constructor(private uiAccessStateService: UiAccessStateService) {}

  faAngleDoubleLeftIcon = faAngleDoubleLeft;
  faAngleDoubleRightIcon = faAngleDoubleRight;
  faShoppingCartIcon = faShoppingCart;

  isCartIsdisplayed: boolean = true;

  private isCartIsdisplayedSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.isCartIsdisplayedSubscription =
      this.uiAccessStateService.isSidebarIsdisplayed$.subscribe((value) => {
        this.isCartIsdisplayed = value;
      });
  }

  ngOnDestroy(): void {
    this.isCartIsdisplayedSubscription.unsubscribe();
  }

  onCartDisplayClick(value: boolean): void {
    value = !value;
    this.uiAccessStateService.setIsSidebarIsdisplayed(value);
  }
}
