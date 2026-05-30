/**
 * @file: route.ts
 * @author: chad
 * @since: 2026.05.17 ~
 * @description: 소셜 로그인 api
 */

import { prisma } from '@/shared/lib/prisma';
import jwt from 'jsonwebtoken';
import { getHexCode } from '@/shared/lib/utils';
import {
  successResponse,
  errorResponse,
} from '@/shared/backend/utils/apiResponse';

export async function POST(request: Request) {
  const { provider, providerAccountId, email, name, profileImageUrl } =
    await request.json();

  try {
    if (!provider || !providerAccountId || !email) {
      return errorResponse('입력되지 않은 항목이 있습니다.', 400);
    }

    let targetUser = null;

    // 소셜 가입 되어 있는지 확인
    const existingSocialAccount = await prisma.social.findUnique({
      where: {
        provider_providerAccountId: {
          provider,
          providerAccountId: providerAccountId.toString(),
        },
      },
      include: {
        user: true,
      },
    });

    targetUser = existingSocialAccount?.user || null;

    // 소셜에는 없는데 같은 이메일로 가입되어 있는 경우
    if (!targetUser) {
      const existingUserByEmail = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUserByEmail) {
        // 소셜에도 가입
        await prisma.social.create({
          data: {
            type: 'oauth',
            provider,
            providerAccountId: providerAccountId.toString(),
            userId: existingUserByEmail.id,
          },
        });
        targetUser = existingUserByEmail;
      }
    }

    // 신규 가입 (소셜도 없고 가입된적도 없는 이메일)
    if (!targetUser) {
      targetUser = await prisma.user.create({
        data: {
          email,
          name,
          profileImageUrl,
          hexCode: getHexCode(),
          social: {
            create: {
              type: 'oauth',
              provider,
              providerAccountId: providerAccountId.toString(),
            },
          },
        },
      });
    }

    const userInfoForToken = {
      id: targetUser.id,
      email: targetUser.email,
      name: targetUser.name,
    };

    const accessToken = jwt.sign(
      userInfoForToken,
      process.env.JWT_SECRET as string,
      { expiresIn: '30d' },
    );

    return successResponse({
      user: {
        id: targetUser.id,
        email: targetUser.email,
        name: targetUser.name,
        profileImageUrl: targetUser.profileImageUrl,
        accessToken,
        hexCode: targetUser.hexCode,
      },
    });
  } catch (error) {
    console.log('@@ 소셜로그인 실패 >>', error);
    return errorResponse();
  }
}
