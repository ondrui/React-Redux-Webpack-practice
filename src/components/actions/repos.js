import axios from 'axios';
import {setFetchError, setIsFetching, setRepos} from '../../reducers/reposReducer';

//actions

//вызов через redux dispatch
export const getRepos = (searchQuery = 'stars:%3E1', currentPage, perPage) => {
  searchQuery = searchQuery || 'stars:%3E1';
  return async(dispatch) => {
    try {
      dispatch(setIsFetching(true));
      const response = await axios.get(`https://api.github.com/search/repositories?q=${searchQuery}&sort=stars&per_page=${perPage}&page=${currentPage}`);
      dispatch(setRepos(response.data));
    } catch (e) {
      dispatch(setFetchError(true));
      dispatch(setIsFetching(false));
      //надпись про ошибку будет исчезать
      setTimeout(() => {
        dispatch(setFetchError(false));
      }, 2000);
    }

  }
}

//вызов через react
export const getCurrentRepo = async (username, repoName, setRepo, dispatch) => {
  const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}`);
  setRepo(response.data);
  dispatch(setIsFetching(false));
}

export const getContributors = async (username, repoName, setContributors) => {
  const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}/contributors?page=1&per_page=10`);
  setContributors(response.data);


}

