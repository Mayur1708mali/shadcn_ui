import SkeletonCard from '@/components/SkeletonCard';

export default function loading() {
	return (
		<main>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
				{'abcdefghi'.split('').map((i) => (
					<SkeletonCard key={i} />
				))}
			</div>
		</main>
	);
}
