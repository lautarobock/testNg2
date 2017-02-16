import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Injectable()
export class Config {

    private _config = {
        apiPath: '../../api/v1'
    }

    constructor() {}

    get (key) {
        return this._config[key];
    }

}

@NgModule({
  imports: [
    CommonModule
  ],
//   exports: [Config],
  providers: [Config]
})
export class ConfigModule { }


