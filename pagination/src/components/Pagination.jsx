const Pagination =({paginate,postsPerPage,currentPage,totalPosts})=>{
  const pageNumbers=[]
  for(let i =1;i<=Math.ceil(totalPosts/postsPerPage);i++){
    pageNumbers.push(i)
  }
  return( <nav>
    <ul className="pagination">
      {
        pageNumbers.map((number)=>(
          // {}需要写return ()不需要写return
          <li key={number} className="page-item">
          <a
          onClick={()=>paginate(number)} 
          href="#" className={`page-link ${currentPage===number ? "active-page" : ""}`}>{number}</a>
        </li>
        ))
      }
    </ul>
  </nav>)
}

export default Pagination