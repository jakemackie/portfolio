import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	ComboboxControl,
	Button,
	Spinner,
} from '@wordpress/components';
import { useEntityRecords } from '@wordpress/core-data';
import { decodeEntities } from '@wordpress/html-entities';
import { useMemo, useState } from '@wordpress/element';

type DisplayMode = 'all' | 'selected';

interface ProjectRecord {
	id: number;
	title?: { rendered?: string };
	excerpt?: { rendered?: string };
	link?: string;
	_embedded?: {
		'wp:featuredmedia'?: Array<{ source_url?: string; alt_text?: string }>;
	};
}

interface ProjectsAttributes {
	displayMode: DisplayMode;
	selectedIds: number[];
}

interface EditProps {
	attributes: ProjectsAttributes;
	setAttributes: (attributes: Partial<ProjectsAttributes>) => void;
}

function ProjectsGrid({
	projects,
	isLoading,
	emptyLabel,
}: {
	projects: ProjectRecord[];
	isLoading: boolean;
	emptyLabel: string;
}) {
	if (isLoading) {
		return (
			<div className="flex items-center gap-3 text-sm text-neutral-500">
				<Spinner />
				{__('Loading projects...', 'portfolio')}
			</div>
		);
	}

	if (!projects.length) {
		return (
			<div className="rounded-xl border border-dashed border-grey/60 p-8 text-sm text-neutral-500">
				{emptyLabel}
			</div>
		);
	}

	return (
		<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
			{projects.map((project) => {
				const title = decodeEntities(project.title?.rendered || '');
				const excerpt = project.excerpt?.rendered || '';
				const media = project._embedded?.['wp:featuredmedia']?.[0];
				const imageUrl = media?.source_url;
				const imageAlt = media?.alt_text || title;

				return (
					<div key={project.id} className="block">
						<article className="overflow-hidden h-full rounded-xl border border-grey bg-black shadow-sm">
							{imageUrl && (
								<div className="aspect-[4/3] w-full overflow-hidden bg-neutral-100">
									<img
										src={imageUrl}
										alt={imageAlt}
										className="h-full w-full object-cover"
									/>
								</div>
							)}
							<div className="p-6">
								<h3 className="text-lg font-semibold leading-tight mb-3">
									{title || __('Untitled Project', 'portfolio')}
								</h3>
								{excerpt && (
									<p
										className="text-sm leading-relaxed"
										dangerouslySetInnerHTML={{ __html: excerpt }}
									/>
								)}
							</div>
						</article>
					</div>
				);
			})}
		</div>
	);
}

export default function Edit({ attributes, setAttributes }: EditProps) {
	const { displayMode, selectedIds } = attributes;
	const [pickerValue, setPickerValue] = useState<string>('');

	const { records, isResolving } = useEntityRecords(
		'postType',
		'project',
		{
			per_page: -1,
			orderby: 'title',
			order: 'asc',
			_embed: true,
		}
	) as {
		records: ProjectRecord[] | undefined;
		isResolving: boolean;
	};

	const options = useMemo(() => {
		return (
			records?.map((project) => ({
				label: decodeEntities(project.title?.rendered || ''),
				value: String(project.id),
			})) ?? []
		);
	}, [records]);

	const selectedProjects = useMemo(() => {
		if (!records) return [];
		const selected = new Set(selectedIds);
		return records.filter((project) => selected.has(project.id));
	}, [records, selectedIds]);

	const visibleProjects = displayMode === 'all' ? records ?? [] : selectedProjects;

	const addProject = (value: string | null) => {
		if (!value) return;
		const nextId = Number(value);
		if (!Number.isFinite(nextId) || selectedIds.includes(nextId)) {
			setPickerValue('');
			return;
		}
		setAttributes({ selectedIds: [...selectedIds, nextId] });
		setPickerValue('');
	};

	const removeProject = (id: number) => {
		setAttributes({ selectedIds: selectedIds.filter((item) => item !== id) });
	};

	const blockProps = useBlockProps({ className: 'projects-block' });

	return (
		<div {...blockProps}>
			<InspectorControls>
				<PanelBody title={__('Projects Settings', 'portfolio')}>
					<SelectControl
						label={__('Display', 'portfolio')}
						value={displayMode}
						options={[
							{ label: __('All projects', 'portfolio'), value: 'all' },
							{
								label: __('Selected projects', 'portfolio'),
								value: 'selected',
							},
						]}
						onChange={(value: string) =>
							setAttributes({ displayMode: value as DisplayMode })
						}
					/>
					{displayMode === 'selected' && (
						<ComboboxControl
							label={__('Add project', 'portfolio')}
							value={pickerValue}
							options={options}
							onChange={addProject}
							onInputChange={setPickerValue}
							placeholder={__('Search projects...', 'portfolio')}
						/>
					)}
				</PanelBody>
			</InspectorControls>

			{displayMode === 'selected' && selectedProjects.length > 0 && (
				<div className="mb-6 rounded-lg border bg-black p-4">
					<p className="text-sm font-semibold mb-3">
						{__('Selected projects', 'portfolio')}
					</p>
					<div className="flex flex-wrap gap-2">
						{selectedProjects.map((project) => (
							<Button
								key={project.id}
								variant="secondary"
								onClick={() => removeProject(project.id)}
							>
								{decodeEntities(project.title?.rendered || '') ||
									__('Untitled Project', 'portfolio')}
							</Button>
						))}
					</div>
					<p className="text-xs mt-3">
						{__('Click a project name to remove it.', 'portfolio')}
					</p>
				</div>
			)}

			<ProjectsGrid
				projects={visibleProjects}
				isLoading={isResolving}
				emptyLabel={
					displayMode === 'all'
						? __('No projects found yet.', 'portfolio')
						: __('Pick some projects to display.', 'portfolio')
				}
			/>
		</div>
	);
}
