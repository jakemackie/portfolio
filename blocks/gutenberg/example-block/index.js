( function ( blocks, element, blockEditor ) {
	var el = element.createElement;
	var useBlockProps = blockEditor.useBlockProps;

	blocks.registerBlockType( 'portfolio/example-block', {
		edit: function () {
			return el(
				'p',
				useBlockProps(),
				'Example block. Replace this when you are ready.'
			);
		},
		save: function () {
			return null;
		},
	} );
} )( window.wp.blocks, window.wp.element, window.wp.blockEditor );
