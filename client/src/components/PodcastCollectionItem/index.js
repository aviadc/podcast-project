import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import podcastApi from '../../Api';
import "./podcastsCollectionItem.scss"


function PodcastCollectionItem(props) {

  const [visibilty, setVisibilty] = useState("hidden");

  const navigate = useNavigate();


  const handleGoToCollection = () => {
    navigate('/collection', {
      state: {
        imgUrl: props.imgUrl,
        title: props.title,
        podcasts: props.podcasts,
        collectionId: props.collectionId,
        profile: props.profile,
        collectionSize: props.collectionSize
      }
    });
  }

  const showDeleteWindow = () => {
    setVisibilty("visible");
  }


  const handleVisibilty = () => {
    setVisibilty("hidden");
  }

  const handleCollectionDelete = async (id) => {
    try {
      await podcastApi.delete(`/${id}/collection`);
      handleVisibilty();
      props.getUserDetails();
      localStorage.removeItem('collectionsList');
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <div className='collection-card-container'>
      <div className='collection-card' onClick={handleGoToCollection} >
        <div className='collection-card-img'>
          <img src={props.imgUrl} alt='collection-img' />
        </div>
        <h2 className='collection-card-title'>{props.title}</h2>
      </div>
      {props.profile &&
        <>
          <div className='collection-delete-btn'><button onClick={showDeleteWindow} fontSize="1rem">delete</button></div>
          <div className='delete-window' style={{ visibility: visibilty }}>
            <h2> ARE YOU SURE?</h2>
            <div>
              <button onClick={() => handleCollectionDelete(props.collectionId)} >YES</button><button onClick={handleVisibilty}>NO</button>
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default PodcastCollectionItem;
