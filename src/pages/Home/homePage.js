import { useEffect, useRef, useState } from "react";
import React from "react";
import Navbar from "../../components/navbar";
import useCreateFolder from "../../hooks/useCreateFolder";
import useGetFileFolders from "../../hooks/useGetFileFolders";
import useGetFileFoldersBysearch from "../../hooks/useSearch";
import useUploadFile from "../../hooks/useUploadFile";
import "./home.css";
import SearchIcon from "@mui/icons-material/Search";

import folderLogo from "../../svg/Folder.svg";
import fileLogo from "../../svg/File.svg";
import { useNavigate } from "react-router-dom";
import { FaHome, FaUser, FaShareAlt, FaStar, FaTrash, FaInfoCircle, FaQuestionCircle } from 'react-icons/fa';

const HomePage = () => {
  const [newFolder, setNewFolder] = useState("");
  const inputRef = useRef(null);
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const { createFolder } = useCreateFolder();
  const [folderStructure, setFolderStructure] = useState([
    { _id: null, name: "Cloud Home" },
  ]);
  const { getFileFolders, fileFolders, setFileFolders } = useGetFileFolders();
  const { getFileFoldersBysearch } = useGetFileFoldersBysearch()
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState(true)




  const parentFolder = folderStructure[folderStructure.length - 1];

  const handleDoubleClick = (elem) => {
    if (elem.type == "folder") {
      setFolderStructure([...folderStructure, elem]);
      setStatus(true)
    } else {
      window.open(elem.link);
    }
  };

  const handleAllowCreateFolder = () => {
    setShowCreateFolder(true);
  };

  const handleCreateFolder = async () => {
    if (newFolder.length > 0) {
      await createFolder({
        name: newFolder,
        parentId: parentFolder._id,
      });
      getFileFolders(parentFolder._id);
      setShowCreateFolder(false);
    }
  };

  const navigate = () => {
    getFileFolders()

  }


  const handleSearch = () => {
    getFileFoldersBysearch(search).then((data) => {
      if (data.length === 0) alert('No Document found')
      else {
        setFileFolders(data);
        setStatus(false)
      }


    })


  }





  useEffect(() => {
    getFileFolders(parentFolder._id);
  }, [folderStructure]);

  const handleBackClick = (clickIdx) => {
    const newFolderStructure = folderStructure.filter(
      (elem, idx) => idx <= clickIdx
    );
    setFolderStructure(newFolderStructure);
  };
  //-----------------------------------------------------------------------
  const { isUploadAllowed, uploadFile } = useUploadFile();
  const handleFileUpload = async (e) => {
    if (isUploadAllowed) {
      const file = e.target.files;
      await uploadFile({
        file: file[0],
        parentId: parentFolder._id,
      });
      getFileFolders(parentFolder._id);
    } else {
      alert("Uploading is already in progress. Please wait...");
    }
  };
  //-----------------------------------------------------------------------
  return (
    <div>
      <Navbar />
      <div className="homepage-main-container">
        <div className="homepage-main">
          <div className="homepage-left">
            <div className="left-main">
              <div className="nav-item" onClick={() => navigate()}>
                <FaHome className="icon" />
                <span>HOME</span>
              </div>
              <div className="nav-item">
                <FaUser className="icon" />
                <span>Account</span>
              </div>
              <div className="nav-item">
                <FaShareAlt className="icon" />
                <span>Shared with me</span>
              </div>
              <div className="nav-item">
                <FaStar className="icon" />
                <span>Starred</span>
              </div>
              <div className="nav-item">
                <FaTrash className="icon" />
                <span>Bin</span>
              </div>
              <div className="nav-item">
                <FaInfoCircle className="icon" />
                <span>About us</span>
              </div>
              <div className="nav-item">
                <FaQuestionCircle className="icon" />
                <span>Help</span>
              </div>
            </div>
          </div>
          <div className="homepage-right">
            <text className="text-class">Welcome To X-Drive</text>
            <div className="homepage-search">
              <input onChange={(e) => setSearch(e.target.value)} />
              <SearchIcon
                onClick={handleSearch}
                fontSize="large"
                sx={{ position: "relative", left: "-50px", bottom: "-5px" }}
              />
            </div>
            {status ? <div className="homepage-navigation">
              <ul className="custom-list">
                {folderStructure.map((elem, idx) => (
                  <li key={idx} onClick={() => handleBackClick(idx)}>
                    {elem.name}
                  </li>
                ))}
              </ul>
            </div> : <></>}
            {status ? <div className="button-input">
              <button
                className="button-active"
                onClick={handleAllowCreateFolder}
              >
                Create Folder
              </button>
              <input
                className="file-upload-input"
                ref={inputRef}
                type="file"
                onChange={handleFileUpload}
              />
            </div> : <></>}
            <div>
              {showCreateFolder && (
                <div className="folder-name">
                  <input
                    value={newFolder}
                    onChange={(e) => setNewFolder(e.target.value)}
                    placeholder="Enter file name"
                  />
                  <button onClick={handleCreateFolder}>Create</button>
                  <button onClick={() => setShowCreateFolder(false)}>
                    Cancel
                  </button>
                </div>
              )}
            </div>
            <div className="display-items">
              {fileFolders.map((elem) => {

                return elem.type === "folder" ? (
                  <div key={elem._id}
                    className="display-folder"
                    onDoubleClick={() => handleDoubleClick(elem)}
                  >
                    <img className="folder-logo-img" src={folderLogo} />
                    <text>{elem.name}</text>
                  </div>
                ) : (
                  <div
                    key={elem._id}
                    className="display-folder"
                    onDoubleClick={() => handleDoubleClick(elem)}
                  >
                    <img className="folder-logo-img" src={fileLogo} />
                    <text>{elem.name}</text>
                    <text className="date">{elem.updatedAt.slice(0, 10)}</text>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
