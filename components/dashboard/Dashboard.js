import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import DropDown from './DropDown';
import Modal from "../common/Modal";

const Dashboard = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [modal, setModal] = useState(false);
  const [page, setPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState();
  const [perPage, setPerPage] = useState();
  const [dropDown, setDropDown] = useState(2);

  async function fetchData(page, dropDownValue) {
    const apiData = await fetch(
      `https://reqres.in/api/users?page=${page}&per_page=${dropDownValue}`
    );
    apiData
      .json()
      .then(
        value => (
          setPage(page),
          setTableData(value.data),
          setCurrentPage(value.page),
          setTotal(value.total),
          setPerPage(value.per_page),
          setDropDown(dropDownValue)
        )

      );
  }
  useEffect(() => {
    fetchData();
  }, []);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(total / perPage); i++) {
    pageNumbers.push(i);
  }

  const handlePagination = (id, limit) => {
    if (id !== len || id !== 0) {
      setCurrentPage(id);
      fetchData(id, limit);
    } else {
      setCurrentPage(currentPage);
    }
  };

  const renderPageNumbers = pageNumbers.map(id => {
    let limit = dropDown;
    return (
      <span key={id} onClick={() => handlePagination(id, limit)}>
        {id}
      </span>
    );
  });

  let len = renderPageNumbers.length;
  const handleNextClick = (currentPage, dropDown) => {
    if (currentPage <= renderPageNumbers.length) {
      setCurrentPage(currentPage);
      fetchData(currentPage, dropDown);
    }
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    console.log(value);
    setSearchTerm(value);
    filterData(value);
    if (value === '') {
      fetchData();
    }
  };


  const filterData = (searchTerm) => {
    const filteredData = tableData.filter((item) =>
      item.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.last_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setTableData(filteredData);
  };

  const handleClick = ([...num]) => {
    // console.log('argument from Child: ', num);
    setSearchTerm(num[0].first_name);
    filterData(num[0].first_name);
  };

  return (
    <>
      <main className="p-6 sm:p-6 space-y-6">
        <div className="row-span-3 bg-white shadow rounded-lg">
          <div className="flex items-center justify-between px-6 py-5 font-semibold border-b border-gray-100">
            <span className='grow'>Users</span>
            <input
              type="text"
              role="search"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleInputChange}
              className="py-2 pl-10 pr-4 w-full border-4 border-transparent placeholder-gray-400 focus:bg-gray-50 rounded-lg" />
            <DropDown
              className="dropDown-Item"
              fetchData={dropdownValue => {
                fetchData(page, Number(dropdownValue));
              }}
            />
            <div className="flex flex-wrap items-start justify-end -mb-3">
              <button
                className="inline-flex px-5 py-3 text-white bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 rounded-md ml-6 mb-3"
                onClick={() => setModal(true)}
              >
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Filter
              </button>
              <Modal modal={modal} setModal={setModal} handleClick={handleClick} />
            </div>
          </div>
          <div className="overflow-y-auto">
            <ul className="p-2 space-y-2">
              {tableData.map((item) => {
                return (
                  <li className="flex items-center line-border" key={item.id}>
                    <span className="text-gray-600 basis-8">{item.id}</span>
                    <div className="h-10 w-10 mr-6 bg-gray-100 rounded-full overflow-hidden">
                      <Image width={500}
                        height={500}
                        src={item.avatar}
                        alt="Annette Watson profile picture" />
                    </div>
                    <span className="text-gray-600 basis-48">{item.first_name} {item.last_name}</span>
                    <span className="text-gray-600 basis-48">{item.email}</span>
                  </li>
                )
              })
              }
            </ul>
            <div id="pagination">
              <span onClick={() => handleNextClick(currentPage - 1, dropDown)}>
                &laquo;
              </span>
              {renderPageNumbers}
              <span onClick={() => handleNextClick(currentPage + 1, dropDown, len)}>
                &raquo;
              </span>
            </div>
          </div>
        </div>
      </main>

    </>
  );
};

export default Dashboard;