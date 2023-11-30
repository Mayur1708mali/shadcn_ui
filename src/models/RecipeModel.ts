import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
	title: String,
	image: String,
	time: Number,
	description: String,
	vegan: Boolean,
});

const Recipe = mongoose.models.Recipe || mongoose.model('Recipe', recipeSchema);

export default Recipe;
