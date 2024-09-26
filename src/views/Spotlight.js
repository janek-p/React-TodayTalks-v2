import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import axios from '../config';
import { IMAGE_BASE_URL, DEFAULT_POST } from '../config';
import CustomPagination from '../components/CustomPagination';
import Loader from '../components/Loader';

const SpotLightComponent = () => {
  const { name } = useParams();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [totalPosts, setTotalPosts] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      let response;
      setLoading(true);
      if (name === 'spotlight')
        response = await axios.get(`/api/user/pagenationSpotlightPosts`, {
          params: {
            currentPage: currentPage,
            postsPerPage,
          },
        });
      else
        response = await axios.get(`/api/user/pagenationTrendingPosts`, {
          params: {
            currentPage: currentPage,
            postsPerPage,
          },
        });
      if (postsPerPage === 'all') {
        setPosts(response.data);
        setTotalPosts(response.data.length);
      } else {
        setPosts(response.data.data);
        setTotalPosts(response.data.total);
      }
      setLoading(false);
    };
    fetch();
  }, [name, currentPage, postsPerPage]);

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handlePerPageChange = (event) => {
    setPostsPerPage(event.target.value);
    setCurrentPage(1); // Reset to the first page
  };

  if (loading) return <Loader />;

  return (
    <>
      {posts.length && (
        <section className='blog-area pt-60 pb-60'>
          <div className='container'>
            <div className='author-inner-wrap'>
              <div className='row justify-content-center'>
                <div className='col-70'>
                  <div className='weekly-post-item-wrap-three'>
                    <div className='row'>
                      {posts.map((post) => (
                        <div className='col-md-6'>
                          <div className='weekly-post-three'>
                            <div className='weekly-post-thumb'>
                              <Link to={`/${post.category_type === 'news' ? 'news_detail' : 'article_detail'}/${post.seo_slug}`}>
                                <img src={post.img ? IMAGE_BASE_URL + post.img : IMAGE_BASE_URL + DEFAULT_POST} alt={post.title} />
                              </Link>
                              <Link to={`/${post.category_type}/${post.category_data_query}`} className='post-tag'>
                                {post.category_name}
                              </Link>
                            </div>
                            <div className='weekly-post-content'>
                              <h2 className='post-title'>
                                <Link to={`/${post.category_type === 'news' ? 'news_detail' : 'article_detail'}/${post.seo_slug}`}>{post.title}</Link>
                              </h2>
                              <div className='blog-post-meta'>
                                <ul className='list-wrap'>
                                  <li>
                                    <FontAwesomeIcon icon='fa-regular fa-calendar' /> {new Date(post.created_at).toLocaleDateString()}
                                  </li>
                                </ul>
                              </div>
                              <p>{post.sub_title.length > 250 ? `${post.sub_title.slice(0, 250)}...` : post.sub_title}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <>
                    <CustomPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                    <form className='form-inline ml-3'>
                      <label htmlFor='per_page' className='mr-2'>
                        Show:
                      </label>
                      <select name='per_page' id='per_page' className='form-control' value={postsPerPage} onChange={handlePerPageChange}>
                        <option value='10'>10/page</option>
                        <option value='20'>20/page</option>
                        <option value='all'>All</option>
                      </select>
                    </form>
                  </>
                </div>
                <div className='col-30'>
                  <div className='sidebar-wrap'>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SpotLightComponent;
