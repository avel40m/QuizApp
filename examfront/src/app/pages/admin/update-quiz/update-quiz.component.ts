import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { QuizService } from 'src/app/service/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  constructor(private _route:ActivatedRoute,private _quiz:QuizService, private _cat:CategoryService,private _router:Router) { }
  qId=0;
  quiz;
  categories = [];

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this._quiz.getQuiz(this.qId).subscribe(
      (data) => {
        this.quiz = data;
        console.log(this.quiz);
        
      }, 
      (error) => {
        console.log(error);
        
      } 
    )

    this._cat.getCategories().subscribe(
      (data:any) => {
        this.categories=data;
        console.log(this.categories);
        
      },(error) => {
        console.log(error);
      }
    )
  }

  public updateQuiz(){
    this._quiz.updateQuiz(this.quiz).subscribe(
      (data) => {
        Swal.fire('Update !!','Success quizz','success').then(e => {
          this._router.navigate(['/admin/quizzes/']);
        });
      },
      (error) => {        
        Swal.fire('Error !!','Error Server','error');
      }
    )
  }
}
