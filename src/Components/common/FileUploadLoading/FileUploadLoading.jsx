import React from 'react';
import './FileUploadLoading.css';

const FileUploadLoading = ({ text = "Đang tải lên..." }) => {
  return (
    <div className="file-upload-loading">
      <div className="file-upload-loading-content">
        <div className="file-upload-spinner"></div>
        <div className="file-upload-text">{text}</div>
      </div>
    </div>
  );
};

export default FileUploadLoading;