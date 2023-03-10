import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/service/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
  qid;
  quiz;
  constructor(private _router:ActivatedRoute, private _quiz:QuizService, private _route:Router) { }

  ngOnInit(): void {
    this.qid = this._router.snapshot.params['qid'];
    this._quiz.getQuiz(this.qid).subscribe(
      (data) => {
        console.log(data);
        this.quiz = data;  
      },
      (error) => {
        console.log("Error in loading quiz");
        
      }
      );
    }
    
    startQuiz(){
      Swal.fire({
        title: 'Do you want to start the quiz?',
        showCancelButton: true,
        confirmButtonText: 'Start',
        denyButtonText:'Dont save',
        icon: 'info',
      }).then((result) => {
        if (result.isConfirmed) {
          this._route.navigate(["/start/" + this.qid]);
        } else {
          Swal.fire('Changed are not Saved','','error');
          
        }
      })
    }

}
