import { defineField, defineType } from 'sanity';

export const collection = defineType({
  name: 'collection',
  title: 'Collection',
  type: 'document',
  fields: [
    defineField({
        name: 'title',
        title: 'Collection Title',
        type: 'string',
        validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'slug',
        title: 'Slug (no need to edit)',
        type: 'slug',
        options: {
            source: 'title'
        }
    }),
    defineField({
        name: 'mainImage',
        title: 'Cover Image File',
        type: 'image',
        options: { hotspot: true },
        description: 'Upload an image directly from your computer.',
        }),
    defineField({
        name: 'layout',
        title: 'Image Orientation',
        type: 'string',
        options: {
            list: [
            { title: 'Portrait', value: 'portrait' },
            { title: 'Landscape', value: 'landscape' },
            ],
            layout: 'radio', // Displays as radio buttons instead of a dropdown
        },
        initialValue: 'portrait', // Default selection
    }),
    defineField({
        name: 'description',
        title: 'Description for alt text (Optional)',
        type: 'text',
    }),
    defineField({
        name: 'projects',
        title: 'Projects in this collection',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'project' }] }]
    })
  ],
});
