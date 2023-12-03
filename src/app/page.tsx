'use client';

//todo card
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
//todo Avatar
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
//todo badge
import { Badge } from '@/components/ui/badge';
//todo button
import { Button } from '@/components/ui/button';

import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import Loading from './loading';
import DeleteButton from '@/components/DeleteButton';
import { Pencil } from 'lucide-react';
import Link from 'next/link';
import { EditContext } from '@/context/EditContext';

export default function Home() {
	const [recipes, setRecipes] = useState<Recipe[]>([]);
	const [loading, setLoading] = useState<Boolean>(true);
	const [token, setToken] = useState('');

	const { setEdit } = useContext(EditContext) as EditState;

	useEffect(() => {
		async function getRecipies() {
			const res = await axios.get('/api');
			const result: Recipe[] = res.data.allRecipes;

			setRecipes(result);

			if (res.data.tok !== 'Rinky') {
				setToken(res.data.tok);
			}

			setLoading(false);
		}
		getRecipies();
	}, []);

	return (
		<main>
			{loading ? (
				<>
					<Loading />
				</>
			) : (
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{recipes.map((recipe) => (
						<Card
							key={recipe._id}
							className='flex flex-col justify-between group'>
							<div className='relative flex items-center justify-between'>
								<CardHeader className='flex-row gap-4 items-center'>
									<Avatar>
										<AvatarImage src={recipe.image} />
										<AvatarFallback>
											{recipe.title.slice(0, 2)}
										</AvatarFallback>
									</Avatar>
									<div>
										<CardTitle className='max-w-xs'>
											{recipe.title}
										</CardTitle>
										<CardDescription>
											{recipe.time} mins to cook.
										</CardDescription>
									</div>
								</CardHeader>
								{token !== '' ? (
									<div className='flex flex-col gap-4 mt-2'>
										<Button
											variant='outline'
											onClick={() => {
												setEdit(recipe);
											}}
											className='mr-4 p-2 h-8 transition ease-in-out delay-150  translate-x-5 group-hover:-translate-x-2  duration-300 opacity-0 group-hover:opacity-100'>
											<Link href='/edit'>
												<Pencil className=' w-4 h-4' />
											</Link>
										</Button>
										<DeleteButton
											recipe={recipe}
											recipes={recipes}
											setRecipes={setRecipes}
										/>
									</div>
								) : null}
							</div>
							<CardContent>
								<p>{recipe.description}</p>
							</CardContent>
							<CardFooter className='flex justify-between'>
								<Button>View Recipe</Button>
								{recipe.vegan ? (
									<Badge variant='secondary'>Vegan!</Badge>
								) : null}
							</CardFooter>
						</Card>
					))}
				</div>
			)}
		</main>
	);
}

// "title": "Pickled Beetroot with Feta",
//   "image": "http://res.cloudinary.com/dvilumget/image/upload/v1701407784/vspw0npze9bfdufdwyuf.jpg",
//   "time": 7,
//   "description": "A really creative salad made with a reduction of wine, vinegar and sugar. The only other things you need are beetroot, feta cheese, pepper, green olives, cilantro and just a pinch of salt.",
//   "vegan": false,

// "title": "Leafy Salad with Walnuts",
//   "image": "http://res.cloudinary.com/dvilumget/image/upload/v1701407452/dy0fxlaauymyi43nz9r2.jpg",
//   "time": 5,
//   "description": "A salad with different textures, nuts, vinegar, cherry tomatoes, crunchy lettuce and Chinese cabbage.Leafy greens are a good source of fibre and essential antioxidants. Fibre makes you feel full and keep cravings at bay. ",
//   "vegan": false,

{
	/* <Button className='transition ease-in-out delay-150  translate-x-5 hover:-translate-x-5  duration-300 opacity-0 hover:opacity-100 '>
	me
</Button>; */
}
