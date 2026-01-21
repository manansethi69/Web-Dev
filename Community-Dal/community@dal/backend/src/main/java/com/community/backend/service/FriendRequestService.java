package com.community.backend.service;

import com.community.backend.model.FriendRequest;
import com.community.backend.model.RequestStatus;
import com.community.backend.model.User;
import com.community.backend.repository.FriendRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FriendRequestService {

    @Autowired
    private FriendRequestRepository friendRequestRepository;

    public FriendRequest sendFriendRequest(User sender, User receiver) {
        if(sender.equals(receiver)) { return null; }

        // Check if a friend request already exists between sender and receiver
        FriendRequest existingRequest = friendRequestRepository.findBySenderAndReceiver(sender, receiver);

        if (existingRequest != null) {
            // Return the existing request if found
            return existingRequest;
        }


        FriendRequest friendRequest = new FriendRequest();
        friendRequest.setSender(sender);
        friendRequest.setReceiver(receiver);
        friendRequest.setStatus(false);
        return friendRequestRepository.save(friendRequest);
    }

    public List<FriendRequest> getFriendRequests(User receiver) {
        return friendRequestRepository.findByReceiverAndAccepted(receiver, false);
    }

    public FriendRequest acceptFriendRequest(FriendRequest friendRequest) {
        friendRequest.setStatus(true);
        return friendRequestRepository.save(friendRequest);
    }

    public void rejectFriendRequest(FriendRequest friendRequest) {
        friendRequestRepository.delete(friendRequest);
    }

    public Optional<FriendRequest> findById(Long id) {
        return friendRequestRepository.findById(id);
    }

    public List<FriendRequest> getAcceptedFriendRequests(User user) {
        List<FriendRequest> sentRequests = friendRequestRepository.findBySenderAndAccepted(user, true);
        List<FriendRequest> receivedRequests = friendRequestRepository.findByReceiverAndAccepted(user, true);
        sentRequests.addAll(receivedRequests);
        return sentRequests;
    }

    public List<User> getFriends(User user) {
        List<FriendRequest> acceptedRequests = getAcceptedFriendRequests(user);
        return acceptedRequests.stream()
                .map(request -> request.getSender().equals(user) ? request.getReceiver() : request.getSender())
                .collect(Collectors.toList());
    }

    public void unfriend(User user, User friend) {
        FriendRequest friendRequest = friendRequestRepository.findBySenderAndReceiver(user, friend);
        if (friendRequest == null) {           friendRequest = friendRequestRepository.findBySenderAndReceiver(friend, user);
        }

        if (friendRequest != null) {
            friendRequestRepository.delete(friendRequest);
        }
    }


}
