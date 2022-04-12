import './directory.scss';

import CategoryItem from '../category-item/category-item';

const Directory = ({ categories }) => {
	return (
		<>
			{categories.map(category => (
				<CategoryItem key={category.id} category={category} />
			))}
		</>
	);
};
export default Directory;
