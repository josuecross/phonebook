const Filter = ( { handleFilterChange, newFilter } ) => {
    return <>
        Filter shown with 
        <input type="text" value={newFilter} onChange={handleFilterChange} />
    </>
}
  
export default Filter;