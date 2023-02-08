import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http:HttpClient) { }
  public getQuestionsOfQuiz(id){
    return this._http.get(`${baseUrl}/question/quiz/all/${id}`);
  }

  publicgetQuestionsOfQuizForTest(qid){
    return this._http.get(`${baseUrl}/question/quiz/${qid}`);
  }

  // add questions
  public addQuestion(question){
    return this._http.post(`${baseUrl}/question/`,question);
  }

  // delete question
  public deleteQuestion(qid){
    return this._http.delete(`${baseUrl}/question/${qid}`);
  }

  // eval quiz
  public evalQuiz(question){
    return this._http.post(`${baseUrl}/question/eval-quiz`,question);
  }
}
