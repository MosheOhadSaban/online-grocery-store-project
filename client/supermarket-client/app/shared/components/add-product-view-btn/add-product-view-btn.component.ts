import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UiAccessStateService } from 'src/app/core/services/state/ui-access-state.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-product-view-btn',
  templateUrl: './add-product-view-btn.component.html',
  styleUrls: ['./add-product-view-btn.component.css'],
})
export class AddProductViewBtnComponent implements OnInit {
  constructor(
    private uiAccessStateService: UiAccessStateService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  faPlusIcon = faPlus

  onAddProductClick() {
    this.uiAccessStateService.setIsModalActive(true);
    this.router.navigate([{ outlets: { modal: ['add-product'] } }]);
  }
}
