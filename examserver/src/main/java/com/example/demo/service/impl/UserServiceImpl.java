package com.example.demo.service.impl;

import com.example.demo.helper.UserFoundException;
import com.example.demo.model.User;
import com.example.demo.model.UserRole;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;
    // creating user
    @Override
    public User createUser(User user, Set<UserRole> userRoles) throws UserFoundException {
        User local = userRepository.findByUsername(user.getUsername());
        if (local != null){
            System.out.println("User is already there!!");
            throw new UserFoundException();
        }else{
            for (UserRole ur: userRoles) {
                roleRepository.save(ur.getRole());
            }
            user.getUserRoles().addAll(userRoles);
            local = userRepository.save(user);
        }
        return local;
    }
    // getting user by username
    @Override
    public User getUser(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }
}
