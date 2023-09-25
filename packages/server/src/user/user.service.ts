import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import AppResponse from '../lib/app.response';
import { AppError } from '../lib/error';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly db: PrismaService) {}

  public async updateUserProfile(userId: number, body: UpdateProfileDto) {
    const { profileImage, displayName, introduction } = body;

    try {
      const updateProfileField: Prisma.UserUpdateInput = {};

      /** TODO: 닉네임 변경권 아이템이 있을 경우에만 가능하도록 수정해야 함. */
      if (displayName !== '') {
        updateProfileField.displayName = displayName;
        updateProfileField.displayNameChangedAt = new Date();
      }

      if (introduction !== '') {
        updateProfileField.introduction = introduction;
      }

      if (profileImage !== '') {
        updateProfileField.profileImage = profileImage;
      }

      await this.db.user.update({
        where: {
          id: userId,
        },
        data: updateProfileField,
      });

      return new AppResponse({
        name: '',
        statusCode: 200,
        message: '',
        payload: null,
      });
    } catch (e) {
      throw new AppError('Unknown');
    }
  }
}
