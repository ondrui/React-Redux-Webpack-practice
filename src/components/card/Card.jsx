import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {getContributors, getCurrentRepo} from '../actions/repos';
import './card.less';
import {useDispatch, useSelector} from 'react-redux';
import {setIsFetching} from '../../reducers/reposReducer';
import Repo from '../main/repo/Repo';

const Card = (props) => {
  //useParams() - хук с помощью которого можно показать отдельные части URL
  const {username, reponame} = useParams();

  //{owner: {}} - добавили, чтобы не обращаться к несуществующим полям
  const [repo, setRepo] = useState({owner: {}});
  const [contributors, setContributors] = useState([]);
  const dispatch = useDispatch();
  const isFetching = useSelector(state => state.repos.isFetching);

  useEffect(() => {
    dispatch(setIsFetching(true));
    getCurrentRepo(username, reponame, setRepo, dispatch);
    getContributors(username, reponame, setContributors);
    //dispatch(setIsFetching(false));
  }, []);

  return (
    <div>

      {
        isFetching === false
          ?
          <div>
          <button onClick={() => props.history.goBack()} className='back-btn'>BACK</button>
          <div className='card'>
            <img src={repo.owner.avatar_url} alt='repo user' className='userAvatar'/>
            <div className='name'>{repo.name}</div>
            <div className='stars'>{repo.stargazers_count}</div>
          </div>
          {contributors.map((c, index) =>
          <div key={index}>{index + 1}. {c.login}</div>
          )}
          </div>
          :
          <div className='fetching'></div>
      }


    </div>
  );
};

export default Card;