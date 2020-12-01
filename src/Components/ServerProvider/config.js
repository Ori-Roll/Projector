import { db_getLoggedInUser } from './auth';

async function initUser() {
  let user = null;
  if (document.cookie && document.cookie.startsWith('token')) {
    try {
      const res = await db_getLoggedInUser();
      user = res.data;
    } catch (error) {
      console.log('error.net', error);
      // TODO: This needs to be addressed
      user = null;
      console.error('No user with that token', error);
    }
  }
  return user;
}

export { initUser };
