import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AllSerService } from '../all-ser.service';
// import { AddtalentService } from '../addtalent.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// import { AuthServiceService } from 'src/app/authentication/auth-service.service';
// import { talent } from 'D:/Clinic2/backend/server/routes/Talent.js';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  // styleUrls: ['./style.css']
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  userId: string;
  userIsAuthenticated = false;
  talents: any[] = [];
  totalCount: number;
  private postsSub: Subscription | undefined;
  router: any;
  
  constructor(private http:HttpClientModule,private Tservices:AllSerService) { }

  ngOnInit(): void {
    this.Tservices.getTalents(); 
 
    this.userId = this.Tservices.getUserId(); 
    this.postsSub = this.Tservices.talentsUpdatedListener() 
    .subscribe((postData:{talents:any[],talentCount:number})=>{ 
      console.log(postData.talents); 
      console.log(postData.talentCount); 
      this.talents=postData.talents; 
      this.totalCount= postData.talentCount; 
    });
    this.userIsAuthenticated = this.Tservices.getIsAuth();
  }
  logout()
  {
    this.Tservices.logout();
  }
  Delete(Id: string) {
    this.Tservices.deleteTalents(Id).subscribe(
      () => {
        this.Tservices.getTalents();
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 3000);
      }
    );
  }

}
