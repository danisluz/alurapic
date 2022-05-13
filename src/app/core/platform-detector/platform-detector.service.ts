import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({ providedIn: 'root'})
export class PlataformDetectorService {

  constructor( @Inject(PLATFORM_ID)
    private plataformId: string){}

  isPlatformBrowser(){
    return isPlatformBrowser(this.plataformId);
  }

}
