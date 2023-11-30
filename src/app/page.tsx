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
import { useEffect, useState } from 'react';
import Loading from './loading';

export default function Home() {
	const [recipes, setRecipes] = useState<Recipe[]>([]);
	const [loading, setLoading] = useState<Boolean>(true);

	useEffect(() => {
		async function getRecipies() {
			const res = await axios.get('/api');
			const result: Recipe[] = res.data;
			setRecipes(result);
			setLoading(false);
		}
		getRecipies();
	}, []);

	return (
		<main>
			{loading ? (
				<Loading />
			) : (
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{recipes.map((recipe) => (
						<Card
							key={recipe._id}
							className='flex flex-col justify-between'>
							<CardHeader className='flex-row gap-4 items-center'>
								<Avatar>
									<AvatarImage src={recipe.image} />
									<AvatarFallback>
										{recipe.title.slice(0, 2)}
									</AvatarFallback>
								</Avatar>
								<div>
									<CardTitle>{recipe.title}</CardTitle>
									<CardDescription>
										{recipe.time} mins to cook.
									</CardDescription>
								</div>
							</CardHeader>
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
