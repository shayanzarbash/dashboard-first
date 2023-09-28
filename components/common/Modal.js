/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";

const Modal = ({ modal, setModal, handleClick }) => {

  // console.log("jj", handleClick);


  const [inputFields, setInputFields] = useState([
    { id: '', email: '', first_name: '', last_name: '' }
  ]);

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    let list = [...inputFields];
    list[index][name] = value;
    setInputFields(list);
    console.log(list)
    // setTableData(list);
  };

  const handleRemoveClick = index => {
    const list = [...inputFields];
    list.splice(index, 1);
    setInputFields(list);
  };

  const addFields = () => {
    let newfield = { id: '', email: '', first_name: '', last_name: '' }
    setInputFields([...inputFields, newfield])
  };

  return (
    <>
      <PureModal
        isOpen={modal}
        width="800px"
        onClose={() => {
          setModal(false);
          return true;
        }}
      >
        <div className="flex-row space-y-3 relative">
          <div className="bg-purple-600 p-2 font-bold text-lg text-center text-white -mt-4 -mx-4 mb-5 pb-4">
            <p>Category</p>
          </div>
          <div className="flex flex-row-reverse">

            <div>
              {inputFields.map((item, index) => {
                return (
                  <div className="flex justify-between pb-3" key={index}>
                    <input
                      type="text"
                      name="id"
                      className="mr-2 block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="id"
                      value={item.id}
                      onChange={e => handleInputChange(e, index)}
                    />
                    <input
                      type="text"
                      name="first_name"
                      className="mr-2 block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="name"
                      value={item.first_name}
                      onChange={e => handleInputChange(e, index)}
                    />
                    <input
                      type="text"
                      name="last_name"
                      className="mr-2 block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="lastname"
                      value={item.last_name}
                      onChange={e => handleInputChange(e, index)}
                    />
                    <input
                      type="text"
                      name="email"
                      className="mr-2 block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="email"
                      value={item.email}
                      onChange={e => handleInputChange(e, index)}
                    />
                    <div className="flex">
                      {inputFields.length !== 1 ? (
                        <button
                          className="nline-flex px-5 py-3 text-white bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 rounded-md ml-3"
                          onClick={() => handleRemoveClick(index)}>
                          ×
                        </button>
                      ) : (<div className="w-16"></div>)
                      }
                      {inputFields.length - 1 === index ? (
                        <button
                          className="inline-flex px-5 py-3 text-white bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 rounded-md ml-4"
                          onClick={addFields}
                        >
                          +
                        </button>
                      ) : (<div className="w-16"></div>)}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="flex justify-between">
            <button onClick={() => handleClick(inputFields)}
              className="bg-gray-700 text-white p-3 w-full mt-5 text-lg">
              Filter
            </button>
          </div>
        </div>
      </PureModal>
    </>
  );
};

export default Modal;
