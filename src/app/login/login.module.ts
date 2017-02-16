import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginDialogComponent, LoginDialog } from './login-dialog/login-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule
  ],
  declarations: [LoginDialogComponent],
  entryComponents: [LoginDialogComponent],
  providers: [LoginDialog]
})
export class LoginModule { }
