import { Component, OnInit, ElementRef, NgZone, ViewChild} from '@angular/core';
import {NavController,ModalController, AlertController  } from "@ionic/angular";
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { RouteService } from "../route.service";
import { GlobalVarService } from "../global-var.service";
// import 'rxjs/add/operator/debounceTime';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  lat;
  lang;
  @ViewChild('Map') mapElement: ElementRef;
  stlist: any;
  Srcset:any=false;
  srclist:any;
  dest: any;
  src:any;
  data=[];
  searching: any = false;
  searchingsrc:any=false;
  map: any;
  DestSet=false;
  mapOptions: any;
  location = {lat: null, lng: null};
  finalDest:any;
  finalSrc:any;
  srcbool:boolean=false;
  markerOptions: any = {position: null, map: null, title: null};
  marker: any;
  constructor(private nav:NavController,private modalCtrl:ModalController,private geolocation:Geolocation,private formsmodule:FormsModule,private reactive:ReactiveFormsModule,private routeservice:RouteService,public alertController: AlertController,public global_var: GlobalVarService) { 
  }
  
  ngOnInit() {
    console.log(`${this.lat}${this.lang}`);
  }
  closeModal()
  {
    this.modalCtrl.dismiss();
  }
  NavNow()
  {
  this.modalCtrl.dismiss(this.data);
  console.log("Submited");
  }
  doNothing($event)
  {
    console.log($event.target.value);
  //console.log($event.target.length);  
  if($event.target.value.length > 1)
  {
    this.searching = true;
    this.routeservice.Search($event.target.value).subscribe(res => {   
      //this.router.navigateByUrl('/login');
       this.srclist=res;
      //  var i;var lt=Object.keys(res).length;  
       console.log(this.srclist);
       this.searchingsrc = false;
       console.log(Object.keys(res).length)  
      console.log(res);    
    });
  }
  else{
    this.searchingsrc = true;
    this.srclist=[];
    this.searchingsrc = false;
  }
  }
 
  doSomething($event) {
  console.log($event.target.value);
  //console.log($event.target.length);  
  if($event.target.value.length > 1)
  {
    this.searching = true;
    this.routeservice.Search($event.target.value).subscribe(res => {   
      //this.router.navigateByUrl('/login');
       this.stlist=res;
      //  var i;var lt=Object.keys(res).length;  
       console.log(this.stlist);
       this.searching = false;
       console.log(Object.keys(res).length)  
      console.log(res);    
    });
  }
  else{
    this.searching = true;
    this.stlist=[];
    this.searching = false;
  }
 }
 setDest(finald:any)
 {
  this.finalDest=finald;
  this.stlist=[];
  this.DestSet=true;
  this.data=this.data.concat(this.finalDest,this.src);
  this.data=this.data.concat(this.global_var.LoggedUser);
 // this.data=this.finalDest.concat(this.src);
 } 
 setSrc(finald:any)
 {
  this.src=finald;
  this.Srcset=true;
  this.srcbool=true;
  this.global_var.Unreachable=false; 
  this.srclist=[];
 }
 async presentAlert(){
  const alert = await this.alertController.create({
    
  // header: 'Sorry..!',
  // subHeader: 'Subtitle',
  message: 'sorry for inconvenience. No nearby station found..!!',
  buttons: [{text: 'Ok',
            handler: () => {
            console.log('Confirm Cancel');
            console.log();
            // this.router.navigate(['']);
            this.modalCtrl.dismiss(this.data);
          }}]
    });
  await alert.present();
  }
 
}
