import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

interface CardAttributes {
	heading: string;
	description: string;
	linkUrl: string;
	linkText: string;
}

interface EditProps {
	attributes: CardAttributes;
	setAttributes: (attributes: Partial<CardAttributes>) => void;
}

export default function Edit({
	attributes,
	setAttributes,
}: EditProps) {
	const { heading, description, linkUrl, linkText } = attributes;
	const blockProps = useBlockProps({
		className:
			'rounded-xl border border-grey p-8 transition-shadow hover:shadow-lg',
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Card Link', 'portfolio')}>
					<TextControl
						__nextHasNoMarginBottom
						label={__('URL', 'portfolio')}
						value={linkUrl}
						onChange={(value: string) =>
							setAttributes({ linkUrl: value })
						}
						placeholder="https://example.com"
					/>
					<TextControl
						__nextHasNoMarginBottom
						label={__('Link Text', 'portfolio')}
						value={linkText}
						onChange={(value: string) =>
							setAttributes({ linkText: value })
						}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<RichText
					tagName="h3"
					className="text-xl font-bold leading-tight mb-3"
					value={heading}
					onChange={(value: string) =>
						setAttributes({ heading: value })
					}
					placeholder={__('Card Heading…', 'portfolio')}
				/>
				<RichText
					tagName="p"
					className="text-base leading-relaxed mb-5"
					value={description}
					onChange={(value: string) =>
						setAttributes({ description: value })
					}
					placeholder={__('Write a short description…', 'portfolio')}
				/>
				{linkUrl && (
					<span className="inline-block rounded-md bg-primary px-5 py-2 text-sm font-semibold text-white">
						{linkText || __('Learn More', 'portfolio')}
					</span>
				)}
			</div>
		</>
	);
}
