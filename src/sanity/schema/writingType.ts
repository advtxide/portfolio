import { defineField } from "sanity";

export const writingType = defineField({
  name: "writings",
  title: "Writings",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }, { type: "image" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tldr",
      title: "tl;dr",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});
