import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:5000/api/community';

// Get token from storage
const getToken = async () => {
  const user = await AsyncStorage.getItem('user');
  if (user) {
    const parsedUser = JSON.parse(user);
    return parsedUser.token;
  }
  return null;
};

// Get all clubs
const getClubs = async () => {
  const response = await axios.get(API_URL + '/clubs');
  return response.data;
};

// Create a new club
const createClub = async (clubData) => {
  const token = await getToken();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + '/clubs', clubData, config);
  return response.data;
};

const communityService = {
  getClubs,
  createClub,
};

export default communityService;
