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
import { Badge, badgeVariants } from '@/components/ui/badge';
//todo button
import { Button } from '@/components/ui/button';

async function getRecipies(): Promise<Recipe[]> {
	const res = await fetch('http://localhost:4000/recipes');
	const result = await res.json();

	//! delay response
	await new Promise((resolve) => setTimeout(resolve, 3000));

	return result;
}

export default async function Home() {
	const recipes = await getRecipies();

	return (
		<main>
			<div className='grid grid-cols-3 gap-8'>
				{recipes.map((recipe) => (
					<Card
						key={recipe.id}
						className='flex flex-col justify-between'>
						<CardHeader className='flex-row gap-4 items-center'>
							<Avatar>
								<AvatarImage src={`/img/${recipe.image}`} />
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
		</main>
	);
}
