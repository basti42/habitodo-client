import { Component, OnInit } from '@angular/core';
import { UploadService } from 'src/app/core';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

function splitString(str: string, c: string){
  return str.split(c);
}


@Component({
  selector: 'app-upload-avatar',
  templateUrl: './upload-avatar.component.html',
  styleUrls: ['./upload-avatar.component.css']
})
export class UploadAvatarComponent {

  selectedFile: any;

  constructor(private uploadService: UploadService) { }

  processFile(imageInput: any){

    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      // this.selectedFile = new ImageSnippet(event.target.result, file);
      // console.debug(this.selectedFile);
      let base64_img = reader.result;
      // console.debug(typeof(base64_img), "Base64 img", base64_img);
      // split into header and body
      let arr = splitString(base64_img as string, ',');
      let img_header = arr[0];
      let img_data = arr[1];
      console.debug("img header: ", img_header);
      console.debug("img data: ", img_data);
      let bytes = window.atob( window.unescape(window.encodeURIComponent(img_data)));
      


      this.uploadService.uploadAvatarImage(img_header, bytes).subscribe({
        next: response => { console.log(`User Avatar Upload: ${response}`) },
        error: err => { console.error(`User Avatar Upload: `, err) }
      });
    }

   
  }



}
