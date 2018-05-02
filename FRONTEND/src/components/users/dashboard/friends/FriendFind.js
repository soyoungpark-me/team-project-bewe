import React, { Component } from 'react';
import { reduxForm, reset, Field } from 'redux-form';
import { connect } from 'react-redux';
import { searchFriends } from 'actions/users/FriendActions';

const renderInput = (field) => {
  return (
    <div>
      <input {...field.input} type={field.type} className="message-text" />
    </div>
  )
}

class FriendFind extends Component{
  constructor(props) {
    super(props);
  }

  onSubmit(values) {
    this.props.searchFriends(values);
  }

  render() {
    const { handleSubmit, submitMyForm } = this.props;

    return (
      <div className="friend-find-view-wrapper">
        <p className="friend-find-info">ID로 친구를 찾을 수 있습니다.</p>
        <form className="message-write" 
          onSubmit={handleSubmit(this.onSubmit.bind(this))}
          style={{"width": "88%", "margin": "0 auto"}}>
          <Field name="id" component={renderInput} />

          <button type="submit"><span className="ion-android-search"></span></button>        
        </form>
      </div>
    )
  }
}

FriendFind = connect(null, { searchFriends })(FriendFind);

export default reduxForm({
  form: 'FriendFindForm'
})(FriendFind);