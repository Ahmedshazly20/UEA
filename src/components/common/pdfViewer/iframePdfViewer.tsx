import { FC } from "react";

export const IframePdfViewer: FC<{
  content: string;
}> = ({ content }) => {
  return (
    <iframe
      src={`${content}#view=FitH`}
      width="100%"
      title="xxxx"
      height="1500"
    ></iframe>
    // <embed src={sampleBase64pdf} type="application/pdf" width="100%"></embed>
  );
};
