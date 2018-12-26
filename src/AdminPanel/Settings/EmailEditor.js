import React, {Component} from 'react';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import Link from '@ckeditor/ckeditor5-link/src/link';

class EmailEditor extends Component {
    componentDidMount() {
        console.log(this.props)
    }

    render() {
        return (
            <div className='news-editor-page'>
                <div className='new-title'>
                    <div className='title'>
                       text
                    </div>
                    <button className='admin-btn green-btn'>Save</button>
                </div>

                <CKEditor
                    editor={ClassicEditor}
                    config={{
                        toolbar: ['Heading', '|', 'Bold', 'Italic', 'Alignment', 'Link', 'BlockQuote', 'Undo', 'Redo'],
                        // removePlugins: ['Image', 'ImageCaption', 'ImageStyle', 'ImageToolbar', 'ImageUpload']
                    }}
                    data="<p>Hello from CKEditor 5!</p>"
                    // onInit={editor => {
                    //     // You can store the "editor" and use when it is needed.
                    //     console.log('Editor is ready to use!', editor);
                    // }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        console.log({event, editor, data});
                    }}
                    // onBlur={editor => {
                    //     console.log('Blur.', editor);
                    // }}
                    // onFocus={editor => {
                    //     console.log('Focus.', editor);
                    // }}
                />

            </div>
        )
    }
}

export default EmailEditor;