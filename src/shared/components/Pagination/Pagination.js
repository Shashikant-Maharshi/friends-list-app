import {
  useRef,
  useCallback,
  useEffect,
  useState
} from "react";

import Button from "../Button/Button";

import './pagination.scss';

const Pagination = ({data, dataLimit, pageLimit, onAction}) => {
  const [pages] = useState(Math.ceil(data.length / dataLimit));
  const [currentPage, setCurrentPage] = useState(1);
  const currentPageRef = useRef();

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  }

  const goToPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  }

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const updateView = useCallback(() => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;

    onAction(startIndex, endIndex);
  }, [currentPage, dataLimit, onAction]);

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;

    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };

  useEffect(() => {
    if (currentPageRef.current !== currentPage) {
      updateView();
      currentPageRef.current = currentPage;
    }
  }, [currentPage, updateView])

  return (
      <div className="pagination | flex flex-row flex-x-center">
        <Button
          onClick={goToPreviousPage}
          label='prev'
          hasText
          disabled={currentPage === 1}
        />

      {getPaginationGroup().map((item, index) => (
          <Button
            key={index}
            onClick={() => changePage(item)}
            label={item}
            hasText
            hasBorder={currentPage === item}
            disabled={item > pages}
          />
        ))}

        <Button
          onClick={goToNextPage}
          label='next'
          hasText
          disabled={currentPage === pages}
        />
      </div>
  );
};
    
export default Pagination;
