import axios from 'axios';
import { db_getUserProjects } from './projects';
import { serverPort } from '../misc/defaults/defaults';

axios.defaults.withCredentials = true;

// TODO: Wrap all endpoints in a general error response that gets no server response and other such responses

async function db_registerUser(name, email, password) {
  try {
    const response = await axios.post(
      `${serverPort}/api/v0/auth/register`,
      {
        name: name,
        email: email,
        password: password,
        role: 'user',
      },
      { headers: { 'Content-Type': 'application/json' } }
    );
    console.log('this user res ', response);
    document.cookie = `token: ${response.data.token}`;
    return response;
  } catch (error) {
    if (error.response.data.error === 'Duplicate field value enterd') {
      alert(
        'An error occurred. It is probably because a user with this email address already exists'
      );
    }
    console.error(error.response.data);
  }
}

async function db_loginUser(email, password) {
  try {
    const response = await axios.post(
      `${serverPort}/api/v0/auth/login`,
      {
        email: email,
        password: password,
      },
      { headers: { 'Content-Type': 'application/json' } }
    );
    console.log('Login response.data.token - got: ', response.data.token);
    //document.cookie = `token: ${response.data.token}`;
    return response.data;
  } catch (error) {
    console.error(error.response.data);
  }
}

// TODO: Theres an issue here sometimes after register - fix this
async function db_logoutUser() {
  try {
    const response = await axios.get(`${serverPort}/api/v0/auth/logout`);
    return response.data;
  } catch (error) {
    console.error(error.response.data);
  }
}

async function db_getLoggedInUser() {
  console.log('token on send is ', document.cookie);
  try {
    const response = await axios.get(`${serverPort}/api/v0/auth/me`);
    if (response) return response.data;
  } catch (error) {
    console.error('error is ', error);
  }
}

async function db_forgotUserPassword(email) {
  try {
    const response = await axios.post(
      `${serverPort}/api/v0/auth/forgotpassword`,
      {
        email: email,
      },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data;
  } catch (error) {
    console.error(error.response.data);
  }
}

async function db_resetUserPassword(resetPasswordToken, newPassword) {
  // resetPasswordToken was sent by mail
  try {
    const response = await axios.put(
      `${serverPort}/api/v0/auth/resetpassword/${resetPasswordToken}`,
      {
        password: newPassword,
      },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data;
  } catch (error) {
    console.error(error.response.data);
  }
}

async function db_updateUserDetails(newDetails) {
  try {
    const response = await axios.put(
      `${serverPort}/api/v0/auth/updatedetails`,
      newDetails,
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data;
  } catch (error) {
    console.error(error.response.data);
  }
}

async function db_uploadUserPhoto(photo) {
  var formData = new FormData();
  formData.append('image', photo);

  try {
    const response = await axios.put(
      `${serverPort}/api/v0/auth/userPhotoUpload`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return response.data;
  } catch (error) {
    console.error(error.response.data);
  }
}

async function db_updateUserPassword(currentPassword, newPassword) {
  try {
    const response = await axios.put(
      `${serverPort}/api/v0/auth/updatepassword`,
      {
        currentPassword: currentPassword,
        newPassword: newPassword,
      },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data;
  } catch (error) {
    console.error(error.response.data);
  }
}

async function db_getApprovingUsers() {
  try {
    const response = await axios.get(
      `${serverPort}/api/v0/auth/getApprovingUsers`
    );
    if (response) return response.data.data;
  } catch (error) {
    console.error('error is ', error.response);
  }
}

export {
  db_registerUser,
  db_loginUser,
  db_logoutUser,
  db_getLoggedInUser,
  db_forgotUserPassword,
  db_resetUserPassword,
  db_updateUserDetails,
  db_updateUserPassword,
  db_uploadUserPhoto,
  db_getApprovingUsers,
};
