import { FC, ReactElement } from "react";
import { Worker, Viewer, TextDirection } from "@react-pdf-viewer/core";
import {
  defaultLayoutPlugin,
  ToolbarProps,
  ToolbarSlot,
} from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { isArabicCurrentLanguage } from "../../../utils";

//npm i pdfjs-dist
export const PdfViewer: FC<{
  content: string;
}> = ({ content }) => {
  const contetntType: string = "data:application/pdf;base64,";
  content = content.startsWith(contetntType)
    ? content
    : `${contetntType}${content}`;
  //#region variables
  const isArabic: boolean = isArabicCurrentLanguage();
  const renderToolbar = (Toolbar: (props: ToolbarProps) => ReactElement) => (
    <Toolbar>
      {(slots: ToolbarSlot) => {
        return (
          <div
            style={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <div style={{ padding: "0px 0px" }}>
              <slots.ShowSearchPopover />
            </div>
            <slots.GoToFirstPage />
            <div style={{ padding: "0px px", marginLeft: "auto" }}>
              <slots.GoToPreviousPage />
            </div>
            <slots.CurrentPageInput />
            /
            <slots.NumberOfPages />
            <div style={{ padding: "0px 0px" }}>
              <slots.GoToNextPage />
            </div>
            <div style={{ padding: "0px 0px" }}>
              <slots.GoToLastPage />
            </div>
            <div style={{ padding: "0px 20px" }}></div>
            <div style={{ padding: "0px 2px" }}>
              <slots.ZoomOut />
            </div>
            <div style={{ padding: "0px 2px" }}>
              <slots.Zoom />
            </div>
            <div style={{ padding: "0px 2px" }}>
              <slots.ZoomIn />
            </div>
            <div style={{ padding: "0px 20px" }}></div>
            <div style={{ padding: "0px 2px" }}>
              <slots.SwitchTheme />
            </div>
            <div style={{ padding: "0px 2px", marginLeft: "auto" }}>
              <slots.EnterFullScreen />
            </div>
            <div style={{ padding: "0px 2px" }}>
              <slots.Download />
            </div>
            <div style={{ padding: "0px 2px" }}>
              <slots.Print />
            </div>
          </div>
        );
      }}
    </Toolbar>
  );
  const defaultLayoutPluginInstance = defaultLayoutPlugin({ renderToolbar });
  //#endregion
  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
      <div style={{ height: "720px" }}>
        <Viewer
          theme={{
            direction: isArabic
              ? TextDirection.RightToLeft
              : TextDirection.LeftToRight,
          }}
          fileUrl={content}
          plugins={[defaultLayoutPluginInstance]}
        />
      </div>
    </Worker>
  );
};
