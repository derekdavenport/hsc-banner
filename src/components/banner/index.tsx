import { h, Fragment, FunctionalComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
// import "./style.scss";

type Item = {
	description: string,
	uid: string,
	title: string,
	url: string,
	id: string,
	normalized_type: 'image',
}

type FolderListing = {
	parent_url: string,
	items: Item[],
};

const prod = process.env.NODE_ENV === 'production';
const input = prod ?
'images/banners/tinymce-jsonimagefolderlisting' :
'/test.json';
const init = prod ?
{
	method: 'POST',
	body: 'rooted=True&document_base_url=/',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
	},
} :
{};

const App: FunctionalComponent<{ color?: string }> = (props) => {
	const [slides, setSlides] = useState<Item[]>([]);
	useEffect(() => {
		async function fetchImages() {
			const response = await fetch(input, init);
			if (response.ok) {
				const folderListing: FolderListing = await response.json();
				const images = folderListing.items.filter(item => item.normalized_type === 'image');
				setSlides(images);
			}
		};
		fetchImages();
	}, []);

	return <Fragment>
		{slides.map((slide, i) => <div key={i}>{slide.title}</div>)}
	</Fragment>;
}
export default App;
