package net.javaguides.ems.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "leaving_time")
    private String leaving ;

    @Column(name = "leaving_status")
    private String status;

    @Column(name = "phone_number")
    private String phone;

    @Column(name = "email_id", nullable = false, unique = true)
    private String email;

    }


