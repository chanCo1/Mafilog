import { NextResponse } from 'next/server';

/** 실패 response */
export const errorResponse = (
  message: string = 'server error',
  status: number = 500,
) => {
  return NextResponse.json({ message }, { status });
};

/** 성공 response */
export const successResponse = (data?: any, status: number = 200) => {
  return NextResponse.json(data ? { data } : { message: 'success' }, {
    status,
  });
};
