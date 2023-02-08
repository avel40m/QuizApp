import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/service/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {
  qId;
  qTitle;
  questions = [];

  constructor(private _route:ActivatedRoute,private _question:QuestionService,private _snack:MatSnackBar) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.paramMap.get('id');
    this.qTitle = this._route.snapshot.paramMap.get('title');

    console.log(this.qId);
    console.log(this.qTitle);
    this._question.getQuestionsOfQuiz(this.qId).subscribe(
      (data : any) => {
        console.log(data);
        this.questions = data;
      },
      (error) => {
        console.log(error);
        
      }
    )    
  }

  deleteQuestion(qid){
    Swal.fire({
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      title: 'Are you sure you want to delete?',
    }).then((result) => {
      if (result.isConfirmed) {
        this._question.deleteQuestion(qid).subscribe(
          (data)=>{
            this._snack.open('Question deleted','',{
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top'
            });
            this.questions = this.questions.filter(q => q.quesId != qid);
          },
          (error)=>{
            this._snack.open('Error','Error server',{
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            });
          }
        )
      } else {
        
      }
    })
  }

}
