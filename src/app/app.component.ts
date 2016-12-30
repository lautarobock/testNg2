import {Component, Optional} from '@angular/core';
import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';
import {Http, Response } from '@angular/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isDarkTheme: boolean = false;
  lastDialogResult: string;
  data: any[];

  foods: any[] = [
    {name: 'Pizza', rating: 'Excellent'},
    {name: 'Burritos', rating: 'Great'},
    {name: 'French fries', rating: 'Pretty good'},
  ];

  progress: number = 0;

  constructor(private _dialog: MdDialog, private _snackbar: MdSnackBar, public http: Http) {
    // Update the value for the progress-bar on an interval.
    setInterval(() => {
      this.progress = (this.progress + Math.floor(Math.random() * 4) + 1) % 100;
    }, 200);
  }

  openDialog() {
    let dialogRef = this._dialog.open(DialogContent);

    dialogRef.afterClosed().subscribe(result => {
      this.lastDialogResult = result;
    })
  }

  login() {
    this.http.post('/api/authentication/logon?sso=false',{
        "UserName": "Administrator",
        "Password": "Administrator",
        "UseWindowsAuthentication": false
    })
    .map(res => res.json())
    .subscribe(
      data => console.log(data),
      err => console.log(err),
      () => {
        console.log('Authentication Complete');
        // this.http.get('/api/users')
        //   .map(res => res.json())
        //   .subscribe(
        //     data => this.data = data,
        //     err => console.log(err),
        //     () => console.log('App list Quote Complete')
        //   );
      }
    );
  }

  showSnackbar() {
    this._snackbar.open('YUM SNACKS', 'CHEW');
  }
}


@Component({
  template: `
    <p>This is a dialog</p>
    <p>
      <label>
        This is a text box inside of a dialog.
        <input #dialogInput>
      </label>
    </p>
    <p> <button md-button (click)="dialogRef.close(dialogInput.value)">CLOSE</button> </p>
  `,
})
export class DialogContent {
  constructor(@Optional() public dialogRef: MdDialogRef<DialogContent>) { }
}