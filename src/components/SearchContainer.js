import React from 'react'
import { FormRow, FormRowSelect } from ".";
import Wrapper from "../assets/wrappers/SearchContainer";
import { useSelector, useDispatch } from "react-redux";
import { clearFilters, handleChange } from '../features/allJobs/allJobsSlice';

const SearchContainer = () => {
  const {isLoading, search, searchStatus, searchType, sort, sortOptions} = useSelector((store) => store.allJobs)
  const {jobTypeOptions, statusOptions} = useSelector((store) => store.job)
  const dispatch = useDispatch()
  const handleSearch = (e) => {
    if(isLoading) return
    dispatch(handleChange({name: e.target.name, value: e.target.value}))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(clearFilters())
  }
  return (
    <Wrapper>
      {/* status */}
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
          {/* search position */}
          <FormRow type='text' name='search' value={search} handleChange={handleSearch} />

          {/* search by status */}
          <FormRowSelect labelText='status' name='searchStatus' value={searchStatus} handleChange={handleSearch} list={['all', ...statusOptions]} />

          {/* search by jobType */}
          <FormRowSelect labelText='type' name='searchType' value={searchType} handleChange={handleSearch} list={['all', ...jobTypeOptions]} />

          {/* search by sort */}
          <FormRowSelect  name='sort' value={sort} handleChange={handleSearch} list={sortOptions} />

          <button className="btn btn-block btn-danger" onClick={handleSubmit} disabled={isLoading}>clear filters</button>
        </div>

       
      </form>
    </Wrapper>
  )
}

export default SearchContainer