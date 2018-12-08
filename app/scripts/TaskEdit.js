import React from 'react';
import {Link} from 'react-router';
import $ from 'jquery';

import {API_URL} from './global';

module.exports = React.createClass({
    getInitialState: function () {
        return {Type: '', Day:'', Class:'', Title: '', Description:'', Urgency: '', Complete: 'No'};
    },
    componentDidMount: function () {
        this.loadData();
    },
    componentDidUpdate: function (prevProps) {
        if (this.props.params.id != prevProps.params.id) {
            this.loadData();
        }
    },
    loadData: function () {
        $.ajax({
            url: API_URL + "/" + this.props.params.id,
            dataType: 'json',
            cache: false,
        })
            .done(function (result) {
                this.setState(result[0]);
            }.bind(this))
            .fail(function (xhr, status, errorThrown) {
                console.error(API_URL, status, errorThrown.toString());
            }.bind(this));
    },
    handleTypeChange: function(e) {
      this.setState({Type: e.target.value});
    },
    handleDayChange: function(e) {
      this.setState({Day: e.target.value})
    },
    handleClassChange: function(e) {
      this.setState({Class: e.target.value})
    },
    handleTitleChange: function(e) {
      this.setState({Title: e.target.value})
    },
    handleDescriptionChange: function(e) {
      this.setState({Description: e.target.value})
    },
    handleUrgencyChange: function(e) {
      this.setState({Ungency: e.target.value})
    },
    handleComplete: function(e) {
      this.setState({Complete: 'Yes'})
    },
    contextTypes: {
        router: React.PropTypes.object
    },
    handleUpdate: function () {
        console.log(this.state.Class)
        var updatedComment = {
            Type: this.state.Type,
            Day: this.state.Day,
            Class: this.state.Class.trim(),
            Title: this.state.Title.trim(),
            Description: this.state.Description.trim(),
            Urgency: this.state.Urgency,

        };
        $.ajax({
            url: API_URL + "/" + this.props.params.id,
            dataType: 'json',
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(updatedComment)
        })
            .done(function (comments) {
                this.context.router.push('/');
            }.bind(this))
            .fail(function (xhr, status, errorThrown) {
                console.error(API_URL, status, errorThrown.toString());
            }.bind(this));
    },
    handleDelete: function () {
        $.ajax({
            url: API_URL + "/" + this.props.params.id,
            type: 'DELETE',
        })
            .done(function (comments) {
                this.context.router.push('/');
            }.bind(this))
            .fail(function (xhr, status, errorThrown) {
                console.error(API_URL, status, errorThrown.toString());
            }.bind(this));
    },
    render: function () {
        return (
            <div>
                <form className="TaskEdit">
                    <h1>{this.props.params.Title}</h1>
                    <select
                      selected = ""
                      value = {this.state.Type}
                      onChange={this.handleTypeChange}>
                        <option value="">select type</option>
                        <option value="Due">Due Date</option>
                        <option value= "Work"> Work Date</option>
                    </select>

                    <select
                      selected = ""
                      value = {this.state.Day}
                      onChange={this.handleDayChange}>
                        <option value= "">select day</option>
                        <option value= "Sunday">Sunday</option>
                        <option value= "Monday">Monday</option>
                        <option value= "Tuesday">Tuesday</option>
                        <option value= "Wednesday">Wednesday</option>
                        <option value= "Thursday">Thursday</option>
                        <option value= "Friday">Friday</option>
                        <option value= "Saturday">Saturday</option>
                    </select>

                    <input
                      type = "text"
                      placeholder = "Title of Task"
                      value = {this.state.Title}
                      onChange={this.handleTitleChange}
                    />

                    <input
                      type = "text"
                      placeholder = "Class"
                      value = {this.state.Class}
                      onChange={this.handleClassChange}
                    />

                    <input
                      type = "text"
                      placeholder = "Description"
                      value = {this.state.Description}
                      onChange={this.handleDescriptionChange}
                    />

                    <select
                      selected = ""
                      value = {this.state.Urgency}
                      onChange={this.handleUrgencyChange}>
                        <option value="">select urgency</option>
                        <option value="Urgent">Urgent</option>
                        <option value= "NotUgent"> Not urgent</option>
                    </select>
                    
                    <br/>
                    <button type="button" onClick={this.handleUpdate}>Update
                    </button>
                    <button type="button" onClick={this.handleComplete}>Mark Completed
                    </button>
                    <button type="button" onClick={this.handleDelete}>Delete
                    </button>
                </form>
                <Link to='/'>Cancel</Link>
            </div>
        );
    }
});
