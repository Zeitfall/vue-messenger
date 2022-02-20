const chatSetCurrent = chat => {
  localStorage.setItem('CURRENT_CHAT', chat.key);
};

export default chatSetCurrent;
