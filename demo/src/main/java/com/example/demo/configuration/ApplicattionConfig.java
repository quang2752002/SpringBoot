package com.example.demo.configuration;

import com.example.demo.entity.Users;
import com.example.demo.enums.Roles;
import com.example.demo.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import lombok.var;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Role;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.HashSet;

@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
@Slf4j
public class ApplicattionConfig {

      PasswordEncoder passwordEncoder;

    @Bean
    ApplicationRunner applicationRunner(UserRepository userRepository){
        return args -> {
            if (!userRepository.findByUsername("Admin").isPresent()) {
                var roles=new HashSet<String>();
                roles.add(Roles.ADMIN.name());
               Users users=Users.builder()
                       .username("admin")
                       .password(passwordEncoder.encode("admin"))
                      // .roles(roles)
                       .build();
               userRepository.save(users);
               log.warn("admin user has been created  with default password: admin");
           }
        };
    }
}
