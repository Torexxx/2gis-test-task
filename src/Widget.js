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

    const filteredBooksToRead = books
        .filter(book => bookStatus[book.id] === undefined)
        .map(book => <Book key = {book.id} book={book} setStatusHandler={setStatusHandler} currentStatus = {'to-read'} />);

    const filteredBooksInProgress = books
        .filter(book => 'in-progress' === bookStatus[book.id])
        .map(book => <Book  key = {book.id} book={book} setStatusHandler={setStatusHandler} currentStatus = {'in-progress'} />);

    const filteredBooksDone = books
        .filter(book => 'done' === bookStatus[book.id])
        .map(book => <Book  key = {book.id} book={book} setStatusHandler={setStatusHandler} currentStatus = {'done'} />);

  return (
    <div className="Widget">
      <div className="widget-wrapper">
          <div className="tabs">
              <input type="radio" name="tab-btn" id="tab-btn-to-read" value="" defaultChecked />
              <label htmlFor="tab-btn-to-read">To read ({filteredBooksToRead.length}) </label>
              <input type="radio" name="tab-btn" id="tab-btn-in-progress" value=""/>
              <label htmlFor="tab-btn-in-progress">In progress ({filteredBooksInProgress.length})</label>
              <input type="radio" name="tab-btn" id="tab-btn-done" value=""/>
              <label htmlFor="tab-btn-done">Done ({filteredBooksDone.length})</label>
              <div id="to-read">
                  {filteredBooksToRead.length ? filteredBooksToRead : 'List is empty'}
              </div>
              <div id="in-progress">
                  {filteredBooksInProgress.length ? filteredBooksInProgress : 'List is empty'}
              </div>
              <div id="done">
                  {filteredBooksDone.length ? filteredBooksDone : 'List is empty'}
              </div>
          </div>
      </div>
    </div>
  );
}

export default Widget;
