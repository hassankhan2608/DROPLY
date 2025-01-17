import axios from 'axios';

const API_URL = 'https://api.mail.tm';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getDomains = async () => {
  try {
    const response = await api.get('/domains');
    if (!response.data['hydra:member']?.length) {
      throw new Error('No available domains');
    }
    return response.data;
  } catch (error) {
    throw new Error('Unable to fetch domains. Please try again later.');
  }
};

export const createAccount = async (address, password) => {
  try {
    const response = await api.post('/accounts', {
      address,
      password,
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 422) {
      throw new Error('Email address already taken. Trying again...');
    }
    throw new Error('Failed to create account. Please try again.');
  }
};

export const login = async (address, password) => {
  try {
    const response = await api.post('/token', {
      address,
      password,
    });
    if (!response.data.token) {
      throw new Error('Invalid login response');
    }
    return response.data;
  } catch (error) {
    throw new Error('Failed to login. Please try again.');
  }
};

export const getMessages = async (token) => {
  try {
    const response = await api.get('/messages', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch messages. Please try again.');
  }
};

export const getMessage = async (token, messageId) => {
  try {
    const response = await api.get(`/messages/${messageId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch message content. Please try again.');
  }
};

export const getAccount = async (token) => {
  try {
    const response = await api.get('/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch account details. Please try again.');
  }
};

export const deleteAccount = async (token, accountId) => {
  try {
    await api.delete(`/accounts/${accountId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error('Unauthorized. Please log in again.');
    } else if (error.response?.status === 404) {
      throw new Error('Account not found.');
    }
    throw new Error('Failed to delete account. Please try again.');
  }
};

// Additional API methods we could use:
export const deleteMessage = async (token, messageId) => {
  try {
    await api.delete(`/messages/${messageId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error('Failed to delete message. Please try again.');
  }
};

export const markMessageAsRead = async (token, messageId) => {
  try {
    await api.patch(`/messages/${messageId}`, 
      { seen: true },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    throw new Error('Failed to mark message as read. Please try again.');
  }
};

export const deleteAllMessages = async (token) => {
  try {
    await api.delete('/messages', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error('Failed to delete all messages. Please try again.');
  }
};