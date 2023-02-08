import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  public getQuizzes(){
    return this.http.get(`${baseUrl}/quiz/`);
  }

  // add quiz
  public addQuiz(quiz){
    return this.http.post(`${baseUrl}/quiz/`,quiz);
  }
  // delete quiz
  public deleteQuiz(qId){
    return this.http.delete(`${baseUrl}/quiz/${qId}`);
  }

  // get single quiz
  public getQuiz(qId){
    return this.http.get(`${baseUrl}/quiz/${qId}`);
  }

  // update quiz
  public updateQuiz(quiz){
    return this.http.put(`${baseUrl}/quiz/`,quiz);
  }

  //  get quizz of category
  public getQuizzesOfCategory(cid){
    return this.http.get(`${baseUrl}/quiz/category/${cid}`);
  }

  //  get active quizzes
  public getActiveQuizzes(){
    return this.http.get(`${baseUrl}/quiz/active`);
  }

  // get active quizzes of category
  public getActiveQuizzesOfCategory(cid){
    return this.http.get(`${baseUrl}/quiz/category/active/${cid}`); 
  }

}
