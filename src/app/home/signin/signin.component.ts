import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { PlataformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';

@Component({
  templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit {

  fromUrl: string;
  loginForm: UntypedFormGroup;
  @ViewChild('userNameInput')
  userNameInput: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router,
    private plataformDetectorService: PlataformDetectorService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.activatedRoute
      .queryParams
      .subscribe(params => this.fromUrl = params['fromUrl']);

    this.loginForm = this.formBuilder.group({
        userName: ['', Validators.required],
        password: ['', Validators.required],
      });
      this.plataformDetectorService.isPlatformBrowser() &&
      this.userNameInput?.nativeElement.focus();
  }

  login() {

    const userName = this.loginForm.get('userName')?.value;
    const password = this.loginForm.get('password')?.value;

    this.authService
        .authenticate(userName, password)
        .subscribe(
            () => this.fromUrl 
              ? this.router.navigateByUrl(this.fromUrl)
              : this.router.navigate(['user', userName])
            ,
            (err) => {
              console.log(err),
              this.loginForm.reset(),
              this.plataformDetectorService.isPlatformBrowser() &&
                this.userNameInput?.nativeElement.focus();
              alert('Invalid user name or password')
            }
        );
  }
}
