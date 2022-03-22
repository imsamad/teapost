import { useColorModeValue } from "@chakra-ui/react";
import Head from "next/head";

const Render = ({ value }: { value: string }) => {
  const color = useColorModeValue("#1A202C", "#FFFFFFEB");
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href={`https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700&display=swap`}
          rel="stylesheet"
        />
      </Head>
      <div dangerouslySetInnerHTML={{ __html: value }} className="content" />
      <style global jsx>{`
        .content h1,
        .content h2,
        .content h3,
        .content h4,
        .content h5,
        .content h6,
        .content p {
          font-weight: normal;
          color: ${color};
          font-family: "Nunito", "Times New Roman", Times, serif;
        }

        .content h1 {
          font-size: 3rem;
          line-height: 1;
          margin-bottom: 0.5rem;
        }
        .content h2 {
          font-size: 2rem;
          margin-bottom: 0.75rem;
        }
        .content h3 {
          font-size: 1.5rem;
          line-height: 1;
          margin-bottom: 1rem;
        }
        .content h4 {
          font-size: 1.2rem;
          line-height: 1.25;
          margin-bottom: 1.25rem;
        }
        .content h5 {
          font-size: 1rem;
          font-weight: bold;
          margin-bottom: 1.5rem;
        }
        .content h6 {
          font-size: 1rem;
          font-weight: bold;
        }

        .content p {
          margin: 0 0 1.5rem;
        }

        .content a:focus,
        .content a:hover {
          color: #000;
        }
        .content a {
          color: #009;
          text-decoration: underline;
        }

        .content strong {
          font-weight: bold;
        }
        .content em,
        .content dfn {
          font-style: italic;
        }
        .content dfn {
          font-weight: bold;
        }
        .content sup,
        .content sub {
          line-height: 0;
        }

        .content abbr,
        .content acronym {
          border-bottom: 1px dotted #666;
        }
        .content address {
          margin: 0 0 1.5rem;
          font-style: italic;
        }
        .content del {
          color: ${color};
        }

        .content pre {
          margin: 1.5em 0;
          white-space: pre;
        }
        .content pre,
        .content code,
        .content tt {
          font: 1em "andale mono", "lucida console", monospace;
          line-height: 1.5;
        }

        .content li ul,
        li ol {
          margin: 0 1.5rem;
        }
        .content ul,
        .content ol {
          margin: 0 1.5em 1.5em 1.5rem;
        }

        .content ul {
          list-style-type: disc;
        }
        .content ol {
          list-style-type: decimal;
        }

        .content dl {
          margin: 0 0 1.5em 0;
        }
        .content dl dt {
          font-weight: bold;
        }
        .content dd {
          margin-left: 1.5rem;
        }

        .content table {
          margin-bottom: 1.4rem;
          width: 100%;
        }
        .content th {
          font-weight: bold;
        }
        .content thead th {
          background: #c3d9ff;
        }
        .content th,
        .content td,
        .content caption {
          padding: 4px 10px 4px 5px;
        }
        .content tr.even td {
          background: #e5ecf9;
        }
        .content tfoot {
          font-style: italic;
        }
        .content caption {
          background: #eee;
        }
        .content blockquote {
          display: block;
          margin-block-start: 1em;
          margin-block-end: 1em;
          margin-inline-start: 0;
          margin-inline-end: 0;
          color: ${color};
          border-style: solid;
          border-color: #b1b1b1;
          border-left-width: 5px;
          padding: 0 5px 0 20px;
          border-width: 0 0 0 5px;
          border-top-color: rgb(177, 177, 177);
          border-top-style: solid;
          border-top-width: 0px;
          border-right-color: rgb(177, 177, 177);
          border-right-style: solid;
          border-right-width: 0px;
          border-bottom-color: rgb(177, 177, 177);
          border-bottom-style: solid;
          border-bottom-width: 0px;
          border-left-color: rgb(177, 177, 177);
          border-left-style: solid;
          border-left-width: 5px;
        }
      `}</style>
    </>
  );
};

export default Render;
