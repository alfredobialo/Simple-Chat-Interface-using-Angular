import {environment} from './environments/environment';
import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {AppBaseModule} from './AppBase.module';


if(environment.production)
{
  enableProdMode();
}
platformBrowserDynamic().bootstrapModule(AppBaseModule)
.then( (response) => {
  //console.log(response);
})
    .catch( (err) => {
    console.error(err);
  });
