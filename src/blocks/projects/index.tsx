import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import Edit from './edit';
import Save from './save';

registerBlockType(metadata.name as 'portfolio/projects', {
	edit: Edit,
	save: Save,
});
