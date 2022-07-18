import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { PhotoService } from '../photo/photo.service';
import { UserService } from '../../core/user/user.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { finalize } from 'rxjs';

@Component({
  selector: 'ap-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  photoForm: UntypedFormGroup;
  file: File;
  preview: string;
  percentDone = 0;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private photoService: PhotoService,
    private router: Router,
    private alertService: AlertService,
    private userService: UserService
    ) { }

  ngOnInit() {
    this.photoForm = this.formBuilder.group({
      file: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComments: [true]
    })
  }

  handleFile(file: File) {
    this.file = file;
    const reader = new FileReader();
    reader.onload = (event: any) => this.preview = event.target.result;
    reader.readAsDataURL(file);
  }

  upload(){
    const description = this.photoForm.get('description')?.value;
    const allowComments = this.photoForm.get('allowComments')?.value;
    this.photoService
      .upload(description, allowComments, this.file)
      .pipe(finalize(() => 
        this.router.navigate(['/user', this,this.userService.getUserName()])
      ))
      .subscribe((event: HttpEvent<any>) => {
        if(event.type == HttpEventType.UploadProgress){
          var total: any = event.total;  
          this.percentDone = Math.round(100 * event.loaded / total);
        }else if(event.type == HttpEventType.Response){
          this.alertService.sucess('Upload complete.', true)
        }
      },
      err => {
        console.log(err);
        this.alertService.danger('Upload error!', true)
      }
      )
  }

}
