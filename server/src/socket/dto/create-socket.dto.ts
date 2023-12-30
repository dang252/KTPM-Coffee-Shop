import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class userConnectRequest {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}

export class NotificationRequest {
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  userId: number;

  createdAt: Date;
}
