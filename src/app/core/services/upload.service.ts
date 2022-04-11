import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private apiService: ApiService) { }

  public uploadAvatarImage(img_header: string, bytes: string) : Observable<Response> {
    console.log("image header: ", img_header);
    console.log("bytes: ", bytes);
    return this.apiService.uploadAvatarImage(img_header, bytes);
  }

  
}
