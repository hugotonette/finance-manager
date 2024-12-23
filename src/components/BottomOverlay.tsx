/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from "react";

export interface BottomOverlayProps {
  overlayOpen: boolean;
  setOverlayOpen: React.Dispatch<React.SetStateAction<boolean>>;
  content: React.ReactNode;
}

const BottomOverlay: FC<BottomOverlayProps> = ({
  overlayOpen,
  setOverlayOpen,
  content,
}) => {
  const toggleOverlay = () => {
    setOverlayOpen(!overlayOpen);
  };

  return (
    <>
      {/* darken overlay */}
      <div
        className={`fixed top-0 left-0 bg-black ${
          overlayOpen
            ? "opacity-50 right-0 bottom-0 transition-opacity"
            : "opacity-0"
        }`}
        onClick={toggleOverlay}
      />
      ;{/* Bottom menu */}
      <div
        className={`flex flex-col fixed bottom-0 w-screen rounded-tl-3xl p-6 bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100 h-[70%] z-10 shadow-2xl transition-transform transform ${
          overlayOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="w-full h-fit flex flex-row justify-end items-end gap-6">
          <button onClick={toggleOverlay} className="px-3 py-1 rounded-full">
            X
          </button>
        </div>
        <div>{content}</div>
      </div>
      ;
    </>
  );
};

export default BottomOverlay;
