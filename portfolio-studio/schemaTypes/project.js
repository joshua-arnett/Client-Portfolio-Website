import { defineField, defineType } from 'sanity';

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'caption',
      title: 'Project Caption (will be shown on website below the image)',
      type: 'string',
    }),
    defineField({
      name: 'collection',
      title: 'Collection',
      type: 'reference',
      to: [{ type: 'collection' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Uploaded Image File',
      type: 'image',
      options: { hotspot: true },
      description: 'Upload an image directly from your computer.',
      validation: (Rule) => Rule.required()
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
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description for alt text (Optional)',
      type: 'text',
    })
  ],
});
