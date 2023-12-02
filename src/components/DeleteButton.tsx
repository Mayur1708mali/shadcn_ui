import { TrashIcon } from 'lucide-react';
import { Button } from './ui/button';
import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';

type Data = {
	id: string;
};

export default function DeleteButton(props: {
	recipe: Recipe;
	recipes: Recipe[];
	setRecipes: Dispatch<SetStateAction<Recipe[]>>;
}) {
	const recipe = props.recipe;

	async function handleDelete(id: string) {
		const recipeId = id;
		const data: Data = {
			id: recipeId,
		};
		const res = await axios.delete('/api', { data });

		const filterRecipes = props.recipes.filter(
			(recipe) => recipe._id !== recipeId
		);

		props.setRecipes(filterRecipes);
	}

	return (
		<Button
			variant='outline'
			onClick={() => {
				handleDelete(recipe._id);
			}}
			className='mr-4 p-2 h-8 transition ease-in-out delay-150  translate-x-5 group-hover:-translate-x-2  duration-300 opacity-0 group-hover:opacity-100'>
			<TrashIcon className=' w-4 h-4' />
		</Button>
	);
}
