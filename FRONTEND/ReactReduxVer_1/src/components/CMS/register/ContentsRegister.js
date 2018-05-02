import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, Fields} from 'redux-form';
import Dropzone from 'react-dropzone';
import {createContent} from '../../../actions/CMS/CMSAction';


class ContentsRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {files: []};
    this.renderFields = this.renderFields.bind(this);
  };

  // onDrop(files) {
  //   this.setState({
  //     files
  //   });
  // }
  onDrop(files) {
    // const fileBlob = files[0];
    // const newFile = {};
    // const _fileProperties = [
    //   'File',
    //   'lastModified',
    //   'lastModifiedDate',
    //   'name',
    //   'path',
    //   'preview',
    //   'size',
    //   'type',
    //   'webkitRelativePath'
    // ];
    // _fileProperties.forEach(key => {
    //   newFile[key] = fileBlob[key];
    // });

    this.setState({
      files
    })
    // return newFile;
  }



  renderFields = (fields) => {
    return (
      <div>
        <div className="game-register-field">
          <label className="game-register-label">제목</label>
          <input className="game-register-input" {...fields.title.input} type="text" placeholder="title"/>
          {
            fields.title.meta.touch && fields.title.meta.error
            && <span className="error">
            {fields.title.meta.error}
            </span>
          }
        </div>
        <div className="game-register-field">
          <label className="game-register-label">장르</label>
          <input className="game-register-input" {...fields.genre.input} type="text" placeholder="genre"/>
          {
            fields.genre.meta.touch && fields.genre.meta.error
            && <span className="error">
            {fields.genre.meta.error}
            </span>
          }
        </div>
        <div className="game-register-field">
          <label className="game-register-label">설명</label>
          <input className="game-register-input" {...fields.description.input} type="text" placeholder="desc"/>
          {
            fields.description.meta.touch && fields.description.meta.error
            && <span className="error">
            {fields.description.meta.error}
            </span>
          }
        </div>
        <div>
          <Dropzone {...fields.image.input} 
            onDrop={this.onDrop.bind(this)} 
            accept="image/*"
            className="contents-register-dropzone">
          <span className="ion-images"></span>
          <p>Drop Images</p>
          </Dropzone>
          {/*<input  {...fields.image.input} type="file"/>*/}
        </div>

      </div>
    )
  };


  onSubmit(inputData) {
    const data = new FormData();
    data.append('title', inputData.title);
    data.append('description', inputData.description);
    data.append('genre', inputData.genre);
    for (let i =0 ; i< inputData.image.length; i++){
      data.append('image', inputData.image[i]);
    }

    this.props.createContent(data);
  }

  showFiles() {
    const {files} = this.state;

    if (!files.length) {
      return null;
    }

    return (
      <div>
        <ul>
          {files.map((file, idx) => {
            return (
              <li key={idx} className="dropzone-image">
                <img src={file.preview} width={100}/>
                <div>{file.name + ' : ' + file.size + ' bytes.'}</div>
              </li>
            )
          })}
        </ul>
      </div>
    );
  }


  render() {
    const {handleSubmit} = this.props;

    return (
      <div className="container">
        <div className="ranking-board-wrapper">
          <div className="ranking-top-menu">
            <h2 className="ranking-top-text">BeWe Games</h2>
            <hr/>  
            <h3 className="ranking-middle-text">게임 등록하기</h3>
          </div>
          <div>
            <form encType="multipart/form-data" 
              onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Fields names={['title', 'genre', 'description', 'image']} component={this.renderFields}/>

              <button className="game-list-item-button register">SUBMIT</button>  
              {this.showFiles()}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

ContentsRegister = connect(null, {createContent})(ContentsRegister);

export default reduxForm({
  form: 'ContentsRegisterForm'
})(ContentsRegister);
