import { getCookies } from "@lib/cookies";
import SetOptions from "suneditor-react/dist/types/SetOptions";
import { ButtonListItem } from "suneditor/src/options";
const fonts = [
  "Logical",
  "Salesforce Sans",
  "Garamond",
  "Sans-Serif",
  "Serif",
  "Times New Roman",
  "Helvetica",
  "Arial",
  "Comic Sans MS",
  "Courier New",
  "Impact",
  "Georgia",
  "Tahoma",
  "Trebuchet MS",
  "Verdana",
].sort();

export const setOptions = (): SetOptions => {
  const user = getCookies();
  const oneMB = 1_000_000;
  return {
    // toolbarContainer: "div",
    // fullScreenOffset: 10,
    defaultStyle:
      "border:2px solid #eee; padding:20px 10px 100px 20px;z-index:-1",
    // stickyToolbar: 1,
    resizingBar: true,
    resizeEnable: true,
    charCounterLabel: "Total char",

    // alignItems: ["center"],

    defaultTag: "div",
    minHeight: "300px",
    width: "auto",
    height: "auto",
    showPathLabel: false,

    charCounter: true,
    charCounterType: "char",

    font: fonts,

    mediaAutoSelect: true,

    imageUploadHeader: {
      Authorization: `Bearer ${user?.accessToken}`,
    },
    imageUploadSizeLimit: oneMB * 4,
    imageMultipleFile: true,
    imageUploadUrl: "http://localhost:4000/api/v1/image/upload",
    imageGalleryHeader: {
      Authorization: `Bearer ${user?.accessToken}`,
    },
    imageGalleryUrl:
      "http://localhost:4000/api/v1/image" ||
      "https://fake-images.glitch.me?limit=100",
    imageFileInput: true,
    imageUrlInput: true,
    imageResizing: true,
    imageHeightShow: true,
    imageAlignShow: true,
    imageAccept: ".jpg, .png, .web, .gif",

    videoFileInput: true,
    videoUrlInput: true,
    videoUploadHeader: {
      Authorization: `Bearer ${user?.accessToken}`,
    },
    videoUploadUrl:
      "http://localhost:4000/api/v1/image" ||
      "https://fake-images.glitch.me?limit=100",
    videoUploadSizeLimit: 4 * oneMB,
    videoMultipleFile: true,

    audioFileInput: true,
    audioUrlInput: true,
    audioUploadHeader: {
      Authorization: `Bearer ${user?.accessToken}`,
    },
    audioUploadUrl:
      "http://localhost:4000/api/v1/image" ||
      "https://fake-images.glitch.me?limit=100",
    audioUploadSizeLimit: 4 * oneMB,
    audioMultipleFile: true,
    buttonList: buttonList(),
  };
};

function buttonList(): ButtonListItem {
  return [
    ["save", "undo", "redo"],
    [
      "font",
      "fontSize",
      "formatBlock",
      "paragraphStyle",
      "blockquote",
      "bold",
      "underline",
      "italic",
      "strike",
      "subscript",
      "superscript",
      "fontColor",
      "hiliteColor",
      "textStyle",
    ],

    ["removeFormat"],
    ["outdent", "indent"],
    ["align", "horizontalRule", "list", "lineHeight"],
    [
      "fullScreen",
      "showBlocks",
      "codeView",
      "preview",
      "print",
      "table",
      "imageGallery",
      "video",
      "audio",
      "link",
    ],
  ];
}
function responsieButtonList(): ButtonListItem {
  return [
    ["undo", "redo"],
    [
      ":p-More Paragraph-default.more_paragraph",
      "font",
      "fontSize",
      "formatBlock",
      "paragraphStyle",
      "blockquote",
    ],
    ["bold", "underline", "italic", "strike", "subscript", "superscript"],
    ["fontColor", "hiliteColor", "textStyle"],
    ["removeFormat"],
    ["outdent", "indent"],
    ["align", "horizontalRule", "list", "lineHeight"],
    [
      "-right",
      ":i-More Misc-default.more_vertical",
      "fullScreen",
      "showBlocks",
      "codeView",
      "preview",
      "print",
      "save",
    ],
    ["-right", ":r-More Rich-default.more_plus", "table", "imageGallery"],
    ["-right", "image", "imageGallery", "video", "audio", "link"],
    // (min-width: 992)
    [
      "%992",
      [
        ["undo", "redo"],
        [
          ":p-More Paragraph-default.more_paragraph",
          "font",
          "fontSize",
          "formatBlock",
          "paragraphStyle",
          "blockquote",
        ],
        ["bold", "underline", "italic", "strike"],
        [
          ":t-More Text-default.more_text",
          "subscript",
          "superscript",
          "fontColor",
          "hiliteColor",
          "textStyle",
        ],
        ["removeFormat"],
        ["outdent", "indent"],
        ["align", "horizontalRule", "list", "lineHeight"],
        [
          "-right",
          ":i-More Misc-default.more_vertical",
          "fullScreen",
          "showBlocks",
          "codeView",
          "preview",
          "print",
          "save",
        ],
        [
          "-right",
          ":r-More Rich-default.more_plus",
          "table",
          "link",
          "image",
          "video",
          "audio",

          "imageGallery",
        ],
      ],
    ],
    // (min-width: 767)
    [
      "%767",
      [
        ["undo", "redo"],
        [
          ":p-More Paragraph-default.more_paragraph",
          "font",
          "fontSize",
          "formatBlock",
          "paragraphStyle",
          "blockquote",
        ],
        [
          ":t-More Text-default.more_text",
          "bold",
          "underline",
          "italic",
          "strike",
          "subscript",
          "superscript",
          "fontColor",
          "hiliteColor",
          "textStyle",
        ],
        ["removeFormat"],
        ["outdent", "indent"],
        [
          ":e-More Line-default.more_horizontal",
          "align",
          "horizontalRule",
          "list",
          "lineHeight",
        ],
        [
          ":r-More Rich-default.more_plus",
          "table",
          "link",
          "image",
          "video",
          "audio",

          "imageGallery",
        ],
        [
          "-right",
          ":i-More Misc-default.more_vertical",
          "fullScreen",
          "showBlocks",
          "codeView",
          "preview",
          "print",
          "save",
        ],
      ],
    ],
    // (min-width: 480)
    [
      "%480",
      [
        ["undo", "redo"],
        [
          ":p-More Paragraph-default.more_paragraph",
          "font",
          "fontSize",
          "formatBlock",
          "paragraphStyle",
          "blockquote",
        ],
        [
          ":t-More Text-default.more_text",
          "bold",
          "underline",
          "italic",
          "strike",
          "subscript",
          "superscript",
          "fontColor",
          "hiliteColor",
          "textStyle",
          "removeFormat",
        ],
        [
          ":e-More Line-default.more_horizontal",
          "outdent",
          "indent",
          "align",
          "horizontalRule",
          "list",
          "lineHeight",
        ],
        [
          ":r-More Rich-default.more_plus",
          "table",
          "link",
          "image",
          "video",
          "audio",

          "imageGallery",
        ],
        [
          "-right",
          ":i-More Misc-default.more_vertical",
          "fullScreen",
          "showBlocks",
          "codeView",
          "preview",
          "print",
          "save",
        ],
      ],
    ],
  ];
}
