import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/service/question.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  public Editor = ClassicEditor;
  qId;
  qTitle;
  question = {
    quiz: {},
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
  }
  constructor(private _router:ActivatedRoute, private _question:QuestionService, private _snack:MatSnackBar) { }

  ngOnInit(): void {
    this.qId = this._router.snapshot.paramMap.get('qid');
    this.qTitle = this._router.snapshot.paramMap.get('title');
    this.question.quiz['qid'] = this.qId;    
  }

  formSubmit(){
    if(this.question.content.trim() == '' || this.question.content == null ){
      this._snack.open('The content is required','',{
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
      return;
    }
    if(this.question.option1.trim() == '' || this.question.option1 == null ){
      this._snack.open('The option 1 is required','',{
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
      return;
    }
    if(this.question.option2.trim() == '' || this.question.option2 == null ){
      this._snack.open('The option 2 is required','',{
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
      return;
    }
    if(this.question.answer.trim() == '' || this.question.answer == null ){
      this._snack.open('The answer is required','',{
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
      return;
    }

    this._question.addQuestion(this.question).subscribe(
      (data)=>{
        Swal.fire('Success','Question Added', 'success');
        this.question.content = '';
        this.question.option1 = '';
        this.question.option2 = '';
        this.question.option3 = '';
        this.question.option4 = '';
        this.question.answer = '';
      },
      (error)=>{
        Swal.fire('Error','Error server','error');
      }
    )
  }
}
