package com.community.backend.service;
import com.community.backend.model.Post;
import com.community.backend.model.User;
import com.community.backend.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserService userService;

    public Post createPost(Long userId, String content,String title,String mediaUrl) {
        Optional<User> user = userService.findById(userId);
        if(user.isEmpty()) return null;
        Post post = new Post();
        post.setContent(content);
        post.setTitle(title);
        post.setMediaUrl(mediaUrl);
        post.setUser(user.orElse(null));

        return postRepository.save(post);
    }

    public List<Post> getUserPosts(Long userId) {
        return postRepository.findByUserId(userId);
    }
}
