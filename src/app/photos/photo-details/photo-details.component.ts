import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Photo } from '../photo/photo';
import { PhotoComment } from '../photo/photo-comment';
import { PhotoService } from '../photo/photo.service';
import { AlertService } from '../../shared/components/alert/alert.service';
import { UserService } from '../../core/user/user.service';

@Component({
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css']
})
export class PhotoDetailsComponent implements OnInit{

  photo$: Observable<Photo>;
  photoId: number;
  isLogged: boolean;

  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService,
    private router: Router,
    private alertService: AlertService,
    private userService: UserService
    ){}

  ngOnInit(): void {
    this.photoId = this.route.snapshot.params['photoId'];
    this.photo$ = this.photoService.findById(this.photoId);
    this.photo$.subscribe(() => {}, err => {
      console.log(err);
      this.router.navigate(['not-found']);
    })
    this.isLogged = this.userService.isLogged();
  }

  remove(){
    this.photoService
      .removePhoto(this.photoId)
      .subscribe(() => {
        this.alertService.sucess('Photo removed!');
        this.router.navigate(['/user', this.userService.getUserName()], { replaceUrl: true })
      },
      err => {
        console.log(err);
        this.alertService.warning('Could not delete the photo!')
      }
      )
  }

  like(photo: Photo){
    this.photoService.like(photo.id).subscribe(liked => {
      if(liked) {
        this.photo$ = this.photoService.findById(photo.id);
      }
    });
  };
}
