const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }],
    [{ header: [1, 2, 3, 4, 5, 6] }],
    [{ font: ['Poppin'] }],
    [{ size: ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
    [{ script: 'sub' }, { script: 'super' }],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const inline = [
  'background',
  'bold',
  'color',
  'font',
  'code',
  'italic',
  'link',
  'size',
  'script',
  'strike',
  'underline',
];
const block = [
  'blockquote',
  'header',
  'indent',
  'list',
  'align',
  'direction',
  'code-block',
];
const embeds = ['formula', 'image', 'video'];
const formats = [...inline, ...block, ...embeds, 'bullet'];

export { formats, modules };
