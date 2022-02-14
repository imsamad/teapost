import { Box } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import QuillClass from 'quill';
import 'quill/dist/quill.snow.css';
import { formats, modules } from '../../lib/quillConfig';
import { useFormikContext } from 'formik';
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
      modules,
      placeholder: 'Write an awesome story...',
    });
    // @ts-ignore
    q.clipboard.dangerouslyPasteHTML(values.body);
    setQuill(q);
  }, []);
  useEffect(() => {
    if (quill)
      quill.on('text-change', () => {
        setFieldValue('body', quill.root.innerHTML);
      });
  }, [quill]);
  return (
    <Box w="100%" border="1px" overflow="hidden">
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
            box-shadow:0 0 5px 0 rgba(0,0,0,0.5);
            // padding:20px
        }
    `}</style>
    </Box>
  );
};

export default Index;
