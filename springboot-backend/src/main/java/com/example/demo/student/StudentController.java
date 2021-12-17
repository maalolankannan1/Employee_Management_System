package com.example.demo.student;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "api/v1/student")

public class StudentController {

    private final StudentService studentservice;

    @Autowired
    public StudentController(StudentService studentservice) {
        this.studentservice = studentservice;
    }

    @GetMapping
    public List<Student> getStudents() {
        return studentservice.getStudents();
    }

    @PostMapping
    public void registerNewStudent(@RequestBody Student student) {
        studentservice.addNewStudent(student);
    }

    @DeleteMapping(path = "{studentID}")
    public void deleteStudent(@PathVariable("studentID") Long id) {
        studentservice.deleteStudent(id);
    }

    @PutMapping(path = "{studentID}")
    public void updateStudent(@PathVariable("studentID") Long id,
                              @RequestParam(required = false) String name,
                              @RequestParam(required = false) String email) {
        studentservice.updateStudent(id, name, email);
    }
}
