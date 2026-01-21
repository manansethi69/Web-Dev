package com.community.backend.service;

import com.community.backend.model.User;
import com.community.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) {
        user.setRole("newbie");
        user.setActivated(false);
        return userRepository.save(user);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }
    public Optional<User> findByUsername(String username){
        return userRepository.findByUsername(username);
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }
    public User updateUser(Long id,User user) {
        User userToUpdate = userRepository.findById(id).get();
        userToUpdate.setFirstName(user.getFirstName());
        userToUpdate.setLastName(user.getLastName());
        userToUpdate.setEmail(user.getEmail());
        if(user.getPassword() != null) {
            userToUpdate.setPassword(user.getPassword());
        }
        userToUpdate.setSecurityAnswer(user.getSecurityAnswer());
        userToUpdate.setStatus(user.getStatus());
        userToUpdate.setBio(user.getBio());
        userToUpdate.setUsername(user.getUsername());

        return userRepository.save(userToUpdate);
    }

    public User deleteUser(Long id) {
        User userToDelete = userRepository.findById(id).get();
        userRepository.delete(userToDelete);
        return userToDelete;
    }

    public List<User> findNotActivatedUsers() {
        return userRepository.findByIsActivatedFalse();
    }
    public User save(User user) {
        return userRepository.save(user);
    }
}

