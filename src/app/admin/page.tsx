'use client';

import { CldUploadWidget } from 'next-cloudinary';
import axios from 'axios';

//todo components
import { Button } from '@/components/ui/button';
import {
	Form,
	FormItem,
	FormLabel,
	FormControl,
	FormField,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
	title: z.string(),
	image: z.string(),
	time: z.string(),
	description: z.string(),
	vegan: z.boolean(),
});

export default function Admin() {
	const router = useRouter();
	const [img, setImg] = useState('');
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
			image: '',
			time: '',
			description: '',
			vegan: false,
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		values.image = img;

		const data = JSON.stringify({
			title: values.title,
			image: values.image,
			time: values.time,
			description: values.description,
			vegan: values.vegan,
		});

		if (values.image !== '') {
			const res = await axios.post('/api', data, {
				headers: { 'Content-Type': 'application/json' },
			});
			if (res.status === 200) {
				router.push('/');
			}
		}
	}

	return (
		<main>
			<h2>
				Hi! <span className='text-yellow-400'>Admin.</span>
			</h2>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='mt-12 space-y-8 grid w-full max-w-sm items-center gap-1.5 '>
					<FormField
						control={form.control}
						name='title'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input
										placeholder='Recipe Name'
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='image'
						render={({ field }) => (
							<FormItem className='flex flex-col'>
								<FormLabel>Image</FormLabel>
								<FormControl>
									<CldUploadWidget
										onUpload={(res: any) => {
											setImg(res.info?.url);
										}}
										uploadPreset='zxz0s8sf'>
										{({ open }) => {
											return (
												<>
													{img === '' ? null : (
														<Image
															src={img}
															alt='Image'
															width={350}
															height={280}
														/>
													)}
													<Button
														className='w-40'
														onClick={() => open()}>
														Upload an Image
													</Button>
												</>
											);
										}}
									</CldUploadWidget>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='time'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Time</FormLabel>
								<FormControl>
									<Input
										placeholder='Time to cook (In mins).'
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='description'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea
										placeholder='Description'
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='vegan'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Vegan</FormLabel>
								<FormControl>
									<RadioGroup defaultValue='false'>
										<div className='flex items-center space-x-2'>
											<RadioGroupItem
												value='false'
												id='false'
											/>
											<Label htmlFor='false'>False</Label>
										</div>
										<div className='flex items-center space-x-2'>
											<RadioGroupItem
												value='true'
												id='true'
											/>
											<Label htmlFor='true'>True</Label>
										</div>
									</RadioGroup>
								</FormControl>
							</FormItem>
						)}
					/>
					<Button type='submit'>Add Recipe</Button>
				</form>
			</Form>
		</main>
	);
}
