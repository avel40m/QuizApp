package com.example.demo.controller;

import com.example.demo.model.exam.Question;
import com.example.demo.model.exam.Quiz;
import com.example.demo.service.QuestionService;
import com.example.demo.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping(value = "/question")
@CrossOrigin("*")
public class QuestionController {

    @Autowired
    private QuestionService questionService;
    @Autowired
    private QuizService quizService;

    // add question
    @PostMapping("/")
    public ResponseEntity<Question> addQuestion(@RequestBody Question question){
        return ResponseEntity.ok(questionService.addQuestion(question));
    }

    // update question
    @PutMapping("/")
    public ResponseEntity<Question> updateQuestion(@RequestBody Question question){
        return ResponseEntity.ok(questionService.updateQuestion(question));
    }

    // get all question of quid
    @GetMapping("/quiz/{qid}")
    public ResponseEntity<?> getQuestionOfQuiz(@PathVariable("qid") Long qid){
        Quiz quiz = quizService.getQuiz(qid);
        Set<Question> questions = quiz.getQuestions();
        List<Question> list = new ArrayList<>(questions);
        if (list.size() > Integer.parseInt(quiz.getNumberOfQuestions())){
            list = list.subList(0,Integer.parseInt(quiz.getNumberOfQuestions() + 1));
        }
        list.forEach(q -> {
            q.setAnswer("");
        });

        Collections.shuffle(list);
        return  ResponseEntity.ok(list);
    }

    @GetMapping("/quiz/all/{qid}")
    public ResponseEntity<?> getQuestionsOfQuizAdmin(@PathVariable("qid") Long qid){
        Quiz quiz = new Quiz();
        quiz.setQid(qid);
        Set<Question> questionOfQuiz = this.questionService.getQuestionOfQuiz(quiz);
        return ResponseEntity.ok(questionOfQuiz);
    }

    // get single question
    @GetMapping("/{quesId}")
    public ResponseEntity<Question> getById(@PathVariable("quesId") Long quesId){
        return  ResponseEntity.ok(questionService.getQuestion(quesId));
    }

    // delete question
    @DeleteMapping("/{quesId}")
    public void deleteQuestion(@PathVariable("quesId") Long quesId){
        questionService.deleteQuestion(quesId);
    }

    // eval quiz
    @PostMapping("/eval-quiz")
    public ResponseEntity<?> evalQuiz(@RequestBody List<Question> questions){
        System.out.println(questions);
        double marksGot=0;
        int correctAnswer = 0;
        int attempt=0;
        for(Question q : questions){
            Question question = questionService.get(q.getQuesId());
            if (question.getAnswer().equals(q.getGivenAnswer())){
                correctAnswer++;
                double marksSingle = Double.parseDouble(questions.get(0).getQuiz().getMaxMarks()) / questions.size();
                marksGot += marksSingle;
            }
            if ( q.getGivenAnswer() != null){
                attempt++;
            }
        };
        Map<String,Object> map = Map.of("marksGot",marksGot,"correctAnswer",correctAnswer,"attempt",attempt);
        return ResponseEntity.ok(map);
    }
}
