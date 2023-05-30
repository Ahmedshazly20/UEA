import { FC } from "react";
import { useSearchParams } from "react-router-dom";
import { IframePdfViewer, PdfViewer } from "../../components";
import { sampleBase64pdf } from "../../data/pdfData";
export const PdfViewerPage: FC<{}> = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const viewerType = searchParams.get("type");
  return (
    <>
      {viewerType === "frame" && <IframePdfViewer content={sampleBase64pdf} />}
      {viewerType === "viewer" && <PdfViewer content={sampleBase64pdf} />}
      {/* <iframe
        src={`${sampleBase64pdf}#view=FitH`}
        width="100%"
        title="xxxx"
        height="1500"
      ></iframe> */}

      {/* */}
      {/* <Document
        file={sampleBase64pdf}
        onLoadSuccess={onDocumentLoadSuccess}
        options={{ workerSrc: "/pdf.worker.js" }}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} />
        ))}
      </Document> */}
    </>
  );
};
