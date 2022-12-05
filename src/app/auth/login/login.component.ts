import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const google:any;
declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'
  ]
})
export class LoginComponent implements OnInit, AfterViewInit  {

  @ViewChild('googleBtn') googleBtn:any;
  public formSubmited=false;
  //definimos el formulario reactivo, y establecemos este formulario en el html
  //y los asociamos a los input para ver la informacion
  public loginForm=this.fb.group({
    //para recuperar el email, que aparezca, y si no existe que mande un string vacio
    email:[localStorage.getItem('email')||'',[ Validators.required, Validators.email] ],
    password:['',Validators.required],
    remember:[false]
    
  });

  constructor(private router:Router,
              private fb:FormBuilder,
              private usuarioService:UsuarioService,
              private ngZone:NgZone
               ) { }

          ngOnInit(): void {
            
          }
//ejecutar el proceso de construccion de la elaboracion del boton de google
          ngAfterViewInit(): void {
            this.googleInit();
          }

          googleInit(){
            
            google.accounts.id.initialize({
              client_id: '801941627504-i4jg8opaclaiss3sjsrkscmdenjrhe3k.apps.googleusercontent.com',
              callback: (response:any) => this.handleCredentialResponse(response)
            });
            google.accounts.id.renderButton(
              //document.getElementById("buttonDiv"),
              this.googleBtn.nativeElement,
              { theme: "outline", size: "large" }  // customization attributes
            );
          }

          handleCredentialResponse(response:any){
           // console.log("Encoded JWT ID token: " + response.credential);
            this.usuarioService.loginGoogle(response.credential)
            .subscribe(resp=> {
             // console.log({login:resp})
             this.router.navigateByUrl('/');
            })
          }

  login(){
    this.usuarioService.login(this.loginForm.value)
    .subscribe(resp=>{
      if(this.loginForm.get('remember')?.value){
        localStorage.setItem('email', this.loginForm.get('email')?.value)
      }else{
        localStorage.removeItem('email')
      }
      //navegar al dashboard
      this.router.navigateByUrl('/');

    }, (err) =>{
      Swal.fire('Error', err.error.msg,'error');
    });
   // this.router.navigateByUrl('/');
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });

    

  }

}
