import React from 'react';

const comment = {
   date: new Date(),
   text: 'I hope you enjoy learning React!',
   author: {
     name: 'Hello Kitty',
     avatarUrl: 'https://placekitten.com/g/64/64',
   },
};

class formatDate extends React.Component {
   render() {
      return (
         date.toLocaleDateString()
      );
   }
}
class Avatar extends React.Component {
   render() {
      return (
         <img
           className="Avatar"
           src={props.user.avatarUrl}
           alt={props.user.name}
         />
       );
   }
}
class UserInfo extends React.Component {
   render() {
      return (
         <div className="UserInfo">
           <Avatar user={props.user} />
           <div className="UserInfo-name">{props.user.name}</div>
         </div>
       );
   }
}
class Comment extends React.Component{
   render() {
      return (
         <div className="Comment">
           <UserInfo user={props.author} />
           <div className="Comment-text">{props.text}</div>
           <div className="Comment-date">
             {formatDate(props.date)}
           </div>
         </div>
       );
   }
}
export default App;
