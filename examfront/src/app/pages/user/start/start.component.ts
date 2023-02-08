import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/service/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  qid;
  questions;
  marksGo=0;
  correctAnswer = 0;
  attempted = 0;
  isSubmit = false;
  timer: any;

  constructor(private locationSt: LocationStrategy,private _route:ActivatedRoute, private _question:QuestionService) { }

  ngOnInit(): void {
    this.preventBackButton(); 
    this.qid = this._route.snapshot.params["qid"];
    console.log(this.qid);
    this.loadQuestions();
  }
  
    loadQuestions(){
      this._question.publicgetQuestionsOfQuizForTest(this.qid).subscribe(
        (data) => {
          this.questions = data;  
          this.timer = this.questions.length * 2 * 60;

          console.log(this.questions);
          this.startTimer()
        },
        (error) => {
          console.log(error);
          Swal.fire('Error','Error loading test questions','error');
        }
      )
    }

  preventBackButton(){
    history.pushState(null,null,location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null,null,location.href);
    })
  }

  submitQuiz(){
    Swal.fire({
      title: 'Do you want to submit the quiz',
      showCancelButton:true,
      confirmButtonText: 'Submit',
      denyButtonText: 'Dont save',
      icon: 'info'
    }).then((result) => {
      if (result.isConfirmed) {
        this.evalQuiz();
      } else {
        
      }
    })
  }

  startTimer(){
    let t: any = window.setInterval(() => {
      if (this.timer <= 0) {
        this.evalQuiz();
        clearInterval(t)
      } else {
        this.timer--;
      }
    },1000)
  }

  getFormattedTime(){
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} min : ${ss} seg`;
  }

  evalQuiz(){
  this._question.evalQuiz(this.questions).subscribe(
    (data:any)=>{
      console.log(data);
      this.marksGo = parseFloat(Number(data.marksGot).toFixed(2));
      this.correctAnswer = data.correctAnswer;
      this.attempted = data.attempt;
      this.isSubmit=true;
    },
    (error)=>{
      console.log(error);
      
    }
  )    
  }

  printPage(){
    window.print();
  }
}
