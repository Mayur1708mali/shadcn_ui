interface Recipe {
	_id: string;
	title: string;
	image: string;
	time: number;
	description: string;
	vegan: string;
	__v: string;
}

interface Cldimage {
	event: string;
	info: {
		url: string;
	};
}

type EditState = {
	edit: Recipe;
	setEdit(edit: Recipe): void;
};
