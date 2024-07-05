const books = [
  { id: 1, title: "Book 1", description: "Description for Book 1",author:"Andy" },
  { id: 2, title: "Book 2", description: "Description for Book 2",author:"Bob"  },
  { id: 3, title: "Book 3", description: "Description for Book 3",author:"Carlo"  }
];

const FAKE_DELAY = 2000

// Promise + setTimeout fakeAPI用来模拟读取数据时的延迟
const fakeAPI = {
  fetchBooks:()=>{
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        resolve(books)
      },(FAKE_DELAY))
    })
  },
  addBooks:(book)=>{
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        book.id= Math.max(...books.map(b=>b.id))+1
        books.push(book)
        resolve(book)
      },(FAKE_DELAY))
    })
  }
}

export default fakeAPI