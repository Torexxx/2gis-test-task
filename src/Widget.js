import React, {useState, useEffect} from 'react';
import './Widget.css';
import Book from "./Book";

const Widget = () => {

    const [books, setBooks] = useState([]);
    const [bookStatus, setBookStatus] = useState({});

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/lastw/test-task/master/data/10-items.json')
            .then(response => response.json())
            .then(data => setBooks(data.items));
    }, []);

    const setStatusHandler = (id) => {
        setBookStatus(prev => {
            return {
                ...prev, ...id
            }
        });
    }

  return (
    <div className="Widget">
      <div className="widget-wrapper">

          <div className="tabs">

              <input type="radio" name="tab-btn" id="tab-btn-1" value="" defaultChecked />
              <label htmlFor="tab-btn-1">To read </label>

              <input type="radio" name="tab-btn" id="tab-btn-2" value=""/>
              <label htmlFor="tab-btn-2">In progress</label>

              <input type="radio" name="tab-btn" id="tab-btn-3" value=""/>
              <label htmlFor="tab-btn-3">Done</label>

              <div id="content-1">
                  {books
                      .filter(book => bookStatus[book.id] === undefined)
                      .map(book => <Book book={book} setStatusHandler={setStatusHandler} status = {'start reading'} />)
                  }
              </div>

              <div id="content-2">
                  {books
                      .filter(book => 'finish-reading' === bookStatus[book.id])
                      .map(book => <Book book={book} setStatusHandler={setStatusHandler} status = {'finish reading'} />).length
                  ?
                  books
                      .filter(book => 'finish-reading' === bookStatus[book.id])
                      .map(book => <Book book={book} setStatusHandler={setStatusHandler} status = {'finish reading'} />) : 'List is empty'
                  }
              </div>

              <div id="content-3">
                  {books
                      .filter(book => 'return-in-to-read' === bookStatus[book.id])
                      .map(book => <Book book={book} setStatusHandler={setStatusHandler} status = {'return-in-to-read'} />).length
                      ?
                      books
                          .filter(book => 'return-in-to-read' === bookStatus[book.id])
                          .map(book => <Book book={book} setStatusHandler={setStatusHandler} status = {'return-in-to-read'} />) : 'List is empty'
                  }
              </div>
          </div>
      </div>
    </div>
  );
}

export default Widget;
