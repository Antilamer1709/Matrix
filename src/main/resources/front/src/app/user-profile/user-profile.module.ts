import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {TableModule} from "primeng/table";
import {DropdownModule} from "primeng/primeng";

@NgModule({
  imports: [
    CommonModule,
    TableModule,
    DropdownModule
  ],
  declarations: [UserProfileComponent]
})
export class UserProfileModule { }
