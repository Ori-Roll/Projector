import axios from 'axios';
import { serverURI } from '../misc/defaults/defaults';

async function db_getUsersByEmailQuery(query) {
  try {
    const response = await axios.get(
      `http://${serverURI}/api/v0/users?sort=name&email=${query}`
    );
    return response.data.data;
  } catch (error) {
    console.error(error.response.data);
  }
}

export { db_getUsersByEmailQuery };
