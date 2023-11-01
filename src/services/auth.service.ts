import User from '../models/user.model';
import BadRequestError from '../core/exceptions/BadRequestError';
import bcrypt from 'bcrypt';
import * as jwt from '../core/utils/jwt';
import { LoginInterface } from '../core/interfaces';

export const login = async ({email, password}: LoginInterface) => {
  const user = await User.findOne({ email: email});
    if(!user) {
      throw new BadRequestError('Incorrect email or password.')
    }
    
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if(!isPasswordMatched) {
      throw new BadRequestError('Incorrect email or password.')
    }

    const payload = {user_id: user.id, email: user.email, full_name: user.full_name};
    const refreshToken = jwt.generateRefreshToken(payload);
    const accessToken = jwt.generateAccessToken(payload);
    
    return {...payload, accessToken, refreshToken};
}