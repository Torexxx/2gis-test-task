import React, {useState, useEffect} from 'react';
import './Widget.css';
import Book from "./Book";

const Widget = () => {

    const [books, setBooks] = useState([]);
    const [bookStatus, setBookStatus] = useState({});

    const url = new URL(window.location.href);
    let queryCurrentTab = url.searchParams.get('tab') || 'to-read';
    let queryTags = url.searchParams.get('tags') || '';

    const [tags, setTags] = useState(queryTags);
    const [currentTab, setCurrentTab] = useState(queryCurrentTab);

    React.useEffect(() => {
            window.history.pushState('', '', `?tab=${currentTab}&tags=${tags}`);
    }, [currentTab, tags])


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
    const onTagChangeHandler = (tag) => {

        setTags(prev => {
            return  [
                ...prev,  ...tag + ', '
            ].join('')
        });
    };

    const filteredBooksToRead = books
        .filter(book => bookStatus[book.id] === undefined && tags ? book.tags.some(t => t === tags.split(',').filter(el => el === t).join('')) : bookStatus[book.id] === undefined )
        .map(book => <Book key = {book.id} book={book} setStatusHandler={setStatusHandler} currentStatus = {'to-read'} onTagChangeHandler = {onTagChangeHandler} />);

    const filteredBooksInProgress = books
        .filter(book => 'in-progress' === bookStatus[book.id] && tags ? book.tags.some(t => t === tags.split(',').filter(el => el === t).join('')) : 'in-progress' === bookStatus[book.id] )
        .map(book => <Book  key = {book.id} book={book} setStatusHandler={setStatusHandler} currentStatus = {'in-progress'} onTagChangeHandler = {onTagChangeHandler} />);

    const filteredBooksDone = books
        .filter(book => 'done' === bookStatus[book.id] && tags ? book.tags.some(t => t === tags.split(',').filter(el => el === t).join('')) : 'done' === bookStatus[book.id])
        .map(book => <Book  key = {book.id} book={book} setStatusHandler={setStatusHandler} currentStatus = {'done'} onTagChangeHandler = {onTagChangeHandler} />);

  return (
    <div className="Widget">
      <div className="widget-wrapper">
          <div className="tabs">
              <input type="radio" name="tab-btn" id="tab-btn-to-read" value=""  defaultChecked={currentTab === 'to-read'} />
              <label onClick={() => setCurrentTab('to-read')} htmlFor="tab-btn-to-read">To read ({filteredBooksToRead.length}) </label>
              <input type="radio" name="tab-btn" id="tab-btn-in-progress" value="" defaultChecked={currentTab === 'in-progress'}/>
              <label onClick={() => setCurrentTab('in-progress')} htmlFor="tab-btn-in-progress">In progress ({filteredBooksInProgress.length})</label>
              <input type="radio" name="tab-btn" id="tab-btn-done" value="" defaultChecked={currentTab === 'done'}/>
              <label onClick={() => setCurrentTab('done')} htmlFor="tab-btn-done">Done ({filteredBooksDone.length})</label>
              <div className='tags-block'> {tags }</div>
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
