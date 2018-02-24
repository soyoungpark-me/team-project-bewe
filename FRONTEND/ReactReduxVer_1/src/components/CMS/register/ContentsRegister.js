import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Fields } from 'redux-form';
import Dropzone from 'react-dropzone';
import { createContent } from '../../../actions/CMS/CMSAction';



class ContentsRegister extends Component{
  constructor(props){
    super(props);
    this.state = { files:[] };
    this.renderFields = this.renderFields.bind(this);
  };

  onDrop(files) {
    this.setState({
      files
    });
  }
  renderFields = (fields) => {
    return (
      <div>
        <div>
          <input {...fields.title.input} type="text" placeholder="title"/>
          {
            fields.title.meta.touch && fields.title.meta.error
            && <span className="error">
            {fields.title.meta.error}
            </span>
          }
        </div>
        <div>
          <input {...fields.genre.input} type="text" placeholder="genre"/>
          {
            fields.genre.meta.touch && fields.genre.meta.error
            && <span className="error">
            {fields.genre.meta.error}
            </span>
          }
        </div>
        <div>
          <input {...fields.description.input} type="text" placeholder="desc"/>
          {
            fields.description.meta.touch && fields.description.meta.error
            && <span className="error">
            {fields.description.meta.error}
            </span>
          }
        </div>
        <div>
          {/*<Dropzone {...fields.image.input} onDrop={this.onDrop.bind(this)} accept="image/*">*/}
            {/*<p>Drop Iamges</p>*/}
          {/*</Dropzone>*/}
          <input name="image" {...fields.image.input} type="file"/>
        </div>

      </div>
    )
  };


  onSubmit(inputData){
    console.log(inputData);
    this.props.createContent(inputData);
  }

  showFiles() {
    const { files } = this.state;

    if (!files.length) {
      return null;
    }

    return (
      <div>
        <ul>
          {files.map((file, idx) => {
              return (
                <li key={idx}>
                  <img src={file.preview} width={100}/>
                  <div>{file.name + ' : ' + file.size + ' bytes.'}</div>
                </li>
              )
            })}
        </ul>
      </div>
    );
  }


  render(){
    const { handleSubmit } = this.props;

    return(
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
          <Fields names={['title', 'genre', 'description', 'image']} component={this.renderFields}/>

          <button type="submit">Submit</button>

          {this.showFiles()}

        </form>
      </div>
    );
  }
}

ContentsRegister = connect(null, { createContent })(ContentsRegister);

export default reduxForm({
  form: 'ContentsRegisterForm'
})(ContentsRegister);
