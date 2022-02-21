import {
  Box,
  HStack,
  IconButton,
  Spacer,
  useDisclosure,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import QuillClass from 'quill';
import 'quill/dist/quill.snow.css';
import { formats, modules } from '../../../lib/quillConfig';
import { useFormikContext } from 'formik';
const ImageCompress = require('quill-image-compress').default;
QuillClass.register('modules/imageCompress', ImageCompress);

const BlotFormatter = require('quill-blot-formatter').default;
QuillClass.register('modules/blotFormatter', BlotFormatter);

const MagicUrl = require('quill-magic-url').default;
QuillClass.register('modules/magicUrl', MagicUrl);

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
      modules: { ...modules, blotFormatter: {}, magicUrl: true },
      placeholder: 'Write an awesome story...',
    });
    // const ImageCompress = require('quill-image-compress').default;
    // QuillClass.register('modules/blotFormatter', BlotFormatter);
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
    const fileReader: FileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onloadend = () => {
      insertToEditor(fileReader.result);
    };
    return;
    // const body = new FormData();
    // const res: any = await fetch('Your Image Server URL', {
    //   method: 'POST',
    //   body,
    // });
    // const url =
    //   'https://images.unsplash.com/photo-1642010654640-e7fe3c436423?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60';
    // insertToEditor(url || res.uploadedImageUrl);
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
