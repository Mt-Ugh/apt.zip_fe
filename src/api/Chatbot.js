import http from './http';

export const sendMessage = async (messages) => {
  try {
    const response = await http.post('/chat/chatbot', { messages }, { timeout: 20000 });
    return response.data;
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      return '죄송합니다, 요청 시간이 초과되었습니다. 다시 시도해 주세요.';
    }
    return '죄송합니다, 요청을 처리할 수 없습니다. 다시 시도해 주세요.';
  }
};