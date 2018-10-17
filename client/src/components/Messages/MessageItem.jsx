import React, { Component } from 'react';
import { DeleteMessage } from '../../mutations/mutations.js';
import { graphql } from 'react-apollo';
import moment from 'moment';
import { Link } from 'react-router-dom';

class MessageItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: null,
    };
    this.deleteMessage = this.deleteMessage.bind(this);
    this.replyMessage = this.replyMessage.bind(this);
  }

  deleteMessage() {
    this.props
      .DeleteMessage({
        mutation: DeleteMessage,
        variables: {
          id: this.props.post.id,
        },
      })
      .then(() => {
        this.props.notify('error', 'Message deleted');
        if (this.props.getMessages) {
          this.props.getMessages.refetch();
        }
        if (this.props.userSentMessages) {
          this.props.userSentMessages.refetch();
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  replyMessage() {
    let { sender, messageTitle, messageContent, createdAt } = this.props.post;
    let newTitle = '(RE:"' + messageTitle + '")';
    let oldContent =
      '\n\n\n' +
      `[On ${moment(createdAt).format('MMMM Do YYYY, h:mm:ss a')},${
        sender.username
      } wrote : "${messageContent}"]`;

    this.props.replyFormat(sender.username, newTitle, oldContent);
  }

  render() {
    let { sender, recipient, messageTitle, messageContent, createdAt, unread } = this.props.post;
    return (
      <div className="message-item" id="m16" style={{ width: '80%', marginLeft: '6%' }}>
        <div className="message-inner">
          <div className="message-head clearfix">
            <div className="row">
              <div className="col-1">
                <div className="avatar pull-left">
                  <Link
                    to={`/user/${sender.id}`}
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    <img
                      src={sender.avatarUrl}
                      style={{
                        minHeight: '60px',
                        maxHeight: '60px',
                      }}
                    />
                  </Link>
                </div>
              </div>
              <div className="col-3">
                <h2 className="handle">{sender.username}</h2>
                <span className="qa-message-when-data">{moment(createdAt).fromNow()}</span>
              </div>
              <div className="col-8">
                <div style={{ position: 'absolute', right: '0px', padding: '15px' }}>
                  <button type="button" className="btn btn-success" onClick={this.replyMessage}>
                    Reply
                  </button>
                  <button type="button" className="btn btn-danger" onClick={this.deleteMessage}>
                    Delete
                  </button>
                </div>
              </div>
            </div>

            <div className="user-detail">
              <div className="post-meta">
                <div className="asker-meta">
                  <span className="qa-message-what" />
                  <span className="qa-message-when" />
                </div>
              </div>
            </div>
          </div>
          <div className="qa-message-content">
            <div style={{ fontSize: '1.5rem' }}>
              <strong>{messageTitle}</strong>
            </div>
            <div style={{ fontSize: '1.25rem' }}>{messageContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default graphql(DeleteMessage, {
  name: 'DeleteMessage',
})(MessageItem);
