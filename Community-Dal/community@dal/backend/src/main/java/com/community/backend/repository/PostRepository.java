package com.community.backend.repository;

import com.community.backend.model.Post;
import com.community.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByUserId(Long userId);
    List<Post> findByUserIdIn(List<Long> userIds);
    List<Post> findByUser(User user);

}