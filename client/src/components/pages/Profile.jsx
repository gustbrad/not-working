import React from 'react';
import PropTypes from 'prop-types';
import YoutubeEmbedVideo from "youtube-embed-video";



const Profile = ({ secretData, user }) => (
  user.isMusician?
  <div className="content">
  <h1>MusicianProfile Page</h1>
  {<div>Welcome Musician: <strong>{user.firstName}</strong>!<br /></div>}
  {<div><strong>{user.lastName}</strong>!<br /></div>}
  {<div><strong>{user.city}</strong>!<br /></div>}
    {<div><strong>{user.state}</strong>!<br /></div>}
    {<div><strong>{user.instrument}</strong>!<br /></div>}
    {<div><strong>{user.experience}</strong>!<br /></div>}
    {<div><strong>{user.videoLink}</strong>!<br /></div>}
    <YoutubeEmbedVideo size="medium" videoId={user.videoLink} className="video-player" style={{ borderWidth: 5, borderColor: '#ffffff', borderStyle: 'solid' }} suggestions={false} />
</div>
  :
  <div className="content">
    <h1>BandProfile Page</h1>
    <p>
      Donec a volutpat quam. Curabitur nec varius justo, sed rutrum ligula. Curabitur pellentesque
      turpis sit amet eros iaculis, a mollis arcu dictum. Ut vel ante eget massa ornare placerat.
      Etiam nisl orci, finibus sodales volutpat et, hendrerit ut dolor. Suspendisse porta dictum
      nunc, sed pretium risus rutrum eget. Nam consequat, ligula in faucibus vestibulum, nisi justo
      laoreet risus, luctus luctus mi lacus sit amet libero. Class aptent taciti sociosqu ad litora
      torquent per conubia nostra, per inceptos himenaeos. Mauris pretium condimentum tellus eget
      lobortis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec placerat
      accumsan mi, ut congue neque placerat eu. Donec nec ipsum in velit pellentesque vehicula sit
      amet at augue. Maecenas aliquam bibendum congue. Pellentesque semper, lectus non ullamcorper
      iaculis, est ligula suscipit velit, sed bibendum turpis dui in sapien.
    </p>
    {<div>Welcome Band: <strong>{user.bandName}</strong>!<br /></div>}
    {<div><strong>{user.musicGenre}</strong>!<br /></div>}
    {<div><strong>{user.city}</strong>!<br /></div>}
    {<div><strong>{user.state}</strong>!<br /></div>}
    {<div><strong>{user.instrument}</strong>!<br /></div>}
    {<div><strong>{user.experience}</strong>!<br /></div>}
    {<div><strong>{user.videoLink}</strong>!<br /></div>}
    {<div><strong>{user.bandDescription}</strong>!<br /></div>}
    <YoutubeEmbedVideo size="medium" videoId={user.videoLink} className="video-player" style={{ borderWidth: 5, borderColor: '#ffffff', borderStyle: 'solid' }} suggestions={false} />
  </div>

);


Profile.propTypes = {
  secretData: PropTypes.string.isRequired
};

export default Profile;
