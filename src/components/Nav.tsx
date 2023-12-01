'use client';

import ThemeSelector from '@/components/ThemeSelector';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Nav(props: { tok: string }) {
	const token = props.tok;

	const [tok, setTok] = useState('');

	useEffect(() => {
		setTok(token);
	}, [token]);

	return (
		<nav className='flex justify-between'>
			<h1>
				<Link href='/'>Recipes for You</Link>
			</h1>
			<div className='flex items-center gap-4'>
				<Button>
					<Link href={token ? '/admin' : '/login'}>
						{token ? 'Add Recipe' : 'Login'}
					</Link>
				</Button>
				<ThemeSelector />
			</div>
		</nav>
	);
}
