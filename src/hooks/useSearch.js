import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useGetFileFoldersBysearch = () => {
    const { token } = useSelector((e) => e.auth);
    const [fileFoldersBysearch, setFileFoldersBysearch] = useState([]);


    const getFileFoldersBysearch = async (filename) => {
        
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/file-folder/search`, {
                method: "POST",
                body: JSON.stringify({ filename }),
                headers: {
                    "content-type": "application/json",
                    authorization: "Bearer " + token,
                },
            });
            const data = await res.json();
            
            setFileFoldersBysearch(data.data.fileFolders);
            return data.data.fileFolders
        } catch (err) {
            alert(err.message);
        }
    };

    return { getFileFoldersBysearch, fileFoldersBysearch };
};

export default useGetFileFoldersBysearch;
