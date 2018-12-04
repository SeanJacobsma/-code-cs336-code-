import React from 'react';
import ReactDOM from 'react-dom';
import Remarkable from 'remarkable';
import $ from 'jquery';

import '../css/base.css';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import {API_URL, POLL_INTERVAL} from './global';


module.exports = React.createClass({
  getInitialState: function(){
    return { data: [], _isMounted: false};
  },
  loadCommentsFromServer: function() {
    if (this.state._isMounted) {
      $.ajax({
        url: API_URL,
        dataType: 'json',
        cache: false,
      })
        .done(function(data) {
          this.setState({data: data});
        }.bind(this))
        .fail(function(xhr, status, err) {
          console.error(API_URL, status, err.toString());
        }.bind(this));
    }
  },
  handleCommentSubmit: function(comment) {
    var comments = this.state.data;
    //Optimistically set an id on the new comment. It will be replaced by an
    // id generated by the server. In a production application you would likely
    // not use Date.now() for this and would have a more robust system in place.
    comment.id = Date.now();
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
    $.ajax({
        url: API_URL,
        dataType: 'json',
        type: 'POST',
        data: comment,
    })
      .done(function(data) {
        this.setState({data: data});
      }.bind(this))
      .fail(function(xhr, status, err) {
        this.setState({data: comments});
        console.error(API_URL, status, err.toString());
      }.bind(this));
  },
  componentDidMount: function() {
    this.state._isMounted = true;
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, POLL_INTERVAL);
  },
  componentWillUnmount: function(){
    this.state._isMounted = false;
  },
  render: function() {
    return (
      <div className="CommentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit= {this.handleCommentSubmit}/>
      </div>
    );
  }
});
