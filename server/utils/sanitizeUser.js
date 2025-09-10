const sanitizeUser = (user) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    isVerified: user.isVerified,
  };
};

export default sanitizeUser;
