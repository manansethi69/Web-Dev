package com.community.backend.repository;

import com.community.backend.model.FriendRequest;
import com.community.backend.model.RequestStatus;
import com.community.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FriendRequestRepository extends JpaRepository<FriendRequest, Long> {
    List<FriendRequest> findByReceiverAndAccepted(User receiver, boolean accepted);
    List<FriendRequest> findBySenderAndAccepted(User sender, boolean accepted);
    FriendRequest findBySenderAndReceiver(User sender, User receiver);

}
