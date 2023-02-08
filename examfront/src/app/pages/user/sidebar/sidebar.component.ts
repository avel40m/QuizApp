import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  categories;

  constructor(private _cat:CategoryService,private _snack:MatSnackBar) { }

  ngOnInit(): void {
    this._cat.getCategories().subscribe(
      (data: any)=>{
        this.categories = data;
      },
      (error)=>{
        this._snack.open('Error in loading categories from server','',{
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        })
      }
    )
  }

}
