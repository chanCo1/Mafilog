/**
 * @file: User.service.ts
 * @author: chad
 * @since: 2026.05.22 ~
 * @description: 유저 api service
 */

import { axiosInstanceWithAuth } from '@/shared/lib/api';

const API_URL = '/users';

class _UserService {
  /** 프로필 변경 */
  async updateProfile(userId: string, data: FormData) {
    const response = await axiosInstanceWithAuth.patch(
      `${API_URL}/${userId}/profile`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  }

  /** 비밀번호 변경 */
  async updatePassword(userId: string, data: any) {
    const response = await axiosInstanceWithAuth.patch(
      `${API_URL}${userId}/password`,
      data,
    );
    return response.data;
  }
}

const UserService = new _UserService();
export default UserService;
