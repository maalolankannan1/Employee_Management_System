package com.example.demo.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    private final StudentRepository studentRepository;


    public List<Student> getStudents() {
        return studentRepository.findAll();
    }

    public void addNewStudent(Student student) {
        Optional<Student> studentByEmail =  studentRepository.findStudentByEmail(student.getEmail());
        if(studentByEmail.isPresent()) {
            throw new IllegalStateException("Email already Taken!");
        }
        studentRepository.save(student);
        System.out.println(student);
    }

    public void deleteStudent(Long id) {

        boolean exists = studentRepository.existsById(id);
        if(!exists) {
            throw new IllegalStateException("Student with ID "+ id + " not found");
        }
        studentRepository.deleteById(id);
    }

    @Transactional
    public void updateStudent(Long id, String name, String email) {

        Optional<Student> studentById = studentRepository.findById(id);
        if(!studentById.isPresent()) {
            throw new IllegalStateException("Student with ID "+ id + "does not exist");
        }
        Student foundStudent = studentRepository.getById(id);
        if( name != null && name.length()>0 && !Objects.equals(foundStudent.getName(), name)) {
            foundStudent.setName(name);
        }
        if( email != null && email.length()>0 && !Objects.equals(foundStudent.getEmail(), email)) {
            foundStudent.setEmail(email);
        }

    }
}
