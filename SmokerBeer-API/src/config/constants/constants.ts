import {  SetMetadata } from "@nestjs/common";


export const jwtConstants = {
  secret: 'f9d1bbb2d69379c579135247edda14b365847c5d0f9774ffbea4893537a386e9',
};

// Decorator para definir a rota como pública
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);


