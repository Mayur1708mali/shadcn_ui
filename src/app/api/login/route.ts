import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function GET() {
	const cookieStore = cookies();
	const cookie = cookieStore.get('token');
	console.log(cookie);

	if (cookie === undefined) {
		return NextResponse.json(
			{ error: 'No cookies found' },
			{ status: 400 }
		);
	}

	return NextResponse.json({ cookie });
}

export async function POST(request: NextRequest) {
	const reqBody = await request.json();
	const { password } = reqBody;

	console.log(password);
	try {
		if (password !== process.env.NEXT_PUBLIC_PWD) {
			return NextResponse.json(
				{ error: 'Invalid password' },
				{ status: 400 }
			);
		}

		//create token data
		const tokenData = {
			id: password,
		};

		//create token
		const token = await jwt.sign(
			tokenData,
			process.env.NEXT_PUBLIC_TOKEN_SECRET!,
			{
				expiresIn: '1d',
			}
		);

		const response = NextResponse.json({
			message: 'Login Successful',
			success: true,
		});

		response.cookies.set('token', token, { httpOnly: true });

		return response;
	} catch (error: any) {
		console.log('Login failed', error.message);
	}
}
