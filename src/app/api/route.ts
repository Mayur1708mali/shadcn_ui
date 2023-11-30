import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbconfig/dbconfig';
import Recipe from '@/models/RecipeModel';

connect();

export async function GET() {
	const allRecipes = await Recipe.find();

	return NextResponse.json(allRecipes);
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
