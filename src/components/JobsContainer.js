import React from 'react'
import { useEffect } from 'react';
import Job from './Job';
import Wrapper from '../assets/wrappers/JobsContainer';
import { useSelector, useDispatch } from 'react-redux';
import { store } from '../store';
import Loading from './Loading';
import { getAllJobs } from '../features/allJobs/allJobsSlice';
import PageBtnContainer from './PageBtnContainer';


const JobsContainer = () => {
    const {isLoading, jobs, page, numOfPages, totalJobs, search, sort, searchStatus, searchType} = useSelector((store) => store.allJobs);
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getAllJobs())
    },[page, searchStatus, searchType, sort, search])

    if(isLoading) {
        return <Loading />
    }

    if(jobs.length === 0){
        return <Wrapper><h2>No job to display...</h2></Wrapper>
    }

    
  return (
    <Wrapper>
        <h5>{totalJobs} job{totalJobs > 1 && 's'}</h5>
        <div className="jobs">
            {jobs.map((job)=> {
                return <Job key={job._id} {...job}/>
            })}
        </div>
        {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  )
}

export default JobsContainer