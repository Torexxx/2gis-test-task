import React from "react";

const Book = ({book, setStatusHandler, currentStatus, onTagChangeHandler}) => {

    const toggleStatusLink = <a>{currentStatus === 'to-read' ? 'start reading' : currentStatus === 'in-progress' ? 'finish reading' : 'return in to read'}</a>;

    return (
        <div key={book.id} className='book'>
            <div className="book-header">
                <div>
                    <div>{book.author}</div>
                    <div className="book-title">{book.title}</div>
                </div>

                { currentStatus === 'to-read' &&
                <div onClick={() => setStatusHandler({[book.id]: 'in-progress'})} className='book-status'>
                    {toggleStatusLink}
                </div>
                }
                { currentStatus === 'in-progress' &&
                <div onClick={() => setStatusHandler({[book.id]: 'done'})} className='book-status'>
                    {toggleStatusLink}
                </div>
                }
                { currentStatus === 'done' &&
                <div onClick={() => setStatusHandler({[book.id]: 'in-progress'})} className='book-status'>
                    {toggleStatusLink}
                </div>
                }

            </div>
            <div className="book-description">
                <div>{book.description}</div>
            </div>

            <div className="book-tags">
                {book.tags.map(tag => <div onClick={() => onTagChangeHandler(tag)} key={performance.now() + Math.random()} className="book-tag"> #{tag}</div>)}
            </div>
        </div>
    )
}

export default Book;