package com.example.demo.student;

import java.util.ArrayList;
import java.util.List;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.Month;

@Configuration
public class StudentConfig {

    @Bean
    CommandLineRunner commandLineRunner(StudentRepository repository) {
        return args -> {
            Student mariam = new Student(
                    "Mariam",
                    "mariam@mariam.com",
                    LocalDate.of(1982, Month.APRIL, 18)
            );
            Student alex = new Student(
                    "Alex",
                    "alex@mariam.com",
                    LocalDate.of(1990, Month.DECEMBER, 28)
            );
            List<Student> l1 = new ArrayList<Student>() {
                {
                    add(mariam);
                    add(alex);
                }
            };
            repository.saveAll(l1);
        };
    }
}
