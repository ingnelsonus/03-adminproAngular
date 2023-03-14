import { filter, map } from 'rxjs/operators';
import { ActivationEnd, Router,ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit,OnDestroy {

  public title:string="";
  public titleSub$:Subscription;

  constructor(private router:Router,private route:ActivatedRoute) {

    //console.log(route.snapshot.children[0].data);

     this.titleSub$ =this.getPathData()
                          .subscribe(({title})=>{
                            this.title = title;
                            document.title=`AdminPro - ${title}`;
                              //this.title = data["title"];
                          });
   }
  ngOnDestroy(): void {
    this.titleSub$.unsubscribe();
  }

  ngOnInit(): void {
  }

  getPathData(){
   return this.router.events
    .pipe(
      filter((event): event is ActivationEnd => event instanceof ActivationEnd),
      filter((event:ActivationEnd) => event.snapshot.firstChild === null ),
      map((event:ActivationEnd) => event.snapshot.data)
    );

  }

}
