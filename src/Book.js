import React from "react";

const Book = ({book, setStatusHandler, status}) => {


    return (
        <div key={book.id} className='book'>
            <div className="book-header">
                <div>
                    <div>{book.author}</div>
                    <div className="book-title">{book.title}</div>
                </div>

                { status === 'start reading' &&
                <div onClick={() => setStatusHandler({[book.id]: 'finish-reading'})}
                     className='book-status'><a href>{status === 'start reading' ? 'start reading' : status === 'finish reading' ? 'finish reading' : 'return in to read'}</a>
                </div>
                }
                { status === 'finish reading' &&
                <div onClick={() => setStatusHandler({[book.id]: 'return-in-to-read'})}
                     className='book-status'><a href>{status === 'start reading' ? 'start reading' : status === 'finish reading' ? 'finish reading' : 'return in to read'}</a>
                </div>
                }
                { status === 'return-in-to-read' &&
                <div onClick={() => setStatusHandler({[book.id]: 'finish-reading'})}
                     className='book-status'><a href>{status === 'start reading' ? 'start reading' : status === 'finish reading' ? 'finish reading' : 'return in to read'}</a>
                </div>
                }





            </div>
            <div className="book-description">
                <div>{book.description}</div>
            </div>

            <div className="book-tags">
                {book.tags.map(tag => <div className="book-tag"> #{tag}</div>)}
            </div>
        </div>
    )
}

export default Book;