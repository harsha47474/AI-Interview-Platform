import React from "react";
import { FaSpinner, FaCheckCircle, FaFileUpload } from "react-icons/fa";

/**
 * ResumeUploader - PDF drag-and-drop / file selector with analyzing states
 */
const ResumeUploader = ({
  analyzing,
  analyzedData,
  resumeFile,
  onResumeUpload,
  onRemoveResume,
}) => {
  return (
    <div>
      <label className="text-sm font-semibold text-gray-700">
        Resume
        <span className="text-gray-400 font-normal"> PDF Format</span>
      </label>

      <label
        className="mt-2 border-2 border-dashed border-gray-200
                   hover:border-green-400 rounded-xl p-6
                   flex flex-col items-center justify-center
                   cursor-pointer transition"
      >
        {analyzing ? (
          <>
            <FaSpinner className="text-green-600 text-2xl animate-spin" />
            <p className="text-sm text-gray-600 mt-3">
              Analyzing your resume...
            </p>
          </>
        ) : analyzedData ? (
          <>
            <FaCheckCircle className="text-green-600 text-3xl" />
            <p className="text-sm font-medium text-green-600 mt-2">
              Resume analyzed successfully
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {resumeFile?.name}
            </p>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onRemoveResume();
              }}
              className="text-sm text-white bg-green-600 p-2 rounded-lg mt-2"
            >
              Remove the file
            </button>
          </>
        ) : (
          <>
            <FaFileUpload className="text-gray-400 text-2xl" />
            <p className="text-sm text-gray-600 mt-3">
              Upload your resume (Optional)
            </p>
            <p className="text-xs text-gray-400 mt-1">PDF</p>
          </>
        )}

        {!analyzing && !analyzedData && (
          <input
            type="file"
            accept=".pdf"
            required
            onChange={onResumeUpload}
            className="hidden"
          />
        )}
      </label>
    </div>
  );
};

export default ResumeUploader;
