import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import ThemeProvider from '@/components/theme-provider';
import { cookies } from 'next/headers';
import Nav from '@/components/Nav';
import { EditProvider } from '@/context/EditContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Recipes for you',
	description: 'Developed by Rinku',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const cookieStore = cookies();
	const cookie = cookieStore.get('token');
	let tok = '';

	if (cookie !== undefined) {
		tok = cookie.value;
	}

	return (
		<html lang='en'>
			<body className={inter.className}>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange>
					<EditProvider>
						<div className='m-4'>
							<Nav tok={tok} />
							{children}
						</div>
					</EditProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
