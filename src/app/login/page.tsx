'use client';

import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const formSchema = z.object({
	password: z.string().min(8, {
		message: 'Password must be at least 8 characters.',
	}),
});

export default function LoginPage() {
	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			password: '',
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		if (values.password !== '') {
			const data = JSON.stringify({ password: values.password });

			const res: any = await fetch('/api/login', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: data,
			});

			if (res.ok) {
				router.push('/admin');
			}

			console.table(res);
		}
	}

	return (
		<main className='text-center flex justify-center items-center'>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='mt-24 space-y-8 grid w-full max-w-sm items-center gap-1.5'>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-3xl text-yellow-300'>
									Password
								</FormLabel>
								<FormControl>
									<Input
										className='w-80 mx-auto'
										placeholder='Password must be at least 8 characters.'
										{...field}
									/>
								</FormControl>
								<FormDescription>
									Enter Password to Add Recipes
								</FormDescription>
							</FormItem>
						)}
					/>
					<Button className='w-40 mx-auto' type='submit'>
						Submit
					</Button>
				</form>
			</Form>
		</main>
	);
}
