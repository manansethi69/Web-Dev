package com.community.backend;

import com.community.backend.model.ForgotPassword;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class ForgotPasswordTest {

    @Test
    public void testGettersAndSetters() {
        ForgotPassword forgotPassword = new ForgotPassword();
        forgotPassword.setEmail("test@example.com");
        forgotPassword.setNewPassword("newpassword");
        forgotPassword.setSecurityAnswer("answer");

        assertEquals("test@example.com", forgotPassword.getEmail());
        assertEquals("newpassword", forgotPassword.getNewPassword());
        assertEquals("answer", forgotPassword.getSecurityAnswer());
    }
}
