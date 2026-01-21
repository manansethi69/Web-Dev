package com.community.backend;

import com.community.backend.controller.FriendRequestController;
import com.community.backend.controller.PostController;
import com.community.backend.controller.UserController;
import com.community.backend.model.AddFriendRequestBody;
import com.community.backend.model.ForgotPassword;
import com.community.backend.model.FriendRequest;
import com.community.backend.model.Post;
import com.community.backend.model.PostRequest;
import com.community.backend.model.User;
import com.community.backend.service.FriendRequestService;
import com.community.backend.service.PostService;
import com.community.backend.service.UserService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@SpringBootTest
class BackendApplicationTests {

	@Mock
	private UserService userService;

	@Mock
	private FriendRequestService friendRequestService;

	@Mock
	private PostService postService;

	@InjectMocks
	private UserController userController;

	@InjectMocks
	private FriendRequestController friendRequestController;

	@InjectMocks
	private PostController postController;

	@Test
	void contextLoads() {
	}

	// UserController Tests

	@Test
	void testRegisterUser_InvalidEmail() {
		User user = new User();
		user.setEmail("test@gmail.com");
		user.setPassword("Valid1Password!");

		ResponseEntity<?> response = userController.registerUser(user);
		assertEquals(400, response.getStatusCodeValue());
		assertEquals("Email must end with @dal.ca", response.getBody());
	}

	@Test
	void testRegisterUser_InvalidPass() {
		User user = new User();
		user.setEmail("test@dal.ca");
		user.setPassword("abc");

		ResponseEntity<?> response = userController.registerUser(user);
		assertEquals(400, response.getStatusCodeValue());
		assertEquals("Password must be at least 8 characters, with at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.", response.getBody());
	}

	@Test
	void testRegisterUser_Success() {
		User user = new User();
		user.setEmail("test@dal.ca");
		user.setPassword("Valid123!");
		user.setSecurityAnswer("Answer");

		when(userService.registerUser(user)).thenReturn(user);
		ResponseEntity<?> response = userController.registerUser(user);
		assertEquals(200, response.getStatusCodeValue());
	}

	@Test
	void testLoginUser_Success() {
		User user = new User();
		user.setEmail("test@dal.ca");
		user.setPassword("Valid123!");

		when(userService.findByEmail(user.getEmail())).thenReturn(Optional.of(user));
		ResponseEntity<?> response = userController.loginUser(user);
		assertEquals(200, response.getStatusCodeValue());
	}

	@Test
	void testLoginUser_NonExistEmail() {
		User user = new User();
		user.setEmail("nonexistent@dal.ca");
		user.setPassword("Valid123!");

		when(userService.findByEmail(user.getEmail())).thenReturn(Optional.empty());
		ResponseEntity<?> response = userController.loginUser(user);
		assertEquals(400, response.getStatusCodeValue());
		assertEquals("Invalid email or password", response.getBody());
	}

	@Test
	void testLoginUser_NullEmail() {
		User user = new User();
		user.setEmail(null);
		user.setPassword("Valid123!");

		ResponseEntity<?> response = userController.loginUser(user);
		assertEquals(400, response.getStatusCodeValue());
		assertEquals("Invalid email or password", response.getBody());
	}

	@Test
	void testLoginUser_WrongPassword() {
		User user = new User();
		user.setEmail("test@dal.ca");
		user.setPassword("CorrectPassword@01");

		User loginUser = new User();
		loginUser.setEmail("test@dal.ca");
		loginUser.setPassword("WrongPassword");

		when(userService.findByEmail(user.getEmail())).thenReturn(Optional.of(user));
		ResponseEntity<?> response = userController.loginUser(loginUser);
		assertEquals(400, response.getStatusCodeValue());
		assertEquals("Invalid email or password", response.getBody());
	}

	@Test
	void testForgotPass_Success() {
		User user = new User();
		user.setEmail("test@dal.ca");
		user.setSecurityAnswer("MyAnswer");
		user.setPassword("Password1!");

		ForgotPassword forgotPassword = new ForgotPassword();
		forgotPassword.setEmail("test@dal.ca");
		forgotPassword.setSecurityAnswer("MyAnswer");
		forgotPassword.setNewPassword("NewPassword1!");

		when(userService.findByEmail(user.getEmail())).thenReturn(Optional.of(user));
		ResponseEntity<?> response = userController.forgotPassword(forgotPassword);
		assertEquals(200, response.getStatusCodeValue());
		assertEquals("Password reset successful", response.getBody());
	}

	@Test
	void testForgotPass_WrongSecurityAnswer() {
		User user = new User();
		user.setEmail("test@dal.ca");
		user.setSecurityAnswer("WrongAnswer");

		ForgotPassword forgotPassword = new ForgotPassword();
		forgotPassword.setEmail("test@dal.ca");
		forgotPassword.setSecurityAnswer("MyAnswer");
		forgotPassword.setNewPassword("NewPassword1!");

		when(userService.findByEmail(user.getEmail())).thenReturn(Optional.of(user));
		ResponseEntity<?> response = userController.forgotPassword(forgotPassword);
		assertEquals(400, response.getStatusCodeValue());
		assertEquals("Invalid security answer", response.getBody());
	}

	@Test
	void testForgotPass_NonExistEmail() {
		ForgotPassword forgotPassword = new ForgotPassword();
		forgotPassword.setEmail("nonexistent@dal.ca");
		forgotPassword.setSecurityAnswer("MyAnswer");
		forgotPassword.setNewPassword("NewPassword1!");

		when(userService.findByEmail(forgotPassword.getEmail())).thenReturn(Optional.empty());
		ResponseEntity<?> response = userController.forgotPassword(forgotPassword);
		assertEquals(400, response.getStatusCodeValue());
		assertEquals("Invalid security answer", response.getBody());
	}

	@Test
	public void testUpdateUserSuccess() {
		User user = new User();
		user.setId(1L);
		user.setFirstName("First");
		user.setLastName("Last");
		user.setEmail("test@dal.ca");
		when(userService.updateUser(anyLong(), any(User.class))).thenReturn(user);

		User userDetails = new User();
		userDetails.setFirstName("NewFirst");
		userDetails.setLastName("NewLast");
		userDetails.setEmail("newtest@dal.ca");

		User response = userController.updateUser(1L, userDetails);
		assertEquals(user, response);
	}

	@Test
	public void testDeleteUserSuccess() {
		User user = new User();
		user.setId(1L);
		when(userService.findById(1L)).thenReturn(Optional.of(user));

		userController.deleteUser(1L);

		verify(userService, times(1)).deleteUser(1L);
	}

	@Test
	public void testGetRecommendationsSuccess() {
		User user1 = new User();
		user1.setId(1L);
		User user2 = new User();
		user2.setId(2L);
		User user3 = new User();
		user3.setId(3L);
		when(userService.findById(1L)).thenReturn(Optional.of(user1));
		when(userService.findAll()).thenReturn(Arrays.asList(user1, user2, user3));
		when(friendRequestService.getAcceptedFriendRequests(user1)).thenReturn(Arrays.asList());

		ResponseEntity<?> response = userController.getRecommendations(1L);

		assertEquals(200, response.getStatusCodeValue());
		List<User> recommendations = (List<User>) response.getBody();
		assertEquals(2, recommendations.size());
	}

	@Test
	public void testUpdateUser_NotFound() {
		User userDetails = new User();
		userDetails.setFirstName("NewFirst");
		userDetails.setLastName("NewLast");
		userDetails.setEmail("newtest@dal.ca");

		when(userService.updateUser(anyLong(), any(User.class))).thenReturn(null);

		User response = userController.updateUser(1L, userDetails);
		assertNull(response);
	}

	@Test
	public void testDeleteUser_NotFound() {
		when(userService.findById(1L)).thenReturn(Optional.empty());

		userController.deleteUser(1L);

		verify(userService, times(0)).deleteUser(1L);
	}

	// FriendRequestController Tests

	public void testSendFriendRequest_Success() {
		User sender = new User();
		sender.setId(1L);
		User receiver = new User();
		receiver.setId(2L);

		FriendRequest friendRequest = new FriendRequest();
		friendRequest.setSender(sender);
		friendRequest.setReceiver(receiver);

		AddFriendRequestBody requestBody = new AddFriendRequestBody();
		requestBody.setSenderId(1L);
		requestBody.setReceiverId(2L);

		when(userService.findById(1L)).thenReturn(Optional.of(sender));
		when(userService.findById(2L)).thenReturn(Optional.of(receiver));
		when(friendRequestService.sendFriendRequest(any(User.class), any(User.class))).thenReturn(friendRequest);

		ResponseEntity<FriendRequest> response = friendRequestController.sendFriendRequest(requestBody);
		assertEquals(200, response.getStatusCodeValue());
		assertEquals(friendRequest, response.getBody());
	}

	@Test
	public void testSendFriendRequest_SenderNotFound() {
		AddFriendRequestBody requestBody = new AddFriendRequestBody();
		requestBody.setSenderId(1L);
		requestBody.setReceiverId(2L);

		when(userService.findById(1L)).thenReturn(Optional.empty());
		when(userService.findById(2L)).thenReturn(Optional.of(new User()));

		ResponseEntity<FriendRequest> response = friendRequestController.sendFriendRequest(requestBody);
		assertEquals(400, response.getStatusCodeValue());
	}

	@Test
	public void testSendFriendRequest_ReceiverNotFound() {
		AddFriendRequestBody requestBody = new AddFriendRequestBody();
		requestBody.setSenderId(1L);
		requestBody.setReceiverId(2L);

		when(userService.findById(1L)).thenReturn(Optional.of(new User()));
		when(userService.findById(2L)).thenReturn(Optional.empty());

		ResponseEntity<FriendRequest> response = friendRequestController.sendFriendRequest(requestBody);
		assertEquals(400, response.getStatusCodeValue());
	}

	@Test
	public void testGetPendingFriendRequests_Success() {
		User receiver = new User();
		receiver.setId(1L);
		FriendRequest friendRequest1 = new FriendRequest();
		FriendRequest friendRequest2 = new FriendRequest();

		when(userService.findById(1L)).thenReturn(Optional.of(receiver));
		when(friendRequestService.getFriendRequests(receiver)).thenReturn(Arrays.asList(friendRequest1, friendRequest2));

		ResponseEntity<List<FriendRequest>> response = friendRequestController.getPendingFriendRequests(1L);
		assertEquals(200, response.getStatusCodeValue());
		assertEquals(2, response.getBody().size());
	}

	@Test
	public void testGetPendingFriendRequests_InvalidUser() {
		when(userService.findById(1L)).thenReturn(Optional.empty());

		ResponseEntity<List<FriendRequest>> response = friendRequestController.getPendingFriendRequests(1L);
		assertEquals(404, response.getStatusCodeValue());
	}

	@Test
	public void testAcceptFriendRequest_Success() {
		FriendRequest friendRequest = new FriendRequest();
		friendRequest.setId(1L);

		when(friendRequestService.findById(1L)).thenReturn(Optional.of(friendRequest));
		when(friendRequestService.acceptFriendRequest(friendRequest)).thenReturn(friendRequest);

		ResponseEntity<FriendRequest> response = friendRequestController.acceptFriendRequest(1L);
		assertEquals(200, response.getStatusCodeValue());
		assertTrue(!response.getBody().isStatus());
	}

	@Test
	public void testAcceptFriendRequest_InvalidRequest() {
		when(friendRequestService.findById(1L)).thenReturn(Optional.empty());

		ResponseEntity<FriendRequest> response = friendRequestController.acceptFriendRequest(1L);
		assertEquals(404, response.getStatusCodeValue());
	}

	@Test
	public void testRejectFriendRequest_Success() {
		FriendRequest friendRequest = new FriendRequest();
		friendRequest.setId(1L);

		when(friendRequestService.findById(1L)).thenReturn(Optional.of(friendRequest));

		ResponseEntity<FriendRequest> response = friendRequestController.rejectFriendRequest(1L);
		assertEquals(200, response.getStatusCodeValue());
		verify(friendRequestService, times(1)).rejectFriendRequest(friendRequest);
	}

	@Test
	public void testRejectFriendRequest_InvalidRequest() {
		when(friendRequestService.findById(1L)).thenReturn(Optional.empty());

		ResponseEntity<FriendRequest> response = friendRequestController.rejectFriendRequest(1L);
		assertEquals(404, response.getStatusCodeValue());
	}

	@Test
	void testGetFriends_Success() {
		User user = new User();
		user.setId(1L);
		User friend1 = new User();
		friend1.setId(2L);
		User friend2 = new User();
		friend2.setId(3L);

		when(userService.findById(1L)).thenReturn(Optional.of(user));
		when(friendRequestService.getFriends(user)).thenReturn(Arrays.asList(friend1, friend2));

		ResponseEntity<List<User>> response = friendRequestController.getFriends(1L);
		assertEquals(200, response.getStatusCodeValue());
		assertEquals(2, response.getBody().size());
	}

	@Test
	void testGetFriends_InvalidUser() {
		when(userService.findById(1L)).thenReturn(Optional.empty());

		ResponseEntity<List<User>> response = friendRequestController.getFriends(1L);
		assertEquals(404, response.getStatusCodeValue());
	}

	@Test
	void testUnfriend_Success() {
		User user = new User();
		user.setId(1L);
		User friend = new User();
		friend.setId(2L);

		when(userService.findById(1L)).thenReturn(Optional.of(user));
		when(userService.findById(2L)).thenReturn(Optional.of(friend));

		ResponseEntity<Void> response = friendRequestController.unfriend(1L, 2L);
		assertEquals(200, response.getStatusCodeValue());
		verify(friendRequestService, times(1)).unfriend(user, friend);
	}

	@Test
	void testUnfriend_InvalidUsers() {
		when(userService.findById(1L)).thenReturn(Optional.empty());
		when(userService.findById(2L)).thenReturn(Optional.empty());

		ResponseEntity<Void> response = friendRequestController.unfriend(1L, 2L);
		assertEquals(404, response.getStatusCodeValue());
	}

	@Test
	void testGetPendingFriendRequests_NoRequests() {
		User receiver = new User();
		receiver.setId(1L);

		when(userService.findById(1L)).thenReturn(Optional.of(receiver));
		when(friendRequestService.getFriendRequests(receiver)).thenReturn(Arrays.asList());

		ResponseEntity<List<FriendRequest>> response = friendRequestController.getPendingFriendRequests(1L);
		assertEquals(200, response.getStatusCodeValue());
		assertEquals(0, response.getBody().size());
	}

	// PostController Tests

	@Test
	public void testCreatePost_Success() {
		User user = new User();
		user.setId(1L);

		PostRequest postRequest = new PostRequest();
		postRequest.setUserId(1L);
		postRequest.setContent("This is a post");
		postRequest.setTitle("Post Title");
		postRequest.setMediaUrl("http://example.com/media");

		Post post = new Post();
		post.setId(1L);
		post.setContent("This is a post");
		post.setTitle("Post Title");
		post.setMediaUrl("http://example.com/media");

		when(userService.findById(1L)).thenReturn(Optional.of(user));
		when(postService.createPost(1L, "This is a post", "Post Title", "http://example.com/media")).thenReturn(post);

		ResponseEntity<?> response = postController.createPost(postRequest);
		assertEquals(200, response.getStatusCodeValue());
		assertEquals(post, response.getBody());
	}

	@Test
	public void testCreatePost_UserNotFound() {
		PostRequest postRequest = new PostRequest();
		postRequest.setUserId(1L);

		when(userService.findById(1L)).thenReturn(Optional.empty());

		ResponseEntity<?> response = postController.createPost(postRequest);
		assertEquals(400, response.getStatusCodeValue());
	}

	@Test
	public void testGetUserPosts_Success() {
		Post post1 = new Post();
		post1.setId(1L);
		post1.setContent("Post 1");
		Post post2 = new Post();
		post2.setId(2L);
		post2.setContent("Post 2");

		List<Post> posts = Arrays.asList(post1, post2);

		when(postService.getUserPosts(1L)).thenReturn(posts);

		ResponseEntity<?> response = postController.getUserPosts(1L);
		assertEquals(200, response.getStatusCodeValue());
		assertEquals(posts, response.getBody());
	}

	@Test
	public void testGetFeed_Success() {
		User user = new User();
		user.setId(1L);
		User friend1 = new User();
		friend1.setId(2L);
		User friend2 = new User();
		friend2.setId(3L);

		Post post1 = new Post();
		post1.setId(1L);
		post1.setContent("Friend 1's post");

		Post post2 = new Post();
		post2.setId(2L);
		post2.setContent("Friend 2's post");

		List<Post> friendPosts = Arrays.asList(post1, post2);
		List<User> friends = Arrays.asList(friend1, friend2);

		when(userService.findById(1L)).thenReturn(Optional.of(user));
		when(friendRequestService.getAcceptedFriendRequests(user)).thenReturn(Arrays.asList(
				new FriendRequest() {{ setSender(friend1); }},
				new FriendRequest() {{ setReceiver(friend2); }}
		));
		when(postService.getUserPosts(2L)).thenReturn(Arrays.asList(post1));
		when(postService.getUserPosts(3L)).thenReturn(Arrays.asList(post2));

		ResponseEntity<List<Post>> response = postController.getFeed(1L);
		assertEquals(200, response.getStatusCodeValue());
		assertEquals(friendPosts, response.getBody());
	}

	@Test
	public void testGetFeed_UserNotFound() {
		when(userService.findById(1L)).thenReturn(Optional.empty());

		ResponseEntity<List<Post>> response = postController.getFeed(1L);
		assertEquals(404, response.getStatusCodeValue());
	}

	@Test
	public void testUpdateUserRole_Success() {
		User user = new User();
		user.setId(1L);
		user.setRole("user");

		when(userService.findById(1L)).thenReturn(Optional.of(user));
		when(userService.save(user)).thenReturn(user);

		ResponseEntity<?> response = userController.updateUserRole(1L, Map.of("role", "admin"));
		assertEquals(200, response.getStatusCodeValue());
		assertEquals(user, response.getBody());
	}

	@Test
	public void testUpdateUserRole_UserNotFound() {
		when(userService.findById(1L)).thenReturn(Optional.empty());

		ResponseEntity<?> response = userController.updateUserRole(1L, Map.of("role", "admin"));
		assertEquals(404, response.getStatusCodeValue());
	}

	@Test
	public void testActivateUser_Success() {
		User user = new User();
		user.setId(1L);
		user.setActivated(false);

		when(userService.findById(1L)).thenReturn(Optional.of(user));
		when(userService.save(user)).thenReturn(user);

		ResponseEntity<?> response = userController.activateUser(1L);
		assertEquals(200, response.getStatusCodeValue());
		assertTrue(((User) response.getBody()).isActivated());
	}

	@Test
	public void testActivateUser_UserNotFound() {
		when(userService.findById(1L)).thenReturn(Optional.empty());

		ResponseEntity<?> response = userController.activateUser(1L);
		assertEquals(404, response.getStatusCodeValue());
	}

	@Test
	void testGetRecommendations_Success() {
		User currentUser = new User();
		currentUser.setId(1L);

		User friend = new User();
		friend.setId(2L);

		User recommendedUser = new User();
		recommendedUser.setId(3L);

		List<User> allUsers = Arrays.asList(currentUser, friend, recommendedUser);

		when(userService.findById(1L)).thenReturn(Optional.of(currentUser));
		when(userService.findAll()).thenReturn(allUsers);
		when(friendRequestService.getAcceptedFriendRequests(currentUser)).thenReturn(Arrays.asList(
				new FriendRequest() {{ setSender(friend); }}
		));

		ResponseEntity<?> response = userController.getRecommendations(1L);
		List<User> responseBody = (List<User>) response.getBody();
		assertEquals(1, responseBody.size());
		assertEquals(recommendedUser, responseBody.get(0));
	}

	@Test
	void testGetRecommendations_UserNotFound() {
		when(userService.findById(1L)).thenReturn(Optional.empty());

		ResponseEntity<?> response = userController.getRecommendations(1L);
		assertEquals(404, response.getStatusCodeValue());
	}
}
