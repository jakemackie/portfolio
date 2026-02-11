import { useBlockProps, RichText } from '@wordpress/block-editor';

interface CardAttributes {
	heading: string;
	description: string;
	linkUrl: string;
	linkText: string;
}

export default function Save({
	attributes,
}: {
	attributes: CardAttributes;
}) {
	const { heading, description, linkUrl, linkText } = attributes;
	const blockProps = useBlockProps.save({
		className:
			'rounded-xl border border-grey p-8 transition-shadow hover:shadow-lg',
	});

	return (
		<div {...blockProps}>
			<RichText.Content
				tagName="h3"
				className="text-xl font-bold leading-tight mb-3"
				value={heading}
			/>
			<RichText.Content
				tagName="p"
				className="text-base leading-relaxed opacity-70 mb-5"
				value={description}
			/>
			{linkUrl && (
				<a
					className="inline-block rounded-md bg-primary px-5 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity no-underline"
					href={linkUrl}
					rel="noopener noreferrer"
				>
					{linkText || 'Learn More'}
				</a>
			)}
		</div>
	);
}
