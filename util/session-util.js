import config from '../properties/config';

export default {
  setSession(res, token) {
    res.cookie('token', token, {
      secure: true,
      httpOnly: true,
      maxAge: config.get('session:ttl') * 60 * 1000,
    });
  },
};
