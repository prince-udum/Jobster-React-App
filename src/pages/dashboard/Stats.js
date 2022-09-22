import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showStats } from '../../features/allJobs/allJobsSlice';
import { StatsContainer, ChartsContainer } from '../../components';
import Loading from '../../components/Loading';

const Stats = () => {
  const dispatch = useDispatch();

  const {isLoading, monthlyApplications} = useSelector((store) => store.allJobs)
  

  useEffect(() => {
      dispatch(showStats())
    }, [])

  if(isLoading){
    return <Loading center />
  }  
  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
    
    
  )
}

export default Stats