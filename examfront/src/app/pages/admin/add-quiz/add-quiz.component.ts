import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/service/category.service';
import { QuizService } from 'src/app/service/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
  categories = [];

  quizData = {
    title: '',
    description: '',
    maxMarks:'',
    numberOfQuestions: '',
    active:true,
    category:{
      cid:''
    },
  }

  constructor(private _cat:CategoryService, private _snack:MatSnackBar, private _quiz:QuizService) { }

  ngOnInit(): void {
    this._cat.getCategories().subscribe(
      (data:any) => {
        this.categories=data;
        console.log(this.categories);
        
      },(error) => {
        console.log(error);
        Swal.fire('Error !!!','error in loading server','error');
      }
    )
  }

  addQuiz(){
    if(this.quizData.title.trim() == '' || this.quizData.title == null){
      this._snack.open("Title is required",'',{
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
      return;
    }    

    this._quiz.addQuiz(this.quizData).subscribe(
      (data)=>{
        Swal.fire('Success','quizz is add','success');
        this.quizData = {
          title: '',
          description: '',
          maxMarks:'',
          numberOfQuestions: '',
          active:true,
          category:{
            cid:''
          },
        }
      },
      (error)=>{
        Swal.fire('Error!!','Error adding quiz','error');
        console.log(error);
        
      }
    )
  }

}
