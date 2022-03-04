import { Box } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import QuillClass from 'quill';
import 'quill/dist/quill.snow.css';
import { useFormikContext } from 'formik';

const BlotFormatter = require('quill-blot-formatter').default;
QuillClass.register('modules/blotFormatter', BlotFormatter);

const MagicUrl = require('quill-magic-url').default;
QuillClass.register('modules/magicUrl', MagicUrl);

import { formats, modules } from '../../../lib/quillConfig';

import uploadImage from '../../../lib/uploadImage';

const Index = () => {
  const { values, setFieldValue } = useFormikContext();
  const [quill, setQuill] = useState<any>();
  const editorRef = useCallback((wrapper: any) => {
    if (!wrapper) return;
    wrapper.innerHTML = '';
    const editor = document.createElement('div');
    wrapper.append(editor);
    const q = new QuillClass(editor, {
      theme: 'snow',
      formats,
      modules: {
        ...modules,
        blotFormatter: {},
        magicUrl: true,
      },
      placeholder: 'Write an awesome story...',
    }); // @ts-ignore
    console.log('values.body ', values.body);
    // @ts-ignore
    q.clipboard.dangerouslyPasteHTML(values.body);
    setQuill(q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const insertToEditor = (url: any) => {
    const range = quill.getSelection();
    quill.insertEmbed(range.index, 'image', url);
  };

  const saveToServer = async (file: any) => {
    const saveAsDataUrl = (file: any) => {
      const fileReader: FileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onloadend = () => {
        insertToEditor(fileReader.result);
      };
    };
    const imageUrl = await uploadImage(file);
    if (imageUrl) insertToEditor(imageUrl);
  };

  const selectLocalImage = () => {
    const input = document.createElement('input') as HTMLInputElement;
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = () => {
      // @ts-ignore
      const file = input.files[0];
      saveToServer(file);
    };
  };

  useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        setFieldValue('body', quill.root.innerHTML);
        console.log('quill.root.innerHTML ', quill.root.innerHTML);
      });
      quill.getModule('toolbar').addHandler('image', selectLocalImage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quill]);
  return (
    <Box w="100%" border="1px" maxH="100vh" overflow="hidden">
      <Box ref={editorRef} overflow="hidden"></Box>
      <style>{`
        .ql-toolbar{
            background:#ddd;
            color:white;
        }
        .ql-formats{
            margin-bottom:5px;
            border:1px solid gray;
            border-radius:1rem;
        }
        .ql-container{
            background:#fff;
            border:none;
            height:600px; 
            margin-bottom:10px;
          }
        .ql-container.ql-snow{
            border:0;
            outline:none;
          }
        .ql-editor{
            margin:8px;
            height:100%;
            border:2px solid #ddd;
            padding:5rem;
            box-shadow: -1px 10px 5px 0px rgba(199,187,187,0.75);
        }
    `}</style>
    </Box>
  );
};

export default Index;
