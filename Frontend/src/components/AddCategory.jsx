import React, { useRef ,useState} from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faCamera,faCirclePlus} from '@fortawesome/free-solid-svg-icons';
const AddCategory = ({ onClose }) => {
    const popupRef = useRef();

    const handleClick = () => {
        alert("Added successfully");
        onClose();
    };

    const handleClosePopup = (e) => {
        if (popupRef.current === e.target) {
            onClose();
        }
    };
     const[file,setFile]=useState();
     const inputref=useRef(null);
      const handleClick1=()=>{
       inputref.current.click();
      }
      const handleChange=(e)=>{
        const file=e.target.files[0];
        setFile(file);
      }
    return (
        <div
            ref={popupRef}
            onClick={handleClosePopup}
            className='fixed inset-0 bg-opacity-30 backdrop-blur-sm flex flex-col items-center font-sans'
        >
            <div className='relative flex flex-col w-[30%] h-[40%] mt-30 items-start p-5 justify-center rounded-lg bg-white'>
                <button
                    onClick={onClose}
                    className='absolute top-4 right-4 text-gray-600 hover:text-gray-800 cursor-pointer'
                >
                    <FontAwesomeIcon icon={faXmark} />
                </button>
                <label className='mb-2'>Title*</label>
                <input
                    type="text"
                    className='bg-[#eaecee] rounded-lg h-14 w-[90%] '
                    
                />
                <p className='text-slate-400 text-sm font-normal'>
                    Mention the title of the category
                </p>
                <button onClick={handleClick1} className='border-2 border-dashed border-black w-24 h-24  rounded-lg mt-5 '><FontAwesomeIcon icon={faCamera} /><p>Add Icon</p></button>
                        {file? <img src={URL.createObjectURL(file)} className='w-40  h-36'/>:null}
                        <input type="file"ref={inputref} className='mb-7 hidden ' onChange={handleChange} />
            </div>
            <Link to={"/dashboard/admin"}>
                <button
                    className='bg-gradient-to-r from-cyan-500 to-blue-500 text-white w-40 h-11 mt-8 mb-9 rounded-lg font-semibold cursor-pointer'
                    onClick={handleClick}
                >
                    ADD
                </button>
            </Link>
        </div>
    );
};

export default AddCategory;
