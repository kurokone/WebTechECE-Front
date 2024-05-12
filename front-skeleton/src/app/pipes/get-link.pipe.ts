import { Pipe, PipeTransform } from '@angular/core';
import { blobToUrl } from 'helpers/utiles';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'getLink',
  standalone: true
})
export class GetLinkPipe implements PipeTransform {

  transform(value: unknown ): unknown {

    if(value instanceof Blob){
     return  blobToUrl(value)
    }
    else if (typeof value === 'string' && value.startsWith('assets')) {
      value = environment.staticBasePath+value
      return value;
    }
    else if (typeof value === 'string' && value.startsWith('/assets')) {
      value = environment.staticBasePath+value.substring(1)
      return value;
    }


     return value;
   }

}
