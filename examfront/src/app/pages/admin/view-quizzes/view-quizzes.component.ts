import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/service/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {
  quizzes = [];
  constructor(private _quiz: QuizService) { }

  ngOnInit(): void {
    this._quiz.getQuizzes().subscribe(
      (data: any)=>{
        this.quizzes = data;
      },
      (error) => {
        Swal.fire('Error','Error in the server','error');
        console.log(error);
        
      }
    )
  }

  deleteQuiz(id){
   Swal.fire({
    icon: 'info',
    title: 'Are you sure ?',
    confirmButtonText: 'Delete',
    showCancelButton:true,
   }).then(result => {
    if (result.isConfirmed) {
      this._quiz.deleteQuiz(id).subscribe(
        (data) => {
          this.quizzes = this.quizzes.filter(q => q.qid !== id);
          Swal.fire('Success','Quiz deleted successfully','success');
        },
        (error) => {
          Swal.fire('Error',error,'error');
        }
      );
    } else {
      
    }
   })
  }

}
