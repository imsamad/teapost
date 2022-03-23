import Head from "next/head";
import React from "react";

const saveButtonStyles = () => {
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
      <style global jsx>{`
        .se-container {
          font-family: "Nunito", "Times New Roman", Times, serif;
        }
        ._se_command_save {
          display: flex !important;
          border: 1px solid #ddd !important;
          width: 80px !important;
          border-radius: 0.85rem !important;
          background: #0ea5e9 !important;
          box-shadow: 1px 2px #888888 !important;
          transition: background-color 0.3s, box-shadow 0.3s !important;
          font-size: 0.75rem !important;
          color: #fff !important;
        }
        ._se_command_save:hover {
          background-color: #38bdf8 !important;
        }
        ._se_command_save:focus {
          outline: 2px solid #22d3ee !important;
        }
        ._se_command_save:disabled {
          background-color: #f0f9ff !important;
          color: #ddd !important;
        }
        ._se_command_save:before {
          content: "Save";
          margin: auto !important;
          font-size: 1rem !important;
          font-weight: 900 !important;
        }
        ._se_command_save:after {
          padding: 5px !important;
        }
        ._se_command_save svg {
          display: none !important;
        }
      `}</style>
    </>
  );
};

export default saveButtonStyles;
