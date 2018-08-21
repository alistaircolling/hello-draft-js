import {
  Editor,
  ContentState,
  convertToRaw,
  EditorState,
  RichUtils
} from "draft-js";
import React from "react";
import { render } from "react-dom";

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createWithContent(
        ContentState.createFromText("/positions sector account")
      )
    };
    this.onChange = this.onChange.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

  onChange(editorState) {
    console.log(convertToRaw(editorState.getCurrentContent()));
    this.setState({ editorState });
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return "handled";
    }
    return "not-handled";
  }

  render() {
    return (
      <Editor
        editorState={this.state.editorState}
        handleKeyCommand={this.handleKeyCommand}
        onChange={this.onChange}
      />
    );
  }
}

render(<MyEditor />, document.getElementById("root"));
