import axios from './http'

export const UserDetail = async () => {
  const res = await axios.get('/user/detail')
  return res.data
}

export const UpdateProfile = async (payload) => {
  const res = await axios.put('/user/update/profile', payload)
  if (res.status === 200) {
    return res.data
  } else {
    throw new Error('등록 실패')
  }
}

export const UpdateImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  try {
    const token = localStorage.getItem('accessToken');
    const res = await fetch('/user/update/profileUrl', {
      method: 'PUT',
      body: formData,
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${token}`, 
      },
    });
    return res.data;
  } catch {
    throw new Error('등록 실패');
  }
}

export const DeleteUser = async () => {
  const res = await axios.delete(`/user/delete`)
  if (res.status === 200) {
    return true
  } else {
    throw new Error('삭제 실패')
  }
}
