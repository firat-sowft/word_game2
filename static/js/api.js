/**
 * API service for Kelime Oyunu
 * Handles all communication with the server
 */

const API = (function() {
    // Server URL - production
    const API_URL = 'https://web-production-5639b.up.railway.app';
    
    // Generic error handler for fetch requests
    const handleError = (error) => {
        console.error('API Error:', error);
        return { success: false, error: 'Sunucu ile bağlantı kurulamadı.' };
    };

    // Parse JSON response or return error
    const parseResponse = async (response) => {
        try {
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Parse error:', error);
            return { success: false, error: 'Yanıt işlenirken hata oluştu.' };
        }
    };

    // Public methods
    return {
        // Login with email and password
        login: async (email, password) => {
            try {
                const response = await fetch(`${API_URL}/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password })
                });
                return await parseResponse(response);
            } catch (error) {
                return handleError(error);
            }
        },

        // Register new user
        register: async (formData) => {
            try {
                const response = await fetch(`${API_URL}/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
                return await parseResponse(response);
            } catch (error) {
                return handleError(error);
            }
        },

        // Send verification code for registration
        sendVerification: async (email) => {
            try {
                const response = await fetch(`${API_URL}/send-verification`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email })
                });
                return await parseResponse(response);
            } catch (error) {
                return handleError(error);
            }
        },

        // Check if email exists for password reset
        checkEmail: async (email) => {
            try {
                const response = await fetch(`${API_URL}/check-email`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email })
                });
                return await parseResponse(response);
            } catch (error) {
                return handleError(error);
            }
        },

        // Reset password
        resetPassword: async (email, verificationCode, newPassword) => {
            try {
                const response = await fetch(`${API_URL}/reset-password`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        verificationCode,
                        newPassword
                    })
                });
                return await parseResponse(response);
            } catch (error) {
                return handleError(error);
            }
        },

        // Get all words
        getWords: async () => {
            try {
                const response = await fetch(`${API_URL}/words`);
                return await parseResponse(response);
            } catch (error) {
                return handleError(error);
            }
        },

        // Add new word (admin function)
        addWord: async (word, hint, length) => {
            try {
                const response = await fetch(`${API_URL}/words`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ word, hint, length: parseInt(length) })
                });
                return await parseResponse(response);
            } catch (error) {
                return handleError(error);
            }
        },

        // Update word (admin function)
        updateWord: async (id, word, hint) => {
            try {
                const response = await fetch(`${API_URL}/words/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ word, hint })
                });
                return await parseResponse(response);
            } catch (error) {
                return handleError(error);
            }
        },

        // Delete word (admin function)
        deleteWord: async (id) => {
            try {
                const response = await fetch(`${API_URL}/words/${id}`, {
                    method: 'DELETE'
                });
                return await parseResponse(response);
            } catch (error) {
                return handleError(error);
            }
        }
    };
})();
