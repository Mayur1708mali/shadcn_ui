import { TokenContext } from './src/app/context/Token';
interface Recipe {
	_id: string;
	title: string;
	image: string;
	time: number;
	description: string;
	vegan: boolean;
	__v: string;
}

interface Cldimage {
	event: string;
	info: {
		url: string;
	};
}
