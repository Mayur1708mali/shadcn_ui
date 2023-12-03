import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbconfig/dbconfig';
import Recipe from '@/models/RecipeModel';
import { cookies } from 'next/headers';

connect();

export async function GET() {
	const allRecipes = await Recipe.find();

	let tok: string = 'Rinky';

	const cookieStore = cookies();
	const cookie = cookieStore.get('token');

	if (cookie !== undefined) {
		tok = cookie?.value;
	}

	const response = NextResponse.json({ allRecipes, tok });

	return response;
}

export async function POST(request: NextRequest) {
	try {
		const reqBody = await request.json();
		const { title } = reqBody;

		const recipe = await Recipe.findOne({ title });
		if (recipe) {
			return NextResponse.json(
				{ error: 'Recipe already exists' },
				{ status: 400 }
			);
		}

		const newRecipe = new Recipe(reqBody);

		const savedRecipe = await newRecipe.save();

		return NextResponse.json({
			message: 'Recipe Created Successfully.',
			success: true,
			savedRecipe,
		});
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

export async function PUT(request: NextRequest) {
	const reqBody = await request.json();
	const id: string = reqBody.id;

	try {
		const res = await Recipe.findByIdAndUpdate(id, reqBody);

		return NextResponse.json({
			message: 'Recipe Updated Successfully.',
			success: true,
			res,
		});
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

export async function DELETE(request: NextRequest) {
	const reqBody = await request.json();
	const id: string = reqBody.id;

	try {
		const res = await Recipe.findByIdAndDelete(id);

		return NextResponse.json({ res });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
