import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import Edit from './edit';
import Save from './save';

registerBlockType(metadata.name as 'portfolio/example-card', {
	edit: Edit,
	save: Save,
});
